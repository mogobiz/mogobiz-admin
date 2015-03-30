var tourismPropertiesGridObject = null;

function tourismPropertiesReload(productId) {
    var dataToSend = "id=" + productId + "&format=json";
    $.ajax({
        url: showProductUrl + "?" + dataToSend,
        type: "GET",
        data: "",
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            var product = response;
            tourismPropertiesInit(product);
        }
    })
}

function tourismPropertiesInit(product) {
    $("#tourismPropertiesAddLink").unbind();
    $("#tourismPropertiesAddLink").click(function() {
        $.get(tourismPropertiesPageUrl, {}, function(htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            tourismPropertiesCreatePageSetup(htmlresponse, product.id, "", true);
        }, "html");
    });
    // grid setup
    var columns = [{
        id : "propertyName",
        name : tourismPropertiesNameLabel,
        field : "propertyName",
        width : 30,
        formatter : tourismPropertiesGridNameFormatter,
        cssClass : "cell-title"
    },{
        id : "propertyValue",
        name : tourismPropertiesValueLabel,
        field : "propertyValue",
        width : 25,
        cssClass : ""
    }];

    var options = {
        editable : false,
        enableAddRow : false,
        asyncEditorLoading : false,
        forceFitColumns : true,
        enableCellNavigation : false,
        enableColumnReorder : false,
        autoEdit : false,
        rowHeight : 25
    };

    var gridData = [];
    if (product.properties) {
        for (var i = 0; i < product.properties.length; i++) {
            gridData[gridData.length] = {
                "id" : i,
                "propertyId" : product.properties[i].id,
                "propertyName" : product.properties[i].name,
                "propertyValue" : product.properties[i].value,
                "productId" : product.id
            }
        }
    }
    tourismPropertiesGridObject = new Slick.Grid(
        $("#tourismPropertiesGrid"), gridData, columns, options);
    tourismPropertiesGridObject
        .setSelectionModel(new Slick.RowSelectionModel());
    tourismPropertiesGridObject.invalidate();
}

function tourismPropertiesGridNameFormatter(row, cell, value, columnDef, dataContext) {
    return "<a href='javascript:void(0);' onclick='tourismPropertiesLoadProperty("+ dataContext.productId + "," + dataContext.propertyId + ")'>" + value + "</a>";
}

function tourismPropertiesLoadProperty(productId, propertyId) {
    $.get(tourismPropertiesPageUrl, {}, function(htmlresponse) {
        htmlresponse = jQuery.trim(htmlresponse);
        tourismPropertiesCreatePageSetup(htmlresponse, productId, propertyId, false);
    }, "html");
}

function tourismPropertiesCreatePageSetup(htmlresponse, productId, propertyId, create) {
    if ($('#tourismPropertiesCreateDialog').dialog("isOpen") !== true) {
        $('#tourismPropertiesCreateDialog').empty();
        $('#tourismPropertiesCreateDialog').html(htmlresponse);
        $('#tourismPropertiesCreateDialog').dialog({
            title : tourismPropertiesTitleLabel,
            modal : true,
            resizable : false,
            width : 'auto',
            height : 'auto',
            open : function(event) {
                tourismPropertiesInitControls(create);
                tourismPropertiesInitFields(create, propertyId);
            },
            buttons : {
                deleteLabel : function() {
                    tourismPropertiesDeleteProperty(productId, propertyId);
                },
                cancelLabel : function() {
                    $('#tourismPropertiesCreateDialog').dialog("close");
                },
                updateLabel : function() {
                    if (!tourismPropertiesValidateForm())
                        return;
                    tourismPropertiesUpdateProperty(productId);
                },
                createLabel : function() {
                    if (!tourismPropertiesValidateForm())
                        return;
                    tourismPropertiesCreateProperty(productId);
                }
            }
        });
    }
}

function tourismPropertiesInitControls(create) {
    $("#tourismPropertiesTabs .tabs a").unbind();
    $("#tourismPropertiesTranslationTab").removeClass("disabled");
    $("#tourismPropertiesTranslationDiv").hide();
    $("#tourismPropertiesGeneralTab").addClass("selected");
    $("#tourismPropertyName").removeAttr("disabled");
    if (create) {
        $("#tourismPropertiesEditDiv").hide();
        $("#tourismPropertiesTranslationTab").addClass("disabled");
        $('.ui-dialog-buttonpane').find('button:contains("deleteLabel")').hide();
        $('.ui-dialog-buttonpane').find('button:contains("updateLabel")').hide();
        $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
        $('.ui-dialog-buttonpane').find('button:contains("createLabel")').addClass("ui-create-button");
        $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">' + cancelLabel + '</span>');
        $('.ui-dialog-buttonpane').find('button:contains("createLabel")').html('<span class="ui-button-text">' + createLabel + '</span>');
    } else {
        $("#tourismPropertiesTabs .tabs a").click(function() {
            $("#tourismPropertiesTabs .tabs .selected").removeClass("selected");
            $(this).addClass("selected");
            switch($(this).attr("id")){
                case "tourismPropertiesGeneralTab":
                    $("#tourismPropertiesTranslationDiv").hide();
                    $("#tourismPropertiesAddDiv").show();
                    break;
                case "tourismPropertiesTranslationTab":
                    $("#tourismPropertiesAddDiv").hide();
                    $("#tourismPropertiesTranslationDiv").show();
                    break;
                default:
                    break;
            }
        });
        $("#tourismPropertyName").attr("disabled", "disabled");
        $('.ui-dialog-buttonpane').find('button:contains("createLabel")').hide();
        $('.ui-dialog-buttonpane').find('button:contains("deleteLabel")').addClass("ui-delete-button");
        $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
        $('.ui-dialog-buttonpane').find('button:contains("updateLabel")').addClass("ui-update-button");
        $('.ui-dialog-buttonpane').find('button:contains("deleteLabel")').html('<span class="ui-button-text">' + deleteLabel + '</span>');
        $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">' + cancelLabel + '</span>');
        $('.ui-dialog-buttonpane').find('button:contains("updateLabel")').html('<span class="ui-button-text">' + updateLabel + '</span>');
    }
}

