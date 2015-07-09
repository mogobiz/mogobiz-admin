function translationGetAllData(targetId, successCallback){
	var dataToSend = "target=" + targetId;
	$.ajax({
		url : listTranslationUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if(typeof(successCallback) == "function"){
				successCallback.call(this, response);
			}
		}
	});
}

function translationGetGrid(gridId, targetId, fields, columns, data){
    var grid = null;
    var gridColumns = [{
        id : "language",
        name : translationLanguageGridLabel,
        field : "lang",
        width : 20,
        formatter : translationLanguageFormatter,
        cssClass : "cell-title"
    }];
    var isRich;
    for(var i=0; i < columns.length; i++){
        isRich = false;
        if(columns[i].field == "descriptionEditor"){
            isRich = true;
            columns[i].field = "description";
        }
        var len = gridColumns.length;
        gridColumns[len] = {
            id : columns[i].field,
            name : columns[i].title,
            field : columns[i].field,
            width : parseInt(parseFloat(80 / columns.length)),
            cssClass : "",
            formatter : translationFieldFormatter,
            editorEvents: (columns[i].editorEvents) ? columns[i].editorEvents : {
                "blur": (isRich) ? function(){} : function(){grid.getEditorLock().commitCurrentEdit();grid.invalidate();},
                "keydown": function(e){if(e.keyCode === 13){e.stopImmediatePropagation();grid.getEditorLock().commitCurrentEdit();grid.invalidate();}}
            }
        };
        gridColumns[len].addEditorButtons = "false";
        if(isRich){
            gridColumns[len].editor = Slick.Editors.RichText;
            gridColumns[len].addEditorButtons = "true";
        }
        else if(columns[i].field == "description"){
            gridColumns[len].editor = Slick.Editors.LongText;
        }
        else{
            gridColumns[len].editor = Slick.Editors.Text;
        }
    }

    var gridOptions = {
        editable : true,
        enableAddRow : false,
        asyncEditorLoading : false,
        forceFitColumns : true,
        enableCellNavigation : true,
        enableColumnReorder : false,
        rowHeight : 25,
        autoEdit: false
    };
    grid = new Slick.Grid($("#" + gridId), data, gridColumns, gridOptions);
    grid.setSelectionModel(new Slick.CellSelectionModel());
    grid.invalidate();

    grid.onCellChange.subscribe(function(e,args){
        translationUpdateTranslation(targetId, fields, args.grid.getDataItem(args.grid.getSelectedRows()[0]));
    });
    return grid;
}

function translationLanguageFormatter(row, cell, value, columnDef, dataContext){
	return "<a href='javascript:void(0)' onclick='translationGetDeletePage(\"" + dataContext.translationType + "\",\"" + dataContext.targetId + "\",\"" + dataContext.lang + "\")'>" + value + "</a>";
}

function translationFieldFormatter(row, cell, value, columnDef, dataContext){
    return "<div>" + value + "</div>";
}

function translationGetCreatePage(type, target, fields, data) {
	$.get(
		createTranslationPageUrl,
		{},
		function(responseText) {
			responseText = jQuery.trim(responseText);
			createTranslationPageSetup(responseText, type, target, fields, data);
		},
		"html"
	);
}

