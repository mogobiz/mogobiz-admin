var brandGridObject;
var brandClickFromBrandLoad = false;
var brandLogoChanged = false;
var brandLogoDeleted = false;
var brandCleditor;

function brandLoad(product) {
    var brandId;
    if (product) {
        var brand = product.brand;
        if (brand) {
            brandId = brand.id;
        }
    }
    else if($("#productBrand").val())
        brandId = $("#productBrand").val();

    $.ajax({
        url : fetchBrandUrl,
        type : "GET",
        data : "format=json",
        dataType : "json",
        cache : false,
        async : true,
        success : function(data, status) {
            brandClickFromBrandLoad = true;
            var outputBrand = "";
            $.each(data, function(i, value) {
                var selected = (brandId && brandId == value.id);
                outputBrand += "<option " + (selected ? "selected " : "") + "value='" + value.id + "'>" + value.name + "</option>";
            });
            $("#productBrand").empty().html(outputBrand);
            $("#productBrand").multiselect("destroy");
            $("#productBrand").multiselect({
                header: false,
                multiple: false,
                noneSelectedText : brandComboTitle,
                selectedList: 1
            });
            if(brandId) {
                $("#productBrand").multiselect("uncheckAll");
                $("#productBrand").find("option:contains(" + brandId + ")").attr("selected","selected");
                $("#productBrand").multiselect("refresh");
                $("#generalInfo .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_productBrand']").each(function() {
                    if(this.value == brandId) {
                        this.click();
                    }
                });
            }
            brandClickFromBrandLoad = false;
        }
    });
}

function brandPageDisplay() {
    $.get(BrandPageUrl, {}, function(responseText) {
        responseText = jQuery.trim(responseText);
        brandSetup(responseText);
    }, "html");
}

function brandSetup(htmlresponse) {
    if ($("#brandDialog").dialog("isOpen") !== true) {
        $("#brandDialog").empty();
        $("#brandDialog").html(htmlresponse);
        $("#brandDialog").dialog({
            title : brandTitleLabel,
            modal : true,
            resizable : false,
            width : "auto",
            height : "auto",
            open : function(event) {
                productBrandsPageInitControls();
                productBrandsListPageInitControls();
                productBrandsListPageInitGrid();
                productBrandsListLoadAll();
            },
            buttons : {
                deleteLabel : function() {
                    productBrandsDeleteBrand();
                },
                okLabel : function() {
                    $("#brandDialog").dialog("close");
                },
                cancelLabel : function() {
                    productBrandsListPageInitControls();
                },
                updateLabel : function() {
                    if (productBrandsValidateForm())
                        productBrandsUpdateBrand();
                },
                createLabel : function() {
                    if (productBrandsValidateForm())
                        productBrandsCreateBrand();
                }
            }
        });
    }
}

