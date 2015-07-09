var fbApiInit = false;
var ticketsIdsArray = [];

$(document).ready(function() {
	window.fbAsyncInit = function() {
		// variables declaration
		today = new Date();
		
		// categories combo event listener
		$("#selectCategoriesCombo").change(function(){
			var dataToSend='searchTextInput=' + $('#searchTextInput').val() +'&comboValue='+$("#selectCategoriesCombo").val();
			goHome(dataToSend);
		});
		// search button event listener
		$("#searchButton").click(function(){
			var dataToSend='searchTextInput=' + $('#searchTextInput').val() +'&comboValue='+$("#selectCategoriesCombo").val();
			goHome(dataToSend);
		});
		//search text input event listener
		$("#searchTextInput").keyup(function(e){
			if (e.which === 13) {
				var dataToSend='searchTextInput=' + $('#searchTextInput').val() +'&comboValue='+$("#selectCategoriesCombo").val();
				goHome(dataToSend);
			}
		});
		
		listAllCategories();
		getProduct(getHTTPParameter("productId"));
		clearCart();
	}
});

/**
 * get Product information
 * @param productId
 */
function getProduct(productId) {
	var dataToSend = "format=json";
	dataToSend += "&id="+productId;
	
	$('#content').showLoading();
	$.ajax({
		url : getProductUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$('#content').show().hideLoading();
			loadProduct(response);
		}
	});
}

/**
 * load product information
 * @param response
 */
