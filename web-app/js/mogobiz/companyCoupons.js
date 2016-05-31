var companyCouponsGrid = null;
var companyCouponsCatalogsHtml = null;
var companyCouponsDescriptionCkeditor = null;

function companyCouponsDrawAll(){
    companyCouponsGrid = null;
    $.ajax({
        url : companyShowCouponsUrl,
        type : "GET",
        data : "format=json",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var gridColumns = [{
                id : "name",
                name : companyCouponsNameLabel,
                field : "name",
                width : 20,
                formatter : companyCouponsGridNameFormatter,
                cssClass : "cell-title"
            },{
                id : "code",
                name : companyCouponsCodeLabel,
                field : "code",
                width : 15,
                cssClass : ""
            },{
                id : "pastille",
                name : companyCouponsPastilleLabel,
                field : "pastille",
                width : 15,
                formatter : companyCouponsGridPastilleFormatter,
                cssClass : ""
            },{
                id : "numberOfUses",
                name : companyCouponsNumberOfUseLabel,
                field : "numberOfUses",
                width : 8,
                cssClass : ""
            },{
                id : "startDate",
                name : companyCouponsStartDateLabel,
                field : "startDate",
                width : 14,
                cssClass : ""
            },{
                id : "endDate",
                name : companyCouponsEndDateLabel,
                field : "endDate",
                width : 14,
                cssClass : ""
            },{
                id : "active",
                name : companyCouponsActiveLabel,
                field : "active",
                width : 7,
                formatter : companyCouponsGridActiveFormatter,
                cssClass : "cell-centered"
            },{
                id : "catalogWise",
                name : companyCouponsCatalogWiseLabel,
                field : "catalogWise",
                width : 7,
                formatter : companyCouponsGridCatalogWiseFormatter,
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
            var coupons = response.list;
            if(coupons){
                for ( var i = 0; i < coupons.length; i++) {
                    var pastille = coupons[i].pastille != null ? coupons[i].pastille : "";
                    if(!isNaN(pastille) && pastille != ""){
                        var sign = "";
                        if(isNaN(pastille.substring(0, 1))){
                            sign = pastille.substring(0, 1);
                            pastille = pastille.substring(1);
                        }
                        pastille = (pastille / Math.pow(10, defaultCurrency.fractionDigits)).toFixed(defaultCurrency.fractionDigits);
                        pastille = sign + pastille;
                    }
                    gridData[gridData.length] = {
                        "id" : i,
                        "couponId": coupons[i].id,
                        "name": coupons[i].name,
                        "code": coupons[i].code,
                        "pastille": pastille,
                        "startDate": coupons[i].startDate,
                        "endDate": coupons[i].endDate,
                        "numberOfUses": coupons[i].numberOfUses,
                        "active": coupons[i].active,
                        "catalogWise": coupons[i].catalogWise,
                        "catalogs": coupons[i].catalogs,
                        "description": coupons[i].description,
                        "categories": coupons[i].categories,
                        "products": coupons[i].products,
                        "skus": coupons[i].ticketTypes,
                        "anonymous": coupons[i].anonymous,
                        "rules": coupons[i].rules
                    }
                }
            }
            companyCouponsGrid = new Slick.Grid($("#couponsGrid"), gridData, gridColumns, gridOptions);

            companyCouponsGrid.setSelectionModel(new Slick.RowSelectionModel());
            companyCouponsGrid.invalidate();
        }
    });
}

function companyCouponsGridNameFormatter (row, cell, value, columnDef, dataContext){
    return "<a href='javascript:companyCouponsGetAllCatalogs(" + dataContext.couponId + ", " + false + ")'>" + value + "</a>";
}

function companyCouponsGridPastilleFormatter (row, cell, value, columnDef, dataContext){
    var pastille = value;
    if(!isNaN(pastille) && pastille != ""){
        var sign = "";
        if(isNaN(pastille.substring(0, 1))){
            sign = pastille.substring(0, 1);
            pastille = pastille.substring(1);
        }
        pastille = (pastille / Math.pow(10, defaultCurrency.fractionDigits)).toFixed(defaultCurrency.fractionDigits);
        pastille = sign + pastille;
    }
    return pastille;
}

function companyCouponsGridActiveFormatter(row, cell, value, columnDef, dataContext){
    var checkBox = "<input type='checkbox' disabled='disabled' style='margin-top:4px;'";
    checkBox += (value) ? "checked='checked'/>" : "/>";
    return checkBox;
}

function companyCouponsGridCatalogWiseFormatter(row, cell, value, columnDef, dataContext){
    var checkBox = "<input type='checkbox' disabled='disabled' style='margin-top:4px;'";
    checkBox += (value) ? "checked='checked'/>" : "/>";
    return checkBox;
}

function companyCouponsGetAllCatalogs(couponId, isCreate){
    $.ajax({
        url : showCatalogUrl,
        type : "GET",
        data : "format=json",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            companyCouponsCatalogsHtml = "";
            for(var i = 0; i < response.length; i++){
                companyCouponsCatalogsHtml += "<option value='" + response[i].id + "'>" + response[i].name + "</option>";
            }
            companyCouponsGetDetails(couponId, isCreate);
        },
        error : function(response, status) {}
    });
}

function companyCouponsGetDetails(couponId, isCreate){
    $.get(
        companyCouponsPageUrl,
        {},
        function(htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            companyCouponsPageSetup(htmlresponse, couponId, isCreate);
        },
        "html"
    );
}

