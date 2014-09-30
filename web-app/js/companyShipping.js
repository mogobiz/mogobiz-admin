function companyUpdateShippingPolicy(compId, updates, str) {
	var dataToSend = $('#formShipping').serialize();
	dataToSend += "&company.shippingInternational=" + $("#formShipping #shippingAllowInternational").is(":checked");

	dataToSend += "&company.id="+compId;
	dataToSend += getShippingCarriersDataToSend();
	dataToSend += "&format=json";

	$.ajax({
		url : shippingPolicyUpdateUrl,
		type : "POST",
		noticeType : "PUT",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if (response.success) {
				updateCompanyCalls(compId, updates, str);
			}
			else {
				$('#shippingTab').click();
				showErrors('#formShipping .errors', response.errors);
			}
		}
	});
}

function companyGetShippingPolicy(compId) {
	var dataToSend = "company.id="+compId;
	dataToSend += "&format=json";

	$.ajax({
		url : shippingPolicyShowUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if (response.success) {
				var shipping = response.data;
				var shippingEncoded = $.toJSON(shipping);
				var shippingFormValues = shippingEncoded;
				shippingFormValues = shippingFormValues.replace(/(^\s+|\s+$)/, '');
				shippingFormValues = "(" + shippingFormValues + ");";
				try	{
					var json = eval(shippingFormValues);
					var newJson = new Object();
					for(var key in json){
						var newKey = "company."+key;
						if (key=='shipFrom') {
							var companyshipFromObj = json[key];
							for(var key1 in companyshipFromObj){
								var newKey1 = "company.shipFrom."+key1;
								newJson[newKey1] = companyshipFromObj[key1];
							}
						}
						else if (key == "weightUnit" && json[key]) {
							var newKey1 = "company.weightUnit.name";
							newJson[newKey1] = json[key].name;
						}
						else if (key == "refundPolicy" && json[key]) {
							var newKey1 = "company.refundPolicy.name";
							newJson[newKey1] = json[key].name;
						}
						else {
							newJson[newKey] = json[key];
						}
					}
				}
				catch(err)	{
                    console.log('That appears to be invalid JSON!')
					return false;
				}
				var shippingForm = document.forms['formShipping'];
				$(shippingForm).populate(newJson, {debug:1});

				// set multicheck combos values
				$("#shippingCountry").multiselect('uncheckAll');
				$('#shippingCountry').multiselect('refresh');

				$("#shippingCarriers").multiselect('uncheckAll');
				$("#shippingCarriers").multiselect('refresh');

				$("#shippingWeightUnit").multiselect('uncheckAll');
				$("#shippingWeightUnit").multiselect('refresh');

				$("#shippingRefundPolicy").multiselect('uncheckAll');
				$("#shippingRefundPolicy").multiselect('refresh');

				if(newJson["company.shipFrom.countryCode"] && newJson["company.shipFrom.countryCode"] != ""){
					$('#shippingCountry').find('option:contains(' + newJson["company.shipFrom.countryCode"] + ')').attr('selected','selected');
					$('#formShipping .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_shippingCountry"]').each(function() {
						if(this.value == newJson["company.shipFrom.countryCode"]) {
							this.click();
						}
					});
				}

				for(var key in newJson["company.shippingCarriers"]){
					if (newJson["company.shippingCarriers"][key]) {
						$('#formShipping .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_shippingCarriers"]').each(function() {
							if(this.value.toLowerCase().trim() == key) {
								 this.click();
							}
						});
					}
				}

				if (newJson["company.weightUnit.name"] && newJson["company.weightUnit.name"] != "") {
					$('#shippingWeightUnit').find('option:contains(' + newJson["company.weightUnit.name"] +')').attr('selected','selected');
					$('#formShipping .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_shippingWeightUnit"]').each(function() {
						if(this.value == newJson["company.weightUnit.name"]) {
							this.click();
						}
					});
				}

				if (newJson["company.refundPolicy.name"] && newJson["company.refundPolicy.name"] != "") {
					$('#shippingRefundPolicy').find('option:contains(' + newJson["company.refundPolicy.name"] +')').attr('selected','selected');
					$('#formShipping .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_shippingRefundPolicy"]').each(function() {
						if(this.title == newJson["company.refundPolicy.name"]) {
							this.click();
						}
					});
				}

				// set value of Allow International Shipping
				if(response.data.shippingInternational){
					$('#formShipping #shippingAllowInternational').attr("checked","checked");
				}
			}
			else {
				showErrors('#formShipping .errors', response.errors);
			}
		}
	});
}

