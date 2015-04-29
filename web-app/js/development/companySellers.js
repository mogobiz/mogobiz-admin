function companySellersAutoUpdateOnLineValidation(compId) {
	$("#paymentOnLineValidation").unbind().change(function() {
		var dataToSend = "company.id=" + compId + "&company.onlineValidation=" + $("#paymentOnLineValidation").is(":checked") + "&format=json";
		$.ajax({
			url : shippingPolicyUpdateUrl,
			type : "POST",
			noticeType : "PUT",
			data : dataToSend,
			dataType : "json",
			cache : false,
			async : true
		});
	});
}

function companySellersGetOnLineValidation(compId) {
	var dataToSend = "company.id="+compId;
	dataToSend += "&format=json";
	$.ajax({
		url : paymentPolicyShowUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if (response.success) {
				var payment = response.data;
				var paymentEncoded = $.toJSON(payment);
				var paymentFormValues = paymentEncoded;
				paymentFormValues = paymentFormValues.replace(/(^\s+|\s+$)/, "");
				paymentFormValues = "(" + paymentFormValues + ");";

				try	{
					var json = eval(paymentFormValues);
					var newJson = new Object();

					for(var key in json) {
						if (key == "onlineValidation" && response.data[key]){
							$("#paymentOnLineValidation").attr("checked", "checked");
						}
					}
				}
				catch(err)	{
					("That appears to be invalid JSON!")
					return false;
				}
			}
		}
	});
}

var sellersGridObject;
var sellerPartnerId;
var sellerFromPartner = false;
// Sellers Tab
function companySellersGetAllSellers(compId, partnerId) {
	sellersGridObject = null;
	var dataToSend = "company.id=" + compId + "&format=json";
	$.ajax({
		url : sellerShowUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if (partnerId) {
				sellerPartnerId = partnerId;
				sellerFromPartner = true;
			}
			var gridColumns = [{
				id: "name",
				name: companySellers_nameLabel,
				field: "id",
				width: 20,
				resizable: true,
				formatter: companySellersNameCellFormatter,
				sortable: false
			},{
				id: "email",
				name: companySellers_emailLabel,
				field: "email",
				width: 32,
				resizable: true
			},{
				id: "admin",
				name: companySellers_adminLabel,
				field: "admin",
				width: 12,
				resizable: true,
				formatter: companySellersAdminCellFormatter
			},{
				id: "sell",
				name: companySellers_sellerLabel,
				field: "sell",
				width: 12,
				resizable: true,
				formatter: companySellersSellerCellFormatter
			},{
				id: "validator",
				name: companySellers_validatorLabel,
				field: "validator",
				width: 12,
				resizable: true,
				formatter: companySellersValidatorCellFormatter
			},{
				id: "active",
				name: companySellers_activeLabel,
				field: "active",
				width: 12,
				resizable: true,
				formatter: companySellersActiveCellFormatter
			}
			];
			var gridOptions = {
				editable : false,
				enableAddRow : false,
				asyncEditorLoading : false,
				forceFitColumns : true,
				enableCellNavigation: false,
				enableColumnReorder:false,
				rowHeight : 25
			};
			var gridData = [];
			var sellers = response;
			if(profiles){
				for ( var i = 0; i < sellers.length; i++) {
					gridData[gridData.length] = {
						id: i,
						sellerId: sellers[i].id,
						companyId: compId,
						firstName: sellers[i].firstName,
						lastName: sellers[i].lastName,
						email: sellers[i].email,
						active: sellers[i].active,
						admin: sellers[i].admin,
						agent: sellers[i].agent,
						sell: sellers[i].sell,
						validator: sellers[i].validator,
						companies: sellers[i].companies,
						profiles: sellers[i].profiles
					}
				}
			}
			sellersGridObject = new Slick.Grid($("#sellersGrid"), gridData, gridColumns, gridOptions);
			sellersGridObject.setSelectionModel(new Slick.RowSelectionModel());
			sellersGridObject.invalidate();
		}
	});
}

