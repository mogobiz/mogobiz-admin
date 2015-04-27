var companyProfilesGrid = null;

function companyProfilesDrawAll(companyId){
    companyProfilesGrid = null;
    var dataToSend = "idStore=" + companyId + "&format=json";
    $.ajax({
        url : companyShowProfilesUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var gridColumns = [{
                id : "name",
                name : companyProfilesNameLabel,
                field : "name",
                width : 80,
                formatter : companyProfilesGridNameFormatter,
                cssClass : "cell-title"
            },{
                id : "system",
                name : companyProfilesSystemProfileLabel,
                field : "system",
                width : 20,
                formatter : companyProfilesGridSystemFormatter,
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
            var profiles = response;
            if(profiles){
                for ( var i = 0; i < profiles.length; i++) {
                    gridData[gridData.length] = {
                        "id" : i,
                        "profileId": profiles[i].id,
                        "name": profiles[i].name,
                        "permissions" : profiles[i].permissions,
                        "system": (profiles[i].parent != null),
                        "companyId": companyId
                    }
                }
            }
            companyProfilesGrid = new Slick.Grid($("#profilesGrid"), gridData, gridColumns, gridOptions);

            companyProfilesGrid.setSelectionModel(new Slick.RowSelectionModel());
            companyProfilesGrid.invalidate();
        }
    });
}

function companyProfilesGridNameFormatter (row, cell, value, columnDef, dataContext){
    if(!dataContext.system)
        return "<a href='javascript:void(0);' onclick='companyProfilesGetDetails(" + dataContext.profileId + ", " + false + ", " + dataContext.companyId + ")'>" + value + "</a>";
    return value;
}

function companyProfilesGridSystemFormatter(row, cell, value, columnDef, dataContext){
    var checkBox = "<input type='checkbox' style='margin-top:4px;'";
    checkBox += (!value) ? "disabled='disabled'" : "onclick='companyProfilesUnbindProfileConfirm(" + dataContext.profileId + ", \"" + dataContext.name + "\", " + dataContext.companyId + ");event.preventDefault();'";
    checkBox += (value) ? "checked='checked'/>" : "/>";
   return checkBox;
}

function companyProfilesUnbindProfileConfirm(profileId, profileName, companyId){
    if ($("#companyProfilesDialog").dialog("isOpen") !== true) {
        $("#companyProfilesDialog").empty();
        $("#companyProfilesDialog").html(companyProfilesUnbindMessage);
        $("#companyProfilesDialog").dialog({
            title : profileName,
            modal : true,
            resizable : false,
            width : "auto",
            height : "auto",
            open : function(event) {
                $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
                $(".ui-dialog-buttonpane").find("button:contains('okLabel')").addClass("ui-create-button").html("<span class='ui-button-text'>" + okLabel + "</span>");
            },
            buttons : {
                okLabel : function() {
                    companyProfilesUnbindProfile(profileId, companyId)
                },
                cancelLabel : function() {
                    $(this).attr("checked", "checked")
                    $("#companyProfilesDialog").dialog("close");
                }
            }
        });
    }
}

function companyProfilesUnbindProfile(profileId, companyId){
    var dataToSend = "idProfile=" + profileId + "&format=json";
    $.ajax({
        url : companyUnbindProfileUrl,
        type : "POST",
        noticeType : "POST",
        data : dataToSend,
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyProfilesDialog").dialog("close");
            companyProfilesDrawAll(companyId);
        },
        error : function(response, status) {
            if(response.status == 403){
                jQuery.noticeAdd({
                    stayTime : 2000,
                    text : companyProfilesUnauthorizedMessage,
                    stay : false,
                    type : "error"
                });
            }
        }
    });
}

// Company profiles function

function companyProfilesGetDetails(profileId, isCreate, companyId){
    $.get(
        companyProfilesPageUrl,
        {},
        function(htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            companyProfilesPageSetup(htmlresponse, profileId, isCreate, companyId);
        },
        "html"
    );
}

function companyProfilesPageSetup(htmlresponse, profileId, isCreate, companyId){
    if ($("#companyProfilesDialog").dialog("isOpen") !== true) {
        $("#companyProfilesDialog").empty();
        $("#companyProfilesDialog").html(htmlresponse);
        $("#companyProfilesDialog").dialog({
            title : companyProfilesTitleAddLabel,
            modal : true,
            resizable : false,
            width : "auto",
            height : "auto",
            open : function(event) {
                companyProfilesPageInitControls(profileId, isCreate);
                companyProfilesPageInitFields(profileId, isCreate);
            },
            buttons : {
                deleteLabel : function() {
                    companyProfilesDeleteProfile(companyId);
                },
                cancelLabel : function() {
                    $("#companyProfilesDialog").dialog("close");
                },
                updateLabel : function() {
                        companyProfilesUpdateProfile(companyId);
                },
                createLabel : function() {
                    if (companyProfilesValidateForm())
                        companyProfilesAddProfile(companyId);
                }
            }
        });
    }
}

