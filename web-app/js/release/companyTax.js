var companyTaxFirstVisit = true;
var companyTaxSelectedId = null;
var companyTaxEditClicked = false;
function companyTaxLoadList(companyId){
	var dataToSend = "companyId=" + companyId + "&format=json";
	$.ajax({
		url : taxRateListUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			var html = "<option value='create'>" + companyTax_createLabel + "</option>";
			for(var i = 0; i < response.length; i++){
				html += '<option value="' + response[i].id + '" editable="true" editFunction="companyTaxGetEditPage(\'' + companyId + '\', \'' + response[i].id + '\', \'' + response[i].name + '\')">' + response[i].name + '</option>';
			}
			$("#companyTaxDropDownList").empty().html(html);
			$("#companyTaxDropDownList").multiselect("destroy");
			$("#companyTaxDropDownList").unbind().multiselect({
				header : false,
				multiple : false,
				noneSelectedText : multiselectNoneSelectedTextLabel,
				minWidth : 180,
				selectedList : 1
			}).bind("multiselectclick", function(event, ui) {
				setTimeout(function(){
					if(companyTaxEditClicked){
						companyTaxEditClicked = false;
						return;
					}
					if(ui.value == "create"){
						companyTaxGetDetails(companyId, null, true);
						setTimeout(function(){
							if(companyTaxSelectedId == null){
								$("#companyTaxDropDownList").val("");
								$("#companyTaxDropDownList").multiselect("uncheckAll");
								$("#companyTaxDropDownList").multiselect("refresh");
								$("#companyTaxDropDownList option").each(function() {
									$(this).removeAttr("selected", "selected");
								});
							}
							else{
								$("#companyTaxDropDownList").multiselect("uncheckAll");
								$("#companyTaxDropDownList option").each(function() {
									if(this.value == companyTaxSelectedId)
										$(this).attr("selected", "selected");
									else
										$(this).removeAttr("selected");
								});
								$("#companyTaxDropDownList").multiselect("refresh");
								$("#editCompanyTabs .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_companyTaxDropDownList']").each(function() {
									if (this.value == companyTaxSelectedId) {
										this.click();
									}
								});
								$("#companyTaxDropDownList").val(companyTaxSelectedId);
							}
						}, 10);
					}
					else{
						companyTaxSelectedId = ui.value;
						companyTaxLocalLoadList(companyId);
					}
				}, 10);
			});
			if(companyTaxSelectedId != null){
				$("#companyTaxDropDownList").multiselect("uncheckAll");
				$("#companyTaxDropDownList option").each(function() {
					if(this.value == companyTaxSelectedId)
						$(this).attr("selected", "selected");
					else
						$(this).removeAttr("selected");
				});
				$("#companyTaxDropDownList").multiselect("refresh");
				$("#editCompanyTabs .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_companyTaxDropDownList']").each(function() {
					if (this.value == companyTaxSelectedId) {
						this.click();
					}
				});
				$("#companyTaxDropDownList").val(companyTaxSelectedId);
			}
		},
		error: function(response, status){}
	});
}

function companyTaxGetEditPage(companyId, taxRateId, taxRateName){
	var taxRate = {id: taxRateId, name: taxRateName};
	companyTaxGetDetails(companyId, taxRate, false);
}

function companyTaxGetDetails(companyId, taxRate, isCreate){
	$.get(
		taxRateCreatePageUrl,
		{},
		function(htmlresponse) {
			htmlresponse = jQuery.trim(htmlresponse);
			companyTaxPageSetup(htmlresponse, companyId, taxRate, isCreate);
		},
		"html"
	);
}

function companyTaxPageSetup(htmlresponse, companyId, taxRate, isCreate){
	if ($("#taxRateDialog").dialog("isOpen") !== true) {
		$("#taxRateDialog").empty();
		$("#taxRateDialog").html(htmlresponse);
		$("#taxRateDialog").dialog({
			title : companyTax_taxRateLabel,
			modal : true,
			resizable : false,
			width : "auto",
			height : "auto",
			open : function(event) {
				companyTaxInitControls(isCreate);
				companyTaxInitFields(companyId, taxRate, isCreate);
			},
			buttons : {
				deleteLabel : function() {
					companyTaxDelete();
				},
				cancelLabel : function() {
					$("#taxRateDialog").dialog("close");
				},
				updateLabel : function() {
					if (companyTaxValidateForm())
						companyTaxUpdate();
				},
				createLabel : function() {
					if (companyTaxValidateForm())
						companyTaxAddNew();
				},
			}
		});
	}
}

