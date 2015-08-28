var salesGridObject;
var salesDetailsGridObject;
var productsGridObject;
var sales = []


function callServer(url, dataToSend, success, error) {
	//url = url + "?format=json";
	var afterCallingSuccess = function (response) {
		$('#items').hideLoading();
		success(response);
	};
	var afterCallingError = function (response) {
		$('#items').hideLoading();
		error(response);
	};
	
	$('#items').showLoading({'addClass': 'loading-indicator-FacebookBig'});console.log(url + "?" + dataToSend);
	$.ajax({
		url : url,
		type : "GET",
		data : dataToSend,
		dataType : "json",
        cache : false,
        async : true,
        beforeSend : function(xhr,setting){
            var url = setting.url;
            url = url.replace("&_=","&timestamp=");
            setting.url = url;
        },
		success : afterCallingSuccess,
        error: afterCallingError
	});	
}
function errorCallingServer(response){
	alert("ERROR: " + response.status + " ( " + response.statusText + " ) ");
}

function getBackOfficePage() {
	$("#categoriesMain").hide();
	$('#items').empty().show().showLoading({'addClass': 'loading-indicator-FacebookBig'});
	
	$.get(backOfficePageUrl, {}, function(responseText) {
		responseText = jQuery.trim(responseText);
		$(responseText).appendTo(document.body);
		
		$("#searchForm").hide();
		$('#mainSalesDiv').detach().prependTo('#items');
		$('#mainSalesDiv').show();
		$('#items').hideLoading();
		
		// init datepickers
		$("#mainSalesDiv #saleDate").datepicker({
			dateFormat: 'dd/mm/yy',
			minDate : new Date(2011, 1 - 1, 1),
			maxDate : new Date(2049, 12 - 1, 31),
			changeMonth : true,
			changeYear : true,
			firstDay : 1
		}).keydown(function(e){
            var key = 'which' in e ? e.which : e.keyCode;
            if(key)
                $(this).val("");
			return false;
		});
		$("#mainSalesDiv #startDate").datepicker({
			dateFormat: 'dd/mm/yy',
			minDate : new Date(2011, 1 - 1, 1),
			maxDate : new Date(2049, 12 - 1, 31),
			changeMonth : true,
			changeYear : true,
			firstDay : 1
		}).keydown(function(){
			return false;
		});
		$("#mainSalesDiv #endDate").datepicker({
			dateFormat: 'dd/mm/yy',
			minDate : new Date(2011, 1 - 1, 1),
			maxDate : new Date(2049, 12 - 1, 31),
			changeMonth : true,
			changeYear : true,
			firstDay : 1
		}).keydown(function(){
			return false;
		});
		
		// default search
		$("#searchSalesByBuyerCriterias").show();
		$("#searchByBuyer").unbind().click(function(){
			$("#backofficeGrids").hide();
			$("#searchSalesByProductCriterias").hide();
			$("#searchSalesByBuyerCriterias").show();
		});
		$("#searchByProduct").unbind().click(function(){
			$("#backofficeGrids").hide();
			$("#searchSalesByBuyerCriterias").hide();
			$("#searchSalesByProductCriterias").show();
		});
		$('#searchByBuyerBtn').unbind().click(function(){
			if(validateSearchByBuyer()) {
				$("#backofficeGrids").show();
				$("#salesGridDiv").hide();
				$("#salesDetailsGridDiv").hide();
				$("#productsGridDiv").hide();
				searchByBuyer();
			}
		});
		$('#searchByProductBtn').unbind().click(function(){
			if(validateSearchByProduct()) {
				$("#backofficeGrids").show();
				$("#salesGridDiv").hide();
				$("#salesDetailsGridDiv").hide();
				$("#productsGridDiv").hide();
				searchByProduct();
			}
		});
		
	}, "html");
}

function validateSearchByBuyer() {
	var valid = false;
	if($('#buyerLogin').val() == "" && $('#saleCode').val() == "" && $('#saleDate').val() == "") {
		jQuery.noticeAdd({
			stayTime : 2000,
			text : fieldsRequiredMessageLabel,
			stay : false,
			type : 'error'
		});
	}
	else {
		valid = true;
	}
	return valid;
}

function validateSearchByProduct() {
	var valid = false;
	if($('#startDate').val() == "" || $('#endDate').val() == "") {
		($('#startDate').val() == "")?$('#startDate').focus():$('#endDate').focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : fieldsRequiredMessageLabel,
			stay : false,
			type : 'error'
		});
	}
	else {
		valid = true;
	}
	return valid;
}

function searchByBuyer(){
	var dataToSend = "buyerLogin=" + $('#buyerLogin').val();
	dataToSend += "&saleCode=" + $('#saleCode').val() + "&saleDate=" + $('#saleDate').val() + "&pageOffset=0";
	callServer(salesSearchByBuyerUrl, dataToSend, drawSalesGrid, errorCallingServer);
}

function drawSalesGrid(response){
    // show Grid Div
    $("#salesGridDiv").slideDown('50', function(){
        salesGridSetup();
        sales = response.list;
        salesGridObject.setData(response.list);
        salesGridObject.invalidate();
    });
}

