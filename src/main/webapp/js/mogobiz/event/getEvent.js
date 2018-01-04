$(document).ready(function() {
	// variables declaration
	today = new Date();
	
	// Check for previous saved information
	if (localStorage.getItem('ticketInformation') != null) {
		ticketInformationObject = eval('(' + localStorage.getItem('ticketInformation') + ')');
		if (ticketInformationObject.idEvent != $('#idEvent').val()) {
			localStorage.removeItem('ticketInformation');
			ticketInformationObject = null;
		}
	}
	$('#event_date').val("");
	$('#event_time').val("");
	
	getPaymentType();
	$('#register').hide();
	
	// Configure top-left event date
	$('div.fancy-date span.day').html(getDate(eventStartDate,"DAY"));
	$('div.fancy-date span.month').html(getDate(eventStartDate,"MONTH"));
	
	initCalendarDateTime();
	
	// Configure fancybox plugin
	$("a.screenshot").fancybox({
		'transitionIn'	:	'fade',
		'transitionOut'	:	'fade',
		'speedIn'		:	500, 
		'speedOut'		:	500, 
		'type'			:	'image',
		'overlayShow'	:	true
	});
	// Configure scrollable plugin
	$(".scrollable").scrollable({ });
	
	// bind action for spinner buttons in case quantity selection is disabled
	$('.spinner button').unbind().click(function(){
		checkIfDateTimeSelected();
	});
	
	// bind action for register
	$('#register').unbind().click(function() {
		switch ($('#calendarType').val()) {
		case "DATE_ONLY":
			if ($('#event_date').val() == "") {
				$('#errorMessage span.message').empty().html(chooseDateError_label);
				$('#errorMessage').show();
				$('#event_date').focus();
			} else {
				if (checkQuantities()) {
					register();
				}
			}
			break;
		case "DATE_TIME":
			if ($('#event_date').val() == "") {
				$('#errorMessage span.message').empty().html(chooseDateError_label);
				$('#errorMessage').show();
				$('#event_date').focus();
			} else {
				if ($('#event_time').val() == "") {
					$('#errorMessage span.message').empty().html(chooseTimeError_label);
					$('#errorMessage').show();
					$('#event_time').focus();
				} else {
					if (checkQuantities()) {
						register();
					}
				}
			}
			break;
		case "NO_DATE": default:
			if (checkQuantities()) {
				register();
			}
			break;
		}
	});
	
	// Init OpenStreetMap
	if(eventMapProvider == "OPEN_STREET_MAP")
		showMap();
	else
		showGoogleMap();
	getAllPois($('#idEvent').val());
});

function initCalendarDateTime() {
	// date-time-stock management
	switch ($('#calendarType').val()) {
	case "DATE_ONLY":
		$('#event-date-time').show();
		$('#date_div').show();
		getProductDates($('#idEvent').val(), today.getMonth()+1, today.getFullYear(), "DATE_ONLY");
		break;
	case "DATE_TIME":
		$('#event-date-time').show();
		$('#date_div').show();
		$('#time_div').show();
		getProductDates($('#idEvent').val(), today.getMonth()+1, today.getFullYear(), "DATE_TIME");
		break;
	case "NO_DATE": default:
		getStockInfo();
		break;
	}
}

function getPaymentType(){
	var dataToSend = 'format=json';
	dataToSend += '&event.id=' + $('#idEvent').val();
	
	$.ajax({
		url : paymentTypesUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(data, status) {
			if(data["paymentProvider"] != "NONE" || data["paypal"] || data["buyster"] || data["kwixo"] || data["cashOk"] || data["checkOk"])
				$('#register').show();
		}
	});
}

//Check quantities before register
function checkQuantities() {
	var q = 0;
	$("div#tickets_table table tbody td :input[type='text']").each(function() {
		q = q + parseInt(this.value);
	});
	
	if(q > 0) {
		if (globalStock > 0 && q > globalStock) {
			$('#errorMessage span.message').empty().html(maxTicketsMessageError_label+" "+globalStock);
			$('#errorMessage').show();
			return false;
		}
		else {
			return true;
		}
	}
	else {
		$('#errorMessage span.message').empty().html(chooseTicketError_label);
		$('#errorMessage').show();
		return false;
	}
}

