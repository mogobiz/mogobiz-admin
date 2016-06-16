var catalogSelectedId = null;
var catalogSelectedName = null;
var catalogImported = false;
var catalogRunningInterval = null;
var catalogRunningIntervalTime = 10000;
var catalogShowSecurity;
var catalogActiveEsEnv;
var catalogActiveIndex;

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
                    categoryTreeDrawByCatalog(catalogSelectedId, catalogSelectedName);
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
                catalogGeneralInitControls(true);
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
    $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
    $(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
    $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
    $(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
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
//    var channels = $("#catalogCreateChannels").multiselect("getChecked");
//    var channelsStr = "";
//    for (var i = 0; i < channels.length; i++) {
//        if (channelsStr != "")
//            channelsStr += ",";
//        channelsStr += channels[i].value;
//    }
    var dataToSend = "catalog.name=" + encodeURIComponent($("#catalogCreateName").val()) + "&catalog.externalCode=" + encodeURIComponent($("#catalogCreateExternalCode").val());
    dataToSend += "&catalog.activationDate=" + $("#catalogCreateActivationDate").val() + "&catalog.description=" + encodeURIComponent($("#catalogCreateDescription").val());
//    dataToSend += "&catalog.channels=" + channelsStr + "&catalog.social=" + $("#catalogCreateSocial").is(":checked");
    dataToSend += "&format=json";
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
    $("#catalogTranslationDiv").hide();
    $("#catalogSecurityDiv").hide();
    catalogShowSecurity = ($("#catalogSecurityTab").length > 0);
    if(!catalogShowSecurity)
        $("#catalogSecurityDiv").remove();
    $("#catalogTabs .tabs a").unbind();
    $("#catalogTabs .tabs a").click(function () {
        $("#catalogTabs .tabs .selected").removeClass("selected");
        $(this).addClass("selected");
        switch ($(this).attr("id")) {
            case "catalogGeneralTab":
                $("#catalogTranslationDiv").hide();
                $("#catalogSecurityDiv").hide();
                $("#catalogGeneralDiv").show();
                catalogResetRunningInterval();
                break;
            case "catalogTranslationTab":
                $("#catalogGeneralDiv").hide();
                $("#catalogSecurityDiv").hide();
                $("#catalogTranslationDiv").show();
                break;
            case "catalogSecurityTab":
                $("#catalogGeneralDiv").hide();
                $("#catalogTranslationDiv").hide();
                $("#catalogSecurityDiv").show();
                break;
            default:
                break;
        }
    });
    $("#catalogGeneralTab").addClass("selected");
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
            catalogGeneralInitControls(false);
            catalogGeneralInitFields(response);
            catalogGetEsEnvList();
        },
        error: function (response, status) {}
    });
}

function catalogGetEsEnvList(){
    $.ajax({
        url: companyShowPublishingUrl,
        type: "GET",
        data: "format=html",
        cache: false,
        async: true,
        success: function (response, status) {
            $("#catalogListPublication").html(response);
            $("#catalogListPublication").multiselect("refresh");
            $('#catalogGeneralDiv .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_catalogListPublication"]').each(function() {
                if(this.value == $("#catalogListPublication").val()) {
                    catalogActiveEsEnv = this.value;
                    this.click();
                }
            });
            if(response.indexOf("<option") >= 0) {
                catalogResetRunningInterval();
                catalogGetEsEnvPreviousIndices();
            }
            else{
                $("#categoriesMain").hideLoading();
            }
        },
        error: function (response, status) {}
    });
}

