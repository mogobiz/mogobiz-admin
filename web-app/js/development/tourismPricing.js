var tourismPricingGridObject = null;

function tourismPricingLoadPricings(productId) {
    var dataToSend = 'product.id=' + productId;
    dataToSend += '&format=json';
    $.ajax({
        url : loadTicketTypeURL + "?" + dataToSend,
        type : "GET",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#tourismPriceAddLink").unbind();
            $("#tourismPriceAddLink").click(function() {
                tourismPricingLoadTicketTypes(productId, null, true, false);
            });
            // grid setup
            var columns = [{
                id : "#",
                name : "",
                width : 5,
                behavior : "selectAndMove",
                selectable : false,
                cssClass : "cell-reorder"
            }, {
                id : "value",
                name : tourismPricing_ticketType_label,
                field : "ticketName",
                width : 25,
                formatter : tourismPricingTicketCellFormatter,
                cssClass : "cell-title"
            }, {
                id : "cost",
                name : tourismPricing_ticketPrice_label,
                field : "cost",
                width : 15,
                cssClass : ""
            }, {
                id : "stock",
                name : tourismPricing_ticketStock_label,
                field : "stock",
                width : 15,
                cssClass : ""
            }, {
                id : "startDate",
                name : tourismPricing_startDate_label,
                field : "startDate",
                width : 20,
                cssClass : ""
            }, {
                id : "stopDate",
                name : tourismPricing_endDate_label,
                field : "stopDate",
                width : 20,
                cssClass : ""
            } ];

            var options = {
                editable : false,
                enableAddRow : false,
                asyncEditorLoading : false,
                forceFitColumns : true,
                enableCellNavigation : false,
                enableColumnReorder : false,
                rowHeight : 25
            };

            var gridData = [];
            for ( var i = 0; i < response.length; i++) {
                gridData[gridData.length] = {
                    'id' : i,
                    'ticketId' : response[i].id,
                    'ticketName' : response[i].name,
                    'variation1' : (response[i].variation1) ? response[i].variation1.id : null,
                    'variation2' : (response[i].variation2) ? response[i].variation2.id : null,
                    'variation3' : (response[i].variation3) ? response[i].variation3.id : null,
                    'cost' : (response[i].price / 100),
                    'stock' : (!response[i].stock || response[i].stock.stockUnlimited) ? "Unlimited" : response[i].stock.stock,
                    'stockUnlimited' : (!response[i].stock) ? true : response[i].stock.stockUnlimited,
                    'stockOutSelling' : (!response[i].stock) ? false : response[i].stock.stockOutSelling,
                    'minOrder' : (response[i].minOrder >= 0) ? response[i].minOrder : 'Unlimited',
                    'maxOrder' : (response[i].maxOrder > 0) ? response[i].maxOrder : 'Unlimited',
                    'startDate' : (response[i].startDate ? response[i].startDate.split(' ')[0] : ""),
                    'stopDate' : (response[i].stopDate ? response[i].stopDate.split(' ')[0]: ""),
                    'availabilityDate' : (response[i].availabilityDate ? response[i].availabilityDate.split(' ')[0]: ""),
                    'xprivate' : response[i].xprivate,
                    'sku' : response[i].sku,
                    'productId' : productId
                }
            }
            tourismPricingGridObject = new Slick.Grid($("#tourismPricingGrid"), gridData, columns, options);
            tourismPricingGridObject.setSelectionModel(new Slick.RowSelectionModel());
            tourismPricingGridObject.invalidate();
            var moveRowsPlugin = new Slick.RowMoveManager();
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
                var extractedRows = [], left, right;
                var rows = args.rows;
                var insertBefore = args.insertBefore;
            });
            tourismPricingGridObject.registerPlugin(moveRowsPlugin);
            tourismPricingGridObject.onDragInit.subscribe(function(e, dd) {
                e.stopImmediatePropagation();
            });
            $('#tourismPricingCreateDialog').dialog("close");

            /**
             * Global stock management
             */
            $('#globalstockDisplay').unbind();
            $('#globalstockDisplay').change(function() {
                var stockDisplay = $("#globalstockDisplay").is(":checked");
                var dataToSend = "product.id=" + productId;
                dataToSend += "&product.stockDisplay=" + stockDisplay;
                dataToSend += "&format=json";
                $.ajax({
                    url : updateProductUrl,
                    type : "POST",
                    noticeType : "PUT",
                    data : dataToSend,
                    dataType : "json",
                    cache : false,
                    async : true,
                    success : function(response, status) {}
                });
            });

            $('#productMontant').unbind();
            $('#productMontant').change(function() {
                if (!$('input#productMontant')[0].checkValidity()) {
                    $('#productMontant').focus();
                    jQuery.noticeAdd({
                        stayTime : 2000,
                        text : fieldsInvalidMessageLabel,
                        stay : false,
                        type : 'error'
                    });
                    return;
                }
                tourismPricingUpdateProductPrice(productId, $('#productMontant').val());
            });
            tourismPricingUpdateFreeProductLabel();
        }
    });
}

