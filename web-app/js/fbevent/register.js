var fbApiInit = false;
var firstname, lastname, email, totalPrice = 0;;
$(document).ready(function() {
	window.fbAsyncInit = function() {
		// initialize the FB JavaScript SDK
		if(!fbApiInit) {
			FBInit();
			fbApiInit = true;
		}
		FB.Canvas.setSize({ width: 760, height: 500 });
		
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
		
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				// the user is logged in and connected to the app
				FB.api('/me', function(response) {
					firstname = response.first_name;
					lastname = response.last_name;
					email = response.email;
					listAllCart();
					$('#page').show();
				});
			}
			else if (response.status === 'not_authorized') {
				// the user is logged in to Facebook, but not connected to the app
				alert("not_authorized");
			}
			else {
				// the user isn't even logged in to Facebook.
				$('#dialog').html('<p>'+autofillMessageLabel+'</p>');
				$("#dialog").dialog({
					title : autofillLabel,
					modal : true,
					resizable :false,
					width : 'auto',
					height : 'auto',
					open: function(event) {
						$('.ui-dialog-buttonpane').find('button:contains("yesLabel")').html('<span class="ui-button-text">'+yesLabel+'</span>');
						$('.ui-dialog-buttonpane').find('button:contains("noLabel")').html('<span class="ui-button-text">'+noLabel+'</span>');
					},
					buttons : {
						yesLabel: function() {
							$(this).dialog("close");
							FB.login(function(response) {
								if (response.authResponse) {
									FB.api('/me', function(response) {
										firstname = response.first_name;
										lastname = response.last_name;
										email = response.email;
										listAllCart();
										$('#page').show();
									});
								}
								else {
									window.location.href = "index.gsp";
								}
							}, {scope: 'email'});
						},
						noLabel: function() {
							$(this).dialog("close");
							firstname = "";
							lastname = "";
							email = "";
							listAllCart();
							$('#page').show();
						}
					}
				});
			}
		});
	}
});

/**
 * list all items added to the cart
 */
function listAllCart() {
	var dataToSend = "format=json";
	$('#content').showLoading();
	$.ajax({
		url : listAllCartUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			// Go to Registration Form
			$('#content').show().hideLoading();
			showRegistrationForm(response);
		}
	});
}

function showRegistrationForm(products) {
	if(products.length > 0)
		$('#content .panel_head input#idEvent').val(products[0].productId);
	if($('#breadCrumb ul li').length <= 1 ) {
		$('#breadCrumb ul').append('<li><a href="javascript:void(0)" onclick="javascript:goToProductPage('+products[0].productId+')">'+getHTTPParameter("productName")+'</a></li>');
		$('#breadCrumb ul').append('<li><a href="javascript:void(0)" onclick="javascript:listAllCart()">Register</a></li>');
	}
	
	$('#register #register_form #tickets').empty();
	var nbTickets = 0;
	$.each(products, function(j, product) {
		for(i=1; i<=product.quantity; i++) {
			nbTickets++;
			totalPrice = totalPrice + product.price;
			$('#register #register_form #tickets').append(
				  '<div class="ticket_regInformation">'
				+ '<h2><span class="header_left">'+product.ticketTypeName+'&nbsp;('+i+')</span><span class="header_right">'+product.price+'&nbsp;&euro;</span></h2>'
				+ '<p><label>First Name</label><input value="'+(nbTickets==1 ? firstname : "")+'" type="text" id="f_name_'+product.ticketTypeId+'_'+i+'" name="f_name_'+product.ticketTypeId+'_'+i+'" class="f_name_input text_field required" style="width: 350px;" /></p>'
				+ '<p><label>Last Name</label><input value="'+(nbTickets==1 ? lastname : "")+'" type="text" id="l_name_'+product.ticketTypeId+'_'+i+'" name="l_name_'+product.ticketTypeId+'_'+i+'" class="l_name_input text_field required" style="width: 350px;" /></p>'
				+ '<p><label>Email</label><input value="'+(nbTickets==1 ? email : "")+'" type="text" id="email_'+product.ticketTypeId+'_'+i+'" name="email_'+product.ticketTypeId+'_'+i+'" class="email_input text_field required email" style="width: 350px;" /></p>'
				+ '<p><label>Country</label>'
				+ '<select id="country_'+product.ticketTypeId+'_'+i+'" name="country_'+product.ticketTypeId+'_'+i+'" class="country_input text_field required registration_Countries" style="width: 120px;" >'
				+ '</select></p>'
				+ '<div style="position: relative; top:-47px; left:225px;">'
				+ '<p><label>Cell Phone</label><input type="text" id="cellNumber_'+product.ticketTypeId+'_'+i+'" name="cellNumber_'+product.ticketTypeId+'_'+i+'" class="cellNumber_input text_field required number" style="width: 124px;" /></p>'
				+ '<div>'
				//+ '<div class="space"></div>'
				+ '</div>'
			);
			if (nbTickets == 1) {
				$('#register #register_form #tickets').append(
					'<div style="margin-left: 130px; position:relative; top:-20px;">'
					+ '<label style="float:left;" class="uiButton uiButtonConfirm uiButtonMedium">'
					+ '<input type="button" id="copyTicketInfo" value="'+copyTicketInfoLabel+'" style="width:auto;"/>'
					+ '</label>'
					+ '</div>'
					+'<br class="clear"></br>'
				);
			}
		}
	});
	
	$('#copyTicketInfo').click(function() {
		$('.l_name_input').val($('.l_name_input').first().val());
		$('.email_input').val($('.email_input').val());
		$('.country_input').val($('.country_input').first().val());
		$('.cellNumber_input').val($('.cellNumber_input').first().val());
	});
	
	if (nbTickets <= 1) {
		$('#copyTicketInfo').parent().hide();
	}

	// Load countries
	loadCountries();
	
	// Load years
	loadYears();
	$("#register_form").validate();
	
	// Add form submit capability to completeRegistrationButton
	$(".submit").click(function() {
		$(this).parent().submit();
	});
	
	$('#completeRegistrationButton').click(function() {
		if($("#register_form").valid()) {
			completeRegistrationOrder();
		}
	});
}

