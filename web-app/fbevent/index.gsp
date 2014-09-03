<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title><g:message code="customer.event.events.label" /></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<g:javascript library="jquery" />
<jqui:resources themeCss="${resource(dir:'css/jquery-ui/themes/facebookApps-theme',file:'jquery-ui-1.8.17.custom.css')}" />

<!-- #include JS -->
<p:javascript src="fbevent/utils" />
<p:javascript src="fbevent/index" />

<!-- #include CSS -->
<p:css name="fbevent/facebook.styles" />
<p:css name="fbevent/fbevent.styles" />

<!-- show Loading -->
<p:css name="showLoading/showLoading" />
<p:javascript src="showLoading/showLoading" />

<!-- Pagination -->
<p:css name='jQueryPaginate/jquery.paginate' />
<p:javascript src='jQueryPaginate/jquery.paginate' />

<!-- chosen select combo -->
<p:css name="chosen/chosen" />
<p:javascript src="chosen/chosen.jquery" />

<!-- A library that provides lightbox functionality for screenshots -->
<p:css name='fancybox/jquery.fancybox-1.3.4' />
<p:javascript src="fancybox/jquery.fancybox-1.3.4" />

<!-- A library that provides scrolling functions for screenshots -->
<p:javascript src="jQueryTools/jquery.tools.min" />

<script type="text/javascript" charset="utf-8">
	var registrationCompleteUrl = "${createLink(controller: 'fbevent', action:'registrationComplete')}";
	var registerUrl = "${createLink(controller: 'fbevent', action:'register')}";
	if(${request.getParameter('page') == 'paiementOK'})
		window.location.href = registrationCompleteUrl;
	if(${request.getParameter('page') == 'paiementNotOK'})
		window.location.href = registerUrl+'?error=Paiement not ok';
	var baseURL ="/iper2010/"
	
	//------------------------- Resources Urls -------------------------//
	var noImage = "${resource(dir:'images',file:'No_Image_Available.jpg')}";
	
	//------------------------- Controller Urls -------------------------//
	var displayLogoUrl = "${createLink(controller: 'store', action:'displayLogo')}";
	var searchProductsUrl = "${createLink(controller: 'fbevent', action:'searchProducts')}";
	var listAllCategoriesUrl = "${createLink(controller: 'fbevent', action:'listAllCategories')}";
	var listActiveCategoriesUrl = "${createLink(controller: 'fbevent', action:'listActiveCategories')}";
	var listFeaturedProductsUrl = "${createLink(controller: 'fbevent', action:'listFeaturedProducts')}";
	var listLatestProductsUrl = "${createLink(controller: 'fbevent', action:'listLatestProducts')}";
	var listAllProductsUrl = "${createLink(controller: 'fbevent', action:'listAllProducts')}";
	var listProductsByCategoryUrl = "${createLink(controller: 'fbevent', action:'listProductsByCategory')}";
	
	//------------------------- messages.properties -------------------------//
	var allCategoriesLabel = "${message(code:'customer.event.allCategories.label')}";
	
</script>

</head>
<body>
	<!-- Facebook -->
	<div id="fb-root"></div>
	<script>
	// Load the SDK Asynchronously
	(function(d){
		var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "//connect.facebook.net/en_US/all.js";
		d.getElementsByTagName('head')[0].appendChild(js);
	}(document));
	</script>
	
	<div id="header">
		<a href="index" class="logo"></a>
		<div class="clear"></div>
	</div>
	<!---------------------------------------------------------------------------------------------------->
	
	<div id="page">
		<div id="top">
			<div id="searchForm">
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td style="padding-right:5px;"><input id="searchTextInput" type="text" name="event.fullSearch" class="inputtext" placeholder="<g:message code="customer.event.searchInput.label" />" /></td>
						<td style="padding-right:5px;"><select id="selectCategoriesCombo" name="selectCategoriesCombo"></select></td>
						<td style="padding-right:5px;"><label class="uiButton uiButtonConfirm uiButtonMedium"><input type="submit" id="searchButton" value="<g:message code="customer.event.search.label" />" style="width:55px;"></input></label></td>
					</tr>
				</table>
			</div>
		</div>
		
		<div id="content" style="display: none;">
			<div class="tabsPanel">
				<div class="tabsPanel_head">
					<div class="row">
						<div id="tab1" class="tab"><a href="javascript:void(0)" onclick="javascript:listAllProducts('alpha','desc')"><g:message code="customer.event.popular.label" /></a></div>
						<div style="width:5px;"></div>
						<div id="tab2" class="tab"><a href="javascript:void(0)" onclick="javascript:listFeaturedProducts()"><g:message code="customer.event.featured.label" /></a></div>
						<div style="width:5px;"></div>
						<div id="tab3" class="tab"><a href="javascript:void(0)" onclick="javascript:listLatestProducts('3')"><g:message code="customer.event.latest.label" /></a></div>
						<div style="width:5px;"></div>
					</div>
				</div>
				<div class="tabsPanel_body"></div>
			</div>
		</div>
		
		<div id="bottom">
			<!-- Pagination -->
			<div id="page_navigation_parent" class="padding">
				<div id="page_navigation"></div>
			</div>
		</div>
	</div>
	
	<!---------------------------------------------------------------------------------------------------->
	<div id="footer">
		<p><g:message code="customer.event.copyright.label" /></p>
		<div class="clear"></div>
	</div>
</body>
</html>