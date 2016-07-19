var companyMiraklGrid = null;
var companyMiraklShowSecurity;

function companyMiraklDrawAll(compId){
    companyMiraklGrid = null;
    $.ajax({
        url : companyShowMiraklUrl,
        type : "GET",
        data : "format=json",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var gridColumns = [{
                id : "name",
                name : companyMiraklNameLabel,
                field : "name",
                width : 43,
                formatter : companyMiraklGridNameFormatter,
                cssClass : "cell-title"
            },{
                id : "url",
                name : companyMiraklUrlLabel,
                field : "url",
                width : 43,
                cssClass : ""
            },{
                id : "active",
                name : companyMiraklActiveLabel,
                field : "active",
                width : 14,
                formatter : companyMiraklGridActiveFormatter,
                cssClass : "cell-centered"
            },{
                id : "cronExpr",
                name : companyMiraklManualLabel,
                field : "cronExpr",
                width : 14,
                formatter : companyMiraklGridManualFormatter,
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
            var miraklData = response;
            if(miraklData){
                for ( var i = 0; i < miraklData.length; i++) {
                    gridData[gridData.length] = {
                        "id" : i,
                        "miraklId": miraklData[i].id,
                        "name": miraklData[i].name,
                        "url": miraklData[i].url,
                        "frontKey": miraklData[i].frontKey,
                        "apiKey": miraklData[i].apiKey,
                        "shopId": miraklData[i].shopId,
                        "active": miraklData[i].active,
                        "cronExpr" : miraklData[i].cronExpr,
                        "companyId": compId
                    }
                }
            }
            companyMiraklGrid = new Slick.Grid($("#miraklGrid"), gridData, gridColumns, gridOptions);

            companyMiraklGrid.setSelectionModel(new Slick.RowSelectionModel());
            companyMiraklGrid.invalidate();
        }
    });
}

function companyMiraklGridManualFormatter(row, cell, value, columnDef, dataContext){
    var checkBox = "<input type='checkbox' disabled='disabled' style='margin-top:4px;'";
    checkBox += (value == "\"\"") ? "checked='checked'/>" : "/>";
    return checkBox;
}

function companyMiraklGridActiveFormatter(row, cell, value, columnDef, dataContext){
    var checkBox = "<input type='checkbox' disabled='disabled' style='margin-top:4px;'";
    checkBox += (value) ? "checked='checked'/>" : "/>";
    return checkBox;
}

function companyMiraklGridNameFormatter (row, cell, value, columnDef, dataContext){
    return "<a href='javascript:companyMiraklGetDetails(" + dataContext.companyId + ", " + dataContext.miraklId + ", " + false + ")'>" + value + "</a>";
}

function companyMiraklGetDetails(companyId, miraklId, isCreate){
    $.get(
        companyMiraklPageUrl,
        {},
        function(htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            companyMiraklPageSetup(htmlresponse, companyId, miraklId, isCreate);
        },
        "html"
    );
}

function companyMiraklPageSetup(htmlresponse, companyId, miraklId, isCreate){
    if ($("#companyMiraklDialog").dialog("isOpen") !== true) {
        $("#companyMiraklDialog").empty();
        $("#companyMiraklDialog").html(htmlresponse);
        $("#companyMiraklDialog").dialog({
            title : companyMiraklTitleLabel,
            modal : true,
            resizable : false,
            width : "auto",
            height : "auto",
            open : function(event) {
                companyMiraklPageInitControls(isCreate);
                companyMiraklPageInitFields(miraklId, isCreate);
            },
            buttons : {
                deleteLabel : function() {
                    companyMiraklDeleteEnv(companyId);
                },
                cancelLabel : function() {
                    $("#companyMiraklDialog").dialog("close");
                },
                updateLabel : function() {
                    if (companyMiraklValidateForm(false))
                        companyMiraklUpdateEnv(companyId);
                },
                createLabel : function() {
                    if (companyMiraklValidateForm(true))
                        companyMiraklCreateEnv(companyId);
                }
            }
        });
    }
}

function companyMiraklPageInitControls(isCreate) {
    companyMiraklShowSecurity = ($("#companyMiraklSecurityTab").length > 0);
    if(companyMiraklShowSecurity){
        $("#companyMiraklTabs .tabs a").unbind();
        $("#companyMiraklSecurityTab").removeClass("disabled");
        $("#companyMiraklSecurityDiv").hide();
        $("#companyMiraklGeneralTab").addClass("selected");
    }
    else{
        $("#companyMiraklSecurityDiv, #companyMiraklTabs #ulTabs").hide().remove();
    }
    if (isCreate) {
        $("#companyMiraklSecurityTab").addClass("disabled");
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
    }
    else {
        if(companyMiraklShowSecurity) {
            $("#companyMiraklTabs .tabs a").unbind().click(function () {
                $("#companyMiraklTabs .tabs .selected").removeClass("selected");
                $(this).addClass("selected");
                switch ($(this).attr("id")) {
                    case "companyMiraklGeneralTab":
                        $("#companyMiraklSecurityDiv").hide();
                        $("#companyMiraklCreateDiv").show();
                        break;
                    case "companyMiraklSecurityTab":
                        $("#companyMiraklCreateDiv").hide();
                        $("#companyMiraklSecurityDiv").show();
                        break;
                    default:
                        break;
                }
            });
        }
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").addClass("ui-delete-button");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").addClass("ui-update-button");
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").html("<span class='ui-button-text'>" + deleteLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").html("<span class='ui-button-text'>" + updateLabel + "</span>");
    }
    companyMiraklPageInitCronControls(isCreate);
}

