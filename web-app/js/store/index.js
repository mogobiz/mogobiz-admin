$(document).ready(function () {
	$('#content').showLoading({'addClass': 'store-loading-96'});
	
	listCarouselImages(getHTTPParameter("store"));
	
	

	$("div#view_mode ul.clearfix  li").click(function(){
		$('li.s_selected').removeClass();
		$(this).attr('class', 's_selected')		
		hideAllPanels();
		var tab = $(this).attr('id');
		switch(tab)
		{
		case "view_Grid":
			listAllProducts("alpha", "desc");
			$('#listOfProductsInGrid').show();		
			break;
		case "view_List":	
			listAllProducts("alpha", "desc");	
			$('#listOfProducts').show();
			break;
		case "view_Featured":
			listFeaturedProducts(0);			
			
			break;
		case "view_Latest":
			listLatestProducts(0);
			
			break;
		default:
			break;
		}
	});
	
	/*$("div#categories ul li").click(function(){
		
	});*/
	
	$("#searchByText").click(function(){
		searchProducts($('#filter_keyword').val());
	});
	
	//search text input event listener
	$("#filter_keyword").keyup(function(e){
		if (e.which === 13) {
			if ($('#filter_keyword').val() == "") {
				listAllProducts("alpha","desc")
			}
			else {
				searchProducts($('#filter_keyword').val());
			}
		}
	});
	
   //listAllCategories(); 
   listAllCategories('listOfCategoriesOnLeftSide');
   var categoryIdReceived=getHTTPParameter("categoryId");
   var searchedText=getHTTPParameter("searchedText");
   
   if(categoryIdReceived==null){//default
	   listAllProducts("alpha","desc")
   }
   else if(searchedText.length>0){
	   $('#filter_keyword').val(searchedText)
	   searchProducts($('#filter_keyword').val());
   }
   else{
	   listProductsByCategoryCriteria = {};
	   listProductsByCategoryCriteria.id = getHTTPParameter("categoryId");
	   listProductsByCategoryCriteria.title = getHTTPParameter("categoryTitle");
	   listProductsByCategory();
   }
  
/*	$("#filter_category_id").change(function(){
		if($("#filter_category_id").val()!=-1)
			listProductsByCategoryCriteria = {id:'category'+$("#filter_category_id").val(),title:$("#filter_category_id option:selected").text()};
			listProductsByCategory();
	});*/
	
	// List Cart
	listAllCart(fillCartMenu);
});


function hideAllPanels(){
	$('#listOfProductsInGrid').hide();
	$('#listOfProducts').hide();
	$('#featured_home').hide();
	$('#latest_home').hide();
}

function listProductsByCategory(pageOffset) {
	$('#content').showLoading({'addClass': 'store-loading-96'});
	
	var categoryIdString = listProductsByCategoryCriteria.id;
	var categoryId = categoryIdString.substring(8,categoryIdString.length)

	$("#filter_category_id").val(categoryId);
	$('#selectedCategoryName2').html(listProductsByCategoryCriteria.title);
	var sortOrder="alpha";
	var sortDirection="desc";
	var dataToSend = "categoryId="+categoryId;
	
	dataToSend += "&xtype=PRODUCT";
	dataToSend += "&sortOrder="+sortOrder;
	dataToSend += "&sortDirection="+sortDirection;
	if(pageOffset) {
		dataToSend += "&pageOffset="+pageOffset;
	}	
	callServer(listProductsByCategoryUrl, dataToSend, getListProductsByCategory, errorCallingServer);
}

function getListProductsByCategory(response){
/*	loadEventsInList(response,'listOfProducts');
	loadProductsInGrid(response);*/
	loadEventsInListAndGrid(response,'listOfProducts');

	initPagination(
		response.totalCount,
		response.maxItemsPerPage,
		response.pageOffset + 1,
		response.pageCount,
		response.hasNext,
		response.hasPrevious,
		response.pageSize,
		1
	);
	$('#pageCount').html(response.pageCount>0?response.pageCount:1);	
	$('#pageOffset').html(parseFloat(response.pageOffset + 1));	
}

function listAllProducts(sortOrder, sortDirection, pageOffset) {
	$('#content').showLoading({'addClass': 'store-loading-96'});
	
	var dataToSend = "sortOrder="+sortOrder;
	dataToSend += "&xtype=PRODUCT";
	dataToSend += "&sortDirection="+sortDirection;
	if(pageOffset) {
		dataToSend += "&pageOffset="+pageOffset;
	}
	
	callServer(listAllProductsUrl, dataToSend, getListAllProducts, errorCallingServer,1);
}