function companyCouponsPageSetup(htmlresponse, couponId, isCreate){
    if ($("#companyCouponsDialog").dialog("isOpen") !== true) {
        $("#companyCouponsDialog").empty();
        $("#companyCouponsDialog").html(htmlresponse);
        $("#companyCouponsDialog").dialog({
            title : companyCouponsTitleLabel,
            modal : true,
            resizable : false,
            width : "auto",
            height : "auto",
            open : function(event) {
                companyCouponsPageInitControls(isCreate);
                companyCouponsPageInitFields(couponId, isCreate);
            },
            buttons : {
                cancelLabel : function() {
                    $("#companyCouponsDialog").dialog("close");
                },
                updateLabel : function() {
                    if (companyCouponsValidateForm())
                        companyCouponsUpdateCoupon();
                },
                createLabel : function() {
                    if (companyCouponsValidateForm())
                        companyCouponsCreateCoupon();
                }
            }
        });
    }
}

function companyCouponsPageInitControls(isCreate) {
    $("#companyCouponsCatalogWise").unbind().bind("change", function(){
        if($("#companyCouponsCatalogWise").is(":checked")){
            $("#companyCouponsCategoriesTab").addClass("disabled");
            $("#companyCouponsProductTab").addClass("disabled");
            $("#companyCouponsSkuTab").addClass("disabled");
            $("#companyCouponsGeneralCatalog_multiselectButton").show();
        }
        else{
            $("#companyCouponsCategoriesTab").removeClass("disabled");
            $("#companyCouponsProductTab").removeClass("disabled");
            $("#companyCouponsSkuTab").removeClass("disabled");
            $("#companyCouponsGeneralCatalog").multiselect("uncheckAll");
            $("#companyCouponsGeneralCatalog_multiselectButton").hide();
        }
    });
    $("#companyCouponsTabs .tabs a").unbind();
    $("#companyCouponsTranslationTab").removeClass("disabled");
    $("#companyCouponsCategoriesTab").removeClass("disabled");
    $("#companyCouponsProductTab").removeClass("disabled");
    $("#companyCouponsSkuTab").removeClass("disabled");
    $("#companyCouponsGeneralTab").addClass("selected");
    $("#companyCouponsTabs .tabs a").click(function() {
        if(isCreate && $(this).attr("id") == "companyCouponsTranslationTab")
            return;
        if($("#companyCouponsCatalogWise").is(":checked") &&
            ($(this).attr("id") == "companyCouponsProductTab" ||$(this).attr("id") == "companyCouponsCategoriesTab" ||$(this).attr("id") == "companyCouponsSkuTab"))
            return;
        $("#companyCouponsTabs .tabs .selected").removeClass("selected");
        $(this).addClass("selected");
        switch($(this).attr("id")){
            case "companyCouponsGeneralTab":
                $("#companyCouponsDescriptionDiv").hide();
                $("#companyCouponsRulesDiv").hide();
                $("#companyCouponsCategoriesDiv").hide();
                $("#companyCouponsProductDiv").hide();
                $("#companyCouponsSkuDiv").hide();
                $("#companyCouponsTranslationDiv").hide();
                $("#companyCouponsCreateDiv").show();
                break;
            case "companyCouponsDescriptionTab":
                $("#companyCouponsCreateDiv").hide();
                $("#companyCouponsRulesDiv").hide();
                $("#companyCouponsProductDiv").hide();
                $("#companyCouponsCategoriesDiv").hide();
                $("#companyCouponsSkuDiv").hide();
                $("#companyCouponsTranslationDiv").hide();
                $("#companyCouponsDescriptionDiv").show();
                break;
            case "companyCouponsRulesTab":
                $("#companyCouponsCreateDiv").hide();
                $("#companyCouponsDescriptionDiv").hide();
                $("#companyCouponsProductDiv").hide();
                $("#companyCouponsCategoriesDiv").hide();
                $("#companyCouponsSkuDiv").hide();
                $("#companyCouponsTranslationDiv").hide();
                $("#companyCouponsRulesDiv").show();
                break;
            case "companyCouponsProductTab":
                $("#companyCouponsCreateDiv").hide();
                $("#companyCouponsDescriptionDiv").hide();
                $("#companyCouponsRulesDiv").hide();
                $("#companyCouponsCategoriesDiv").hide();
                $("#companyCouponsSkuDiv").hide();
                $("#companyCouponsTranslationDiv").hide();
                $("#companyCouponsProductDiv").show();
                break;
            case "companyCouponsCategoriesTab":
                $("#companyCouponsCreateDiv").hide();
                $("#companyCouponsDescriptionDiv").hide();
                $("#companyCouponsRulesDiv").hide();
                $("#companyCouponsProductDiv").hide();
                $("#companyCouponsSkuDiv").hide();
                $("#companyCouponsTranslationDiv").hide();
                $("#companyCouponsCategoriesDiv").show();
                break;
            case "companyCouponsSkuTab":
                $("#companyCouponsCreateDiv").hide();
                $("#companyCouponsDescriptionDiv").hide();
                $("#companyCouponsRulesDiv").hide();
                $("#companyCouponsProductDiv").hide();
                $("#companyCouponsCategoriesDiv").hide();
                $("#companyCouponsTranslationDiv").hide();
                $("#companyCouponsSkuDiv").show();
                break;
            case "companyCouponsTranslationTab":
                $("#companyCouponsCreateDiv").hide();
                $("#companyCouponsDescriptionDiv").hide();
                $("#companyCouponsRulesDiv").hide();
                $("#companyCouponsProductDiv").hide();
                $("#companyCouponsCategoriesDiv").hide();
                $("#companyCouponsSkuDiv").hide();
                $("#companyCouponsTranslationDiv").show();
                break;
            default:
                break;
        }
    });
    var availableDates = $("#companyCouponsStartDate, #companyCouponsEndDate").datepicker({
        dateFormat : 'dd/mm/yy',
        minDate : new Date(),
        changeMonth : true,
        changeYear : true,
        firstDay : 1,
        onClose : function(selectedDate) {
            var option = this.id == "companyCouponsStartDate" ? "minDate"
                : "maxDate", instance = $(this).data(
                "datepicker"), date = $.datepicker
                .parseDate(
                    instance.settings.dateFormat
                    || $.datepicker._defaults.dateFormat,
                selectedDate, instance.settings);
            availableDates.not(this).datepicker("option",
                option, date);
        }
    }).keydown(function() {
        return false;
    });

    companyCouponsDescriptionCkeditor = $("#companyCouponsDescription").val("").cleditor({
        width: 480,
        height: 230,
        controls: "bold italic underline | font size " +
            "style | color highlight removeformat | bullets numbering | outdent " +
            "indent | alignleft center alignright justify | undo redo | " +
            "cut copy paste pastetext"
    })[0];
    companyCouponsDescriptionCkeditor.change(function(){
        companyCouponsDescriptionCkeditor.updateTextArea();
    });

    $("#companyCouponsRulesAddLink").unbind().bind("click", function(){companyCouponsRulesGetDetails("", true)});
    companyCouponsRulesDrawGrid([]);

    $("#companyCouponsCategoriesSearch").unbind().bind("keyup", function(e){if(e.keyCode == "13"){companyCouponsSearchCategories();}});
    $("#companyCouponsCategoriesSearchBtn").unbind().bind("click", companyCouponsSearchCategories);
    $("#companyCouponsCategories").multiselectSlides({
        right: "#companyCouponsCategories_to",
        rightAll: "#companyCouponsCategories_right_All",
        rightSelected: "#companyCouponsCategories_right_Selected",
        leftSelected: "#companyCouponsCategories_left_Selected",
        leftAll: "#companyCouponsCategories_left_All"
    });

    $("#companyCouponsProductSearch").unbind().bind("keyup", function(e){if(e.keyCode == "13"){companyCouponsSearchProducts();}});
    $("#companyCouponsProductSearchBtn").unbind().bind("click", companyCouponsSearchProducts);
    $("#companyCouponsProduct").multiselectSlides({
        right: "#companyCouponsProduct_to",
        rightAll: "#companyCouponsProduct_right_All",
        rightSelected: "#companyCouponsProduct_right_Selected",
        leftSelected: "#companyCouponsProduct_left_Selected",
        leftAll: "#companyCouponsProduct_left_All"
    });

    $("#companyCouponsSkuSearch").unbind().bind("keyup", function(e){if(e.keyCode == "13"){companyCouponsSearchSku();}});
    $("#companyCouponsSkuSearchBtn").unbind().bind("click", companyCouponsSearchSku);
    $("#companyCouponsSku").multiselectSlides({
        right: "#companyCouponsSku_to",
        rightAll: "#companyCouponsSku_right_All",
        rightSelected: "#companyCouponsSku_right_Selected",
        leftSelected: "#companyCouponsSku_left_Selected",
        leftAll: "#companyCouponsSku_left_All"
    });

    if (isCreate) {
        $("#companyCouponsTranslationTab").addClass("disabled");
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
    }
    else {
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").addClass("ui-update-button");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").html("<span class='ui-button-text'>" + updateLabel + "</span>");
    }
    $("#companyCouponsCreateDiv").show();
    $("#companyCouponsDescriptionDiv").hide();
    $("#companyCouponsRulesDiv").hide();
    $("#companyCouponsCategoriesDiv").hide();
    $("#companyCouponsProductDiv").hide();
    $("#companyCouponsSkuDiv").hide();
    $("#companyCouponsTranslationDiv").hide();
}

