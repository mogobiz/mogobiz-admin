function companyApiKeysAutoUpdateField(compId, objId, objProperty, blankOK, checkValidity) {
    $(objId).unbind();
    $(objId).change(function() {
        companyApiKeysDoUpdateField(compId, objId, objProperty, blankOK, checkValidity);
    });
}

function companyApiKeysDoUpdateField(compId, objId, objProperty, blankOK, checkValidity) {
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

function companyApiKeysMultiSelectAutoUpdate(compId, objId, objProperty){
    $(objId).bind("multiselectclick", function(event, ui) {
        var dataToSend = "company.id=" + compId;
        dataToSend += "&" + objProperty + "=" + ui.value;
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

function companyGetApiKeysInfo(response) {
	var info = response;
	var infoEncoded = $.toJSON(info);
	var infoFormValues = infoEncoded;
    infoFormValues = infoFormValues.replace(/(^\s+|\s+$)/, '');
    infoFormValues = "(" + infoFormValues + ");";
	try	{
		var json = eval(infoFormValues);
		var newJson = new Object();
		for(var key in json){
			var newKey = "company."+key;
			if(key == "mapProvider" && response[key]){
				newJson["company.mapProvider"] = response[key].name;
			}
			else if(key == "gakey" || key == "apiKey"){
				newJson[newKey] = json[key];
			}
		}
	}
	catch(err)	{
		('That appears to be invalid JSON!')
		return false;
	}
	var apiForm = document.forms['formApiKeys'];
	$(apiForm).populate(newJson, {debug:1});

	$("#apiKeysMapProvider").multiselect('uncheckAll');
	$("#apiKeysMapProvider").multiselect("refresh");

	if(newJson["company.mapProvider"] && newJson["company.mapProvider"] != ""){
		$("#apiKeysMapProvider").find("option:contains(" + newJson["company.mapProvider"] + ")").attr("selected", "selected");
        $("#apiKeysMapProvider").multiselect("refresh");
		$("#formApiKeys .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_apiKeysMapProvider']").each(function() {
            if(this.value == newJson["company.mapProvider"]) {
                $("#apiKeysMapProvider").unbind("multiselectclick");
				this.click();
                companyApiKeysMultiSelectAutoUpdate(compId, "#apiKeysMapProvider", "company.mapProvider");
			}
		});
	}
}

/**
 * Function used to generate an API Key
 */
function companyGenerateApiKey(compId) {
    var dataToSend = "company.id="+compId;
    $.ajax({
        url : apiKeyGeneratorUrl,
        type : "GET",
        data : dataToSend,
        dataType : "text",
        cache : false,
        async : true,
        success : function(response, status) {
            $('#apiKeysCompanyAPIKey').val(response);
            var dataToSend = "company.apiKey=" + response;
            dataToSend += "&company.id="+compId;
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
        }
    });
}