function tourismPricingTicketCellFormatter(row, cell, value, columnDef, dataContext) {
    return "<a href='javascript:void(0)' onclick='tourismPricingCheckTicketResource(" + dataContext.productId + "," + dataContext.ticketId + ")'>" + value + "</a>";
}

/**
 * tourismPricingUpdateProductPrice
 *
 * @param productId
 * @param price
 *Double
 */
function tourismPricingUpdateProductPrice(productId, price) {
    var dataToSend = "product.id=" + productId;
    dataToSend += "&product.price=" + parseInt(parseFloat(price) * 100);
    dataToSend += "&format=json";
    $.ajax({
        url : updateProductUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            tourismPricingUpdateFreeProductLabel();
        }
    });
}

function tourismPricingLoadTicketTypes(productId, ticketId, create, hasResource) {
    var dataToSend = "category.id=" + categorySelectedId + "&format=json";
    $.ajax({
        url : showVariationsUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(ticketTypes, status) {
            $.get(tourismPricingPageUrl, {}, function(htmlresponse) {
                htmlresponse = jQuery.trim(htmlresponse);
                tourismPricingCreatePageSetup(htmlresponse, productId, ticketId,
                    create, ticketTypes, hasResource);
            }, "html");
        }
    });
}

function tourismPricingCreatePageSetup(htmlresponse, productId, ticketId, create, ticketTypes, hasResource){
    if ($('#tourismPricingCreateDialog').dialog("isOpen") !== true) {
        $('#tourismPricingCreateDialog').empty();
        $('#tourismPricingCreateDialog').html(htmlresponse);

        $('#tourismPricingCreateDialog').dialog({
            title : pricingTitleLabel,
            modal : true,
            resizable : false,
            width : 'auto',
            height : 'auto',
            open : function(event) {
                tourismPricingInitControls(create);
                tourismPricingInitFields(create, ticketId, ticketTypes, hasResource);
            },
            buttons : {
                deleteLabel : function() {
                    tourismPricingDeleteTicketCombinaison(
                        productId, ticketId);
                },
                cancelLabel : function() {
                    $('#tourismPricingCreateDialog').dialog(
                        "close");
                },
                updateLabel : function() {
                    if (!tourismPricingValidateForm())
                        return;
                    tourismPricingUpdateTicketCombinaison(
                        productId, ticketId);
                },
                createLabel : function() {
                    if (!tourismPricingValidateForm())
                        return;
                    tourismPricingCreateTicketCombinaison(
                        productId, ticketId);
                }
            }
        });
    }
}

