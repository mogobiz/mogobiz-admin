var calendarType = 'NO_DATE';
var productId=0;
var productWorking=false;
var companyId=0;
var ticketsStock = [];
var cartItems = [];
var globalStock;
var isSaleOutOfStockAllowed = false;
//var dates_allowed;

$(document).ready(function() {
	
	$('#content').showLoading({'addClass': 'store-loading-96'});
	// List Cart
	listAllCart(fillCartMenu);
	
	//listAllCategories();
	
	productId = getHTTPParameter("id");
	if (getHTTPParameter("id") != null) {
		productId = getHTTPParameter("id");
		localStorage.setItem('productId', productId);
	}
	else{
		productId=localStorage.getItem('productId');
	}
	//$('div#logoContainer a#site_logo').css('background-image','url("'+displayLogoUrl+'?store='+localStorage.getItem('store')+'&format=json")');
	
	listAllCategories(); 
	callServer(getProductUrl, "&id="+productId, loadProduct, errorCallingServer);//get data details of the product
	$("#searchByText").click(function(){
		searchProducts($('#filter_keyword').val());
	});	
	$("#filter_keyword").keyup(function(e){
		if (e.which === 13) {
			searchProducts($('#filter_keyword').val());
		}
		
	});
	
/*	$("#filter_category_id").change(function(){//will return back to index.gsp
		if($("#filter_category_id").val()!=-1)
			listProductsByCategory({id:'category'+$("#filter_category_id").val(),title:$("#filter_category_id option:selected").text()});
	});*/
});

function loadProduct(response) {

	$('#productLabel').html(response.name);	

/*	$('#startDateValue').html((getDate(response.startDate)).toString());
	$('#endDateValue').html((getDate(response.stopDate)).toString());
	
	$('#event_date').val("");
	$('#event_time').val("");*/
	
	// date-time-stock management
	calendarType = response.calendarType.name;
	var today = new Date();
	

	ticketsStock[0]={};
	ticketsStock[0].productId=productId;
	ticketsStock[0].ticketTypeId = -1;

	ticketsStock[0].name=response.name;
	ticketsStock[0].price=response.montant;
	if(response.stock.stockUnlimited || response.stock.stockOutSelling){
		ticketsStock[0].stock=-1;
		globalStock = -1;
		if(response.stock.stockOutSelling){
			isSaleOutOfStockAllowed = true;
		}
	}
	else{
		ticketsStock[0].stock=response.stock.stock;
		globalStock = response.stock.stock;
	}
	if(response.ticketTypes.length>0){
		productWorking = false
	}
	else{
		productWorking = true;
	}
	
	var counter=1;
	var trClass='odd';
	
	$.each(response.ticketTypes, function(i, value) {
		
		if(counter%2 == 0)
			trClass = 'odd'
			else
				trClass = 'even'		
		
		ticketsStock[counter]={};
		ticketsStock[counter].productId=productId;
		ticketsStock[counter].ticketTypeId=value.id;
		ticketsStock[counter].minOrder=value.minOrder;
		ticketsStock[counter].maxOrder=value.maxOrder;
		ticketsStock[counter].price=value.amount;
		ticketsStock[counter].name=value.name;
		//alert(value.name +'     '+value.id+'       '+value.amount)
		
		$('#listTickets tbody').append(
				'<tr class="'+trClass+'">'
				+ '<td align="left"><a href="javascript:void(0)" ><strong>'+value.name+'</strong></a></td>'
				+ '<td valign="middle">'+value.amount+'<span class="s_currency s_after"> eur</span></td>'
				+ '<td valign="middle"><input type="text" id="ticketQuantity'+value.id+'" size="3"  value="0" onkeyup="checkValidityAndTotal()"/></td>'
				+ '</tr>'
		);	
		counter++;
	});

	
	
	if(ticketsStock.length>1)//for a product of no variations we dont need to call getStockInfo.
		getStockInfo();
	else{//alert('appending')
		$('#listTickets tbody').append(
				'<tr class="even">'
				+ '<td align="left"><a href="javascript:void(0)" ><strong>'+ticketsStock[0].name+'</strong></a></td>'
				+ '<td valign="middle">'+ticketsStock[0].price+'<span class="s_currency s_after"> eur</span></td>'
				+ '<td valign="middle"><input type="text" id="ticketQuantity'+ticketsStock[0].productId+'" size="3"  value="0" onkeyup="checkValidityAndTotal()"/></td>'
				+ '</tr>'
		);
		$('#content').hideLoading();
	}
	
	$('#eventDetails').html(response.description);

	companyId = response.company.id;

	
	fillTicketsQuantiesAndDates();//stored from refresh
	/*************
	 * Should be applied later
	 */
	$('#checkOutButton').unbind().click(function() {		
		if(checkValidityAndTotal()){
			register();	
		}

	});
	
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
			if(count >= 5) {
				$('#screenshots .controls').show();
				newGroup = true;
				count = 0;
				htmlString += '</ul>';
			}
		});
	}
	else {
		$('#eventImages').hide();
	}
	$('#screenshots .scrollable .items').html(htmlString);
	
	// Configure fancybox plugin
	$("a.screenshot").fancybox({
		'transitionIn'	:	'fade',
		'transitionOut'	:	'fade',
		'speedIn'		:	500, 
		'speedOut'		:	500, 
		//'type'			:	'image',
		'overlayShow'	:	false,
	});
	// Configure scrollable plugin
	$(".scrollable").scrollable({ });

	// Init OpenStreetMap
	showMap();
	getAllPois($('#idProduct').val());
	
	$("#facebookComments").html('<div class="fb-comments" data-href="http://www.codechic.org:9999/iper2010/store/getProduct?id='+response.id+'" data-num-posts="5" data-width="890"></div>');
}

