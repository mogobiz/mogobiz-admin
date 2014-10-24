function companySellerAutoUpdateCheckbox(compId, objId, objProperty) {
    $(objId).unbind();
    $(objId).change(function() {
        var dataToSend = "company.id=" + compId;
        dataToSend += "&" + objProperty + "=" + $(objId).is(":checked");
        dataToSend += "&format=json";
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

function companyGetSellerOnLineValidation(compId) {
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
                paymentFormValues = paymentFormValues.replace(/(^\s+|\s+$)/, '');
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
                    ('That appears to be invalid JSON!')
                    return false;
                }
            }
        }
    });
}

var sellersGridObject;
var self = false;
// Sellers Tab
function sellersGridSetup(partnerId) {
	if (partnerId) {
		self = partnerId;
	}
	var columns = [
		{ id: "name", name: companySellers_nameLabel, field: "id", width:20, resizable: true, formatter: sellersNameCellFormatter, sortable: false },
		{ id: "email", name: companySellers_emailLabel, field: "email", width:32, resizable: true },
		{ id: "admin", name: companySellers_adminLabel, field: "admin", width:12, resizable: true, formatter: sellersAdminCellFormatter },
		{ id: "sell", name: companySellers_sellerLabel, field: "sell", width:12, resizable: true, formatter: sellersSellerCellFormatter },
		{ id: "validator", name: companySellers_validatorLabel, field: "validator", width:12, resizable: true, formatter: sellersValidatorCellFormatter },
		{ id: "active", name: companySellers_activeLabel, field: "active", width:12, resizable: true, formatter: sellersActiveCellFormatter }
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
	
	if (!sellersGridObject) {
		sellersGridObject= new Slick.Grid($("#sellersGrid"), [], columns, options);
	}
	else {
		$("#sellersGrid").empty();
		sellersGridObject= new Slick.Grid($("#sellersGrid"), [], columns, options);
	}
}

function sellersNameCellFormatter(row, cell, value, columnDef, dataContext) {
	if (value == null || value === "")
		return "";
	return "<a href='javascript:void(0)' onclick='sellerRowEdit("+ dataContext.companyId + "," + dataContext.id + ");'>" + dataContext.firstName + " " + dataContext.lastName + "</a>";
}

/**
 * sellersAdminCellFormatter
 */
function sellersAdminCellFormatter(row, cell, value, columnDef, dataContext) {	
	if(self && (dataContext.id == self)) {
		if (dataContext.admin == true) {
			return "<input type='checkbox' name='seller.admin' value='true' checked disabled onClick='sellerAdminUpdate("+dataContext.companyId + "," +dataContext.id+ "," + !dataContext.admin + ")' />";
		}
		else {
			return "<input type='checkbox' name='seller.admin' value='true' disabled onClick='sellerAdminUpdate("+dataContext.companyId + "," +dataContext.id+ "," + !dataContext.admin + ")' />";
		}
	}
	else {
		if (dataContext.admin == true) {
			return "<input type='checkbox' name='seller.admin' value='true' checked  onClick='sellerAdminUpdate("+dataContext.companyId + "," +dataContext.id+ "," + !dataContext.admin + ")' />";
		}
		else {
			return "<input type='checkbox' name='seller.admin' value='true'  onClick='sellerAdminUpdate("+dataContext.companyId + "," +dataContext.id+ "," + !dataContext.admin + ")' />";
		}
	}
}


/**
 * sellersSellerCellFormatter
 */
function sellersSellerCellFormatter(row, cell, value, columnDef, dataContext) {
	if (dataContext.sell == true) {
		return "<input type='checkbox' name='seller.sell' checked  onClick='sellerSellUpdate("+dataContext.companyId+ "," +dataContext.id+ "," + !dataContext.sell + ")' />";
	}
	else {
		return "<input type='checkbox' name='seller.sell'  onClick='sellerSellUpdate("+dataContext.companyId+ "," +dataContext.id+ "," + !dataContext.sell + ")' />";
	}
}

/**
 * sellersValidatorCellFormatter
 */
function sellersValidatorCellFormatter(row, cell, value, columnDef, dataContext) {
	if (dataContext.validator == true) {
		return "<input type='checkbox' name='seller.validator' checked  onClick='sellerValidatorUpdate("+dataContext.companyId+ "," +dataContext.id+ "," + !dataContext.validator+ ")' />";
	}
	else {
		return "<input type='checkbox' name='seller.validator'  onClick='sellerValidatorUpdate("+dataContext.companyId+ "," +dataContext.id+ "," + !dataContext.validator+ ")' />";
	}
}


/**
 * sellersActiveCellFormatter
 */

function sellersActiveCellFormatter(row, cell, value, columnDef, dataContext) {
	if(self && (dataContext.id == self)) {
		if (dataContext.active == true) {
			return "<input type='checkbox' name='seller.active' checked disabled  onClick='sellerActiveUpdate("+dataContext.companyId+ "," +dataContext.id+ "," + !dataContext.active + ")' />";
		}
		else {
			return "<input type='checkbox' name='seller.active' disabled  onClick='sellerActiveUpdate("+dataContext.companyId+ "," +dataContext.id+ "," + !dataContext.active + ")' />";
		}
	}
	else {
		if (dataContext.active == true) {
			return "<input type='checkbox' name='seller.active' checked " +
					" onClick='sellerActiveUpdate("+dataContext.companyId+ "," +dataContext.id+ "," + !dataContext.active + ")' />";
		}
		else {
			return "<input type='checkbox' name='seller.active' " +
					" onClick='sellerActiveUpdate("+dataContext.companyId+ "," +dataContext.id+ "," + !dataContext.active + ")' />";
		}
	}
}


function sellerRowEdit(compId,sellerId) {
	getSellerDialogPage(compId,sellerId);
}

//Show all sellers
function sellersShowAll(compId) {
    var dataToSend = "company.id="+compId;
    dataToSend += "&format=json";

    $.ajax({
        url : sellerShowUrl+ '?' + dataToSend,
        type : "GET",
        data : '',
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            for(var i = 0; i < response.length; i++){
                response[i].companyId = compId;
            }
            sellersGridObject.setData(response);
            sellersGridObject.invalidate();
        }
    });
}

