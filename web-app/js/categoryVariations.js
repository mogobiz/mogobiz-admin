var categoryVariationsGrid = null;
var categoryVariationsListLoaded = false;
var categoryVariationsValues = [];
var categoryVariationsValuesIndex = 0;
function categoryVariationsDrawAll(){
	categoryVariationsListLoaded = false;
	var dataToSend = "category.id=" + categorySelectedId + "&format=json";
	$.ajax({
		url : showVariationsUrl,
		type : "GET",
		noticeType: "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			var gridColumns = [{
				id : "#",
				name : "",
				width : 5,
				behavior : "selectAndMove",
				selectable : false,
				cssClass : "cell-reorder"
			},{
				id : "name",
				name : "Name",
				field : "name",
				width : 45,
				formatter : categoryVariationsGridNameFormatter,
				cssClass : "cell-title"
			},{
				id : "externalCode",
				name : "External Code",
				field : "externalCode",
				width : 25,
				cssClass : ""
			},{
				id : "hide",
				name : "Hide",
				field : "hide",
				width : 25,
				cssClass : ""
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
			if(response){
				for(var i = 0; i < response.length; i++) {
					gridData[gridData.length] = {
						'id' : i,
						"variationId": response[i].id,
						"externalCode": response[i].externalCode,
						"name": response[i].name,
						"position": ((i + 1) * 10),
						"hide": response[i].hide,
						"uuid": response[i].uuid,
						"values": response[i].variationValues
					}
				}
			}

			var tabVisible = $("#categoryVariationsTabInfo").is(":visible");
			if(! tabVisible)
				$("#categoryVariationsTabInfo").show();

			categoryVariationsGrid = new Slick.Grid($("#categoryVariationsGrid"), gridData, gridColumns, gridOptions);

			if(! tabVisible)
				$("#categoryVariationsTabInfo").hide();

			categoryVariationsGrid.setSelectionModel(new Slick.RowSelectionModel());
			categoryVariationsGrid.invalidate();
			var moveRowsPlugin = new Slick.RowMoveManager();
			moveRowsPlugin.onBeforeMoveRows.subscribe(function(e, data) {
						for ( var i = 0; i < data.rows.length; i++) {
							if (data.rows[i] == data.insertBefore
									|| data.rows[i] == data.insertBefore - 1) {
								e.stopPropagation();
								return false;
							}
						}
						return true;
					});

			moveRowsPlugin.onMoveRows.subscribe(function(e, args) {
				var extractedRows = [], left, right;
				var index = args.rows[0];
				var insertBefore = args.insertBefore;
				var data = categoryVariationsGrid.getData();
				data[index].position = (insertBefore * 10) + 5;
				data.sort(function (a, b) {
					var posA =parseInt( a.position );
					var posB =parseInt( b.position );
					return (posA < posB) ? -1 : (posA > posB) ? 1 : 0;
				});
				categoryVariationsUpdatePosition(data);
			});
			categoryVariationsGrid.registerPlugin(moveRowsPlugin);

			categoryVariationsListLoaded = true;
			if(categoryGeneralInfoLoaded && categoryFeatureListLoaded && categoryProductListLoaded && categoryTranslationListLoaded){
				$("#categoriesMain").hideLoading();
			}
		}
	});
}

function categoryVariationsGridNameFormatter (row, cell, value, columnDef, dataContext){
	return "<a href='javascript:categoryVariationsGetDetails(" + categorySelectedId + "," + dataContext.variationId + ", " + false + ")'>" + value + "</a>";
}

function categoryVariationsGetDetails(categoryId, variationId, isCreate){
	$.get(
		categoryVariationsPageUrl,
		{},
		function(htmlresponse) {
			htmlresponse = jQuery.trim(htmlresponse);
			categoryVariationsPageSetup(htmlresponse, categoryId, variationId, isCreate);
		},
		"html"
	);
}

function categoryVariationsPageSetup(htmlresponse, categoryId, variationId, isCreate){
	if ($("#categoryVariationsDialog").dialog("isOpen") !== true) {
		$("#categoryVariationsDialog").empty();
		$("#categoryVariationsDialog").html(htmlresponse);
		$("#categoryVariationsDialog").dialog({
			title : categoryVariationsTitleLabel,
			modal : true,
			resizable : false,
			width : "auto",
			height : "auto",
			open : function(event) {
				categoryVariationsPageInitControls(isCreate);
				categoryVariationsPageInitFields(categoryId, variationId, isCreate);
			},
			buttons : {
				deleteLabel : function() {
					categoryVariationsDeleteVariation(categoryId, variationId);
				},
				cancelLabel : function() {
					$("#categoryVariationsDialog").dialog("close");
				},
				updateLabel : function() {
					if (categoryVariationsValidateForm())
						categoryVariationsUpdateVariation(categoryId, variationId);
				},
				createLabel : function() {
					if (categoryVariationsValidateForm())
						categoryVariationsCreateVariation(categoryId);
				}
			}
		});
	}
}

