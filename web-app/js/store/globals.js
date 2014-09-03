function goToProductPage(productId) {
	window.location.href = "getProduct?id=" + productId;
}

function goToIndexPage(parameters) {
	//var parameters=jQuery.param(obj);
	window.location.href = "index?store=" +localStorage.getItem('store') + '&' +parameters;
}
function getHTTPParameter(paramName) {
	var parameters = document.location.search;
	if (parameters != null && parameters.length > 0) {
		parameters = parameters.substring(1);
		var parametersArray = parameters.split("&");
		for (var i = 0; i < parametersArray.length; i++) {
			var param = parametersArray[i].split("=");
			if (param[0] == paramName) {				
				return decodeURI(param[1]);
			}
		}
	}
	return null;
}

function listAllCategories(destinationUlId) {
	callServer(listAllCategoriesUrl, '', function(response){
		getListAllCategories(response,destinationUlId)
	}, errorCallingServer);
/*	
	var dataToSend = "format=json";
	$.ajax({
		url : listAllCategoriesUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {

		},
        error: function(result) {
            alert("Error in calling ajax list categories");
        }
	});*/
}

function getListAllCategories(response,destinationUlId){
	// Fill Categories
	var categories = [];
	$.each(response, function(i, value) {
		// will draw categories on top and left of page together if it receive the destination of the left side
		// by default will draw only top.
		if(destinationUlId)
			$('#'+destinationUlId).append("<li><a href='javascript:void(0)' title='" + value.name + "'  id='category"+value.id+"' onclick='javascript:listProductsByCategoryGlobal(this)'>" + value.name + "</a></li>");
		$('#listOfCategories').append("<li><a href='javascript:void(0)' title='" + value.name + "'  id='category"+value.id+"' onclick='javascript:listProductsByCategoryGlobal(this)'>" + value.name + "</a></li>");
		
		$('#filter_category_id').append('<option value="' + value.id + '">' + value.name + '</option>');
		
	});
	if(listProductsByCategoryCriteria && listProductsByCategoryCriteria.id){
		$("#filter_category_id").val(listProductsByCategoryCriteria.id.substring(8, listProductsByCategoryCriteria.id.length));
	}
}

function listProductsByCategoryGlobal(obj) {
	//var categoryIdString=obj.id;
	//var categoryId=categoryIdString.substring(8,categoryIdString.length)
	if(window.location.href.indexOf("store/index?") == -1){
		var parameters='categoryId='+obj.id+'&categoryTitle='+obj.title+'&searchedText=';
		goToIndexPage(parameters)
	}
	else{
		listProductsByCategoryCriteria = {id: obj.id ,title: obj.title};
		listProductsByCategory();
	}
}
function searchProducts(searchedText){
	var parameters='categoryId=null&categoryTitle=null&searchedText='+searchedText;
	goToIndexPage(parameters)
}

/**
 * list all items added to the cart
 */
function listAllCart(success) {
	callServer(listAllCartUrl, '', success, errorCallingServer);
	/*var dataToSend = "format=json";
	var afterCallingSuccess = function (response, status) {
		success(response);
	}
	$.ajax({
		url : listAllCartUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : afterCallingSuccess function(response, status) {
			// Go to Registration Form
			
			showRegistrationForm(response);
		}
	});*/
}

function fillCartMenu(response) {
	var price = 0;
	var items = 0;
	
	$("#cart_menu div.s_submenu.s_cart_holder").empty();
	
	$.each(response, function() {
		$("#cart_menu div.s_submenu.s_cart_holder").append('<div class="s_cart_item">'
		+'<a id="remove_'+this.productId+'" class="s_button_remove" href="#">&nbsp;</a>'
		+'<span class="block">'+ this.quantity +'x&nbsp;<a href="#">'+this.ticketTypeName+'</a></span>'
		+'</div>');
		
		items += this.quantity;
		price += this.price * this.quantity;
	});
	
	$("#cart_menu span.s_grand_total.s_main_color").html(items + "&nbsp;items");
	$("#cart_menu div.s_submenu.s_cart_holder").append('<span class="clear s_mb_15 border_eee"></span>');
	$("#cart_menu div.s_submenu.s_cart_holder").append('<div class="s_total clearfix">'
	+'<strong class="cart_module_total left">Total:</strong>'
	+'<span class="cart_module_total">'+price+'<span class="s_currency s_after"> &euro;</span></span>'
	+'</div>');
	
	if (items > 0) {
		$("#cart_menu div.s_submenu.s_cart_holder").append('<span class="clear s_mb_15"></span>');
		$("#cart_menu div.s_submenu.s_cart_holder").append('<div class="align_center clearfix">'
		+'<a id="cleartCartBtn" class="s_button_1 s_secondary_color_bgr s_ml_0" href="javascript:void(0)"><span class="s_text">Clear Cart</span></a>'
		+'<a id="viewCartBtn" class="s_button_1 s_secondary_color_bgr" href="javascript:void(0)"><span class="s_text">View Cart</span></a>'	      
		+'</div>');
	}
	
	$("#cleartCartBtn").click(function(){
		clearCart();
		if(cartItems){
			cartItems = [];
		}
	});
}

function clearCart() {
/*	var dataToSend = "format=json";
	$.ajax({
		url : clearCartUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function() {
			// List Cart
			listAllCart(fillCartMenu);
		}
	});*/
	//alert('clearCart')
	callServer(clearCartUrl, '', function(response){
		listAllCart(fillCartMenu);
		if(cartItems)//reinitialise it if we are at page getProduct
			cartItems = [];
	}, errorCallingServer);
}


/**
 * @param date   ---> dd/mm/yyyy hh:mm
 * @param format ---> FULL, WEEKDAY, MONTH, DAY, YEAR, TIME, MONTH_INT
 */
/*function getDate(date, format) {
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
}*/

function showMessage(message){
	$('#errorMessage span.message').empty().html(message);
	$('#errorMessage').show();
}
function callServer(url, dataToSend, success, error){
	url = url + "?format=json";
	
	var afterCallingSuccess = function (response) {
		success(response);
	}
	var afterCallingError = function (response) {
		error(response);
	}
	$.ajax({
		url : url,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : afterCallingSuccess,
        error: afterCallingError
	});	
}

function errorCallingServer(response){
	//console.log(response);
	alert("ERROR: " + response.status + " ( " + response.statusText + " ) ");//response.responseText
	
}

function isInt(n) {
	if(n.indexOf(".") ==1)
		return false;
	return  parseFloat(n) == parseInt(n) && !isNaN(n) ; 
	}