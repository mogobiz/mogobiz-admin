var companyBrandsGrid = null;
var companyBrandsLogoChanged = false;
var companyBrandsLogoDeleted = false;
var companyBrandsCleditor;

function companyBrandsDrawAll(){
    companyBrandsGrid = null;
    $.ajax({
        url : companyShowBrandsUrl,
        type : "GET",
        data : "format=json",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var gridColumns = [{
                id : "name",
                name : companyBrandsNameLabel,
                field : "name",
                width : 45,
                formatter : companyBrandsGridNameFormatter,
                cssClass : "cell-title"
            },{
                id : "website",
                name : companyBrandsWebsiteLabel,
                field : "website",
                width : 45,
                cssClass : ""
            },{
                id : "hide",
                name : companyBrandsHideLabel,
                field : "hide",
                width : 10,
                formatter : companyBrandsGridHideFormatter,
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
            companyBrandsGrid = new Slick.Grid($("#brandsGrid"), gridData, gridColumns, gridOptions);

            companyBrandsGrid.setSelectionModel(new Slick.RowSelectionModel());
            companyBrandsGrid.invalidate();
        }
    });
}

function companyBrandsGridHideFormatter(row, cell, value, columnDef, dataContext){
    var checkBox = "<input type='checkbox' disabled='disabled' style='margin-top:4px;'";
    checkBox += (value) ? "checked='checked'/>" : "/>";
    return checkBox;
}

function companyBrandsGridNameFormatter (row, cell, value, columnDef, dataContext){
    return "<a href='javascript:void(0);' onclick='companyBrandsGetDetails(" + dataContext.brandId + ", " + false + ")'>" + value + "</a>";
}

function companyBrandsGetDetails(brandId, isCreate){
    $.get(
        companyBrandsPageUrl,
        {},
        function(htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            companyBrandsPageSetup(htmlresponse, brandId, isCreate);
        },
        "html"
    );
}

function companyBrandsPageSetup(htmlresponse, brandId, isCreate){
    if ($("#companyBrandsDialog").dialog("isOpen") !== true) {
        $("#companyBrandsDialog").empty();
        $("#companyBrandsDialog").html(htmlresponse);
        $("#companyBrandsDialog").dialog({
            title : companyBrandsTitleLabel,
            modal : true,
            resizable : false,
            width : "auto",
            height : "auto",
            open : function(event) {
                companyBrandsLogoChanged = false;
                companyBrandsLogoDeleted = false;
                companyBrandsPageInitControls(brandId, isCreate);
                companyBrandsPageInitFields(brandId, isCreate);
            },
            buttons : {
                deleteLabel : function() {
                    companyBrandsDeleteBrand();
                },
                cancelLabel : function() {
                    $("#companyBrandsDialog").dialog("close");
                },
                updateLabel : function() {
                    if (companyBrandsValidateForm())
                        companyBrandsUpdateBrand();
                },
                createLabel : function() {
                    if (companyBrandsValidateForm())
                        companyBrandsCreateBrand();
                }
            }
        });
    }
}

function companyBrandsPageInitControls(brandId, isCreate) {
    $("#companyBrandsTabs .tabs a").unbind();
    $("#companyBrandsTranslationTab").removeClass("disabled");
    $("#companyBrandsTranslationDiv").hide();
    $("#companyBrandsGeneralTab").addClass("selected");
    $("#companyBrandsRemoveLogoLink").show();
    $("#companyBrandsLogo").show();
    $("#companyBrandsLogo").unbind().bind("change", function(){
        companyBrandsLogoChanged = true;
        var filesSelected = document.getElementById("companyBrandsLogo").files;
        if (filesSelected.length > 0){
            var fileToLoad = filesSelected[0];
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result;
                var newImage = document.getElementById("companyBrandsLogoImage");
                newImage.src = srcData;
            }
            fileReader.readAsDataURL(fileToLoad);
            $("#companyBrandsLogo").hide();
            $("#companyBrandsRemoveLogoLink").show();
        }
    });
    $("#companyBrandsRemoveLogoLink").unbind().bind("click", function(){
        companyBrandsLogoDeleted = true;
        $("#companyBrandsLogoImage").attr("src", "../images/No_Logo_Available.gif");
        $("#companyBrandsRemoveLogoLink").hide();
        $("#companyBrandsLogo").val("").show();
    });
    companyBrandsCleditor = $("#companyBrandsDescription").cleditor({
        width: $(".companyBrandsDialog-full").width() * 0.99,
        height: 150,
        controls: "bold italic underline | font size " +
            "style | color highlight removeformat | bullets numbering | outdent " +
            "indent | alignleft center alignright justify | undo redo | " +
            "cut copy paste pastetext"
    })[0];
    if (isCreate) {
        $("#companyBrandsRemoveLogoLink").hide();
        $("#companyBrandsTranslationTab").addClass("disabled");
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
    }
    else {
        $("#companyBrandsTabs .tabs a").click(function() {
            $("#companyBrandsTabs .tabs .selected").removeClass("selected");
            $(this).addClass("selected");
            switch($(this).attr("id")){
                case "companyBrandsGeneralTab":
                    $("#companyBrandsTranslationDiv").hide();
                    $("#companyBrandsCreateDiv").show();
                    break;
                case "companyBrandsTranslationTab":
                    $("#companyBrandsCreateDiv").hide();
                    $("#companyBrandsTranslationDiv").show();
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

function companyBrandsPageInitFields(brandId, isCreate){
    $("#companyBrandsId").val(brandId);
    $("#companyBrandsName,#companyBrandsWebsite,#companyBrandsLogo,#companyBrandsDescription").val("");
    $("#companyBrandsHide").prop("checked", false);
    companyBrandsCleditor.updateFrame();
    if (isCreate){
        companyBrandsLoadIBeacons(null);
        $("#companyBrandsLogoImage").attr("src", "../images/No_Logo_Available.gif");
    }
    else{
        var brand = null;
        var data = companyBrandsGrid.getData();
        for (var i = 0; i < data.length; i++) {
            if (data[i].brandId == brandId){
                brand = data[i];
                break;
            }
        }
        companyBrandsDisplayLogo(brandId);
        if(brand){
            companyBrandsLoadIBeacons(brand.ibeacon);
            $("#companyBrandsName").val(brand.name);
            $("#companyBrandsWebsite").val(brand.website);
            $("#companyBrandsDescription").val(brand.description);
            companyBrandsCleditor.updateFrame();
            if(brand.hide)
                $("#companyBrandsHide").prop("checked", true);
            companyBrandsTranslationDrawAll(brandId);
        }
        else{
            companyBrandsLoadIBeacons(null);
        }
    }
}

function companyBrandsLoadIBeacons(iBeacon){
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
            $("#companyBrandsIBeacon").empty().html("" + options).unbind().change(function(){
                $(this).attr("style", $(this).find("option:selected").attr("style"));
            });
            $("#companyBrandsIBeacon").attr("style", $("#companyBrandsIBeacon").find("option:selected").attr("style"));
        }
    });
}

function companyBrandsDisplayLogo(brandId){
    $.ajax({
        url : companyBrandsHasLogoUrl,
        type : "GET",
        data : "brand.id=" + brandId,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if(response){
                $("#companyBrandsLogo").hide();
                $("#companyBrandsLogoImage").attr("src", companyBrandsDisplayLogoUrl + "?brand.id=" + brandId);
            }
            else{
                $("#companyBrandsRemoveLogoLink").hide();
                $("#companyBrandsLogoImage").attr("src", "../images/No_Logo_Available.gif");
            }
        }
    });
}

function companyBrandsValidateForm(){
    if ($("#companyBrandsName").val() == "") {
        $("#companyBrandsForm #companyBrandsName").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : "error"
        });
        return false;
    }
    if (!$("#companyBrandsWebsite")[0].checkValidity()) {
        $("#companyBrandsForm #companyBrandsWebsite").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyBrandsWebsiteErrorLabel,
            stay : false,
            type : 'error'
        });
        return false;
    }
    if(companyBrandsLogoChanged && $("#companyBrandsLogo").val() !=""){
        var extension = "";
        var fileName = $("#companyBrandsLogo").val();
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

function companyBrandsCreateBrand(){
    companyBrandsCleditor.updateTextArea();
    var dataToSend = "brand.name=" + $("#companyBrandsName").val() + "&brand.website=" + $("#companyBrandsWebsite").val() + "&brand.ibeaconId=" + $("#companyBrandsIBeacon").val();
    dataToSend += "&brand.description=" + encodeURIComponent($("#companyBrandsDescription").val()) + "&brand.hide=" + $("#companyBrandsHide").is(':checked') + "&format=json";
    $.ajax({
        url : companyCreateBrandsUrl,
        type : "POST",
        noticeType : "POST",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if(companyBrandsLogoChanged && $("#companyBrandsLogo").val() !=""){
                $("#companyBrandsId").val(response.id)
                companyBrandsUploadLogo();
            }
            else{
                $("#companyBrandsDialog").dialog("close");
                companyBrandsDrawAll();
            }
        },
        error : function(response, status) {
            $("#companyBrandsName").focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyBrandsUniqueErrorLabel,
                stay : false,
                type : "error"
            });
        }
    });
}