function companyMiraklPageInitFields(miraklId, isCreate){
    $("#companyMiraklId").val(miraklId);
    $("#companyMiraklName, #companyMiraklUrl, #companyMiraklFrontKey, #companyMiraklApiKey").val("");
    $("#companyMiraklActive").prop("checked", false);
    $("#companyMiraklManual").prop("checked", false);
    companyMiraklPageInitCronFields();

    if (!isCreate){
        var mirakl = null;
        var data = companyMiraklGrid.getData();
        for (var i = 0; i < data.length; i++) {
            if (data[i].miraklId == miraklId){
                mirakl = data[i];
                break;
            }
        }
        if(mirakl){
            $("#companyMiraklName").val(mirakl.name);
            $("#companyMiraklUrl").val(mirakl.url);
            $("#companyMiraklFrontKey").val(mirakl.frontKey);
            $("#companyMiraklApiKey").val(mirakl.apiKey);
            $("#companyMiraklShopId").val(mirakl.shopId);
            if(mirakl.active)
                $("#companyMiraklActive").prop("checked", true);
            if(mirakl.cronExpr == "\"\""){
                $("#companyMiraklCronDailyTab").addClass("selected");
                $("#companyMiraklCronDailyDiv").show();
                companyMiraklCronType = "daily";
                $("#companyMiraklManual").prop("checked", true);
                $("#companyMiraklCron").hide();
            }
            else{
                $("#companyMiraklCron").show();
                companyMiraklResolveCron(mirakl.cronExpr);
            }
            if(companyMiraklShowSecurity)
                securityGetAllUsers(mirakl.companyId, "companyMiraklSecurityUsers", "publishCatalogs", [mirakl.companyId, data[i].miraklId]);
        }
    }
}

