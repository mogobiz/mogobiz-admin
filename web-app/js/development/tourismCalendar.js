function twoDigits(val) {
	return parseInt(val, 10) < 10 ? '0' + parseInt(val, 10) : val;
}

function dateToNumber(date) {
	var tab = date.split('/');
	if (tab.length == 3)
		return tab[2] + tab[1] + tab[0];
	else
		return "";
}

function timeToNumber(time) {
	var tab = time.split(':');
	if (tab.length == 2)
		return tab[0] + tab[1];
	else
		return "";
}

var tourismCalendarGridObject;
var calendarEventList = [];

function tourismCalendarLoad(productId) {
	var columns = [
           {id : "type", name : "+/-", field : "type", width : 10, formatter : tourismCalendarPeriodTypeFormatter},
           {id : "startDate", name : tourismCalendar_startDate_label, field : "startDate", width : 40, formatter : tourismCalendarStartDateFormatter},
           {id : "endDate", name : tourismCalendar_endDate_label, field : "endDate", width : 40, formatter : tourismCalendarEndDateFormatter},
           {id : "startTime", name : tourismCalendar_startTime_label, field : "startTime",width : 40,formatter : tourismCalendarTimeCellFormatter},
           {id : "endTime", name : tourismCalendar_endTime_label, field : "endTime", width : 40, formatter : tourismCalendarTimeCellFormatter},
           {id : "mon", name : calendarMondaySymbolLabel, field : "mon", weekDay :1, width : 10, cssClass: "cell-centered", formatter : tourismCalendarWeekDayCellFormatter},
           {id : "tue", name : calendarTuesdaySymbolLabel, field : "tue", weekDay :2, width : 10, cssClass: "cell-centered", formatter : tourismCalendarWeekDayCellFormatter},
           {id : "wed", name : calendarWednesdaySymbolLabel, field : "wed", weekDay :3, width : 10, cssClass: "cell-centered", formatter : tourismCalendarWeekDayCellFormatter},
           {id : "thr", name : calendarThursdaySymbolLabel, field : "thr", weekDay :4, width : 10, cssClass: "cell-centered", formatter : tourismCalendarWeekDayCellFormatter},
           {id : "fri", name : calendarFridaySymbolLabel, field : "fri", weekDay :5, width : 10, cssClass: "cell-centered", formatter : tourismCalendarWeekDayCellFormatter},
           {id : "sat", name : calendarSaturdaySymbolLabel, field : "sat", weekDay :6, width : 10, cssClass: "cell-centered", formatter : tourismCalendarWeekDayCellFormatter},
           {id : "sun", name : calendarSundaySymbolLabel, field : "sun", weekDay :7, width : 10, cssClass: "cell-centered", formatter : tourismCalendarWeekDayCellFormatter}
	];

	var options = {
		editable : false,
		enableAddRow : false,
		asyncEditorLoading : false,
		forceFitColumns : true,
		enableCellNavigation: false,
		enableColumnReorder:false,
		rowHeight : 25
	};
	tourismCalendarGridObject= new Slick.Grid($("#tourismCalendarGrid"), [], columns, options);
	tourismCalendarGridObject.setSelectionModel(new Slick.RowSelectionModel());
	tourismCalendarGridObject.invalidate();

	$('#addCalendarPeriod').unbind();
	$('#addCalendarPeriod').click(function(){tourismCalendarCreatePageDisplay(productId,null, true, true); });
	$('#excludeCalendarPeriod').unbind();
	$('#excludeCalendarPeriod').click(function(){ tourismCalendarCreatePageDisplay(productId, null, false, true); } );
	tourismCalendarGetGridOkPeriod(productId);
}

function tourismCalendarPeriodTypeFormatter(row, cell, value, columnDef, dataContext) {
    if(dataContext.type === "ko")
        return "<span style='color:red;'>-</span>";
    else
    return "+";
}

function tourismCalendarStartDateFormatter(row, cell, value, columnDef, dataContext) {
    if(dataContext.type === "ko")
        return "<a href='javascript:void(0);' onclick='tourismCalendarCreatePageDisplay(" + dataContext.productId + "," + dataContext.periodId + ",false, false);' style='color:red;'>" + dataContext.startDate + "</a>";
    else
        return "<a href='javascript:void(0);' onclick='tourismCalendarCreatePageDisplay(" + dataContext.productId + "," + dataContext.periodId + ",true, false);'>" + dataContext.startDate + "</a>";
}