function tourismPricingInitControls(create) {
    var startDate = new Date();
    var availablesDates = $("#tourismPricingStartDate, #tourismPricingEndDate")
        .datepicker(
        {
            dateFormat : 'dd/mm/yy',
            minDate : startDate,
            changeMonth : true,
            changeYear : true,
            firstDay : 1,
            onClose : function(selectedDate) {
                var option = this.id == "tourismPricingStartDate" ? "minDate"
                    : "maxDate", instance = $(this).data(
                    "datepicker"), date = $.datepicker
                    .parseDate(
                        instance.settings.dateFormat
                        || $.datepicker._defaults.dateFormat,
                    selectedDate, instance.settings);
                availablesDates.not(this).datepicker("option",
                    option, date);
            }
        }).keydown(function(e) {
            if(e.keyCode == 8 || e.keyCode == 46)
                $(this).val("")
            return false;
        });
    $("#tourismPricingAvailabilityDate").datepicker("destroy");
    $("#tourismPricingAvailabilityDate").datepicker({
        dateFormat: 'dd/mm/yy',
        minDate: new Date(),
        changeMonth: true,
        changeYear: true,
        firstDay: 1
    });

    $("#tourismPricingMinOrder")
        .change(
        function() {
            if ($("#tourismPricingMinOrder").val() == ''
                || parseInt($("#tourismPricingMinOrder").val()) < 0) {
                $("#tourismPricingMinOrder").val(0);
            }
            if (($("#tourismPricingMaxOrder").val() != '')
                && (parseInt($("#tourismPricingMinOrder").val()) > parseInt($(
                    "#tourismPricingMaxOrder").val()))) {
                $("#tourismPricingMinOrder")
                    .val(
                    parseInt($(
                        "#tourismPricingMaxOrder")
                        .val()));
            }
            $("#tourismPricingMaxOrder").attr("min",
                $("#tourismPricingMinOrder").val());
        });

    $("#tourismPricingMaxOrder").change(
        function() {
            if (parseInt($("#tourismPricingMaxOrder").val()) < 1) {
                $("#tourismPricingMaxOrder").val(1);
            }
            if (($("#tourismPricingMaxOrder").val() != '')
                && (parseInt($("#tourismPricingMaxOrder").val()) < parseInt($(
                    "#tourismPricingMinOrder").val()))) {
                $("#tourismPricingMaxOrder")
                    .val(
                    parseInt($(
                        "#tourismPricingMinOrder")
                        .val()));
            }
            $("#tourismPricingMinOrder").attr("max",
                $("#tourismPricingMaxOrder").val());
        });

    $('#tourismPricingVariation1').multiselect({
        header : false,
        multiple : false,
        noneSelectedText : multiselectNoneSelectedTextLabel,
        minWidth : 100,
        height: 120,
        selectedList : 1
    });

    $('#tourismPricingVariation2').multiselect({
        header : false,
        multiple : false,
        noneSelectedText : multiselectNoneSelectedTextLabel,
        minWidth : 100,
        height: 120,
        selectedList : 1
    });

    $('#tourismPricingVariation3').multiselect({
        header : false,
        multiple : false,
        noneSelectedText : multiselectNoneSelectedTextLabel,
        minWidth : 100,
        height: 120,
        selectedList : 1
    });

    $('#tourismPricingStockUnlimited').unbind();
    $('#tourismPricingStockUnlimited').change( function() {
        if ($("#tourismPricingStockUnlimited").is(":checked")) {
            $('#tourismPricingTicketStock').attr('disabled', 'disabled');
            $('#tourismPricingTicketStock').val("");
        } else {
            $('#tourismPricingTicketStock').val("1")
            $('#tourismPricingTicketStock').removeAttr('disabled');
        }
    });
    $("#tourismPricingTabs .tabs a").unbind();
    $("#tourismPricingDownloadTab").removeClass("disabled");
    $("#tourismPricingTranslationTab").removeClass("disabled");
    $("#tourismPricingDownloadDiv").hide();
    $("#tourismPricingTranslationDiv").hide();
    $("#tourismPricingGeneralTab").addClass("selected");

    if (create) {
        $("#tourismPricingDownloadTab").addClass("disabled");
        $("#tourismPricingTranslationTab").addClass("disabled");
        $('.ui-dialog-buttonpane').find('button:contains("deleteLabel")').hide();
        $('.ui-dialog-buttonpane').find('button:contains("updateLabel")').hide();
        $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
        $('.ui-dialog-buttonpane').find('button:contains("createLabel")').addClass("ui-create-button");
        $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">' + cancelLabel + '</span>');
        $('.ui-dialog-buttonpane').find('button:contains("createLabel")').html('<span class="ui-button-text">' + createLabel + '</span>');
    } else {
        $("#tourismPricingTabs .tabs a").click(function() {
            $("#tourismPricingTabs .tabs .selected").removeClass("selected");
            $(this).addClass("selected");
            switch($(this).attr("id")){
                case "tourismPricingGeneralTab":
                    $("#tourismPricingDownloadDiv").hide();
                    $("#tourismPricingTranslationDiv").hide();
                    $("#tourismPricingAddDiv").show();
                    break;
                case "tourismPricingDownloadTab":
                    $("#tourismPricingAddDiv").hide();
                    $("#tourismPricingTranslationDiv").hide();
                    $("#tourismPricingDownloadDiv").show();
                    break;
                case "tourismPricingTranslationTab":
                    $("#tourismPricingAddDiv").hide();
                    $("#tourismPricingDownloadDiv").hide();
                    $("#tourismPricingTranslationDiv").show();
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

function tourismPricingInitFields(create, ticketId, ticketTypes, hasResource) {
    $("#tourismPricingId,#tourismPricingTicketType,#tourismPricingAvailabilityDate,#tourismPricingTicketPrice,#tourismPricingTicketStock,#tourismPricingMaxOrder,#tourismPricingStartDate,#tourismPricingEndDate").val("");
    $("#tourismPricingTicketStock").val("1");
    $("#tourismPricingMinOrder").val("0");
    $("#tourismPricingPrivate").prop("checked", false);
    $("#tourismPricingStockUnlimited").prop("checked", false);
    $("#tourismPricingStockOutSelling").prop("checked", false);
    $('#tourismPricingStartDate').datepicker("option", "maxDate", "");
    $('#tourismPricingEndDate').datepicker("option", "minDate", new Date());
    if ($('#productType').val() != 'SERVICE') {
        for ( var i = 0; i < ticketTypes.length; i++) {
            $('#tourismPricingVariation' + ticketTypes[i].position + 'Label').html(ticketTypes[i].name + "&nbsp;<sup>*</sup>");
            $('#tourismPricingVariation' + ticketTypes[i].position).multiselect('uncheckAll');
            $('#tourismPricingVariation' + ticketTypes[i].position).multiselect('enable');
            var options = document.getElementById('tourismPricingVariation' + ticketTypes[i].position).options;
            options.length = 0;
            options[options.length] = new Option('NONE', 'NONE', 'selected');
            for ( var j = 0; j < ticketTypes[i].variationValues.length; j++) {
                options[options.length] = new Option(
                    ticketTypes[i].variationValues[j].value,
                    ticketTypes[i].variationValues[j].id);
            }
            $('#tourismPricingVariation' + ticketTypes[i].position).multiselect('refresh');
        }
    }
    if (!create) {
        var data = tourismPricingGetDataRowByTicketId(ticketId);
        $("#tourismPricingId").val(data.ticketId);
        $("#tourismPricingSKU").val(data.sku);
        $("#tourismPricingAvailabilityDate").val(data.availabilityDate);
        $("#tourismPricingTicketType").val(data.ticketName);
        $("#tourismPricingVariation1").multiselect('uncheckAll');
        $('#tourismPricingVariation1').find('option:contains(' + data.variation1 + ')').attr('selected','selected');
        $("#tourismPricingVariation1").multiselect('refresh');
        $('#tourismPricingAddForm .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_tourismPricingVariation1"]')
            .each(function() {
                if (this.value == data.variation1) {
                    this.click();
                }
            });
        $("#tourismPricingVariation2").multiselect('uncheckAll');
        $('#tourismPricingVariation2').find('option:contains(' + data.variation2 + ')').attr('selected','selected');
        $("#tourismPricingVariation2").multiselect('refresh');
        $('#tourismPricingAddForm .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_tourismPricingVariation2"]')
            .each(function() {
                if (this.value == data.variation2) {
                    this.click();
                }
            });
        $("#tourismPricingVariation3").multiselect('uncheckAll');
        $('#tourismPricingVariation3').find('option:contains(' + data.variation3 + ')').attr('selected','selected');
        $("#tourismPricingVariation3").multiselect('refresh');
        $('#tourismPricingAddForm .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_tourismPricingVariation3"]')
            .each(function() {
                if (this.value == data.variation3) {
                    this.click();
                }
            });
        $("#tourismPricingVariation1").val(data.variation1);
        $("#tourismPricingVariation2").val(data.variation2);
        $("#tourismPricingVariation3").val(data.variation3);
        $("#tourismPricingTicketPrice").val(data.cost);
        $("#tourismPricingTicketStock").val(data.stock);
        $("#tourismPricingMinOrder").val((data.minOrder == "Unlimited") ? "" : data.minOrder);
        $("#tourismPricingMaxOrder").val((data.maxOrder == "Unlimited") ? "" : data.maxOrder);
        $("#tourismPricingStartDate").val("");
        $("#tourismPricingEndDate").val("");
        if (data.startDate) {
            $("#tourismPricingStartDate").val(data.startDate);
            $("#tourismPricingEndDate").datepicker("option", "minDate", data.startDate);
        }
        if (data.stopDate) {
            $("#tourismPricingEndDate").val(data.stopDate);
            $("#tourismPricingStartDate").datepicker("option", "maxDate", data.stopDate);
        }
        if(data.xprivate){
            $("#tourismPricingPrivate").prop('checked', true);
        }
        if(data.stockUnlimited){
            $("#tourismPricingTicketStock").val("");
            $("#tourismPricingTicketStock").attr('disabled', 'disabled');
            $("#tourismPricingStockUnlimited").prop('checked', true);
        }
        if(data.stockOutSelling){
            $("#tourismPricingStockOutSelling").prop('checked', true);
        }
        tourismPricingInitUploadForm(ticketId, hasResource);
        tourismPricingTranslationDrawAll(ticketId);
    }
}

function tourismPricingGetDataRowByTicketId(ticketId) {
    var data = tourismPricingGridObject.getData();
    for ( var i = 0; i < data.length; i++) {
        if (data[i].ticketId == ticketId)
            return data[i];
    }
    return null; // should never happen
}

function tourismPricingValidateForm() {
    var valid = false;
    var variationValuesValid = true;
    for(var i = 1; i <= 3; i++){
        if(!$('#tourismPricingVariation' + i).multiselect('isDisabled') && (!$('#tourismPricingVariation' + i).val() || $('#tourismPricingVariation' + i).val() == ""))
            variationValuesValid = false;
    }
    if ($('#tourismPricingSKU').val() == ''
        || $('#tourismPricingTicketType').val() == ''
        || $('#tourismPricingMinOrder').val() == ''
        || ($('#tourismPricingTicketStock').val() == '' && !$('#tourismPricingStockUnlimited').is(':checked'))
        || !variationValuesValid) {
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : 'error'
        });
    } else if (!$('input#tourismPricingAvailabilityDate')[0].checkValidity()) {
        $('#tourismPricingAvailabilityDate').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
    } else if (($('#tourismPricingTicketType').val() != "")
        && (!$('input#tourismPricingTicketType')[0].checkValidity())) {
        $('#tourismPricingTicketType').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
    } else if (!$('input#tourismPricingTicketPrice')[0].checkValidity()) {
        $('#tourismPricingTicketPrice').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
    } else if (($('#tourismPricingTicketStock').val() != "")
        && (!$('input#tourismPricingTicketStock')[0].checkValidity())) {
        $('#tourismPricingTicketStock').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
    } else if (!$('input#tourismPricingMinOrder')[0].checkValidity()) {
        $('#tourismPricingMinOrder').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
    } else if ($('#tourismPricingMaxOrder').val() != ""
        && !$('input#tourismPricingMaxOrder')[0].checkValidity()) {
        $('#tourismPricingMaxOrder').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
    } else if (($('#tourismPricingMaxOrder').val() != "")
        && (parseInt($('#tourismPricingMaxOrder').val()) < parseInt($(
            '#tourismPricingMinOrder').val()))) {
        $('#tourismPricingMaxOrder').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : tourismPricingErrors_maxMustBeGreaterThanMin_label,
            stay : false,
            type : 'error'
        });
    } else if (($('#tourismPricingStartDate').val() != "")
        && (!$('input#tourismPricingStartDate')[0].checkValidity())) {
        $('#tourismPricingStartDate').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
    } else if (($('#tourismPricingEndDate').val() != "")
        && (!$('input#tourismPricingEndDate')[0].checkValidity())) {
        $('#tourismPricingEndDate').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
    } else {
        valid = true;
    }
    return valid;
}

function tourismPricingCreateTicketCombinaison(productId) {
    var stock = ($('#tourismPricingTicketStock').val() != '') ? $('#tourismPricingTicketStock').val() : '-1';
    var maxOrder = ($('#tourismPricingMaxOrder').val() != '') ? $('#tourismPricingMaxOrder').val() : '-1';
    var variation1 = ($("#tourismPricingVariation1").val() && $("#tourismPricingVariation1").val() != 'NONE') ? $("#tourismPricingVariation1").val() : '';
    var variation2 = ($("#tourismPricingVariation2").val() && $("#tourismPricingVariation2").val() != 'NONE') ? $("#tourismPricingVariation2").val() : '';
    var variation3 = ($("#tourismPricingVariation3").val() && $("#tourismPricingVariation3").val() != 'NONE') ? $("#tourismPricingVariation3").val() : '';
    var price = ($("#tourismPricingTicketPrice").val() != "") ? $("#tourismPricingTicketPrice").val(): $("#productMontant").val();
    var dataToSend = 'product.id=' + productId;
    dataToSend += '&ticketType.sku=' + $('#tourismPricingSKU').val();
    dataToSend += '&ticketType.name=' + $('#tourismPricingTicketType').val();
    dataToSend += '&variation1.id=' + variation1;
    dataToSend += '&variation2.id=' + variation2;
    dataToSend += '&variation3.id=' + variation3;
    dataToSend += '&ticketType.price=' + encodeURIComponent(parseInt(parseFloat(price) * 100));
    dataToSend += '&ticketType.stock=' + stock;
    dataToSend += '&ticketType.minOrder=' + $('#tourismPricingMinOrder').val();
    dataToSend += '&ticketType.maxOrder=' + maxOrder;
    if ($('#tourismPricingStartDate').val().length > 0)
        dataToSend += '&ticketType.startDate=' + $('#tourismPricingStartDate').val() + " 00:00";
    if ($('#tourismPricingEndDate').val().length > 0)
        dataToSend += '&ticketType.stopDate=' + $('#tourismPricingEndDate').val() + " 00:00";
    if ($('#tourismPricingAvailabilityDate').val().length > 0)
        dataToSend += '&ticketType.availabilityDate=' + $('#tourismPricingAvailabilityDate').val() + " 00:00";
    dataToSend += "&ticketType.stockOutSelling=" + $('#tourismPricingStockOutSelling').is(':checked');
    dataToSend += "&ticketType.stockUnlimited=" + $('#tourismPricingStockUnlimited').is(':checked');
    dataToSend += "&ticketType.xprivate=" + $('#tourismPricingPrivate').is(':checked');
    dataToSend += '&format=json';

    $.ajax({
        url : createTicketTypeURL + "?" + dataToSend,
        type : "POST",
        noticeType : "POST",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $('#tourismPricingCreateDialog').dialog("close");
            tourismPricingLoadPricings(productId);
        },
        error : function(response, status) {
            if (response.status == '404') {
                $('#tourismPricingTicketType').focus();
                jQuery.noticeAdd({
                    stayTime : 2000,
                    text : tourismPricingErrors_ticketTypeUniqueLabel,
                    stay : false,
                    type : 'error'
                });
            }
        }
    });
}