function companyMiraklValidateForm(isCreate){
    if ($("#companyMiraklName").val() == "" || $("#companyMiraklUrl").val() == "" ||
        $("#companyMiraklApiKey").val() == "" || $("#companyMiraklShopId").val() == "") {
        if($("#companyMiraklName").val() == "")
            $("#companyMiraklForm #companyMiraklName").focus();
        else if($("#companyMiraklUrl").val() == "")
            $("#companyMiraklForm #companyMiraklUrl").focus();
        else if($("#companyMiraklApiKey").val() == "")
            $("#companyMiraklForm #companyMiraklApiKey").focus();
        else if($("#companyMiraklShopId").val() == "")
            $("#companyMiraklForm #companyMiraklShopId").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : "error"
        });
        return false;
    }
    var data = companyMiraklGrid.getData();
    for (var i = 0; i < data.length; i++) {
        if ((isCreate && data[i].name == $("#companyMiraklName").val().trim())
            || (!isCreate  && data[i].name == $("#companyMiraklName").val().trim() && data[i].miraklId != $("#companyMiraklId").val())){
            $("#companyMiraklForm #companyMiraklName").focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyMiraklUniqueErrorLabel,
                stay : false,
                type : "error"
            });
            return false;
        }
    }
    if (!$("#companyMiraklUrl")[0].checkValidity()) {
        $("#companyMiraklForm #companyMiraklUrl").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyMiraklUrlErrorLabel,
            stay : false,
            type : 'error'
        });
        return false;
    }
    if(!$("#companyMiraklManual").is(":checked")) {
        if (companyMiraklCronType == "minutes") {
            if (!$("#companyMiraklCronMinutesVal")[0].checkValidity() || $("#companyMiraklCronMinutesVal").val() == "") {
                var errorMessage = $("#companyMiraklCronMinutesVal").val() == "" ? fieldsRequiredMessageLabel : companyMiraklCronErrorLabel;
                $("#companyMiraklForm #companyMiraklCronMinutesVal").focus();
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: errorMessage,
                    stay: false,
                    type: 'error'
                });
                return false;
            }
        }
        if (companyMiraklCronType == "hourly" && $("#companyMiraklCronHourlyRepeat").prop("checked")) {
            if (!$("#companyMiraklCronHourlyVal")[0].checkValidity() || $("#companyMiraklCronHourlyVal").val() == "") {
                var errorMessage = $("#companyMiraklCronHourlyVal").val() == "" ? fieldsRequiredMessageLabel : companyMiraklCronErrorLabel;
                $("#companyMiraklForm #companyMiraklCronHourlyVal").focus();
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: errorMessage,
                    stay: false,
                    type: 'error'
                });
                return false;
            }
        }
        if (companyMiraklCronType == "daily" && $("#companyMiraklCronDailyRepeat").prop("checked")) {
            if (!$("#companyMiraklCronDailyVal")[0].checkValidity() || $("#companyMiraklCronDailyVal").val() == "") {
                var errorMessage = $("#companyMiraklCronHourlyVal").val() == "" ? fieldsRequiredMessageLabel : companyMiraklCronErrorLabel;
                $("#companyMiraklForm #companyMiraklCronDailyVal").focus();
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: errorMessage,
                    stay: false,
                    type: 'error'
                });
                return false;
            }
        }
        if (companyMiraklCronType == "weekly") {
            if ($("#companyMiraklCronWeeklyDiv input[type='checkbox']:checked").length == 0) {
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: companyMiraklCronErrorLabel,
                    stay: false,
                    type: 'error'
                });
                return false;
            }
        }
        if (companyMiraklCronType == "monthly") {
            if ($("#companyMiraklCronMonthlyRepeat").prop("checked")) {
                if (!$("#companyMiraklCronMonthlyRepeatDay")[0].checkValidity() || $("#companyMiraklCronMonthlyRepeatDay").val() == "" || !$("#companyMiraklCronMonthlyRepeatMonths")[0].checkValidity() || $("#companyMiraklCronMonthlyRepeatMonths").val() == "") {
                    var errorMessage = ($("#companyMiraklCronMonthlyRepeatDay").val() == "" || $("#companyMiraklCronMonthlyRepeatMonths").val() == "") ? fieldsRequiredMessageLabel : companyMiraklCronErrorLabel;
                    if (!$("#companyMiraklCronMonthlyRepeatDay")[0].checkValidity() || $("#companyMiraklCronMonthlyRepeatDay").val() == "")
                        $("#companyMiraklForm #companyMiraklCronMonthlyRepeatDay").focus();
                    else
                        $("#companyMiraklForm #companyMiraklCronMonthlyRepeatMonths").focus();
                    jQuery.noticeAdd({
                        stayTime: 2000,
                        text: errorMessage,
                        stay: false,
                        type: 'error'
                    });
                    return false;
                }
            }
            else if (!$("#companyMiraklCronMonthlyOnceMonths")[0].checkValidity() || $("#companyMiraklCronMonthlyOnceMonths").val() == "") {
                var errorMessage = $("#companyMiraklCronMonthlyOnceMonths").val() == "" ? fieldsRequiredMessageLabel : companyMiraklCronErrorLabel;
                $("#companyMiraklForm #companyMiraklCronMonthlyOnceMonths").focus();
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: errorMessage,
                    stay: false,
                    type: 'error'
                });
                return false;
            }
        }
        if (companyMiraklCronType == "yearly" && $("#companyMiraklCronYearlyRepeat").prop("checked")) {
            if (!$("#companyMiraklCronYearlyRepeatDay")[0].checkValidity() || $("#companyMiraklCronYearlyRepeatDay").val() == "") {
                var errorMessage = $("#companyMiraklCronYearlyRepeatDay").val() == "" ? fieldsRequiredMessageLabel : companyMiraklCronErrorLabel;
                $("#companyMiraklForm #companyMiraklCronYearlyRepeatDay").focus();
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: errorMessage,
                    stay: false,
                    type: 'error'
                });
                return false;
            }
        }
    }
    return true;
}