function tourismCalendarEndDateFormatter(row, cell, value, columnDef, dataContext) {
    if(dataContext.type === "ko")
        return "<a href='javascript:void(0);' onclick='tourismCalendarCreatePageDisplay(" + dataContext.productId + "," + dataContext.periodId + ",false, false);' style='color:red;'>" + dataContext.endDate + "</a>";
    else
        return "<a href='javascript:void(0);' onclick='tourismCalendarCreatePageDisplay(" + dataContext.productId + "," + dataContext.periodId + ",true, false);'>" + dataContext.endDate + "</a>";
}

function tourismCalendarTimeCellFormatter(row, cell, value, columnDef, dataContext) {
    if(dataContext.type === "ko")
        return "<span style='color:red;'>"+value+"</span>";
    else
        return value;
}

function tourismCalendarWeekDayCellFormatter(row, cell, value, columnDef, dataContext) {
    var checked;
    var day = columnDef.weekDay;

    if(dataContext["weekDay"+day]){
        return "<input type='checkbox' disabled='disabled' checked='checked' />";
    }
    else{
        return "<input type='checkbox' disabled='disabled' />";
    }
}

function tourismCalendarGetGridOkPeriod(productId) {
    var dataToSend = "format=json";
    dataToSend += "&product.id=" + productId;
    $.ajax({
        url : getCalendarEventUrl + '?' + dataToSend,
        type : "GET",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            for(var i=0;i<response.length;i++){
                response[i].type = 'ok';
                response[i].productId = productId;
            }
            tourismCalendarGridGetKoPeriod(productId, response)
        }
    });
}

function tourismCalendarGridGetKoPeriod(productId, data){
    var dataToSend = "format=json";
    dataToSend += "&product.id=" + productId;
    $.ajax({
        url : getKoPeriodsUrl + '?' + dataToSend,
        type : "GET",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            for(var i=0;i<response.length;i++){
                response[i].type = 'ko';
                response[i].productId = productId;
            }
            tourismCalendarMergeDataTables(response, data);
        }
    });
}

function tourismCalendarMergeDataTables(tab1, tab2){
    var tabRes = [];
    for(var i=0; i<tab1.length; i++){
        tabRes[tabRes.length] = tab1[i];
    }

    for(var j=0; j<tab2.length; j++){
        tabRes[tabRes.length] = tab2[j];
    }
    tourismCalendarSetDataForGrid(tabRes);
}

function tourismCalendarSetDataForGrid(data){
    var gridEventData = [];
    for(var i=0; i<data.length; i++) {
        var obj = data[i];
        var period = new Object();
        period.id = i;
        period.periodId = obj.id;
        period.productId = obj.productId;
        period.type = obj.type;
        var ok = period.type == "ok";
        period.startDate = obj.startDate.substr(0, 10);
        period.startTime = ok ? obj.startDate.substr(11) : "00:00";
        period.endDate = obj.endDate.substr(0, 10);
        period.endTime = ok ? obj.endDate.substr(11) : "23:59";
        period.weekDay1 = ok ? obj.weekday1 : true;
        period.weekDay2 = ok ? obj.weekday2 : true;
        period.weekDay3 = ok ? obj.weekday3 : true;
        period.weekDay4 = ok ? obj.weekday4 : true;
        period.weekDay5 = ok ? obj.weekday5 : true;
        period.weekDay6 = ok ? obj.weekday6 : true;
        period.weekDay7 = ok ? obj.weekday7 : true;
        gridEventData[gridEventData.length] = period;
    }
    tourismCalendarGridObject.setData(gridEventData);
    tourismCalendarGridObject.invalidate();

    // set calendarType = NO_DATE if there is no periods
    if(tourismCalendarGridObject.getDataLength() == 0) {
        $('#calendarDiv .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_calendarType"]').each(function() {
            if(this.value == 'NO_DATE') {
                this.click();
            }
        });
    }
}

function tourismCalendarCreatePageDisplay(productId, periodId, ok, create){
	$.get(tourismCalendarPageUrl, {}, function(responseText) {
		responseText = jQuery.trim(responseText);
		tourismCalendarCreatePageSetup(responseText, productId, periodId, ok, create);
	}, "html");
}