function getStockInfo() {
	var dataToSend = "productId="+productId;
	for(var i=1;i<ticketsStock.length;i++){
		dataToSend += "&ticketsIds="+ticketsStock[i].ticketTypeId;
	}
/*	$.each(ticketsStock, function(i) {
		dataToSend += "&ticketsIds="+ticketsStock[i].id;
	});*/

	callServer(getProductStockInfoUrl, dataToSend, parseStockInformations, errorCallingServer);

}

function parseStockInformations(response){
	
	
	//alert(JSON.stringify(response))
	var k=0;
	for(var i=1;i<ticketsStock.length;i++){
		if(ticketsStock[i].ticketTypeId==response.ticketsStock[k].ticketTypeId){
			ticketsStock[i].stock = response.ticketsStock[k].stock;
		}
		k++;
	}
	globalStock = response.globalStock;
	ticketsStock[0].stock = response.globalStock;
/*	if(response.ticketsStock){
		$.each(response.ticketsStock, function(i, value) {
			if(ticketsStock[i].ticketTypeId == value.ticketTypeId){
				ticketsStock[i].stock = value.stock;
			}
		});
		globalStock = response.globalStock;
	}*/

	//alert('globalStock: '+globalStock)
	$('#content').hideLoading();
}
 
//Check quantities before register
function checkGlobalQuantities() {
	if(isSaleOutOfStockAllowed){
		return true;
	}
	var q = 0;
	var areQuantitiesValid = true;
	$("#listTickets tbody td :input[type='text']").each(function() {
		if(isInt(this.value)){//before adding we must confirm that inputs values are not text or float
			q = q + parseInt(this.value);
		}
		else{
			showMessage(validQuantity_label);
			areQuantitiesValid = false;
			return false;
		}
	});
	
	if(!areQuantitiesValid)
		return false;
//alert('still in function: '+q +'   **     '+globalStock+' **   '+productWorking)
	if(q > 0) {

		if(productWorking){
			if (globalStock == -1){
				$('#errorMessage').hide();
				return true;
			}
			else if(globalStock > 0 && q <= globalStock){
				$('#errorMessage').hide();
				return true;
			}
			if (q > globalStock){
				showMessage(noQuantity_label);
				return false;
			}
		}
		
		else{//case of variations
/*			if (globalStock == 0){
				showMessage(definedQuantity_label);
				return false;
			}*/
			if (globalStock > 0 && q > globalStock) {
				var message = noQuantity_label;//maxAllowedNumber_label + " " + globalStock;
				showMessage(message);
				return false;
			}
			else {
				 if(checkMinMaxQuantities()){
					 $('#errorMessage').hide();
					 return true;
				 }
				 return false;
			}			
			
		}//end case of variations
		
		
		

	}
	else if(q==0){//alert('will enter in case of q=0')
		if(productWorking){
			if(doesItemExistsInCart(-1)){
				$('#errorMessage').hide();
				return true;
			}
		}
		else{
			for(var k=0;k<cartItems.length;k++){
				if(doesItemExistsInCart(cartItems[k].ticketTypeId)){
					$('#errorMessage').hide();
					return true;
				}
			}
		}
		return false;
	}
	else {

		$('#totalPaymentLabel').html(0);
		$('#totalPaymentLabel2').html(0);
		showMessage(validQuantity_label);
		return false;
	}
}
function checkMinMaxQuantities(){
	//alert('checkMinMaxQuantities')
	for(var i=1;i<ticketsStock.length;i++){
		var ticketId= ticketsStock[i].ticketTypeId;
		var inputValue = $('#ticketQuantity'+ticketId).val(); 
		var maxValue = ticketsStock[i].maxOrder;
		var haveMaxValueProblem = true;
		if (maxValue == -1){
			haveMaxValueProblem = false;
		}
		else{
			if(maxValue>=inputValue)
				haveMaxValueProblem = false;
		}
		//alert(ticketsStock[i].minOrder +'         '+maxValue+'        '+ticketsStock[i].stock)
		if(inputValue != 0 && (inputValue > ticketsStock[i].stock)){
			
			showMessage(noQuantity_label)
			$('#ticketQuantity'+ticketId).focus();
			return false;
		}
		else if(inputValue != 0 && (inputValue < ticketsStock[i].minOrder || haveMaxValueProblem)){
			if(inputValue < ticketsStock[i].minOrder){
				showMessage(minimumQuantity_label + ' : ' + ticketsStock[i].minOrder);
				return false;				
			}
			else{
				showMessage(maximumQuantity_label + ' : ' + maxValue);
				return false;					
			}

		}	
	}
	return true;
}

