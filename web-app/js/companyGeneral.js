function companyGeneralAutoUpdateField(compId, objId, objProperty, blankOK, checkValidity) {
    $(objId).unbind();
    $(objId).change(function() {
        companyGeneralDoUpdateField(compId, objId, objProperty, blankOK, checkValidity);
    });
}

function companyGeneralDoUpdateField(compId, objId, objProperty, blankOK, checkValidity) {
    if (!blankOK && $(objId).val().length == 0) {
        $(objId).focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
    }
    else if(checkValidity && !$(objId)[0].checkValidity()){
        $(objId).focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
    }
    else {
        var dataToSend = "company.id=" + compId;
        dataToSend += "&" + objProperty + "=" + $(objId).val();
        dataToSend += "&format=json";
        $.ajax( {
            url : updateCompanyUrl,
            type : "POST",
            noticeType : "PUT",
            data : dataToSend,
            dataType : "json",
            cache : false,
            async : true
        });
    }
}

function companyGeneralMultiSelectAutoUpdate(compId, objId, objProperty){
    $(objId).bind("multiselectclick", function(event, ui) {
        var dataToSend = "company.id=" + compId;
        dataToSend += "&" + objProperty + "=" + ui.value;
        dataToSend += "&format=json";
        $.ajax({
            url : updateCompanyUrl,
            type : "POST",
            noticeType : "PUT",
            data : dataToSend,
            dataType : "json",
            cache : false,
            async : true
        });
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