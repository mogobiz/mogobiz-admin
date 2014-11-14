var tourismTranslationGrid = null;

function tourismTranslationDrawAll(productId){
	tourismTranslationGrid = null;
	var successCallback = function (response){
		var fields = ["name", "keywords", "description"];
        var defaultsData = {name: $("#productName").val(), keywords: $("#productKeywords").val(), description: $("#productDescription").val()};
		$("#tourismTranslationAddLink").unbind();
		$("#tourismTranslationAddLink").bind("click", function(){translationGetCreatePage("product", productId, fields, defaultsData);});
		var columns = [{field: "name", title: translationNameGridLabel}, {field: "keywords", title: translationKeywordsGridLabel}, {field: "description", title: translationDescriptionGridLabel}];
		var data = [];
		for (var i = 0; i < response.length; i++) {
			var value = eval( "(" + response[i].value + ")" );
			data[data.length] = {
				"id" : response[i].id,
				"targetId": productId,
				"translationType": "product",
				"lang": response[i].lang,
				"type": response[i].type,
				"name": value.name,
				"keywords": value.keywords,
				"description": value.description
			}
		}
		tourismTranslationGrid = translationGetGrid("tourismTranslationGrid", productId, fields, columns, data);
		$("#categoriesMain").hideLoading();
	}
	translationGetAllData(productId, successCallback);
}