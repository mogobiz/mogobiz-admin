var catalogSelectedId = null;
var catalogSelectedName = null;
var catalogSelectedReadOnly = false;
var catalogSelectedMiraklEnv = false;
var catalogImported = false;
var catalogShowSecurity;

function catalogueLoadList() {
    var dataToSend = "format=html";
    $("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
    $.ajax({
        url: showCatalogUrl,
        type: "GET",
        data: dataToSend,
        dataType: "html",
        cache: false,
        async: true,
        success: function (pageContent, status) {
            $("#categoriesMain").hideLoading();
            $("#item").hide();
            $("#categoriesMain").show();
            $("#deleteCatalogLink, #exportCatalogLink, #searchProductCatalogLink").unbind().addClass("disabled");
            $("#catalogList").empty();
            $("#catalogList").append(pageContent);
            $("#catalogDropDownList").multiselect({
                header: false,
                multiple: false,
                noneSelectedText: multiselectNoneSelectedTextLabel,
                minWidth: 145,
                selectedList: 1
            }).bind("multiselectclick", function (event, ui) {
                setTimeout(function () {
                    $("#createProductMenu").detach().prependTo(document.body).hide();
                    $("#categoryDetails").empty();
                    catalogSelectedId = ui.value;
                    catalogSelectedName = ui.text;
                    catalogSelectedReadOnly = $("#catalogDropDownList option[value='" + catalogSelectedId + "']").attr("fromMirakl") == "true";
                    catalogSelectedMiraklEnv = null;
                    if(catalogSelectedReadOnly){
                        for(var i = 0; i < partnerCompanyMiraklEnv.length; i++){
                            if(partnerCompanyMiraklEnv[i].id == $("#catalogDropDownList option[value='" + catalogSelectedId + "']").attr("catalogMiraklEnvId")){
                                catalogSelectedMiraklEnv = partnerCompanyMiraklEnv[i];
                            }
                        }
                    }
                    categoryTreeDrawByCatalog(catalogSelectedId, catalogSelectedName, catalogSelectedReadOnly);
                }, 10);
            });
            if (catalogSelectedId != null) {
                $("#catalogDropDownList").multiselect("uncheckAll");
                $("#catalogDropDownList option").each(function () {
                    if (this.value == catalogSelectedId)
                        $(this).attr("selected", "selected");
                    else
                        $(this).removeAttr("selected");
                });
                $("#catalogDropDownList").multiselect("refresh");
                $("#categoriesMain .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_catalogDropDownList']").each(function () {
                    if (this.value == catalogSelectedId) {
                        $(this.parentNode).addClass("ui-state-active");
                        if (catalogImported) {
                            catalogImported = false;
                            this.click();
                        }
                    }
                });
                $("#catalogDropDownList").val(catalogSelectedId);
            }
        },
        error: function (response, status) {}
    });
}

function catalogGetCreatePage() {
    $.get(
        catalogCreatePageUrl,
        {},
        function (htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            catalogCreatePageSetup(htmlresponse);
        },
        "html"
    );
}

function catalogCreatePageSetup(htmlresponse) {
    if ($("#catalogCreateDialog").dialog("isOpen") !== true) {
        $("#catalogCreateDialog").empty();
        $("#catalogCreateDialog").html(htmlresponse);
        $("#catalogCreateDialog").dialog({
            title: catalogTitleLabel,
            modal: true,
            resizable: false,
            width: "530",
            height: "auto",
            open: function (event) {
                catalogCreatePageInitControls();
            },
            buttons: {
                cancelLabel: function () {
                    $("#catalogCreateDialog").dialog("close");
                },
                createLabel: function () {
                    if (catalogValidateCreateForm())
                        catalogAddNew();
                }
            }
        });
    }
}

function catalogCreatePageInitControls() {
    $("#catalogCreateActivationDate").datepicker("destroy");
    $("#catalogCreateActivationDate").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: new Date(),
        changeMonth: true,
        changeYear: true,
        firstDay: 1
    }).keydown(function () {
        return false;
    });
