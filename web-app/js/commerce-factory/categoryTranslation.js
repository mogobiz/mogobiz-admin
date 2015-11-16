var categoryTranslationGrid = null;
var categoryTranslationListLoaded = false;

function categoryTranslationDrawAll(){
	categoryTranslationListLoaded = false;
	categoryTranslationGrid = null;
	var successCallback = function (response){
		var fields = ["name", "description"];
		$("#categoryTranslationAddLink").unbind();
		$("#categoryTranslationAddLink").bind("click", function(){
            var defaultsData = {name: $("#categoryEditName").val(), description: $("#categoryEditDescription").val()};
            translationGetCreatePage("categories", categorySelectedId, fields, defaultsData);
        });
		var columns = [{field: "name", title: translationNameGridLabel}, {field: "descriptionEditor", title: translationDescriptionGridLabel}];
		var data = [];
		for (var i = 0; i < response.length; i++) {
			var value = eval( "(" + response[i].value + ")" );
			data[data.length] = {
				"id" : response[i].id,
				"targetId": categorySelectedId,
				"translationType": "categories",
				"lang": response[i].lang,
				"type": response[i].type,
				"name": value.name,
				"description": value.description
			}
		}
		var tabVisible = $("#categoryTranslationTabInfo").is(":visible");
		if(! tabVisible)
			$("#categoryTranslationTabInfo").show();
		
		categoryTranslationGrid = translationGetGrid("categoryTranslationGrid", categorySelectedId, fields, columns, data);

		if(! tabVisible)
			$("#categoryTranslationTabInfo").hide();

		categoryTranslationListLoaded = true;
		if(categoryGeneralInfoLoaded && categoryVariationsListLoaded && categoryProductListLoaded && categoryFeatureListLoaded){
			$("#categoriesMain").hideLoading();
		}
	};
	translationGetAllData("categories", categorySelectedId, successCallback);
}