// Seller Dialog
function getSellerDialogPage(compId,sellerId) {
	$.get(sellerDialogPageUrl, function(responseText) {
		responseText = jQuery.trim(responseText);
		if (sellerId == "-1") { // create new seller
			showCreateSellerDialog(responseText,compId);
		}
		else { // edit seller
			showEditSellerDialog(responseText,compId,sellerId)
		}
	}, "html");
}
	
function showCreateSellerDialog(htmlresponse,compId) {
	if ($('#sellerForm').dialog( "isOpen" ) !== true) {
		$('#sellerForm').empty();
		$('#sellerForm').html(htmlresponse);
		$('#formSeller .errors').hide();
		
		$('#sellerForm').dialog({
			width : 'auto',
			height : 'auto',
			title : "Create New Seller",
			resizable: false,
			modal : true,
			open: function(event) {
				// Show Confirm Email Div
				$('.sellerConfirmEmailDiv').show();
                companySellerDrawCountriesMultiSelect(compId);
				$('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
				$('.ui-dialog-buttonpane').find('button:contains("createLabel")').addClass("ui-create-button");
				$('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">'+cancelLabel+'</span>');
				$('.ui-dialog-buttonpane').find('button:contains("createLabel")').html('<span class="ui-button-text">'+createLabel+'</span>');
			},
			buttons : {
				cancelLabel : function() {
					closeSellerDialog(compId);
				},
				createLabel : function() {
					if(validateSellerDialog()) {
			    		sellerAddNew(compId);
			    	}
				}
			}
		});
	}
}

function showEditSellerDialog(htmlresponse,compId,sellerId) {
	if ($('#sellerForm').dialog( "isOpen" ) !== true) {
		$('#sellerForm').empty();
		$('#sellerForm').html(htmlresponse);
		$('#formSeller .errors').hide();
		
		$('#sellerForm').dialog({
			width : 'auto',
			height : 'auto',
			title : "Edit Seller",
			resizable: false,
			modal : true,
			open: function(event) {
				// Fill the Form
                $(".sellerCompaniesDiv").show();
				sellerShow(compId, sellerId);
				// Disable modifying Email
				$('#sellerEmail').attr('readonly','readonly')
				$('#sellerEmail').addClass('sellerEmailReadOnly');
				// Disable the partner from modifying the admin and active checkbox related to himself
				if(self && (sellerId == self)) {
					$('#sellerAdmin').attr('disabled','disabled');
					$('#sellerActive').attr('disabled','disabled');
				}
				
				$('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
				$('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">'+closeLabel+'</span>');
				$('.ui-dialog-buttonpane').find('button:contains("resetPasswordLabel")').html('<span class="ui-button-text">'+resetPasswordLabel+'</span>');
			},
			buttons : {
				cancelLabel : function() {
					closeSellerDialog(compId);
				},
				resetPasswordLabel : function() {
					sellerResetPassword(sellerId);
				}
			}
		});
	}
}

function companySellerDrawCountriesMultiSelect(sellerCompanies, compId){
    var html = "";
    var selected = "";
    if(self){
        for (var i = 0; i < sellerCompanies.length; i++) {
            html += "<option value=" + sellerCompanies[i] + " selected disabled>" + sellerCompanies[i] + "</option>";
        }
    }
    else {
        for (var i = 0; i < companies.length; i++) {
            selected = "";
            if (companies[i].id == compId) {
                selected = " selected";
            }
            else {
                for (var j = 0; j < sellerCompanies.length; j++) {
                    if (companies[i].code == sellerCompanies[j]) {
                        selected = " selected";
                        break;
                    }
                }
            }
            html += "<option value=" + companies[i].code + selected + ">" + companies[i].code + "</option>";
        }
    }
    $("#sellerCompanies").append(html).multiselect({
        header: false,
        noneSelectedText: multiselectNoneSelectedTextLabel,
        minWidth: 100,
        height: 150,
        selectedList: 4
    });
}

function companySellerInitAutoUpdateEvents(compId, sellerId){
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
            sellerAutoUpdate(compId, sellerId, "seller.firstName", $("#sellerFirstName").val())
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
            sellerAutoUpdate(compId, sellerId, "seller.lastName", $("#sellerLastName").val())
        }
    });
    $("#sellerCompanies").bind("multiselectclick", function(event, ui) {
        if(ui.checked)
            sellerAddCompany(sellerId, ui.value);
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
                sellerRemoveCompany(sellerId, ui.value);
        }
    });
    $("#sellerAdmin").unbind().change(function() {
        sellerAutoUpdate(compId, sellerId, "seller.admin", $("#sellerAdmin").is(":checked"));
    });
    $("#sellerSell").unbind().change(function() {
        sellerAutoUpdate(compId, sellerId, "seller.sell", $("#sellerSell").is(":checked"));
    });
    $("#sellerValidator").unbind().change(function() {
        sellerAutoUpdate(compId, sellerId, "seller.validator", $("#sellerValidator").is(":checked"));
    });
    $("#sellerActive").unbind().change(function() {
        sellerAutoUpdate(compId, sellerId, "seller.active", $("#sellerActive").is(":checked"));
    });
}