function drawShippingCarriersMultiSelectList() {
	$("#shippingCarriers").multiselect({
		header: false,
		noneSelectedText: multiselectNoneSelectedTextLabel,
		minWidth: 100,
		selectedList: 4
	});
}

function getShippingCarriersDataToSend() {
	// Array of all list items
	var array_of_all_values = ["UPS","FedEx"] ;
	
	// Array of checked list items
	var array_of_checked_values = $("#shippingCarriers").multiselect("getChecked").map(function(){
		return this.value;
	}).get();
	
	// Array of unchecked list items
	var array_of_unchecked_values = [];
	var k = 0;
	$.each(array_of_all_values, function(i, tempvalue) {
		var flag = 0;
		$.each(array_of_checked_values, function(j, value) {
			if (value == tempvalue) {
				flag = 1;
			}
		});
		if (flag == 0) {
			array_of_unchecked_values[k] = tempvalue;
			k++;
		}
	});
	
	// Fill data to send
	var data = "";
	$.each(array_of_checked_values, function(i, value) {
		switch (value) {
		case "UPS":
			data += "&company.shippingCarriers.ups=true";
			break;
		case "FedEx":
			data += "&company.shippingCarriers.fedex=true";
			break;
		}
	});
	$.each(array_of_unchecked_values, function(i, value) {
		switch (value) {
		case "UPS":
			data += "&company.shippingCarriers.ups=false";
			break;
		case "FedEx":
			data += "&company.shippingCarriers.fedex=false";
			break;
		}
	});
	return data;
}

function validateShippingPolicy(showError) {
	var valid;
	if($('#shippingCountry').val() == null) {
		valid = false;
		if (showError) {
			$('#formShipping #shippingCountry').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companyShippingErrors_requiredCountryLabel,
				stay : false,
				type : 'error'
			});
		}
	}
	else if (!$('input#shippingHandlingTime')[0].checkValidity()) {
		valid = false;
		if (showError) {
			$('#formShipping #shippingHandlingTime').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companyShippingErrors_invalidHandlingTimeLabel,
				stay : false,
				type : 'error'
			});
		}
	}
	else if (!$('input#shippingReturnPolicy')[0].checkValidity()) {
		valid = false;
		if (showError) {
			$('#formShipping #shippingReturnPolicy').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companyShippingErrors_invalidReturnPolicyLabel,
				stay : false,
				type : 'error'
			});
		}
	}
	else {
		$('#formShipping .errors').html("");
		$('#formShipping .errors').hide();
		valid = true;
	}

	return valid;
}

function getStoreAddress() {
	// Country
	if ($('#generalCountry').val() == null) {
		$("#shippingCountry").multiselect('uncheckAll');
		$('#shippingCountry').multiselect('refresh');
	}
	else {
		$("#shippingCountry").multiselect('uncheckAll');
		$('#shippingCountry').find('option:contains('+$('#generalCountry option:selected').text()+')').attr('selected','selected');
		$('#shippingCountry').multiselect('refresh');
		$('#formShipping .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_shippingCountry"]').each(function() {
			if(this.title == $('#generalCountry option:selected').text()) {
				this.click();
			}
		});
	}

	$('#formShipping #shippingCity').val($('#formGeneral #generalCity').val());
	$('#formShipping #shippingPostalCode').val($('#formGeneral #generalPostalCode').val());
	$('#formShipping #shippingAddress1').val($('#formGeneral #generalAddress1').val());
	$('#formShipping #shippingAddress2').val($('#formGeneral #generalAddress2').val());
}

// Shipping Rules Functions
var companyShippingRulesGrid = null;
var companyShippingRulesPageOffset = 0;

