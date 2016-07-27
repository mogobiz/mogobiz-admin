var companyAvailableTags = [];
var firstTimeMap = true;
var selectedProductCategoryId = null;
var tourismProductPublishable = false;

function productAutoUpdateField(productId, objId, objProperty, blankOK, checkValidity) {
    $(objId).unbind();
    $(objId).change(function() {
        productDoUpdateField(productId, objId, objProperty, blankOK, checkValidity);
    });
}

function productDoUpdateField(productId, objId, objProperty, blankOK, checkValidity) {
    if (!blankOK && $(objId).val().length == 0) {
        $(objId).focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : "error"
        });
    }
    else if(checkValidity && !$(objId)[0].checkValidity()){
        $(objId).focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : "error"
        });
    }
    else {
        var dataToSend = "product.id=" + productId;
        dataToSend += "&" + objProperty + "=" + encodeURIComponent($(objId).val());
        dataToSend += "&format=json";
        $.ajax( {
            url : updateProductUrl,
            type : "POST",
            noticeType : "PUT",
            data : dataToSend,
            dataType : "json",
            cache : false,
            async : true,
            success : function(response, status) {
                var productName = response.data.name;
                if (productName.length > 100) {
                    productName = productName.substring(0, 100) + "...";
                }
                var productType = "";
                if(response.data.xtype){
                    productType = " (" + response.data.xtype.name.substring(0, 1).toUpperCase() + response.data.xtype.name.substring(1).toLowerCase() + ")";
                }
                $("#productLabel").text(productName + productType);
            }
        });
    }
}