//    $("#catalogCreateChannels").multiselect("destroy");
//    $("#catalogCreateChannels").multiselect({
//        header: false,
//        noneSelectedText: multiselectNoneSelectedTextLabel,
//        selectedList: 3,
//        height: 100,
//        minWidth: 242
//    });
    var options = "<option value='-1'>None</option>";
    for(var i = 0; i < partnerCompanyMiraklEnv.length; i++){
        options += "<option value='" + partnerCompanyMiraklEnv[i].id + "'>" + partnerCompanyMiraklEnv[i].name + "</option>";
    }
    $("#catalogCreateMiraklEnv").html(options);
    $("#catalogCreateMiraklEnv").multiselect("destroy");
    $("#catalogCreateMiraklEnv").multiselect({
        header: false,
        multiple: false,
        noneSelectedText: multiselectNoneSelectedTextLabel,
        selectedList: 1,
        height: 100,
        minWidth: 242
    });
    $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
    $(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
    $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
    $(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
    $("#categoriesMain").hideLoading();
}

function catalogValidateCreateForm() {
    if ($("#catalogCreateName").val() == "" || $("#catalogCreateActivationDate").val() == "") {
        jQuery.noticeAdd({
            stayTime: 2000,
            text: fieldsRequiredMessageLabel,
            stay: false,
            type: "error"
        });
        return false;
    }
    return true;
}

function catalogAddNew() {
    $("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
//    var channels = $("#catalogCreateChannels").multiselect("getChecked");
//    var channelsStr = "";
//    for (var i = 0; i < channels.length; i++) {
//        if (channelsStr != "")
//            channelsStr += ",";
//        channelsStr += channels[i].value;
//    }
    var miraklEnvId = $("#catalogCreateMiraklEnv").val() != null && $("#catalogCreateMiraklEnv").val() != -1 ? $("#catalogCreateMiraklEnv").val() : "";
    var dataToSend = "catalog.name=" + encodeURIComponent($("#catalogCreateName").val()) + "&catalog.externalCode=" + encodeURIComponent($("#catalogCreateExternalCode").val());
    dataToSend += "&catalog.activationDate=" + $("#catalogCreateActivationDate").val() + "&catalog.description=" + encodeURIComponent($("#catalogCreateDescription").val());
//    dataToSend += "&catalog.channels=" + channelsStr + "&catalog.social=" + $("#catalogCreateSocial").is(":checked");
    dataToSend += "&miraklenv.id=" + miraklEnvId + "&format=json";
    $.ajax({
        url: createCatalogUrl,
        type: "POST",
        noticeType: "POST",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            catalogueLoadList();
            $("#catalogCreateDialog").dialog("close");
            $("#categoriesMain").hideLoading();
        },
        error: function (response, status) {
            $("#categoriesMain").hideLoading();
            jQuery.noticeAdd({
                stayTime: 2000,
                text: catalogUniqueNameLabel,
                stay: false,
                type: "error"
            });
        }
    });
}

function catalogGetTabPage() {
    $("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
    $("#createProductMenu").detach().prependTo(document.body).hide();
    $.get(
        catalogTabPageUrl,
        {},
        function (pageContent) {
            $("#categoryDetails").empty().html(pageContent);
            catalogInitAllTabs();
            catalogGeneralGetInfo();
            catalogTranslationDrawAll();
            if(catalogShowSecurity)
                securityGetAllUsers(sellerCompanyId, "catalogSecurityUsers", "updateCatalog", [sellerCompanyId, catalogSelectedId]);
        },
        "html"
    );
}

function catalogInitAllTabs() {
    $("#catalogPublishDiv, #catalogMarketplaceDiv, #catalogTranslationDiv, #catalogSecurityDiv").hide();
    catalogShowSecurity = ($("#catalogSecurityTab").length > 0);
    if(!catalogShowSecurity)
        $("#catalogSecurityDiv").remove();
    $("#catalogTabs .tabs a").unbind();
    $("#catalogTabs .tabs a").click(function () {
        $("#catalogTabs .tabs .selected").removeClass("selected");
        $(this).addClass("selected");
        switch ($(this).attr("id")) {
            case "catalogGeneralTab":
                $("#catalogPublishDiv").hide();
                $("#catalogMarketplaceDiv").hide();
                $("#catalogTranslationDiv").hide();
                $("#catalogSecurityDiv").hide();
                $("#catalogGeneralDiv").show();
                break;
            case "catalogPublishTab":
                $("#catalogGeneralDiv").hide();
                $("#catalogMarketplaceDiv").hide();
                $("#catalogTranslationDiv").hide();
                $("#catalogSecurityDiv").hide();
                $("#catalogPublishDiv").show();
                catalogPublishResetRunningInterval();
                break;
            case "catalogMarketplaceTab":
                $("#catalogGeneralDiv").hide();
                $("#catalogPublishDiv").hide();
                $("#catalogTranslationDiv").hide();
                $("#catalogSecurityDiv").hide();
                $("#catalogMarketplaceDiv").show();
                catalogMarketplaceResetRunningInterval();
                break;
            case "catalogTranslationTab":
                $("#catalogGeneralDiv").hide();
                $("#catalogPublishDiv").hide();
                $("#catalogMarketplaceDiv").hide();
                $("#catalogSecurityDiv").hide();
                $("#catalogTranslationDiv").show();
                break;
            case "catalogSecurityTab":
                $("#catalogGeneralDiv").hide();
                $("#catalogPublishDiv").hide();
                $("#catalogMarketplaceDiv").hide();
                $("#catalogTranslationDiv").hide();
                $("#catalogSecurityDiv").show();
                break;
            default:
                break;
        }
    });
    $("#catalogGeneralTab").addClass("selected");
    catalogPublishInitFields();
    catalogPublishInitControls();
    catalogInitMarketplaceFields();
    catalogInitMarketplaceControls();
}

function catalogGeneralGetInfo() {
    var dataToSend = "catalog.id=" + catalogSelectedId + "&format=json";
    $("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
    $.ajax({
        url: showCatalogUrl,
        type: "GET",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            catalogGeneralInitControls();
            catalogGeneralInitFields(response);
        },
        error: function (response, status) {}
    });
}

function catalogGeneralInitControls() {
    $("#catalogName, #catalogExternalCode, #catalogActivationDate, #catalogDescription/* ,#catalogSocial, #catalogChannels, */").unbind();
    $("#catalogActivationDate").datepicker("destroy");
    $("#catalogActivationDate").datepicker({
        onSelect: function (date) {
            catalogUpdate();
        },
        dateFormat: "yy-mm-dd",
        minDate: new Date(),
        changeMonth: true,
        changeYear: true,
        firstDay: 1
    }).keydown(function () {
        return false;
    });
//    $("#catalogChannels").multiselect("destroy");
//    $("#catalogChannels").multiselect({
//        header: false,
//        noneSelectedText: multiselectNoneSelectedTextLabel,
//        selectedList: 3,
//        height: 100,
//        minWidth: 239
//    });
    $("#catalogName, #catalogExternalCode, #catalogDescription").change(function () {
        if (catalogValidateForm())catalogUpdate();
    });
//    $("#catalogChannels").bind("multiselectbeforeclose", function () {
//        if (catalogValidateForm())catalogUpdate();
//    });
    /*$("#catalogSocial").click(function () {
        if (catalogValidateForm())catalogUpdate();
    });*/
}

function catalogGeneralInitFields(catalog) {
    $("#catalogName, #catalogExternalCode, #catalogDescription, #catalogActivationDate, /*#catalogChannels, */#catalogPublishListPublication, #catalogPublishListIndices").val("");
    $("#catalogName").val(catalog.name);
    $("#catalogExternalCode").val(catalog.externalCode);
    $("#catalogDescription").val(catalog.description);
    $("#catalogActivationDate").val(catalog.activationDate.substring(0, 10));
    /*if (catalog.social)
        $("#catalogSocial").prop("checked", true);*/

//    $("#catalogChannels").multiselect("uncheckAll");
//    $("#catalogChannels").multiselect("refresh");
//    var channels = (catalog.channels) ? catalog.channels.split(",") : [];
//    for (var i = 0; i < channels.length; i++) {
//        $("#catalogGeneralDiv .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_catalogChannels']").each(function () {
//            if (this.value == channels[i]) {
//                this.click();
//            }
//        });
//    }
}

function catalogValidateForm() {
    if ($("#catalogName").val() == "" || $("#catalogActivationDate").val() == "") {
        jQuery.noticeAdd({
            stayTime: 2000,
            text: fieldsRequiredMessageLabel,
            stay: false,
            type: "error"
        });
        return false;
    }
    return true;
}

function catalogUpdate() {
//    var channels = $("#catalogChannels").multiselect("getChecked");
//    var channelsStr = "";
//    for (var i = 0; i < channels.length; i++) {
//        if (channelsStr != "")
//            channelsStr += ",";
//        channelsStr += channels[i].value;
//    }
    var date = $("#catalogActivationDate").val();
    var dataToSend = "catalog.id=" + catalogSelectedId + "&catalog.name=" + encodeURIComponent($("#catalogName").val()) + "&catalog.externalCode=" + encodeURIComponent($("#catalogExternalCode").val());
    dataToSend += "&catalog.activationDate_year=" + date.substring(0, 4) + "&catalog.activationDate_month=" + date.substring(5, 7) + "&catalog.activationDate_day=" + date.substring(8, 10);
    dataToSend += "&catalog.description=" + encodeURIComponent($("#catalogDescription").val())/*  + "&catalog.channels=" + channelsStr+ "&catalog.social=" + $("#catalogSocial").is(":checked")*/;
    dataToSend += "&format=json";
    $.ajax({
        url: updateCatalogUrl,
        type: "POST",
        noticeType: "PUT",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            var selectedNode = $("#categoryTreeList").jstree("get_selected");
            $.jstree._focused().rename_node(selectedNode, $("#catalogName").val());
            catalogueLoadList();
            $("#catalogCreateDialog").dialog("close");
        },
        error: function (response, status) {
            jQuery.noticeAdd({
                stayTime: 2000,
                text: catalogUniqueNameLabel,
                stay: false,
                type: "error"
            });
        }
    });
}

function catalogDeleteConfirmation() {
    if ($("#catalogCreateDialog").dialog("isOpen") !== true) {
        $("#catalogCreateDialog").empty();
        $("#catalogCreateDialog").html(catalogConfirmDeleteMessage);
        $("#catalogCreateDialog").dialog({
            title: catalogTitleLabel,
            modal: true,
            resizable: false,
            width: "530",
            height: "auto",
            open:function(){
                $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
                $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").addClass("ui-delete-button");
                $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
                $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").html("<span class='ui-button-text'>" + deleteLabel + "</span>");
            },
            buttons: {
                cancelLabel: function () {
                    $("#catalogCreateDialog").dialog("close");
                },
                deleteLabel: function () {
                    catalogDelete();
                }
            }
        });
    }
}

function catalogDelete() {
    var dataToSend = "catalog.id=" + catalogSelectedId;
    dataToSend += "&format=json";
    $.ajax({
        url: deleteCatalogUrl,
        type: "POST",
        noticeType: "DELETE",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            catalogSelectedId = null;
            $("#categoryTree").empty();
            $("#categoryDetails").empty();
            catalogueLoadList();
        },
        error: function (response, status) {
            if (response.status == 401) {
                $.ajax({
                    url: markDeletedCatalogUrl,
                    type: "POST",
                    noticeType: "DELETE",
                    data: dataToSend,
                    dataType: "json",
                    cache: false,
                    async: true,
                    success: function (response, status) {
                        catalogSelectedId = null;
                        $("#categoryTree").empty();
                        $("#categoryDetails").empty();
                        catalogueLoadList();
                    },
                    error: function (response, status) {
                        jQuery.noticeAdd({
                            stayTime: 2000,
                            text: catalogDeleteEmptyLabel,
                            stay: false,
                            type: "error"
                        });
                    }
                });
            }
        }
    });
}