function companyMiraklCreateEnv(companyId){
    var url = ($("#companyMiraklUrl").val().trim() != "" && $("#companyMiraklUrl").val().indexOf("://") < 0 ) ? "http://" + $("#companyMiraklUrl").val().trim() : $("#companyMiraklUrl").val().trim();
    var dataToSend = "miraklenv.name=" + encodeURIComponent($("#companyMiraklName").val()) + "&miraklenv.url=" + encodeURIComponent(url);
    dataToSend += "&miraklenv.frontKey=" + encodeURIComponent($("#companyMiraklFrontKey").val()) + "&miraklenv.apiKey=" + encodeURIComponent($("#companyMiraklApiKey").val());
    dataToSend += "&miraklenv.shopId=" + encodeURIComponent($("#companyMiraklShopId").val());
    if($("#companyMiraklManual").is(":checked"))
        dataToSend += "&miraklenv.cronExpr=\"\"";
    else
        dataToSend += "&miraklenv.cronExpr=" + companyMiraklGetCronExpr();
    dataToSend += "&miraklenv.active=" + $("#companyMiraklActive").is(":checked") + "&miraklenv.running=false&format=json";
    $.ajax({
        url : companyCreateMiraklUrl,
        type : "POST",
        noticeType : "POST",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyMiraklDialog").dialog("close");
            companyMiraklDrawAll(companyId);
        },
        error : function(response, status) {
            $("#companyMiraklName").focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyMiraklUniqueErrorLabel,
                stay : false,
                type : "error"
            });
        }
    });
}