function checkIfDateTimeSelected() {
	switch ($('#calendarType').val()) {
	case "DATE_ONLY":
		if ($('#event_date').val() == "") {
			$('#errorMessage span.message').empty().html(chooseDateError_label);
			$('#errorMessage').show();
			$('#event_date').focus();
		}
		break;
	case "DATE_TIME":
		if ($('#event_date').val() == "") {
			$('#errorMessage span.message').empty().html(chooseDateError_label);
			$('#errorMessage').show();
			$('#event_date').focus();
		} else {
			if ($('#event_time').val() == "") {
				$('#errorMessage span.message').empty().html(chooseTimeError_label);
				$('#errorMessage').show();
				$('#event_time').focus();
			}
		}
		break;
	case "NO_DATE": default:
		break;
	}
}

/**
 * @param date   ---> dd/mm/yyyy hh:mm
 * @param format ---> FULL, WEEKDAY, MONTH, DAY, YEAR, TIME, MONTH_INT
 */
function getDate(date, format) {
	try {
		var dateParams = new Array(5);
		
		var temp = date.split("/");
		dateParams[2] = temp[0]; //day
		dateParams[1] = temp[1]; //month
	
		temp = temp[2].split(" ");
		dateParams[0] = temp[0]; //year
	
		temp = temp[1].split(":");
		dateParams[3] = temp[0]; // hours
		dateParams[4] = temp[1]; //minutes
	
		var fullDate = new Date(dateParams[0],dateParams[1]-1,dateParams[2],dateParams[3],dateParams[4]);
		var fullDateParams = fullDate.toString().split(" ");
		
		switch (format) {
		case "FULL":
			return fullDate;
			break;
		case "WEEKDAY":
			return fullDateParams[0];
			break;
		case "MONTH":
			return fullDateParams[1];
			break;
		case "MONTH_INT":
			return dateParams[1];
			break;
		case "DAY":
			return fullDateParams[2];
			break;
		case "YEAR":
			return fullDateParams[3];
			break;
		case "TIME":
			return dateParams[3] +":"+dateParams[4];
			break;
		default:
			return fullDate;
		}
	}
	catch(e) {
		return "";
	}
}

//prepend values lower than 10 with 0
function prependZero(num) {
	return (num < 10) ? '0' + num : num; 
}

