var categoryProductListLoaded = false;

function categoryGetProducts(){
	$("#categoryProductSearchForm").empty();
	$("#categoryProductsList").empty();
	categoryProductsListFilter($("#categoryProductSearchForm"), $("#categoryProductsList"));
	$("#createProductMenu").prependTo("#categoryProductSearchForm");
	$("#createProductLnk").unbind();
	$("#createProductMenu").show();
	$("#createProductLnk").click(function() {
        categoryProductsGetCreatePage();
    });
	categoryProductsDrawAll(0);
}

function categoryProductsListFilter(header, list) {
	var form = $("<form onsubmit='return false;'>").attr({
		"class" : "filterform",
		"action" : "#"
	}),
	input = $("<input>").attr({
		"class" : "filterinput",
		"type" : "text",
		"placeHolder" : defaultSearchLabel + '...'
	});
	
	var productTypes = [{label:allLabel, value:"ALL"},{label:productXtypePhysicalLabel, value:"PRODUCT"},{label:productXtypeDownloadableLabel, value:"DOWNLOADABLE"},{label:productXtypeServiceLabel, value:"SERVICE"}];
	xtypeSelect = addInput('','',InputType.MULTIPLE_SELECT,'ALL','xtypeSelect','',productTypes);
	
	var productStates = [{label:productActiveLabel, value:"ACTIVE"},{label:productInActiveLabel, value:"INACTIVE"}];
	stateSelect = addInput('','',InputType.MULTIPLE_SELECT,'ACTIVE','stateSelect','',productStates);
	
	var productOrderBy = [{label:nameLabel, value:"name"},{label:priceLabel, value:"montant"},{label:dateLabel, value:"dateCreated"}];
	orderBySelect = addInput('','',InputType.MULTIPLE_SELECT,'dateCreated','orderBySelect','',productOrderBy);
	
	var productOrderDirections = [{label:ascendingLabel, value:"asc"},{label:descendingLabel, value:"desc"}];
	orderDirectionSelect = addInput('','',InputType.MULTIPLE_SELECT,'desc','orderDirectionSelect','',productOrderDirections);
	
	$(form).append(xtypeSelect).append("&nbsp;&nbsp;")
		   .append(stateSelect).append("&nbsp;&nbsp;")
		   .append(orderBySelect).append("&nbsp;&nbsp;")
		   .append(orderDirectionSelect).append("&nbsp;&nbsp;")
		   .append(input).append("&nbsp;&nbsp;")
		   .appendTo(header);
	
	// Apply multiselect style
	$('#xtypeSelect').multiselect({
		header: false,
		multiple: false,
		noneSelectedText: "Type",
		minWidth: 95,
		height: 100,
		selectedList: 1
	});
	$('#stateSelect').multiselect({
		header: false,
		multiple: false,
		noneSelectedText: "State",
		minWidth: 85,
		height: 100,
		selectedList: 1
	});
	$('#orderBySelect').multiselect({
		header: false,
		multiple: false,
		noneSelectedText: "Order By",
		minWidth: 85,
		height: 100,
		selectedList: 1
	});
	$('#orderDirectionSelect').multiselect({
		header: false,
		multiple: false,
		noneSelectedText: "Sort",
		minWidth: 105,
		height: 100,
		selectedList: 1
	});
	
	$.each('#xtypeSelect #stateSelect #orderBySelect #orderDirectionSelect'.split(' '), function(i, id) {
		$(id).bind("multiselectclick", function(event, ui) {
			categoryProductsDrawAll(0);
		});
	});
	
	// search input listener
	$(input).change(
			function() {
				var filter = $(this).val();
				if (filter) {
					$(list).find("label:not(:Contains(" + filter + "))")
							.parent().parent().parent().slideUp();
					$(list).find("label:Contains(" + filter + ")").parent()
							.parent().parent().slideDown();
				} else {
					$(list).find("li").slideDown();
				}
				return false;
			}).keyup(function() {
		$(this).change();
	});
}

function categoryProductsUpdateStatus(productId, status){
	var dataToSend = "product.id=" + productId;
	dataToSend += "&product.state.name=" + status;
	if (status == "ACTIVE") {
		dataToSend += "&social=true";
	}
	dataToSend += "&format=json";
	$.ajax( {
		url : updateProductUrl,
		type : "POST",
		noticeType : "PUT",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
            if($("#productList > li").length == 1 && $("#pageOffset").val() == $("#pageCount").val())
                categoryProductsDrawAll($("#pageCount").val() - 1);
            else
                categoryProductsDrawAll();
        }
	});
}

function categoryProductsFilter() {
	var names = ["product.xtype", "product.state", "orderBy", "orderDirection"];
	var filter = "";
	$.each('#xtypeSelect #stateSelect #orderBySelect #orderDirectionSelect'.split(' '), function(j, selectId) {
		if($(selectId).multiselect("getChecked").length > 0) {
			var value = $(selectId).multiselect("getChecked")[0].value;
			if (value != 'ALL')
				filter += "&" + names[j] + "=" + value;
		}
	});
	return filter;
}

