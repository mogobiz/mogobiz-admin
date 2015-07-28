var companyPublishingGrid = null;
var companyPublishingShowSecurity;

function companyPublishingDrawAll(compId){
    companyPublishingGrid = null;
    $.ajax({
        url : companyShowPublishingUrl,
        type : "GET",
        data : "format=json",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var gridColumns = [{
                id : "name",
                name : companyPublishingNameLabel,
                field : "name",
                width : 43,
                formatter : companyPublishingGridNameFormatter,
                cssClass : "cell-title"
            },{
                id : "url",
                name : companyPublishingUrlLabel,
                field : "url",
                width : 43,
                cssClass : ""
            },{
                id : "active",
                name : companyPublishingActiveLabel,
                field : "active",
                width : 14,
                formatter : companyPublishingGridActiveFormatter,
                cssClass : "cell-centered"
            },{
                id : "cronExpr",
                name : companyPublishingManualLabel,
                field : "cronExpr",
                width : 14,
                formatter : companyPublishingGridManualFormatter,
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
            var publishing = response;
            if(publishing){
                for ( var i = 0; i < publishing.length; i++) {
                    gridData[gridData.length] = {
                        "id" : i,
                        "publishingId": publishing[i].id,
                        "name": publishing[i].name,
                        "url": publishing[i].url,
                        "active": publishing[i].active,
                        "cronExpr" : publishing[i].cronExpr,
                        "companyId": compId
                    }
                }
            }
            companyPublishingGrid = new Slick.Grid($("#publishingGrid"), gridData, gridColumns, gridOptions);

            companyPublishingGrid.setSelectionModel(new Slick.RowSelectionModel());
            companyPublishingGrid.invalidate();
        }
    });
}

function companyPublishingGridManualFormatter(row, cell, value, columnDef, dataContext){
    var checkBox = "<input type='checkbox' disabled='disabled' style='margin-top:4px;'";
    checkBox += (value == "\"\"") ? "checked='checked'/>" : "/>";
    return checkBox;
}

function companyPublishingGridActiveFormatter(row, cell, value, columnDef, dataContext){
    var checkBox = "<input type='checkbox' disabled='disabled' style='margin-top:4px;'";
    checkBox += (value) ? "checked='checked'/>" : "/>";
    return checkBox;
}

function companyPublishingGridNameFormatter (row, cell, value, columnDef, dataContext){
    return "<a href='javascript:companyPublishingGetDetails(" + dataContext.companyId + ", " + dataContext.publishingId + ", " + false + ")'>" + value + "</a>";
}

function companyPublishingGetDetails(companyId, publishingId, isCreate){
    $.get(
        companyPublishingPageUrl,
        {},
        function(htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            companyPublishingPageSetup(htmlresponse, companyId, publishingId, isCreate);
        },
        "html"
    );
}

function companyPublishingPageSetup(htmlresponse, companyId, publishingId, isCreate){
    if ($("#companyPublishingDialog").dialog("isOpen") !== true) {
        $("#companyPublishingDialog").empty();
        $("#companyPublishingDialog").html(htmlresponse);
        $("#companyPublishingDialog").dialog({
            title : companyPublishingTitleLabel,
            modal : true,
            resizable : false,
            width : "auto",
            height : "auto",
            open : function(event) {
                companyPublishingPageInitControls(isCreate);
                companyPublishingPageInitFields(publishingId, isCreate);
            },
            buttons : {
                deleteLabel : function() {
                    companyPublishingDeletePublishing(companyId);
                },
                cancelLabel : function() {
                    $("#companyPublishingDialog").dialog("close");
                },
                updateLabel : function() {
                    if (companyPublishingValidateForm())
                        companyPublishingUpdatePublishing(companyId);
                },
                createLabel : function() {
                    if (companyPublishingValidateForm())
                        companyPublishingCreatePublishing(companyId);
                }
            }
        });
    }
}

function companyPublishingPageInitControls(isCreate) {
    companyPublishingShowSecurity = ($("#companyPublishingSecurityTab").length > 0);
    if(companyPublishingShowSecurity){
        $("#companyPublishingTabs .tabs a").unbind();
        $("#companyPublishingSecurityTab").removeClass("disabled");
        $("#companyPublishingSecurityDiv").hide();
        $("#companyPublishingGeneralTab").addClass("selected");
    }
    else{
        $("#companyPublishingSecurityDiv, #companyPublishingTabs #ulTabs").hide().remove();
    }
    if (isCreate) {
        $("#companyPublishingSecurityTab").addClass("disabled");
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
    }
    else {
        if(companyPublishingShowSecurity) {
            $("#companyPublishingTabs .tabs a").unbind().click(function () {
                $("#companyPublishingTabs .tabs .selected").removeClass("selected");
                $(this).addClass("selected");
                switch ($(this).attr("id")) {
                    case "companyPublishingGeneralTab":
                        $("#companyPublishingSecurityDiv").hide();
                        $("#companyPublishingCreateDiv").show();
                        break;
                    case "companyPublishingSecurityTab":
                        $("#companyPublishingCreateDiv").hide();
                        $("#companyPublishingSecurityDiv").show();
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
    companyPublishingPageInitCronControls(isCreate);
}

function companyPublishingPageInitFields(publishingId, isCreate){
    $("#companyPublishingId").val(publishingId);
    $("#companyPublishingName,#companyPublishingUrl").val("");
    $("#companyPublishingActive").prop("checked", false);
    $("#companyPublishingManual").prop("checked", false);
    companyPublishingPageInitCronFields();

    if (!isCreate){
        var publishing = null;
        var data = companyPublishingGrid.getData();
        for (var i = 0; i < data.length; i++) {
            if (data[i].publishingId == publishingId){
                publishing = data[i];
                break;
            }
        }
        if(publishing){
            $("#companyPublishingName").val(publishing.name);
            $("#companyPublishingUrl").val(publishing.url);
            if(publishing.active)
                $("#companyPublishingActive").prop("checked", true);
            if(publishing.cronExpr == "\"\""){
                $("#companyPublishingManual").prop("checked", true);
                $("#companyPublishingCron").hide();
            }
            else{
                $("#companyPublishingCron").show();
                companyPublishingResolveCron(publishing.cronExpr);
            }
            if(companyPublishingShowSecurity)
                securityGetAllUsers(publishing.companyId, "companyPublishingSecurityUsers", "publishCatalogs", [publishing.companyId, data[i].publishingId]);
        }
    }
}

function companyPublishingValidateForm(){
    if ($("#companyPublishingName").val() == "" || $("#companyPublishingUrl").val() == "") {
        if($("#companyPublishingName").val() == "")
            $("#companyPublishingForm #companyPublishingName").focus();
        else
            $("#companyPublishingForm #companyPublishingUrl").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : "error"
        });
        return false;
    }
    if (!$("#companyPublishingUrl")[0].checkValidity()) {
        $("#companyPublishingForm #companyPublishingUrl").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyPublishingUrlErrorLabel,
            stay : false,
            type : 'error'
        });
        return false;
    }
    if(!$("#companyPublishingManual").is(":checked")) {
        if (companyPublishingCronType == "minutes") {
            if (!$("#companyPublishingCronMinutesVal")[0].checkValidity() || $("#companyPublishingCronMinutesVal").val() == "") {
                var errorMessage = $("#companyPublishingCronMinutesVal").val() == "" ? fieldsRequiredMessageLabel : companyPublishingCronErrorLabel;
                $("#companyPublishingForm #companyPublishingCronMinutesVal").focus();
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: errorMessage,
                    stay: false,
                    type: 'error'
                });
                return false;
            }
        }
        if (companyPublishingCronType == "hourly" && $("#companyPublishingCronHourlyRepeat").prop("checked")) {
            if (!$("#companyPublishingCronHourlyVal")[0].checkValidity() || $("#companyPublishingCronHourlyVal").val() == "") {
                var errorMessage = $("#companyPublishingCronHourlyVal").val() == "" ? fieldsRequiredMessageLabel : companyPublishingCronErrorLabel;
                $("#companyPublishingForm #companyPublishingCronHourlyVal").focus();
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: errorMessage,
                    stay: false,
                    type: 'error'
                });
                return false;
            }
        }
        if (companyPublishingCronType == "daily" && $("#companyPublishingCronDailyRepeat").prop("checked")) {
            if (!$("#companyPublishingCronDailyVal")[0].checkValidity() || $("#companyPublishingCronDailyVal").val() == "") {
                var errorMessage = $("#companyPublishingCronHourlyVal").val() == "" ? fieldsRequiredMessageLabel : companyPublishingCronErrorLabel;
                $("#companyPublishingForm #companyPublishingCronDailyVal").focus();
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: errorMessage,
                    stay: false,
                    type: 'error'
                });
                return false;
            }
        }
        if (companyPublishingCronType == "weekly") {
            if ($("#companyPublishingCronWeeklyDiv input[type='checkbox']:checked").length == 0) {
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: companyPublishingCronErrorLabel,
                    stay: false,
                    type: 'error'
                });
                return false;
            }
        }
        if (companyPublishingCronType == "monthly") {
            if ($("#companyPublishingCronMonthlyRepeat").prop("checked")) {
                if (!$("#companyPublishingCronMonthlyRepeatDay")[0].checkValidity() || $("#companyPublishingCronMonthlyRepeatDay").val() == "" || !$("#companyPublishingCronMonthlyRepeatMonths")[0].checkValidity() || $("#companyPublishingCronMonthlyRepeatMonths").val() == "") {
                    var errorMessage = ($("#companyPublishingCronMonthlyRepeatDay").val() == "" || $("#companyPublishingCronMonthlyRepeatMonths").val() == "") ? fieldsRequiredMessageLabel : companyPublishingCronErrorLabel;
                    if (!$("#companyPublishingCronMonthlyRepeatDay")[0].checkValidity() || $("#companyPublishingCronMonthlyRepeatDay").val() == "")
                        $("#companyPublishingForm #companyPublishingCronMonthlyRepeatDay").focus();
                    else
                        $("#companyPublishingForm #companyPublishingCronMonthlyRepeatMonths").focus();
                    jQuery.noticeAdd({
                        stayTime: 2000,
                        text: errorMessage,
                        stay: false,
                        type: 'error'
                    });
                    return false;
                }
            }
            else if (!$("#companyPublishingCronMonthlyOnceMonths")[0].checkValidity() || $("#companyPublishingCronMonthlyOnceMonths").val() == "") {
                var errorMessage = $("#companyPublishingCronMonthlyOnceMonths").val() == "" ? fieldsRequiredMessageLabel : companyPublishingCronErrorLabel;
                $("#companyPublishingForm #companyPublishingCronMonthlyOnceMonths").focus();
                jQuery.noticeAdd({
                    stayTime: 2000,
                    text: errorMessage,
                    stay: false,
                    type: 'error'
                });
                return false;
            }
        }
        if (companyPublishingCronType == "yearly" && $("#companyPublishingCronYearlyRepeat").prop("checked")) {
            if (!$("#companyPublishingCronYearlyRepeatDay")[0].checkValidity() || $("#companyPublishingCronYearlyRepeatDay").val() == "") {
                var errorMessage = $("#companyPublishingCronYearlyRepeatDay").val() == "" ? fieldsRequiredMessageLabel : companyPublishingCronErrorLabel;
                $("#companyPublishingForm #companyPublishingCronYearlyRepeatDay").focus();
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

function companyPublishingCreatePublishing(companyId){
    var dataToSend = "esenv.name=" + $("#companyPublishingName").val() + "&esenv.url=" + $("#companyPublishingUrl").val();
    if($("#companyPublishingManual").is(":checked"))
        dataToSend += "&esenv.cronExpr=\"\"";
    else
        dataToSend += "&esenv.cronExpr=" + companyPublishingGetCronExpr();
    dataToSend += "&esenv.active=" + $("#companyPublishingActive").is(":checked") + "&esenv.running=false&format=json";
    $.ajax({
        url : companyCreatePublishingUrl,
        type : "POST",
        noticeType : "POST",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyPublishingDialog").dialog("close");
            companyPublishingDrawAll(companyId);
        },
        error : function(response, status) {
            $("#companyPublishingName").focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyPublishingUniqueErrorLabel,
                stay : false,
                type : "error"
            });
        }
    });
}