function companyCouponsPageInitFields(couponId, isCreate){
    $("#companyCouponsId").val(couponId);
    $("#companyCouponsName,#companyCouponsCode,#companyCouponsStartDate,#companyCouponsEndDate,#companyCouponsNumberOfUse,#companyCouponsPastille").val("");
    $("#companyCouponsActive").prop("checked", false);
    $("#companyCouponsGeneralCatalog").empty().html(companyCouponsCatalogsHtml);
    $("#companyCouponsCategoriesCatalog, #companyCouponsProductCatalog, #companyCouponsSkuCatalog").empty().html("<option value='none'>None</option>" + companyCouponsCatalogsHtml);
    $("#companyCouponsGeneralCatalog, #companyCouponsCategoriesCatalog, #companyCouponsProductCatalog, #companyCouponsSkuCatalog").multiselect("destroy");
    $("#companyCouponsGeneralCatalog").multiselect({
        header : false,
        noneSelectedText : multiselectNoneSelectedTextLabel,
        minWidth : 190,
        selectedList : 3
    }).hide();
    $("#companyCouponsCategoriesCatalog, #companyCouponsProductCatalog, #companyCouponsSkuCatalog").multiselect({
        header : false,
        multiple : false,
        noneSelectedText : multiselectNoneSelectedTextLabel,
        minWidth : 190,
        selectedList : 1
    });
    $("#companyCouponsCategoriesCatalog, #companyCouponsProductCatalog, #companyCouponsSkuCatalog").multiselect("uncheckAll");
    if(catalogSelectedId != null){
        $("#companyCouponsCategoriesCatalog option").each(function() {
            if(this.value == catalogSelectedId)
                $(this).attr("selected", "selected");
            else
                $(this).removeAttr("selected");
        });
        $("#companyCouponsCategoriesCatalog").multiselect("refresh");
        $("#companyCouponsDialog .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_companyCouponsCategoriesCatalog']").each(function() {
            if (this.value == catalogSelectedId) {
                this.click();
            }
        });
        $("#companyCouponsCategoriesCatalog").val(catalogSelectedId);
        $("#companyCouponsProductCatalog option").each(function() {
            if(this.value == catalogSelectedId)
                $(this).attr("selected", "selected");
            else
                $(this).removeAttr("selected");
        });
        $("#companyCouponsProductCatalog").multiselect("refresh");
        $("#companyCouponsDialog .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_companyCouponsProductCatalog']").each(function() {
            if (this.value == catalogSelectedId) {
                this.click();
            }
        });
        $("#companyCouponsProductCatalog").val(catalogSelectedId);
        $("#companyCouponsSkuCatalog option").each(function() {
            if(this.value == catalogSelectedId)
                $(this).attr("selected", "selected");
            else
                $(this).removeAttr("selected");
        });
        $("#companyCouponsSkuCatalog").multiselect("refresh");
        $("#companyCouponsDialog .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_companyCouponsSkuCatalog']").each(function() {
            if (this.value == catalogSelectedId) {
                this.click();
            }
        });
        $("#companyCouponsSkuCatalog").val(catalogSelectedId);
    }
    $("#companyCouponsGeneralCatalog_multiselectButton").hide();

    if (!isCreate){
        var coupon = null;
        var data = companyCouponsGrid.getData();
        for (var i = 0; i < data.length; i++) {
            if (data[i].couponId == couponId){
                coupon = data[i];
                break;
            }
        }
        if(coupon){
            $("#companyCouponsName").val(coupon.name);
            $("#companyCouponsCode").val(coupon.code);
            $("#companyCouponsPastille").val(coupon.pastille);
            $("#companyCouponsStartDate").val(coupon.startDate);
            $("#companyCouponsEndDate").val(coupon.endDate);
            $("#companyCouponsNumberOfUse").val(coupon.numberOfUses);
            if(coupon.active)
                $("#companyCouponsActive").prop("checked", true);
            if(coupon.anonymous)
                $("#companyCouponsAnonymous").prop("checked", true);
            if(coupon.catalogWise){
                $("#companyCouponsCatalogWise").prop("checked", true);
                $("#companyCouponsCategoriesTab").addClass("disabled");
                $("#companyCouponsProductTab").addClass("disabled");
                $("#companyCouponsSkuTab").addClass("disabled");
                $("#companyCouponsGeneralCatalog_multiselectButton").show();
                for(var i = 0; i < coupon.catalogs.length; i++){
                    $("#companyCouponsDialog .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_companyCouponsGeneralCatalog']").each(function() {
                        if (this.value == coupon.catalogs[i].id) {
                            this.click();
                        }
                    });
                }
                $("#companyCouponsGeneralCatalog").multiselect("refresh");
            }

            $("#companyCouponsDescription").val(coupon.description);
            companyCouponsDescriptionCkeditor.updateFrame();

            for(var i = 0; i < coupon.categories.length; i++){
                var libelle = coupon.categories[i].name + " / " + coupon.categories[i].catalog.name
                $("#companyCouponsCategories_to").append($("<option></option>").attr("value", coupon.categories[i].id).attr("title", libelle).text(libelle));
            }
            for(var i = 0; i < coupon.products.length; i++){
                var libelle = coupon.products[i].name + " / " + coupon.products[i].category.catalog.name
                $("#companyCouponsProduct_to").append($("<option></option>").attr("value", coupon.products[i].id).attr("title", libelle).text(libelle));
            }
            for(var i = 0; i < coupon.skus.length; i++){
                var libelle = coupon.skus[i].name + " (" + coupon.skus[i].product.name + " / " + coupon.skus[i].product.category.catalog.name + ")"
                $("#companyCouponsSku_to").append($("<option></option>").attr("value", coupon.skus[i].id).attr("title", libelle).text(libelle));
            }
            var rules = [];
            for ( var i = 0; i < coupon.rules.length; i++) {
                rules[rules.length] = {
                    "id" : i,
                    "xtype": coupon.rules[i].xtype.name,
                    "discount": coupon.rules[i].discount,
                    "xPurchased": coupon.rules[i].xPurchased,
                    "yOffered": coupon.rules[i].yOffered
                }
            }
            companyCouponsRulesGrid.setData(rules);
            companyCouponsRulesGrid.invalidate();
            companyCouponsTranslationDrawAll(couponId);
        }
    }
}