function companyBrandsUpdateBrand(){
    companyBrandsCleditor.updateTextArea();
    var dataToSend = "brand.id=" + $("#companyBrandsId").val() + "&brand.name=" + $("#companyBrandsName").val() + "&brand.website=" + $("#companyBrandsWebsite").val();
    dataToSend += "&brand.ibeaconId=" + $("#companyBrandsIBeacon").val() + "&brand.description=" + encodeURIComponent($("#companyBrandsDescription").val());
    dataToSend += "&brand.hide=" + $("#companyBrandsHide").is(':checked') + "&format=json";
    $.ajax({
        url : companyUpdateBrandsUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if(companyBrandsLogoDeleted)
                companyBrandsDeleteLogo();
            else if(companyBrandsLogoChanged && $("#companyBrandsLogo").val() !="")
                companyBrandsUploadLogo();
            else{
                $("#companyBrandsDialog").dialog("close");
                companyBrandsDrawAll();
            }
        },
        error : function(response, status) {
            $("#companyBrandsName").focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyBrandsUniqueErrorLabel,
                stay : false,
                type : "error"
            });
        }
    });
}

function companyBrandsDeleteBrand(){
    var dataToSend = "brand.id=" + $("#companyBrandsId").val();
    $.ajax({
        url : companyDeleteBrandsUrl,
        type : "POST",
        noticeType : "DELETE",
        data : dataToSend,
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyBrandsDialog").dialog("close");
            companyBrandsDrawAll();
        },
        error : function(response, status) {}
    });
}

