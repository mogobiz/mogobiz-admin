var tourismFeaturesGridObject = null;

function tourismFeaturesLoad(productId) {
    $.ajax({
        url : showFeaturesUrl,
        type : "GET",
        data : {"product.id":productId, format:"json"},
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#tourismFeaturesAddLink").unbind();
            $("#tourismFeaturesAddLink").click(function() {
                $.get(tourismFeaturePageUrl, {}, function(htmlresponse) {
                    htmlresponse = jQuery.trim(htmlresponse);
                    tourismFeaturesCreatePageSetup(htmlresponse, productId, null, true);
                }, "html");
            });
            // grid setup
            var columns = [{
                id : "#",
                name : "",
                width : 5,
                behavior : "selectAndMove",
                selectable : false,
                cssClass : "cell-reorder"
            },{
                id : "featureName",
                name : "Name",
                field : "featureName",
                width : 30,
                formatter : tourismFeaturesGridNameFormatter,
                cssClass : "cell-title"
            },{
                id : "externalCode",
                name : "External Code",
                field : "featureExternalCode",
                width : 25,
                cssClass : ""
            },{
                id : "featureValue",
                name : "Value",
                field : "featureValue",
                formatter : tourismFeaturesGridValueFormatter,
                width : 25,
                cssClass : ""
            },{
                id : "hide",
                name : "Hide",
                field : "featureHide",
                width : 15,
                formatter : tourismFeaturesGridHideFormatter,
                cssClass : "cell-centered"
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
            if (response.features) {
                for (var i = 0; i < response.features.length; i++) {
                    gridData[gridData.length] = {
                        'id' : i,
                        'featureId' : response.features[i].id,
                        'featureUUID' : response.features[i].uuid,
                        'featureName' : response.features[i].name,
                        'featurePosition' : ((i + 1) * 10),
                        'featureValue' : response.features[i].value,
                        'featureExternalCode' : response.features[i].externalCode,
                        'featureHide' : response.features[i].hide,
                        'productId' : productId,
                        'category': response.features[i].category
                    }
                }
            }
            tourismFeaturesGridObject = new Slick.Grid(
                $("#tourismFeaturesGrid"), gridData, columns, options);
            tourismFeaturesGridObject
                .setSelectionModel(new Slick.RowSelectionModel());
            tourismFeaturesGridObject.invalidate();

            var moveRowsPlugin = new Slick.RowMoveManager({
                cancelEditOnDrag : true
            });

            moveRowsPlugin.onBeforeMoveRows.subscribe(function(e, data) {
                for ( var i = 0; i < data.rows.length; i++) {
                    // no point in moving before or after itself
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
                var data = tourismFeaturesGridObject.getData();
                data[index].featurePosition = (insertBefore * 10) + 5;
                data.sort(function (a, b) {
                    var posA =parseInt( a.featurePosition );
                    var posB =parseInt( b.featurePosition );
                    return (posA < posB) ? -1 : (posA > posB) ? 1 : 0;
                });

                var tagids = []
                for ( var i in data) {
                    tagids[tagids.length] = data[i].featureId
                }

                $.ajax({
                    url : updateFeaturesPositionUrl+"?product.id=" + productId + "&tagids=" + tagids.join(",") + "&format=json",
                    type : "POST",
                    noticeType : "PUT",
                    data : "",
                    dataType : "json",
                    cache : false,
                    async : true,
                    success : function(response, status) {
                        tourismFeaturesGridObject.resetActiveCell();
                        tourismFeaturesGridObject.setData(data);
                        tourismFeaturesGridObject.setSelectedRows(index);
                        tourismFeaturesGridObject.render();
                    }
                });
            });
            tourismFeaturesGridObject.registerPlugin(moveRowsPlugin);

        }
    });
}

function tourismFeaturesGridNameFormatter(row, cell, value, columnDef, dataContext) {
    var val = value;
    if(dataContext.category != null && dataContext.category.id != null){
        if(dataContext.featureValue.indexOf("||||") > 0)
            val += " <sup style='color: #075899;'>^</sup>";
        else
            val += " <sup style='color: #075899;'>*</sup>";
    }
    return "<a href='javascript:void(0);' onclick='tourismFeaturesLoadFeature("+ dataContext.productId + "," + dataContext.featureId + ")'>" + val + "</a>";
}

function tourismFeaturesGridValueFormatter(row, cell, value, columnDef, dataContext) {
    if(!value || value == null || value == undefined)
        return "";
    var val = value;
    var index = value.indexOf("||||");
    if(index > 0) {
        val = value.substring(index + 4) + " (<span style='text-decoration: line-through;'>" + value.substring(0,index)  + "</span>)";
    }
    return val;
}

function tourismFeaturesGridHideFormatter(row, cell, value, columnDef, dataContext) {
    var checkBox = "<input type='checkbox' disabled='disabled' style='margin-top:4px;'";
    checkBox += (value) ? "checked='checked'/>" : "/>";
    return checkBox;
}

function tourismFeaturesLoadFeature(productId, featureId) {
    $.get(tourismFeaturePageUrl, {}, function(htmlresponse) {
        htmlresponse = jQuery.trim(htmlresponse);
        tourismFeaturesCreatePageSetup(htmlresponse, productId, featureId, false);
    }, "html");
}

function tourismFeaturesCreatePageSetup(htmlresponse, productId, featureId, create) {
    if ($('#tourismFeaturesCreateDialog').dialog("isOpen") !== true) {
        $('#tourismFeaturesCreateDialog').empty();
        $('#tourismFeaturesCreateDialog').html(htmlresponse);
        $('#tourismFeaturesCreateDialog').dialog({
            title : tourismFeaturesTitleLabel,
            modal : true,
            resizable : false,
            width : 'auto',
            height : 'auto',
            open : function(event) {
                tourismFeaturesInitControls(create);
                tourismFeaturesInitFields(create, featureId);
            },
            buttons : {
                deleteLabel : function() {
                    tourismFeaturesDeleteFeature(productId, featureId);
                },
                cancelLabel : function() {
                    $('#tourismFeaturesCreateDialog').dialog("close");
                },
                updateLabel : function() {
                    if (!tourismFeaturesValidateForm())
                        return;
                    tourismFeaturesUpdateFeature(productId, featureId);
                },
                createLabel : function() {
                    if (!tourismFeaturesValidateForm())
                        return;
                    tourismFeaturesCreateFeature(productId);
                }
            }
        });
    }
}

function tourismFeaturesInitControls(create) {
    $("#tourismFeaturesTabs .tabs a").unbind();
    $("#tourismFeaturesTranslationTab").removeClass("disabled");
    $("#tourismFeaturesTranslationDiv").hide();
    $("#tourismFeaturesGeneralTab").addClass("selected");
    if (create) {
        $("#tourismFeaturesEditDiv").hide();
        $("#tourismFeaturesTranslationTab").addClass("disabled");
        $('.ui-dialog-buttonpane').find('button:contains("deleteLabel")').hide();
        $('.ui-dialog-buttonpane').find('button:contains("updateLabel")').hide();
        $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
        $('.ui-dialog-buttonpane').find('button:contains("createLabel")').addClass("ui-create-button");
        $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">' + cancelLabel + '</span>');
        $('.ui-dialog-buttonpane').find('button:contains("createLabel")').html('<span class="ui-button-text">' + createLabel + '</span>');
    } else {
        $("#tourismFeaturesTabs .tabs a").click(function() {
            $("#tourismFeaturesTabs .tabs .selected").removeClass("selected");
            $(this).addClass("selected");
            switch($(this).attr("id")){
                case "tourismFeaturesGeneralTab":
                    $("#tourismFeaturesTranslationDiv").hide();
                    $("#tourismFeaturesAddDiv").show();
                    break;
                case "tourismFeaturesTranslationTab":
                    $("#tourismFeaturesAddDiv").hide();
                    $("#tourismFeaturesTranslationDiv").show();
                    break;
                default:
                    break;
            }
        });
        $('.ui-dialog-buttonpane').find('button:contains("createLabel")').hide();
        $('.ui-dialog-buttonpane').find('button:contains("deleteLabel")').addClass("ui-delete-button");
        $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
        $('.ui-dialog-buttonpane').find('button:contains("updateLabel")').addClass("ui-update-button");
        $('.ui-dialog-buttonpane').find('button:contains("deleteLabel")').html('<span class="ui-button-text">' + deleteLabel + '</span>');
        $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">' + cancelLabel + '</span>');
        $('.ui-dialog-buttonpane').find('button:contains("updateLabel")').html('<span class="ui-button-text">' + updateLabel + '</span>');
    }
}

function tourismFeaturesInitFields(create, featureId) {
    $("#tourismFeatureId").val(featureId);
    $("#tourismFeatureName, #tourismFeatureValue, #tourismFeatureExternalCode, #tourismFeatureUUID").val("");
    $("#tourismFeatureHide").prop("checked", false);
    if (!create) {
        var data = tourismFeaturesGetDataRowByFeatureId(featureId);
        var value = data.featureValue;
        if(value && value != null && value != undefined) {
            var index = value.indexOf("||||");
            if (index > 0) {
                value = value.substring(index + 4);
            }
        }
        $("#tourismFeatureName").val(data.featureName);
        $("#tourismFeatureValue").val(value);
        $("#tourismFeatureExternalCode").val(data.featureExternalCode);
        $("#tourismFeatureUUID").val(data.featureUUID);
        if(data.featureHide)
            $("#tourismFeatureHide").prop("checked", true);
        tourismFeaturesTranslationDrawAll(featureId);
    }
}

function tourismFeaturesGetDataRowByFeatureId(featureId) {
    var data = tourismFeaturesGridObject.getData();
    for (var i = 0; i < data.length; i++) {
        if (data[i].featureId == featureId)
            return data[i];
    }
    return null; // should never happen
}

function tourismFeaturesValidateForm() {
    var valid = false;
    if ($('#tourismFeatureName').val() == "") {
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

function tourismFeaturesCreateFeature(productId) {
    var dataToSend = "product.id=" + productId + "&feature.name=" + $("#tourismFeatureName").val();
    dataToSend += "&feature.value=" + $("#tourismFeatureValue").val() + "&feature.hide=" + $("#tourismFeatureHide").is(':checked') + "&format=json";
    $.ajax({
        url : createFeaturesUrl,
        type : "POST",
        noticeType : "POST",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $('#tourismFeaturesCreateDialog').dialog("close");
            tourismFeaturesLoad(productId);
        },
        error : function(response, status) {
            $('#tourismFeatureName').focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : featuresUniqueErrorLabel,
                stay : false,
                type : 'error'
            });
        }
    });
}

function tourismFeaturesUpdateFeature(productId, featureId) {
    var dataToSend = "product.id=" + productId + "&feature.id=" + featureId
    dataToSend += "&feature.name=" + $("#tourismFeatureName").val() + "&feature.value=" + $("#tourismFeatureValue").val();
    dataToSend += "&feature.externalCode=" + $("#tourismFeatureExternalCode").val() + "&feature.hide=" + $("#tourismFeatureHide").is(':checked') + "&format=json";
    $.ajax({
        url : updateFeaturesUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $('#tourismFeaturesCreateDialog').dialog("close");
            tourismFeaturesLoad(productId);
        },
        error : function(response, status) {
            $('#tourismPricingTicketType').focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : featuresUniqueErrorLabel,
                stay : false,
                type : 'error'
            });
        }
    });
}