function catalogGetImportPage() {
    $.get(
        catalogImportPageUrl,
        {},
        function (htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            catalogImportPageSetup(htmlresponse);
        },
        "html"
    );
}

function catalogImportPageSetup(htmlresponse) {
    if ($("#catalogCreateDialog").dialog("isOpen") !== true) {
        $("#catalogCreateDialog").empty();
        $("#catalogCreateDialog").html(htmlresponse);
        $("#catalogCreateDialog").dialog({
            title: catalogTitleLabel,
            modal: true,
            resizable: false,
            width: "530",
            height: "auto",
            open: function (event) {
                catalogImportPageInitControls();
            },
            buttons: {
                cancelLabel: function () {
                    $("#catalogCreateDialog").dialog("close");
                },
                importLabel: function () {
                    if (catalogValidateImportForm())
                        catalogImport();
                }
            }
        });
    }
}

function catalogImportPageInitControls() {
    $("#catalogImportFile").val("");
    $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
    $(".ui-dialog-buttonpane").find("button:contains('importLabel')").addClass("ui-create-button");
    $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
    $(".ui-dialog-buttonpane").find("button:contains('importLabel')").html("<span class='ui-button-text'>" + importLabel + "</span>");
}

function catalogValidateImportForm() {
    $("#catalogImportError").html("");
    if ($("#catalogImportFile").val() == "") {
        jQuery.noticeAdd({
            stayTime: 2000,
            text: fieldsRequiredMessageLabel,
            stay: false,
            type: "error"
        });
        return false;
    }
    return true;
}