function getProductDates(productId, month, year) {
	var dataToSend = "format=json";
	dataToSend+= "&productId="+productId;
	dataToSend+= "&month="+month;
	dataToSend+= "&year="+year;
	$.ajax({
		url : getProductDatesUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			dates_allowed = new Object();
			$.each(response, function(i, date) {
				dates_allowed[date] = true;
			});
            
			//Initialize datepicker
            $("#event_date").datepicker({
				dateFormat: 'dd/mm/yy',
				minDate : new Date(),
				maxDate : new Date(2049, 12 - 1, 31),
				changeMonth : true,
				changeYear : true,
				firstDay : 1,
				beforeShowDay: function(date) {	// called for every date before it is displayed
		            var date_str = [
		                prependZero(date.getDate()),	           
		                prependZero(date.getMonth() + 1),
		                prependZero(date.getFullYear())
		            ].join('/');		           
		            
		            if (dates_allowed[date_str]) {
		            	return [true, 'valid_date', ''];
		            }
		            else {
		            	return [false, 'invalid_date', notAvailableOnThisDateLabel];
		            }
		        },
		        onChangeMonthYear: function (changedYear, changedMonth) {
		        	$('#event_date').val("");
		    		$('#event_time').empty().append("<option value=''>"+selectTimeLabel+"</option>").attr('disabled','disabled');
		        	// hide error message if exist
		        	$('#errorMessage').hide();
		        	//reset and disable quantity selection if it was enabled
		        	$('.spinner input.spin-list').val("0").attr('disabled','disabled');
		        	// bind action for spinner buttons in case quantity selection is disabled
		    		$('.spinner button').unbind().click(function(){
		    			checkIfDateTimeSelected();
		    		});
		        	
		        	if (changedMonth < today.getMonth()+1 && changedYear == today.getFullYear()) {
						updateProductDates(productId, prependZero(today.getMonth() + 1), prependZero(changedYear));
		        	}
		        	else {
						updateProductDates(productId, prependZero(changedMonth), prependZero(changedYear));
		        	}
		        },
		        onSelect: function(selectedDate) {
		        	// hide error message if exist
		        	$('#errorMessage').hide();
		        	//reset and disable quantity selection if it was enabled
		        	$('.spinner input.spin-list').val("0").attr('disabled','disabled');
		        	// bind action for spinner buttons in case quantity selection is disabled
		    		$('.spinner button').unbind().click(function(){
		    			checkIfDateTimeSelected();
		    		});
		        	
		        	if ($('#calendarType').val() == "DATE_ONLY") {
		        		getStockInfo($('#event_date').val()+" "+"00:00");
		        	}
		        	else if ($('#calendarType').val() == "DATE_TIME") {
		        		getProductTimes(productId,  $("#event_date").val());
		        	}
		        	
		        	// Check for previous saved information
		        	if ((localStorage.getItem('ticketInformation') != null) && (ticketInformationObject != null)) {
		        		var storedDate = getDate(ticketInformationObject.startDate,"DAY")+"/"+
				    			getDate(ticketInformationObject.startDate,"MONTH_INT")+"/"+
				    			getDate(ticketInformationObject.startDate,"YEAR");
		    			if(selectedDate != storedDate) {
		    				localStorage.removeItem('ticketInformation');
		    			}
		    		}
				},
				onClose: function() {
					if($('#event_date').datepicker( "getDate" ) == null) {
						updateProductDates(productId, prependZero(today.getMonth() + 1), prependZero(today.getFullYear()));
					}
				}
			}).keydown(function(){
				return false;
			});
            
            // Check for previous saved information
            if ((localStorage.getItem('ticketInformation') != null) && (ticketInformationObject != null)) {
            	$('#event_date').datepicker("setDate",getDate(ticketInformationObject.startDate,"FULL"));
            	if ($('#calendarType').val() == "DATE_ONLY") {
	        		getStockInfo($('#event_date').val()+" "+"00:00");
	        	}
	        	else if ($('#calendarType').val() == "DATE_TIME") {
	        		getProductTimes(productId,  $("#event_date").val());
	        	}
            }
		}
	});
}

function updateProductDates(productId, month, year) {
	var dataToSend = "format=json";
	dataToSend+= "&productId="+productId;
	dataToSend+= "&month="+month;
	dataToSend+= "&year="+year;
	$.ajax({
		url : getProductDatesUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			dates_allowed = {};
			$.each(response, function(i, date) {
				dates_allowed[date] = true;
				$('#event_date').datepicker('refresh');
			});
		}
	});
}

function getProductTimes(productId, date) {
	var dataToSend = "format=json";
	dataToSend+= "&productId="+productId;
	dataToSend+= "&date="+date;
	$.ajax({
		url : getProductTimesUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$('#event_time').empty().append("<option value=''>"+selectTimeLabel+"</option>");
			$.each(response, function(i, time) {
				$('#event_time').append("<option value='" + time + "'>" + time + "</option>");
			});
			$('#event_time').removeAttr("disabled");
			$('#event_time').change(function(){
				// hide error message if exist
	        	$('#errorMessage').hide();
	        	//reset and disable quantity selection if it was enabled
	        	$('.spinner input.spin-list').val("0").attr('disabled','disabled');
	        	// bind action for spinner buttons in case quantity selection is disabled
	    		$('.spinner button').unbind().click(function(){
	    			checkIfDateTimeSelected();
	    		});
	        	
	    		// Check for previous saved information
	    		if ((localStorage.getItem('ticketInformation') != null) && (ticketInformationObject != null)) {
	    			if($('#event_time').val() != getDate(ticketInformationObject.startDate,"TIME")) {
	    				localStorage.removeItem('ticketInformation');
	    			}
	    		}
	    		
				$("#event_time option[value='']").remove();
				getStockInfo($('#event_date').val()+" "+$('#event_time').val());
			});
			
            // Check for previous saved information
            if ((localStorage.getItem('ticketInformation') != null) && (ticketInformationObject != null)) {
            	$('#event_time').val(getDate(ticketInformationObject.startDate,"TIME"))
            	$('#event_time').trigger('change');
            }
		}
	});
}