function calculateTotal(){
	var total = 0;
	if(ticketsStock.length>1){
		for(var i=1;i<ticketsStock.length;i++){
			var ticketId= ticketsStock[i].ticketTypeId;
			var inputValue=$('#ticketQuantity'+ticketId).val(); 
			total= total +inputValue * ticketsStock[i].price
		}
	}
	else{
		var inputValue=$('#ticketQuantity'+ticketsStock[0].productId).val(); 
		total= total +inputValue * ticketsStock[0].price
	}
	return total;
}



/**
 * add a group of tickets to the cart
 * @param liste			array of tickets
 */
function addOrUpdateTicketsToCart() {
	$('#shopping_cart').showLoading({'addClass': 'store-loading-96'});
	var dataToSend = "";
	var url = "NOTHING";
	if (ticketsStock.length > 0) {//product has tickets listed
		if(ticketsStock[0].ticketTypeId == -1 && !productWorking ){//case of product has variations 
			//alert('will splice and continue. ')// data of product if it has variations no need to add it to cart
			ticketsStock.splice(0, 1);
			addOrUpdateTicketsToCart();
			return;
		}
		else if(ticketsStock.length == 1 && productWorking){//case of product has no variations 
			//url = addProductToCartUrl;
		}
		
		//alert('continue')

		//for(var i=0;i<ticketsStock.length;i++){
			var isTicketOrProductExistsInCart = false;
			
			var ticketId=ticketsStock[0].ticketTypeId;
			var productId=ticketsStock[0].productId;
			var cartItemId = 0;
			for(var k=0;k<cartItems.length;k++){
				if(productId == cartItems[k].productId && ticketId == cartItems[k].ticketTypeId){
					isTicketOrProductExistsInCart = true;
					cartItemId = cartItems[k].id ;
					break;
				}
			}
		
			if(isTicketOrProductExistsInCart==true){
				url = updateTicketToCartUrl;
				if(ticketsStock[0].quantity==0){
					url = removeTicketFromCartUrl;
					cartItems.splice(k,1);//to remove current item from list to synchronise indexes with server for next update or remove
				}
					
				dataToSend += "cartItemId="+cartItemId;
			}
			else{
				if(ticketsStock[0].quantity>0){
					dataToSend += "productId="+productId;
					if(productWorking){
						url=addProductToCartUrl;// updated on java to handle both ticket and product
						cartItems[cartItems.length]=ticketsStock[0].productId;
					}
					else{
						url = addTicketToCartUrl;
						
						dataToSend += "&ticketTypeId="+ticketsStock[0].ticketTypeId;
						cartItems[cartItems.length]=ticketsStock[0].ticketTypeId;//to add current item to cart to synchronise indexes with server for next update or remove
						
					}
				}
			}
			if(ticketsStock[0].quantity>0)
				dataToSend += "&quantity="+ticketsStock[0].quantity;
		if(url!="NOTHING"){
			callServer(url, dataToSend, continueAddOrUpdateTicketsToCart, errorCallingServer);						
		}
		else{//if it is nothing case if ticket quantity=0 but don't exist in cart so no remove or add will be transacted
			ticketsStock.splice(0, 1);
			addOrUpdateTicketsToCart();	
		}
	}
	else {
		finishAddOrUpdateTicketsToCart();
	}
}

