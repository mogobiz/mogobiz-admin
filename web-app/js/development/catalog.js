var catalogSelectedId = null;
var catalogImported = false;
var catalogRunningInterval = null;
var catalogRunningIntervalTime = 10000;

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
            $("#deleteCatalogLink, #exportCatalogLink").unbind().addClass("disabled");
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
                    categoryTreeDrawByCatalog(catalogSelectedId, ui.text);
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
    $("#catalogCreateChannels").multiselect("destroy");
    $("#catalogCreateChannels").multiselect({
        header: false,
        noneSelectedText: multiselectNoneSelectedTextLabel,
        selectedList: 3,
        height: 100,
        minWidth: 242
    });
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
    var channels = $("#catalogCreateChannels").multiselect("getChecked");
    var channelsStr = "";
    for (var i = 0; i < channels.length; i++) {
        if (channelsStr != "")
            channelsStr += ",";
        channelsStr += channels[i].value;
    }
    var dataToSend = "catalog.name=" + $("#catalogCreateName").val() + "&catalog.externalCode=" + $("#catalogCreateExternalCode").val();
    dataToSend += "&catalog.activationDate=" + $("#catalogCreateActivationDate").val() + "&catalog.description=" + $("#catalogCreateDescription").val();
    dataToSend += "&catalog.channels=" + channelsStr + "&catalog.social=" + $("#catalogCreateSocial").is(":checked");
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
            catalogResetRunningInterval();
            catalogInitAllTabs();
            catalogGeneralGetInfo();
            catalogTranslationDrawAll();
        },
        "html"
    );
}

function catalogInitAllTabs() {
    $("#catalogTabs .tabs a").unbind();
    $("#catalogTabs .tabs a").click(function () {
        $("#catalogTabs .tabs .selected").removeClass("selected");
        $(this).addClass("selected");
        switch ($(this).attr("id")) {
            case "catalogGeneralTab":
                $("#catalogTranslationDiv").hide();
                $("#catalogGeneralDiv").show();
                catalogResetRunningInterval();
                break;
            case "catalogTranslationTab":
                $("#catalogGeneralDiv").hide();
                $("#catalogTranslationDiv").show();
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
            $.ajax({
                url: companyShowPublishingUrl,
                type: "GET",
                data: "format=json",
                dataType: "json",
                cache: false,
                async: true,
                success: function (response, status) {
                    var options = document.getElementById("catalogListPublication").options;
                    options.length = 0;
                    for (var i = 0; i < response.length; i++) {
                        options[options.length] = new Option(response[i].name, response[i].id);
                    }
                    $("#catalogListPublication").multiselect("refresh");
                    $("#categoriesMain").hideLoading();
                },
                error: function (response, status) {}
            });
        },
        error: function (response, status) {}
    });
}

function catalogGeneralInitControls(isCreate) {
    $("#catalogName, #catalogExternalCode, #catalogActivationDate, #catalogDescription, #catalogSocial, #catalogChannels, #catalogPublishBtn").unbind();
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
    $("#catalogChannels").multiselect("destroy");
    $("#catalogChannels").multiselect({
        header: false,
        noneSelectedText: multiselectNoneSelectedTextLabel,
        selectedList: 3,
        height: 100,
        minWidth: 239
    });
    $("#catalogListPublication").multiselect("destroy");
    $("#catalogListPublication").multiselect({
        header: false,
        multiple: false,
        noneSelectedText: multiselectNoneSelectedTextLabel,
        selectedList: 1,
        height: 100,
        minWidth: 239
    }).bind("multiselectclick", function (event, ui) {
        catalogResetRunningInterval();
    });
    $("#catalogName, #catalogExternalCode, #catalogDescription").change(function () {
        if (catalogValidateForm())catalogUpdate();
    });
    $("#catalogChannels").bind("multiselectbeforeclose", function () {
        if (catalogValidateForm())catalogUpdate();
    });
    $("#catalogSocial").click(function () {
        if (catalogValidateForm())catalogUpdate();
    });
    $("#catalogPublishBtn").click(function () {
        catalogPublish();
    });
}

