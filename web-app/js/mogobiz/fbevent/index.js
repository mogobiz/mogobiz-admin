var fbApiInit = false;

$(document).ready(function() {
	window.fbAsyncInit = function() {
		localStorage.removeItem('ticketInformation');
		
		// categories combo event listener
		$("#selectCategoriesCombo").change(function(){
			filterProducts();
		});
		// search button event listener
		$("#searchButton").click(function(){
			filterProducts();
		});
		//search text input event listener
		$("#searchTextInput").keyup(function(e){
			if (e.which === 13) {
				filterProducts();
			}
		});
		
		var searchTextInput=getHTTPParameter("searchTextInput");
		var comboValue=getHTTPParameter("comboValue");
		
		if(searchTextInput==null && comboValue==null){	//index intiated by default
			listAllCategories();
			listAllProducts("alpha","desc");
		}
		else {	// was called from another pages
			$("#searchTextInput").val(searchTextInput);
			listAllCategories(comboValue);
			listAllProducts("alpha","desc");
		}
	}
});

/**
* list Categories having at least one product
*/
function listActiveCategories() {
	var dataToSend = "format=json";
	
	$.ajax({
		url : listActiveCategoriesUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			//
		}
	});
}

/**
 * list All Products
 * @param sortOrder			alpha, price , date
 * @param sortDirection		asc, desc
 */
function listAllProducts(sortOrder, sortDirection, pageOffset) {
	// If search params exist
	if (($("#searchTextInput").val() && $("#searchTextInput").val() != "")) {
		searchProducts();
	}
	else if ($("#selectCategoriesCombo").val() && $("#selectCategoriesCombo").val() != "") {
		listProductsByCategory($("#selectCategoriesCombo").val(),"alpha","desc");
	}
	// If no search params => List All Products
	else {
		var dataToSend = "format=json";
		dataToSend += "&sortOrder="+sortOrder;
		dataToSend += "&sortDirection="+sortDirection;
		if(pageOffset) {
			dataToSend += "&pageOffset="+pageOffset;
		}
		$('#content').showLoading();
		$.ajax({
			url : listAllProductsUrl,
			type : "GET",
			data : dataToSend,
			dataType : "json",
			cache : false,
			async : true,
			success : function(response, status) {
				$('#content').show().hideLoading();
				$('#tab1').addClass('active');
				$('#tab2').removeClass('active');
				$('#tab3').removeClass('active');
				loadProducts(response);
			}
		});
	}
}

/**
 * list Featured Products
 */
function listFeaturedProducts() {
	var dataToSend = "format=json";
	if($("#selectCategoriesCombo").val() && $("#selectCategoriesCombo").val() != ""){
		dataToSend += "&categoryId=" + $("#selectCategoriesCombo").val();
	}
	if($("#searchTextInput").val() && $("#searchTextInput").val() != ""){
		dataToSend += "&productName=" + $("#searchTextInput").val();
	}
	
	$('#content').showLoading();
	$.ajax({
		url : listFeaturedProductsUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$('#content').show().hideLoading();
			$('#tab1').removeClass('active');
			$('#tab2').addClass('active');
			$('#tab3').removeClass('active');
			loadProducts(response);
		}
	});
}

/**
 * list Latest Products
 * @param maxCount		number of products to be returned
 * @param sinceDate
 */
function listLatestProducts(maxCount, sinceDate) {
	var dataToSend = "format=json";
	dataToSend += "&maxCount="+maxCount;
	if (sinceDate) {
		dataToSend += "&sinceDate="+sinceDate;
	}
	if($("#selectCategoriesCombo").val() && $("#selectCategoriesCombo").val() != ""){
		dataToSend += "&categoryId=" + $("#selectCategoriesCombo").val();
	}
	if($("#searchTextInput").val() && $("#searchTextInput").val() != ""){
		dataToSend += "&productName=" + $("#searchTextInput").val();
	}
	
	$('#content').showLoading();
	$.ajax({
		url : listLatestProductsUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$('#content').show().hideLoading();
			$('#tab1').removeClass('active');
			$('#tab2').removeClass('active');
			$('#tab3').addClass('active');
			loadProducts(response);
		}
	});
}

/**
* Search
* @param idCategory
* @param fullSearch
*/
function searchProducts() {
	var dataToSend = "format=json";
	
	if($("#searchTextInput").val() && $("#searchTextInput").val() != "") {
		dataToSend += "&productName=" + $("#searchTextInput").val();
	}
	if ($("#selectCategoriesCombo").val() && $("#selectCategoriesCombo").val() != "") {
		dataToSend += "&categoryId=" + $("#selectCategoriesCombo").val();
	}
	
	$('#content').showLoading();
	$.ajax({
		url : searchProductsUrl + '?' + dataToSend,
		type : "GET",
		data : '',
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$('#content').show().hideLoading();
			$('#tab1').addClass('active');
			$('#tab2').removeClass('active');
			$('#tab3').removeClass('active');
			loadProducts(response);
		}
	});
}