function getListAllProducts(response){
/*	loadEventsInList(response,'listOfProducts');
	loadProductsInGrid(response);*/
	loadEventsInListAndGrid(response,'listOfProducts');

	initPagination(
			response.totalCount,
			response.maxItemsPerPage,
			response.pageOffset + 1,
			response.pageCount,
			response.hasNext,
			response.hasPrevious,
			response.pageSize,
			0
		);
	$('#pageCount').html(response.pageCount>0?response.pageCount:1);		
	$('#pageOffset').html(parseFloat(response.pageOffset + 1));	
}

function loadProductsInGrid(response){
	$('#listOfProductsInGrid').empty();
	var counter=0;
	$.each(response.liste, function() {
		if(this.xtype && this.xtype.name=="PRODUCT"){
			counter++;
			var picture='../images/No_Image_Available.jpg';//should add no image available
			if(this.picture)
				picture=this.picture.url;
			$('#listOfProductsInGrid').append('<div class="s_item grid_3">'+
					'<a class="s_thumb" ><img style="width:140px;height:140px" src="'+picture+'" '+
						'title="'+this.name+'" alt="'+this.name+'" /></a>'+
					'<h3><a href="javascript:void(0)"  onclick="goToProductPage('+this.id+')">'+this.name+'</a></h3>'+
					'<p class="s_model">'+this.code+'</p>'+
					'<p class="s_price"><span class="s_currency s_before">&euro;</span>'+this.montant+'</p>'+
					'<p class="s_rating s_rating_5"><span style="width: 60%;" class="s_percent"></span></p>'+
					'<a class="s_button_add_to_cart" href="javascript:void(0)"  onclick="goToProductPage('+this.id+')"><span class="s_icon_16"><span class="s_icon"></span>' + addToCart_label + '</span></a>'+
				'</div>');						
			if(counter%4==0){
				$('#listOfProductsInGrid').append('<div class="clear"></div>');
			}	
		}

	});
	
}

function loadEventsInList(response,idOfList){
	$('#'+idOfList).empty();
	$.each(response.liste, function() {
		if(this.xtype && this.xtype.name=="PRODUCT"){
			var picture='../images/No_Image_Available.jpg';//should add no image available
			if(this.picture)
				picture=this.picture.url;
			$('#'+idOfList).append('<div class="s_item clearfix">'+
			          '<div class="grid_3 alpha"> <a class="s_thumb"><img style="width:140px;height:140px" src="'+picture+'" title="'+this.name+'" alt="'+this.name+'" /></a> </div>'+
			          '<div class="grid_9 omega">'+
			          '<h3><a href="javascript:void(0)"  onclick="goToProductPage('+this.id+')">'+this.name+'</a></h3>'+
			          '  <p class="s_model">'+this.code+'</p>'+
			           ' <p class="s_price"><span class="s_currency s_before">&euro;</span>'+this.montant+'</p>'+
			           ' <p class="s_description">'+(this.description!=null?this.description:'')+'</p>'+
			            '<a class="s_button_add_to_cart"  href="javascript:void(0)"  onclick="goToProductPage('+this.id+')"><span class="s_icon_16"><span class="s_icon"></span>' + addToCart_label + '</span></a>'+
			          '</div>'+				       
			'</div>');
		
			$('#'+idOfList).append('<div class="clear"></div>');
		}
	});
	
}
function listFeaturedProducts(pageOffset){
	$('#featured_home').show();
	var dataToSend = "xtype=PRODUCT";
	if(pageOffset) {
		dataToSend += "&pageOffset="+pageOffset;
	}
	callServer(listFeaturedProductsUrl, dataToSend, getListFeaturedProducts, errorCallingServer);
}


function getListFeaturedProducts(response){
/*	loadEventsInList(response,'listFeatured');
	loadProductsInGrid(response);*/
	initPagination(
			response.totalCount,
			response.maxItemsPerPage,
			response.pageOffset + 1,
			response.pageCount,
			response.hasNext,
			response.hasPrevious,
			response.pageSize,
			3
		);
		
	$('#pageOffset').html(parseFloat(response.pageOffset + 1));	
	$('#pageCount').html(response.pageCount>0?response.pageCount:1);	
	loadEventsInListAndGrid(response,'listFeatured');
}