function productBrandsPageInitControls(){
    $(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
    $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").addClass("ui-update-button");
    $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").addClass("ui-delete-button");
    $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
    $(".ui-dialog-buttonpane").find("button:contains('okLabel')").addClass("ui-cancel-button");
    $(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
    $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").html("<span class='ui-button-text'>" + updateLabel + "</span>");
    $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").html("<span class='ui-button-text'>" + deleteLabel + "</span>");
    $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
    $(".ui-dialog-buttonpane").find("button:contains('okLabel')").html("<span class='ui-button-text'>" + okLabel + "</span>");
}

function productBrandsListPageInitControls() {
    $("#productBrandsTabs").hide();
    $("#productAddNewBrand").show();
    $("#productBrandGridDiv").show();
    $("#productAddNewBrandLink").unbind().bind("click", function(){productBrandsDetailsPageInitControls(null, true)});
    $(".ui-dialog-buttonpane").find("button:contains('" + okLabel + "')").show();
    $(".ui-dialog-buttonpane").find("button:contains('" + createLabel + "')").hide();
    $(".ui-dialog-buttonpane").find("button:contains('" + updateLabel + "')").hide();
    $(".ui-dialog-buttonpane").find("button:contains('" + deleteLabel + "')").hide();
    $(".ui-dialog-buttonpane").find("button:contains('" + cancelLabel + "')").hide();
}

function productBrandsListPageInitGrid(){
    var gridColumns = [{
        id : "name",
        name : brandNameLabel,
        field : "name",
        width : 45,
        formatter : productBrandsGridNameFormatter,
        cssClass : "cell-title"
    },{
        id : "website",
        name : brandURLLabel,
        field : "website",
        width : 45,
        cssClass : ""
    },{
        id : "hide",
        name : brandHideLabel,
        field : "hide",
        width : 10,
        formatter : productBrandsGridHideFormatter,
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

    brandGridObject = new Slick.Grid($("#productBrandGrid"), [], gridColumns, gridOptions);

    brandGridObject.setSelectionModel(new Slick.RowSelectionModel());
    brandGridObject.invalidate();
}

function productBrandsGridNameFormatter (row, cell, value, columnDef, dataContext){
    return "<a href='javascript:void(0)' onclick='productBrandsDetailsPageInitControls(" + dataContext.brandId + ", " + false + ")'>" + value + "</a>";
}

function productBrandsGridHideFormatter(row, cell, value, columnDef, dataContext){
    var checkBox = "<input type='checkbox' disabled='disabled' style='margin-top:4px;'";
    checkBox += (value) ? "checked='checked'/>" : "/>";
    return checkBox;
}

function productBrandsListLoadAll(){
    $.ajax({
        url : fetchBrandUrl,
        type : "GET",
        data : "format=json",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            for ( var i = 0; i < response.length; i++) {
                response[i].website = (response[i].website != null) ? response[i].website : "";
            }
            var gridData = [];
            var brands = response;
            if(brands){
                for ( var i = 0; i < brands.length; i++) {
                    gridData[gridData.length] = {
                        "id" : i,
                        "brandId": brands[i].id,
                        "name": brands[i].name,
                        "website": brands[i].website,
                        "ibeacon": brands[i].ibeacon,
                        "description": brands[i].description,
                        "hide": brands[i].hide
                    }
                }
            }
            brandGridObject.setData(gridData);
            brandGridObject.invalidate();
        }
    });
}

// Details Functions
function productBrandsDetailsPageInitControls(brandId, isCreate){
    brandLogoChanged = false;
    brandLogoDeleted = false;
    $("#productAddNewBrand").hide();
    $("#productBrandGridDiv").hide();
    $("#productBrandsTabs").show();
    $("#productBrandsTabs .tabs a").unbind();
    $("#productBrandsTranslationTab").removeClass("disabled").removeClass("selected");
    $("#productBrandsCreateDiv").show();
    $("#productBrandsTranslationDiv").hide();
    $("#productBrandsGeneralTab").addClass("selected");
    $("#productBrandsRemoveLogoLink").show();
    $("#productBrandsLogo").show();
    $("#productBrandsLogo").unbind().bind("change", function(){
        brandLogoChanged = true;
        var filesSelected = document.getElementById("productBrandsLogo").files;
        if (filesSelected.length > 0){
            var fileToLoad = filesSelected[0];
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result;
                var newImage = document.getElementById("productBrandsLogoImage");
                newImage.src = srcData;
            }
            fileReader.readAsDataURL(fileToLoad);
        }
        $("#productBrandsLogo").hide();
        $("#productBrandsRemoveLogoLink").show();
    });
    $("#productBrandsRemoveLogoLink").unbind().bind("click", function(){
        brandLogoDeleted = true;
        $("#productBrandsLogoImage").attr("src", "../images/No_Logo_Available.gif");
        $("#productBrandsRemoveLogoLink").hide();
        $("#productBrandsLogo").val("").show();
    });
    brandCleditor = $("#productBrandsDescription").cleditor({
        width: $(".companyBrandsDialog-full").width() * 0.99,
        height: 150,
        controls: "bold italic underline | font size " +
            "style | color highlight removeformat | bullets numbering | outdent " +
            "indent | alignleft center alignright justify | undo redo | " +
            "cut copy paste pastetext"
    })[0];

    $(".ui-dialog-buttonpane").find("button:contains('" + okLabel + "')").hide();
    $(".ui-dialog-buttonpane").find("button:contains('" + cancelLabel + "')").show();
    if(isCreate){
        $("#productBrandsRemoveLogoLink").hide();
        $("#productBrandsTranslationTab").addClass("disabled");
        $(".ui-dialog-buttonpane").find("button:contains('" + createLabel + "')").show();
        $(".ui-dialog-buttonpane").find("button:contains('" + updateLabel + "')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('" + deleteLabel + "')").hide();
    }
    else{
        $("#productBrandsTabs .tabs a").click(function() {
            $("#productBrandsTabs .tabs .selected").removeClass("selected");
            $(this).addClass("selected");
            switch($(this).attr("id")){
                case "productBrandsGeneralTab":
                    $("#productBrandsTranslationDiv").hide();
                    $("#productBrandsCreateDiv").show();
                    break;
                case "productBrandsTranslationTab":
                    $("#productBrandsCreateDiv").hide();
                    $("#productBrandsTranslationDiv").show();
                    break;
                default:
                    break;
            }
        });
        $(".ui-dialog-buttonpane").find("button:contains('" + createLabel + "')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('" + updateLabel + "')").show();
        $(".ui-dialog-buttonpane").find("button:contains('" + deleteLabel + "')").show();
    }
    productBrandsDetailsPageInitFields(brandId, isCreate);
}

function productBrandsDetailsPageInitFields(brandId, isCreate){
    $("#productBrandsId").val(brandId);
    $("#productBrandsName,#productBrandsWebsite,#productBrandsLogo,#productBrandsDescription").val("");
    brandCleditor.updateFrame();
    $("#productBrandsHide").prop("checked", false);
    if (isCreate){
        productBrandsLoadIBeacons(null);
        $("#productBrandsLogoImage").attr("src", "../images/No_Logo_Available.gif");
    }
    else{
        var brand = null;
        var data = brandGridObject.getData();
        for (var i = 0; i < data.length; i++) {
            if (data[i].brandId == brandId){
                brand = data[i];
                break;
            }
        }
        productBrandsDisplayLogo(brandId);
        if(brand){
            productBrandsLoadIBeacons(brand.ibeacon);
            $("#productBrandsName").val(brand.name);
            $("#productBrandsWebsite").val(brand.website);
            $("#productBrandsDescription").val(brand.description);
            brandCleditor.updateFrame();
            if(brand.hide)
                $("#productBrandsHide").prop("checked", true);
            productBrandsTranslationDrawAll(brandId);
        }
        else{
            productBrandsLoadIBeacons(null);
        }
    }
}

function productBrandsLoadIBeacons(iBeacon){
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
            $("#productBrandsIBeacon").empty().html("" + options).unbind().change(function(){
                $(this).attr("style", $(this).find("option:selected").attr("style"));
            });
            $("#productBrandsIBeacon").attr("style", $("#productBrandsIBeacon").find("option:selected").attr("style"));
        }
    });
}

