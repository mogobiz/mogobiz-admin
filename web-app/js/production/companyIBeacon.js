var companyIBeaconGrid = null;
var companyIBeaconPageOffset = 0;

function companyIBeaconDrawAll(){
    companyIBeaconGrid = null;
    $.ajax({
        url : companyShowIBeaconUrl,
        type : "GET",
        data : "pageSize=" + companyGridPageSize + "&pageOffset=" + companyIBeaconPageOffset + "&format=json",
        dataType : "json",
        async : true,
        success : function(response, status) {
            $("#iBeaconPagination").empty();
            if(response.totalCount > 0){
                $("#iBeaconPagination").paginate({
                    count: response.pageCount,
                    start: response.pageOffset + 1,
                    display: 24,
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
                    onChange: function(page) {
                        if(companyIBeaconPageOffset == (page - 1)){
                            return;
                        }
                        companyIBeaconPageOffset = page - 1;
                        companyIBeaconDrawAll();
                    }
                });
                var margin = $("#iBeaconPagination").parent().parent().width() - $("#iBeaconPagination .jPag-control-back").width() - $("#iBeaconPagination .jPag-control-center").width() - $("#iBeaconPagination .jPag-control-front").width() - 7;
                $("#iBeaconPaginationDiv").css("margin-left", margin);
            }
            var gridColumns = [{
                id : "uuid",
                name : companyIBeaconUuidLabel,
                field : "uuid",
                width : 30,
                formatter : companyIBeaconGridUuidFormatter,
                cssClass : ""
            },{
                id : "name",
                name : companyIBeaconNameLabel,
                field : "name",
                width : 30,
                cssClass : ""
            },{
                id : "startDate",
                name : companyIBeaconStartDateLabel,
                field : "startDate",
                width : 15,
                cssClass : ""
            },{
                id : "endDate",
                name : companyIBeaconEndDateLabel,
                field : "endDate",
                width : 15,
                cssClass : ""
            },{
                id : "active",
                name : companyIBeaconActiveLabel,
                field : "active",
                width : 10,
                formatter : companyIBeaconGridActiveFormatter,
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
            var iBeacons = response.list;
            if(iBeacons){
                for ( var i = 0; i < iBeacons.length; i++) {
                    gridData[gridData.length] = {
                        "id" : i,
                        "iBeaconId": iBeacons[i].id,
                        "uuid": iBeacons[i].uuid,
                        "name": iBeacons[i].name,
                        "minor": iBeacons[i].minor,
                        "major": iBeacons[i].major,
                        "startDate": (iBeacons[i].startDate != "01/01/1970 00:00") ? iBeacons[i].startDate.split(" ")[0] : "",
                        "endDate": (iBeacons[i].endDate != "31/12/2049 00:00") ? iBeacons[i].endDate.split(" ")[0] : "",
                        "active": iBeacons[i].active
                    }
                }
            }
            companyIBeaconGrid = new Slick.Grid($("#iBeaconGrid"), gridData, gridColumns, gridOptions);

            companyIBeaconGrid.setSelectionModel(new Slick.RowSelectionModel());
            companyIBeaconGrid.invalidate();
        }
    });
}

function companyIBeaconGridUuidFormatter (row, cell, value, columnDef, dataContext){
    return "<a href='javascript:companyIBeaconGetDetails(" + dataContext.iBeaconId + ", " + false + ")'>" + value + "</a>";
}

function companyIBeaconGridActiveFormatter(row, cell, value, columnDef, dataContext){
    var checkBox = "<input type='checkbox' disabled='disabled' style='margin-top:4px;'";
    checkBox += (value) ? "checked='checked'/>" : "/>";
    return checkBox;
}

function companyIBeaconGetDetails(iBeaconId, isCreate){
    $.get(
        companyIBeaconPageUrl,
        {},
        function(htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            companyIBeaconPageSetup(htmlresponse, iBeaconId, isCreate);
        },
        "html"
    );
}

function companyIBeaconPageSetup(htmlresponse, iBeaconId, isCreate){
    if ($("#companyIBeaconDialog").dialog("isOpen") !== true) {
        $("#companyIBeaconDialog").empty();
        $("#companyIBeaconDialog").html(htmlresponse);
        $("#companyIBeaconDialog").dialog({
            title : companyIBeaconTitleLabel,
            modal : true,
            resizable : false,
            width : "auto",
            height : "auto",
            open : function(event) {
                companyIBeaconPageInitControls(isCreate);
                companyIBeaconPageInitFields(iBeaconId, isCreate);
            },
            buttons : {
                deleteLabel : function() {
                    companyIBeaconDeleteItem();
                },
                cancelLabel : function() {
                    $("#companyIBeaconDialog").dialog("close");
                },
                updateLabel : function() {
                    if (companyIBeaconValidateForm())
                        companyIBeaconUpdateItem();
                },
                createLabel : function() {
                    if (companyIBeaconValidateForm())
                        companyIBeaconCreateItem();
                }
            }
        });
    }
}

function companyIBeaconPageInitControls(isCreate){
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
    var availableDates = $("#companyIBeaconStartDate, #companyIBeaconEndDate").datepicker({
        dateFormat : 'dd/mm/yy',
        minDate : new Date("1970, 01, 01"),
        maxDate : new Date("2049, 12, 31"),
        changeMonth : true,
        changeYear : true,
        firstDay : 1,
        onClose : function(selectedDate) {
            var option = this.id == "companyIBeaconStartDate" ? "minDate"
                : "maxDate", instance = $(this).data(
                "datepicker"), date = $.datepicker
                .parseDate(
                    instance.settings.dateFormat
                        || $.datepicker._defaults.dateFormat,
                    selectedDate, instance.settings);
            availableDates.not(this).datepicker("option",
                option, date);
        }
    }).keydown(function() {
        return false;
    });
}

function companyIBeaconPageInitFields(iBeaconId, isCreate){
    $("#companyIBeaconId").val(iBeaconId);
    $("#companyIBeaconUUID,#companyIBeaconName,#companyIBeaconMinor,#companyIBeaconMajor,#companyIBeaconStartDate,#companyIBeaconEndDate").val("");
    $("#companyIBeaconActive").prop("checked", false);
    if (!isCreate){
        var iBeacon = null;
        var data = companyIBeaconGrid.getData();
        for (var i = 0; i < data.length; i++) {
            if (data[i].iBeaconId == iBeaconId){
                iBeacon = data[i];
                break;
            }
        }
        if(iBeacon){
            $("#companyIBeaconUUID").val(iBeacon.uuid);
            $("#companyIBeaconName").val(iBeacon.name);
            $("#companyIBeaconMinor").val(iBeacon.minor);
            $("#companyIBeaconMajor").val(iBeacon.major);
            $("#companyIBeaconStartDate").val(iBeacon.startDate);
            $("#companyIBeaconEndDate").val(iBeacon.endDate);
            if(iBeacon.active)
                $("#companyIBeaconActive").prop("checked", true);
        }
    }
}

function companyIBeaconValidateForm(){
    if ($("#companyIBeaconUUID").val() == "" || $("#companyIBeaconName").val() == "" || $("#companyIBeaconMinor").val() == "" || $("#companyIBeaconMajor").val() == "") {
        if($("#companyIBeaconUUID").val() == "")
            $("#companyIBeaconForm #companyIBeaconUUID").focus();
        else if($("#companyIBeaconName").val() == "")
            $("#companyIBeaconForm #companyIBeaconName").focus();
        else if($("#companyIBeaconMinor").val() == "")
            $("#companyIBeaconForm #companyIBeaconMinor").focus();
        else
            $("#companyIBeaconForm #companyIBeaconMajor").focus();
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

function companyIBeaconCreateItem(){
    var startDate = ($("#companyIBeaconStartDate").val() != "") ? $("#companyIBeaconStartDate").val() : "01/01/1970";
    var endDate = ($("#companyIBeaconEndDate").val() != "") ? $("#companyIBeaconEndDate").val() : "31/12/2049";
    var dataToSend = "uuid=" + $("#companyIBeaconUUID").val() + "&name=" + $("#companyIBeaconName").val() + "&minor=" + $("#companyIBeaconMinor").val() + "&major=" + $("#companyIBeaconMajor").val();
    dataToSend += "&startDate=" + startDate + "&endDate=" + endDate+ "&active=" + $("#companyIBeaconActive").is(":checked") + "&format=json";
    $.ajax({
        url : companySaveIBeaconUrl,
        type : "POST",
        noticeType : "POST",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if(response.success){
                $("#companyIBeaconDialog").dialog("close");
                companyIBeaconDrawAll();
            }
            else{
                $("#companyIBeaconUUID").focus();
                jQuery.noticeAdd({
                    stayTime : 2000,
                    text : companyIBeaconUniqueErrorLabel,
                    stay : false,
                    type : "error"
                });
            }
        },
        error : function(response, status) {
            $("#companyIBeaconUUID").focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyIBeaconUniqueErrorLabel,
                stay : false,
                type : "error"
            });
        }
    });
}

function companyIBeaconUpdateItem(){
    var startDate = ($("#companyIBeaconStartDate").val() != "") ? $("#companyIBeaconStartDate").val() : "01/01/1970";
    var endDate = ($("#companyIBeaconEndDate").val() != "") ? $("#companyIBeaconEndDate").val() : "31/12/2049";
    var dataToSend = "id=" + $("#companyIBeaconId").val() + "&uuid=" + $("#companyIBeaconUUID").val() + "&name=" + $("#companyIBeaconName").val();
    dataToSend += "&minor=" + $("#companyIBeaconMinor").val() + "&major=" + $("#companyIBeaconMajor").val();
    dataToSend += "&startDate=" + startDate + "&endDate=" + endDate + "&active=" + $("#companyIBeaconActive").is(":checked") + "&format=json";
    $.ajax({
        url : companySaveIBeaconUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if(response.success){
                $("#companyIBeaconDialog").dialog("close");
                companyIBeaconDrawAll();
            }
            else{
                $("#companyIBeaconUUID").focus();
                jQuery.noticeAdd({
                    stayTime : 2000,
                    text : companyIBeaconUniqueErrorLabel,
                    stay : false,
                    type : "error"
                });
            }
        },
        error : function(response, status) {
            $("#companyIBeaconUUID").focus();
            jQuery.noticeAdd({
                stayTime : 2000,
                text : companyIBeaconUniqueErrorLabel,
                stay : false,
                type : "error"
            });
        }
    });
}

function companyIBeaconDeleteItem(){
    var dataToSend = "id=" + $("#companyIBeaconId").val() + "&format=json";
    $.ajax({
        url : companyDeleteIBeaconUrl,
        type : "POST",
        noticeType : "DELETE",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#companyIBeaconDialog").dialog("close");
            companyIBeaconDrawAll();
        },
        error : function(response, status) {}
    });
}