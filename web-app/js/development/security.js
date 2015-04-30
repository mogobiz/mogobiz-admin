function securityGetAllUsers(companyId, selectId, permissionType, args){
    var dataToSend = "company.id=" + companyId + "&format=json";
    $.ajax({
        url: securityGetAllUsersUrl,
        type: "GET",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            securityGetUsersPermissions(response, companyId, selectId, permissionType, args);
        }
    });
}

function securityGetUsersPermissions(users, companyId, selectId, permissionType, args){
    var dataToSend = "idCompany=" + companyId + "&permission=" + permissionType;
    for(var i = 0; i < args.length; i++){
        dataToSend += "&args=" + args[i];
    }
    dataToSend += "&format=json";
    $.ajax({
        url: securityGetUserGrantedPermissionUrl,
        type: "GET",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {
            var usersHtml = "";
            for (var i = 0; i < users.length; i++) {
                usersHtml += "<option value=" + users[i].id;
                for (var j = 0; j < response.length; j++) {console.log("users[" + i + " ].id = " + users[i].id);console.log("response[" + j + " ].id = " + response[j].id);
                    if (users[i].id == response[j].id) {
                        usersHtml += " selected";
                        break;
                    }
                }
                usersHtml += ">" + users[i].firstName + " " + users[i].lastName + "</option>";
            }
            $("#" + selectId).html(usersHtml).multiselect({
                header: false,
                noneSelectedText: multiselectNoneSelectedTextLabel,
                minWidth: 250,
                height: 120,
                selectedList: 3
            });
            $("#" + selectId).unbind().bind("multiselectclick", function(event, ui){
                if(ui.checked)
                    securityAddUserPermission(ui.value, permissionType, args);
                else
                    securityRemoveUserPermission(ui.value, permissionType, args);
            });
        }
    });
}

function securityAddUserPermission(userId, permissionType, args){
    var dataToSend = "idUser=" + userId + "&permission=" + permissionType;
    for(var i = 0; i < args.length; i++){
        dataToSend += "&args=" + args[i];
    }
    dataToSend += "&format=json";
    $.ajax({
        url: securityAddUserPermissionUrl,
        type: "POST",
        noticeType : "POST",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {},
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

function securityRemoveUserPermission(userId, permissionType, args){
    var dataToSend = "idUser=" + userId + "&permission=" + permissionType;
    for(var i = 0; i < args.length; i++){
        dataToSend += "&args=" + args[i];
    }
    dataToSend += "&format=json";
    $.ajax({
        url: securityRemoveUserPermissionUrl,
        type: "POST",
        noticeType : "POST",
        data: dataToSend,
        dataType: "json",
        cache: false,
        async: true,
        success: function (response, status) {},
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