function companyCouponsValidateForm(){
    if ($("#companyCouponsName").val() == "" || $("#companyCouponsCode").val() == "") {
        if($("#companyCouponsName").val() == "")
            $('#companyCouponsForm #companyCouponsName').focus();
        else
            $('#companyCouponsForm #companyCouponsName').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : "error"
        });
        return false;
    }
    if (!$("#companyCouponsNumberOfUse")[0].checkValidity()) {
        $('#companyCouponsForm #companyCouponsNumberOfUse').focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyCouponsNumberErrorLabel,
            stay : false,
            type : 'error'
        });
        return false;
    }
    if($("#companyCouponsCatalogWise").is(":checked") && $("#companyCouponsGeneralCatalog").multiselect("getChecked").length == 0){
        $("#companyCouponsGeneralCatalog").multiselect("open");
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyCouponsCatalogErrorLabel,
            stay : false,
            type : 'error'
        });
        return false;
    }
    return true;
}

function companyCouponsCreateCoupon(){
    var categories = "", products = "", skus = "", catalogs = "";
    if(!$("#companyCouponsCatalogWise").is(":checked")){
        $("#companyCouponsCategories_to option").each(function(index, value){
            categories += "&categories[" + index + "].id=" + value.value;
        });
        $("#companyCouponsProduct_to option").each(function(index, value){
            products += "&products[" + index + "].id=" + value.value;
        });
        $("#companyCouponsSku_to option").each(function(index, value){
            skus += "&skus[" + index + "].id=" + value.value;
        });
    }
    else{
        $("#companyCouponsGeneralCatalog").multiselect("getChecked").each(function(index, value){
            catalogs += "&catalogs[" + index + "].id=" + value.value;
        });
    }

    var rulesToSend = "";
    var rules = companyCouponsRulesGrid.getData();
    for(var i = 0; i < rules.length; i++){
        rulesToSend += "&rules[" + i + "].xtype=" + rules[i].xtype;
        rulesToSend += "&rules[" + i + "].discount=";
        if(rules[i].discount != null)
            rulesToSend += encodeURIComponent(rules[i].discount);

        rulesToSend += "&rules[" + i + "].xPurchased=";
        if(rules[i].xPurchased != null)
            rulesToSend += encodeURIComponent(rules[i].xPurchased);

        rulesToSend += "&rules[" + i + "].yOffered=";
        if(rules[i].yOffered != null)
            rulesToSend += encodeURIComponent(rules[i].yOffered);
    }
    var pastille = $("#companyCouponsPastille").val();
    if(!isNaN(pastille) && pastille != ""){
        var sign = "";
        if(isNaN(pastille.substring(0, 1))){
            sign = pastille.substring(0, 1);
            pastille = pastille.substring(1);
        }
        pastille = parseInt(parseFloat(pastille) *  Math.pow(10, defaultCurrency.fractionDigits));
        pastille = sign + pastille;
    }
    var dataToSend = "name=" + encodeURIComponent($("#companyCouponsName").val()) + "&code=" + encodeURIComponent($("#companyCouponsCode").val()) + "&pastille=" + encodeURIComponent(pastille);
    dataToSend += "&startDate=" + encodeURIComponent($("#companyCouponsStartDate").val()) + "&endDate=" + encodeURIComponent($("#companyCouponsEndDate").val()) + "&numberOfUses=" + encodeURIComponent($("#companyCouponsNumberOfUse").val());
    dataToSend += "&active=" + $("#companyCouponsActive").is(":checked") + "&catalogWise=" + $("#companyCouponsCatalogWise").is(":checked") + "&anonymous=" + $("#companyCouponsAnonymous").is(":checked");
    dataToSend += catalogs;
    dataToSend += "&description=" + $("#companyCouponsDescription").val();
    dataToSend += rulesToSend + categories + products + skus + "&format=json";

    $.ajax({
        url : companyCreateCouponsUrl,
        type : "POST",
        noticeType : "POST",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyCouponsDialog").dialog("close");
            companyCouponsDrawAll();
        },
        error : function(response, status) {
            $("#companyCouponsName").focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyCouponsUniqueNameErrorLabel,
                stay : false,
                type : "error"
            });
        }
    });
}