function productBrandsDisplayLogo(brandId){
    $.ajax({
        url : productBrandsHasLogoUrl,
        type : "GET",
        data : "brand.id=" + brandId,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if(response){
                $("#productBrandsLogo").hide();
                $("#productBrandsLogoImage").attr("src", productBrandsDisplayLogoUrl + "?brand.id=" + brandId);
            }
            else{
                $("#productBrandsRemoveLogoLink").hide();
                $("#productBrandsLogoImage").attr("src", "../images/No_Logo_Available.gif");
            }
        }
    });
}

function productBrandsValidateForm(){
    if ($("#productBrandsName").val() == "") {
        $("#productBrandsForm #productBrandsName").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : "error"
        });
        return false;
    }
    if (!$("#productBrandsWebsite")[0].checkValidity()) {
        $("#productBrandsForm #productBrandsWebsite").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
        return false;
    }
    if(brandLogoChanged && $("#productBrandsLogo").val() != ""){
        var extension = "";
        var fileName = $("#productBrandsLogo").val();
        var index = fileName.lastIndexOf(".");
        if(index < 0){
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyBrandsLogoErrorLabel,
                stay : false,
                type : 'error'
            });
            return false;
        }
        extension = fileName.substring(index + 1).toLowerCase();
        if(extension != "jpeg" && extension != "jpg" && extension != "png" && extension != "gif"){
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyBrandsLogoErrorLabel,
                stay : false,
                type : 'error'
            });
            return false;
        }
    }
    return true;
}

function productBrandsCreateBrand(){
    brandCleditor.updateTextArea();
    var website = ($("#productBrandsWebsite").val().indexOf("://") < 0 ) ? "http://" + $("#productBrandsWebsite").val() : $("#productBrandsWebsite").val();
    var dataToSend = "brand.name=" + $("#productBrandsName").val() + "&brand.website=" + website + "&brand.ibeaconId=" + $("#productBrandsIBeacon").val();
    dataToSend += "&brand.description=" + encodeURIComponent($("#productBrandsDescription").val()) + "&brand.hide=" + $("#productBrandsHide").is(':checked') + "&format=json";
    $.ajax({
        url : createBrandUrl,
        type : "POST",
        noticeType : "POST",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if(brandLogoChanged && $("#productBrandsLogo").val() != ""){
                $("#productBrandsId").val(response.id);
                productBrandsUploadLogo();
            }
            else{
                productBrandsListPageInitControls();
                productBrandsListLoadAll();
                brandLoad();
            }
        },
        error : function(response, status) {
            $("#productBrandsName").focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyBrandsUniqueErrorLabel,
                stay : false,
                type : "error"
            });
        }
    });
}