function categoryVariationsPageInitControls(isCreate) {
	$("#categoryVariationsTabs .tabs a").unbind();
	$("#categoryVariationsTranslationTab").removeClass("disabled");
	$("#categoryVariationsTranslationDiv").hide();
	$("#categoryVariationsGeneralTab").addClass("selected");
	if (isCreate) {
		$("#categoryVariationsEditDiv").hide();
		$("#categoryVariationsTranslationTab").addClass("disabled");
		$(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").hide();
		$(".ui-dialog-buttonpane").find("button:contains('updateLabel')").hide();
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
		$(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
		$(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
	}
	else {
		$("#categoryVariationsTabs .tabs a").click(function() {
			$("#categoryVariationsTabs .tabs .selected").removeClass("selected");
			$(this).addClass("selected");
			switch($(this).attr("id")){
			case "categoryVariationsGeneralTab":
				$("#categoryVariationsTranslationDiv").hide();
				$("#categoryVariationsCreateDiv").show();
				break;
			case "categoryVariationsTranslationTab":
				$("#categoryVariationsCreateDiv").hide();
				$("#categoryVariationsTranslationDiv").show();
				break;
			default:
				break;
			}
		});
		$(".ui-dialog-buttonpane").find("button:contains('createLabel')").hide();
		$(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").addClass("ui-delete-button");
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
		$(".ui-dialog-buttonpane").find("button:contains('updateLabel')").addClass("ui-update-button");
		$(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").html("<span class='ui-button-text'>" + deleteLabel + "</span>");
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
		$(".ui-dialog-buttonpane").find("button:contains('updateLabel')").html("<span class='ui-button-text'>" + updateLabel + "</span>");
	}
}

function categoryVariationsPageInitFields(categoryId, variationId, isCreate){
	$("#categoryVariationId").val(categoryId);
	$("#categoryVariationName, #categoryVariationExternalCode, #categoryVariationUUID").val("");
	$("#categoryVariationHide").prop("checked", false);
	if (!isCreate){
		var variation = null;
		var data = categoryVariationsGrid.getData();
		for (var i = 0; i < data.length; i++) {
			if (data[i].variationId == variationId){
				variation = data[i];
				break;
			}
		}
		if(variation){
			categoryVariationsValues = variation.values;
			$("#categoryVariationName").val(variation.name);
			$("#categoryVariationExternalCode").val(variation.externalCode);
			$("#categoryVariationUUID").val(variation.uuid);
			var values = "";
			for( var i = 0; i < categoryVariationsValues.length; i++){
				if(values != "")
					values += ",";
				values += categoryVariationsValues[i].value;
			}
			$("#categoryVariationValues").val(values);
			if(variation.hide)
				$("#categoryVariationHide").prop("checked", true);
			categoryVariationsTranslationIndex = 0;
			categoryVariationsTranslationValues = [];
			categoryVariationGetValuesTranslation(variationId);
		}
	}
}

function categoryVariationsValidateForm(){
	if ($("#categoryVariationName").val() == "") {
		jQuery.noticeAdd({
			stayTime : 2000,
			text : fieldsRequiredMessageLabel,
			stay : false,
			type : "error"
		});
		return false;
	}
	if($("#categoryVariationValues").val().indexOf(",,") > 0){
		jQuery.noticeAdd({
			stayTime : 2000,
			text : variationsEmptyValueErrorLabel,
			stay : false,
			type : "error"
		});
		return false;
	}
	return true;
}

function categoryVariationsCreateVariation(categoryId){
	var dataToSend = "category.id=" + categoryId + "&variation.name=" + $("#categoryVariationName").val();
	dataToSend += "&variation.externalCode=" + $("#categoryVariationExternalCode").val() + "&variation.hide=" + $("#categoryVariationHide").is(':checked') + "&format=json";
	$.ajax({
		url : createVariationsUrl,
		type : "POST",
		noticeType: "POST",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if($("#categoryVariationValues").val() != ""){
				var values = $("#categoryVariationValues").val().split(",");
				var variationsValues = [];
				for(var i = 0; i < values.length; i++){
					variationsValues[i] = {value: values[i], position: (i + 1)};
				}
				categoryVariationsValuesIndex = 0;
				categoryVariationsAddVariationValues(categoryId, response.id, variationsValues);
			}
			else{
				$("#categoryVariationsDialog").dialog("close");
				if(categorySelectedId == categoryId){
					$("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
					categoryVariationsDrawAll();
				}
			}
		},
		error : function(response, status) {
			$("#categoriesMain").hideLoading();
			if(response.status == "403"){
				$("#categoryVariationName").focus();
				jQuery.noticeAdd({
					stayTime : 2000,
					text : variationsUniqueErrorLabel,
					stay : false,
					type : "error"
				});
			}
			if(response.status == "401"){
				$("#categoryVariationsDialog").dialog("close");
				jQuery.noticeAdd({
					stayTime : 2000,
					text : variationsMaximumErrorLabel,
					stay : false,
					type : "error"
				});
			}
		}
	});
}

function categoryVariationsUpdateVariation(categoryId, variationId){
	var dataToSend = "category.id=" + categoryId + "&variation.id=" + variationId + "&variation.name=" + $("#categoryVariationName").val();
	dataToSend += "&variation.externalCode=" + $("#categoryVariationExternalCode").val() + "&variation.hide=" + $("#categoryVariationHide").is(':checked') + "&format=json";
	$.ajax({
		url : updateVariationsUrl,
		type : "POST",
		noticeType: "PUT",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			var values = ($("#categoryVariationValues").val() != "") ? $("#categoryVariationValues").val().split(",") : [];
			var addedVariationValues = [];
			var updatedVariationValues = [];
			var deletedVariationValues = [];
			
			if(values.length == 0 && categoryVariationsValues.length == 0){
				$("#categoryVariationsDialog").dialog("close");
				if(categorySelectedId == categoryId){
					$("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
					categoryVariationsDrawAll();
				}
				return;
			}
			categoryVariationsValuesIndex = 0;
			if(values.length != 0 && categoryVariationsValues.length == 0){
				for(var i = 0; i < values.length; i++){
					addedVariationValues[addedVariationValues.length] = {value: values[i], position: (i + 1)};
				}
				categoryVariationsAddVariationValues(categoryId, response.data.id, addedVariationValues);
				return;
			}
			if(values.length == 0 && categoryVariationsValues.length != 0){
				categoryVariationsDeleteVariationValues(categoryId, response.data.id, categoryVariationsValues);
				return;
			}
			if(values.length != 0 && categoryVariationsValues.length != 0){
				if(values.length > categoryVariationsValues.length){
					for(var i = 0; i < values.length; i++){
						if(i < categoryVariationsValues.length && values[i] != categoryVariationsValues[i].value)
							updatedVariationValues[updatedVariationValues.length] = {id: categoryVariationsValues[i].id, value: values[i]};
						else if(i >= categoryVariationsValues.length)
							addedVariationValues[addedVariationValues.length] = {value: values[i], position: (i + 1)};
					}
				}
				else{
					for(var i = 0; i < categoryVariationsValues.length; i++){
						if(i < values.length && values[i] != categoryVariationsValues[i].value)
							updatedVariationValues[updatedVariationValues.length] = {id: categoryVariationsValues[i].id, value: values[i]};
						else if(i >= values.length)
							deletedVariationValues[deletedVariationValues.length] = {value: categoryVariationsValues[i].value};
					}
				}
				categoryVariationsUpdateVariationValues(categoryId, response.data.id, updatedVariationValues, addedVariationValues, deletedVariationValues);
			}
		},
		error : function(response, status) {
			$("#categoryVariationName").focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : variationsUniqueErrorLabel,
				stay : false,
				type : "error"
			});
		}
	});
}

function categoryVariationsDeleteVariation(categoryId, variationId){
	var dataToSend = "category.id=" + categoryId + "&variation.id=" + variationId + "&format=json";
	$.ajax({
		url : deleteVariationsUrl,
		type : "POST",
		noticeType : "DELETE",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$("#categoryVariationsDialog").dialog("close");
			if(categorySelectedId == categoryId){
				$("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
				categoryVariationsDrawAll();
			}
		},
		error : function(response, status) {
            if(response.status == 403){
                jQuery.noticeAdd({
                    stayTime : 2000,
                    text : variationsReferenceErrorLabel,
                    stay : false,
                    type : "error"
                });
            }
        }
	});
}

function categoryVariationsUpdatePosition(data){
	$("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
	var dataToSend = "category.id=" + categorySelectedId + "&format=json&tagids=";
	for(var i = 0; i < data.length; i++){
		dataToSend += data[i].variationId + ",";
	}
	$.ajax({
		url : updateVariationsPositionUrl,
		type : "POST",
		noticeType : "PUT",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			categoryVariationsDrawAll();
		},
		error : function() {
			$("#categoriesMain").hideLoading();
		}
	});
}

function categoryVariationsAddVariationValues(categoryId, variationId, values){
	if(values.length == categoryVariationsValuesIndex){
		$("#categoryVariationsDialog").dialog("close");
		if(categorySelectedId == categoryId){
			$("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
			categoryVariationsDrawAll();
		}
		return;
	}

	var dataToSend = "category.id=" + categoryId + "&variation.id=" + variationId;
	dataToSend += "&variationValue.value=" + values[categoryVariationsValuesIndex].value + "&variationValue.position=" + values[categoryVariationsValuesIndex].position + "&format=json";
	$.ajax({
		url : createVariationValueUrl,
		type : "POST",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			categoryVariationsValuesIndex++;
			categoryVariationsAddVariationValues(categoryId, variationId, values);
		},
		error : function(response, status) {}
	});
}

function categoryVariationsUpdateVariationValues(categoryId, variationId, values, addedValues, deletedValues){
	if(values.length == categoryVariationsValuesIndex){
		categoryVariationsValuesIndex = 0;
		if(addedValues.length > 0)
			categoryVariationsAddVariationValues(categoryId, variationId, addedValues);
		else if(deletedValues.length > 0)
			categoryVariationsDeleteVariationValues(categoryId, variationId, deletedValues);
		else{
			$("#categoryVariationsDialog").dialog("close");
			if(categorySelectedId == categoryId){
				$("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
				categoryVariationsDrawAll();
			}
		}
		return;
	}

	var dataToSend = "category.id=" + categoryId + "&variation.id=" + variationId;
	dataToSend += "&variationValue.id=" + values[categoryVariationsValuesIndex].id + "&variationValue.value=" + values[categoryVariationsValuesIndex].value + "&format=json";
	$.ajax({
		url : updateVariationValueUrl,
		type : "POST",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			categoryVariationsValuesIndex++;
			categoryVariationsUpdateVariationValues(categoryId, variationId, values, addedValues, deletedValues);
		},
		error : function(response, status) {}
	});
}

function categoryVariationsDeleteVariationValues(categoryId, variationId, values){
	if(values.length == categoryVariationsValuesIndex){
		$("#categoryVariationsDialog").dialog("close");
		if(categorySelectedId == categoryId){
			$("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
			categoryVariationsDrawAll();
		}
		return;
	}

	var dataToSend = "category.id=" + categoryId + "&variation.id=" + variationId;
	dataToSend += "&variationValue.value=" + values[categoryVariationsValuesIndex].value + "&format=json";
	$.ajax({
		url : deleteVariationValueUrl,
		type : "POST",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			categoryVariationsValuesIndex++;
			categoryVariationsDeleteVariationValues(categoryId, variationId, values);
		},
		error : function(response, status) {}
	});
}

// TRANSLATION

var categoryVariationsTranslationGrid = null;
var categoryVariationsTranslationIndex = 0;
var categoryVariationsTranslationValues = [];

function categoryVariationGetValuesTranslation(variationId){
	if(categoryVariationsValues.length == categoryVariationsTranslationIndex){
		categoryVariationTranslationDrawAll(variationId);
		return;
	}
	var dataToSend = "target=" + categoryVariationsValues[categoryVariationsTranslationIndex].id;
	$.ajax({
		url : listTranslationUrl,
		type : "POST",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			for (var i = 0; i < response.length; i++) {
				var value = eval( "(" + response[i].value + ")" );
				if(!categoryVariationsTranslationValues[response[i].lang]){
					categoryVariationsTranslationValues[response[i].lang] = [];
				}
				categoryVariationsTranslationValues[response[i].lang][categoryVariationsTranslationIndex] = value.value;
			}
			categoryVariationsTranslationIndex++;
			categoryVariationGetValuesTranslation(variationId);
		},
		error : function(response, status) {}
	});
}

function categoryVariationTranslationDrawAll(variationId){
	categoryVariationsTranslationGrid = null;
	var successCallback = function (response){
		var values = "";
		for( var i = 0; i < categoryVariationsValues.length; i++){
			if(values != "")
				values += ",";
			values += categoryVariationsValues[i].value;
		}
		var fields = ["name"];
        var defaultsData = {name: $("#categoryVariationName").val()};
        $("#categoryVariationsTranslationAddLink").unbind();
		$("#categoryVariationsTranslationAddLink").bind("click", function(){translationGetCreatePage("categoryVariation", variationId, fields, defaultsData);});
		var columns = [{
			field: "name",
			title: translationNameGridLabel
		},{
			field: "values",
			title: translationValuesGridLabel,
			editorEvents: {
				"blur": categoryVariationCheckTranslationValues,
				"keydown": function(e, field){if(e.keyCode === 13){e.stopImmediatePropagation();categoryVariationCheckTranslationValues(e);}}
			}
		}];
		var data = [];
		for (var i = 0; i < response.length; i++) {
			var value = eval( "(" + response[i].value + ")" );
			var values = "";
			if(categoryVariationsTranslationValues[response[i].lang]){
				for (var j = 0; j < categoryVariationsTranslationValues[response[i].lang].length; j++){
					if(values != "")
						values += ",";
					values += categoryVariationsTranslationValues[response[i].lang][j];
				}
			}

			data[data.length] = {
				"id" : response[i].id,
				"targetId": variationId,
				"translationType": "categoryVariation",
				"lang": response[i].lang,
				"type": response[i].type,
				"name": value.name,
				"values": values
			}
		}
		var tabVisible = $("#categoryVariationsTranslationDiv").is(":visible");
		if(! tabVisible)
			$("#categoryVariationsTranslationDiv").show();

		categoryVariationsTranslationGrid = translationGetGrid("categoryVariationsTranslationGrid", variationId, fields, columns, data);

		if(! tabVisible)
			$("#categoryVariationsTranslationDiv").hide();
		$("#categoriesMain").hideLoading();
	}
	translationGetAllData(variationId, successCallback);
}

function categoryVariationCheckTranslationValues(e){
	if($(e.target).val().split(",").length > categoryVariationsValues.length){
		$(e.target).focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : variationsTranslationErrorLabel,
			stay : false,
			type : "error"
		});
		return false;
	}
	categoryVariationsTranslationGrid.getEditorLock().commitCurrentEdit();
	categoryVariationsTranslationGrid.invalidate();
	categoryVariationUpdateTranslationValues($(e.target).val().split(","));
}