function companySellersNameCellFormatter(row, cell, value, columnDef, dataContext) {
	if (value == null || value === "")
		return "";
	return "<a href='javascript:void(0)' onclick='companySellersGetDetails(" + dataContext.companyId + "," + dataContext.sellerId + ", " + false + ");'>" + dataContext.firstName + " " + dataContext.lastName + "</a>";
}

function companySellersAdminCellFormatter(row, cell, value, columnDef, dataContext) {
	var checkbox = "<input type='checkbox'";
	checkbox += (value) ? " checked" : "";
	checkbox += (sellerFromPartner && (dataContext.sellerId == sellerPartnerId)) ? " disabled" : " onClick='companySellersUpdateSeller(" + dataContext.companyId + "," + dataContext.sellerId + ", \"seller.admin\", " + !value + ")'";
	checkbox += " />";
	return checkbox;
}

function companySellersSellerCellFormatter(row, cell, value, columnDef, dataContext) {
	var checkbox = "<input type='checkbox'";
	checkbox += (value) ? " checked" : "";
	checkbox += " onClick='companySellersUpdateSeller(" + dataContext.companyId + "," + dataContext.sellerId + ", \"seller.sell\", " + !value + ")' />";
	return checkbox;
}

function companySellersValidatorCellFormatter(row, cell, value, columnDef, dataContext) {
	var checkbox = "<input type='checkbox'";
	checkbox += (value) ? " checked" : "";
	checkbox += " onClick='companySellersUpdateSeller(" + dataContext.companyId+ "," + dataContext.sellerId + ", \"seller.validator\", " + !value + ")' />";
	return checkbox;
}

function companySellersActiveCellFormatter(row, cell, value, columnDef, dataContext) {
	var checkbox = "<input type='checkbox'";
	checkbox += (value) ? " checked" : "";
	checkbox += (sellerFromPartner && (dataContext.sellerId == sellerPartnerId)) ? " disabled" : " onClick='companySellersUpdateSeller(" + dataContext.companyId + "," + dataContext.sellerId + ", \"seller.active\", " + !value + ")'";
	checkbox += " />";
	return checkbox;
}

function companySellersGetDetails(compId, sellerId, isCreate) {
	$.get(
		sellerDialogPageUrl,
		{},
		function(htmlResponse) {
			htmlResponse = jQuery.trim(htmlResponse);
			companySellersGetProfiles(htmlResponse, compId, sellerId, isCreate);
		},
		"html"
	);
}

function companySellersGetProfiles(htmlResponse, compId, sellerId, isCreate){
	var dataToSend = "idStore=" + compId + "&format=json";
	$.ajax({
		url : companyShowProfilesUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			var profiles = response;
			companySellersPageSetup(htmlResponse, profiles, compId, sellerId, isCreate)
		}
	})
}

function companySellersPageSetup(htmlResponse, profiles, compId, sellerId, isCreate) {
	if ($("#companySellersDialog").dialog( "isOpen" ) !== true) {
		$("#companySellersDialog").empty();
		$("#companySellersDialog").html(htmlResponse);
		$("#companySellersDialog").dialog({
			width : "auto",
			height : "auto",
			title : isCreate ? companySellersTitleAddLabel : companySellersTitleEditLabel,
			resizable: false,
			modal : true,
			open: function(event) {
				companySellersPageInitControls(compId, sellerId, isCreate);
				companySellersPageInitFields(profiles, compId, sellerId, isCreate);
			},
			buttons : {
				cancelLabel : function() {
					$("#companySellersDialog").dialog("close");
				},
				createLabel : function() {
					if(companySellersValidateForm(isCreate)) {
						companySellersCreateSeller(compId);
					}
				},
				resetPasswordLabel : function() {
					companySellersResetPassword(compId, sellerId);
				}
			}
		});
	}
}