function tourismCalendarCreatePageSetup(htmlresponse, productId, periodId, ok, create){
	if ($('#tourismCalendarCreateDialog').dialog( "isOpen" ) !== true) {
		$('#tourismCalendarCreateDialog').empty();
		$('#tourismCalendarCreateDialog').html(htmlresponse);

		$('#tourismCalendarCreateDialog').dialog({
			title : calendarTitleLabel,
			modal : true,
			resizable : false,
			width : 'auto',
			height : 'auto',
			beforeClose : function(event, ui) {
			},
			open: function(event) {
				tourismCalendarInitControls(ok, create);
				tourismCalendarInitFields(ok, create, productId, periodId);
			},
			buttons : {
				deleteLabel : function() {
					var calEvent = tourismCalendarGetDataRowByPeriodId(periodId);
					var type = calEvent['type'];
					if (type == "ok") {
						tourismCalendarDeleteEvent(productId, periodId);
					}
					else {
						tourismCalendarDeleteKoPeriod(productId, periodId);
					}
					$('#tourismCalendarCreateDialog').dialog("close");
				},
				cancelLabel : function() {
					$('#tourismCalendarCreateDialog').dialog("close");
				},
				updateLabel : function() {
					var calEvent = tourismCalendarGetDataRowByPeriodId(periodId);
					var type = calEvent['type'];
					if (type == "ok") {
						if (!tourismCalendarValidateForm(true))
							return;
						tourismCalendarUpdateEvent(productId, periodId);
					}
					else {
						if (!tourismCalendarValidateForm(false))
							return;
						calendarUpdateKoPeriod(productId, periodId)
					}
					$('#tourismCalendarCreateDialog').dialog("close");
				},
				createLabel : function() {
					if (ok) {
						if (!tourismCalendarValidateForm(true))
							return;
						tourismCalendarSaveNewEvent(productId);
					}
					else {
						if (!tourismCalendarValidateForm(false))
							return;
						tourismCalendarSaveKoPeriod(productId);
					}
					$('#tourismCalendarCreateDialog').dialog("close");
				}
			}
		});
	}
}

function tourismCalendarInitControls(ok, create) {
	var dates = $( "#calendarStartDate, #calendarEndDate").datepicker({
		dateFormat: 'dd/mm/yy',
		minDate : new Date(2011, 1 - 1, 1),
		maxDate : new Date(2049, 12 - 1, 31),
		changeMonth : true,
		changeYear : true,
		firstDay : 1,
		onClose: function( selectedDate ) {
			var option = this.id == "calendarStartDate" ? "minDate" : "maxDate",
				instance = $( this ).data( "datepicker" ),
				date = $.datepicker.parseDate(
					instance.settings.dateFormat ||
					$.datepicker._defaults.dateFormat,
					selectedDate, instance.settings );
			dates.not(this).datepicker("option", option, date );
		}
	}).keydown(function(){
		return false;
	});

	if (create) {
	    $('.ui-dialog-buttonpane').find('button:contains("deleteLabel")').hide();
	    $('.ui-dialog-buttonpane').find('button:contains("updateLabel")').hide();
	    $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
	    $('.ui-dialog-buttonpane').find('button:contains("createLabel")').addClass("ui-create-button");
	    $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">'+cancelLabel+'</span>');
	    $('.ui-dialog-buttonpane').find('button:contains("createLabel")').html('<span class="ui-button-text">'+createLabel+'</span>');
	}
	else {
	    $('.ui-dialog-buttonpane').find('button:contains("createLabel")').hide();
	    $('.ui-dialog-buttonpane').find('button:contains("deleteLabel")').addClass("ui-delete-button");
	    $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
	    $('.ui-dialog-buttonpane').find('button:contains("updateLabel")').addClass("ui-update-button");
	    $('.ui-dialog-buttonpane').find('button:contains("deleteLabel")').html('<span class="ui-button-text">'+deleteLabel+'</span>');
	    $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">'+cancelLabel+'</span>');
	    $('.ui-dialog-buttonpane').find('button:contains("updateLabel")').html('<span class="ui-button-text">'+updateLabel+'</span>');
	}
}

