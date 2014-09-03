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