function finishAddOrUpdateTicketsToCart(){
	/*		localStorage.setItem('calendarValue',$('#event_date').val());
	localStorage.setItem('timeValue',$('#event_time').val());*/
	$('#shopping_cart').hideLoading();
	if(cartItems.length>0)
		window.location.href = "registrationComplete?store="+localStorage.getItem('store')+"&productName="+$('#productLabel').text()+"&idCompany="+companyId;
	else
		window.location.href = "index?store="+localStorage.getItem('store');
}

function continueAddOrUpdateTicketsToCart(){
	ticketsStock.splice(0, 1);
	addOrUpdateTicketsToCart();	
}


/**
 * Add all tickets to the cart and register
 */
function register() {
	ticketsStock[0].quantity = $("#ticketQuantity"+ticketsStock[0].productId).val();
	if(ticketsStock.length>1){
		for (var i=1;i<ticketsStock.length;i++) {
			var ticketId = ticketsStock[i].ticketTypeId;
			ticketsStock[i].quantity=$("#ticketQuantity"+ticketId).val();
		}		
	}


	
	//$('#content').showLoading();
	addOrUpdateTicketsToCart();
}

function checkValidityAndTotal(){
	if(checkGlobalQuantities()){
		var total = calculateTotal();
		drawTotalOnPage(total)
		return true;

	}	
	return false;
}

function drawTotalOnPage(total){
	$('#totalPaymentLabel').html(total);
	$('#totalPaymentLabel2').html(total);
}

/**
 * This function will be called to set the values already selected when returned back to this page from back button.
 */

function fillTicketsQuantiesAndDates(){
	listAllCart(fillTicketsQuanties);
	
}

function fillTicketsQuanties(cart){
	//alert('fillTicketsQuanties: '+JSON.stringify(cart));
	for (var i=0;i<cart.length;i++) {
		
		cartItems[i] = {};
		cartItems[i].productId = cart[i].productId ;
		cartItems[i].ticketTypeId = (cart[i].ticketTypeId?cart[i].ticketTypeId:-1);
		cartItems[i].ticketTypeName = (cart[i].ticketTypeName?cart[i].ticketTypeName:$("#productLabel").val());
		cartItems[i].quantity = cart[i].quantity ;
		if(productId=cart[i].productId){
			if(cartItems[i].ticketTypeId==-1){
				$("#ticketQuantity"+productId).val(cart[i].quantity) ;
			}
			else if(cartItems[i].ticketTypeId!=-1){
				$("#ticketQuantity"+cartItems[i].ticketTypeId).val(cart[i].quantity) ;
			}
		}
	}
	var total = calculateTotal();
	drawTotalOnPage(total);
/*	if(cart.length>0){
		fillPreviousDateAndTimeValues();	
	}*/
}