function companyTaxInitControls(isCreate) {
	if (isCreate) {
		$(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").hide();
		$(".ui-dialog-buttonpane").find("button:contains('updateLabel')").hide();
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
		$(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
		$(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
	}
	else {
		$(".ui-dialog-buttonpane").find("button:contains('createLabel')").hide();
		$(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").addClass("ui-delete-button");
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
		$(".ui-dialog-buttonpane").find("button:contains('updateLabel')").addClass("ui-update-button");
		$(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").html("<span class='ui-button-text'>" + deleteLabel + "</span>");
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
		$(".ui-dialog-buttonpane").find("button:contains('updateLabel')").html("<span class='ui-button-text'>" + updateLabel + "</span>");
	}
}

function companyTaxInitFields(companyId, taxRate, isCreate){
	$("#taxRateCompanyId").val(companyId);
	$("#taxRateId, #taxRateName").val("");
	if (!isCreate){
		if(taxRate){
			$("#taxRateId").val(taxRate.id);
			$("#taxRateName").val(taxRate.name);
		}
	}
}

function companyTaxValidateForm(){
	if ($("#taxRateName").val() == "") {
		jQuery.noticeAdd({
			stayTime : 2000,
			text : fieldsRequiredMessageLabel,
			stay : false,
			type : "error"
		});
		return false;
	}
	return true;
}

function companyTaxAddNew(){
	var dataToSend = "companyId=" + $("#taxRateCompanyId").val() + "&name=" + $("#taxRateName").val() + "&format=json";
	$.ajax({
		url : taxRateCreateUrl,
		type : "POST",
		noticeType : "POST",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			companyTaxLoadList($("#taxRateCompanyId").val());
			$("#taxRateDialog").dialog("close");
		},
		error: function(response, status){}
	});
}

function companyTaxUpdate(){
	var dataToSend = "companyId=" + $("#taxRateCompanyId").val() + "&taxRateId=" + $("#taxRateId").val() + "&name=" + $("#taxRateName").val() + "&format=json";
	$.ajax({
		url : taxRateUpdateUrl,
		type : "POST",
		noticeType : "PUT",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			companyTaxLoadList($("#taxRateCompanyId").val());
			$("#taxRateDialog").dialog("close");
		},
		error: function(response, status){}
	});
}

function companyTaxDelete(){
	var dataToSend = "companyId=" + $("#taxRateCompanyId").val() + "&taxRateId=" + $("#taxRateId").val() + "&format=json";
	$.ajax({
		url : taxRateDeleteUrl,
		type : "POST",
		noticeType : "DELETE",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if($("#taxRateId").val() == companyTaxSelectedId){
				companyTaxSelectedId = null;
			}
			$("#taxGrid").empty();
			$("#taxForm").hide();
			companyTaxLoadList($("#taxRateCompanyId").val());
			$("#taxRateDialog").dialog("close");
		},
		error: function(response, status){}
	});
}

//Tax Local
var companyTaxLocalGrid = null;
function companyTaxLocalLoadList(companyId){
	var dataToSend = "companyId=" + companyId + "&taxRateId=" + companyTaxSelectedId + "&format=json";
	$.ajax({
		url : taxRateListLocalUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			companyTaxLocalGrid = null;
			$("#taxGrid").empty();
			$("#taxForm").show();
			var gridColumns = [{
				id : "countryCode",
				name : companyTax_countryLabel,
				field : "countryCode",
				width : 34,
				formatter : companyTaxGridCountryFormatter,
				cssClass : "cell-title"
			},{
				id : "rate",
				name : companyTax_taxRateLabel,
				field : "rate",
				width : 33,
				cssClass : ""
			},{
				id : "active",
				name : companyTax_activeLabel,
				field : "active",
				width : 33,
				formatter : companyTaxGridActiveFormatter,
				cssClass : ""
			}];

			var gridOptions = {
				editable : false,
				enableAddRow : false,
				asyncEditorLoading : false,
				forceFitColumns : true,
				enableCellNavigation : false,
				enableColumnReorder : false,
				rowHeight : 25
			};

			var gridData = [];
			for ( var i = 0; i < response.length; i++) {
				gridData[gridData.length] = {
					"id" : i,
					"companyId": companyId,
					"taxRateId": companyTaxSelectedId,
					"localTaxRateId": response[i].id,
					"countryCode": response[i].countryCode,
					"rate" : response[i].rate,
					"active": response[i].active
				}
			}
			companyTaxLocalGrid = new Slick.Grid($("#taxGrid"), gridData, gridColumns, gridOptions);
			companyTaxLocalGrid.setSelectionModel(new Slick.RowSelectionModel());
			companyTaxLocalGrid.invalidate();
		},
		error: function(response, status){}
	});
}

function companyTaxGridActiveFormatter(row, cell, value, columnDef, dataContext){
	var checkBox = "<input type='checkbox' disabled='disabled' style='margin-top:4px;'";
	checkBox += (value) ? "checked='checked'/>" : "/>";
	return checkBox;
}

function companyTaxGridCountryFormatter(row, cell, value, columnDef, dataContext){
	for(var i = 0; i < countries.length; i++){
		if(countries[i].code == value){
			return '<a href="javascript:void(0);" onclick="companyTaxLocalGetEditPage(\'' + dataContext.companyId + '\',\'' + dataContext.localTaxRateId + '\')">' + countries[i].name + '</a>';
		}
	}
}

function companyTaxLocalGetEditPage(companyId, localTaxRateId){
	companyTaxLocalGetDetails(companyId, localTaxRateId, false);
}

function companyTaxLocalGetDetails(companyId, localTaxRateId, isCreate){
	$.get(
		taxRateLocalCreatePageUrl,
		{},
		function(htmlresponse) {
			htmlresponse = jQuery.trim(htmlresponse);
			companyTaxLocalPageSetup(htmlresponse, companyId, localTaxRateId, isCreate);
		},
		"html"
	);
}

function companyTaxLocalPageSetup(htmlresponse, companyId, localTaxRateId, isCreate){
	if ($("#taxRateDialog").dialog("isOpen") !== true) {
		$("#taxRateDialog").empty();
		$("#taxRateDialog").html(htmlresponse);
		$("#taxRateDialog").dialog({
			title : companyTax_taxRateLabel,
			modal : true,
			resizable : false,
			width : "auto",
			height : "auto",
			open : function(event) {
				companyTaxLocalInitControls(isCreate);
				companyTaxLocalInitFields(companyId, localTaxRateId, isCreate);
			},
			buttons : {
				deleteLabel : function() {
					companyTaxLocalDelete();
				},
				cancelLabel : function() {
					$("#taxRateDialog").dialog("close");
				},
				updateLabel : function() {
					if (companyTaxLocalValidateForm())
						companyTaxLocalUpdate();
				},
				createLabel : function() {
					if (companyTaxLocalValidateForm())
						companyTaxLocalAddNew();
				}
			}
		});
	}
}

function companyTaxLocalInitControls(isCreate) {
	if (isCreate) {
		$(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").hide();
		$(".ui-dialog-buttonpane").find("button:contains('updateLabel')").hide();
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
		$(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
		$(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
	}
	else {
		$(".ui-dialog-buttonpane").find("button:contains('createLabel')").hide();
		$(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").addClass("ui-delete-button");
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
		$(".ui-dialog-buttonpane").find("button:contains('updateLabel')").addClass("ui-update-button");
		$(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").html("<span class='ui-button-text'>" + deleteLabel + "</span>");
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
		$(".ui-dialog-buttonpane").find("button:contains('updateLabel')").html("<span class='ui-button-text'>" + updateLabel + "</span>");
	}
}

function companyTaxLocalInitFields(companyId, localTaxRateId, isCreate){
	$("#localTaxRateCompanyId").val(companyId);
	$("#localTaxRateRate").val(0);
	$("#localTaxRateActive").attr("checked", "checked");
	if(isCreate){
		$("#localTaxRateCountry").empty();
		for(var i = 0; i < countries.length; i++){
			if(!companyTaxLocalExistCountryInGrid(countries[i].code)){
				$("#localTaxRateCountry").append("<option value='" + countries[i].code + "'>" + countries[i].name + "</option>");
			}
		}
		$("#localTaxRateCountry").multiselect("destroy");
		$("#localTaxRateCountry").multiselect({
			header : false,
			multiple : false,
			noneSelectedText : multiselectNoneSelectedTextLabel,
			minWidth : 229,
			height: 60,
			selectedList : 1
		});
	}
	if (!isCreate){
		var localTaxRate = null;
		var data = companyTaxLocalGrid.getData();
		for (var i = 0; i < data.length; i++) {
			if (data[i].localTaxRateId == localTaxRateId){
				localTaxRate =  data[i];
				break;
			}
		}
		if(localTaxRate){
			var html = "";
			for(var i = 0; i < countries.length; i++){
				if(localTaxRate.countryCode == countries[i].code){
					html += '<option value="' + countries[i].code + '">' + countries[i].name + '</option>';
				}
			}
			$("#localTaxRateCountry").empty().html(html);
			$("#localTaxRateCountry").multiselect("destroy");
			$("#localTaxRateCountry").multiselect({header : false, multiple : false, selectedList : 1});
			$('#taxRateDialog .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_localTaxRateCountry"]')[0].click();
			$("#localTaxRateCountry").multiselect("refresh");
			$("#localTaxRateCountry").multiselect("disable");
			$("#localTaxRateCountry").val(localTaxRate.countryCode);

			$("#localTaxRateId").val(localTaxRate.localTaxRateId);
			$("#localTaxRateRate").val(localTaxRate.rate);
			if(!localTaxRate.active){
				$("#localTaxRateActive").removeAttr("checked");
			}
		}
	}
}

function companyTaxLocalExistCountryInGrid(countryCode){
	var data = companyTaxLocalGrid.getData();
	for (var i = 0; i < data.length; i++) {
		if (data[i].countryCode == countryCode){
			return true;
		}
	}
	return false;
}

function companyTaxLocalValidateForm(){
	if($("#localTaxRateCountry").val() == null) {
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companyTaxErrors_requiredCountryLabel,
			stay : false,
			type : "error"
		});
		return false;
	}
	if ($("#localTaxRateRate").val() == "") {
		$("#localTaxRateForm #localTaxRateRate").focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companyTaxErrors_requiredTaxRateLabel,
			stay : false,
			type : "error"
		});
		return false;
	}
	else if (!$("input#localTaxRateRate")[0].checkValidity()) {
		$("#localTaxRateForm #localTaxRateRate").focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companyTaxErrors_invalidTaxRateLabel,
			stay : false,
			type : "error"
		});
		return false;
	}
	return true;
}