function companyCouponsUpdateCoupon(){
    var categories = "", products = "", skus = "", catalogs = "";
    if(!$("#companyCouponsCatalogWise").is(":checked")){
        $("#companyCouponsCategories_to option").each(function(index, value){
            categories += "&categories[" + index + "].id=" + value.value;
        });
        $("#companyCouponsProduct_to option").each(function(index, value){
            products += "&products[" + index + "].id=" + value.value;
        });
        $("#companyCouponsSku_to option").each(function(index, value){
            skus += "&skus[" + index + "].id=" + value.value;
        });
    }
    else{
        $("#companyCouponsGeneralCatalog").multiselect("getChecked").each(function(index, value){
            catalogs += "&catalogs[" + index + "].id=" + value.value;
        });
    }

    var rulesToSend = "";
    var rules = companyCouponsRulesGrid.getData();
    for(var i = 0; i < rules.length; i++){
        rulesToSend += "&rules[" + i + "].xtype=" + rules[i].xtype;
        rulesToSend += "&rules[" + i + "].discount=";
        if(rules[i].discount != null)
            rulesToSend += encodeURIComponent(rules[i].discount);

        rulesToSend += "&rules[" + i + "].xPurchased=";
        if(rules[i].xPurchased != null)
            rulesToSend += encodeURIComponent(rules[i].xPurchased);

        rulesToSend += "&rules[" + i + "].yOffered=";
        if(rules[i].yOffered != null)
            rulesToSend += encodeURIComponent(rules[i].yOffered);
    }
    var pastille = $("#companyCouponsPastille").val();
    if(!isNaN(pastille) && pastille != ""){
        var sign = "";
        if(isNaN(pastille.substring(0, 1))){
            sign = pastille.substring(0, 1);
            pastille = pastille.substring(1);
        }
        pastille = parseInt(parseFloat(pastille) *  Math.pow(10, defaultCurrency.fractionDigits));
        pastille = sign + pastille;
    }
    var dataToSend = "id=" + $("#companyCouponsId").val() + "&name=" + encodeURIComponent($("#companyCouponsName").val());
    dataToSend += "&code=" + encodeURIComponent($("#companyCouponsCode").val()) + "&pastille=" + encodeURIComponent(pastille);
    dataToSend += "&startDate=" + encodeURIComponent($("#companyCouponsStartDate").val()) + "&endDate=" + encodeURIComponent($("#companyCouponsEndDate").val()) + "&numberOfUses=" + encodeURIComponent($("#companyCouponsNumberOfUse").val());
    dataToSend += "&active=" + $("#companyCouponsActive").is(":checked") + "&catalogWise=" + $("#companyCouponsCatalogWise").is(":checked") + "&anonymous=" + $("#companyCouponsAnonymous").is(":checked");
    dataToSend += catalogs;
    dataToSend += "&description=" + $("#companyCouponsDescription").val();
    dataToSend += rulesToSend + categories + products + skus + "&format=json";

    $.ajax({
        url : companyUpdateCouponsUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyCouponsDialog").dialog("close");
            companyCouponsDrawAll();
        },
        error : function(response, status) {
            $("#categoryFeatureName").focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyCouponsUniqueNameErrorLabel,
                stay : false,
                type : "error"
            });
        }
    });
}