function tourismCalendarInitFields(ok, create, productId, periodId) {
    var $dialogContent = $("#event_create_container");
    $dialogContent.find("input[type!='checkbox']").val("");
    $dialogContent.find("input[type='checkbox']").prop("checked", false);
    $dialogContent.find("textarea").val("");
    $('#calendarStartDate').blur();

    // Set start time to 00:00 and end time to 23:59 if calendarType = DATE_ONLY or NO_DATE
    var calendarType  = $("#calendarType").multiselect("getChecked").map(function(){
        return this.value;
    }).get()[0];
    if(calendarType == "DATE_ONLY" || calendarType == "NO_DATE") {
        $('#calendarStartTime').val("00:00");
        $('#calendarEndTime').val("23:59");
    }

    if (ok) {
        $('#calendarTimeInputs').show();
    }
    else {
        $('#calendarTimeInputs').hide();
    }
    if (!create) {
        var calEvent = tourismCalendarGetDataRowByPeriodId(periodId);
        var type = calEvent['type'];
        var startDate = calEvent.startDate;
        var endDate = calEvent.endDate;
        var startTime = calEvent.startTime;
        var endTime = calEvent.endTime;
        var periodId = calEvent.periodId;

        $('#calendarStartDate').val(startDate);
        $('#calendarEndDate').val(endDate);
        $('#calendarStartDate').datepicker("option", "maxDate", endDate);
        $('#calendarEndDate').datepicker("option", "minDate", startDate);
        if (type == 'ok') {
            $('#calendarStartTime').val(startTime);
            $('#calendarEndTime').val(endTime);
            $('#calendarPeriodId').val(periodId);

            $('#monday').prop("checked", calEvent.weekDay1);
            $('#tuesday').prop("checked", calEvent.weekDay2);
            $('#wednesday').prop("checked", calEvent.weekDay3);
            $('#thursday').prop("checked", calEvent.weekDay4);
            $('#friday').prop("checked", calEvent.weekDay5);
            $('#saturday').prop("checked", calEvent.weekDay6);
            $('#sunday').prop("checked", calEvent.weekDay7);
        }
    }
    else {
        $('#monday,#tuesday,#wednesday,#thursday,#friday,#saturday,#sunday').prop("checked", true);
    }
}

function tourismCalendarGetDataRowByPeriodId(periodId) {
	var data = tourismCalendarGridObject.getData();
	for (var i = 0; i < data.length; i++) {
		if (data[i].periodId == periodId)
			return data[i];
	}
	return null; // should never happen
}

function tourismCalendarValidateForm(okPeriod) {
    var start = dateToNumber($("#calendarStartDate").val());
    var end = dateToNumber($("#calendarEndDate").val());
    if(start == "" || end == ""){
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : 'error'
        });
    }
    if (end == "")
        end = 00000000;
    if (start == "")
        start = 99999999;
    ok = start <= end;
    if (!ok) {
        jQuery.noticeAdd({
            stayTime : 2000,
            text : tourismCalendarErrors_startDateBeforeEndDate_label,
            stay : false,
            type : 'error'
        });
        return false;
    }
    if (okPeriod) {
        start = timeToNumber($("#calendarStartTime").val());
        end = timeToNumber($("#calendarEndTime").val());
        if(start == "" || end == ""){
            jQuery.noticeAdd({
                stayTime : 2000,
                text : fieldsRequiredMessageLabel,
                stay : false,
                type : 'error'
            });
        }
        if (end == "")
            end = 0000;
        if (start == "")
            start = 9999;
        ok = start <= end;
        if (!ok) {
            jQuery.noticeAdd({
                stayTime : 2000,
                text : tourismCalendarErrors_startTimeBeforeEndTime_label,
                stay : false,
                type : 'error'
            });
            return false;
        }
        var weekDay1 = $('#monday').is(":checked");
        var weekDay2 = $('#tuesday').is(":checked");
        var weekDay3 = $('#wednesday').is(":checked");
        var weekDay4 = $('#thursday').is(":checked");
        var weekDay5 = $('#friday').is(":checked");
        var weekDay6 = $('#saturday').is(":checked");
        var weekDay7 = $('#sunday').is(":checked");

        ok = weekDay1 || weekDay2 || weekDay3 || weekDay4 || weekDay5 || weekDay6 || weekDay7;
        if (!ok) {
            jQuery.noticeAdd({
                stayTime : 2000,
                text : tourismCalendarErrors_selectWeek_label,
                stay : false,
                type : 'error'
            });
            return false;
        }
    }
    return true;
}