function catalogGeneralInitControls(isCreate) {
    $("#catalogName, #catalogExternalCode, #catalogActivationDate, #catalogDescription, /*#catalogSocial, #catalogChannels, */#catalogPublishBtn").unbind();
    $("#catalogActivationDate").datepicker("destroy");
    $("#catalogActivationDate").datepicker({
        onSelect: function (date) {
            if (isCreate)
                return;
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
    $("#catalogListPublication").multiselect("destroy");
    $("#catalogListPublication").multiselect({
        header: false,
        multiple: false,
        noneSelectedText: multiselectNoneSelectedTextLabel,
        selectedList: 1,
        height: 100,
        minWidth: 170
    }).unbind().bind("multiselectclick", function (event, ui) {
        if(catalogActiveEsEnv == ui.value)
            return;
        catalogActiveEsEnv = ui.value;
        setTimeout(function(){
            catalogResetRunningInterval();
            catalogGetEsEnvPreviousIndices();
        }, 100);
    });
    $("#catalogListIndices").multiselect("destroy");
    $("#catalogListIndices").multiselect({
        header: false,
        multiple: false,
        noneSelectedText: multiselectNoneSelectedTextLabel,
        selectedList: 1,
        height: 100,
        minWidth: 170
    }).unbind().bind("multiselectclick", function (event, ui) {
        if(catalogActiveIndex == ui.value)
            return;
        catalogActiveIndex = ui.value;
        setTimeout(function(){
            catalogChangeActiveIndex();
        }, 100);
    });
    $("#catalogName, #catalogExternalCode, #catalogDescription").change(function () {
        if (catalogValidateForm())catalogUpdate();
    });
//    $("#catalogChannels").bind("multiselectbeforeclose", function () {
//        if (catalogValidateForm())catalogUpdate();
//    });
    /*$("#catalogSocial").click(function () {
        if (catalogValidateForm())catalogUpdate();
    });*/
    $("#catalogPublishBtn").click(function () {
        catalogPublish();
    });
}

function catalogGeneralInitFields(catalog) {
    $("#catalogName, #catalogExternalCode, #catalogDescription, #catalogActivationDate, /*#catalogChannels, */#catalogListPublication, #catalogListIndices").val("");
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

function catalogPublish() {
    $("#catalogLastPublicationStatus").show().html("");
    $("#catalogPublicationError").hide();
    $("#catalogPublishBtn").unbind().addClass("disabled_btn").removeClass("fk_ok_btn");
    var dataToSend = "catalog.id=" + catalogSelectedId + "&esenv.id=" + $("#catalogListPublication").val();
    dataToSend += "&format=json";
    $.ajax({
        url: publishCatalogUrl,
        type: "GET",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            setTimeout(function() {
                catalogGetEsEnvPreviousIndices();
            }, 2000);
        },
        error: function (response, status) {
            if(response.status == "403"){
                $("#catalogPublicationError").show().html(catalogPublicationFailureLabel + ": " + response.responseText);
                $("#catalogLastPublicationStatus").hide();
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

function catalogResetRunningInterval() {
    catalogCheckEsEnvRunning();
    if (catalogRunningInterval)
        clearInterval(catalogRunningInterval);
    catalogRunningInterval = setInterval(function () {
        if ($("#catalogGeneralDiv").is(":visible")) {
            catalogCheckEsEnvRunning();
        }
        else {
            clearInterval(catalogRunningInterval);
            catalogRunningInterval = null;
        }
    }, catalogRunningIntervalTime);
}

function catalogCheckEsEnvRunning() {
    if($("#catalogListPublication").val() == null)
        return;
    var dataToSend = "esenv.id=" + $("#catalogListPublication").val() + "&format=json";
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
                html = catalogPublicationRunningLabel;
            }
            else {
                $("#catalogPublishBtn").unbind().bind("click", function () {catalogPublish();}).addClass("fk_ok_btn").removeClass("disabled_btn");
                html = catalogLastPublicationLabel + " : ";
                if (response.success)
                    html += catalogPublicationSuccessLabel;
                else
                    html += catalogPublicationFailureLabel;
                if (response.extra != null && response.extra != "")
                    html += " (" + response.extra + ")"
            }
            $("#catalogLastPublicationStatus").html(html);
        },
        error: function (response, status) {}
    });
}

function catalogGetEsEnvPreviousIndices(){
    $.ajax({
         url: companyShowPublishingPreviousIndicesUrl,
        type: "GET",
        data: "envId=" + $("#catalogListPublication").val() + "&format=json",
        cache: false,
        async: true,
        success: function (response, status) {
            $.ajax({
                url: companyShowPublishingUrl,
                type: "GET",
                data: "esenv.id=" + $("#catalogListPublication").val() + "&format=json",
                dataType: "json",
                cache: false,
                async: true,
                success: function (resp, status) {
                    var founded = false;
                    var html = "";
                    var indices = response.previousIndices;
                    catalogActiveIndex = null;
                    for(var i = 0; i < indices.length; i++){
                        if(indices[i] == resp.activeIndex)
                            founded = true;
                        html += "<option value='" + indices[i] + "'>" + indices[i] + "</option>";
                    }
                    if(resp.activeIndex != null && resp.activeIndex != "") {
                        catalogActiveIndex = resp.activeIndex;
                        if(!founded)
                            html = "<option value='" + resp.activeIndex + "'>" + resp.activeIndex + "</option>" + html;
                    }
                    else if(resp.idx != null && resp.idx != "") {
                        catalogActiveIndex = resp.idx;
                        if(!founded)
                            html = "<option value='" + resp.activeIndex + "'>" + resp.activeIndex + "</option>" + html;
                    }
                    else{
                        html = "<option></option>" + html;
                    }

                    $("#catalogListIndices").empty().html(html);
                    $("#catalogListIndices").multiselect("enable").multiselect("refresh");
                    $('#catalogGeneralDiv .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_catalogListIndices"]').each(function () {
                        if (this.value == catalogActiveIndex) {
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
            $("#catalogListIndices").empty().multiselect("disable");
        }
    });
}

function catalogChangeActiveIndex() {
    var dataToSend = "envId=" + $("#catalogListPublication").val() + "&index=" + $("#catalogListIndices").val() + "&format=json";
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