function companyCouponsSearchCategories(){
    if($("#companyCouponsCategoriesSearch").val() == "")
        return;
    var dataToSend = "";
    if($("#companyCouponsCategoriesCatalog").val() != null && $("#companyCouponsCategoriesCatalog").val() != "none")
        dataToSend += "catalog.id=" +  $("#companyCouponsCategoriesCatalog").val() + "&";
    dataToSend += "name=" + encodeURIComponent($("#companyCouponsCategoriesSearch").val()) + "&format=json";
    $.ajax({
        url : companyCouponsSearchCategoriesUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyCouponsCategories").empty();
            for(var i = 0; i < response.length; i++){
                if($("#companyCouponsCategories_to > option[value=" + response[i].id + "]").length == 0) {
                    var libelle = response[i].name + " / " + response[i].catalog.name
                    $("#companyCouponsCategories").append($("<option></option>").attr("value", response[i].id).attr("title", libelle).text(libelle));
                }
            }
        },
        error : function(response, status) {}
    });
}

function companyCouponsSearchProducts(){
    if($("#companyCouponsProductSearch").val() == "")
        return;
    var dataToSend = "";
    if($("#companyCouponsProductCatalog").val() != null && $("#companyCouponsProductCatalog").val() != "none")
        dataToSend += "catalog.id=" +  $("#companyCouponsProductCatalog").val() + "&";
    dataToSend += "name=" + encodeURIComponent($("#companyCouponsProductSearch").val()) + "&format=json";
    $.ajax({
        url : companyCouponsSearchProductsUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var products = response.list;
            $("#companyCouponsProduct").empty();
            for(var i = 0; i < products.length; i++){
                if($("#companyCouponsProduct_to > option[value='" + products[i].id + "']").length == 0) {
                    var libelle = products[i].name + " / " + products[i].category.catalog.name
                    $("#companyCouponsProduct").append($("<option></option>").attr("value", products[i].id).attr("title", libelle).text(libelle));
                }
            }
        },
        error : function(response, status) {}
    });
}

function companyCouponsSearchSku(){
    if($("#companyCouponsSkuSearch").val() == "")
        return;
    var dataToSend = "";
    if($("#companyCouponsSkuCatalog").val() != null && $("#companyCouponsSkuCatalog").val() != "none")
        dataToSend += "catalog.id=" +  $("#companyCouponsSkuCatalog").val() + "&";
    dataToSend += "name=" + encodeURIComponent($("#companyCouponsSkuSearch").val()) + "&format=json";
    $.ajax({
        url : companyCouponsSearchSkuUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyCouponsSku").empty();
            for(var i = 0; i < response.length; i++){
                if($("#companyCouponsSku_to > option[value='" + response[i].id + "']").length == 0) {
                    var libelle = response[i].name + " (" + response[i].product.name + " / " + response[i].product.category.catalog.name + ")"
                    $("#companyCouponsSku").append($("<option></option>").attr("value", response[i].id).attr("title", libelle).text(libelle));
                }
            }
        },
        error : function(response, status) {}
    });
}

//TRANSLATION

var companyCouponsTranslationGrid = null;

function companyCouponsTranslationDrawAll(couponId){
    companyCouponsTranslationGrid = null;
    var successCallback = function (response){
        var fields = ["name", "pastille"];
        $("#companyCouponsTranslationAddLink").unbind();
        $("#companyCouponsTranslationAddLink").bind("click", function(){
            var defaultsData = {name: $("#companyCouponsName").val(), pastille: $("#companyCouponsPastille").val()};
            translationGetCreatePage("companyCoupons", couponId, fields, defaultsData);
        });
        var columns = [{field: "name", title: translationNameGridLabel}, {field: "pastille", title: translationPastilleGridLabel}];
        var data = [];
        for (var i = 0; i < response.length; i++) {
            var value = eval( "(" + response[i].value + ")" );
            data[data.length] = {
                "id" : response[i].id,
                "targetId": couponId,
                "translationType": "companyCoupons",
                "lang": response[i].lang,
                "type": response[i].type,
                "name": value.name,
                "pastille": value.pastille
            }
        }
        var tabVisible = $("#companyCouponsTranslationDiv").is(":visible");
        if(! tabVisible)
            $("#companyCouponsTranslationDiv").show();

        companyCouponsTranslationGrid = translationGetGrid("companyCouponsTranslationGrid", couponId, fields, columns, data);

        if(! tabVisible)
            $("#companyCouponsTranslationDiv").hide();
        $("#categoriesMain").hideLoading();
    };
    translationGetAllData("companyCoupons", couponId, successCallback);
}

/**
 Rules functions
 **/
var companyCouponsRulesXTypes = {};
var companyCouponsRulesGrid = null;