function tourismPricingUpdateTicketCombinaison(productId, ticketId) {
    var stock = ($('#tourismPricingTicketStock').val() != '') ? $('#tourismPricingTicketStock').val() : '-1';
    var maxOrder = ($('#tourismPricingMaxOrder').val() != '') ? $('#tourismPricingMaxOrder').val() : '-1';
    var variation1 = ($("#tourismPricingVariation1").val() && $("#tourismPricingVariation1").val() != 'NONE') ? $("#tourismPricingVariation1").val() : '';
    var variation2 = ($("#tourismPricingVariation2").val() && $("#tourismPricingVariation2").val() != 'NONE') ? $("#tourismPricingVariation2").val() : '';
    var variation3 = ($("#tourismPricingVariation3").val() && $("#tourismPricingVariation3").val() != 'NONE') ? $("#tourismPricingVariation3").val() : '';
    var price = ($("#tourismPricingTicketPrice").val() != "") ? $("#tourismPricingTicketPrice").val(): $("#productMontant").val();
    var dataToSend = 'product.id=' + productId;
    dataToSend += '&ticketType.id=' + ticketId;
    dataToSend += '&ticketType.sku=' + $('#tourismPricingSKU').val();
    dataToSend += '&ticketType.name=' + $('#tourismPricingTicketType').val();
    dataToSend += '&variation1.id=' + variation1;
    dataToSend += '&variation2.id=' + variation2;
    dataToSend += '&variation3.id=' + variation3;
    dataToSend += '&ticketType.price=' + encodeURIComponent(parseInt(parseFloat(price) * 100));
    dataToSend += '&ticketType.stock=' + stock;
    dataToSend += '&ticketType.minOrder=' + $('#tourismPricingMinOrder').val();
    dataToSend += '&ticketType.maxOrder=' + maxOrder;
    if ($('#tourismPricingStartDate').val().length > 0)
        dataToSend += '&ticketType.startDate=' + $('#tourismPricingStartDate').val() + " 00:00";
    if ($('#tourismPricingEndDate').val().length > 0)
        dataToSend += '&ticketType.stopDate=' + $('#tourismPricingEndDate').val() + " 00:00";
    if ($('#tourismPricingAvailabilityDate').val().length > 0)
        dataToSend += '&ticketType.availabilityDate=' + $('#tourismPricingAvailabilityDate').val() + " 00:00";
    dataToSend += "&ticketType.stockOutSelling=" + $('#tourismPricingStockOutSelling').is(':checked');
    dataToSend += "&ticketType.stockUnlimited=" + $('#tourismPricingStockUnlimited').is(':checked');
    dataToSend += "&ticketType.xprivate=" + $('#tourismPricingPrivate').is(':checked');
    dataToSend += '&format=json';

    $.ajax({
        url : updateTicketTypeURL + "?" + dataToSend,
        type : "POST",
        data : "",
        hideNotice : true,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if (response.stockError) {
                jQuery.noticeAdd({
                    stayTime : 2000,
                    text : tourismPricingErrors_insufficientStockLabel,
                    stay : false,
                    type : 'error'
                });
                return;
            }
            jQuery.noticeAdd({
                stayTime : 1000,
                text : 'Updating asset on the server',
                stay : false,
                type : 'success'
            });
            $('#tourismPricingCreateDialog').dialog("close");
            tourismPricingLoadPricings(productId);
        },
        error : function(response, status) {
            if (response.status == '404') {
                $('#tourismPricingTicketType').focus();
                jQuery.noticeAdd({
                    stayTime : 2000,
                    text : tourismPricingErrors_ticketTypeUniqueLabel,
                    stay : false,
                    type : 'error'
                });
            }
        }
    });
}