function salesGridSetup() {
	var columns = [
        { id: "code", name: saleCodeLabel, field: "transactionUuid", width:20, resizable: true, formatter: saleCodeCellFormatter },
        { id: "buyer", name: saleBuyerLoginLabel, field: "buyer", width:20, resizable: true },
        { id: "debut", name: saleStartLabel, field: "date", width:30, resizable: true },
        { id: "price", name: salePriceLabel, field: "price", width:20, resizable: true },
        { id: "status", name: saleStatusLabel, field: "status", width:20, resizable: true, formatter: saleStatusCellFormatter }
   	];
   	var options = {
   		editable : false,
   		enableAddRow : false,
   		asyncEditorLoading : false,
   		forceFitColumns : true,
   		enableCellNavigation: false,
   		enableColumnReorder:false,
   		rowHeight : 25
   	};
   	
   	var dataView = new Slick.Data.DataView();
   	
   	if (!salesGridObject) {
   		salesGridObject = new Slick.Grid($("#salesGrid"), [], columns, options);
   	}
   	else {
   		$("#salesGrid").empty();
   		salesGridObject = new Slick.Grid($("#salesGrid"), [], columns, options);
   	}
	
	dataView.setPagingOptions({pageSize: 25});
	var pager = new Slick.Controls.Pager(dataView, salesGridObject, $("#salesGridPager"));
}

function saleCodeCellFormatter(row, cell, value, columnDef, dataContext) {
    if (value == null || value === "")
        return "";
    return "<a href='javascript:void(0)' onclick='getSaleDetails("+dataContext.id+")'>" + dataContext.transactionUuid + "</a>";
}

function saleStatusCellFormatter(row, cell, value, columnDef, dataContext) {
    if (value == null)
        return "";
    return value.name;
}

function getSaleDetails(saleId){
    var selecteSale=null;
    for(var i=0;i<sales.length;i++){
        if(sales[i].id == saleId) {
            selecteSale = sales[i];
            break;
        }
    }

    if (selecteSale != null) {
        // hide old Grid Div
        $("#salesGridDiv").slideUp('50', function(){
            // show Grid Div
            $("#salesDetailsGridDiv").slideDown('50', function(){
                salesDetailsGridSetup();
                salesDetailsGridObject.setData(selecteSale.items);
                salesDetailsGridObject.invalidate();

                // back to previous grid
                $("span#salesDetails-to-sales").unbind().click(function(){
                    $("#salesDetailsGridDiv").slideUp('50', function(){
                        $("#salesGridDiv").slideDown('50');
                    });
                });
            });
        });
    }
}

function salesDetailsGridSetup() {
	var columns = [
        { id: "code", name: saleCodeLabel, field: "code", width:10, resizable: true },
   		{ id: "name", name: saleProductLabel, field: "name", width:30, resizable: true },
   		{ id: "price", name: salePriceLabel, field: "totalEndPrice", width:10, resizable: true },
   		{ id: "quantity", name: saleQuantityLabel, field: "quantity", width:10, resizable: true },
   		{ id: "startDate", name: buyerStartDateLabel, field: "startDate", width:15, resizable: true },
   		{ id: "endDate", name: buyerEndDateLabel, field: "endDate", width:15, resizable: true }

   	];
   	var options = {
   		editable : false,
   		enableAddRow : false,
   		asyncEditorLoading : false,
   		forceFitColumns : true,
   		enableCellNavigation: false,
   		enableColumnReorder:false,
   		rowHeight : 25
   	};
   	
   	var dataView = new Slick.Data.DataView();
   	
   	if (!salesDetailsGridObject) {
   		salesDetailsGridObject = new Slick.Grid($("#salesDetailsGrid"), [], columns, options);
   	}
   	else {
   		$("#salesDetailsGrid").empty();
   		salesDetailsGridObject = new Slick.Grid($("#salesDetailsGrid"), [], columns, options);
   	}
   	
	dataView.setPagingOptions({pageSize: 25});
	var pager = new Slick.Controls.Pager(dataView, salesDetailsGridObject, $("#salesDetailsGridPager"));
}

function searchByProduct(){
	var dataToSend ="productCode="+$('#productCode').val()+"&productName="+$('#productName').val();
	callServer(salesProductsSearchByCodeAndNameUrl, dataToSend, drawProductsGrid, errorCallingServer);
}

function drawProductsGrid(response){
	$("#productsGridDiv").slideDown('50', function(){
		productsGridSetup();
		productsGridObject.setData(response);
		productsGridObject.invalidate();
	});
}

function productsGridSetup() {		
	var columns = [      
       	{ id: "code", name: saleCodeLabel, field: "code", width:40, resizable: true,formatter: productCellFormatter },
   		{ id: "name", name: salePriceLabel, field: "name", width:60, resizable: true }

   	];
   	var options = {
   		editable : false,
   		enableAddRow : false,
   		asyncEditorLoading : false,
   		forceFitColumns : true,
   		enableCellNavigation: false,
   		enableColumnReorder:false,
   		rowHeight : 25
   	};
   	
   	var dataView = new Slick.Data.DataView();
   	
   	if (!productsGridObject) {
   		productsGridObject = new Slick.Grid($("#productsGrid"), [], columns, options);
   	}
   	else {
   		$("#productsGrid").empty();
   		productsGridObject = new Slick.Grid($("#productsGrid"), [], columns, options);
   	}
   	
	dataView.setPagingOptions({pageSize: 25});
	var pager = new Slick.Controls.Pager(dataView, productsGridObject, $("#productsGridPager"));
}

function productCellFormatter(row, cell, value, columnDef, dataContext) {
	if (value == null || value === "")
		return "";
	return "<a href='javascript:void(0)' onclick='getProductBuyersAndSales("+dataContext.id+")'>" + dataContext.code + "</a>";
}

function getProductBuyersAndSales(id){
	var dataToSend = "productId="+id+"&startDate="+$('#startDate').val()+"&endDate="+$('#endDate').val();
	callServer(salesSearchByProductAndDateUrl, dataToSend, drawSalesGrid, errorCallingServer);
}