function companyCouponsRulesDrawGrid(rules){
    companyCouponsRulesXTypes = {
        "DISCOUNT": companyCouponsRulesDiscountValueLabel,
        "X_PURCHASED_Y_OFFERED": companyCouponsRulesPurchasedOfferedValueLabel,
        "CUSTOM": companyCouponsRulesCustomValueLabel
    };

    var gridColumns = [{
        id : "xtype",
        name : companyCouponsRulesTypeLabel,
        field : "xtype",
        width : 40,
        formatter : companyCouponsRulesGridTypeFormatter,
        cssClass : ""
    },{
        id : "discount",
        name : companyCouponsRulesDiscountLabel,
        field : "discount",
        width : 20,
        formatter : companyCouponsRulesGridDiscountFormatter,
        cssClass : ""
    },{
        id : "xPurchased",
        name : companyCouponsRulesPurchasedLabel,
        field : "xPurchased",
        width : 20,
        cssClass : ""
    },{
        id : "yOffered",
        name : companyCouponsRulesOfferedLabel,
        field : "yOffered",
        width : 20,
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
    if(rules){
        for ( var i = 0; i < rules.length; i++) {
            gridData[gridData.length] = {
                "id" : i,
                "xtype": rules[i].xtype.name,
                "discount": rules[i].discount,
                "xPurchased": rules[i].xPurchased,
                "yOffered": rules[i].yOffered
            }
        }
    }
    $("#companyCouponsRulesDiv").show();
    companyCouponsRulesGrid = null;
    companyCouponsRulesGrid = new Slick.Grid($("#companyCouponsRulesGrid"), gridData, gridColumns, gridOptions);

    companyCouponsRulesGrid.setSelectionModel(new Slick.RowSelectionModel());
    companyCouponsRulesGrid.invalidate();
    $("#companyCouponsRulesDiv").hide();
}

function companyCouponsRulesGridTypeFormatter (row, cell, value, columnDef, dataContext){
    return "<a href='javascript:void(0)' onclick='companyCouponsRulesGetDetails(" + dataContext.id + ", " + false + ")'>" + companyCouponsRulesXTypes[value] + "</a>";
}

function companyCouponsRulesGridDiscountFormatter (row, cell, value, columnDef, dataContext){
    var discount = value != null ? value : "";
    if(!isNaN(discount) && discount != "" && dataContext.xtype == "DISCOUNT"){
        var sign = "";
        if(isNaN(discount.substring(0, 1))){
            sign = discount.substring(0, 1);
            discount = discount.substring(1);
        }
        discount = (discount / Math.pow(10, defaultCurrency.fractionDigits)).toFixed(defaultCurrency.fractionDigits);
        discount = sign + discount;
    }
    return discount;
}

function companyCouponsRulesGetDetails(id, isCreate){
    $.get(
        companyCouponsRulesPageUrl,
        {},
        function(htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            companyCouponsRulesPageSetup(htmlresponse, id, isCreate);
        },
        "html"
    );
}

function companyCouponsRulesPageSetup(htmlresponse, id, isCreate){
    if ($("#companyCouponsRulesDialog").dialog("isOpen") !== true) {
        $("#companyCouponsRulesDialog").empty();
        $("#companyCouponsRulesDialog").html(htmlresponse);
        $("#companyCouponsRulesDialog").dialog({
            title : companyCouponsRulesTitleLabel,
            modal : true,
            resizable : false,
            width : "auto",
            height : "auto",
            open : function(event) {
                companyCouponsRulesPageInitControls(isCreate);
                companyCouponsRulesPageInitFields(id, isCreate);
            },
            buttons : {
                cancelLabel : function() {
                    $("#companyCouponsRulesDialog").dialog("close");
                },
                createLabel : function() {
                    if (companyCouponsRulesValidateForm())
                        companyCouponsRulesCreateRule();
                },
                updateLabel : function() {
                    if (companyCouponsRulesValidateForm())
                        companyCouponsRulesUpdateRule();
                },
                deleteLabel : function(){
                    companyCouponsRulesDeleteRule();
                }
            }
        });
    }
}

function companyCouponsRulesPageInitControls(isCreate){
    if (isCreate) {
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
    }
    else {
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").addClass("ui-delete-button");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").addClass("ui-update-button");
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").html("<span class='ui-button-text'>" + deleteLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").html("<span class='ui-button-text'>" + updateLabel + "</span>");
    }
    $("#companyCouponsRulesType").multiselect("destroy");
    $("#companyCouponsRulesType").multiselect({
        header : false,
        multiple : false,
        noneSelectedText : multiselectNoneSelectedTextLabel,
        minWidth : 229,
        height: 80,
        selectedList : 1
    });
    $("#companyCouponsRulesType").unbind().bind("multiselectclick", function(event, ui) {
        $("#companyCouponsRulesDiscount").val("");
        $("#companyCouponsRulesPurchased").val("");
        $("#companyCouponsRulesOffered").val("");
        $("#companyCouponsRulesCustomDiscount").val("");
        if(ui.value == "DISCOUNT"){
            $("#companyCouponsRulesCreatePurchaseOfferedDiv").hide();
            $("#companyCouponsRulesCreateDiscountDiv").show();
            $("#companyCouponsRulesCreateCustomDiv").hide();
        }
        else if(ui.value == "X_PURCHASED_Y_OFFERED"){
            $("#companyCouponsRulesCreateDiscountDiv").hide();
            $("#companyCouponsRulesCreatePurchaseOfferedDiv").show();
            $("#companyCouponsRulesCreateCustomDiv").hide();
        }
        else if(ui.value == "CUSTOM"){
            $("#companyCouponsRulesCreateDiscountDiv").hide();
            $("#companyCouponsRulesCreatePurchaseOfferedDiv").hide();
            $("#companyCouponsRulesCreateCustomDiv").show();
        }
    });
}