function getStockInfo(date) {
	var dataToSend = "format=json";
	dataToSend += "&productId="+$('#idEvent').val();
	$.each(ticketsIdsArray, function(i, ticketId) {
		dataToSend += "&ticketsIds="+ticketId;
	});
	if(date) dataToSend += "&date="+date;
	
	$.ajax({
		url : getStockInfoUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			globalStock = response.globalStock;
			var ticketsStock = [];
			$.each(response.ticketsStock, function(i, value) {
				ticketsStock[value.ticketTypeId] = value.stock;
			});
			
			$('.spinner button').unbind();
			$.each(ticketsIdsArray, function(i, ticketId) {
				$('#quantitySpin_'+ticketId+'').spinnerControl({
					downElement: '#dn_'+ticketId+'',
					upElement: '#up_'+ticketId+'',
					min: 0,
					max: ((Math.min(ticketsMaxOrders[i],ticketsStock[ticketId]) != -1)?Math.min(ticketsMaxOrders[i],ticketsStock[ticketId]):ticketsMaxOrders[i]),
					onIncrement: function(){updateQuantity('increment', 'quantitySpin_'+ticketId+'', ((ticketsMinOrders[i] != -1)?ticketsMinOrders[i]:false))},
					onDecrement: function(){updateQuantity('decrement', 'quantitySpin_'+ticketId+'', ((ticketsMinOrders[i] != -1)?ticketsMinOrders[i]:false))}
				}).removeAttr('disabled');
			});
			
            // Check for previous saved information
            if ((localStorage.getItem('ticketInformation') != null) && (ticketInformationObject != null)) {
            	$.each(ticketInformationObject.liste, function(i, ticket){
            		$('#quantitySpin_'+ticket.idTicketType+'').val(ticket.quantity);
            	});
            }
		}
	});
}

/**
 * @param operation: increment, decrement
 * @param id: id of the spinner input
 * @param minOrder
 * @param maxOrder
 */
function updateQuantity(operation, id, minOrder) {
	if (($('input#'+id).val() != 0) && (minOrder!= false)) {
		switch(operation) {
		case 'increment':
			if(parseInt($('input#'+id).val()) < minOrder) {
				$('input#'+id).val(minOrder)
			}
			break;
		case 'decrement':
			if(parseInt($('input#'+id).val()) < minOrder) {
				$('input#'+id).val(0)
			}
			break;
		}
	}
}


/**
 * Save ticket information and go to registration page
 */
function register() {
	var tableData = [];
	$("div#tickets_table table tbody td").each(function() {
		var value = ($(":first-child", this).is(":input[type='hidden']"))
		? $(":first-child", this).val()
		: ($(":first-child", this).is(":input"))
		? $(":nth-child(2)", this).val()
		: ($(this).text() != "")
		? $(this).text()
		: $(this).html();
		tableData.push(value);
	});
	
	var tableRowsData = [];
	for (var i=0;i<tableData.length;i=i+5) {
		tableRowsData.push(tableData.slice(i,i+5));
	}
	
	var liste = [];
	$.each(tableRowsData, function(i, row) {
		if (row[4]) {
			var ticket = '{';
			ticket += '"idTicketType":' + row[0] + ',';
			ticket += '"ticketType":"' + row[1] + '",';
			ticket += '"price":' + row[3] + ',';
			ticket += '"quantity":' + row[4];
			ticket += '}';
			liste[i] = ticket;
		}
	});
	
	var startDate = "";
	switch ($('#calendarType').val()) {
	case "DATE_ONLY":
		startDate = $('#event_date').val()+" "+"00:00";
		break;
	case "DATE_TIME":
		startDate = $('#event_date').val()+" "+$('#event_time').val();
		break;
	case "NO_DATE": default:
		break;
	}
	
	var ticketInformation = '{"idEvent":' + $('input#idEvent').val() + ',"startDate":"' + startDate + '","liste":[' + liste + ']}';
	localStorage.setItem('ticketInformation', ticketInformation);
	
	document.getElementById("ticketInformationInput").value = ticketInformation;
	document.getElementById("ticketForm").submit();
}