function tourismPropertiesInitFields(create, propertyId) {
    $("#tourismPropertyId").val(propertyId);
    $("#tourismPropertyName, #tourismPropertyValue").val("");
    if (!create) {
        var data = tourismPropertiesGetDataRowByPropertyId(propertyId);
        $("#tourismPropertyName").val(data.propertyName);
        $("#tourismPropertyValue").val(data.propertyValue);
        tourismPropertiesTranslationDrawAll(propertyId);
    }
}

function tourismPropertiesGetDataRowByPropertyId(propertyId) {
    var data = tourismPropertiesGridObject.getData();
    for (var i = 0; i < data.length; i++) {
        if (data[i].propertyId == propertyId)
            return data[i];
    }
    return null; // should never happen
}

function tourismPropertiesValidateForm() {
    var valid = false;
    if ($('#tourismPropertyName').val() == "") {
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : 'error'
        });
    } else {
        valid = true;
    }
    return valid;
}

function tourismPropertiesCreateProperty(productId) {
    var dataToSend = "product_id=" + productId + "&name=" + $("#tourismPropertyName").val() + "&value=" + encodeURIComponent($("#tourismPropertyValue").val()) + "&format=json";
    $.ajax({
        url : savePropertyUrl,
        type : "POST",
        noticeType : "POST",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $('#tourismPropertiesCreateDialog').dialog("close");
            tourismPropertiesReload(productId);
        },
        error : function(response, status) {}
    });
}

function tourismPropertiesUpdateProperty(productId) {
    var dataToSend = "product_id=" + productId + "&name=" + $("#tourismPropertyName").val() + "&value=" + encodeURIComponent($("#tourismPropertyValue").val()) + "&format=json";
    $.ajax({
        url : savePropertyUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $('#tourismPropertiesCreateDialog').dialog("close");
            tourismPropertiesReload(productId);
        },
        error : function(response, status) {}
    });
}

function tourismPropertiesDeleteProperty(productId, propertyId) {
    var dataToSend = "id=" + propertyId + "&format=json";
    $.ajax({
        url : deletePropertyUrl,
        type : "POST",
        noticeType : "DELETE",
        data : dataToSend,
        cache : false,
        async : true,
        success : function(response, status) {
            $('#tourismPropertiesCreateDialog').dialog("close");
            tourismPropertiesReload(productId);
        },
        error : function(response, status) {}
    });
}

//TRANSLATION

var tourismPropertiesTranslationGrid = null;

function tourismPropertiesTranslationDrawAll(propertyId){
    tourismPropertiesTranslationGrid = null;
    var successCallback = function (response){
        var fields = ["name", "value"];
        $("#tourismPropertiesTranslationAddLink").unbind();
        $("#tourismPropertiesTranslationAddLink").bind("click", function(){
            var defaultsData = {name: $("#tourismPropertyName").val(), value: $("#tourismPropertyValue").val()};
            translationGetCreatePage("productProperties", propertyId, fields, defaultsData);
        });
        var columns = [{field: "name", title: translationNameGridLabel},{field: "value", title: translationValueGridLabel}];
        var data = [];
        for (var i = 0; i < response.length; i++) {
            var value = eval( "(" + response[i].value + ")" );
            data[data.length] = {
                "id" : response[i].id,
                "targetId": propertyId,
                "translationType": "productProperties",
                "lang": response[i].lang,
                "type": response[i].type,
                "name": value.name,
                "value": value.value
            }
        }
        var tabVisible = $("#tourismPropertiesTranslationDiv").is(":visible");
        if(! tabVisible)
            $("#tourismPropertiesTranslationDiv").show();

        tourismPropertiesTranslationGrid = translationGetGrid("tourismPropertiesTranslationGrid", propertyId, fields, columns, data);

        if(! tabVisible)
            $("#tourismPropertiesTranslationDiv").hide();
        $("#categoriesMain").hideLoading();
    }
    translationGetAllData(propertyId, successCallback);
}