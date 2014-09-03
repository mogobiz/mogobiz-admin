function companyUpdateGeneralInfo(compId, updates, str) {
	var dataToSend = $('#formGeneral').serialize();
	dataToSend += "&company.id="+compId;
	dataToSend += "&format=json";

	$.ajax({
		url : updateCompanyUrl,
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
				$('#generalTab').click();
				showErrors('#formGeneral .errors', response.errors);
			}
		}
	});
}

function companyGetGeneralInfo(response) {
	var general = response;
	var generalEncoded = $.toJSON(general);
	var generalFormValues = generalEncoded;
	generalFormValues = generalFormValues.replace(/(^\s+|\s+$)/, '');
	generalFormValues = "(" + generalFormValues + ");";
	try	{
		var json = eval(generalFormValues);
		var newJson = new Object();
		for(var key in json){
			var newKey = "company."+key;
			if (key=='location') {
				var companyLocationObj = json[key];
				for(var key1 in companyLocationObj){
					var newKey1 = "company.location."+key1;
					newJson[newKey1] = companyLocationObj[key1];
				}
			}
			else {
				newJson[newKey] = json[key];
			}
		}
	}
	catch(err)	{
		('That appears to be invalid JSON!')
		return false;
	}
	var generalForm = document.forms['formGeneral'];
	$(generalForm).populate(newJson, {debug:1});

	$("#generalCountry").multiselect('uncheckAll');
	$("#generalCountry").multiselect('refresh');

	if(newJson["company.location.countryCode"] && newJson["company.location.countryCode"] != ""){
		$('#generalCountry').find('option:contains(' + newJson["company.location.countryCode"] + ')').attr('selected','selected');
		$('#formGeneral .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_generalCountry"]').each(function() {
			if(this.value == newJson["company.location.countryCode"]) {
				this.click();
			}
		});
	}
}

function validateGeneralInfo(showError) {
	var valid;
	if($('#generalStoreName').val() == "") {
		valid = false;
		if (showError) {
			$('#formGeneral #generalStoreName').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companyGeneralErrors_requiredStoreNameLabel,
				stay : false,
				type : 'error'
			});
		}
	}
	else if($('#generalCountry').val() == null) {
		valid = false;
		if (showError) {
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companyGeneralErrors_requiredCountryLabel,
				stay : false,
				type : 'error'
			});
		}
	}
	else if (!$('input#generalWebsite')[0].checkValidity()) {
		valid = false;
		if (showError) {
			$('#formGeneral #generalWebsite').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companyGeneralErrors_invalidWebsiteLabel,
				stay : false,
				type : 'error'
			});
		}
	}
	else if (!$('input#generalPhoneNumber')[0].checkValidity()) {
		valid = false;
		if (showError) {
			$('#formGeneral #generalPhoneNumber').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companyGeneralErrors_invalidPhoneNumberLabel,
				stay : false,
				type : 'error'
			});
		}
	}
	else if($('#generalEmail').val() == ""){
		valid = false;
		if (showError) {
			$('#formGeneral #generalEmail').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companyGeneralErrors_requiredEmailLabel,
				stay : false,
				type : 'error'
			});
		}
	}
	else if (!$('input#generalEmail')[0].checkValidity()) {
		valid = false;
		if (showError) {
			$('#formGeneral #generalEmail').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : companyGeneralErrors_invalidEmailLabel,
				stay : false,
				type : 'error'
			});
		}
	}
	else {
		$('#formGeneral .errors').html("");
		$('#formGeneral .errors').hide();
		valid = true;
	}
	return valid;
}