function productAttachEditForm(productId, fromPage) {
    loadDefaultCurrency();
    var dataToSend = "id=" + productId + "&format=json";
    $.ajax({
        url : showProductUrl + "?" + dataToSend,
        type : "GET",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var product = response;
            selectedProductCategoryId = product.category.id;
            tourismProductPublishable = product.publishable == true;
            tourismSuggestionsFirstVisit = true;
            tourismPropertiesFirstVisit = true;

// Main Controls
            clear_form_elements("#formCreerProd");
            clear_form_elements("#poiLocationForm");
            clear_form_elements("#poiInfoForm");

            $("#editProductTabs").detach().appendTo('#items');

            $('#closeBtn').click(function() {
                firstTimeMap = true;
                $('#editProductTabs').remove();
                if(fromPage == "category"){
                    $('#items').hide();
                    $('#categoriesMain').show();
                    $("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
                    setTimeout(function(){
                        categoryProductsDrawAll(0);
                    }, 150);
                }
                else if(fromPage == "catalog"){
                    $("#catalogProductsDiv").show();
                    $("#items").showLoading({"addClass": "loading-indicator-FacebookBig"});
                    catalogProductsSearchProducts();
                }
            });

            $('#deleteBtn').click(function() {
                tourismProductMarkAsDeleted(productId);
            });

            $('#tourismProperties').hide();
            $('#featuresInfo').hide();
            $('#tourismPricing').hide();
            $('#calendarDiv').hide();
            $('#geoloc').hide();
            $('#tourismSuggestions').hide();
            $('#tourismShipping').hide();
            $('#tourismTranslation').hide();
            $('#productTabs .tabs .selected').removeClass('selected');
            $('#infoTab').addClass('selected');
            $('#editProductTabs').show();

            // load product name label
            var productName = product.name;
            if (productName.length > 100) {
                productName = productName.substring(0, 100) + '...';
            }
            var productType = "";
            if(product.xtype){
                productType = " (" + product.xtype.name.substring(0, 1).toUpperCase() + product.xtype.name.substring(1).toLowerCase() + ")";
            }
            $('#productLabel').text(productName + productType);
            $("#productNbOfSales span").text(product.nbSales);

// Fill Description Tab Fields
            $.ajax({
                url : showVariationsUrl,
                type : "GET",
                data : "category.id=" + selectedProductCategoryId + "&format=json",
                dataType : "json",
                cache : false,
                async : true,
                success : function(ticketTypes, status) {
                    for ( var i = 0; i < ticketTypes.length; i++) {
                        var html = "<div class='spacer-small'>" +
                                        "<label for='tourismDescriptionVariation" +  ticketTypes[i].position + "' id='tourismDescriptionVariation" + ticketTypes[i].position + "Label'>&nbsp;</label>" +
                                    "</div>" +
                                    "<div class='spacer-small'>" +
                                        "<select id='tourismDescriptionVariation" +  ticketTypes[i].position + "' multiple='multiple' style='width: 100px;'></select>" +
                                   "</div>";
                        $("#tourismDescriptionVariations").append(html);
                        $("#tourismDescriptionVariation" + ticketTypes[i].position).attr("position", ticketTypes[i].position);
                        $("#tourismDescriptionVariation" + ticketTypes[i].position).multiselect({
                            header: false,
                            multiple: false,
                            selectedList : 1,
                            minWidth: 215
                        });
                        $("#tourismDescriptionVariation" + ticketTypes[i].position + "Label").html(ticketTypes[i].name);
                        $("#tourismDescriptionVariation" + ticketTypes[i].position).multiselect("uncheckAll");
                        $("#tourismDescriptionVariation" + ticketTypes[i].position).multiselect("enable");
                        var options = document.getElementById("tourismDescriptionVariation" + ticketTypes[i].position).options;
                        options.length = 0;
                        options[options.length] = new Option("ALL", "ALL", "selected");
                        for ( var j = 0; j < ticketTypes[i].variationValues.length; j++) {
                            options[options.length] = new Option(
                                ticketTypes[i].variationValues[j].value,
                                ticketTypes[i].variationValues[j].id);
                        }
                        $("#tourismDescriptionVariation" + ticketTypes[i].position).multiselect("refresh");
                        $("#tourismDescriptionVariations .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_tourismDescriptionVariation" + ticketTypes[i].position + "']")
                            .each(function() {
                                if (this.value == "ALL") {
                                    this.click();
                                }
                            });

                        var input = "<input id='tourismDescriptionVariationValue" + ticketTypes[i].position + "' type='hidden'>";
                        $("#uploadInput").append(input);

                        $("#tourismDescriptionVariation" + ticketTypes[i].position).bind("multiselectclick", function(event, ui) {
                            if(ui.value != "ALL") {
                                $("#tourismDescriptionVariationValue" + $(this).attr("position")).attr("value", ui.value);
                                $("#tourismDescriptionVariationValue" + $(this).attr("position")).attr("name", "variation" + $(this).attr("position") + ".id");
                            }
                            else{
                                $("#tourismDescriptionVariationValue" + $(this).attr("position")).removeAttr("value");
                                $("#tourismDescriptionVariationValue" + $(this).attr("position")).removeAttr("name");
                            }
                        });
                    }
                }
            });
            var availabilityDate = "";
            if(product.availabilityDate != null)
                availabilityDate = product.availabilityDate.split(" ")[0];
            $('#productId').val(product.id);
            $('#productType').val(product.xtype.name);
            $('#productName').val(product.name);
            $('#productSKU').val(product.code);
            $('#productExternalCode').val(product.externalCode);
            $('#productKeywords').val(product.keywords);
            $("#productAvailabilityDate").val(availabilityDate);
            $('#productDescription').val(product.description);
            if(product.publishable)
                $("#tourismProductAddToMarketPlace").prop("checked", true);
            else
                $("#tourismProductAddToMarketPlace").prop("checked", false);


            if(product.state.name == "INACTIVE")
                $("#tourismCalendarValidityPeriod").prop("checked", false);
            else
                $("#tourismCalendarValidityPeriod").prop("checked", true);

            categoriesLoad(product);
            brandLoad(product);
            tourismProductGetAllTags(productId);
            $("#productDescriptionTextDiv").html($('#productDescription').val());
            tourismProductLoadAllPictureForCaroussel(productId);
            tourismProductLoadAllIBeacons(productId, product.ibeacon);

// Init Description Tab Events
            productAutoUpdateField(productId, '#productName', 'product.name', false, false);
            productAutoUpdateField(productId, '#productExternalCode', 'product.externalCode', true, false);
            productAutoUpdateField(productId, '#productKeywords', 'product.keywords', true, false);
            productAutoUpdateField(productId, '#productAvailabilityDate', 'product.availabilityDate', true, true);

            $("#productCategories").bind("multiselectclick", function(event, ui) {
                if(categoriesClickFromCategoriesLoad)
                    return;
                var dataToSend = "product.id=" + productId;
                dataToSend += "&product.category.id=" + ui.value;
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

            $("#productAvailabilityDate").datepicker("destroy");
            $("#productAvailabilityDate").datepicker({
                dateFormat: 'dd/mm/yy',
                minDate: new Date(),
                changeMonth: true,
                changeYear: true,
                firstDay: 1
            });

            $('#brandLink').unbind();
            $("#brandLink").click(function() {
                brandPageDisplay();
            });
            $("#productBrand").bind("multiselectclick", function(event, ui) {
                if(brandClickFromBrandLoad)
                    return;
                var dataToSend = "product.id=" + productId;
                dataToSend += "&product.brand.id=" + ui.value;
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

            $("#productDescriptionTextDiv").unbind();
            $("#productDescriptionTextDiv").click(function(){
                tourismDescriptionPageDisplay(productId, $('#productDescription').val());
            });
            productUploadFileSetup(productId);

            $('#tourismCalendarValidityPeriod').unbind();
            $('#tourismCalendarValidityPeriod').change(function() {
                var status = (($(this).is(':checked')) ? "ACTIVE" :"INACTIVE");
                updateEventStatus(productId,status);
            });


            $('#tourismProductAddToMarketPlace').unbind();
            if(categorySelectedPublishable && catalogSelectedReadOnly) {
                $('#tourismProductAddToMarketPlace').removeAttr("disabled").change(function () {
                    var dataToSend = "product.id=" + productId + "&product.publishable=" + $(this).is(':checked') + "&format=json";
                    $.ajax({
                        url : updateProductUrl,
                        type : "POST",
                        noticeType : "PUT",
                        data : dataToSend,
                        dataType : "json",
                        cache : false,
                        async : true,
                        success : function(response, status) {
                            tourismProductPublishable = $('#tourismProductAddToMarketPlace').is(':checked');
                        }
                    });
                });
            }
            else{
                $('#tourismProductAddToMarketPlace').attr("disabled", "disabled");
            }

// Fill Pricing Tab Fields
            $("#productTaxRate").empty().multiselect("destroy");
            $("#productTaxRate").unbind().multiselect({
                header : false,
                multiple : false,
                noneSelectedText : multiselectNoneSelectedTextLabel,
                minWidth : 130,
                selectedList : 1
            });
            tourismProductLoadTaxList(product);
            if (product.stockDisplay) {
                $('#globalstockDisplay').prop("checked", true);
            }
            else {
                $('#globalstockDisplay').prop("checked", false);
            }

// Fill Calendar Tab Fields
            $('#calendarType').multiselect({
                header: false,
                multiple: false,
                noneSelectedText : calendarComboTicketValidityTitle,
                selectedList: 1
            });
            if (!product.calendarType || product.calendarType.name=='NO_DATE') {
                $('#calendarType').find('option[value="NO_DATE"]').attr('selected','selected');
                $("#calendarType").multiselect('refresh');
                $('#calendarDiv .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_calendarType"]').each(function() {
                    if(this.value == 'NO_DATE') {
                        this.click();
                    }
                });
            }
            else if (product.calendarType.name=='DATE_ONLY') {
                $('#calendarType').find('option[value="DATE_ONLY"]').attr('selected','selected');
                $("#calendarType").multiselect('refresh');
                $('#calendarDiv .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_calendarType"]').each(function() {
                    if(this.value == 'DATE_ONLY') {
                        this.click();
                    }
                });
            }
            else if (product.calendarType.name=='DATE_TIME') {
                $('#calendarType').find('option[value="DATE_TIME"]').attr('selected','selected');
                $("#calendarType").multiselect('refresh');
                $('#calendarDiv .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_calendarType"]').each(function() {
                    if(this.value == 'DATE_TIME') {
                        this.click();
                    }
                });
            }

            if(product.startFeatureDate == null && product.stopFeatureDate == null){
                $('#validityPeriodfeatured').val('notnowfeatured');
            }
            else if(product.startFeatureDate.indexOf('01/01/2012') >= 0 && product.stopFeatureDate.indexOf('31/12/2049') >= 0){
                $('#validityPeriodfeatured').val('alwaysfeatured');
            }
            else{
                $('#validityPeriodfeatured').val('periodfeatured');
                var startFeatureDate = product.startFeatureDate.split(' ')[0];
                var stopFeatureDate = product.stopFeatureDate.split(' ')[0];
                var startDate = new Date(startFeatureDate.split("/")[2], parseInt(parseFloat(startFeatureDate.split("/")[1])) - 1, startFeatureDate.split("/")[0]);
                var stopDate = new Date(stopFeatureDate.split("/")[2], parseInt(parseFloat(stopFeatureDate.split("/")[1])) - 1, stopFeatureDate.split("/")[0]);
                $('#productStartDatefeatured').val(startFeatureDate);
                $('#productStopDatefeatured').val(stopFeatureDate);
                $('#productStartDatefeatured').datepicker("option", "maxDate", stopDate);
                $('#productStopDatefeatured').datepicker("option", "minDate", startDate);
            }
            selectValidityPeriodFeatured();

// Init Calendar Tab Events
            $("#calendarType").bind("multiselectclick", function(event, ui) {
                if (ui.value != "NO_DATE" && tourismCalendarGridObject.getDataLength() == 0) {
                    jQuery.noticeAdd({
                        stayTime : 2000,
                        text : "You must add a period",
                        stay : false,
                        type : 'error'
                    });
                }
                else {
                    var dataToSend = "product.id=" + productId;
                    dataToSend += "&product.calendarType="+ui.value;
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
                            if(response.success){
                            }
                        }
                    });
                }
            });

            $('#validityPeriodfeatured').unbind();
            $('#validityPeriodfeatured').change(function() {
                productValidityPeriodFeaturedChanged(productId);
                selectValidityPeriodFeatured();
            });

            var datesFeature = $("#productStartDatefeatured, #productStopDatefeatured").datepicker({
                dateFormat : 'dd/mm/yy',
                minDate : new Date(),
                changeMonth : true,
                changeYear : true,
                onClose : function(selectedDate) {
                    productValidityPeriodFeaturedChanged(productId);
                    var option = this.id == "productStartDatefeatured" ? "minDate" : "maxDate",
                        instance = $(this).data("datepicker"),
                        Date = $.datepicker.parseDate(
                                instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
                    datesFeature.not(this).datepicker("option", option, selectedDate);
                }
            }).keydown(function(){
                return false;
            });

// Init POI Tab Events
            $('#createPoiLabel').unbind();
            $('#createPoiLabel').click(function() {
                showCreatePoiDialog();
            });

// Fill Shipping Tab Fields
            $("#tourismShippingAmount").attr("pattern", "\\d+\\.?\\d{0," + defaultCurrency.fractionDigits + "}");
            $("#tourismShippingCurrencyCode").html(defaultCurrency.currencyCode);
            var shipping = product.shipping;
            if(shipping){
                var weight = (shipping.weight && shipping.weight != "0") ? shipping.weight : "";
                var width = (shipping.width && shipping.width != "0") ? shipping.width : "";
                var height = (shipping.height && shipping.height != "0") ? shipping.height : "";
                var depth = (shipping.depth && shipping.depth != "0") ? shipping.depth : "";
                var amount = (shipping.amount && shipping.amount != "0") ? (shipping.amount / Math.pow(10, defaultCurrency.fractionDigits)).toFixed(defaultCurrency.fractionDigits) : "";

                $("#tourismShippingWeight").val(weight);
                $("#tourismShippingWidth").val(width);
                $("#tourismShippingHeight").val(height);
                $("#tourismShippingDepth").val(depth);
                $("#tourismShippingAmount").val(amount);
                $("#tourismShippingWeightUnit").val(shipping.weightUnit.name);
                $("#tourismShippingLinearUnit").val(shipping.linearUnit.name);
                $("#tourismShippingFree").prop("checked", shipping.free);
            }
// Init Shipping Tab Events
            $("#tourismShippingWeight, #tourismShippingWidth, #tourismShippingHeight, #tourismShippingDepth, #tourismShippingAmount, #tourismShippingFree").unbind();
            $("#tourismShippingWeightUnit, #tourismShippingLinearUnit").unbind().multiselect("destroy");
            $("#tourismShippingWeightUnit").multiselect({
                header : false,
                multiple : false,
                noneSelectedText : multiselectNoneSelectedTextLabel,
                minWidth : 348,
                selectedList : 1
            });

            $("#tourismShippingLinearUnit").multiselect({
                header : false,
                multiple : false,
                noneSelectedText : multiselectNoneSelectedTextLabel,
                minWidth : 348,
                selectedList : 1
            });

            if(product.xtype.name == "PRODUCT"){
                $("#tourismShippingWeight, #tourismShippingWidth, #tourismShippingHeight, #tourismShippingDepth, #tourismShippingAmount, #tourismShippingFree").change(function(){
                    if(tourismProductValidateShipping())
                        tourismProductUpdateShipping(productId, "", "");
                });

                $("#tourismShippingWeightUnit option").each(function() {
                    if(this.value == $("#tourismShippingWeightUnit").val())
                        $(this).attr("selected", "selected");
                    else
                        $(this).removeAttr("selected");
                });
                $("#tourismShippingWeightUnit").multiselect("refresh");
                $("#tourismShipping .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_tourismShippingWeightUnit']").each(function() {
                    if (this.value == $("#tourismShippingWeightUnit").val()) {
                        this.click();
                    }
                });
                $("#tourismShippingWeightUnit").bind("multiselectclick", function(event, ui) {tourismProductUpdateShipping(productId, "weightUnit", ui.value);});

                $("#tourismShippingLinearUnit option").each(function() {
                    if(this.value == $("#tourismShippingLinearUnit").val())
                        $(this).attr("selected", "selected");
                    else
                        $(this).removeAttr("selected");
                });
                $("#tourismShippingLinearUnit").multiselect("refresh");
                $("#tourismShipping .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_tourismShippingLinearUnit']").each(function() {
                    if (this.value == $("#tourismShippingLinearUnit").val()) {
                        this.click();
                    }
                });
                $("#tourismShippingLinearUnit").bind("multiselectclick", function(event, ui) {tourismProductUpdateShipping(productId, "linearUnit", ui.value);});
            }

// Init Tabs Events
            $('#ulTabs').show();
            $('#productTabs .tabs a').click(function() {
                $('#productTabs .tabs .selected').removeClass('selected');
                $(this).addClass('selected');
                var selectedTabId = $(this).attr('id');
                switch(selectedTabId){
                    case 'infoTab':
                        $('#generalInfo').show();
                        $('#tourismProperties').hide();
                        $('#featuresInfo').hide();
                        $('#tourismPricing').hide();
                        $('#calendarDiv').hide();
                        $('#geoloc').hide();
                        $('#tourismSuggestions').hide();
                        $('#tourismShipping').hide();
                        $('#tourismTranslation').hide();
                        break;
                    case 'propertiesTab':
                        $('#generalInfo').hide();
                        $('#tourismProperties').show();
                        $('#featuresInfo').hide();
                        $('#tourismPricing').hide();
                        $('#calendarDiv').hide();
                        $('#geoloc').hide();
                        $('#tourismSuggestions').hide();
                        $('#tourismShipping').hide();
                        $('#tourismTranslation').hide();
                        if(tourismPropertiesFirstVisit) {
                            tourismPropertiesFirstVisit = false;
                            tourismPropertiesInit(product);
                        }
                        break;
                    case 'featuresTab':
                        $('#generalInfo').hide();
                        $('#tourismProperties').hide();
                        $('#featuresInfo').show();
                        $('#tourismPricing').hide();
                        $('#calendarDiv').hide();
                        $('#geoloc').hide();
                        $('#tourismSuggestions').hide();
                        $('#tourismShipping').hide();
                        $('#tourismTranslation').hide();
                        tourismFeaturesLoad(product.id);
                        break;
                    case 'pricingTab':
                        $('#generalInfo').hide();
                        $('#tourismProperties').hide();
                        $('#featuresInfo').hide();
                        $('#tourismPricing').show();
                        $('#calendarDiv').hide();
                        $('#geoloc').hide();
                        $('#tourismSuggestions').hide();
                        $('#tourismShipping').hide();
                        $('#tourismTranslation').hide();
                        tourismPricingLoadPricings(product.id);
                        break;
                    case 'calendarTab':
                        $('#generalInfo').hide();
                        $('#tourismProperties').hide();
                        $('#featuresInfo').hide();
                        $('#tourismPricing').hide();
                        $('#calendarDiv').show();
                        $('#geoloc').hide();
                        $('#tourismSuggestions').hide();
                        $('#tourismShipping').hide();
                        $('#tourismTranslation').hide();
                        tourismCalendarLoad(product.id);
                        break;
                    case 'geolocTab':
                        $('#generalInfo').hide();
                        $('#tourismProperties').hide();
                        $('#featuresInfo').hide();
                        $('#tourismPricing').hide();
                        $('#calendarDiv').hide();
                        $('#geoloc').show();
                        $('#tourismSuggestions').hide();
                        $('#tourismShipping').hide();
                        $('#tourismTranslation').hide();
                        if (firstTimeMap) {
                            if(sellerCompanyMapProvider == "OPEN_STREET_MAP")
                                showMap();
                            else
                                showGoogleMap();
                            getAllPois(product.id);
                            firstTimeMap = false;
                        }
                        break;
                    case 'suggestionsTab':
                        $('#generalInfo').hide();
                        $('#tourismProperties').hide();
                        $('#featuresInfo').hide();
                        $('#tourismPricing').hide();
                        $('#calendarDiv').hide();
                        $('#geoloc').hide();
                        $('#tourismSuggestions').show();
                        $('#tourismShipping').hide();
                        $('#tourismTranslation').hide();
                        if(tourismSuggestionsFirstVisit) {
                            tourismSuggestionsFirstVisit = false;
                            tourismSuggestionsInit(product.id);
                        }
                        break;
                    case 'shippingTab':
                        $('#generalInfo').hide();
                        $('#tourismProperties').hide();
                        $('#featuresInfo').hide();
                        $('#tourismPricing').hide();
                        $('#calendarDiv').hide();
                        $('#geoloc').hide();
                        $('#tourismSuggestions').hide();
                        $('#tourismShipping').show();
                        $('#tourismTranslation').hide();
                        break;
                    case 'traslationTab':
                        $('#generalInfo').hide();
                        $('#tourismProperties').hide();
                        $('#featuresInfo').hide();
                        $('#tourismPricing').hide();
                        $('#calendarDiv').hide();
                        $('#geoloc').hide();
                        $('#tourismSuggestions').hide();
                        $('#tourismShipping').hide();
                        $('#tourismTranslation').show();
                        tourismTranslationDrawAll(product.id);
                        break;
                    default:
                        break;
                }
            });
            if(product.xtype.name != "PRODUCT"){
                $("#shippingTab").unbind().hide();
            }
        }
    });
}

function selectValidityPeriodFeatured() {
    var selectedValue = $('#validityPeriodfeatured').val();

    if(selectedValue == 'periodfeatured') {
        $('#productStartDatefeatured').show();
        $('#productStartDatelabelfeatured').show();
        $('#productStopDatelabelfeatured').show();
        $('#productStopDatefeatured').show();
    }
    else if(selectedValue == 'alwaysfeatured') {
        $('#productStartDatefeatured').hide();
        $('#productStartDatelabelfeatured').hide();
        $('#productStopDatelabelfeatured').hide();
        $('#productStopDatefeatured').hide();
    }
    else if(selectedValue == 'notnowfeatured') {
        $('#productStartDatefeatured').hide();
        $('#productStartDatelabelfeatured').hide();
        $('#productStopDatelabelfeatured').hide();
        $('#productStopDatefeatured').hide();
    }
}

function productValidityPeriodFeaturedChanged(productId) {
    var selectedValue = $('#validityPeriodfeatured').val();
    var dataToSend = "product.id=" + productId;
    if (selectedValue == 'periodfeatured') {
        var stop = $('#productStopDatefeatured').val();
        var start = $('#productStartDatefeatured').val();
        if (!stop)
            stop = '31/12/2049';
        if (!start)
            start = '01/01/2012'
        dataToSend += "&product.startFeatureDate="+start+"&product.stopFeatureDate="+stop;
    }
    else if (selectedValue == 'alwaysfeatured') {
        dataToSend += "&product.startFeatureDate=01/01/2012&product.stopFeatureDate=31/12/2049";
    }
    else {
        dataToSend += "&product.startFeatureDate=&product.stopFeatureDate=";
    }
    dataToSend += "&format=json";
    $.ajax( {
        url : updateProductUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            // Do nothing
        }
    });
}

/**
 * @param productId
 * @param status
 * function used to change the status of the event
 */

function updateEventStatus(productId,status){
    var dataToSend = "product.id=" + productId;
    dataToSend += "&product.state.name=" + status;
    if (status == "ACTIVE") {
        dataToSend += "&social=true";
    }
    dataToSend += "&format=json";
    $.ajax( {
        url : updateProductUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            // Do nothing
        }
    });
}