function catalogImport() {
    $("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
    document.getElementById("catalogImportForm").target = "catalogImportHiddenFrame"; // 'upload_target' is the name of the iframe
    document.getElementById("catalogImportForm").action = importCatalogUrl;
    document.getElementById("catalogImportForm").submit();
    document.getElementById("catalogImportHiddenFrame").onload = function () {
        var responseText = document.getElementById("catalogImportHiddenFrame").contentWindow.document.body.innerText;
        try {
            var cat = JSON.parse(responseText);
            catalogCheckImport(cat.id);
        }
        catch(e){
            $("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
            if(responseText.toLowerCase().indexOf("error:") == 0){
                $("#catalogImportError").html(responseText.substring(6));
            }
            else{
                $("#catalogImportError").html(catalogImportFailureLabel);
            }
        }
    }
}

function catalogCheckImport(catalogId){
    $.ajax({
    url: reportImportCatalogUrl ,
        type: "GET",
        data: "",
        cache: false,
        async: true,
        success: function (response, status) {
            $("#categoriesMain").hideLoading();
            catalogSelectedId = catalogId;
            catalogImported = true;
            catalogueLoadList();
            $("#catalogCreateDialog").dialog("close");
        },
        error: function (response, status) {
            if(response.status == "404") {
                setTimeout(function () {catalogCheckImport(catalogId);}, 10000);
            }
            else{
                $("#categoriesMain").hideLoading();
            }
        }
    });
}

function catalogExport() {
    var dataToSend = "catalog.id=" + catalogSelectedId;
    $("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
    $.ajax({
        url: exportCatalogUrl,
        type: "GET",
        data: dataToSend,
        cache: false,
        async: true,
        success: function (response, status) {
            catalogCheckExport(response);
        },
        error: function (response, status) {
            if(response.status == "403"){
                setTimeout(function() {catalogExport();}, 10000);
            }
            else{
                $("#categoriesMain").hideLoading();
            }
        }
    });
}

function catalogCheckExport(fileName) {
    var dataToSend = "export=" + fileName;
    $.ajax({
        url: exportCheckCatalogUrl,
        type: "GET",
        data: dataToSend,
        cache: false,
        async: true,
        success: function (response, status) {
            $("#categoriesMain").hideLoading();
            var html= catalogExportFinishLabel + " <a href='javascript:void(0)' onclick='catalogDownloadExported(\"" + fileName + "\")'>" + catalogExportDownloadLabel + "</a>";
            if ($("#catalogDownloadDialog").dialog("isOpen") !== true) {
                $("#catalogDownloadDialog").empty();
                $("#catalogDownloadDialog").html(html);
                $("#catalogDownloadDialog").dialog({
                    title: catalogTitleLabel,
                    modal: true,
                    resizable: false,
                    width: "500",
                    height: "80"
                });
            }
        },
        error: function (response, status) {
            if(response.status == "404") {
                setTimeout(function () {catalogCheckExport(fileName);}, 10000);
            }
            else{
                $("#categoriesMain").hideLoading();
            }
        }
    });
}

function catalogDownloadExported(fileName) {
    window.open(downloadExportedCatalogUrl + "?export=" + fileName);
    $("#catalogDownloadDialog").empty();
    $("#catalogDownloadDialog").dialog("close");
}

//TRANSLATION
var catalogTranslationGrid = null;

function catalogTranslationDrawAll() {
    catalogTranslationGrid = null;
    var successCallback = function (response) {
        var fields = ["name", "description"];
        $("#catalogTranslationAddLink").unbind();
        $("#catalogTranslationAddLink").bind("click", function () {
            var defaultsData = {name: $("#catalogName").val(), description: $("#catalogDescription").val()};
            translationGetCreatePage("catalog", catalogSelectedId, fields, defaultsData);
        });
        var columns = [{field: "name", title: translationNameGridLabel}, {
            field: "description",
            title: translationDescriptionGridLabel
        }];
        var data = [];
        for (var i = 0; i < response.length; i++) {
            var value = eval("(" + response[i].value + ")");
            data[data.length] = {
                "id": response[i].id,
                "targetId": catalogSelectedId,
                "translationType": "catalog",
                "lang": response[i].lang,
                "type": response[i].type,
                "name": value.name,
                "description": value.description
            }
        }
        var tabVisible = $("#catalogTranslationDiv").is(":visible");
        if (!tabVisible)
            $("#catalogTranslationDiv").show();

        catalogTranslationGrid = translationGetGrid("catalogTranslationGrid", catalogSelectedId, fields, columns, data);

        if (!tabVisible)
            $("#catalogTranslationDiv").hide();
        $("#categoriesMain").hideLoading();
    };
    translationGetAllData("catalog", catalogSelectedId, successCallback);
}

//publish functions
var catalogPublishRunningInterval = null;
var catalogPublishRunningIntervalTime = 3000;
var catalogPublishActiveEsEnv;
var catalogPublishActiveIndex;
var catalogPublishHistoryGrid = null;
var catalogPublishHistoryPageSize = 100;

function catalogPublishInitFields(){
    $("#catalogPublishListPublication, #catalogPublishListIndices").val("");

    var gridColumns = [{
        id : "env",
        name : catalogPublishHistoryEnvLabel,
        field : "env",
        width : 25,
        formatter: catalogPublishHistoryEnvFormatter,
        cssClass : "cell-title"
    },{
        id : "timestmap",
        name : catalogPublishHistoryTimeLabel,
        field : "timestamp",
        width : 30,
        cssClass : ""
    },{
        id : "success",
        name : catalogPublishHistoryStatusLabel,
        field : "success",
        formatter: catalogPublishHistoryStatusFormatter,
        width : 15,
        cssClass : ""
    },{
        id : "diff",
        name : catalogPublishHistoryDifferenceLabel,
        field : "diff",
        width : 15,
        formatter: catalogPublishHistoryDifferenceFormatter,
        cssClass : ""
    },{
        id : "items",
        name : catalogPublishHistoryItemsLabel,
        field : "items",
        width : 15,
        formatter: catalogPublishHistoryItemsFormatter,
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

    var tabVisible = $("#catalogPublishDiv").is(":visible");
    if(! tabVisible)
        $("#catalogPublishDiv").show();
    catalogPublishHistoryGrid = new Slick.Grid($("#catalogPublishHistoryGrid"), [], gridColumns, gridOptions);
    catalogPublishHistoryGrid.setSelectionModel(new Slick.RowSelectionModel());
    catalogPublishHistoryGrid.invalidate();
    if(! tabVisible)
        $("#catalogPublishDiv").hide();

    catalogPublishGetEsEnvList();
}

function catalogPublishHistoryEnvFormatter(row, cell, value, columnDef, dataContext){
    return dataContext.esEnv.name;
}

function catalogPublishHistoryStatusFormatter(row, cell, value, columnDef, dataContext){
    if (value)
        return catalogPublicationSuccessLabel;
    return "<a href='javascript:catalogPublishShowErrorReoprt(" + dataContext.historyId + ")'>" + catalogPublicationFailureLabel + "</a>";
}

function catalogPublishHistoryDifferenceFormatter(row, cell, value, columnDef, dataContext){
    if (dataContext.catalogs != null && dataContext.catalogs.length == 0)
        return trueLabel;
    return falseLabel;
}

function catalogPublishHistoryItemsFormatter(row, cell, value, columnDef, dataContext){
    if (dataContext.catalogs.length > 0 || dataContext.categories.length > 0 || dataContext.products.length > 0)
        return "<a href='javascript:catalogPublishShowDifferences(" + dataContext.historyId + ")'>" + catalogDetailsLabel + "</a>";
    return "";
}

function catalogPublishInitControls(){
    $("#catalogPublishBtn").unbind();
    $("#catalogPublishRunDifferences").prop("checked", false);
    $("#catalogPublishListPublication").multiselect("destroy");
    $("#catalogPublishListPublication").multiselect({
        header: false,
        multiple: false,
        noneSelectedText: multiselectNoneSelectedTextLabel,
        selectedList: 1,
        height: 100,
        minWidth: 265
    }).unbind().bind("multiselectclick", function (event, ui) {
        if(catalogPublishActiveEsEnv == ui.value)
            return;
        catalogPublishActiveEsEnv = ui.value;
        setTimeout(function(){
            catalogPublishResetRunningInterval();
            catalogPublishGetEsEnvPreviousIndices();
        }, 100);
    });
    $("#catalogPublishListIndices").multiselect("destroy");
    $("#catalogPublishListIndices").multiselect({
        header: false,
        multiple: false,
        noneSelectedText: multiselectNoneSelectedTextLabel,
        selectedList: 1,
        height: 100,
        minWidth: 265
    }).unbind().bind("multiselectclick", function (event, ui) {
        if(catalogPublishActiveIndex == ui.value)
            return;
        catalogPublishActiveIndex = ui.value;
        setTimeout(function(){
            catalogPublishChangeActiveIndex();
        }, 100);
    });
    $("#catalogPublishBtn").click(function () {
        catalogPublishCheckCondition();
    });
    $("#catalogPublishRefreshHistory").click(function () {
        catalogPublishGetHistory(0);
    });
    catalogPublishGetHistory(0);
}

function catalogPublishGetEsEnvList(){
    $.ajax({
        url: companyShowPublishingUrl,
        type: "GET",
        data: "format=html",
        cache: false,
        async: true,
        success: function (response, status) {
            $("#catalogPublishListPublication").html(response);
            $("#catalogPublishListPublication").multiselect("refresh");
            $('#catalogPublishDiv .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_catalogPublishListPublication"]').each(function() {
                if(this.value == $("#catalogPublishListPublication").val()) {
                    catalogPublishActiveEsEnv = this.value;
                    this.click();
                }
            });
            if(response.indexOf("<option") >= 0) {
                catalogPublishGetEsEnvPreviousIndices();
            }
            else{
                $("#categoriesMain").hideLoading();
            }
        },
        error: function (response, status) {}
    });
}

function catalogPublishResetRunningInterval() {
    catalogPublishCheckEsEnvRunning();
    if (catalogPublishRunningInterval)
        clearInterval(catalogPublishRunningInterval);
    catalogPublishRunningInterval = setInterval(function () {
        if ($("#catalogPublishDiv").is(":visible")) {
            catalogPublishCheckEsEnvRunning();
        }
        else {
            clearInterval(catalogPublishRunningInterval);
            catalogPublishRunningInterval = null;
        }
    }, catalogPublishRunningIntervalTime);
}

function catalogPublishCheckEsEnvRunning() {
    if($("#catalogPublishListPublication").val() == null)
        return;
    var dataToSend = "esenv.id=" + $("#catalogPublishListPublication").val() + "&format=json";
    $.ajax({
        url: companyShowPublishingUrl,
        type: "GET",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            var html = "";
            if (response.running) {
                $("#catalogPublishBtn").unbind().addClass("disabled_btn").removeClass("fk_ok_btn");
                $("#catalogPublishListPublication").multiselect("disable");
                $("#catalogPublishRefreshHistory").unbind().addClass("disabled");
                $("#catalogPublishRunDifferences").attr("disabled", "disabled");
                html = catalogPublicationRunningLabel;
            }
            else {
                $("#catalogPublishBtn").unbind().bind("click", function () {catalogPublishCheckCondition();}).addClass("fk_ok_btn").removeClass("disabled_btn");
                $("#catalogPublishRefreshHistory").unbind().bind("click", function () {catalogPublishGetHistory(0);}).removeClass("disabled");
                $("#catalogPublishRunDifferences").removeAttr("disabled");
                $("#catalogPublishListPublication").multiselect("enable");
                html = catalogLastPublicationLabel + " : ";
                if (response.success)
                    html += catalogPublicationSuccessLabel;
                else
                    html += catalogPublicationFailureLabel;
                if (response.extra != null && response.extra != "")
                    html += " (" + response.extra + ")"
            }
            $("#catalogPublishLastPublicationStatus").html(html);
        },
        error: function (response, status) {}
    });
}

function catalogPublishGetEsEnvPreviousIndices(){
    $.ajax({
        url: companyShowPublishingPreviousIndicesUrl,
        type: "GET",
        data: "envId=" + $("#catalogPublishListPublication").val() + "&format=json",
        cache: false,
        async: true,
        success: function (response, status) {
            $.ajax({
                url: companyShowPublishingUrl,
                type: "GET",
                data: "esenv.id=" + $("#catalogPublishListPublication").val() + "&format=json",
                dataType: "json",
                cache: false,
                async: true,
                success: function (resp, status) {
                    var founded = false;
                    var html = "";
                    var indices = response.previousIndices;
                    catalogPublishActiveIndex = null;
                    for(var i = 0; i < indices.length; i++){
                        if(indices[i] == resp.activeIndex)
                            founded = true;
                        html += "<option value='" + indices[i] + "'>" + indices[i] + "</option>";
                    }
                    if(resp.activeIndex != null && resp.activeIndex != "") {
                        catalogPublishActiveIndex = resp.activeIndex;
                        if(!founded)
                            html = "<option value='" + resp.activeIndex + "'>" + resp.activeIndex + "</option>" + html;
                    }
                    else if(resp.idx != null && resp.idx != "") {
                        catalogPublishActiveIndex = resp.idx;
                        if(!founded)
                            html = "<option value='" + resp.activeIndex + "'>" + resp.activeIndex + "</option>" + html;
                    }
                    else{
                        html = "<option></option>" + html;
                    }

                    $("#catalogPublishListIndices").empty().html(html);
                    $("#catalogPublishListIndices").multiselect("enable").multiselect("refresh");
                    $('#catalogPublishDiv .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_catalogPublishListIndices"]').each(function () {
                        if (this.value == catalogPublishActiveIndex) {
                            $(this.parentNode).addClass("ui-state-active");
                            this.click();
                        }
                    });
                    $("#categoriesMain").hideLoading();
                },
                error: function (response, status) {}
            });
        },
        error: function (response, status) {
            jQuery.noticeAdd({
                stayTime: 2000,
                text: elasticsearchServerError,
                stay: false,
                type: "error"
            });
            $("#categoriesMain").hideLoading();
            $("#catalogPublishListIndices").empty().multiselect("disable");
        }
    });
}

function catalogPublishChangeActiveIndex() {
    var dataToSend = "envId=" + $("#catalogPublishListPublication").val() + "&index=" + $("#catalogPublishListIndices").val() + "&format=json";
    $.ajax({
        url: companyUpdatePublishingIndicesUrl,
        type: "POST",
        noticeType: "PUT",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {},
        error: function (response, status) {}
    });
}

function catalogPublishCheckCondition(){
    if($("#catalogPublishRunDifferences").is(":checked"))
        catalogPublishPrepareSynchronization();
    else
        catalogPublish();
}

function catalogPublishPrepareSynchronization(){
    var dataToSend = "catalog.id=" + catalogSelectedId + "&esenv.id=" + $("#catalogPublishListPublication").val();
    dataToSend += "&format=json";
    $.ajax({
        url: prepareSynchronizationCatalogUrl,
        type: "GET",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            response = prepareSyncResponse;
            if(response.syncRequired) {
                catalogPublishGetSynchronizationPage(response);
            }
            else{
                if ($("#catalogPublishDialog").dialog("isOpen") !== true) {
                    $("#catalogPublishDialog").empty();
                    $("#catalogPublishDialog").html(catalogPublishDiffEmptyMessage);
                    $("#catalogPublishDialog").dialog({
                        title: catalogPublishDiffTitleLabel,
                        modal: true,
                        resizable: false,
                        width: "500",
                        height: "auto",
                        open: function (event) {
                            $(".ui-dialog-buttonpane").find("button:contains('closeLabel')").html("<span class='ui-button-text'>" + closeLabel + "</span>");
                            $(".ui-dialog-buttonpane").find("button:contains('closeLabel')").addClass("ui-cancel-button");
                        },
                        buttons: {
                            closeLabel: function () {
                                $("#catalogPublishDialog").dialog("close");
                            }
                        }
                    });
                }
            }
        },
        error: function (response, status) {
            if (response.status == 400) {
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: response.responseText,
                    stay: false,
                    type: "error"
                });
            }
        }
    });
}

function catalogPublishGetSynchronizationPage(object){
    $.get(
        catalogSynchronizationPageUrl,
        {},
        function (htmlResponse) {
            htmlresponse = jQuery.trim(htmlResponse);
            catalogPublishSynchronizationPageSetup(htmlresponse, object);
        },
        "html"
    );
}

function catalogPublishSynchronizationPageSetup(htmlResponse, object){
    if ($("#catalogPublishDialog").dialog("isOpen") !== true) {
        $("#catalogPublishDialog").empty();
        $("#catalogPublishDialog").html(htmlResponse);
        $("#catalogPublishDialog").dialog({
            title: catalogPublishDiffTitleLabel,
            modal: true,
            resizable: false,
            width: "520",
            height: "auto",
            open: function (event) {
                catalogPublishSynchronizationInitFields(object);
            },
            buttons: {
                closeLabel: function () {
                    $("#catalogPublishDialog").dialog("close");
                },
                applyLabel: function () {
                    if(catalogPublishSynchronizationValidatePage()) {
                        $("#catalogPublishDialog").dialog("close");
                        catalogPublish();
                    }
                }
            }
        });
    }
}

function catalogPublishSynchronizationInitFields(object){
    $("#catalogSynchronizationCategories").multiselectSlides({
        right: "#catalogSynchronizationCategories_to",
        rightAll: "#catalogSynchronizationCategories_right_All",
        rightSelected: "#catalogSynchronizationCategories_right_Selected",
        leftSelected: "#catalogSynchronizationCategories_left_Selected",
        leftAll: "#catalogSynchronizationCategories_left_All"
    });

    $("#catalogSynchronizationProducts").multiselectSlides({
        right: "#catalogSynchronizationProducts_to",
        rightAll: "#catalogSynchronizationProducts_right_All",
        rightSelected: "#catalogSynchronizationProducts_right_Selected",
        leftSelected: "#catalogSynchronizationProducts_left_Selected",
        leftAll: "#catalogSynchronizationProducts_left_All"
    });
    var categories = object.categories;
    var products = object.products;
    for(var i = 0; i < categories.length; i++){
        $("#catalogSynchronizationCategories").append($("<option></option>").attr("value", categories[i].id).text(categories[i].name));
    }
    for(var i = 0; i < products.length; i++){
        $("#catalogSynchronizationProducts").append($("<option></option>").attr("value", products[i].id).text(products[i].name));
    }
    $(".ui-dialog-buttonpane").find("button:contains('closeLabel')").addClass("ui-cancel-button");
    $(".ui-dialog-buttonpane").find("button:contains('applyLabel')").addClass("ui-create-button");
    $(".ui-dialog-buttonpane").find("button:contains('closeLabel')").html("<span class='ui-button-text'>" + closeLabel + "</span>");
    $(".ui-dialog-buttonpane").find("button:contains('applyLabel')").html("<span class='ui-button-text'>" + applyLabel + "</span>");
}

function catalogPublishSynchronizationValidatePage(){
    if($("#catalogSynchronizationProducts_to option").length == 0 && $("#catalogSynchronizationCategories_to option").length == 0) {
        jQuery.noticeAdd({
            stayTime: 2000,
            text: catalogPublishDiffErrorMessage,
            stay: false,
            type: "error"
        });
        return false;
    }
    return true;
}

function catalogPublish() {
    $("#catalogPublishLastPublicationStatus").show().html("");
    $("#catalogPublicationError").hide();
    $("#catalogPublishBtn").unbind().addClass("disabled_btn").removeClass("fk_ok_btn");
    $("#catalogPublishListPublication").multiselect("disable");
    var action = publishCatalogUrl;
    var dataToSend = "catalog.id=" + catalogSelectedId + "&esenv.id=" + $("#catalogPublishListPublication").val();
    if($("#catalogPublishRunDifferences").is(":checked")){
        action = synchronizeCatalogUrl;
        var productIds = "";
        var categoriesIds = "";
        $("#catalogSynchronizationProducts_to option").each(function(index, value){
            productIds += (productIds != "") ? "," + value.value : value.value;
        });
        $("#catalogSynchronizationCategories_to option").each(function(index, value){
            categoriesIds += (categoriesIds != "") ? "," + value.value : value.value;
        });
        dataToSend += productIds != "" ? "&products.id=" + productIds : "";
        dataToSend += categoriesIds != "" ? "&categories.id=" + categoriesIds : "";
    }
    dataToSend += "&format=json";
    $.ajax({
        url: action,
        type: "GET",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            setTimeout(function() {
                catalogPublishGetEsEnvPreviousIndices();
                catalogPublishGetHistory(0);
            }, 2000);
        },
        error: function (response, status) {
            catalogPublishResetRunningInterval();
            if(response.status == "403"){
                $("#catalogPublicationError").show().html(catalogPublicationFailureLabel + ": " + response.responseText);
                $("#catalogPublishLastPublicationStatus").hide();
            }
        }
    });
}