function tourismCalendarSaveKoPeriod(productId){
	var startDate = $('#calendarStartDate').val();
	var endDate = $('#calendarEndDate').val();
	var dataToSend = "format=json";
	dataToSend += "&product.id=" + productId;
	dataToSend += "&koPeriod.startDate=" + startDate;
	dataToSend += "&koPeriod.endDate=" + endDate;

	$.ajax({
		url : createKoPeriodsUrl + '?' + dataToSend,
		type : "POST",
		noticeType : "POST",
		data : "",
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			tourismCalendarGetGridOkPeriod(productId);
		}
	});
}

function calendarUpdateKoPeriod(productId, periodId){
	var startDate = $('#calendarStartDate').val();
	var endDate = $('#calendarEndDate').val();
	var dataToSend = "format=json";
	dataToSend += "&product.id=" + productId;
	dataToSend += "&koPeriod.id=" + periodId;
	dataToSend += "&koPeriod.startDate=" + startDate;
	dataToSend += "&koPeriod.endDate=" + endDate;

	$.ajax({
		url : updateKoPeriodsUrl + '?' + dataToSend,
		type : "POST",
		noticeType : "PUT",
		data : "",
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			tourismCalendarGetGridOkPeriod(productId);
		}
	});
}

function tourismCalendarDeleteKoPeriod(productId, periodId){
    var dataToSend = "format=json";
    dataToSend += "&koPeriod.id=" + periodId;
    $.ajax({
        url : deleteKoPeriodsUrl + '?' + dataToSend,
        type : "POST",
        noticeType : "DELETE",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            tourismCalendarGetGridOkPeriod(productId);
        }
    });
}

function tourismCalendarSaveNewEvent(productId) {
	var weekDay1 = $('#monday').is(":checked");
	var weekDay2 = $('#tuesday').is(":checked");
	var weekDay3 = $('#wednesday').is(":checked");
	var weekDay4 = $('#thursday').is(":checked");
	var weekDay5 = $('#friday').is(":checked");
	var weekDay6 = $('#saturday').is(":checked");
	var weekDay7 = $('#sunday').is(":checked");
	var startDate = $('#calendarStartDate').val() + " " + $('#calendarStartTime').val();
	var endDate = $('#calendarEndDate').val() + " " + $('#calendarEndTime').val();
	var dataToSend = "format=json";
	dataToSend += "&product.id=" + productId;
	dataToSend += "&period.startDate=" + startDate;
	dataToSend += "&period.endDate=" + endDate;
	dataToSend += "&period.weekday1=" + weekDay1;
	dataToSend += "&period.weekday2=" + weekDay2;
	dataToSend += "&period.weekday3=" + weekDay3;
	dataToSend += "&period.weekday4=" + weekDay4;
	dataToSend += "&period.weekday5=" + weekDay5;
	dataToSend += "&period.weekday6=" + weekDay6;
	dataToSend += "&period.weekday7=" + weekDay7;

	$.ajax({
		url : saveCalendarEventUrl + '?' + dataToSend,
		type : "POST",
		noticeType : "POST",
		data : "",
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			tourismCalendarLoadAllEvents(productId);
		}
	});
}