function companyProfilesPageInitControls(profileId, isCreate) {
    $("#companyProfilesPermissions").multiselectSlides({
        right: "#companyProfilesPermissions_to",
        rightAll: "#companyProfilesPermissions_right_All",
        rightSelected: "#companyProfilesPermissions_right_Selected",
        leftSelected: "#companyProfilesPermissions_left_Selected",
        leftAll: "#companyProfilesPermissions_left_All"
    });
    var data = companyProfilesGrid.getData();
    var html = "";
    for(var i = 0; i < data.length; i++)
        html += "<option value='" + data[i].profileId + "'>" + data[i].name + "</option>";

    $("#companyProfilesAddCopy").html(html);
    $("#companyProfilesAddCopy").multiselect("destroy");
    $("#companyProfilesAddCopy").multiselect({
        header: false,
        multiple: false,
        noneSelectedText: multiselectNoneSelectedTextLabel,
        minWidth: 100,
        height: 80,
        selectedList: 1
    });
    $("#companyProfilesCopyCheckDiv").show();
    $("#companyProfilesCopyDiv").hide();
    $("#companyProfilesCopyCheck").unbind().bind("click", function(){
        if($("#companyProfilesCopyCheck").is(":checked")){
            $("#companyProfilesPermissionsDiv").hide();
            $("#companyProfilesCopyDiv").show();
        }
        else{
            $("#companyProfilesCopyDiv").hide();
            $("#companyProfilesPermissionsDiv").show();
        }
    });
    if (isCreate) {
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
    }
    else {
        $("#companyProfilesCopyCheckDiv").hide();
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").addClass("ui-delete-button");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").addClass("ui-update-button");
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").html("<span class='ui-button-text'>" + deleteLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").html("<span class='ui-button-text'>" + updateLabel + "</span>");
    }
}

function companyProfilesPageInitFields(profileId, isCreate){
    $("#companyProfilesId,#companyProfilesName").val("");
    $("#companyProfilesName").removeAttr("disabled");
    $("#companyProfilesCopyCheck").prop("checked", false);
    if (!isCreate){
        var profile = null;
        var data = companyProfilesGrid.getData();
        for (var i = 0; i < data.length; i++) {
            if (data[i].profileId == profileId){
                profile = data[i];
                break;
            }
        }
        if(profile){
            $("#companyProfilesId").val(profileId);
            $("#companyProfilesName").val(profile.name).attr("disabled", "disabled");
            if(profile.permissions) {
                var permissions = profile.permissions;
                for (var i = 0; i < permissions.length; i++) {
                    $("#companyProfilesPermissions option[value='" + permissions[i].key + "']").appendTo($("#companyProfilesPermissions_to"));
                }
            }
        }
    }
}

function companyProfilesValidateForm(){
    if ($("#companyProfilesName").val() == "") {
        $("#companyProfilesCreateDiv #companyProfilesName").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : "error"
        });
        return false;
    }
    if($("#companyProfilesCopyCheck").is(":checked")){
        if ($("#companyProfilesAddCopy").val() == "" || $("#companyProfilesAddCopy").val() == null) {
            jQuery.noticeAdd({
                stayTime : 2000,
                text : fieldsRequiredMessageLabel,
                stay : false,
                type : "error"
            });
            return false;
        }
    }
    else{
        if($("#companyProfilesPermissions_to option").length == 0){
            jQuery.noticeAdd({
                stayTime : 2000,
                text : fieldsRequiredMessageLabel,
                stay : false,
                type : "error"
            });
            return false;
        }
    }
    return true;
}

function companyProfilesAddProfile(companyId){
    var dataToSend = "";
    var action = "";
    if($("#companyProfilesCopyCheck").is(":checked")){
        action = companyCopyProfileUrl;
        dataToSend = "idProfile=" + $("#companyProfilesAddCopy").val() + "&idStore=" + companyId + "&name=" + $("#companyProfilesName").val();
    }
    else{
        action = companySaveProfileUrl;
        dataToSend = "idCompany=" + companyId + "&name=" + $("#companyProfilesName").val();
        $("#companyProfilesPermissions_to option").each(function(index, value){
            dataToSend += "&permissions=" + value.value;
        });
    }
    dataToSend += "&format=json";
    $.ajax({
        url : action,
        type : "POST",
        noticeType : "POST",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyProfilesDialog").dialog("close");
            companyProfilesDrawAll(companyId);
        },
        error : function(response, status) {
            if(response.status == 403){
                jQuery.noticeAdd({
                    stayTime : 2000,
                    text : companyProfilesUnauthorizedMessage,
                    stay : false,
                    type : "error"
                });
            }
        }
    });
}