function tourismPricingDeleteTicketCombinaison(productId, ticketId) {
    var dataToSend = 'product.id=' + productId;
    dataToSend += '&ticketType.id=' + ticketId;
    dataToSend += '&format=json';

    $.ajax({
        url : deleteTicketTypeURL + "?" + dataToSend,
        type : "POST",
        noticeType : "DELETE",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $('#tourismPricingCreateDialog').dialog("close");
            tourismPricingLoadPricings(productId);
        },
        error : function(response, status) {
            if (response.status == "401") {
                jQuery.noticeAdd({
                    stayTime : 2000,
                    text : tourismPricingErrors_deleteSold_label,
                    stay : false,
                    type : "error"
                });
            }
        }
    });
}

function tourismPricingUpdateFreeProductLabel() {
    if (parseInt(parseFloat($('#productMontant').val())) == 0)
        $('#productFree').text(productFreePriceLabel);
    else
        $('#productFree').text("");
}

// Resources

function tourismPricingCheckTicketResource(productId, ticketId){
    $.ajax({
        url : tourismPricingHasResourceUrl + "/" + ticketId,
        type : "GET",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var hasResource = (response == true);
            tourismPricingLoadTicketTypes(productId, ticketId, false, hasResource)
        }
    });
}

function tourismPricingInitUploadForm(ticketId, hasResource) {
    $("#tourismPricingUploading").hide();
    if(hasResource){
        $("#tourismPricingDownloadForm").show();
    }
    else{
        $("#tourismPricingDownloadForm").hide();
    }
    $("#tourismPricingDownloadResource").unbind().bind("click", function(){tourismPricingDisplayResource(ticketId)});
    $("#tourismPricingDeleteResource").unbind().bind("click", function(){tourismPricingDeleteResource(ticketId)});

    var filesUpload = document.getElementById("tourismPricingDownloadFile");
    filesUpload.addEventListener("change", function() {
        document.getElementById('tourismPricingUploadForm').target = "tourismPricingDownloadHiddenFrame";
        document.getElementById('tourismPricingUploadForm').action = tourismPricingSaveResourceUrl + "/" + ticketId;
        $("#tourismPricingDownloadForm").hide();
        $("#tourismPricingUploadForm").hide();
        $("#tourismPricingUploading").show();
        document.getElementById('tourismPricingUploadForm').submit();
        document.getElementById('tourismPricingDownloadHiddenFrame').onload = function() {
            document.getElementById('tourismPricingDownloadHiddenFrame').onload = function() {};
            $("#tourismPricingUploading").hide();
            $("#tourismPricingDownloadForm").show();
            $("#tourismPricingUploadForm").show();
            document.getElementById("tourismPricingUploadForm").reset();
        }
    }, false);
}