function catalogPublishGetHistory(offset) {
    var dataToSend = "catalog.id=" + catalogSelectedId + "&pageOffset=" + offset + "&pageSize=" + catalogPublishHistoryPageSize + "&format=json";
    $.ajax({
        url: refreshSynchronizationCatalogUrl,
        type: "GET",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            var gridData = [];
            if (response.list) {
                for (var i = 0; i < response.list.length; i++) {
                    gridData[gridData.length] = {
                        "id": i,
                        "catalogs": response.list[i].catalogs,
                        "success": response.list[i].success,
                        "report": response.list[i].report,
                        "categories": response.list[i].categories,
                        "esEnv": response.list[i].esEnv,
                        "historyId": response.list[i].id,
                        "products": response.list[i].products,
                        "timestamp": response.list[i].timestamp,
                        "target": response.list[i].target
                    }
                }
            }
            catalogPublishHistoryGrid.setData(gridData);
            catalogPublishHistoryGrid.invalidate();

            var tabVisible = $("#catalogPublishDiv").is(":visible");
            if (!tabVisible)
                $("#catalogPublishDiv").show();
            if (response.totalCount > 0) {
                $("#catalogPublishHistoryPagination").paginate({
                    count: response.pageCount,
                    start: response.pageOffset + 1,
                    display: 27,
                    border: true,
                    border_color: "#A6C9E2",
                    text_color: "#075899",
                    background_color: "#FFFFFF",
                    border_hover_color: "#A6C9E2",
                    text_hover_color: "#FFFFFF",
                    background_hover_color: "#6D84B4",
                    rotate: true,
                    images: true,
                    mouse: "press",
                    onChange: function (page) {
                        catalogPublishGetHistory(page - 1)
                    }
                });
                var margin = $("#catalogPublishHistoryPagination").parent().parent().width() - $("#catalogPublishHistoryPagination .jPag-control-back").width() - $("#catalogPublishHistoryPagination .jPag-control-center").width() - $("#catalogPublishHistoryPagination .jPag-control-front").width() - 7;
                $("#catalogPublishHistoryPagination").css("margin-left", margin);
            }
            else {
                $("#catalogPublishHistoryPagination").empty();
            }
            if (!tabVisible)
                $("#catalogPublishDiv").hide();
        },
        error: function (response, status) {
            if (response.status == 400) {
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: response.responseText,
                    stay: false,
                    type: "error"
                });
            }
        }
    });
}

