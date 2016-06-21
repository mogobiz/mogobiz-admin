var categoryFeaturesGrid = null;
var categoryFeatureListLoaded = false;
function categoryFeaturesDrawAll(){
    $("#categoryAddNewFeature").unbind().click(function() {
        categoryFeaturesGetDetails(null, true);
    });
	categoryFeatureListLoaded = false;
	categoryFeaturesGrid = null;
	var dataToSend = "category.id=" + categorySelectedId + "&format=json";
	$.ajax({
		url : showFeaturesUrl,
		type : "GET",
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
				width : 30,
				formatter : categoryFeaturesGridNameFormatter,
				cssClass : "cell-title"
			},{
				id : "externalCode",
				name : "External Code",
				field : "externalCode",
				width : 25,
				cssClass : ""
			},{
				id : "value",
				name : "Value",
				field : "value",
				width : 25,
				cssClass : ""
			},{
				id : "hide",
				name : "Hide",
				field : "hide",
				width : 15,
				formatter : categoryFeaturesGridHideFormatter,
				cssClass : "cell-centered"
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
			if(response.features){
				for ( var i = 0; i < response.features.length; i++) {
					gridData[gridData.length] = {
						"id" : i,
						"featureId": response.features[i].id,
						"dateCreated": response.features[i].dateCreated,
						"externalCode": response.features[i].externalCode,
						"hide": response.features[i].hide,
						"lastUpdated": response.features[i].lastUpdated,
						"name": response.features[i].name,
						"position": ((i + 1) * 10),
						"product": response.features[i].product,
						"uuid": response.features[i].uuid,
						"value": response.features[i].value
					}
				}
			}
			var tabVisible = $("#categoryFeaturesTabInfo").is(":visible");
			if(! tabVisible)
				$("#categoryFeaturesTabInfo").show();
			
			categoryFeaturesGrid = new Slick.Grid($("#categoryFeaturesGrid"), gridData, gridColumns, gridOptions);

			if(! tabVisible)
				$("#categoryFeaturesTabInfo").hide();

			categoryFeaturesGrid.setSelectionModel(new Slick.RowSelectionModel());
			categoryFeaturesGrid.invalidate();
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
				var index = args.rows[0];
				var insertBefore = args.insertBefore;
				var data = categoryFeaturesGrid.getData();
				data[index].position = (insertBefore * 10) + 5;
				data.sort(function (a, b) {
					var posA =parseInt( a.position );
					var posB =parseInt( b.position );
					return (posA < posB) ? -1 : (posA > posB) ? 1 : 0;
				});
				categoryFeaturesUpdatePosition(data);
			});
			categoryFeaturesGrid.registerPlugin(moveRowsPlugin);

			categoryFeatureListLoaded = true;
			if(categoryGeneralInfoLoaded && categoryVariationsListLoaded && categoryProductListLoaded && categoryTranslationListLoaded){
				$("#categoriesMain").hideLoading();
			}
		}
	});
}

function categoryFeaturesGridHideFormatter(row, cell, value, columnDef, dataContext){
	var checkBox = "<input type='checkbox' disabled='disabled' style='margin-top:4px;'";
	checkBox += (value) ? "checked='checked'/>" : "/>";
	return checkBox;
}

function categoryFeaturesGridNameFormatter (row, cell, value, columnDef, dataContext){
	return "<a href='javascript:categoryFeaturesGetDetails(" + dataContext.featureId + ", " + false + ")'>" + value + "</a>";
}

function categoryFeaturesGetDetails(featureId, isCreate){
	$.get(
		categoryFeaturePageUrl,
		{},
		function(htmlresponse) {
			htmlresponse = jQuery.trim(htmlresponse);
			categoryFeaturesPageSetup(htmlresponse, featureId, isCreate);
		},
		"html"
	);
}

function categoryFeaturesPageSetup(htmlresponse, featureId, isCreate){
	if ($("#categoryFeaturesDialog").dialog("isOpen") !== true) {
		$("#categoryFeaturesDialog").empty();
		$("#categoryFeaturesDialog").html(htmlresponse);
		$("#categoryFeaturesDialog").dialog({
			title : categoryFeaturesTitleLabel,
			modal : true,
			resizable : false,
			width : "auto",
			height : "auto",
			open : function(event) {
				categoryFeaturesPageInitControls(isCreate);
				categoryFeaturesPageInitFields(featureId, isCreate);
			},
			buttons : {
				deleteLabel : function() {
					categoryFeaturesDeleteFeature(featureId);
				},
				cancelLabel : function() {
					$("#categoryFeaturesDialog").dialog("close");
				},
				updateLabel : function() {
					if (categoryFeaturesValidateForm())
						categoryFeaturesUpdateFeature(featureId);
				},
				createLabel : function() {
					if (categoryFeaturesValidateForm())
						categoryFeaturesCreateFeature();
				}
			}
		});
	}
}