function companyMiraklUpdateEnv(companyId){
    var url = ($("#companyMiraklUrl").val().trim() != "" && $("#companyMiraklUrl").val().indexOf("://") < 0 ) ? "http://" + $("#companyMiraklUrl").val().trim() : $("#companyMiraklUrl").val().trim();
    var dataToSend = "miraklenv.id=" + $("#companyMiraklId").val() + "&miraklenv.name=" + encodeURIComponent($("#companyMiraklName").val()) + "&miraklenv.url=" + encodeURIComponent(url);
    dataToSend += "&miraklenv.frontKey=" + encodeURIComponent($("#companyMiraklFrontKey").val()) + "&miraklenv.apiKey=" + encodeURIComponent($("#companyMiraklApiKey").val());
    dataToSend += "&miraklenv.shopId=" + encodeURIComponent($("#companyMiraklShopId").val());
    if($("#companyMiraklManual").is(":checked"))
        dataToSend += "&miraklenv.cronExpr=\"\"";
    else
        dataToSend += "&miraklenv.cronExpr=" + companyMiraklGetCronExpr();
    dataToSend += "&miraklenv.active=" + $("#companyMiraklActive").is(":checked") + "&miraklenv.running=false&format=json";
    $.ajax({
        url : companyUpdateMiraklUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyMiraklDialog").dialog("close");
            companyMiraklDrawAll(companyId);
        },
        error : function(response, status) {
            $("#companyMiraklName").focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyMiraklUniqueErrorLabel,
                stay : false,
                type : "error"
            });
        }
    });
}

function companyMiraklDeleteEnv(companyId){
    var dataToSend = "miraklenv.id=" + $("#companyMiraklId").val();
    $.ajax({
        url : companyDeleteMiraklUrl,
        type : "POST",
        noticeType : "DELETE",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyMiraklDialog").dialog("close");
            companyMiraklDrawAll(companyId);
        },
        error : function(response, status) {}
    });
}

//Cron Functions
var companyMiraklCronType;

function companyMiraklPageInitCronControls(isCreate){
    $("#companyMiraklManual").unbind().bind("click", function(){
        if($(this).is(":checked"))
            $("#companyMiraklCron").hide();
        else
            $("#companyMiraklCron").show();
    });
    $("#companyMiraklCron .cronTabs li a").unbind().click(function () {
        $("#companyMiraklCron .cronTabs li a").removeClass("selected");
        $(this).addClass("selected");
        $("#companyMiraklCron .cronForm").hide();
        $("#" + this.id.replace("Tab", "Div")).show();
        companyMiraklCronType = $(this).attr("name");
    });
    $("#companyMiraklCronHourlyRepeat").unbind().click(function(){
        $("#companyMiraklCronHourlyVal").removeAttr("disabled");
        $("#companyMiraklCronHourlyMinutes, #companyMiraklCronHourlyHour").attr("disabled", "disabled");
    });
    $("#companyMiraklCronHourlyOnce").unbind().click(function(){
        $("#companyMiraklCronHourlyVal").attr("disabled", "disabled");
        $("#companyMiraklCronHourlyMinutes, #companyMiraklCronHourlyHour").removeAttr("disabled", "disabled");
    });
    $("#companyMiraklCronDailyRepeat").unbind().click(function(){$("#companyMiraklCronDailyVal").removeAttr("disabled");});
    $("#companyMiraklCronDailyOnce").unbind().click(function(){$("#companyMiraklCronDailyVal").attr("disabled", "disabled");});
    $("#companyMiraklCronMonthlyRepeat").unbind().click(function(){
        $("#companyMiraklCronMonthlyRepeatDay, #companyMiraklCronMonthlyRepeatMonths").removeAttr("disabled");
        $("#companyMiraklCronMonthlyOnceRank, #companyMiraklCronMonthlyOnceDay, #companyMiraklCronMonthlyOnceMonths").attr("disabled", "disabled");
    });
    $("#companyMiraklCronMonthlyOnce").unbind().click(function(){
        $("#companyMiraklCronMonthlyRepeatDay, #companyMiraklCronMonthlyRepeatMonths").attr("disabled", "disabled");
        $("#companyMiraklCronMonthlyOnceRank, #companyMiraklCronMonthlyOnceDay, #companyMiraklCronMonthlyOnceMonths").removeAttr("disabled");
    });
    $("#companyMiraklCronYearlyRepeat").unbind().click(function(){
        $("#companyMiraklCronYearlyRepeatDay, #companyMiraklCronYearlyRepeatMonth").removeAttr("disabled");
        $("#companyMiraklCronYearlyOnceRank, #companyMiraklCronYearlyOnceDay, #companyMiraklCronYearlyOnceMonth").attr("disabled", "disabled");
    });
    $("#companyMiraklCronYearlyOnce").unbind().click(function(){
        $("#companyMiraklCronYearlyRepeatDay, #companyMiraklCronYearlyRepeatMonth").attr("disabled", "disabled");
        $("#companyMiraklCronYearlyOnceRank, #companyMiraklCronYearlyOnceDay, #companyMiraklCronYearlyOnceMonth").removeAttr("disabled");
    });
    if (isCreate) {
        $("#companyMiraklCronDailyTab").addClass("selected");
        $("#companyMiraklCronDailyDiv").show();
        companyMiraklCronType = "daily";
    }
}