function loadProduct(response) {
	if($('#breadCrumb ul li').length <= 1 ) {
		$('#breadCrumb ul').append('<li><a href="javascript:void(0)" onclick="javascript:getProduct('+response.id+')">'+response.name+'</a></li>');
	}
	// HEADER
	$('#content .panel_head div#eventTitle').html((response.name.length > 40)?(response.name.substring(0,35) + '...'):response.name);
	$('#content .panel_head input#idEvent').val(response.id);
	if(response.calendarType)
		$('#content .panel_head input#calendarType').val(response.calendarType.name);
	// Configure top-left event date
	$('div.fancy-date span.day').html(getDate(response.startDate,"DAY"));
	$('div.fancy-date span.month').html(getDate(response.startDate,"MONTH"));
	
	// Ticket Information
	if(response.startDate)
		$('#ticketInformation td#eventStartDate').html((getDate(response.startDate)).toString());
	else
		$("#eventStartDate").hide();
	if(response.stopDate)
	$('#ticketInformation td#eventEndDate').html((getDate(response.stopDate)).toString());
	else
		$("#eventEndDateLine").hide();
	if(response.location)
		$('#ticketInformation td#eventLocation').html(response.location);
	else
		$("#eventLocationLine").hide();

	// Fill tickets table 
	if(response.ticketTypes.length > 0) {
		// Used for stock-quantity management;
		ticketsIdsArray = [];
		ticketsMaxOrders = [];
		ticketsMinOrders = [];
		
		$('#errorMessage').hide();
		$('#event_date').val("");
		$('#event_time').empty().append("<option value=''>"+selectTimeLabel+"</option>").attr('disabled','disabled');
		$('#tickets_table table tbody').empty();
		$.each(response.ticketTypes, function(i, value) {
			$('#tickets_table table tbody').append(
				  '<tr>'
				+ '<td class="hidden"><input type="hidden" value="'+value.id+'"></input></td>'
				+ '<td class="td-left">'+value.name+'</td>'
				+ '<td>'+(value.stopDate?value.stopDate:"")+'</td>'
				+ '<td>'+value.amount+'</td>'
				+ '<td class="last spinner" align="center">'
				+ 	'<button id="dn_'+value.id+'">&ndash;</button>'
				+   '<input type="text" class="spin-list" id="quantitySpin_'+value.id+'" value="0" disabled="disabled" />'
				+   '<button id="up_'+value.id+'">+</button>'
				+ '</td>'
				+ '</tr>'
			);
			ticketsIdsArray.push(value.id);
			ticketsMaxOrders.push(value.maxOrder);
			ticketsMinOrders.push(value.minOrder);
		});
		
		// bind action for spinner buttons in case quantity selection is disabled
		$('.spinner button').unbind().click(function(){
			checkIfDateTimeSelected();
		});
		
		// bind action for register
		$('#registerButton').unbind().click(function() {
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
	}
	else {
		$("#event-date-time").hide();
		$('#tickets_table').hide();
		$('#registerButton').parent().hide();
	}
	
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
	
	if(response.ticketTypes.length > 0) {
		// date-time-stock management
		switch ($('#calendarType').val()) {
		case "DATE_ONLY":
			$('#event-date-time').show();
			$('#date_div').show();
			getProductDates(response.id, today.getMonth()+1, today.getFullYear(), "DATE_ONLY");
			break;
		case "DATE_TIME":
			$('#event-date-time').show();
			$('#date_div').show();
			$('#time_div').show();
			getProductDates(response.id, today.getMonth()+1, today.getFullYear(), "DATE_TIME");
			break;
		case "NO_DATE": default:
			getStockInfo();
			break;
		}
	}
	
	// Screen Shots
	var newGroup = true;
	var count = 0;
	var htmlString = "";
	$('#screenshots .controls').hide();
	if (response.pictures.length > 0) {
		$.each(response.pictures, function() {
			if(newGroup) {
				newGroup = false;
				htmlString += '<ul>';
			}
			htmlString += '<li><a href="'+this.url+'" class="screenshot" rel="group"><img src="'+this.url+'" alt="" /></a></li>';
			count++;
			if(count >= 4) {
				$('#screenshots .controls').show();
				newGroup = true;
				count = 0;
				htmlString += '</ul>';
			}
		});
	}
	else {
		//htmlString += '<ul>';
		//htmlString += '<li><a href="'+noImage+'" class="screenshot" rel="group"><img src="'+noImage+'" alt="" /></a></li>';
		//htmlString += '</ul>';
		$('#eventPictures').hide();
	}
	$('#screenshots .scrollable .items').html(htmlString);
	
	// Configure fancybox plugin
	$("a.screenshot").fancybox({
		'transitionIn'	:	'fade',
		'transitionOut'	:	'fade',
		'speedIn'		:	500, 
		'speedOut'		:	500, 
		'type'			:	'image',
		'overlayShow'	:	false,
	});
	// Configure scrollable plugin
	$(".scrollable").scrollable({ });
	
	//Description
	if(response.description)
		$('#eventDetails').html(response.description);
	else
		$('#eventDetailsDiv').hide();
	
	// Init OpenStreetMap
	showMap();
	getAllPois($('#idEvent').val());
	
	$('#facebookComments div.fb-comments').attr("data-href", "http://www.codechic.org:9999/iper2010/event/getEvent?event.idEvent="+response.id+"");
	// initialize the FB JavaScript SDK
	if(!fbApiInit) {
		FBInit();
		fbApiInit = true;
	}
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

/**
 * empty the cart from all items
 */
function clearCart() {
	var dataToSend = "format=json";
	
	$.ajax({
		url : clearCartUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			
		}
	});
}

/**
 * add a group of tickets to the cart
 * @param liste			array of tickets
 * @param startDate			
 */
function addAllTicketsToCart(liste, startDate) {
	if (liste.length > 0) {
		var dataToSend = "format=json";
		dataToSend += "&productId="+liste[0].productId;
		dataToSend += "&ticketTypeId="+liste[0].ticketTypeId;
		dataToSend += "&quantity="+liste[0].quantity;
		dataToSend += "&startDate="+startDate;
		
		$.ajax({
			url : addTicketToCartUrl,
			type : "GET",
			data : dataToSend,
			dataType : "json",
			cache : false,
			async : true,
			success : function(response, status) {
				liste.splice(0, 1);
				addAllTicketsToCart(liste, startDate);				
			}
		});
	}
	else {
		window.location.href = "register.gsp?productName="+$('div#eventTitle').text();
	}
}

/**
 * Add all tickets to the cart and register
 */
function register() {
	// Check of user is authorized
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
			ticket += '"productId":' + $('#idEvent').val() + ',';
			ticket += '"ticketTypeId":' + row[0] + ',';
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
	
	$('#content').showLoading();
	addAllTicketsToCart(eval('([' + liste + '])'), startDate);
}

// prepend values lower than 10 with 0
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
            		$('#quantitySpin_'+ticket.ticketTypeId+'').val(ticket.quantity);
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