function categoryVariationUpdateTranslationValues(values){
	var language = categoryVariationsTranslationGrid.getDataItem(categoryVariationsTranslationGrid.getSelectedRows()[0]).lang;
	for(var i = 0; i < values.length; i++){
		var targetId = "";
		for(var j=0; j < categoryVariationsValues.length; j++){
			if(categoryVariationsValues[j].position == i){
				targetId = categoryVariationsValues[j].id;
				break;
			}
		}
		if(targetId != ""){
			var dataToSend = "target=" + targetId + "&language=" + language + "&type=VARIATION_VALUE&value={\"value\":\"" + values[i] + "\"}";

			$.ajax({
				url : updateTranslationUrl,
				type : "POST",
				data : dataToSend,
				dataType : "json",
				cache : false,
				async : true,
				success : function(response, status) {}
			});
		}
	}
	for(var i = values.length; i < categoryVariationsValues.length; i++){
		var dataToSend = "target=" + categoryVariationsValues[i].id + "&language=" + language;
		$.ajax({
			url : deleteTranslationUrl,
			type : "POST",
			data : dataToSend,
			dataType : "json",
			cache : false,
			async : true,
			success : function(response, status) {}
		});
	}
}

function categoryVariationCreateTranslationValues(language, variationId){
	var createdIndex = 0;
	for(var i = 0; i < categoryVariationsValues.length; i++){
		var targetId = "";
		for(var j=0; j < categoryVariationsValues.length; j++){
			if(categoryVariationsValues[j].position == i){
				targetId = categoryVariationsValues[j].id;
				break;
			}
		}
		if(targetId != ""){
			var dataToSend = "target=" + targetId + "&language=" + language + "&type=VARIATION_VALUE&value={\"value\":\"" + categoryVariationsValues[i].value + "\"}";

			$.ajax({
				url : updateTranslationUrl,
				type : "POST",
				data : dataToSend,
				dataType : "json",
				cache : false,
				async : true,
				success : function() {
					if(createdIndex == categoryVariationsValues.length - 1){
						categoryVariationsTranslationIndex = 0;
						categoryVariationsTranslationValues = [];
						categoryVariationGetValuesTranslation(variationId);
					}
					else{
						createdIndex++;
					}
				}
			});
		}
	}
}