function companyMiraklPageInitCronFields(){
    var minutesOptions = "";
    var i = 0, label = "", selected = "";
    for(i = 0; i < 60; i++){
        label = (i < 10) ? "0" + i : i;
        selected = (i == 0) ? "selected='selected'" : "";
        minutesOptions += "<option value='" + i + "' " + selected + ">" + label + "</option>";
    }
    var hourOptions = "";
    for(i = 0; i < 24; i++){
        label = (i < 10) ? "0" + i : i;
        selected = (i == 0) ? "selected='selected'" : "";
        hourOptions += "<option value='" + i + "' " + selected + ">" + label + "</option>";
    }
    $("#companyMiraklCronMinutesMinutes, #companyMiraklCronHourlyMinutes, #companyMiraklCronDailyMinutes, #companyMiraklCronWeeklyMinutes, #companyMiraklCronMonthlyMinutes, #companyMiraklCronYearlyMinutes").html(minutesOptions);
    $("#companyMiraklCronMinutesHour, #companyMiraklCronHourlyHour, #companyMiraklCronDailyHour, #companyMiraklCronWeeklyHour, #companyMiraklCronMonthlyHour, #companyMiraklCronYearlyHour").html(hourOptions);
}

function companyMiraklGetCronExpr(){
    var cronExpr = "";
    switch (companyMiraklCronType){
        case "minutes":
            cronExpr = "0 */" + $("#companyMiraklCronMinutesVal").val() + " * * * ? *";
            break;
        case "hourly":
            if($("#companyMiraklCronHourlyRepeat").prop("checked"))
                cronExpr = "0 0 0/" + $("#companyMiraklCronHourlyVal").val() + " * * ? *";
            else
                cronExpr = "0 " + $("#companyMiraklCronHourlyMinutes").val() + " " + $("#companyMiraklCronHourlyHour").val() + " * * ? *";
            break;
        case "daily":
            if($("#companyMiraklCronDailyRepeat").prop("checked"))
                cronExpr = "0 " + $("#companyMiraklCronDailyMinutes").val() + " " + $("#companyMiraklCronDailyHour").val() + " 1/" + $("#companyMiraklCronDailyVal").val() + " * ? *";
            else
                cronExpr = "0 " + $("#companyMiraklCronDailyMinutes").val() + " " + $("#companyMiraklCronDailyHour").val() + " ? * MON-FRI *";
            break;
        case "weekly":
            var checkedDays = $("#companyMiraklCronWeeklyDiv input[type='checkbox']:checked");
            var days = "";
            for(var i = 0; i < checkedDays.length; i++){
                days += days != "" ? "," : "";
                days += checkedDays[i].value
            }
            cronExpr = "0 " + $("#companyMiraklCronWeeklyMinutes").val() + " " + $("#companyMiraklCronWeeklyHour").val() + " ? * " + days + " *";
            break;
        case "monthly":
            if($("#companyMiraklCronMonthlyRepeat").prop("checked"))
                cronExpr = "0 " + $("#companyMiraklCronMonthlyMinutes").val() + " " + $("#companyMiraklCronMonthlyHour").val() + " " + $("#companyMiraklCronMonthlyRepeatDay").val() + " 1/" + $("#companyMiraklCronMonthlyRepeatMonths").val() + " ? *";
            else
                cronExpr = "0 " + $("#companyMiraklCronMonthlyMinutes").val() + " " + $("#companyMiraklCronMonthlyHour").val() + " ? 1/" + $("#companyMiraklCronMonthlyOnceMonths").val() + " " + $("#companyMiraklCronMonthlyOnceDay").val() + "#" + $("#companyMiraklCronMonthlyOnceRank").val() + " *";
            break;
        case "yearly":
            if($("#companyMiraklCronYearlyRepeat").prop("checked"))
                cronExpr = "0 " + $("#companyMiraklCronYearlyMinutes").val() + " " + $("#companyMiraklCronYearlyHour").val() + " " + $("#companyMiraklCronYearlyRepeatDay").val() + " " + $("#companyMiraklCronYearlyRepeatMonth").val() + " ? *";
            else
                cronExpr = "0 " + $("#companyMiraklCronYearlyMinutes").val() + " " + $("#companyMiraklCronYearlyHour").val() + " ? " + $("#companyMiraklCronYearlyOnceMonth").val() + " " + $("#companyMiraklCronYearlyOnceDay").val() + "#" + $("#companyMiraklCronYearlyOnceRank").val() + " *";
            break;
        default:
            break;
    }
    return cronExpr;
}

