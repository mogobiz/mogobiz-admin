$(document).ready(function () {
	
	$('#order_details_Container').showLoading({'addClass': 'store-loading-96'});
	
	// List Cart
	listAllCart(fillCartMenu);
	
	//$('div#logoContainer a#site_logo').css('background-image','url("'+displayLogoUrl+'?store='+localStorage.getItem('store')+'&format=json")');
	listAllCategories(); 
	$("#searchByText").click(function(){
		searchProducts($('#filter_keyword').val());
	});	
	$("#filter_keyword").keyup(function(e){
		if (e.which === 13) {
			searchProducts($('#filter_keyword').val());
		}
	});
	
	listAllCart(showRegistrationForm); 
	
/*	$("#filter_category_id").change(function(){
		if($("#filter_category_id").val()!=-1)
			listProductsByCategory({id:'category'+$("#filter_category_id").val(),title:$("#filter_category_id option:selected").text()});
	});*/
	
	$('#productPageLink').attr('href','getProduct?id=' + localStorage.getItem('productId') + '&store=' + localStorage.getItem('store'));
});


function showRegistrationForm(products) {
	var total = 0;
	$.each(products, function(j, product) {
		for(i=1; i<=product.quantity; i++) {
			total = total + product.price;
			$('#order_details').append(
			    '<div class="s_order clearfix">'
					+ '<p class="s_status"><span class="s_999">'+ price_label +':</span> <span class="s_secondary_color">'+product.price+'&nbsp;&euro;</span></p>'
					+ '<p class="s_id"><span class="s_999">'+product.ticketTypeName+'</span> <span class="s_main_color">#'+i+'</span></p>'
					+ '<span class="clear border_eee"></span>'		        
					+ '<div class="grid_16">'	
							+ '<div class="s_row_2 clearfix">'
							+ '<label><strong>'+ firstName_label +'</strong></label>'
							+ '<input type="text" id="firstname_'+product.ticketTypeId+'_'+i+'" name="firstname_'+product.ticketTypeId+'_'+i+'"  size="30" class="required"/>'
							+ '</div>'
								
							+ '<div class="s_row_2 clearfix">'
							+ '<label><strong>'+ lastName_label +'</strong></label>'
							+ '<input type="text" id="lastname_'+product.ticketTypeId+'_'+i+'" name="lastname_'+product.ticketTypeId+'_'+i+'" size="30" class="required"/>'
							+ '</div>'
								
							+ '<div class="s_row_2 clearfix">'
							+ '<label><strong>'+ email_label +'</strong></label>'
							+ '<input type="text" id="email_'+product.ticketTypeId+'_'+i+'" name="email_'+product.ticketTypeId+'_'+i+'" size="30" class="required email"/>'
							+ '</div>'
								
							+ '<div class="s_row_2 clearfix">'
							+ '<label><strong>'+ country_label +'</strong></label>'
							+ '<select id="country_'+product.ticketTypeId+'_'+i+'" name="country_'+product.ticketTypeId+'_'+i+'" style="width: 212px" class="registration_Countries required"></select>'
							+ '</div>'
								
							+ '<div class="s_row_2 clearfix">'
							+ '<label><strong>'+ cellPhone_label +'</strong></label>'
							+ '<input type="text" id="phone_'+product.ticketTypeId+'_'+i+'" name="phone_'+product.ticketTypeId+'_'+i+'" size="30"  class="required number"/>'
							+ '</div>'
				   
					+ '</div>'
				+ '</div>'
			);
		}	
	});
	// Load countries
	callServer(countriesUrl, '', buildCountryCombo, errorCallingServer);
	
	$('#totalPaymentValue').append(total);
	
	addValidation();
	loadYears();
	
	$('#completeRegistrationButton').click(function() {
		if($("#register_form").valid()) {
			
			$('#order_details_Container').showLoading({'addClass': 'store-loading-96'});
			callServer(completeRegistrationOrderUrl, '', completeRegistrationOrder, errorCallingServer);
		}
	});	
	$('#order_details_Container').hideLoading();
}

/**
 * load countries
 * 
 * @return the countries list from db
 */
function buildCountryCombo(response){
	var regions = [];
	var countries = [];
	var countryReg = [];
	
	countries = []
	$.each(response, function(i, value) {
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


/**
 * when submit complete registration button it will send details about each ticket
 */


function completeRegistrationOrder(response){
	checkTicketsOrdered(response.cartItemVOs);		
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
			ticketDetailElement=ticketDetailElement+'"firstname":"'+($('#firstname_'+cartItemVOs[i].ticketTypeId +'_'+j).val()).trim()+'",';
			ticketDetailElement=ticketDetailElement+'"lastname":"'+($('#lastname_'+cartItemVOs[i].ticketTypeId +'_'+j).val()).trim()+'",';
			ticketDetailElement=ticketDetailElement+'"email":"'+($('#email_'+cartItemVOs[i].ticketTypeId +'_'+j).val()).trim()+'",';
			ticketDetailElement=ticketDetailElement+'"phone":"'+($('#phone_'+cartItemVOs[i].ticketTypeId +'_'+j).val()).trim()+'"';
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
	
	var dataToSend = "boTicketTypeItems="+boTicketTypeItems;
	
	callServer(completeRegistrationCommitUrl, dataToSend, alertCompleteRegistrationSucceeded, errorCallingServer);

}

function alertCompleteRegistrationSucceeded(response){
	if(response.result=="success"){
		$('#order_details_Container').hideLoading();	
		alert(SucceedCompleteRegistration_label);
		window.location.href = "payment?totalPrice="+$('#totalPaymentValue').html();
	}
}

function addValidation(){
	
	jQuery.validator.setDefaults({
		errorElement: "p",
		errorClass: "s_error_msg",
		errorPlacement: function(error, element) {
				error.insertAfter(element);
		},
		highlight: function(element, errorClass, validClass) {
				$(element).addClass("error_element").removeClass(validClass);
				$(element).parent("div").addClass("s_error_row");
		},
		unhighlight: function(element, errorClass, validClass) {
				$(element).removeClass("error_element").addClass(validClass);
				$(element).parent("div").removeClass("s_error_row");
		}
		});
		$("#register_form").validate({
			rules: {
				enquiry: {
						required: true,
						minlength: 10
				}
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