function tourismProductLoadAllPictureForCaroussel(productId) {
    var allResources = [];
    var dataToSend = "product.id=" + productId;
    //dataToSend += "&resource.xtype=PICTURE";
    dataToSend += "&format=json";

    $.ajax({
        url : getProductPicturesUrl + '?' + dataToSend,
        type : "GET",
        data : '',
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var resources = response;
            $.each(resources, function(i, value) {
                var resource = {};
                resource.id = resources[i].id;
                resource.price = resources[i].price;
                resource.url = resources[i].resource.url;
                resource.name = resources[i].resource.name;
                resource.smallPicture = resources[i].resource.smallPicture;
                resource.description = resources[i].resource.description;
                resource.resId = resources[i].resource.id;
                resource.xtype = resources[i].resource.xtype.name.toLowerCase();
                allResources[allResources.length] = resource;
            });
            tourismProductRefreshGeneralCaroussel(productId, allResources)
        }
    });
}

function tourismProductLoadAllIBeacons(productId, iBeacon){
    var iBeaconId = "";
    if(iBeacon){
        iBeaconId = iBeacon.id;
    }
    $.ajax({
        url : companyShowIBeaconUrl,
        type : "GET",
        data : "format=json",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var options = "<option selected value='-1' style='color: #777; font-style: italic;'>None</option>";
            var iBeacons = response.list;
            if(iBeacons){
                for ( var i = 0; i < iBeacons.length; i++) {
                    var date = iBeacons[i].endDate.substring(0, 2);
                    var month = parseInt(parseFloat(iBeacons[i].endDate.substring(3, 5)) - 1);
                    var year = iBeacons[i].endDate.substring(6, 10);
                    var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).getTime();
                    var endDate = new Date(year, month, date, 0, 0, 0, 0).getTime();
                    var lastDate = new Date(2049, 11, 31, 0, 0, 0, 0).getTime();
                    var style = "color: black;";
                    if(!iBeacons[i].active || (lastDate != endDate && endDate < today)){
                        style = "color: red;";
                    }
                    options += "<option " + ((iBeaconId == iBeacons[i].id) ? "selected " : "") + "value='" + iBeacons[i].id + "' style='" + style + "'>" + iBeacons[i].name + "</option>";
                }
            }
            $("#productIBeacon").empty().html("" + options).unbind().change(function(){
                $(this).attr("style", $(this).find("option:selected").attr("style"));
                productDoUpdateField(productId, '#productIBeacon', 'product.ibeaconId', true, false);
            });
            $("#productIBeacon").attr("style", $("#productIBeacon").find("option:selected").attr("style"));
        }
    });
}