function tourismPricingDisplayResource(ticketId){
    window.open(tourismPricingGetResourceUrl + "/" + ticketId, "_blank");
}

function tourismPricingDeleteResource(ticketId){
    $.ajax({
        url : tourismPricingDeleteResourceUrl + "/" + ticketId,
        type : "DELETE",
        noticeType : "DELETE",
        data : "",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#tourismPricingDownloadForm").hide();
            $("#tourismPricingUploading").hide();
        },
        error : function(response, status) {
            var message = tourismPricingResourceUnauthorizedError;
            if(response.status == "404")
                message = tourismPricingResourceNotFoundError;
            jQuery.noticeAdd({
                stayTime : 2000,
                text : message,
                stay : false,
                type : 'error'
            });
        }
    });
}

//TRANSLATION

var tourismPricingTranslationGrid = null;

function tourismPricingTranslationDrawAll(ticketId){
    tourismPricingTranslationGrid = null;
    var successCallback = function (response){
        var fields = ["name"];
        $("#tourismPricingTranslationAddLink").unbind();
        $("#tourismPricingTranslationAddLink").bind("click", function(){
            var defaultsData = {name: $("#tourismPricingTicketType").val()};
            translationGetCreatePage("ticketType", ticketId, fields, defaultsData);
        });
        var columns = [{field: "name", title: translationNameGridLabel}];
        var data = [];
        for (var i = 0; i < response.length; i++) {
            var value = eval( "(" + response[i].value + ")" );
            data[data.length] = {
                "id" : response[i].id,
                "targetId": ticketId,
                "translationType": "ticketType",
                "lang": response[i].lang,
                "type": response[i].type,
                "name": value.name
            }
        }
        var tabVisible = $("#tourismPricingTranslationDiv").is(":visible");
        if(! tabVisible)
            $("#tourismPricingTranslationDiv").show();

        tourismPricingTranslationGrid = translationGetGrid("tourismPricingTranslationGrid", ticketId, fields, columns, data);

        if(! tabVisible)
            $("#tourismPricingTranslationDiv").hide();
        $("#categoriesMain").hideLoading();
    }
    translationGetAllData(ticketId, successCallback);
}
