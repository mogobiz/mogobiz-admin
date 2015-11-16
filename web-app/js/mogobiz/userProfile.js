function userProfileGetDetails(sellerId){
    var dataToSend = "id=" + sellerId + "&format=json";
    $.ajax({
        url : sellerShowUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var profilesStr = "";
            var profiles = response.profiles;
            for(var i = 0 ; i < profiles.length; i++) {
                if (profiles[i].company.id == sellerCompanyId) {
                    profilesStr += profilesStr != "" ? ", " : "";
                    profilesStr += profiles[i].name;
                }
            }
            $("#categoriesMain").hide();
            $("#items").show().empty().hideLoading();
            $("#searchForm").hide();
            $("#userProfileForm").detach().prependTo("#items").show();
            $("#userProfileFirstName").val(response.firstName);
            $("#userProfileLastName").val(response.lastName);
            $("#userProfileEmail").val(response.email);
            $("#userProfileCompanies").val(response.companies.join(", "));
            $("#userProfileProfiles").val(profilesStr);
            $("#userProfileCloseBtn").unbind().click(function() {
                if(categorySelectedId){
                    categoryGeneralGetInfo();
                }
                if(partnerActiveCompanyChanged){
                    partnerActiveCompanyChanged = false;
                    $("#createProductMenu").detach().prependTo(document.body).hide();
                    $("#categoryTree").empty();
                    $("#categoryDetails").empty();
                    catalogueLoadList();
                }
                $("#items").empty().hide(); // show catalog tree
                $("#categoriesMain").show();

                if($("#catalogTabs").is(":visible")){
                    catalogGetEsEnvList();
                }
                if($("#catalogGeneralDiv").is(":visible")){
                    catalogResetRunningInterval();
                }
            });
            $("#userProfileChangePassBtn").unbind().click(function() {
                userProfileGetChangePasswordDialog(sellerId);
            });
        }
    });
}

function userProfileGetChangePasswordDialog(sellerId) {
    $.get(
        profilePasswordPageUrl,
        {},
        function(htmlResponse) {
            htmlResponse = jQuery.trim(htmlResponse);
            userProfileChangePasswordPageSetup(htmlResponse, sellerId);
        },
        "html"
    );
}

function userProfileChangePasswordPageSetup(htmlResponse, sellerId) {
    if ($("#userChangePasswordDialog").dialog( "isOpen" ) !== true) {
        $("#userChangePasswordDialog").empty().html(htmlResponse);
        $("#userChangePasswordDialog").dialog({
            width : "500",
            height : "auto",
            title : profilePasswordPageTitle,
            resizable: false,
            modal : true,
            open: function(event) {
                userProfileChangePasswordInitControls();
            },
            buttons : {
                cancelLabel : function() {
                    $("#userChangePasswordDialog").dialog("close");
                },
                validateLabel : function() {
                    if(userProfileChangePasswordValidateForm()) {
                        userProfileChangePassword(sellerId);
                    }
                }
            }
        });
    }
}

function userProfileChangePasswordInitControls(){
    $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
    $(".ui-dialog-buttonpane").find("button:contains('validateLabel')").addClass("ui-create-button");
    $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
    $(".ui-dialog-buttonpane").find("button:contains('validateLabel')").html("<span class='ui-button-text'>" + validateLabel + "</span>");
    $("#profilePasswordShowChars").unbind().bind("click", function(){
        if($(this).is(":checked"))
            $("#profileChangePassword input[type='password']").attr("type", "text");
        else
            $("#profileChangePassword input[type='text']").attr("type", "password");
    })
}

function userProfileChangePasswordValidateForm(){
    if ($("#profileCurrentPassword").val() == "" || $("#profileNewPassword").val() == "" || $("profileConfirmPassword").val() == "") {
        if($("#profileCurrentPassword").val() == "")
            $("#profileChangePassword #profileCurrentPassword").focus();
        else if($("#profileNewPassword").val() == "")
            $("#profileChangePassword #profileNewPassword").focus();
        else if($("#profileConfirmPassword").val() == "")
            $("#profileChangePassword #profileConfirmPassword").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : "error"
        });
        return false;
    }
    if($("#profileNewPassword").val() != $("#profileConfirmPassword").val()){
        $("#profileChangePassword #profileNewPassword").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : profilePasswordDontMatchError,
            stay : false,
            type : "error"
        });
        return false;
    }
    return true;
}

function userProfileChangePassword(sellerId){
    var dataToSend = "id=" + sellerId + "&olPassword=" + $("#profileCurrentPassword").val() + "&newPassword=" + $("#profileNewPassword").val();
    $.ajax({
        url : profileChangePasswordUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        noticeType: "POST",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#userChangePasswordDialog").dialog("close");
        },
        error: function(response, status) {
            if(response.status == 400){
                jQuery.noticeAdd({
                    stayTime : 4000,
                    text : profilePasswordIncorrectError,
                    stay : false,
                    type : "error"
                });
            }
            if(response.status == 404){
                jQuery.noticeAdd({
                    stayTime : 3000,
                    text : profilePasswordIncorrectOldError,
                    stay : false,
                    type : "error"
                });
            }
        }
    });
}