function companySellersPageInitControls(compId, sellerId, isCreate){
	$(".sellerConfirmEmailDiv").show();
	$(".sellerCompaniesDiv").show();
	$(".sellerProfilesDiv").show();

	if(isCreate){
		$("#sellerCompaniesDiv, #sellerProfilesDiv").hide().remove();
		$(".ui-dialog-buttonpane").find("button:contains('resetPasswordLabel')").hide().remove();
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
		$(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
		$(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
	}
	else{
		$("#sellerConfirmEmailDiv").hide().remove();

		$(".ui-dialog-buttonpane").find("button:contains('createLabel')").hide().remove();
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
		$(".ui-dialog-buttonpane").find("button:contains('resetPasswordLabel')").addClass("ui-update-button");
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + closeLabel + "</span>");
		$(".ui-dialog-buttonpane").find("button:contains('resetPasswordLabel')").html("<span class='ui-button-text'>" + resetPasswordLabel + "</span>");
	}
}

function companySellersPageInitFields(profiles, compId, sellerId, isCreate){
	$("#sellerFirstName, #sellerLastName, #sellerEmail, #sellerConfirmEmail, #sellerCompanies, #sellerProfiles").val("");
	$("#sellerEmail").removeAttr("readonly");
	$("#sellerAdmin, #sellerActive").removeAttr("disabled");
	$("#sellerAdmin, #sellerSell, #sellerValidator, #sellerActive").prop("checked", false);
	if (!isCreate){
		$("#sellerEmail").attr("readonly", "readonly").addClass("sellerEmailReadOnly");
		if(sellerFromPartner && (sellerId == sellerPartnerId)){
			$("#sellerAdmin, #sellerActive").attr("disabled", "disabled");
		}

		var seller = null;
		var data = sellersGridObject.getData();
		for (var i = 0; i < data.length; i++) {
			if (data[i].sellerId == sellerId){
				seller = data[i];
				break;
			}
		}
		if(seller){
			$("#sellerFirstName").val(seller.firstName);
			$("#sellerLastName").val(seller.lastName);
			$("#sellerEmail").val(seller.email);
			$("#sellerAdmin").prop("checked", seller.admin);
			$("#sellerSell").prop("checked", seller.sell);
			$("#sellerValidator").prop("checked", seller.validator);
			$("#sellerActive").prop("checked", seller.active);
			var companiesHtml = "";
			if(sellerFromPartner){
				for (var i = 0; i < seller.companies.length; i++) {
					companiesHtml += "<option value=" + seller.companies[i] + " selected disabled>" + seller.companies[i] + "</option>";
				}
			}
			else{
				for (var i = 0; i < companies.length; i++) {
					companiesHtml += "<option value=" + companies[i].code;
					for (var j = 0; j < seller.companies.length; j++) {
						if (companies[i].code == seller.companies[j]) {
							companiesHtml += " selected";
							break;
						}
					}
					companiesHtml += ">" + companies[i].code + "</option>";
				}
			}
			$("#sellerCompanies").html(companiesHtml).multiselect({
				header: false,
				noneSelectedText: multiselectNoneSelectedTextLabel,
				minWidth: 100,
				height: 150,
				selectedList: 4
			});
			var profilesHtml = "";
			for (var i = 0; i < profiles.length; i++) {
				profilesHtml += "<option value=" + profiles[i].id;
				for (var j = 0; j < seller.profiles.length; j++) {
					if (profiles[i].id == seller.profiles[j].id) {
						profilesHtml += " selected";
						break;
					}
				}
				profilesHtml += ">" + profiles[i].name + "</option>";
			}
			$("#sellerProfiles").html(profilesHtml).multiselect({
				header: false,
				noneSelectedText: multiselectNoneSelectedTextLabel,
				minWidth: 100,
				height: 150,
				selectedList: 4
			});
		}
		companySellersInitAutoUpdateEvents(compId, sellerId);
	}
}

function companySellersInitAutoUpdateEvents(compId, sellerId){
	$("#sellerFirstName").unbind().change(function(){
		if($("#sellerFirstName").val() == "") {
			$("#formSeller #sellerFirstName").focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companySellersErrors_requiredFirstNameLabel,
				stay : false,
				type : "error"
			});
		}
		else{
			companySellersUpdateSeller(compId, sellerId, "seller.firstName", $("#sellerFirstName").val())
		}
	});

	$("#sellerLastName").unbind().change(function(){
		if($("#sellerLastName").val() == "") {
			$("#formSeller #sellerLastName").focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companySellersErrors_requiredLastNameLabel,
				stay : false,
				type : "error"
			});
		}
		else{
			companySellersUpdateSeller(compId, sellerId, "seller.lastName", $("#sellerLastName").val())
		}
	});

	$("#sellerCompanies").bind("multiselectclick", function(event, ui) {
		if(ui.checked)
			companySellersAddCompany(compId, sellerId, ui.value);
		else {
			var checkedValues = $("#sellerCompanies").multiselect("getChecked").map(function(){
				return this.value;
			}).get();
			if(checkedValues.length == 0){
				$("#sellerCompanies").val(ui.value);
				$("#sellerCompanies").multiselect("refresh");
				jQuery.noticeAdd({
					stayTime : 2000,
					text : companySellersErrors_requiredCompaniesLabel,
					stay : false,
					type : "error"
				});
			}
			else
				companySellersRemoveCompany(compId, sellerId, ui.value);
		}
	});

	$("#sellerProfiles").bind("multiselectclick", function(event, ui) {
		if(ui.checked)
			companySellersAddProfile(compId, sellerId, ui.value);
		else {
			companySellersRemoveProfile(compId, sellerId, ui.value);
		}
	});

	$("#sellerAdmin").unbind().change(function() {
		companySellersUpdateSeller(compId, sellerId, "seller.admin", $("#sellerAdmin").is(":checked"));
	});
	$("#sellerSell").unbind().change(function() {
		companySellersUpdateSeller(compId, sellerId, "seller.sell", $("#sellerSell").is(":checked"));
	});
	$("#sellerValidator").unbind().change(function() {
		companySellersUpdateSeller(compId, sellerId, "seller.validator", $("#sellerValidator").is(":checked"));
	});
	$("#sellerActive").unbind().change(function() {
		companySellersUpdateSeller(compId, sellerId, "seller.active", $("#sellerActive").is(":checked"));
	});
}