function tourismProductRefreshGeneralCaroussel(productId, resources) {
    var carouselPics = [];
    if (resources) {
        for ( var i = 0; i < resources.length; i++) {
            var res = new Object();
            var resource = resources[i];
            res.id = resource.resId;
            var title = resource.name;
            if(title.indexOf("__") == 0 && title.lastIndexOf("__") == title.length - 2){
                var idsStr = title.substring(2, title.length - 2);

                var ids = [];
                if(idsStr.indexOf("_") > 0)
                    var ids = idsStr.split("_");
                else
                    ids[0] = idsStr;
                for(var j = 0; j < ids.length; j++)
                    title = title + ", " + ids[j];
            }
            switch(resource.xtype){
                case 'picture':
                    res.content = "<div class='slide_inner'>" +
                        "<a rel='fancyboxpackres' type = 'image' class='photo_link' title='" + title + "' href='" + resource.url + "'>" +
                        "<img title='" + title + "' src='" + resource.url + "/SMALL" + "' class='photo'/>" +
                        "</a>" +
                        "</div>";
                    res.content_button = "<div class='thumb'><a class='photo_link'><img src='" + resource.url + "' alt=''/></a></div>";
                    break;
                case 'video':
                    res.content = "<div class='slide_inner'>" +
                        "<a rel='fancyboxpackres' type = 'video' class='photo_link' title='" + title + "' href='" + resource.url + "'>" +
                        "<img src='../images/fancybox-video-240x180.png' title='" + title + "'/></a>" +
                        "</a>" +
                        "</div>";
                    res.content_button = "<div class='thumb'><a class='photo_link'><img src='" + resource.url + "' alt=''/></a></div>";
                    break;
                case 'audio':
                    res.content = "<div class='slide_inner'>" +
                        "<a rel='fancyboxpackres' type = 'audio' class='photo_link' title='" + title + "' href='" + resource.url + "'>" +
                        "<img src='../images/fancybox-audio-240x180.png' title='" + title + "'/></a>" +
                        "</a>" +
                        "</div>";
                    res.content_button = "<div class='thumb'><a class='photo_link'><img src='" + resource.url + "' alt=''/></a></div>";
                    break;
                default:
                    break;
            }
            carouselPics[carouselPics.length] = res;
        }
        /*
         * CODE BELOW TO TEST VIDEO AND AUDIO EMBEDDING*/
//		var res = new Object();
//		res.id = 222222;
//		res.content = "<div class='slide_inner'>" +
//				"<a rel='fancyboxpackres' type = 'video' class='photo_link' title='movie' href='http://www.w3schools.com/html5/movie.mp4'>" +
//					"<img src='../images/video.png' style='width:240px;height:180px;max-height:240px;max-width:240px;' title=" + resource.name + "/></a>" +
//				"</a>" +
//			"</div>";
//		res.content_button = "<div class='thumb'><a class='photo_link'><img src='' alt=''/></a></div>";
//		carouselPics[carouselPics.length] = res;
//
//		res = new Object();
//		res.id = 333333;
//		res.content = "<div class='slide_inner'>" +
//				"<a rel='fancyboxpackres' type = 'audio' class='photo_link' title='movie' href='http://www.w3schools.com/html5/song.mp3'>" +
//					"<img src='../images/audio.png' style='width:auto;height:auto;max-height:240px;max-width:240px;' title='song.mp3'/></a>" +
//				"</a>" +
//			"</div>";
//		res.content_button = "<div class='thumb'><a class='photo_link'><img src='' alt=''/></a></div>";
//		carouselPics[carouselPics.length] = res;
    }

    $("#flavor_div").agile_carousel({
        // req info for the agile_carousel
        carousel_data : carouselPics,
        carousel_outer_height : 180,
        carousel_height : 150,
        slide_height: 150,
        carousel_outer_width : 240,
        slide_width : 80,
        // end req
        transition_type : "fade",
        transition_time : 2000,
        timer : 5000,
        continuous_scrolling : true,
        control_set_1 : "previous_button,numbered_buttons,next_button"
    });

    $("a[rel=fancyboxpackres]").fancybox({
        'transitionIn' : 'elastic',
        'transitionOut' : 'elastic',
        'titlePosition' : 'inside',
        'titleFormat' : function(title, currentArray, currentIndex, currentOpts) {
            var resId = carouselPics[currentIndex].id;
            return '<span id="fancybox-title-inside">Image ' + (currentIndex + 1) + ' / ' + currentArray.length
                + (title.length ? ' &nbsp; ' + title : '') + '</span>' +
                '<span style="float:right">[<a href="javascript:void(0);" onclick="javascript:productDeleteResource('+productId+','+resId+')">Delete</a>]</span>';
        }
    });

}