function companyPublishingUpdatePublishing(companyId){
    var dataToSend = "esenv.id=" + $("#companyPublishingId").val() + "&esenv.name=" + $("#companyPublishingName").val() + "&esenv.url=" + $("#companyPublishingUrl").val();
    if($("#companyPublishingManual").is(":checked"))
        dataToSend += "&esenv.cronExpr=\"\"";
    else
        dataToSend += "&esenv.cronExpr=" + companyPublishingGetCronExpr();
    dataToSend += "&esenv.active=" + $("#companyPublishingActive").is(":checked") + "&esenv.running=false&format=json";

    $.ajax({
        url : companyUpdatePublishingUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyPublishingDialog").dialog("close");
            companyPublishingDrawAll(companyId);
        },
        error : function(response, status) {
            $("#companyPublishingName").focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyPublishingUniqueErrorLabel,
                stay : false,
                type : "error"
            });
        }
    });
}

//Cron Functions
var companyPublishingCronType;

function companyPublishingPageInitCronControls(isCreate){
    $("#companyPublishingManual").unbind().bind("click", function(){
        if($(this).is(":checked"))
            $("#companyPublishingCron").hide();
        else
            $("#companyPublishingCron").show();
    });
    $("#companyPublishingCron .cronTabs li a").unbind().click(function () {
        $("#companyPublishingCron .cronTabs li a").removeClass("selected");
        $(this).addClass("selected");
        $("#companyPublishingCron .cronForm").hide();
        $("#" + this.id.replace("Tab", "Div")).show();
        companyPublishingCronType = $(this).attr("name");
    });
    $("#companyPublishingCronHourlyRepeat").unbind().click(function(){
        $("#companyPublishingCronHourlyVal").removeAttr("disabled");
        $("#companyPublishingCronHourlyMinutes, #companyPublishingCronHourlyHour").attr("disabled", "disabled");
    });
    $("#companyPublishingCronHourlyOnce").unbind().click(function(){
        $("#companyPublishingCronHourlyVal").attr("disabled", "disabled");
        $("#companyPublishingCronHourlyMinutes, #companyPublishingCronHourlyHour").removeAttr("disabled", "disabled");
    });
    $("#companyPublishingCronDailyRepeat").unbind().click(function(){$("#companyPublishingCronDailyVal").removeAttr("disabled");});
    $("#companyPublishingCronDailyOnce").unbind().click(function(){$("#companyPublishingCronDailyVal").attr("disabled", "disabled");});
    $("#companyPublishingCronMonthlyRepeat").unbind().click(function(){
        $("#companyPublishingCronMonthlyRepeatDay, #companyPublishingCronMonthlyRepeatMonths").removeAttr("disabled");
        $("#companyPublishingCronMonthlyOnceRank, #companyPublishingCronMonthlyOnceDay, #companyPublishingCronMonthlyOnceMonths").attr("disabled", "disabled");
    });
    $("#companyPublishingCronMonthlyOnce").unbind().click(function(){
        $("#companyPublishingCronMonthlyRepeatDay, #companyPublishingCronMonthlyRepeatMonths").attr("disabled", "disabled");
        $("#companyPublishingCronMonthlyOnceRank, #companyPublishingCronMonthlyOnceDay, #companyPublishingCronMonthlyOnceMonths").removeAttr("disabled");
    });
    $("#companyPublishingCronYearlyRepeat").unbind().click(function(){
        $("#companyPublishingCronYearlyRepeatDay, #companyPublishingCronYearlyRepeatMonth").removeAttr("disabled");
        $("#companyPublishingCronYearlyOnceRank, #companyPublishingCronYearlyOnceDay, #companyPublishingCronYearlyOnceMonth").attr("disabled", "disabled");
    });
    $("#companyPublishingCronYearlyOnce").unbind().click(function(){
        $("#companyPublishingCronYearlyRepeatDay, #companyPublishingCronYearlyRepeatMonth").attr("disabled", "disabled");
        $("#companyPublishingCronYearlyOnceRank, #companyPublishingCronYearlyOnceDay, #companyPublishingCronYearlyOnceMonth").removeAttr("disabled");
    });
    if (isCreate) {
        $("#companyPublishingCronDailyTab").addClass("selected");
        $("#companyPublishingCronDailyDiv").show();
        companyPublishingCronType = "daily";
    }
}