function companySellersValidateForm(isCreate) {
	if($("#sellerFirstName").val() == "") {
		$("#formSeller #sellerFirstName").focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companySellersErrors_requiredFirstNameLabel,
			stay : false,
			type : "error"
		});
		return false;
	}

	if ($("#sellerLastName").val() == "") {
		$("#formSeller #sellerLastName").focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companySellersErrors_requiredLastNameLabel,
			stay : false,
			type : "error"
		});
		return false;
	}

	if ($("#sellerEmail").val() == "" || !$("input#sellerEmail")[0].checkValidity()) {
		$("#formSeller #sellerEmail").focus();
		var message = ($("#sellerEmail").val() == "") ? companySellersErrors_requiredEmailLabel : companySellersErrors_invalidEmailLabel;
		jQuery.noticeAdd({
			stayTime : 2000,
			text : message,
			stay : false,
			type : "error"
		});
		return false;
	}
	if (isCreate) {
		if ($("#sellerConfirmEmail").val() == "" || !$("input#sellerConfirmEmail")[0].checkValidity()) {
			$("#formSeller #sellerConfirmEmail").focus();
			var message = ($("#sellerConfirmEmail").val() == "") ? companySellersErrors_confirmEmailLabel : companySellersErrors_invalidEmailLabel;
			jQuery.noticeAdd({
				stayTime : 2000,
				text : message,
				stay : false,
				type : "error"
			});
			return false;
		}
		if ($("#sellerEmail").val() != $("#sellerConfirmEmail").val()) {
			$("#formSeller #sellerConfirmEmailLabel").focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companySellersErrors_emailsDontMatchLabel,
				stay : false,
				type : "error"
			});
			return false;
		}
	}
	return true;
}

