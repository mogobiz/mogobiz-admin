jQuery(document).ready(function() {
	if (getHTTPParameter("store") != null) {
		localStorage.setItem('store', getHTTPParameter("store"));
	}
	// LOGO
	$('div#header a.logo').css('background-image','url("'+displayLogoUrl+'?store='+localStorage.getItem('store')+'&format=json")');
});

//initialize the FB JavaScript SDK
function FBInit() {
	FB.init({
		appId	: '319105631457122', // App ID
		channelUrl : 'http://www.codechic.org:9999/iper2010/fbevent/channel.gsp',
		status	: true, // check login status
		cookie	: true, // enable cookies to allow the server to access the session
		logging	: true, // enable logging
		xfbml	: true, // parse XFBML
		oauth	: true
	});
	FB.Canvas.setAutoGrow();
}

function goHome(dataToSend) {
	if (dataToSend) {
		window.location.href = "index.gsp" + "?" + dataToSend;
	}
	else {
		window.location.href = "index.gsp";
	}
}

function goToProductPage(productId) {
	window.location.href = "showEvent.gsp?productId=" + productId;
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

/**
 * list All Categories
 */
function listAllCategories(selectedCategoryID) {
	var dataToSend = "format=json";
	
	$('#top').showLoading();
	$.ajax({
		url : listAllCategoriesUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : false,
		success : function(response, status) {
			$('#top').hideLoading();
			
			// Fill Categories
			var categories = [];
			$.each(response, function(i, value) {
				var category = {
					id : value.id,
					label : value.name,
					value : value.name
				}
				categories[i] = category;
			});
			loadComboData("#selectCategoriesCombo", categories, allCategoriesLabel);
			
			if(selectedCategoryID) {
				$("#selectCategoriesCombo").val(selectedCategoryID);
			}
			$("#selectCategoriesCombo").chosen();
		}
	});
}

/**
 * Fill categories combo with data
 * @param comboId
 * @param data
 */
function loadComboData(comboId, data, nonSelectedText) {
	
	$(comboId).empty();
	if (nonSelectedText) {
		$(comboId).append("<option value='' selected>" + nonSelectedText + "</option>");
	}
	var auxArr = [];
	$.each(data, function(i, value) {
		$(comboId).append("<option value='" + value.id + "'>" + value.label + "</option>");
	});
}