function companyPublishingDeletePublishing(companyId){
    var dataToSend = "esenv.id=" + $("#companyPublishingId").val();
    $.ajax({
        url : companyDeletePublishingUrl,
        type : "POST",
        noticeType : "DELETE",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyPublishingDialog").dialog("close");
            companyPublishingDrawAll(companyId);
        },
        error : function(response, status) {}
    });
}

function companyPublishingPageInitCronFields(){
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
    $("#companyPublishingCronMinutesMinutes, #companyPublishingCronHourlyMinutes, #companyPublishingCronDailyMinutes, #companyPublishingCronWeeklyMinutes, #companyPublishingCronMonthlyMinutes, #companyPublishingCronYearlyMinutes").html(minutesOptions);
    $("#companyPublishingCronMinutesHour, #companyPublishingCronHourlyHour, #companyPublishingCronDailyHour, #companyPublishingCronWeeklyHour, #companyPublishingCronMonthlyHour, #companyPublishingCronYearlyHour").html(hourOptions);
}

function companyPublishingGetCronExpr(){
    var cronExpr = "";
    switch (companyPublishingCronType){
        case "minutes":
            cronExpr = "0 */" + $("#companyPublishingCronMinutesVal").val() + " * * * ? *";
            break;
        case "hourly":
            if($("#companyPublishingCronHourlyRepeat").prop("checked"))
                cronExpr = "0 0 0/" + $("#companyPublishingCronHourlyVal").val() + " * * ? *";
            else
                cronExpr = "0 " + $("#companyPublishingCronHourlyMinutes").val() + " " + $("#companyPublishingCronHourlyHour").val() + " * * ? *";
            break;
        case "daily":
            if($("#companyPublishingCronDailyRepeat").prop("checked"))
                cronExpr = "0 " + $("#companyPublishingCronDailyMinutes").val() + " " + $("#companyPublishingCronDailyHour").val() + " 1/" + $("#companyPublishingCronDailyVal").val() + " * ? *";
            else
                cronExpr = "0 " + $("#companyPublishingCronDailyMinutes").val() + " " + $("#companyPublishingCronDailyHour").val() + " ? * MON-FRI *";
            break;
        case "weekly":
            var checkedDays = $("#companyPublishingCronWeeklyDiv input[type='checkbox']:checked");
            var days = "";
            for(var i = 0; i < checkedDays.length; i++){
                days += days != "" ? "," : "";
                days += checkedDays[i].value
            }
            cronExpr = "0 " + $("#companyPublishingCronWeeklyMinutes").val() + " " + $("#companyPublishingCronWeeklyHour").val() + " ? * " + days + " *";
            break;
        case "monthly":
            if($("#companyPublishingCronMonthlyRepeat").prop("checked"))
                cronExpr = "0 " + $("#companyPublishingCronMonthlyMinutes").val() + " " + $("#companyPublishingCronMonthlyHour").val() + " " + $("#companyPublishingCronMonthlyRepeatDay").val() + " 1/" + $("#companyPublishingCronMonthlyRepeatMonths").val() + " ? *";
            else
                cronExpr = "0 " + $("#companyPublishingCronMonthlyMinutes").val() + " " + $("#companyPublishingCronMonthlyHour").val() + " ? 1/" + $("#companyPublishingCronMonthlyOnceMonths").val() + " " + $("#companyPublishingCronMonthlyOnceDay").val() + "#" + $("#companyPublishingCronMonthlyOnceRank").val() + " *";
            break;
        case "yearly":
            if($("#companyPublishingCronYearlyRepeat").prop("checked"))
                cronExpr = "0 " + $("#companyPublishingCronYearlyMinutes").val() + " " + $("#companyPublishingCronYearlyHour").val() + " " + $("#companyPublishingCronYearlyRepeatDay").val() + " " + $("#companyPublishingCronYearlyRepeatMonth").val() + " ? *";
            else
                cronExpr = "0 " + $("#companyPublishingCronYearlyMinutes").val() + " " + $("#companyPublishingCronYearlyHour").val() + " ? " + $("#companyPublishingCronYearlyOnceMonth").val() + " " + $("#companyPublishingCronYearlyOnceDay").val() + "#" + $("#companyPublishingCronYearlyOnceRank").val() + " *";
            break;
        default:
            break;
    }
    return cronExpr;
}