function companyProfilesUpdateProfile(companyId){
    var dataToSend = "idProfile=" + $("#companyProfilesId").val() + "&idCompany=" + companyId + "&name=" + $("#companyProfilesName").val();
    $("#companyProfilesPermissions_to option").each(function(index, value){
        dataToSend += "&permissions=" + value.value;
    });
    dataToSend += "&format=json";
    $.ajax({
        url : companySaveProfileUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyProfilesDialog").dialog("close");
            companyProfilesDrawAll(companyId);
        },
        error : function(response, status) {
            if(response.status == 403){
                jQuery.noticeAdd({
                    stayTime : 2000,
                    text : companyProfilesUnauthorizedMessage,
                    stay : false,
                    type : "error"
                });
            }
        }
    });
}

function companyProfilesDeleteProfile(companyId){
    var dataToSend = "id=" + $("#companyProfilesId").val();
    $.ajax({
        url : companyDeleteBrandsUrl,
        type : "POST",
        noticeType : "DELETE",
        data : dataToSend,
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyProfilesDialog").dialog("close");
            companyProfilesDrawAll(companyId);
        },
        error : function(response, status) {
            if(response.status == 403){
                jQuery.noticeAdd({
                    stayTime : 2000,
                    text : companyProfilesUnauthorizedMessage,
                    stay : false,
                    type : "error"
                });
            }
        }
    });
}

// System profiles function

function companyProfilesGetSystemProfiles(companyId){
    $.ajax({
        url : companyShowProfilesUrl,
        type : "GET",
        data : "format=json",
        cache : false,
        async : true,
        success : function(response, status) {
            companyProfilesGetSystemDetails(response, companyId);
        },
        error : function(response, status) {}
    });
}

function companyProfilesGetSystemDetails(profiles, companyId){
    $.get(
        companySystemProfilePageUrl,
        {},
        function(htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            companyProfilesSystemPageSetup(htmlresponse, profiles, companyId);
        },
        "html"
    );
}

function companyProfilesSystemPageSetup(htmlresponse, profiles, companyId){
    if ($("#companyProfilesDialog").dialog("isOpen") !== true) {
        $("#companyProfilesDialog").empty();
        $("#companyProfilesDialog").html(htmlresponse);
        $("#companyProfilesDialog").dialog({
            title : companyProfilesTitleApplyLabel,
            modal : true,
            resizable : false,
            width : "auto",
            height : "auto",
            open : function(event) {
                companyProfilesSystemPageInitControls();
                companyProfilesSystemPageInitFields(profiles);
            },
            buttons : {
                cancelLabel : function() {
                    $("#companyProfilesDialog").dialog("close");
                },
                validateLabel : function() {
                    if (companyProfilesSystemValidateForm())
                        companyProfilesSystemApplyProfile(companyId);
                }
            }
        });
    }
}

function companyProfilesSystemPageInitControls() {
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
        $(".ui-dialog-buttonpane").find("button:contains('validateLabel ')").addClass("ui-create-button");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('validateLabel')").html("<span class='ui-button-text'>" + validateLabel + "</span>");
}

function companyProfilesSystemPageInitFields(profiles){
    var html = "";
    for(var i = 0; i < profiles.length; i++)
        html += "<option value='" + profiles[i].id + "'>" + profiles[i].name + "</option>";

    $("#companyProfilesApplySystemProfile").html(html);
    $("#companyProfilesApplySystemProfile").multiselect("destroy");
    $("#companyProfilesApplySystemProfile").multiselect({
        header: false,
        multiple: false,
        noneSelectedText: multiselectNoneSelectedTextLabel,
        minWidth: 100,
        height: 80,
        selectedList: 1
    });
}

function companyProfilesSystemValidateForm(){
    if ($("#companyProfilesApplyName").val() == "") {
        $("#companyProfilesApplyDiv #companyProfilesApplyName").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : "error"
        });
        return false;
    }
    if ($("#companyProfilesApplySystemProfile").val() == "" || $("#companyProfilesApplySystemProfile").val() == null) {
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

function companyProfilesSystemApplyProfile(companyId){
    var dataToSend = "idProfile=" + $("#companyProfilesApplySystemProfile").val() + "&idStore=" + companyId + "&name=" + $("#companyProfilesApplyName").val() + "&format=json";
    $.ajax({
        url : companyApplyProfileUrl,
        type : "POST",
        noticeType : "POST",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyProfilesDialog").dialog("close");
            companyProfilesDrawAll(companyId);
        },
        error : function(response, status) {
            if(response.status == 403){
                jQuery.noticeAdd({
                    stayTime : 2000,
                    text : companyProfilesUnauthorizedMessage,
                    stay : false,
                    type : "error"
                });
            }
        }
    });
}