function catalogPublishShowDifferences(historyId){
    var data = catalogPublishHistoryGrid.getData();
    var differences = {
        catalogs : [],
        categories : [],
        products : []
    };
    for(var i = 0; i < data.length; i++){
        if(data[i].historyId == historyId){
            if(data[i].catalogs.length > 0)
                differences.catalogs = data[i].catalogs;
            if(data[i].categories.length > 0)
                differences.categories = data[i].categories;
            if(data[i].products.length > 0)
                differences.products = data[i].products;
            break;
        }
    }
    if ($("#catalogPublishDialog").dialog("isOpen") !== true) {
        $("#catalogPublishDialog").empty();
        $("#catalogPublishDialog").dialog({
            title: catalogPublishHistoryDifferenceLabel,
            modal: true,
            resizable: false,
            width: "500",
            height: "auto",
            open: function (event) {
                var html = "";
                if(differences.catalogs.length > 0){
                    html += "<h2>" + catalogCatalogsLabel + "</h2>";
                    for(var i = 0; i < differences.catalogs.length; i++){
                        html += "<div style='padding-left: 10px;'>&bullet;&nbsp;" + differences.catalogs[i].name + "</div>";
                    }
                }
                if(differences.categories.length > 0){
                    html += html != "" ? "<br/>" : "";
                    html += "<h2>" + catalogCategoriesLabel + "</h2>";
                    for(var i = 0; i < differences.categories.length; i++){
                        html += "<div style='padding-left: 10px;'>&bullet;&nbsp;" + differences.categories[i].name + "</div>";
                    }
                }
                if(differences.products.length > 0){
                    html += html != "" ? "<br/>" : "";
                    html += "<h2>" + catalogProductsLabel + "</h2>";
                    for(var i = 0; i < differences.products.length; i++){
                        html += "<div style='padding-left: 10px;'>&bullet;&nbsp;" + differences.products[i].name + "</div>";
                    }
                }
                $("#catalogPublishDialog").html(html);
                $(".ui-dialog-buttonpane").find("button:contains('closeLabel')").html("<span class='ui-button-text'>" + closeLabel + "</span>");
                $(".ui-dialog-buttonpane").find("button:contains('closeLabel')").addClass("ui-cancel-button");
            },
            buttons: {
                closeLabel: function () {
                    $("#catalogPublishDialog").dialog("close");
                }
            }
        });
    }
}