function companyTaxLocalAddNew(){
	var dataToSend = "companyId=" + $("#localTaxRateCompanyId").val();
	dataToSend += "&taxRateId=" + companyTaxSelectedId;
	dataToSend += "&country=" + $("#localTaxRateCountry").val();
	dataToSend += "&rate=" + $("#localTaxRateRate").val();
	dataToSend += "&active=" + $("#localTaxRateActive").is(":checked");
	dataToSend += "&format=json";
	$.ajax({
		url : taxRateCreateLocalUrl,
		type : "POST",
		noticeType : "POST",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			companyTaxLocalLoadList($("#localTaxRateCompanyId").val());
			$("#taxRateDialog").dialog("close");
		},
		error: function(response, status){}
	});
}

function companyTaxLocalUpdate(){
	var dataToSend = "companyId=" + $("#localTaxRateCompanyId").val();
	dataToSend += "&localTaxRateId=" + $("#localTaxRateId").val();
	dataToSend += "&rate=" + $("#localTaxRateRate").val();
	dataToSend += "&active=" + $("#localTaxRateActive").is(":checked");
	dataToSend += "&format=json";
	$.ajax({
		url : taxRateUpdateLocalUrl,
		type : "POST",
		noticeType : "PUT",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			companyTaxLocalLoadList($("#localTaxRateCompanyId").val());
			$("#taxRateDialog").dialog("close");
		},
		error: function(response, status){}
	});
}

function companyTaxLocalDelete(){
	var dataToSend = "companyId=" + $("#localTaxRateCompanyId").val() + "&localTaxRateId=" + $("#localTaxRateId").val() + "&format=json";
	$.ajax({
		url : taxRateDeleteLocalUrl,
		type : "POST",
		noticeType : "DELETE",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if($("#taxRateId").val() == companyTaxSelectedId){
				companyTaxSelectedId = null;
			}
			$("#taxGrid").empty();
			$("#taxForm").hide();
			companyTaxLocalLoadList($("#localTaxRateCompanyId").val());
			$("#taxRateDialog").dialog("close");
		},
		error: function(response, status){}
	});
}