function productDeleteResource(productId, resourceId) {
    var dataToSend= "delete=true&product.id="+productId+"&resource.id="+resourceId;
    $.ajax({
        url : unbindProductPicturesUrl + "?" + dataToSend,
        type : "GET",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $.fancybox.close();
            tourismProductLoadAllPictureForCaroussel(productId);
        }
    });
}

function productUploadFileSetup(productId) {
    var filesUpload = document.getElementById("files-upload");
    filesUpload.addEventListener("change", function() {
        document.getElementById('formCreerProd').target = 'hidden-upload-frame'; // 'upload_target' is the name of the iframe
        document.getElementById('formCreerProd').action = uploadResourceUrl;
        $('#uploadInput')[0].style.display='none';
        $('#uploading')[0].style.display='block';
        document.getElementById('formCreerProd').submit();
        document.getElementById('hidden-upload-frame').onload = function() {
            tourismProductLoadAllPictureForCaroussel(productId);
            document.getElementById('hidden-upload-frame').onload = function() {};
            $('#uploadSuccess')[0].style.display='block';$('#uploading')[0].style.display='none';
            filesUpload.value = "";
        }
    }, false);
}

function tourismProductGetAllTags(productId){
    var dataToSend= "format=json&product.id=" + productId;
    $.ajax({
        url : getProductTagsUrl + "?" + dataToSend,
        type : "GET",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var tags = response;
            var tagsStr = "";
            $.each(tags, function(i, value) {
                tagsStr += tags[i].name + ',:,;';
            });
            $('#productTags').val(tagsStr);
            $('#productTags').tagsInput({
                height:'70px',
                onAddTag: tourismProductAddTag,
                onRemoveTag: tourismProductRemoveTag,
                //autocomplete_url:getCompanyTagsUrl+"?format=json",
                params: productId
            });
            tourismProductGetAllTagsByCompany();
        },
        error : function(error, status) {
            $('#productTags').tagsInput({
                height:'24px',
                onAddTag: tourismProductAddTag,
                onRemoveTag: tourismProductRemoveTag,
                //autocomplete_url:getCompanyTagsUrl+"?format=json",
                params: productId
            });
            tourismProductGetAllTagsByCompany();
        }
    });
}