function companyPublishingResolveCron(expr){
    var exprTab = expr.split(" ");
    if(exprTab[5] != "?"){
        if(exprTab[5].indexOf("#") >= 0){
            if(exprTab[4].indexOf("/") >= 0){
                $("#companyPublishingCronMonthlyTab").addClass("selected");
                $("#companyPublishingCronMonthlyDiv").show();
                companyPublishingCronType = "monthly";
                $("#companyPublishingCronMonthlyOnce").prop("checked", true);
                $("#companyPublishingCronMonthlyRepeatDay, #companyPublishingCronMonthlyRepeatMonths").attr("disabled", "disabled");
                $("#companyPublishingCronMonthlyOnceMonths").val(exprTab[4].split("/")[1]).removeAttr("disabled");
                $("#companyPublishingCronMonthlyOnceDay").val(exprTab[5].split("#")[0]).removeAttr("disabled");
                $("#companyPublishingCronMonthlyOnceRank").val(exprTab[5].split("#")[1]).removeAttr("disabled");
                $("#companyPublishingCronMonthlyMinutes").val(exprTab[1]);
                $("#companyPublishingCronMonthlyHour").val(exprTab[2]);
                return;
            }
            $("#companyPublishingCronYearlyTab").addClass("selected");
            $("#companyPublishingCronYearlyDiv").show();
            companyPublishingCronType = "yearly";
            $("#companyPublishingCronYearlyOnce").prop("checked", true);
            $("#companyPublishingCronYearlyRepeatMonth, #companyPublishingCronYearlyRepeatDay").attr("disabled", "disabled");
            $("#companyPublishingCronYearlyOnceMonth").val(exprTab[4]).removeAttr("disabled");
            $("#companyPublishingCronYearlyOnceDay").val(exprTab[5].split("#")[0]).removeAttr("disabled");
            $("#companyPublishingCronYearlyOnceRank").val(exprTab[5].split("#")[1]).removeAttr("disabled");
            $("#companyPublishingCronYearlyMinutes").val(exprTab[1]);
            $("#companyPublishingCronYearlyHour").val(exprTab[2]);
            return;
        }
        if(exprTab[5].indexOf("-") >= 0){
            $("#companyPublishingCronDailyTab").addClass("selected");
            $("#companyPublishingCronDailyDiv").show();
            companyPublishingCronType = "daily";
            $("#companyPublishingCronDailyOnce").prop("checked", true);
            $("#companyPublishingCronDailyVal").attr("disabled", "disabled");
            $("#companyPublishingCronDailyMinutes").val(exprTab[1]);
            $("#companyPublishingCronDailyHour").val(exprTab[2]);
            return;
        }
        $("#companyPublishingCronWeeklyTab").addClass("selected");
        $("#companyPublishingCronWeeklyDiv").show();
        companyPublishingCronType = "weekly";
        var days = [exprTab[5]];
        if(exprTab[5].indexOf(",") >= 0)
            days = exprTab[5].split(",");
        for(var i = 0; i < days.length; i++){
            $("#companyPublishingCronWeekly" + days[i]).prop("checked", true);
        }
        $("#companyPublishingCronWeeklyMinutes").val(exprTab[1]);
        $("#companyPublishingCronWeeklyHour").val(exprTab[2]);
        return;
    }
    if(exprTab[4] != "*"){
        if(exprTab[4].indexOf("/") >= 0){
            $("#companyPublishingCronMonthlyTab").addClass("selected");
            $("#companyPublishingCronMonthlyDiv").show();
            companyPublishingCronType = "monthly";
            $("#companyPublishingCronMonthlyRepeatMonths").val(exprTab[4].split("/")[1]);
            $("#companyPublishingCronMonthlyRepeatDay").val(exprTab[3]);
            $("#companyPublishingCronMonthlyMinutes").val(exprTab[1]);
            $("#companyPublishingCronMonthlyHour").val(exprTab[2]);
            return;
        }
        $("#companyPublishingCronYearlyTab").addClass("selected");
        $("#companyPublishingCronYearlyDiv").show();
        companyPublishingCronType = "yearly";
        $("#companyPublishingCronYearlyRepeatMonth").val(exprTab[4]);
        $("#companyPublishingCronYearlyRepeatDay").val(exprTab[3]);
        $("#companyPublishingCronYearlyMinutes").val(exprTab[1]);
        $("#companyPublishingCronYearlyHour").val(exprTab[2]);
        return;
    }
    if(exprTab[3] != "*" && exprTab[3].indexOf("/") >= 0){
        $("#companyPublishingCronDailyTab").addClass("selected");
        $("#companyPublishingCronDailyDiv").show();
        companyPublishingCronType = "daily";
        $("#companyPublishingCronDailyVal").val(exprTab[3].split("/")[1]);
        $("#companyPublishingCronDailyMinutes").val(exprTab[1]);
        $("#companyPublishingCronDailyHour").val(exprTab[2]);
        return;
    }
    if(exprTab[2] != "*"){
        $("#companyPublishingCronHourlyTab").addClass("selected");
        $("#companyPublishingCronHourlyDiv").show();
        companyPublishingCronType = "hourly";
        if(exprTab[2].indexOf("/") >= 0){
            $("#companyPublishingCronHourlyVal").val(exprTab[2].split("/")[1]);
        }
        else {
            $("#companyPublishingCronHourlyOnce").prop("checked", true);
            $("#companyPublishingCronHourlyVal").attr("disabled", "disabled");
            $("#companyPublishingCronHourlyMinutes").val(exprTab[1]).removeAttr("disabled");
            $("#companyPublishingCronHourlyHour").val(exprTab[2]).removeAttr("disabled");
        }
        return;
    }
    if(exprTab[1] != "*" && exprTab[1].indexOf("/") >= 0) {
        companyPublishingCronType = "minutes";
        $("#companyPublishingCronMinutesTab").addClass("selected");
        $("#companyPublishingCronMinutesDiv").show();
        $("#companyPublishingCronMinutesVal").val(exprTab[1].split("/")[1]);
    }
}