function tourismCalendarUpdateEvent(productId, periodId) {
    var weekDay1 = $('#monday').is(":checked");
    var weekDay2 = $('#tuesday').is(":checked");
    var weekDay3 = $('#wednesday').is(":checked");
    var weekDay4 = $('#thursday').is(":checked");
    var weekDay5 = $('#friday').is(":checked");
    var weekDay6 = $('#saturday').is(":checked");
    var weekDay7 = $('#sunday').is(":checked");
    var startDate = $('#calendarStartDate').val() + " " + $('#calendarStartTime').val();
    var endDate = $('#calendarEndDate').val() + " " + $('#calendarEndTime').val();
    var periodId = $('#calendarPeriodId').val();
    var dataToSend = "format=json";
    dataToSend += "&product.id=" + productId;
    dataToSend += "&period.id=" + periodId;
    dataToSend += "&period.startDate=" + startDate;
    dataToSend += "&period.endDate=" + endDate;
    dataToSend += "&period.weekday1=" + weekDay1;
    dataToSend += "&period.weekday2=" + weekDay2;
    dataToSend += "&period.weekday3=" + weekDay3;
    dataToSend += "&period.weekday4=" + weekDay4;
    dataToSend += "&period.weekday5=" + weekDay5;
    dataToSend += "&period.weekday6=" + weekDay6;
    dataToSend += "&period.weekday7=" + weekDay7;

    $.ajax({
        url : updateCalendarEventUrl + '?' + dataToSend,
        type : "POST",
        noticeType : "PUT",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            tourismCalendarLoadAllEvents(productId);
        }
    });
}

function tourismCalendarDeleteEvent(productId, periodId) {
	var dataToSend = "format=json";
	dataToSend += "&product.id=" + productId;
	dataToSend += "&period.id=" + periodId;

	$.ajax({
		url : deleteCalendarEventUrl + '?' + dataToSend,
		type : "GET",
		data : "",
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			tourismCalendarLoadAllEvents(productId);
		}
	});
}

function tourismCalendarLoadAllEvents(productId) {
    var dataToSend = "format=json";
    dataToSend += "&product.id=" + productId;

    $.ajax({
        url : getCalendarEventUrl + '?' + dataToSend,
        type : "GET",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            tourismCalendarConvertServerEventToClientEvent(response, productId);
            tourismCalendarGetGridOkPeriod(productId);
        }
    });
}

function tourismCalendarConvertServerEventToClientEvent(data, productId) {
    calendarEventList = [];
    var eventId = 1;
    for ( var i = 0; i < data.length; i++) {
        var obj = data[i];
        var startDay = obj.startDate.substr(0, 2);
        var startMonth = parseInt(obj.startDate.substr(3, 2), 10) - 1;
        var startYear = obj.startDate.substr(6, 4);
        var startHour = obj.startDate.substr(11, 2);
        var startMinute = obj.startDate.substr(14, 2);
        var endDay = obj.endDate.substr(0, 2);
        var endMonth = parseInt(obj.endDate.substr(3, 2), 10) - 1;
        var endYear = obj.endDate.substr(6, 4);
        var endHour = obj.endDate.substr(11, 2);
        var endMinute = obj.endDate.substr(14, 2);
        var startDateCal = new Date(startYear, startMonth, startDay);
        var endDateCal = new Date(endYear, endMonth, endDay);
        while (startDateCal.getTime() <= endDateCal.getTime()) {
            var dayOfWeek = startDateCal.getDay();
            if (dayOfWeek == 0)
                dayOfWeek = 7;
            if (obj["weekday" + dayOfWeek]) {
                var startTime = new Date(startDateCal);
                startTime.setHours(startHour, startMinute);
                var endTime = new Date(startDateCal);
                endTime.setHours(endHour, endMinute);
                var event = new Object();
                event.start = startTime;
                event.end = endTime;
                event.id = eventId++;
                event.periodId = obj.id;
                event.calStartDate = twoDigits(startDay) + '/' + twoDigits((startMonth + 1)) + '/' + startYear;
                event.calStartTime = twoDigits(startHour) + ':' + twoDigits(startMinute);
                event.calEndDate = twoDigits(endDay) + '/' + twoDigits((endMonth + 1)) + '/' + endYear;
                event.calEndTime = twoDigits(endHour) + ':' + twoDigits(endMinute);
                event.weekday1 = obj.weekday1;
                event.weekday2 = obj.weekday2;
                event.weekday3 = obj.weekday3;
                event.weekday4 = obj.weekday4;
                event.weekday5 = obj.weekday5;
                event.weekday6 = obj.weekday6;
                event.weekday7 = obj.weekday7;
                var start = dateToNumber(event.calStartDate);
                var end = dateToNumber(event.calStartTime);
                if (end != start)
                    event.title = event.calStartDate + " - " + event.calEndDate;
                else
                    event.title = '';
                calendarEventList[calendarEventList.length] = event;
            }
            startDateCal.setDate(startDateCal.getDate() + 1);
        }
    }
    return calendarEventList;
}