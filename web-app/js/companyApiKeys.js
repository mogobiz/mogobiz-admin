function companyUpdateApiKeysInfo(compId, updates, str) {
    var dataToSend = "company.mapProvider=" + $("#apiKeysMapProvider").val();
    dataToSend += "&company.gakey=" + $("#apiKeysGoogleAnalyticsKey").val();
    dataToSend += "&company.apiKey=" + $("#apiKeysCompanyAPIKey").val();
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
                if(response.data && response.data.mapProvider)
				    sellerCompanyMapProvider = response.data.mapProvider.name;
				updateCompanyCalls(compId, updates, str);
			}
			else {
				$('#apiKeysTab').click();
				showErrors('#formApiKeys .errors', response.errors);
			}
		}
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
				this.click();
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
        }
    });
}