function companySellersCreateSeller(compId) {
	var dataToSend = "";
	dataToSend += "seller.firstName=" + $("#sellerFirstName").val();
	dataToSend += "&seller.lastName=" + $("#sellerLastName").val();
	dataToSend += "&seller.email=" + $("#sellerEmail").val();
	dataToSend += "&seller.admin=" + $("#sellerAdmin").is(":checked");
	dataToSend += "&seller.sell=" + $("#sellerSell").is(":checked");
	dataToSend += "&seller.validator=" + $("#sellerValidator").is(":checked");
	dataToSend += "&seller.active=" + $("#sellerActive").is(":checked");
	dataToSend += "&seller.company.id=" + compId;
	dataToSend += "&format=json";

	$("#companySellersDialog").parent().showLoading({"addClass": "loading-indicator-SquaresCircleBig"});
	$.ajax({
		url : sellerSaveUrl,
		type : "POST",
		noticeType : "POST",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$("#companySellersDialog").parent().hideLoading();
			if (response.success) {
				$("#companySellersDialog").dialog("close");
				companySellersGetAllSellers(compId);
			}
			else {
				jQuery.noticeAdd({
					stayTime : 2000,
					text : companySellersErrors_emailMustBeUniqueLabel,
					stay : false,
					type : "error"
				});
			}
		}
	});
}

function companySellersUpdateSeller(compId, sellerId, property, value) {
	var dataToSend = "seller.company.id=" + compId + "&seller.id=" + sellerId;
	dataToSend += "&" + property + "=" + value;
	dataToSend += "&format=json";

	$.ajax({
		url : sellerUpdateUrl,
		type : "POST",
		noticeType : "PUT",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if (!response.success) {
				jQuery.noticeAdd({
					stayTime : 2000,
					text : response.errors,
					stay : false,
					type : "error"
				});
			}
            else
                companySellersGetAllSellers(compId);
		}
	});
}

function companySellersAddCompany(compId, sellerId, companyCode){
	var dataToSend = "company.code=" + companyCode + "&seller.id=" + sellerId + "&format=json";
	$.ajax({
		url : sellerAddCompanyUrl,
		type : "POST",
		noticeType : "PUT",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if (!response.success) {
				jQuery.noticeAdd({
					stayTime : 2000,
					text : response.errors,
					stay : false,
					type : "error"
				});
			}
            else
                companySellersGetAllSellers(compId);
		}
	});
}

function companySellersRemoveCompany(compId, sellerId, companyCode){
	var dataToSend = "company.code=" + companyCode + "&seller.id=" + sellerId + "&format=json";
	$.ajax({
		url : sellerRemoveCompanyUrl,
		type : "POST",
		noticeType : "PUT",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if (!response.success) {
				jQuery.noticeAdd({
					stayTime : 2000,
					text : response.errors,
					stay : false,
					type : "error"
				});
			}
            else
                companySellersGetAllSellers(compId);
		}
	});
}

function companySellersAddProfile(compId, sellerId, profileId){
	var dataToSend = "idProfile=" + profileId + "&idUser=" + sellerId + "&format=json";
	$.ajax({
		url : sellerAddProfileUrl,
		type : "POST",
		noticeType : "PUT",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if (response.errors) {
				jQuery.noticeAdd({
					stayTime : 2000,
					text : response.errors,
					stay : false,
					type : "error"
				});
			}
            else
                companySellersGetAllSellers(compId);
		}
	});
}

function companySellersRemoveProfile(compId, sellerId, profileId){
	var dataToSend = "idProfile=" + profileId + "&idUser=" + sellerId + "&format=json";
	$.ajax({
		url : sellerRemoveProfileUrl,
		type : "POST",
		noticeType : "PUT",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if (response.errors) {
				jQuery.noticeAdd({
					stayTime : 2000,
					text : response.errors,
					stay : false,
					type : "error"
				});
			}
            else
                companySellersGetAllSellers(compId);
		}
	});
}

function companySellersResetPassword(compId, sellerId) {
	$("#companySellersDialog").parent().showLoading({"addClass": "loading-indicator-SquaresCircleBig"});
	var dataToSend = "id=" + sellerId + "&format=json";
	$.ajax({
		url : sellerPasswordUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$("#companySellersDialog").parent().hideLoading();
			$("#companySellersDialog").dialog("close");
			companySellersGetAllSellers(compId);
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companySellers_passwordResetSuccessLabel,
				stay : false,
				type : "success"
			});
		}
	});
}