function tourismProductGetAllTagsByCompany(){
    $.ajax({
        url : getCompanyTagsUrl+"?format=json",
        type : "GET",
        data : "",
        dataType : "",
        cache : false,
        async : true,
        success : function(response, status) {
            companyAvailableTags = response.split(',:,;');
            $('#productTags_tag').autocomplete({
                source: companyAvailableTags
            });
        }
    });
}

function tourismProductAddTag(value, productId){
    var dataToSend= "format=json&product.id=" + productId + "&tag.name=" + encodeURIComponent(value);
    $.ajax({
        url : addProductTagUrl + "?" + dataToSend,
        type : "POST",
        noticeType : "POST",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            tourismProductGetAllTagsByCompany();
        }
    });
}

function tourismProductRemoveTag(value, productId){
    var dataToSend= "format=json&product.id=" + productId + "&tag.name=" + encodeURIComponent(value);
    $.ajax({
        url : removeProductTagUrl + "?" + dataToSend,
        type : "GET",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            tourismProductGetAllTagsByCompany();
        }
    });
}

function tourismProductLoadTaxList(product){
    var dataToSend = "companyId=" + product.company.id + "&format=json";
    $.ajax({
        url : taxRateListUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var html = "";
            for(var i = 0; i < response.length; i++){
                html += '<option value="' + response[i].id + '">' + response[i].name + '</option>';
            }
            $("#productTaxRate").empty().html(html);
            $("#productTaxRate").multiselect("destroy");
            $("#productTaxRate").unbind().multiselect({
                header : false,
                multiple : false,
                noneSelectedText : multiselectNoneSelectedTextLabel,
                minWidth : 130,
                selectedList : 1
            });

            if(product.taxRateId) {
                $('#productTaxRate').multiselect('uncheckAll');
                $('#productTaxRate').find('option:contains(' + product.taxRateId + ')').attr('selected','selected');
                $("#productTaxRate").multiselect('refresh');
                $('#tourismPricing .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_productTaxRate"]').each(function() {
                    if(this.value == product.taxRateId) {
                        this.click();
                    }
                });
            }

            $("#productTaxRate").bind("multiselectclick", function(event, ui) {
                var dataToSend = "product.id=" + product.id;
                dataToSend += "&taxRateId=" + ui.value;
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
        },
        error: function(response, status){}
    });
}

function tourismProductValidateShipping(){
    if (!$('input#tourismShippingWeight')[0].checkValidity()) {
        $('#tourismShippingWeight').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
        return false;
    }
    if (!$('input#tourismShippingWidth')[0].checkValidity()) {
        $('#tourismShippingWidth').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
        return false;
    }
    if (!$('input#tourismShippingHeight')[0].checkValidity()) {
        $('#tourismShippingHeight').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
        return false;
    }
    if (!$('input#tourismShippingDepth')[0].checkValidity()) {
        $('#tourismShippingDepth').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
        return false;
    }
    if (!$('input#tourismShippingAmount')[0].checkValidity()) {
        $('#tourismShippingAmount').focus();
        jQuery.noticeAdd({
            stayTime: 2000,
            text: fieldsInvalidMessageLabel,
            stay: false,
            type: 'error'
        });
        return false;
    }
    return true;
}

function tourismProductUpdateShipping(productId, param, value){
    var weight = ($("#tourismShippingWeight").val() != "") ? $("#tourismShippingWeight").val() : 0;
    var width = ($("#tourismShippingWidth").val() != "") ? $("#tourismShippingWidth").val() : 0;
    var height = ($("#tourismShippingHeight").val() != "") ? $("#tourismShippingHeight").val() : 0;
    var depth = ($("#tourismShippingDepth").val() != "") ? $("#tourismShippingDepth").val() : 0;
    var amount = ($("#tourismShippingAmount").val() != "") ? encodeURIComponent(parseInt(parseFloat($("#tourismShippingAmount").val()) * Math.pow(10, defaultCurrency.fractionDigits))) : 0;

    var dataToSend = "product.id=" + productId;
    dataToSend += "&product.shipping.weight=" + weight;
    if(param == "weightUnit")
        dataToSend += "&product.shipping.weightUnit=" + value;
    else
        dataToSend += "&product.shipping.weightUnit=" + $("#tourismShippingWeightUnit").val();
    dataToSend += "&product.shipping.width=" + width;
    dataToSend += "&product.shipping.height=" + height;
    dataToSend += "&product.shipping.depth=" + depth;
    if(param == "linearUnit")
        dataToSend += "&product.shipping.linearUnit=" + value;
    else
        dataToSend += "&product.shipping.linearUnit=" + $("#tourismShippingLinearUnit").val();
    dataToSend += "&product.shipping.amount=" + amount;
    dataToSend += "&product.shipping.free=" + $("#tourismShippingFree").is(':checked');
    dataToSend += "&format=json";
    $.ajax( {
        url : updateProductUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {}
    });
}

function tourismProductMarkAsDeleted(productId){
    var dataToSend = "id=" + productId + "&format=json";
    $.ajax( {
        url : markDeletedProductUrl,
        type : "POST",
        noticeType : "DELETE",
        data : dataToSend,
        cache : false,
        async : true,
        success : function(response, status) {
            $('#editProductTabs').remove();
            $('#items').hide();
            $('#categoriesMain').show();
            $("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
            firstTimeMap = true;
            setTimeout(function(){
                categoryProductsDrawAll(0);
            }, 150);
        }
    });
}