function closeSellerDialog(compId) {
    if(compId) {
        sellersGridSetup();
        sellersShowAll(compId);
    }
    $('#sellerForm').empty();
	$('#sellerForm').dialog('close');
}

function validateSellerDialog() {
	var valid = false;
	if($('#sellerFirstName').val() == "") {
		$('#formSeller #sellerFirstName').focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companySellersErrors_requiredFirstNameLabel,
			stay : false,
			type : 'error'
		});
	}
	else if ($('#sellerLastName').val() == "") {
		$('#formSeller #sellerLastName').focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companySellersErrors_requiredLastNameLabel,
			stay : false,
			type : 'error'
		});
	}
	else if ($('#sellerEmail').val() == "") {
		$('#formSeller #sellerEmail').focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companySellersErrors_requiredEmailLabel,
			stay : false,
			type : 'error'
		});
	}
	else if (!$('input#sellerEmail')[0].checkValidity()) {
		$('#formSeller #sellerEmail').focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companySellersErrors_invalidEmailLabel,
			stay : false,
			type : 'error'
		});
	}
	else if ($('.sellerConfirmEmailDiv').is(":visible")) {
		if ($('#sellerConfirmEmail').val() == "") {
			$('#formSeller #sellerConfirmEmail').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companySellersErrors_confirmEmailLabel,
				stay : false,
				type : 'error'
			});
		}
		else if (!$('input#sellerConfirmEmail')[0].checkValidity()){
			$('#formSeller #sellerConfirmEmail').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companySellersErrors_invalidEmailLabel,
				stay : false,
				type : 'error'
			});
		}
		else if ($('#sellerEmail').val() != $('#sellerConfirmEmail').val()) {
			$('#formSeller #sellerConfirmEmailLabel').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companySellersErrors_emailsDontMatchLabel,
				stay : false,
				type : 'error'
			});
		}
		else {
			$('#formSeller .errors').html("");
			$('#formSeller .errors').hide();
			valid = true;
		}
	}
	else {
		$('#formSeller .errors').html("");
		$('#formSeller .errors').hide();
		valid = true;
	}
	return valid;
}