/**
 * load countries
 * 
 * @return the countries list from db
 */
function loadCountries() {
	var regions = [];
	var countries = [];
	var countryReg = [];
	
	var dataToSend = [{ name : "format", value : "json"}]
	$.ajax({
		url : countriesUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(data, status) {
			countries = []
			$.each(data, function(i, value) {
				var country = {
					id : value.id,
					label : value.name,
					value : value.name
				}

				$.each(value.regions, function(j, reg) {
					var region = {
						label : reg.name,
						value : reg.name
					}
					regions[j] = region;
				});
				countryReg[value.name] = regions;
				countries[i] = country;
			});
			
			// add countries to select combos
			$.each(countries, function(i, value) {
				$('.registration_Countries').append("<option value='" + value.id + "'>" + value.label + "</option>");
			});
		}
	});
}

/**
 * loadYears() return 10 years starting from the current year, and fills them
 * the combo
 */
function loadYears() {
	var today = new Date();
	var thisYear = today.getFullYear();
	// add years
	for (i=0;i<10;i++) {
		$('#cc_year').append("<option value='" + (thisYear+i) + "'>" + (thisYear+i) + "</option>");
	}
}

/**
 * when submit complete registration button it will send details about each ticket
 */

function completeRegistrationOrder(){
	var dataToSend = "format=json";
	$('#content').showLoading();
	$.ajax({
		url : completeRegistrationOrderUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			checkTicketsOrdered(response.cartItemVOs);		
		}
	});
}

/**
 * before commiting the order we should confirm that each ticket has no order problem.
 * @param response
 */

function checkTicketsOrdered(cartItemVOs){
	var ordered=true;
	var messageError=null;
	for(var i=0;i<cartItemVOs.length;i++){
		if(cartItemVOs[i].ordered==false){
			ordered=false;
			messageError=cartItemVOs[i].orderError;
			break;
		}
	}
	if(ordered){
		completeRegistrationCommit(cartItemVOs);
	}
	else{
		alert("ERROR: " + messageError);
	}
}


/**
 * this will continue the registration 
 * @param cartItemVOs it receives ticket detail and send more for each user details
 */
function completeRegistrationCommit(cartItemVOs){
	var boTicketTypeItems='{';//boTicketTypeItems
	for(var i=0;i<cartItemVOs.length;i++){
		var quantityForTicket=cartItemVOs[i].quantity;
		var ticketDetails='';	
		for(j=1;j<=quantityForTicket;j++){
			var ticketDetailElement='{';
			ticketDetailElement=ticketDetailElement+'"firstname":"'+($('#f_name_'+cartItemVOs[i].ticketTypeId +'_'+j).val()).trim()+'",';
			ticketDetailElement=ticketDetailElement+'"lastname":"'+($('#l_name_'+cartItemVOs[i].ticketTypeId +'_'+j).val()).trim()+'",';
			ticketDetailElement=ticketDetailElement+'"email":"'+($('#email_'+cartItemVOs[i].ticketTypeId +'_'+j).val()).trim()+'",';
			ticketDetailElement=ticketDetailElement+'"phone":"'+($('#cellNumber_'+cartItemVOs[i].ticketTypeId +'_'+j).val()).trim()+'"';
			ticketDetailElement=ticketDetailElement+'}';			
			
			ticketDetails=ticketDetails+ticketDetailElement;
			if(j<quantityForTicket)
				ticketDetails=ticketDetails+',';
		}

		boTicketTypeItems=boTicketTypeItems+'"'+cartItemVOs[i].ticketTypeId+'":['+ticketDetails+']';
		ticketDetails='';
		if(i<cartItemVOs.length-1)
			boTicketTypeItems=boTicketTypeItems+',';
	}
	boTicketTypeItems=boTicketTypeItems+'}';	
	
	var dataToSend = "boTicketTypeItems="+boTicketTypeItems+'&format=json';
	
	$.ajax({
		url : completeRegistrationCommitUrl,
		type : "POST",
		noticeType : "POST",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {	
			if(response.result == "success") {
				window.location.href = "payment.gsp?productName=" + getHTTPParameter("productName") + "&productId=" + $('#idEvent').val() + "&totalPrice=" + totalPrice;
			}
		}
	});
}