function catalogPublishShowErrorReoprt(historyId){
    var data = catalogPublishHistoryGrid.getData();
    var error = "";
    for(var i = 0; i < data.length; i++){
        if(data[i].historyId == historyId){
            error = data[i].report != null ? data[i].report : "Report is null";
            break;
        }
    }
    if ($("#catalogPublishDialog").dialog("isOpen") !== true && error != "") {
        $("#catalogPublishDialog").empty();
        $("#catalogPublishDialog").html(error);
        $("#catalogPublishDialog").dialog({
            title: catalogErrorReportTitleLabel,
            modal: true,
            resizable: false,
            width: "500",
            height: "auto",
            open: function (event) {
                $(".ui-dialog-buttonpane").find("button:contains('closeLabel')").html("<span class='ui-button-text'>" + closeLabel + "</span>");
                $(".ui-dialog-buttonpane").find("button:contains('closeLabel')").addClass("ui-cancel-button");
            },
            buttons: {
                closeLabel: function () {
                    $("#catalogPublishDialog").dialog("close");
                }
            }
        });
    }
}

//Marketplace functions
var catalogMarketplaceReportsGrid = null;
var catalogMarketplaceRunningInterval = null;
var catalogMarketplaceRunningIntervalTime = 3000;
var catalogMarketplaceReportsPageSize = 100;

function catalogMarketplaceFillMiraklEnv(){
    var options = "<option value=''>None</option>";
    for(var i = 0; i < partnerCompanyMiraklEnv.length; i++){
        options += "<option value='" + partnerCompanyMiraklEnv[i].id + "'>" + partnerCompanyMiraklEnv[i].name + "</option>";
    }
    $("#catalogListMiraklEnv").empty().html(options).multiselect("destroy").multiselect({
        header: false,
        multiple: false,
        noneSelectedText: multiselectNoneSelectedTextLabel,
        selectedList: 1,
        height: 100,
        minWidth: 170
    }).unbind();
    if(catalogSelectedReadOnly) {
        $("#catalogListMiraklEnv").val(catalogSelectedMiraklEnv.id).multiselect("refresh").multiselect("disable");
    }
    else{
        $("#catalogListMiraklEnv").bind("multiselectclick", function (event, ui) {
            $("#catalogMarketplacePublishBtn").unbind().addClass("disabled_btn").removeClass("fk_ok_btn");
            $("#catalogMarketplaceRefreshBtn").unbind().addClass("disabled_btn").removeClass("fk_ok_btn");
            $("#catalogMarketplaceRefreshReports").unbind().addClass("disabled");
            setTimeout(function () {
                catalogMarketplaceResetRunningInterval();
            }, 100);
        });
    }
}

function catalogInitMarketplaceFields(){
    catalogMarketplaceFillMiraklEnv();
    var gridColumns = [{
        id : "trackingId",
        name : catalogMiraklReportTrackingLabel,
        field : "trackingId",
        width : 15,
        cssClass : "cell-title"
    },{
        id : "timeStamp",
        name : catalogMiraklReportTimeLabel,
        field : "timeStamp",
        width : 25,
        cssClass : ""
    },{
        id : "type",
        name : catalogMiraklReportTypeLabel,
        field : "type",
        width : 25,
        cssClass : ""
    },{
        id : "status",
        name : catalogMiraklReportStatusLabel,
        field : "status",
        width : 13,
        cssClass : ""
    },{
        id : "linesInSuccess",
        name : catalogMiraklReportSuccessLabel,
        field : "linesInSuccess",
        width : 12,
        cssClass : "cell-centered"
    },{
        id : "linesInError",
        name : catalogMiraklReportErrorLabel,
        field : "linesInError",
        width : 10,
        formatter : catalogMarketplaceGridErrorFormatter,
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

    var tabVisible = $("#catalogMarketplaceDiv").is(":visible");
    if(! tabVisible)
        $("#catalogMarketplaceDiv").show();
    catalogMarketplaceReportsGrid = new Slick.Grid($("#catalogMarketplaceReportsGrid"), [], gridColumns, gridOptions);
    catalogMarketplaceReportsGrid.setSelectionModel(new Slick.RowSelectionModel());
    catalogMarketplaceReportsGrid.invalidate();
    if(! tabVisible)
        $("#catalogMarketplaceDiv").hide();
}

function catalogInitMarketplaceControls(){
    if($("#catalogListMiraklEnv").val() == null || $("#catalogListMiraklEnv").val() == ""){
        $("#catalogMarketplacePublishBtn").unbind().addClass("disabled_btn").removeClass("fk_ok_btn");
        $("#catalogMarketplaceRefreshBtn").unbind().addClass("disabled_btn").removeClass("fk_ok_btn");
        $("#catalogMarketplaceRefreshReports").unbind().addClass("disabled");
    }
    else {
        $("#catalogMarketplacePublishBtn").unbind().bind("click", function () {
            catalogMarketplacePublish();
        });
        $("#catalogMarketplaceRefreshBtn").unbind().bind("click", function () {
            catalogMarketplaceRefresh();
        });
        $("#catalogMarketplaceRefreshReports").unbind().bind("click", function () {
            catalogMarketplaceGetAllReports(0);
        });
        catalogMarketplaceGetAllReports(0);
    }
}

function catalogMarketplaceResetRunningInterval() {
    catalogCheckMarketplaceEnvRunning();
    if (catalogMarketplaceRunningInterval)
        clearInterval(catalogMarketplaceRunningInterval);
    catalogMarketplaceRunningInterval = setInterval(function () {
        if ($("#catalogMarketplaceDiv").is(":visible")) {
            catalogCheckMarketplaceEnvRunning();
        }
        else {
            clearInterval(catalogMarketplaceRunningInterval);
            catalogMarketplaceRunningInterval = null;
        }
    }, catalogMarketplaceRunningIntervalTime);
}

function catalogCheckMarketplaceEnvRunning() {
    if($("#catalogListMiraklEnv").val() == null || $("#catalogListMiraklEnv").val() == "")
        return;
    var dataToSend = "miraklenv.id=" + $("#catalogListMiraklEnv").val() + "&format=json";
    $.ajax({
        url: companyShowMiraklUrl,
        type: "GET",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            if (response.running) {
                $("#catalogMarketplacePublishBtn").unbind().addClass("disabled_btn").removeClass("fk_ok_btn");
                $("#catalogMarketplaceRefreshBtn").unbind().addClass("disabled_btn").removeClass("fk_ok_btn");
                $("#catalogMarketplaceRefreshReports").unbind().addClass("disabled");
                $("#catalogListMiraklEnv").multiselect("disable");
            }
            else {
                $("#catalogMarketplacePublishBtn").unbind().bind("click", function () {catalogMarketplacePublish();}).addClass("fk_ok_btn").removeClass("disabled_btn");
                $("#catalogMarketplaceRefreshBtn").unbind().bind("click", function () {catalogMarketplaceRefresh();}).addClass("fk_ok_btn").removeClass("disabled_btn");
                $("#catalogMarketplaceRefreshReports").unbind().bind("click", function () {catalogMarketplaceGetAllReports(0);}).removeClass("disabled");
                if(!catalogSelectedReadOnly)
                    $("#catalogListMiraklEnv").multiselect("enable");
            }
        },
        error: function (response, status) {}
    });
}

function catalogMarketplacePublish(){
    $("#catalogMarketplacePublishBtn").unbind().addClass("disabled_btn").removeClass("fk_ok_btn");
    $("#catalogMarketplaceRefreshBtn").unbind().addClass("disabled_btn").removeClass("fk_ok_btn");
    $("#catalogMarketplaceRefreshReports").unbind().addClass("disabled");
    $("#catalogListMiraklEnv").multiselect("disable");
    var dataToSend = "catalog.id=" + catalogSelectedId + "&miraklenv.id=" + $("#catalogListMiraklEnv").val();
    dataToSend += "&format=json";
    $.ajax({
        url: catalogMarketplacePublishUrl,
        type: "GET",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            catalogMarketplaceGetAllReports(0);
        },
        error: function (response, status) {
            catalogMarketplaceResetRunningInterval();
            var message = response.responseText;
            if(response.statusCode == 401){
                message = catalogMiraklUnauthorizedMessage;
            }
            jQuery.noticeAdd({
                stayTime: 2000,
                text: message,
                stay: false,
                type: "error"
            });
        }
    });
}