function productBrandsUpdateBrand(){
    brandCleditor.updateTextArea();
    var website = ($("#productBrandsWebsite").val().indexOf("://") < 0 ) ? "http://" + $("#productBrandsWebsite").val() : $("#productBrandsWebsite").val();
    var dataToSend = "brand.id=" + $("#productBrandsId").val() + "&brand.name=" + $("#productBrandsName").val() + "&brand.website=" + website;
    dataToSend += "&brand.ibeaconId=" + $("#productBrandsIBeacon").val() + "&brand.description=" + encodeURIComponent($("#productBrandsDescription").val());
    dataToSend += "&brand.hide=" + $("#productBrandsHide").is(':checked') + "&format=json";
    $.ajax({
        url : updateBrandUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if(brandLogoDeleted)
                productBrandsDeleteLogo();
            else if(brandLogoChanged && $("#productBrandsLogo").val() != "")
                productBrandsUploadLogo();
            else{
                productBrandsListPageInitControls();
                productBrandsListLoadAll();
                brandLoad();
            }
        },
        error : function(response, status) {
            $("#productBrandsName").focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyBrandsUniqueErrorLabel,
                stay : false,
                type : "error"
            });
        }
    });
}

function productBrandsDeleteBrand(){
    var dataToSend = "brand.id=" + $("#productBrandsId").val() + "&format=json";
    $.ajax({
        url : deleteBrandUrl,
        type : "POST",
        noticeType : "DELETE",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            productBrandsListPageInitControls();
            productBrandsListLoadAll();
            brandLoad();
        },
        error : function(response, status) {}
    });
}

function productBrandsUploadLogo() {
    document.getElementById("productBrandsForm").target = "productBrandsHiddenFrame"; // 'upload_target' is the name of the iframe
    document.getElementById("productBrandsForm").action = productBrandsUploadLogoUrl;
    document.getElementById("productBrandsForm").submit();
    document.getElementById("productBrandsHiddenFrame").onload = function() {
        productBrandsListPageInitControls();
        productBrandsListLoadAll();
        brandLoad();
    }
}

function productBrandsDeleteLogo() {
    $.ajax({
        url : productBrandsHasLogoUrl,
        type : "GET",
        data : "brand.id=" + $("#productBrandsId").val(),
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if(response){
                $.ajax({
                    url : productBrandsDeleteLogoUrl,
                    type : "POST",
                    data : "brand.id=" + $("#productBrandsId").val(),
                    dataType : "json",
                    cache : false,
                    async : true,
                    success: function(response, status){
                        if(brandLogoChanged && $("#productBrandsLogo").val() != "")
                            productBrandsUploadLogo();
                        else{
                            productBrandsListPageInitControls();
                            productBrandsListLoadAll();
                            brandLoad();
                        }
                    }
                });
            }
        }
    });
}

//TRANSLATION

var productBrandsTranslationGrid = null;

function productBrandsTranslationDrawAll(brandId){
    productBrandsTranslationGrid = null;
    var successCallback = function (response){
        var fields = ["name", "website"];
        $("#productBrandsTranslationAddLink").unbind();
        $("#productBrandsTranslationAddLink").bind("click", function(){
            var defaultsData = {name: $("#productBrandsName").val(), website: $("#productBrandsWebsite").val()};
            translationGetCreatePage("productBrands", brandId, fields, defaultsData);
        });
        var columns = [{field: "name", title: translationNameGridLabel},{field: "website", title: translationWebstieGridLabel}];
        var data = [];
        for (var i = 0; i < response.length; i++) {
            var value = eval( "(" + response[i].value + ")" );
            data[data.length] = {
                "id" : response[i].id,
                "targetId": brandId,
                "translationType": "productBrands",
                "lang": response[i].lang,
                "type": response[i].type,
                "name": value.name,
                "website": value.website
            }
        }
        var tabVisible = $("#productBrandsTranslationDiv").is(":visible");
        if(! tabVisible)
            $("#productBrandsTranslationDiv").show();

        productBrandsTranslationGrid = translationGetGrid("productBrandsTranslationGrid", brandId, fields, columns, data);

        if(! tabVisible)
            $("#productBrandsTranslationDiv").hide();
        $("#categoriesMain").hideLoading();
    };
    translationGetAllData("productBrands", brandId, successCallback);
}