function catalogGeneralInitFields(catalog) {
    $("#catalogName, #catalogExternalCode, #catalogDescription, #catalogActivationDate, #catalogChannels, #catalogListPublication").val("");
    $("#catalogName").val(catalog.name);
    $("#catalogExternalCode").val(catalog.externalCode);
    $("#catalogDescription").val(catalog.description);
    $("#catalogActivationDate").val(catalog.activationDate.substring(0, 10));
    if (catalog.social)
        $("#catalogSocial").prop("checked", true);

    $("#catalogChannels").multiselect("uncheckAll");
    $("#catalogChannels").multiselect("refresh");
    var channels = (catalog.channels) ? catalog.channels.split(",") : [];
    for (var i = 0; i < channels.length; i++) {
        $("#catalogEditForm .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_catalogChannels']").each(function () {
            if (this.value == channels[i]) {
                this.click();
            }
        });
    }
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
    var channels = $("#catalogChannels").multiselect("getChecked");
    var channelsStr = "";
    for (var i = 0; i < channels.length; i++) {
        if (channelsStr != "")
            channelsStr += ",";
        channelsStr += channels[i].value;
    }
    var date = $("#catalogActivationDate").val();
    var dataToSend = "catalog.id=" + catalogSelectedId + "&catalog.name=" + $("#catalogName").val() + "&catalog.externalCode=" + $("#catalogExternalCode").val();
    dataToSend += "&catalog.activationDate_year=" + date.substring(0, 4) + "&catalog.activationDate_month=" + date.substring(5, 7) + "&catalog.activationDate_day=" + date.substring(8, 10);
    dataToSend += "&catalog.description=" + $("#catalogDescription").val() + "&catalog.channels=" + channelsStr + "&catalog.social=" + $("#catalogSocial").is(":checked");
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
    $("#catalogPublicationError").hide()
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
        success: function (response, status) {},
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
    document.getElementById("catalogImportForm").target = "catalogImportHiddenFrame"; // 'upload_target' is the name of the iframe
    document.getElementById("catalogImportForm").action = importCatalogUrl;
    document.getElementById("catalogImportForm").submit();
    document.getElementById("catalogImportHiddenFrame").onload = function () {
        var responseText = document.getElementById("catalogImportHiddenFrame").contentWindow.document.body.innerText;
        try {
            var cat = JSON.parse(responseText);
            catalogSelectedId = cat.id;
            catalogImported = true;
            catalogueLoadList();
            $("#catalogCreateDialog").dialog("close");
        }
        catch(e){
            if(responseText.toLowerCase().indexOf("error:") == 0){
                $("#catalogImportError").html(responseText.substring(6));
            }
            else{
                $("#catalogImportError").html(catalogImportFailureLabel);
            }
        }
    }
}

function catalogExport() {
    window.open(exportCatalogUrl + "?catalog.id=" + catalogSelectedId);
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
    var dataToSend = "id=" + $("#catalogListPublication").val() + "&format=json";
    $.ajax({
        url: companyShowPublishingUrl,
        type: "GET",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            var html = ""
            if (response[0].running) {
                $("#catalogPublishBtn").unbind().addClass("disabled_btn").removeClass("fk_ok_btn");
                html = catalogPublicationRunningLabel;
            }
            else {
                $("#catalogPublishBtn").unbind().bind("click", function () {catalogPublish();}).addClass("fk_ok_btn").removeClass("disabled_btn");
                html = catalogLastPublicationLabel + " : ";
                if (response[0].success)
                    html += catalogPublicationSuccessLabel;
                else
                    html += catalogPublicationFailureLabel;
                if (response[0].extra != null && response[0].extra != "")
                    html += " (" + response[0].extra + ")"
            }
            $("#catalogLastPublicationStatus").html(html);
        },
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
    }
    translationGetAllData(catalogSelectedId, successCallback);
}