function companyMiraklResolveCron(expr){
    var exprTab = expr.split(" ");
    if(exprTab[5] != "?"){
        if(exprTab[5].indexOf("#") >= 0){
            if(exprTab[4].indexOf("/") >= 0){
                $("#companyMiraklCronMonthlyTab").addClass("selected");
                $("#companyMiraklCronMonthlyDiv").show();
                companyMiraklCronType = "monthly";
                $("#companyMiraklCronMonthlyOnce").prop("checked", true);
                $("#companyMiraklCronMonthlyRepeatDay, #companyMiraklCronMonthlyRepeatMonths").attr("disabled", "disabled");
                $("#companyMiraklCronMonthlyOnceMonths").val(exprTab[4].split("/")[1]).removeAttr("disabled");
                $("#companyMiraklCronMonthlyOnceDay").val(exprTab[5].split("#")[0]).removeAttr("disabled");
                $("#companyMiraklCronMonthlyOnceRank").val(exprTab[5].split("#")[1]).removeAttr("disabled");
                $("#companyMiraklCronMonthlyMinutes").val(exprTab[1]);
                $("#companyMiraklCronMonthlyHour").val(exprTab[2]);
                return;
            }
            $("#companyMiraklCronYearlyTab").addClass("selected");
            $("#companyMiraklCronYearlyDiv").show();
            companyMiraklCronType = "yearly";
            $("#companyMiraklCronYearlyOnce").prop("checked", true);
            $("#companyMiraklCronYearlyRepeatMonth, #companyMiraklCronYearlyRepeatDay").attr("disabled", "disabled");
            $("#companyMiraklCronYearlyOnceMonth").val(exprTab[4]).removeAttr("disabled");
            $("#companyMiraklCronYearlyOnceDay").val(exprTab[5].split("#")[0]).removeAttr("disabled");
            $("#companyMiraklCronYearlyOnceRank").val(exprTab[5].split("#")[1]).removeAttr("disabled");
            $("#companyMiraklCronYearlyMinutes").val(exprTab[1]);
            $("#companyMiraklCronYearlyHour").val(exprTab[2]);
            return;
        }
        if(exprTab[5].indexOf("-") >= 0){
            $("#companyMiraklCronDailyTab").addClass("selected");
            $("#companyMiraklCronDailyDiv").show();
            companyMiraklCronType = "daily";
            $("#companyMiraklCronDailyOnce").prop("checked", true);
            $("#companyMiraklCronDailyVal").attr("disabled", "disabled");
            $("#companyMiraklCronDailyMinutes").val(exprTab[1]);
            $("#companyMiraklCronDailyHour").val(exprTab[2]);
            return;
        }
        $("#companyMiraklCronWeeklyTab").addClass("selected");
        $("#companyMiraklCronWeeklyDiv").show();
        companyMiraklCronType = "weekly";
        var days = [exprTab[5]];
        if(exprTab[5].indexOf(",") >= 0)
            days = exprTab[5].split(",");
        for(var i = 0; i < days.length; i++){
            $("#companyMiraklCronWeekly" + days[i]).prop("checked", true);
        }
        $("#companyMiraklCronWeeklyMinutes").val(exprTab[1]);
        $("#companyMiraklCronWeeklyHour").val(exprTab[2]);
        return;
    }
    if(exprTab[4] != "*"){
        if(exprTab[4].indexOf("/") >= 0){
            $("#companyMiraklCronMonthlyTab").addClass("selected");
            $("#companyMiraklCronMonthlyDiv").show();
            companyMiraklCronType = "monthly";
            $("#companyMiraklCronMonthlyRepeatMonths").val(exprTab[4].split("/")[1]);
            $("#companyMiraklCronMonthlyRepeatDay").val(exprTab[3]);
            $("#companyMiraklCronMonthlyMinutes").val(exprTab[1]);
            $("#companyMiraklCronMonthlyHour").val(exprTab[2]);
            return;
        }
        $("#companyMiraklCronYearlyTab").addClass("selected");
        $("#companyMiraklCronYearlyDiv").show();
        companyMiraklCronType = "yearly";
        $("#companyMiraklCronYearlyRepeatMonth").val(exprTab[4]);
        $("#companyMiraklCronYearlyRepeatDay").val(exprTab[3]);
        $("#companyMiraklCronYearlyMinutes").val(exprTab[1]);
        $("#companyMiraklCronYearlyHour").val(exprTab[2]);
        return;
    }
    if(exprTab[3] != "*" && exprTab[3].indexOf("/") >= 0){
        $("#companyMiraklCronDailyTab").addClass("selected");
        $("#companyMiraklCronDailyDiv").show();
        companyMiraklCronType = "daily";
        $("#companyMiraklCronDailyVal").val(exprTab[3].split("/")[1]);
        $("#companyMiraklCronDailyMinutes").val(exprTab[1]);
        $("#companyMiraklCronDailyHour").val(exprTab[2]);
        return;
    }
    if(exprTab[2] != "*"){
        $("#companyMiraklCronHourlyTab").addClass("selected");
        $("#companyMiraklCronHourlyDiv").show();
        companyMiraklCronType = "hourly";
        if(exprTab[2].indexOf("/") >= 0){
            $("#companyMiraklCronHourlyVal").val(exprTab[2].split("/")[1]);
        }
        else {
            $("#companyMiraklCronHourlyOnce").prop("checked", true);
            $("#companyMiraklCronHourlyVal").attr("disabled", "disabled");
            $("#companyMiraklCronHourlyMinutes").val(exprTab[1]).removeAttr("disabled");
            $("#companyMiraklCronHourlyHour").val(exprTab[2]).removeAttr("disabled");
        }
        return;
    }
    if(exprTab[1] != "*" && exprTab[1].indexOf("/") >= 0) {
        companyMiraklCronType = "minutes";
        $("#companyMiraklCronMinutesTab").addClass("selected");
        $("#companyMiraklCronMinutesDiv").show();
        $("#companyMiraklCronMinutesVal").val(exprTab[1].split("/")[1]);
    }
}