function categoryProductsDrawAll(pageOffset) {
	categoryProductListLoaded = false;
	if (arguments.length == 0) {
		if(!$('#pageOffset').val()) {
			pageOffset = 0;
		}
		else {
			pageOffset = $('#pageOffset').val() - 1;
		}
		firstTimeMap =true;
	}
	var dataToSend = "pageOffset=" + pageOffset + "&product.idCategorie=" + categorySelectedId + "&format=html" + categoryProductsFilter();

	$.ajax({
		url : showProductUrl,
		type : "GET",
		data : dataToSend,
		dataType : "html",
		cache : false,
		async : true,
		success : function(pageContent, status) {
			var tabVisible = $("#categoryProductsTabInfo").is(":visible");
			if(! tabVisible)
				$("#categoryProductsTabInfo").show();
			$('#categoryProductsList').html(pageContent);
			if(! tabVisible)
				$("#categoryProductsTabInfo").hide();
			$('.pic a').fancybox({
				'overlayShow'	: true,
				'transitionIn'	: 'elastic',
				'titlePosition' : 'inside',
				'transitionOut'	: 'elastic',
				'type'			: 'image',
				'titleFormat' : function(title, currentArray, currentIndex, currentOpts) {
					return "";
				}
			});
			categoryProductsFilterByProductName();

			categoryProductListLoaded = true;
			if(categoryGeneralInfoLoaded && categoryVariationsListLoaded && categoryFeatureListLoaded && categoryTranslationListLoaded){
				$("#categoriesMain").hideLoading();
			}
		}
	});
}

function categoryProductsFilterByProductName(){
	var filterInput = $("form.filterform input.filterinput").val();
	if(filterInput){
		$("form.filterform input.filterinput").change();
	}
}

function categoryProductsGetEditPage(productId, fromPage) {
	$.get(
        productTourismPageUrl,
		{id: productId},
		function(responseText){
            $("#catalogProductsDiv").hide();
			$("#items").show();
			$("#categoriesMain").hide();
			responseText = jQuery.trim(responseText);
			$(responseText).appendTo(document.body);
			productAttachEditForm(productId, fromPage);
		},
		"html"
	);
}

function categoryProductsGetCreatePage() {
	$.get(
		createProductPageUrl,
		{},
		function(responseText) {
			responseText = jQuery.trim(responseText);
			categoryProductsCreatePageSetup(responseText);
		},
		"html"
	);
}

function categoryProductsCreatePageSetup(responseText){
	if ($("#createProductDialog").dialog( "isOpen" ) !== true) {
		$("#createProductDialog").empty();
		$("#createProductDialog").html(responseText);
		
		$("#createProductDialog").dialog({
			width : "auto",
			height : "auto",
			title : createProductLabel,
			resizable: false,
			modal: true,
			open: function(event) {
                categoriesProductsInitCreatePageFields();
			},
			buttons : {
				cancelLabel : function() {
					$("#createProductDialog").dialog("close");
				},
				createLabel : function() {
					categoryProductsValidateCreation()
				}
			}
		});
	}
}

function categoriesProductsInitCreatePageFields(){
    $("#createProductNameField").val("");
    $("#createProductCodeField").val("");
    $('#createProductTypeField').multiselect({
        header: false,
        multiple: false,
        minWidth: 236,
        height: 78,
        selectedList: 1
    });
    $("#createProductTypeField").multiselect("uncheckAll");
    $("#createProductTypeField option").each(function() {
        if(this.value == "PRODUCT")
            $(this).attr("selected", "selected");
        else
            $(this).removeAttr("selected");
    });
    $("#createProductTypeField").multiselect("refresh");
    $("#productAddForm .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_createProductTypeField']").each(function() {
        if (this.value == "PRODUCT") {
            this.click();
        }
    });
    $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
    $(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
    $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
    $(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
}

function categoryProductsValidateCreation(){
	var prdName = $("#createProductNameField").val();
	var prdCode = $("#createProductCodeField").val();
	if(prdName != "" && prdCode != "") {
		var dataToSend = "product.code=" + prdCode + "&format=json";
		$.ajax({
			url : existProductCodeUrl,
			type : "GET",
			data : dataToSend,
			dataType : "json",
			cache : false,
			async : true,
			success : function(response, status) {
				var existCode  = response.result;
				if (!existCode){
                    var dataToSend = "product.montant=0&product.state.name=ACTIVE&product.calendarType=NO_DATE";
                    dataToSend += "&product.name=" + $("#createProductNameField").val();
                    dataToSend += "&product.code=" + $("#createProductCodeField").val();
                    dataToSend += "&product.xtype=" + $("#createProductTypeField").val();
                    dataToSend += "&product.category.id=" + categorySelectedId;
                    if($("#createProductTypeField").val() == "PRODUCT"){
                        dataToSend += "&product.shipping.weight=0";
                        dataToSend += "&product.shipping.weightUnit=KG";
                        dataToSend += "&product.shipping.width=0";
                        dataToSend += "&product.shipping.height=0";
                        dataToSend += "&product.shipping.depth=0";
                        dataToSend += "&product.shipping.linearUnit=CM";
                        dataToSend += "&product.shipping.amount=0";
                        dataToSend += "&product.shipping.free=false";
                    }
					$.ajax({
						url : createProductUrl,
						data : dataToSend + "&format=json",
						type : "POST",
						noticeType : "POST",
						dataType : "json",
						cache : false,
						async : true,
						success : function(response, status) {
							if(response.success){
								categoryProductsDrawAll(0);
								$("#searchForm").show();
								$("#createProductDialog").dialog("close");
							}
							else{
								jQuery.noticeAdd({
									stayTime : 2000,
									text : productCodeExistLabel,
									stay : false,
									type : "error"
								});
							}
						}
					});
					return true;
				}
				else {
					jQuery.noticeAdd({
						stayTime : 2000,
						text : productCodeExistLabel,
						stay : false,
						type : "error"
					});
					return false;
				}
			}
		});
	}
	else{
		jQuery.noticeAdd({
			stayTime : 2000,
			text : fieldsRequiredMessageLabel,
			stay : false,
			type : "error"
		});
		return false;
	}
}