function categoryFeaturesPageInitControls(isCreate) {
	$("#categoryFeaturesTabs .tabs a").unbind();
	$("#categoryFeaturesTranslationTab").removeClass("disabled");
	$("#categoryFeaturesTranslationDiv").hide();
	$("#categoryFeaturesGeneralTab").addClass("selected");
	if (isCreate) {
		$("#categoryFeaturesEditDiv").hide();
		$("#categoryFeaturesTranslationTab").addClass("disabled");
		$(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").hide();
		$(".ui-dialog-buttonpane").find("button:contains('updateLabel')").hide();
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
		$(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
		$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
		$(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
	}
	else {
		$("#categoryFeaturesTabs .tabs a").click(function() {
			$("#categoryFeaturesTabs .tabs .selected").removeClass("selected");
			$(this).addClass("selected");
			switch($(this).attr("id")){
			case "categoryFeaturesGeneralTab":
				$("#categoryFeaturesTranslationDiv").hide();
				$("#categoryFeaturesCreateDiv").show();
				break;
			case "categoryFeaturesTranslationTab":
				$("#categoryFeaturesCreateDiv").hide();
				$("#categoryFeaturesTranslationDiv").show();
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

function categoryFeaturesPageInitFields(featureId, isCreate){
	$("#categoryFeatureName,#categoryFeatureExternalCode,#categoryFeatureValue,#categoryFeatureUUID").val("");
	$("#categoryFeatureHide").prop("checked", false);
	if (!isCreate){
		var feature = null;
		var data = categoryFeaturesGrid.getData();
		for (var i = 0; i < data.length; i++) {
			if (data[i].featureId == featureId){
				feature = data[i];
				break;
			}
		}
		if(feature){
			$("#categoryFeatureName").val(feature.name);
			$("#categoryFeatureValue").val(feature.value);
			$("#categoryFeatureExternalCode").val(feature.externalCode);
			$("#categoryFeatureUUID").val(feature.uuid);
			if(feature.hide)
				$("#categoryFeatureHide").prop("checked", true);
			categoryFeaturesTranslationDrawAll(featureId);
		}
	}
}

function categoryFeaturesValidateForm(){
	if ($("#categoryFeatureName").val() == "") {
		jQuery.noticeAdd({
			stayTime : 2000,
			text : fieldsRequiredMessageLabel,
			stay : false,
			type : "error"
		});
		return false;
	}
	return true;
}

function categoryFeaturesCreateFeature(){
	var dataToSend = "category.id=" + categorySelectedId + "&feature.name=" + encodeURIComponent($("#categoryFeatureName").val());
	dataToSend += "&feature.value=" + encodeURIComponent($("#categoryFeatureValue").val()) + "&feature.hide=" + $("#categoryFeatureHide").is(':checked') + "&format=json";
	$.ajax({
		url : createFeaturesUrl,
		type : "POST",
		noticeType : "POST",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$("#categoryFeaturesDialog").dialog("close");
            $("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
            categoryFeaturesDrawAll();
		},
		error : function(response, status) {
			$("#categoryFeatureName").focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : featuresUniqueErrorLabel,
				stay : false,
				type : "error"
			});
		}
	});
}

function categoryFeaturesUpdateFeature(featureId){
	var dataToSend = "category.id=" + categorySelectedId+ "&feature.id=" + featureId;
	dataToSend += "&feature.name=" + encodeURIComponent($("#categoryFeatureName").val()) + "&feature.value=" + encodeURIComponent($("#categoryFeatureValue").val());
	dataToSend += "&feature.externalCode=" + encodeURIComponent($("#categoryFeatureExternalCode").val()) + "&feature.hide=" + $("#categoryFeatureHide").is(':checked') + "&format=json";
	$.ajax({
		url : updateFeaturesUrl,
		type : "POST",
		noticeType : "PUT",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$("#categoryFeaturesDialog").dialog("close");
			$("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
			categoryFeaturesDrawAll();
		},
		error : function(response, status) {
			$("#categoryFeatureName").focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : featuresUniqueErrorLabel,
				stay : false,
				type : "error"
			});
		}
	});
}

function categoryFeaturesDeleteFeature(featureId){
	var dataToSend = "category.id=" + categorySelectedId + "&feature.id=" + featureId + "&format=json";
	$.ajax({
		url : deleteFeaturesUrl,
		type : "POST",
		noticeType : "DELETE",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$("#categoryFeaturesDialog").dialog("close");
			$("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
			categoryFeaturesDrawAll();
		},
		error : function(response, status) {}
	});
}

function categoryFeaturesUpdatePosition(data){
	$("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
	var dataToSend = "category.id=" + categorySelectedId + "&format=json&tagids=";
	for(var i = 0; i < data.length; i++){
		dataToSend += data[i].featureId + ",";
	}
	$.ajax({
		url : updateFeaturesPositionUrl,
		type : "POST",
		noticeType : "PUT",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			categoryFeaturesDrawAll();
		},
		error : function() {
			$("#categoriesMain").hideLoading();
		}
	});
}

//TRANSLATION

var categoryFeaturesTranslationGrid = null;

function categoryFeaturesTranslationDrawAll(featureId){
	categoryFeaturesTranslationGrid = null;
	var successCallback = function (response){
		var fields = ["name", "value"];
		$("#categoryFeaturesTranslationAddLink").unbind();
		$("#categoryFeaturesTranslationAddLink").bind("click", function(){
            var defaultsData = {name: $("#categoryFeatureName").val(), value: $("#categoryFeatureValue").val()};
            translationGetCreatePage("categoryFeatures", featureId, fields, defaultsData);
        });
		var columns = [{field: "name", title: translationNameGridLabel},{field: "value", title: translationValueGridLabel}];
		var data = [];
		for (var i = 0; i < response.length; i++) {
			var value = eval( "(" + response[i].value + ")" );
			data[data.length] = {
				"id" : response[i].id,
				"targetId": featureId,
				"translationType": "categoryFeatures",
				"lang": response[i].lang,
				"type": response[i].type,
				"name": value.name,
				"value": value.value
			}
		}
		var tabVisible = $("#categoryFeaturesTranslationDiv").is(":visible");
		if(! tabVisible)
			$("#categoryFeaturesTranslationDiv").show();

		categoryFeaturesTranslationGrid = translationGetGrid("categoryFeaturesTranslationGrid", featureId, fields, columns, data);

		if(! tabVisible)
			$("#categoryFeaturesTranslationDiv").hide();
		$("#categoriesMain").hideLoading();
	};
	translationGetAllData("categoryFeatures", featureId, successCallback);
}