function tourismFeaturesDeleteFeature(productId, featureId) {
    $.ajax({
        url : deleteFeaturesUrl+"?product.id="+productId+"&feature.id="+featureId,
        type : "POST",
        noticeType : "DELETE",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $('#tourismFeaturesCreateDialog').dialog("close");
            tourismFeaturesLoad(productId);
        },
        error : function(response, status) {}
    });
}

//TRANSLATION

var tourismFeaturesTranslationGrid = null;

function tourismFeaturesTranslationDrawAll(featureId){
    tourismFeaturesTranslationGrid = null;
    var successCallback = function (response){
        var fields = ["name", "value"];
        $("#tourismFeaturesTranslationAddLink").unbind();
        $("#tourismFeaturesTranslationAddLink").bind("click", function(){
            var defaultsData = {name: $("#tourismFeatureName").val(), value: $("#tourismFeatureValue").val()};
            translationGetCreatePage("productFeatures", featureId, fields, defaultsData);
        });
        var columns = [{field: "name", title: translationNameGridLabel},{field: "value", title: translationValueGridLabel}];
        var data = [];
        for (var i = 0; i < response.length; i++) {
            var value = eval( "(" + response[i].value + ")" );
            data[data.length] = {
                "id" : response[i].id,
                "targetId": featureId,
                "translationType": "productFeatures",
                "lang": response[i].lang,
                "type": response[i].type,
                "name": decodeURIComponent(value.name),
                "value": decodeURIComponent(value.value)
            }
        }
        var tabVisible = $("#tourismFeaturesTranslationDiv").is(":visible");
        if(! tabVisible)
            $("#tourismFeaturesTranslationDiv").show();

        tourismFeaturesTranslationGrid = translationGetGrid("tourismFeaturesTranslationGrid", featureId, fields, columns, data);

        if(! tabVisible)
            $("#tourismFeaturesTranslationDiv").hide();
        $("#categoriesMain").hideLoading();
    }
    translationGetAllData(featureId, successCallback);
}