/**
 * list Latest Products
 * @param maxCount		number of products to be returned
 */
function listLatestProducts(pageOffset) {
	$('#latest_home').show();
	var dataToSend = "maxCount=4";
	dataToSend += "&xtype=PRODUCT";
	if(pageOffset) {
		dataToSend += "&pageOffset="+pageOffset;
	}
	
	callServer(listLatestProductsUrl, dataToSend, getListLatestProducts, errorCallingServer);
}

function getListLatestProducts(response){
/*	loadEventsInList(response,'listLatest');
	loadProductsInGrid(response);*/
	initPagination(
			response.totalCount,
			response.maxItemsPerPage,
			response.pageOffset + 1,
			response.pageCount,
			response.hasNext,
			response.hasPrevious,
			response.pageSize,
			2
		);
	$('#pageCount').html(response.pageCount>0?response.pageCount:1);		
	$('#pageOffset').html(parseFloat(response.pageOffset + 1));	
	loadEventsInListAndGrid(response,'listLatest')
}

function searchProducts(productName) {
	$('#content').showLoading({'addClass': 'store-loading-96'});
	var dataToSend = "productName="+productName;
	dataToSend += "&xtype=PRODUCT";
	callServer(searchProductsUrl, dataToSend, getSearchedProducts, errorCallingServer);
}

function getSearchedProducts(response){
	loadEventsInListAndGrid(response,'listOfProducts');
}

function loadEventsInListAndGrid(response,divId){
	loadEventsInList(response,divId);
	loadProductsInGrid(response);
	$('#content').hideLoading();
}

function initPagination(totalCount, maxItemsPerPage, pageOffset, pageCount, hasNext, hasPrevious, pageSize, listingServicesPaging) {
	$("#page_navigation").empty();
	$("#page_navigation").paginate({
		count: (pageCount == 0) ? 1 : pageCount,						//The total number of pages
		start: pageOffset,						//With which number the visible pages should start
		display: 24,							//How many page numbers should be visible
		border: true,							//If there should be a border (true/false)
		border_color: '#FFFFFF',				//Color of the border
		text_color: '#FFFFFF',					//Color of the text/numbers
		background_color: '#FF7700',			//Background color
		
		
		border_hover_color: '#FF7700',			//Border color when hovering
		text_hover_color: '#FFFFFF',			//Text color when hovering
		background_hover_color: '#C0E388',		//Background color when hovering
		rotate: true,							//If the arrows should be visible or not (true/false)
		images: true,							//If the arrows should be images or not (true/false)
		mouse: 'press',							//With value �press� the user can keep the mouse button pressed and the page numbers will keep on sliding.
												//With value �slide� the page numbers will slide once with each click.
		onChange: function(page) {
			if(listingServicesPaging==0)
				listAllProducts("alpha", "desc", page - 1);
			else if(listingServicesPaging==1)
				listProductsByCategory(page - 1);

			else if(listingServicesPaging==2)
				listLatestProducts(page - 1)
			else	
				listFeaturedProducts(page - 1)
		}
	});
	
	var margin = ($('#page_navigation').parent().width() / 2) - (($('.jPag-control-back').width() + $('.jPag-control-center').width() + $('.jPag-control-front').width() + 8) / 2);
	$('#page_navigation_parent').css('margin-left', margin);
}

function listCarouselImages(companyCode) {
	var dataToSend = "store="+companyCode;
	//dataToSend += "&format=json";
	callServer(listCarouselImagesUrl, dataToSend, getListCarouselImages, errorCallingServer);
}

function getListCarouselImages(response){
	if (response) {
		$("#image_intro #image_intro_preview div.slides_container").empty();
		$.each(response.filenames,function(i, filename){
			$("#image_intro #image_intro_preview div.slides_container").append('<div class="slideItem" style="display: none">'
			+'<a href="#"><img title="'+filename+'" src="'+displayCarouselUrl+'?store='+getHTTPParameter("store")+'&filename='+filename+'&format=json" width="920" height="320" alt="" /></a>'
			+'</div>');
		});
		
		// The Carousel needs at least 2 images to work
		if (response.filenames.length > 1) {
			initShoppicaImagesSlide();
		}
		else {
			$('div.slideItem').fadeIn(800);
		}
	}
}