function createTranslationPageSetup(responseText, type, target, fields, data){
	if ($("#translationDialog").dialog( "isOpen" ) !== true) {
		$("#translationDialog").empty();
		$("#translationDialog").html(responseText);
		
		$("#translationDialog").dialog({
			width : "300",
			height : "190",
			title : translationDialogTitleLabel,
			resizable: false,
			modal: true,
			open: function(event) {
				createTranslationPageInitFields();
				$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
				$(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
				$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
				$(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
			},
			buttons : {
				cancelLabel : function() {
					$("#translationDialog").dialog("close");
				},
				createLabel : function() {
					if (translationCreateValidateForm())
						translationCreateTranslation(type, target, fields, data);
				}
			}
		});
	}
}

function createTranslationPageInitFields(){
	var output = "";
	for(var i = 0; i < translateLanguage.length; i++){
		output += "<option " + "value='" + translateLanguage[i] + "'>" + translateLanguage[i] + "</option>";
	}
	$("#translationLanguageSelect").empty().html(output);
	$('#translationLanguageSelect').multiselect({
		header : false,
		multiple : false,
		noneSelectedText : multiselectNoneSelectedTextLabel,
		minWidth : 150,
		height: 60,
		selectedList : 1
	});
}

function translationCreateValidateForm(){
	if($("#translationLanguageSelect").val() == "" || $("#translationLanguageSelect").val() == null){
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

function translationCreateTranslation(type, target, fields, data){
	var callback = null;
	var typeTranslation = "";
	switch(type){
	case "categories":
        typeTranslation = "CATEGORY";
		callback = function(){categoryTranslationDrawAll();};
		break;
    case "productProperties":
        typeTranslation = "FEATURE";
        callback = function(){tourismPropertiesTranslationDrawAll(target);};
        break;
    case "productFeatures":
        typeTranslation = "FEATURE";
        callback = function(){tourismFeaturesTranslationDrawAll(target);};
        break;
	case "categoryFeatures":
        typeTranslation = "FEATURE";
		callback = function(){categoryFeaturesTranslationDrawAll(target);};
		break;
	case "catalog":
        typeTranslation = "CATALOG";
		callback = function(){catalogTranslationDrawAll();};
		break;
	case "categoryVariation":
        typeTranslation = "VARIATION";
		callback = function(){categoryVariationCreateTranslationValues($("#translationLanguageSelect").val(), target);};
		break;
	case "product":
        typeTranslation = "PRODUCT";
		callback = function(){tourismTranslationDrawAll(target);};
		break;
	case "ticketType":
        typeTranslation = "TICKET_TYPE";
		callback = function(){tourismPricingTranslationDrawAll(target);};
		break;
	case "poi":
        typeTranslation = "POI";
		callback = function(){poiTranslationDrawAll(target);};
		break;
    case "companyBrands":
         typeTranslation = "BRAND";
         callback = function(){companyBrandsTranslationDrawAll(target);};
         break;
    case "productBrands":
         typeTranslation = "BRAND";
         callback = function(){productBrandsTranslationDrawAll(target);};
         break;
    case "companyCoupons":
        typeTranslation = "COUPON";
        callback = function(){companyCouponsTranslationDrawAll(target);};
        break;
	default:
		break;
	}
    var valueObj = new Object();
    for(var i = 0; i < fields.length; i++){
        valueObj[fields[i]] = data[fields[i]];
    }
	var dataToSend = "target=" + target + "&language=" + $("#translationLanguageSelect").val() + "&type=" + typeTranslation + "&value=" + encodeURIComponent(JSON.stringify(valueObj));

	$.ajax({
		url : updateTranslationUrl,
		type : "POST",
		noticeType : "POST",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if(typeof(callback) == "function"){
				$("#translationDialog").dialog("close");
				$("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
				callback.call(this);
			}
		}
	});
}

function translationUpdateTranslation(targetId, fields, data){
    var valueObj = new Object();
    for(var i = 0; i < fields.length; i++){
        valueObj[fields[i]] = data[fields[i]];
    }
    var dataToSend = "target=" + targetId + "&language=" + data.lang + "&type=" + data.type + "&value=" + encodeURIComponent(JSON.stringify(valueObj));

	$.ajax({
		url : updateTranslationUrl,
		type : "POST",
		noticeType : "POST",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {}
	});
}

function translationGetDeletePage(type, target, language) {
	$.get(
		deleteTranslationPageUrl,
		{},
		function(responseText) {
			responseText = jQuery.trim(responseText);
			deleteTranslationPageSetup(responseText, type, target, language);
		},
		"html"
	);
}

function deleteTranslationPageSetup(responseText, type, target, language){
	if ($("#translationDialog").dialog( "isOpen" ) !== true) {
		$("#translationDialog").empty();
		$("#translationDialog").html(responseText);
		
		$("#translationDialog").dialog({
			width : "300",
			height: "118",
			title : translationDialogTitleLabel,
			resizable: false,
			modal: true,
			open: function(event) {
				$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
				$(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").addClass("ui-delete-button");
				$(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
				$(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").html("<span class='ui-button-text'>" + deleteLabel + "</span>");
			},
			buttons : {
				cancelLabel : function() {
					$("#translationDialog").dialog("close");
				},
				deleteLabel : function() {
					translationDeleteTranslation(type, target, language);
				}
			}
		});
	}
}

function translationDeleteTranslation(type, target, language){
	var callback = null;
	switch(type){
	case "categories":
		callback = function(){categoryTranslationDrawAll();};
		break;
    case "productProperties":
        callback = function(){tourismPropertiesTranslationDrawAll(target);};
        break;
	case "productFeatures":
		callback = function(){tourismFeaturesTranslationDrawAll(target);};
		break;
	case "categoryFeatures":
		callback = function(){categoryFeaturesTranslationDrawAll(target);};
		break;
	case "catalog":
		callback = function(){catalogTranslationDrawAll();};
		break;
	case "categoryVariation":
		callback = function(){categoryVariationGetValuesTranslation(target);};
		break;
	case "product":
		callback = function(){tourismTranslationDrawAll(target);};
		break;
	case "ticketType":
		callback = function(){tourismPricingTranslationDrawAll(target);};
		break;
	case "poi":
		callback = function(){poiTranslationDrawAll(target);};
		break;
    case "companyBrands":
        callback = function(){companyBrandsTranslationDrawAll(target);};
        break;
    case "productBrands":
        callback = function(){productBrandsTranslationDrawAll(target);};
        break;
    case "companyCoupons":
        callback = function(){companyCouponsTranslationDrawAll(target);};
        break;
	default:
		break;
	}
	var dataToSend = "target=" + target + "&language=" + language;
	$.ajax({
		url : deleteTranslationUrl,
		type : "GET",
		noticeType : "DELETE",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if(typeof(callback) == "function"){
				$("#translationDialog").dialog("close");
				$("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
				callback.call(this);
			}
		}
	});
}