function companyCouponsRulesPageInitFields(id, isCreate){
    $("#companyCouponsRulesForm .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_companyCouponsRulesType']").each(function() {
        if (this.value == "DISCOUNT") {
            this.click();
        }
    });
    $("#companyCouponsRulesId").val(id);
    $("#companyCouponsRulesDiscount,#companyCouponsRulesPurchased,#companyCouponsRulesOffered,#companyCouponsRulesCustomDiscount").val("");
    if (!isCreate){
        var data = companyCouponsRulesGrid.getData();
        var rule = null;
        for(var i = 0; i < data.length; i++){
            if(data[i].id == id){
                rule = data[i];
                break;
            }
        }
        if(rule){
            $("#companyCouponsRulesForm .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_companyCouponsRulesType']").each(function() {
                if (this.value == rule.xtype) {
                    this.click();
                }
            });
            var discount = (rule.xtype == "DISCOUNT" && rule.discount != null) ? rule.discount : "";
            var customDiscount = (rule.xtype == "CUSTOM" && rule.discount != null) ? rule.discount : "";
            if(!isNaN(discount) && discount != ""){
                var sign = "";
                if(isNaN(discount.substring(0, 1))){
                    sign = discount.substring(0, 1);
                    discount = discount.substring(1);
                }
                discount = (discount / Math.pow(10, defaultCurrency.fractionDigits)).toFixed(defaultCurrency.fractionDigits);
                discount = sign + discount;
            }
            $("#companyCouponsRulesDiscount").val(discount);
            $("#companyCouponsRulesPurchased").val(rule.xPurchased);
            $("#companyCouponsRulesOffered").val(rule.yOffered);
            $("#companyCouponsRulesCustomDiscount").val(customDiscount);
        }
    }
}

function companyCouponsRulesValidateForm(){
    if( $("#companyCouponsRulesType").val() == "DISCOUNT" && ($("#companyCouponsRulesDiscount").val() == "" || !$("#companyCouponsRulesDiscount")[0].checkValidity())){
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : "error"
        });
        return false;
    }
    if( $("#companyCouponsRulesType").val() == "X_PURCHASED_Y_OFFERED" &&
        ($("#companyCouponsRulesPurchased").val() == "" || !$("#companyCouponsRulesPurchased")[0].checkValidity()
            || $("#companyCouponsRulesOffered").val() == "" || !$("#companyCouponsRulesOffered")[0].checkValidity())){
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : "error"
        });
        return false;
    }
    if($("#companyCouponsRulesType").val() == "CUSTOM" && ($("#companyCouponsRulesCustomDiscount").val() == "" || !$("#companyCouponsRulesCustomDiscount")[0].checkValidity())){
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

function companyCouponsRulesCreateRule(){
    var data = companyCouponsRulesGrid.getData();
    var len = data.length;
    var xtype = $("#companyCouponsRulesType").val();
    var discount = "";
    if(xtype == "DISCOUNT") {
        discount = $("#companyCouponsRulesDiscount").val();
        if (!isNaN(discount) && discount != "") {
            var sign = "";
            if (isNaN(discount.substring(0, 1))) {
                sign = discount.substring(0, 1);
                discount = discount.substring(1);
            }
            discount = parseInt(parseFloat(discount) * Math.pow(10, defaultCurrency.fractionDigits));
            discount = sign + discount;
        }
    }
    else if(xtype == "CUSTOM"){
        discount = $("#companyCouponsRulesCustomDiscount").val();
    }
    data[len] = {
        id: len,
        "xtype": xtype,
        "discount": discount,
        "xPurchased": $("#companyCouponsRulesPurchased").val(),
        "yOffered":  $("#companyCouponsRulesOffered").val()
    };
    console.log(data)
    companyCouponsRulesGrid.setData(data);
    companyCouponsRulesGrid.invalidate();
    $("#companyCouponsRulesDialog").dialog("close");
}

function companyCouponsRulesUpdateRule(){
    var data = companyCouponsRulesGrid.getData();
    for(var i = 0; i < data.length; i++){
        if(data[i].id == $("#companyCouponsRulesId").val()){
            var xtype = $("#companyCouponsRulesType").val();
            var discount = "";
            if(xtype == "DISCOUNT") {
                discount = $("#companyCouponsRulesDiscount").val();
                if (!isNaN(discount) && discount != "") {
                    var sign = "";
                    if (isNaN(discount.substring(0, 1))) {
                        sign = discount.substring(0, 1);
                        discount = discount.substring(1);
                    }
                    discount = parseInt(parseFloat(discount) * Math.pow(10, defaultCurrency.fractionDigits));
                    discount = sign + discount;
                }
            }
            else if(xtype == "CUSTOM"){
                discount = $("#companyCouponsRulesCustomDiscount").val();
            }
            data[i].xtype =  xtype;
            data[i].discount = discount;
            data[i].xPurchased = $("#companyCouponsRulesPurchased").val();
            data[i].yOffered =  $("#companyCouponsRulesOffered").val();
            break;
        }
    }
    companyCouponsRulesGrid.setData(data);
    companyCouponsRulesGrid.invalidate();
    $("#companyCouponsRulesDialog").dialog("close");
}

function companyCouponsRulesDeleteRule(){
    var newData = [];
    var counter = 0;
    var data = companyCouponsRulesGrid.getData();
    for(var i = 0; i < data.length; i++){
        if(data[i].id != $("#companyCouponsRulesId").val()){
            var len = newData.length;
            newData[len] = data[i];
            newData[len].id = counter++;
        }
    }
    companyCouponsRulesGrid.setData(newData);
    companyCouponsRulesGrid.invalidate();
    $("#companyCouponsRulesDialog").dialog("close");
}