function companyShippingRulesDrawAll(companyId){
    companyShippingRulesGrid = null;
    $.ajax({
        url : shippingRulesListUrl,
        type : "GET",
        data : "pageSize=" + companyGridPageSize + "&pageOffset=" + companyIBeaconPageOffset + "&format=json",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var gridColumns = [{
                id : "countryCode",
                name : companyShippingRulesCountryCodeLabel,
                field : "countryCode",
                width : 25,
                formatter : companyShippingRulesCountryCodeFormatter,
                cssClass : "cell-title"
            },{
                id : "maxAmount",
                name : companyShippingRulesMaxAmountLabel,
                field : "maxAmount",
                width : 25,
                cssClass : "cell-title"
            },{
                id : "minAmount",
                name : companyShippingRulesMinAmountLabel,
                field : "minAmount",
                width : 25,
                cssClass : "cell-title"
            },{
                id : "price",
                name : companyShippingRulesPriceLabel,
                field : "price",
                width : 25,
                cssClass : "cell-title"
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
            var rules = response.list;
            if(rules){
                for ( var i = 0; i < rules.length; i++) {
                    gridData[gridData.length] = {
                        "id" : i,
                        "companyId": companyId,
                        "ruleId": rules[i].id,
                        "price": rules[i].price,
                        "maxAmount": rules[i].maxAmount,
                        "minAmount": rules[i].minAmount,
                        "countryCode": rules[i].countryCode
                    }
                }
            }
            companyShippingRulesGrid = new Slick.Grid($("#shippingRulesGrid"), gridData, gridColumns, gridOptions);

            companyShippingRulesGrid.setSelectionModel(new Slick.RowSelectionModel());
            companyShippingRulesGrid.invalidate();
        }
    });
}

function companyShippingRulesCountryCodeFormatter(row, cell, value, columnDef, dataContext){
    for(var i = 0; i < countries.length; i++){
        if(countries[i].code == value){
            return '<a href="javascript:void(0);" onclick="companyShippingRulesGetEditPage(\'' + dataContext.companyId + '\',\'' + dataContext.ruleId + '\')">' + countries[i].name + '</a>';
        }
    }
}

function companyShippingRulesGetEditPage(companyId, ruleId){
    companyShippingRulesGetDetails(companyId, ruleId, false);
}

function companyShippingRulesGetDetails(companyId, ruleId, isCreate){
    $.get(
        companyShippingRulesCreatePageUrl,
        {},
        function(htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            companyShippingRulesPageSetup(htmlresponse, companyId, ruleId, isCreate);
        },
        "html"
    );
}

function companyShippingRulesPageSetup(htmlresponse, companyId, ruleId, isCreate){
    if ($("#shippingRuleDialog").dialog("isOpen") !== true) {
        $("#shippingRuleDialog").empty();
        $("#shippingRuleDialog").html(htmlresponse);
        $("#shippingRuleDialog").dialog({
            title : companyShippingRule_TitleLabel,
            modal : true,
            resizable : false,
            width : "auto",
            height : "auto",
            open : function(event) {
                companyShippingRulesInitControls(isCreate);
                companyShippingRulesInitFields(companyId, ruleId, isCreate);
            },
            buttons : {
                deleteLabel : function() {
                    companyShippingRulesDelete();
                },
                cancelLabel : function() {
                    $("#shippingRuleDialog").dialog("close");
                },
                updateLabel : function() {
                    if (companyShippingRulesValidateForm(isCreate))
                        companyShippingRulesUpdate();
                },
                createLabel : function() {
                    if (companyShippingRulesValidateForm(isCreate))
                        companyShippingRulesAddNew();
                }
            }
        });
    }
}

function companyShippingRulesInitControls(isCreate) {
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

function companyShippingRulesInitFields(companyId, ruleId, isCreate){
    $("#shippingRuleCompanyId").val(companyId);
    $("#shippingRuleMaxAmount, #shippingRuleMinAmount, #shippingRulePrice").val(0);
    $("#shippingRuleCountry").empty();

    if(isCreate){
        $("#localTaxRateCountry").empty();
        for(var i = 0; i < countries.length; i++){
            $("#shippingRuleCountry").append("<option value='" + countries[i].code + "'>" + countries[i].name + "</option>");
        }
        $("#shippingRuleCountry").multiselect("destroy");
        $("#shippingRuleCountry").multiselect({
            header : false,
            multiple : false,
            noneSelectedText : multiselectNoneSelectedTextLabel,
            minWidth : 229,
            height: 60,
            selectedList : 1
        });
    }
    else{
        var rule = null;
        var data = companyShippingRulesGrid.getData();
        for (var i = 0; i < data.length; i++) {
            if (data[i].ruleId == ruleId){
                rule =  data[i];
                break;
            }
        }
        if(rule){
            var html = "";
            for(var i = 0; i < countries.length; i++){
                if(rule.countryCode == countries[i].code){
                    html += "<option value='" + countries[i].code + "'>" + countries[i].name + "</option>";
                }
            }
            $("#shippingRuleCountry").html(html);
            $("#shippingRuleCountry").multiselect("destroy");
            $("#shippingRuleCountry").multiselect({header : false, multiple : false, selectedList : 1});
            $("#shippingRuleDialog .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_shippingRuleCountry']")[0].click();
            $("#shippingRuleCountry").multiselect("refresh");
            $("#shippingRuleCountry").multiselect("disable");
            $("#shippingRuleCountry").val(rule.countryCode);

            $("#shippingRuleId").val(rule.ruleId);
            $("#shippingRulePrice").val(rule.price);
            $("#shippingRuleMinAmount").val(rule.minAmount);
            $("#shippingRuleMaxAmount").val(rule.maxAmount);
        }
    }
}

function companyShippingRulesValidateForm(isCreate){
    if($("#shippingRuleCountry").val() == null || $("#shippingRulePrice").val() == "" || $("#shippingRuleMinAmount").val() == "" || $("#shippingRuleMaxAmount").val() == "") {
        if ($("#shippingRulePrice").val() == "")
            $("#shippingRuleForm #shippingRulePrice").focus();
        else if ($("#shippingRuleMinAmount").val() == "")
            $("#shippingRuleForm #shippingRuleMinAmount").focus();
        else if ($("#shippingRuleMaxAmount").val() == "")
            $("#shippingRuleForm #shippingRuleMaxAmount").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : "error"
        });
        return false;
    }
    if(companyShippingRulesExistCountryInGrid($("#shippingRuleCountry").val()) && isCreate){
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyShippingRuleErrors_uniqueCountryCode,
            stay : false,
            type : "error"
        });
        return false;
    }
    if (!$("input#shippingRulePrice")[0].checkValidity()) {
        $("#shippingRuleForm #shippingRulePrice").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyShippingRuleErrors_invalidPrice,
            stay : false,
            type : "error"
        });
        return false;
    }
    if (!$("input#shippingRuleMinAmount")[0].checkValidity()) {
        $("#shippingRuleForm #shippingRuleMinAmount").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyShippingRuleErrors_invalidMinAmount,
            stay : false,
            type : "error"
        });
        return false;
    }
    if (!$("input#shippingRuleMaxAmount")[0].checkValidity()) {
        $("#shippingRuleForm #shippingRuleMaxAmount").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyShippingRuleErrors_invalidMaxAmount,
            stay : false,
            type : "error"
        });
        return false;
    }
    if(parseInt(parseFloat($("#shippingRuleMaxAmount").val())) < parseInt(parseFloat($("#shippingRuleMinAmount").val()))){
        $("#shippingRuleForm #shippingRuleMinAmount").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyShippingRuleErrors_invalidMinAmountMaxAmount,
            stay : false,
            type : "error"
        });
        return false;
    }
    return true;
}

