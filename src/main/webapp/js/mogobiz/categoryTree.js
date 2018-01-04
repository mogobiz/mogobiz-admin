var categorySelectedId = null;
var categoryShowSecurity;
function categoryTreeDrawByCatalog(catalogId, catalogName, catalogReadonly) {
    categorySelectedId = null;
    var dataToSend = "catalog.id=" + catalogId + "&allCategories=false&format=html";
    $("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
    $.ajax({
        url : showCategoryUrl,
        type : "GET",
        data : dataToSend,
        dataType : "html",
        cache : false,
        async : true,
        success : function(pageContent, status) {
            $("#categoryTree").empty();
            $("#catalogMenu ul.subnav li a.disabled").removeClass("disabled");
            $("#deleteCatalogLink").click(function(){catalogDeleteConfirmation();});
            $("#exportCatalogLink").click(function(){catalogShowExportPage();});
            $("#searchProductCatalogLink").click(function(){catalogProductsGetSearchPage();});
            var html = "<div id='categoryTreeList' value='-1'><ul><li id='categoryTreeNode-0' value='0' class='loaded'>";
            html += "<a href='javascript:void(0)'>" + catalogName + (catalogReadonly ? " (" + catalogSelectedMiraklEnv.name + ")" : "") + "</a>";
            html += "<ul id='categoryTreeNode-0-Childs'>" + pageContent + "</ul></li></div>";
            $("#categoryTree").append(html);
            if(catalogReadonly){
                $("#categoryTreeNode-0-Childs a, #categoryTreeNode-0-Childs span").removeClass("miraklCategory").addClass("miraklCategory");
            }
            $("#categoryTreeList").jstree({
                "themes" : {
                    theme : "default",
                    url : false,
                    dots : true,
                    icons : false
                },
                "crrm" : {
                    "move" : {
                        "check_move" : function (m) { return true; },
                        "open_onmove" : false,
                        "default_position" : "first"
                    }
                },
                "dnd" : {
                    "open_timeout" : 86400000, // 1 day to be sure that this node will never open on hover
                    "drop_target" : false,
                    "drag_target" : false
                },
                "contextmenu" : {
                    "items": function ($node) {
                        if(catalogReadonly)
                            return;
                        if($node[0].id == "categoryTreeNode-0"){
                            return {
                                "Create": {
                                    "label": categoryCreateTreeLabel,
                                    "action": function (obj) {
                                        categoryGetCreatePage(obj[0].value);
                                    }
                                }
                            }
                        }
                        return {
                            "Create": {
                                "label": categoryCreateTreeLabel,
                                "action": function (obj) {
                                    categoryGetCreatePage(obj[0].value);
                                }
                            },
                            "Delete": {
                                "label": categoryDeleteTreeLabel,
                                "action": function (obj) {
                                    categoryDeleteValidation(obj[0].value);
                                }
                            }
                        }
                    }
                },
                "plugins" : [ "themes", "html_data", "ui", "dnd", "crrm", "unique", "contextmenu" ]
            })
            .bind("open_node.jstree", function (event, data) {
                if(! $("#" + data.rslt.obj[0].id).hasClass("loaded")){
                    categoryTreeDrawChilds(data.rslt.obj[0].value, true);
                    setTimeout(function () { $.jstree._reference("#" + data.rslt.obj[0].id).close_node("#" + data.rslt.obj[0].id); }, 1);
                }
            })
            .bind("select_node.jstree", function (event, data) {
                if(data.rslt.obj[0].value == 0){
                    categorySelectedId = null;
                    catalogGetTabPage();
                    return;
                }
                categorySelectedId = data.rslt.obj[0].value;
                categoryGetTabPage();
            })
            .bind("move_node.jstree", function (e, data) {
                var pos = "0";
                switch(data.rslt.p){
                    case "before":
                        pos = parseInt(parseFloat($("#" + data.rslt.r[0].id).attr("pos"))) - 5;
                        break;
                    case "after":
                        pos = parseInt(parseFloat($("#" + data.rslt.r[0].id).attr("pos"))) + 5;
                        break;
                    default:
                        pos = "0";
                }
                var newParentChilds = $.jstree._reference("#categoryTreeList")._get_children(data.rslt.np[0]);
                for(var i = 0; i < newParentChilds.length; i++)
                    $("#" + newParentChilds[i].id).attr("pos", (i + 1) * 10);
                if(data.rslt.op[0].value != data.rslt.np[0].value){
                    var oldParentChilds = $.jstree._reference("#categoryTreeList")._get_children(data.rslt.op[0]);
                    for(var i = 0; i < oldParentChilds.length; i++)
                        $("#" + oldParentChilds[i].id).attr("pos", (i + 1) * 10);
                }
                categoryTreeUpdateParentNode(data.rslt.o[0].value, data.rslt.np[0].value, pos);
            }).
            bind("before.jstree", function (e, data) {
                $("#categoryTreeList ul > li > a > ins").remove();
            });
            $("#categoriesMain").hideLoading();
            setTimeout(function () {
                $.jstree._reference("#categoryTreeList").open_node("#categoryTreeNode-0");
                $.jstree._reference("#categoryTreeList").select_node("#categoryTreeNode-0");
            }, 1);
        }
    });
}

function categoryTreeDrawChilds(id, showLoading){
    var dataToSend = "category.parentId=" + id + "&format=html";
    if(showLoading)
        $("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
    $.ajax({
        url : showCategoryUrl,
        type : "GET",
        data : dataToSend,
        dataType : "html",
        cache : false,
        async : true,
        success : function(pageContent, status) {
            if(pageContent.indexOf("<li") >= 0){
                $("#categoryTreeNode-" + id + "-Childs").html(pageContent);
            }
            else{
                $("#categoryTreeNode-" + id ).addClass("jstree-leaf");
                $("#categoryTreeNode-" + id + "-Childs").remove();
            }
            $("#categoryTreeNode-" + id ).addClass("loaded");
            $("#categoryTreeList").jstree("refresh");

            setTimeout(function () { $("#categoryTreeList").jstree("set_focus"); }, 1);
            setTimeout(function () { $.jstree._reference("#categoryTreeNode-" + id).open_node("#categoryTreeNode-" + id); }, 1);

            if(catalogSelectedReadOnly){
                $("#categoryTreeNode-0-Childs a, #categoryTreeNode-0-Childs span").removeClass("miraklCategory").addClass("miraklCategory");
            }
            $("#categoriesMain").hideLoading();
        }
    });
}

function categoryTreeUpdateParentNode(nodeId, parentId, pos){
    var dataToSend = "category.id=" + nodeId + "&category.parentId=" + parentId + "&category.position=" + pos  + "&format=json";
    $("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
    $.ajax({
        url : updateCategoryUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if($("#categoryTreeNode-" + parentId ).hasClass("jstree-leaf")){
                $("#categoryTreeNode-" + parentId ).removeClass("jstree-leaf")
            }
            if(! $("#categoryTreeNode-" + parentId ).hasClass("loaded")){
                categoryTreeDrawChilds(parentId, false);
                return;
            }
            setTimeout(function () { $("#categoryTreeList").jstree("set_focus"); }, 1);
            setTimeout(function () { $.jstree._reference("#categoryTreeNode-" + parentId).open_node("#categoryTreeNode-" + parentId); }, 1);
            $("#categoriesMain").hideLoading();
            if(nodeId == categorySelectedId){
                categoryGetTabPage();
            }
        }
    });
}

function categoryGetTabPage(){
    $("#categoriesMain").showLoading({"addClass": "loading-indicator-FacebookBig"});
    $("#createProductMenu").detach().prependTo(document.body).hide();
    $.get(
        categoryTabPageUrl,
        {},
        function(pageContent){
            $("#categoryDetails").empty().html(pageContent);
            categoryInitAllTabs();
            categoryGeneralGetInfo();
            categoryVariationsDrawAll();
            categoryFeaturesDrawAll();
            categoryGetProducts();
            categoryTranslationDrawAll();
            if(categoryShowSecurity)
                securityGetAllUsers(sellerCompanyId, "categorySecurityUsers", "updateCatalogCategory", [sellerCompanyId, catalogSelectedId, categorySelectedId]);
        },
        "html"
    );
}

function categoryInitAllTabs(){
    $("#categoryVariationsTabInfo").hide();
    $("#categoryFeaturesTabInfo").hide();
    $("#categoryProductsTabInfo").hide();
    $("#categoryTranslationTabInfo").hide();
    $("#categorySecurityTabInfo").hide();
    categoryShowSecurity = ($("#categorySecurityTab").length > 0);
    if(!categoryShowSecurity)
        $("#categorySecurityTabInfo").remove();

    $("#editCategoryTabs .tabs a").click(function() {
        $("#editCategoryTabs .tabs .selected").removeClass("selected");
        $(this).addClass("selected");
        var selectedTabId = $(this).attr("id");
        switch(selectedTabId){
            case "categoryGeneralTab":
                $("#categoryGeneralTabInfo").show();
                $("#categoryVariationsTabInfo").hide();
                $("#categoryFeaturesTabInfo").hide();
                $("#categoryProductsTabInfo").hide();
                $("#categoryTranslationTabInfo").hide();
                $("#categorySecurityTabInfo").hide();
                break;
            case "categoryVariationsTab":
                $("#categoryGeneralTabInfo").hide();
                $("#categoryVariationsTabInfo").show();
                $("#categoryFeaturesTabInfo").hide();
                $("#categoryProductsTabInfo").hide();
                $("#categoryTranslationTabInfo").hide();
                $("#categorySecurityTabInfo").hide();
                break;
            case "categoryFeaturesTab":
                $("#categoryGeneralTabInfo").hide();
                $("#categoryVariationsTabInfo").hide();
                $("#categoryFeaturesTabInfo").show();
                $("#categoryProductsTabInfo").hide();
                $("#categoryTranslationTabInfo").hide();
                $("#categorySecurityTabInfo").hide();
                break;
            case "categoryProductsTab":
                $("#categoryGeneralTabInfo").hide();
                $("#categoryVariationsTabInfo").hide();
                $("#categoryFeaturesTabInfo").hide();
                $("#categoryProductsTabInfo").show();
                $("#categoryTranslationTabInfo").hide();
                $("#categorySecurityTabInfo").hide();
                break;
            case "categoryTranslationTab":
                $("#categoryGeneralTabInfo").hide();
                $("#categoryVariationsTabInfo").hide();
                $("#categoryFeaturesTabInfo").hide();
                $("#categoryProductsTabInfo").hide();
                $("#categoryTranslationTabInfo").show();
                $("#categorySecurityTabInfo").hide();
                break;
            case "categorySecurityTab":
                $("#categoryGeneralTabInfo").hide();
                $("#categoryVariationsTabInfo").hide();
                $("#categoryFeaturesTabInfo").hide();
                $("#categoryProductsTabInfo").hide();
                $("#categoryTranslationTabInfo").hide();
                $("#categorySecurityTabInfo").show();
                break;
            default:
                break;
        }
    });
    $("#categoryGeneralTab").addClass("selected");
}

function categoryGetCreatePage(parentId) {
    $.get(
        categoryCreatePageUrl,
        {},
        function(responseText) {
            responseText = jQuery.trim(responseText);
            categoryCreatePageSetup(responseText, parentId);
        },
        "html"
    );
}

function categoryCreatePageSetup(responseText, parentId){
    if ($("#categoryCreateDialog").dialog( "isOpen" ) !== true) {
        $("#categoryCreateDialog").empty();
        $("#categoryCreateDialog").html(responseText);

        $("#categoryCreateDialog").dialog({
            width : "500",
            height : "auto",
            title : categoryCreateTitleLabel,
            resizable: false,
            modal: true,
            open: function(event) {
                $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
                $(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
                $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
                $(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
                $("#createCategoryNameField").unbind().bind("keyup", function(e){
                    if((/\\/).test($("#createCategoryNameField").val()))
                        $("#createCategoryNameField")[0].setCustomValidity(fieldsInvalidMessageLabel);
                    else
                        $("#createCategoryNameField")[0].setCustomValidity("");
                })
            },
            buttons : {
                cancelLabel : function() {
                    $("#categoryCreateDialog").dialog("close");
                },
                createLabel : function() {
                    categoryCreateValidation()
                }
            }
        });
    }
    $("#createCategoryParent").val(parentId);
}

function categoryCreateValidation(){
    if(!$("#createCategoryNameField")[0].checkValidity()){
        jQuery.noticeAdd({
            stayTime : 2000,
            text : $("#createCategoryNameField")[0].validationMessage,
            stay : false,
            type : "error"
        });
        return false;
    }
    if($("#createCategoryNameField").val() != "") {
        var dataToSend = $($("#categoryCreateForm")).serialize();
        dataToSend += "&category.catalogId=" + catalogSelectedId + "&format=json";
        $.ajax({
            url : createCategoryUrl,
            type : "POST",
            noticeType : "POST",
            data : dataToSend,
            dataType : "json",
            cache : false,
            async : true,
            success : function(response, status) {
                if(status == "success"){
                    if($("#categoryTreeNode-" + $("#createCategoryParent").val() ).hasClass("loaded")){
                        $("#categoryTreeList").jstree(
                            "create",
                                "#categoryTreeNode-" + $("#createCategoryParent").val(),
                            false,
                            {"data": $("#createCategoryNameField").val(), "attr":{"id" : "categoryTreeNode-" + response.id, "value": response.id,  "pos" : "0", "class": "loaded"}},
                            false,
                            true
                        );
                        var childs = $.jstree._reference("#categoryTreeList")._get_children("#categoryTreeNode-" + $("#createCategoryParent").val());
                        for(var i = 0; i < childs.length; i++)
                            $("#" + childs[i].id).attr("pos", (i + 1) * 10);
                    }
                    $("#categoryCreateDialog").dialog("close");
                }
                else{
                    jQuery.noticeAdd({
                        stayTime : 2000,
                        text : categoryNameExistLabel,
                        stay : false,
                        type : "error"
                    });
                }
            },
            error : function(response, status) {
                jQuery.noticeAdd({
                    stayTime : 2000,
                    text : categoryNameExistLabel,
                    stay : false,
                    type : "error"
                });
            }
        });
    }
    else{
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : "error"
        });
        return false;
    }
}

function categoryDeleteValidation(id){
    var dataToSend = "category.id=" + id + "&format=json";
    $.ajax({
        url : deleteCategoryUrl + "?" + dataToSend,
        data : "",
        type : "POST",
        noticeType : "DELETE",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#categoryTreeList").jstree("remove", "#categoryTreeNode-" + id);
            if(id == categorySelectedId){
                $("#createProductMenu").detach().prependTo(document.body).hide();
                $("#categoryDetails").empty();
            }
        },
        error : function(response, status) {
            if(response.status == 403){
                $.ajax({
                    url : markDeletedCategoryUrl,
                    type : "POST",
                    noticeType : "DELETE",
                    data : dataToSend,
                    dataType : "json",
                    cache : false,
                    async : true,
                    success : function(response, status) {
                        $("#categoryTreeList").jstree("remove", "#categoryTreeNode-" + id);
                        if(id == categorySelectedId){
                            $("#createProductMenu").detach().prependTo(document.body).hide();
                            $("#categoryDetails").empty();
                        }
                    },
                    error: function(response, status){
                        jQuery.noticeAdd({
                            stayTime : 1000,
                            text : categoryDeleteFailedLabel,
                            stay : false,
                            type : "error"
                        });
                    }
                });
            }
        }
    });
}