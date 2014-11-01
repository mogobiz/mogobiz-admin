var companyPublishingGrid = null;

function companyPublishingDrawAll(){
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
                        "cronExpr" : publishing[i].cronExpr
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
    return "<a href='javascript:companyPublishingGetDetails(" + dataContext.publishingId + ", " + false + ")'>" + value + "</a>";
}

function companyPublishingGetDetails(publishingId, isCreate){
    $.get(
        companyPublishingPageUrl,
        {},
        function(htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            companyPublishingPageSetup(htmlresponse, publishingId, isCreate);
        },
        "html"
    );
}

function companyPublishingPageSetup(htmlresponse, publishingId, isCreate){
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
                    companyPublishingDeletePublishing();
                },
                cancelLabel : function() {
                    $("#companyPublishingDialog").dialog("close");
                },
                updateLabel : function() {
                    if (companyPublishingValidateForm())
                        companyPublishingUpdatePublishing();
                },
                createLabel : function() {
                    if (companyPublishingValidateForm())
                        companyPublishingCreatePublishing();
                }
            }
        });
    }
}

function companyPublishingPageInitControls(isCreate) {
    $("#companyPublishingManual").unbind().bind("click", function(){
        if($(this).is(":checked"))
            $("#companyPublishingCron").hide();
        else
            $("#companyPublishingCron").show();
    });
    $("#companyPublishingCron").cron({
        initial: "0 0 1 * *"//,
        //useGentleSelect: true
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
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").addClass("ui-delete-button");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").addClass("ui-update-button");
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").html("<span class='ui-button-text'>" + deleteLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").html("<span class='ui-button-text'>" + updateLabel + "</span>");
    }
}

function companyPublishingPageInitFields(publishingId, isCreate){
    $("#companyPublishingId").val(publishingId);
    $("#companyPublishingName,#companyPublishingUrl").val("");
    $("#companyPublishingActive").prop("checked", false);
    $("#companyPublishingManual").prop("checked", false);
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
                $("#companyPublishingCron").cron("value", publishing.cronExpr)
            }
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
    return true;
}

function companyPublishingCreatePublishing(){
    var dataToSend = "esenv.name=" + $("#companyPublishingName").val() + "&esenv.url=" + $("#companyPublishingUrl").val();
    if($("#companyPublishingManual").is(":checked"))
        dataToSend += "&esenv.cronExpr=\"\"";
    else
        dataToSend += "&esenv.cronExpr=" + $("#companyPublishingCron").cron("value");
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
            companyPublishingDrawAll();
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

function companyPublishingUpdatePublishing(){
    var dataToSend = "esenv.id=" + $("#companyPublishingId").val() + "&esenv.name=" + $("#companyPublishingName").val() + "&esenv.website=" + $("#companyPublishingUrl").val();
    if($("#companyPublishingManual").is(":checked"))
        dataToSend += "&esenv.cronExpr=\"\"";
    else
        dataToSend += "&esenv.cronExpr=" + $("#companyPublishingCron").cron("value");
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
            companyPublishingDrawAll();
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

function companyPublishingDeletePublishing(){
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
            companyPublishingDrawAll();
        },
        error : function(response, status) {}
    });
}