//Fill seller information in dialog
function sellerShow(compId, sellerId) {
	var dataToSend = "company.id="+compId;
	dataToSend += "&format=json";

	$.ajax({
		url : sellerShowUrl + '?id=' + sellerId + '&' + dataToSend,
		type : "GET",
		data : '',
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			var seller = response;
			var sellerEncoded = $.toJSON(seller);
			var sellerFormValues = sellerEncoded;
			sellerFormValues = sellerFormValues.replace(/(^\s+|\s+$)/, '');
			sellerFormValues = "(" + sellerFormValues + ");";
			try	{
				var json = eval(sellerFormValues);
				var newJson = new Object();
				for(var key in json){
					var newKey = "seller."+key;
					newJson[newKey] = json[key];
				}
			}
			catch(err)	{
				('That appears to be invalid JSON!')
				return false;
			}
			var sellerForm = document.forms['formSeller'];
			$(sellerForm).populate(newJson, {debug:1});
			if(response.admin){
				$('#formSeller #sellerAdmin').attr("checked","checked");
			}
			if(response.sell){
				$('#formSeller #sellerSell').attr("checked","checked");
			}
			if(response.validator){
				$('#formSeller #sellerValidator').attr("checked","checked");
			}
			if(response.active){
				$('#formSeller #sellerActive').attr("checked","checked");
			}
            companySellerDrawCountriesMultiSelect(seller.companies, compId);
            companySellerInitAutoUpdateEvents(compId, sellerId);
		}
	});
}

function sellerAddNew(compId) {
	var dataToSend = $('#formSeller').serialize();
    dataToSend += "&seller.admin=" + $("#formSeller #sellerAdmin").is(":checked");
    dataToSend += "&seller.sell=" + $("#formSeller #sellerSell").is(":checked");
    dataToSend += "&seller.validator=" + $("#formSeller #sellerValidator").is(":checked");
	dataToSend += "&seller.active=" + $("#formSeller #sellerActive").is(":checked");
	dataToSend += "&seller.company.id="+compId;
	dataToSend += "&format=json";
	
	$('#sellerForm').parent().showLoading({'addClass': 'loading-indicator-SquaresCircleBig'});
	
	$.ajax({
		url : sellerSaveUrl,
		type : "POST",
		noticeType : "POST",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$('#sellerForm').parent().hideLoading();
			if (response.success) {
				closeSellerDialog(compId);
			}
			else {
				jQuery.noticeAdd({
					stayTime : 2000,
					text : companySellersErrors_emailMustBeUniqueLabel,
					stay : false,
					type : 'error'
				});
			}
		}
	});
}

function sellerAutoUpdate(compId, sellerId, property, value) {
    var dataToSend = "seller.company.id="+compId;
    dataToSend += "&seller.id="+sellerId;
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
                showErrors('#formSeller .errors', response.errors);
            }
        }
    });
}

function sellerAddCompany(sellerId, companyCode){
    var dataToSend = "company.code=" + companyCode;
    dataToSend += "&seller.id=" + sellerId;
    dataToSend += "&format=json";

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
                showErrors('#formSeller .errors', response.errors);
            }
        }
    });
}

function sellerRemoveCompany(sellerId, companyCode){
    var dataToSend = "company.code=" + companyCode;
    dataToSend += "&seller.id=" + sellerId;
    dataToSend += "&format=json";

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
                showErrors('#formSeller .errors', response.errors);
            }
        }
    });
}

function sellerAdminUpdate(compId,sellerId,admin) {
	var dataToSend = "seller.company.id="+compId;
	dataToSend += "&seller.id="+sellerId;
	dataToSend +=  "&seller.admin="+admin;
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
			if (response.success) {
				sellersGridSetup();
				sellersShowAll(compId);
			}
		}
	});
}

function sellerSellUpdate(compId,sellerId,sell) {
	var dataToSend = "seller.company.id="+compId;
	dataToSend += "&seller.id="+sellerId;
	dataToSend +=  "&seller.sell="+sell;
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
			if (response.success) {
				sellersGridSetup();
				sellersShowAll(compId);
			}
		}
	});
}

function sellerValidatorUpdate(compId,sellerId,validator) {
	var dataToSend = "seller.company.id="+compId;
	dataToSend += "&seller.id="+sellerId;
	dataToSend +=  "&seller.validator="+validator;
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
			if (response.success) {
				sellersGridSetup();
				sellersShowAll(compId);
			}
		}
	});
}

function sellerActiveUpdate(compId,sellerId,active) {
	var dataToSend = "seller.company.id="+compId;
	dataToSend += "&seller.id="+sellerId;
	dataToSend +=  "&seller.active="+active;
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
			if (response.success) {
				sellersGridSetup();
				sellersShowAll(compId);
			}
		}
	});
}

function sellerResetPassword(sellerId) {
	$('#sellerForm').parent().showLoading({'addClass': 'loading-indicator-SquaresCircleBig'});
	$.ajax({
		url : sellerPasswordUrl + '?id=' + sellerId + '&format=json',
		type : "GET",
		data : '',
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$('#sellerForm').parent().hideLoading();
			closeSellerDialog();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companySellers_passwordResetSuccessLabel,
				stay : false,
				type : 'success'
			});
		}
	});
}