function catalogMarketplaceRefresh(){
    var dataToSend = "catalog.id=" + catalogSelectedId + "&format=json";
    $.ajax({
        url: catalogMarketplaceRefreshUrl,
        type: "GET",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {},
        error: function (response, status) {
            if(response.statusCode == 400){
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: response.responseText,
                    stay: false,
                    type: "error"
                });
            }
        }
    });
}

function catalogMarketplaceGetAllReports(offset){
    var dataToSend = "catalog.id=" + catalogSelectedId + "&pageOffset=" + offset + "&pageSize=" + catalogMarketplaceReportsPageSize + "&format=json";
    $.ajax({
        url: catalogMarketplaceReportsUrl,
        type: "GET",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            var reportsStatus = {
                "PRODUCTS_SYNCHRO": catalogMiraklReportStatusProductsSyncLabel,
                "PRODUCTS": catalogMiraklReportStatusProductsLabel,
                "OFFERS": catalogMiraklReportStatusOffersLabel
            };
            var gridData = [];
            if(response.list){
                for ( var i = 0; i < response.list.length; i++) {
                    gridData[gridData.length] = {
                        "id" : i,
                        "trackingId": response.list[i].trackingId,
                        "shopId": response.list[i].miraklEnv.shopId,
                        "timeStamp": response.list[i].timestamp,
                        "status": response.list[i].status.name,
                        "type": reportsStatus[response.list[i].type.name],
                        "linesInSuccess": response.list[i].linesInSuccess,
                        "linesInError": response.list[i].linesInError,
                        "errorReport": response.list[i].errorReport
                    }
                }
            }
            catalogMarketplaceReportsGrid.setData(gridData);
            catalogMarketplaceReportsGrid.invalidate();

            var tabVisible = $("#catalogMarketplaceDiv").is(":visible");
            if(! tabVisible)
                $("#catalogMarketplaceDiv").show();
            if(response.totalCount > 0) {
                $("#catalogMarketplaceReportsPagination").paginate({
                    count: response.pageCount,
                    start: response.pageOffset + 1,
                    display: 27,
                    border: true,
                    border_color: "#A6C9E2",
                    text_color: "#075899",
                    background_color: "#FFFFFF",
                    border_hover_color: "#A6C9E2",
                    text_hover_color: "#FFFFFF",
                    background_hover_color: "#6D84B4",
                    rotate: true,
                    images: true,
                    mouse: "press",
                    onChange: function (page) {
                        catalogMarketplaceGetAllReports(page - 1)
                    }
                });
                var margin = $("#catalogMarketplaceReportsPagination").parent().parent().width() - $("#catalogMarketplaceReportsPagination .jPag-control-back").width() - $("#catalogMarketplaceReportsPagination .jPag-control-center").width() - $("#catalogMarketplaceReportsPagination .jPag-control-front").width() - 7;
                $("#catalogMarketplaceReportsPagination").css("margin-left", margin);
            }
            else{
                $("#catalogMarketplaceReportsPagination").empty();
            }
            if(! tabVisible)
                $("#catalogMarketplaceDiv").hide();
        },
        error: function (response, status) {
            if(response.status == 400){
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: response.responseText,
                    stay: false,
                    type: "error"
                });
            }
        }
    });
}

function catalogMarketplaceGridErrorFormatter(row, cell, value, columnDef, dataContext){
    if(dataContext.errorReport != null && dataContext.errorReport != "")
        return "<a class='catalog-report-budge' href='javascript:catalogMarketplaceShowErrorReport(" + dataContext.trackingId + ")'>" + value + "</a>";
    return value;
}

function catalogMarketplaceShowErrorReport(trackingId){
    var data = catalogMarketplaceReportsGrid.getData();
    var error = "";
    for(var i = 0; i < data.length; i++){
        if(data[i].trackingId == trackingId){
            error = data[i].errorReport;
            break;
        }
    }
    if ($("#catalogMarketplaceErrorReportDialog").dialog("isOpen") !== true && error != "") {
        $("#catalogMarketplaceErrorReportDialog").empty();
        $("#catalogMarketplaceErrorReportDialog").html(error);
        $("#catalogMarketplaceErrorReportDialog").dialog({
            title: catalogErrorReportTitleLabel,
            modal: true,
            resizable: false,
            width: "500",
            height: "auto",
            open: function (event) {
                $(".ui-dialog-buttonpane").find("button:contains('closeLabel')").html("<span class='ui-button-text'>" + closeLabel + "</span>");
                $(".ui-dialog-buttonpane").find("button:contains('closeLabel')").addClass("ui-cancel-button");
            },
            buttons: {
                closeLabel: function () {
                    $("#catalogMarketplaceErrorReportDialog").dialog("close");
                }
            }
        });
    }
}