/**
* Filter products by name and/or category
* @param name
*/
function filterProducts() {
	var tab = $('.tabsPanel_head div.tab.active').attr('id');
	switch(tab){
	case 'tab1':
		listAllProducts("alpha","desc");
		break;
	case 'tab2':
		listFeaturedProducts();
		break;
	case 'tab3':
		listLatestProducts('3');
		break
	default:
		break;
	}
}

/**
 * list Products having a specific Category
 * @param categoryId
 * @param sortOrder			alpha, price , date
 * @param sortDirection		asc, desc
 */
function listProductsByCategory(categoryId, sortOrder, sortDirection) {
	var dataToSend = "format=json";
	dataToSend += "&categoryId="+categoryId;
	dataToSend += "&sortOrder="+sortOrder;
	dataToSend += "&sortDirection="+sortDirection;
	
	$('#content').showLoading();
	$.ajax({
		url : listProductsByCategoryUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$('#content').show().hideLoading();
			$('#tab1').addClass('active');
			$('#tab2').removeClass('active');
			$('#tab3').removeClass('active');
			loadProducts(response);
		}
	});
}

/**
 * list the products
 * @param response
 */
function loadProducts(response) {
	
	$('#content .tabsPanel .tabsPanel_body').empty();
	$.each(response.liste, function() {
		$('#content .tabsPanel .tabsPanel_body').append(
			  '<div class="pic" align="left"><a href="'+(this.picture?this.picture.url:noImage)+'" class="screenshot" title="'+(this.picture?this.picture.name:"no image")+'"><img src="'+(this.picture?this.picture.url:noImage)+'"></a></div>'
			+ '<div style="margin-left: 150px">'
			+ '<h2><a href="javascript:void(0)" onclick="goToProductPage('+this.id+')"><span>'+this.name+'</span></a></h2>'
			+ '<p><h4>'+(this.descriptionAsText?this.descriptionAsText:"")+'</h4></p>'
			+ '<p><div class="fb-like" data-href="http://www.codechic.org:9999/iper2010/event/getEvent?event.idEvent='+this.id+'" data-send="false" data-width=600" data-show-faces="false" data-action="recommend"></div></p>'
			+ '</div>'
			+ '<hr/>'
		);
	});
	
	$('#bottom').empty().html(
		  '<div id="page_navigation_parent" class="padding">'
		+ '<div id="page_navigation"></div>'
		+ '</div>'
	);
	
	if(response.liste.length > 0) {
		var tab = $('.tabsPanel_head div.tab.active').attr('id');
		if (tab == "tab1") {
			//Setup Pagination
			initPagination(
				response.totalCount,
				response.maxItemsPerPage,
				response.pageOffset + 1,
				response.pageCount,
				response.hasNext,
				response.hasPrevious,
				response.pageSize
			);
		}
	}
	
	// Configure fancybox plugin
	$("a.screenshot").fancybox({
		'transitionIn'	:	'fade',
		'transitionOut'	:	'fade',
		'speedIn'		:	500, 
		'speedOut'		:	500, 
		'type'			:	'image',
		'overlayShow'	:	false
	});
	
	// initialize the FB JavaScript SDK
	if(!fbApiInit) {
		FBInit();
		fbApiInit = true;
	}
}

function initPagination(totalCount, maxItemsPerPage, pageOffset, pageCount, hasNext, hasPrevious, pageSize) {
	$("#page_navigation").paginate({
		count: pageCount,						//The total number of pages
		start: pageOffset,						//With which number the visible pages should start
		display: 24,							//How many page numbers should be visible
		border: true,							//If there should be a border (true/false)
		border_color: '#A6C9E2',				//Color of the border
		text_color: '#075899',					//Color of the text/numbers
		background_color: '#FFFFFF',			//Background color
		border_hover_color: '#A6C9E2',			//Border color when hovering
		text_hover_color: '#FFFFFF',			//Text color when hovering
		background_hover_color: '#6D84B4',		//Background color when hovering
		rotate: true,							//If the arrows should be visible or not (true/false)
		images: true,							//If the arrows should be images or not (true/false)
		mouse: 'press',							//With value “press” the user can keep the mouse button pressed and the page numbers will keep on sliding.
												//With value “slide” the page numbers will slide once with each click.
		onChange: function(page) {
			listAllProducts("alpha","desc",page-1);
		}
	});
	
	var margin = ($('#page_navigation').parent().width() / 2) - (($('.jPag-control-back').width() + $('.jPag-control-center').width() + $('.jPag-control-front').width() + 8) / 2);
	$('#page_navigation_parent').css('margin-left', margin);
}