function companyShippingRulesExistCountryInGrid(countryCode){
    var data = companyShippingRulesGrid.getData();
    for (var i = 0; i < data.length; i++) {
        if (data[i].countryCode == countryCode){
            return true;
        }
    }
    return false;
}

function companyShippingRulesAddNew(){
    var dataToSend = "countryCode=" + $("#shippingRuleCountry").val();
    dataToSend += "&price=" + encodeURIComponent($("#shippingRulePrice").val());
    dataToSend += "&minAmount=" + encodeURIComponent($("#shippingRuleMinAmount").val());
    dataToSend += "&maxAmount=" + encodeURIComponent($("#shippingRuleMaxAmount").val());
    dataToSend += "&format=json";
    $.ajax({
        url : shippingRulesSaveUrl,
        type : "POST",
        noticeType : "POST",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            companyShippingRulesDrawAll($("#shippingRuleCompanyId").val());
            $("#shippingRuleDialog").dialog("close");
        },
        error: function(response, status){}
    });
}

function companyShippingRulesUpdate(){
    var dataToSend = "id=" + $("#shippingRuleId").val();
    dataToSend += "&countryCode=" + $("#shippingRuleCountry").val();
    dataToSend += "&price=" + encodeURIComponent($("#shippingRulePrice").val());
    dataToSend += "&minAmount=" + encodeURIComponent($("#shippingRuleMinAmount").val());
    dataToSend += "&maxAmount=" + encodeURIComponent($("#shippingRuleMaxAmount").val());
    dataToSend += "&format=json";
    $.ajax({
        url : shippingRulesSaveUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            companyShippingRulesDrawAll($("#shippingRuleCompanyId").val());
            $("#shippingRuleDialog").dialog("close");
        },
        error: function(response, status){}
    });
}

function companyShippingRulesDelete(){
    var dataToSend = "id=" + $("#shippingRuleId").val() + "&format=json";
    $.ajax({
        url : shippingRulesDeleteUrl,
        type : "POST",
        noticeType : "DELETE",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            companyShippingRulesDrawAll($("#shippingRuleCompanyId").val());
            $("#shippingRuleDialog").dialog("close");
        },
        error: function(response, status){}
    });
}