function doesItemExistsInCart(ticketTypeId){
	for (var i=0;i<cartItems.length;i++) {
		if(cartItems[i].productId==productId && cartItems[i].ticketTypeId==ticketTypeId){
			return true;
		}
	}
	return false;
}

/*function fillPreviousDateAndTimeValues(){
	localStorage.getItem('calendarValue');
	localStorage.getItem('timeValue');
	$('#event_date').val(localStorage.getItem('calendarValue'));
	var canRemoveDisabledFromInputs = true;
	if(calendarType=='DATE_TIME'){
		getProductTimes(productId,  $("#event_date").val());
		var eventTime = localStorage.getItem('timeValue');
		var timeParameter= $('#event_date').val();
		
    	if(eventTime.length>0){	 
    		timeParameter = timeParameter + " " + eventTime;   		
    	}
    	else{//no time is stored
    		timeParameter = timeParameter + " " + "00:00";
    		canRemoveDisabledFromInputs = false;//should select time
    	}
    	getStockInfo(timeParameter);
	}
	else if(calendarType=='DATE_ONLY'){
		getStockInfo($('#event_date').val() + " 00:00");
	}
	else{
		getStockInfo();
	}
	if(canRemoveDisabledFromInputs)
		$('#listTickets :input').removeAttr('disabled');
}

function getProductDates(productId, month, year) {
	
	var dataToSend = "productId="+productId;
	dataToSend+= "&month="+month;
	dataToSend+= "&year="+year;
	
	callServer(getProductDatesUrl, dataToSend, parseProductAllowedDates, errorCallingServer);
	
}

function parseProductAllowedDates(response){
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
        	$('#shopping_cart').showLoading({'addClass': 'store-loading-32'});
        	
        	$('#event_date').val("");
    		$('#event_time').empty().append("<option value=''>"+selectTimeLabel+"</option>").attr('disabled','disabled');
        	// hide error message if exist
        	$('#errorMessage').hide();
        	//reset and disable quantity selection if it was enabled

    		var today = new Date();
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
        	
        	if (calendarType == "DATE_ONLY") {
        		$('#listTickets :input').removeAttr('disabled');
        		($('#event_date').val()+" "+"00:00");
        	}
        	else if (calendarType == "DATE_TIME") {
        		getProductTimes(productId,  $("#event_date").val());
        	}
        	
		},
		onClose: function() {
			if($('#event_date').datepicker( "getDate" ) == null) {
				var today = new Date();
				updateProductDates(productId, prependZero(today.getMonth() + 1), prependZero(today.getFullYear()));
			}
		}
	}).keydown(function(){
		return false;
	});	
    $('#content').hideLoading();
}

function updateProductDates(productId, month, year) {
	
	var dataToSend = "productId="+productId;
	dataToSend+= "&month="+month;
	dataToSend+= "&year="+year;
	
	callServer(getProductDatesUrl, dataToSend, buildAllowedDatesArray, errorCallingServer);
}

function buildAllowedDatesArray(response){
	dates_allowed = {};
	$.each(response, function(i, date) {
		dates_allowed[date] = true;
		$('#event_date').datepicker('refresh');
	});
	 $('#shopping_cart').hideLoading();
}

function getProductTimes(productId, date) {
	$('#shopping_cart').showLoading({'addClass': 'store-loading-32'});
	var dataToSend = "productId="+productId;
	dataToSend+= "&date="+date;
	
	callServer(getProductTimesUrl, dataToSend, buildTimeOptions, errorCallingServer);

}

function buildTimeOptions(response){
	$('#event_time').empty().append("<option value=''>"+selectTimeLabel+"</option>");
	$.each(response, function(i, time) {				
		$('#event_time').append("<option value='" + time + "'>" + time + "</option>");
	});
	$('#event_time').removeAttr("disabled");
	$('#event_time').val(localStorage.getItem('timeValue'));
	
	$('#shopping_cart').hideLoading();
	
	$('#event_time').change(function(){
		// hide error message if exist
    	$('#errorMessage').hide();
    	//reset and disable quantity selection if it was enabled

    	$('#listTickets :input').removeAttr('disabled');
		$("#event_time option[value='']").remove();
		getStockInfo($('#event_date').val()+" "+$('#event_time').val());

	});	
	
}
*/