function companyBrandsUploadLogo() {
    document.getElementById("companyBrandsForm").target = "companyBrandsHiddenFrame"; // 'upload_target' is the name of the iframe
    document.getElementById("companyBrandsForm").action = companyBrandsUploadLogoUrl;
    document.getElementById("companyBrandsForm").submit();
    document.getElementById("companyBrandsHiddenFrame").onload = function() {
        $("#companyBrandsDialog").dialog("close");
        companyBrandsDrawAll();
    }
}

function companyBrandsDeleteLogo() {
    $.ajax({
        url : companyBrandsHasLogoUrl,
        type : "GET",
        data : "brand.id=" + $("#companyBrandsId").val(),
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if(response){
                $.ajax({
                    url : companyBrandsDeleteLogoUrl,
                    type : "POST",
                    data : "brand.id=" + $("#companyBrandsId").val(),
                    dataType : "json",
                    cache : false,
                    async : true,
                    success: function(response, status){
                        if(companyBrandsLogoChanged && $("#companyBrandsLogo").val() !="")
                            companyBrandsUploadLogo();
                        else{
                            $("#companyBrandsDialog").dialog("close");
                            companyBrandsDrawAll();
                        }
                    }
                });
            }
            else{
                $("#companyBrandsDialog").dialog("close");
                companyBrandsDrawAll();
            }
        }
    });
}

//TRANSLATION

var companyBrandsTranslationGrid = null;

function companyBrandsTranslationDrawAll(brandId){
    companyBrandsTranslationGrid = null;
    var successCallback = function (response){
        var fields = ["name", "website"];
        $("#companyBrandsTranslationAddLink").unbind();
        $("#companyBrandsTranslationAddLink").bind("click", function(){
            var defaultsData = {name: $("#companyBrandsName").val(), website: $("#companyBrandsWebsite").val()};
            translationGetCreatePage("companyBrands", brandId, fields, defaultsData);
        });
        var columns = [{field: "name", title: translationNameGridLabel},{field: "website", title: translationWebstieGridLabel}];
        var data = [];
        for (var i = 0; i < response.length; i++) {
            var value = eval( "(" + response[i].value + ")" );
            data[data.length] = {
                "id" : response[i].id,
                "targetId": brandId,
                "translationType": "companyBrands",
                "lang": response[i].lang,
                "type": response[i].type,
                "name": decodeURIComponent(value.name),
                "website": decodeURIComponent(value.website)
            }
        }
        var tabVisible = $("#companyBrandsTranslationDiv").is(":visible");
        if(! tabVisible)
            $("#companyBrandsTranslationDiv").show();

        companyBrandsTranslationGrid = translationGetGrid("companyBrandsTranslationGrid", brandId, fields, columns, data);

        if(! tabVisible)
            $("#companyBrandsTranslationDiv").hide();
        $("#categoriesMain").hideLoading();
    }
    translationGetAllData(brandId, successCallback);
}