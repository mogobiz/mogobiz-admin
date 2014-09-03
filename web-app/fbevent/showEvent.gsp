<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title><g:message code="customer.event.events.label" /></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<g:javascript library="jquery" />
<jqui:resources themeCss="${resource(dir:'css/jquery-ui/themes/facebookApps-theme',file:'jquery-ui-1.8.17.custom.css')}" />

<!-- #include JS -->
<p:javascript src="fbevent/utils" />
<p:javascript src="fbevent/showEvent" />

<!-- #include CSS -->
<p:css name="fbevent/facebook.styles" />
<p:css name="fbevent/fbevent.styles" />

<!-- show Loading -->
<p:css name="showLoading/showLoading" />
<p:javascript src="showLoading/showLoading" />

<!-- chosen select combo -->
<p:css name="chosen/chosen" />
<p:javascript src="chosen/chosen.jquery" />

<!-- A library that provides lightbox functionality for screenshots -->
<p:css name='fancybox/jquery.fancybox-1.3.4' />
<p:javascript src="fancybox/jquery.fancybox-1.3.4" />

<!-- A library that provides scrolling functions for screenshots -->
<p:javascript src="jQueryTools/jquery.tools.min" />

<!-- A library that provides spinner input -->
<p:css name='SpinnerControl/SpinnerControl' />
<p:javascript src="SpinnerControl/jquery.SpinnerControl" />

<!-- Add OpenStreetMap Scripts -->
<script src="http://www.openlayers.org/api/OpenLayers.js"></script>
<p:javascript src="openStreetMap/openStreetMapView" />
<p:javascript src="openStreetMap/openStreetMapContextMenu" />
<p:css name="openStreetMap/openStreetMap" />
<p:css name="openStreetMap/openStreetMapContextMenu" />

<!-- Fancy Date -->
<p:css name='fbevent/fancydate' />

<script type="text/javascript" charset="utf-8">
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
	var getProductUrl = "${createLink(controller: 'fbevent', action:'getProduct')}";
	var getProductDatesUrl = "${createLink(controller: 'fbevent', action:'getProductDates')}";
	var getProductTimesUrl = "${createLink(controller: 'fbevent', action:'getProductTimes')}";
	var getStockInfoUrl = "${createLink(controller: 'fbevent', action:'getStockInfo')}";

	var addTicketToCartUrl = "${createLink(controller: 'cart', action:'addTicketToCart')}";
	var listAllCartUrl = "${createLink(controller: 'cart', action:'listAllCart')}";
	var clearCartUrl = "${createLink(controller: 'cart', action:'clearCart')}";
	// POI
	var showPoiUrl = "${createLink(controller: 'poi', action:'show')}";
	
	//------------------------- messages.properties -------------------------//
	var chooseTicketError_label = "${message(code:'customer.event.error.chooseTicket.label')}";
	var chooseDateError_label = "${message(code:'customer.event.error.chooseDate.label')}";
	var chooseTimeError_label = "${message(code:'customer.event.error.chooseTime.label')}";
	var maxTicketsMessageError_label = "${message(code:'customer.event.error.maxTicketsMessage.label')}";
	var addressNotFound_label = "${message(code:'poi.addressNotFound.label')}";
	var contextMenu_create_label = "${message(code:'poi.contextMenu.create.label')}";
	var contextMenu_zoomIn_label = "${message(code:'poi.contextMenu.zoomIn.label')}";
	var contextMenu_zoomOut_label = "${message(code:'poi.contextMenu.zoomOut.label')}";
	var contextMenu_center_label = "${message(code:'poi.contextMenu.center.label')}";
	var poiCreate_label = "${message(code:'poi.create.label')}";
	var poiEdit_label = "${message(code:'poi.edit.label')}";
	var poiSelectIcon_label = "${message(code:'poi.selectIcon.label')}";
	var allCategoriesLabel = "${message(code:'customer.event.allCategories.label')}";
	var selectTimeLabel = "${message(code:'customer.event.selectTime.label')}";
	var notAvailableOnThisDateLabel = "${message(code:'customer.event.notAvailableOnThisDate.label')}";
	
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
			<div id="breadCrumb">
				<ul><li><a href="javascript:void(0)" onclick="goHome();"><img title="Home" alt="Home" src="${resource(dir:'images/fbevent_images',file:'home.png')}"></img></a></li></ul>
			</div>
		</div>
		
		<div id="content" style="display: none;">
			<div class="panel">
				<div class="panel_head">
					<div class="fancy-date">
						<span class="month"></span>
						<span class="white-shadow day"></span>
					</div>
					<div class="title" id="eventTitle"></div>
					<input type="hidden" name="idEvent" id="idEvent" value=""></input>
					<input type="hidden" name="calendarType" id="calendarType" value=""></input>
				</div>
				<div class="panel_body">
					<!---------------------------------------------------------------------------------------------------->
					<div class="section_title"><g:message code="customer.event.ticketInformation.label" /></div>
					<div class="section" id="ticketInformation">
						<table border="0">
						  <tr id="eventStartDateLine">
						    <td><b><g:message code="customer.event.start.label" />:&nbsp;&nbsp;</b></td>
						    <td id="eventStartDate"></td>
						  </tr>
						  <tr id="eventEndDateLine">
						    <td><b><g:message code="customer.event.end.label" />:&nbsp;&nbsp;</b></td>
						    <td id="eventEndDate"></td>
						  </tr>
						  <tr id="eventLocationLine">
						    <td><b><g:message code="customer.event.where.label" />:&nbsp;&nbsp;</b></td>
						    <td id="eventLocation"></td>
						  </tr>
						</table>

						<br style="clear: both;"/>
						
						<!-- event date time -->
						<div id="event-date-time">
							<div id="date_div">
								<b><g:message code="customer.event.date.label" />:&nbsp;&nbsp;</b><input type="text" id="event_date" />
							</div>
							<div id="time_div">
								<b><g:message code="customer.event.time.label" />:&nbsp;&nbsp;</b>
								<select id="event_time" disabled="disabled">
									<option value=""><g:message code="customer.event.selectTime.label" /></option>
								</select>
							</div>
						</div>
						
						<br style="clear: both;"></br>
						
						<!-- Start Tickets Table -->
						<div id="errorMessage" class="ui-widget" style="display: none;">
							<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"> 
								<p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>
								<strong><g:message code="customer.event.error.label" />:</strong>&nbsp;&nbsp;&nbsp;<span class="message"></span></p>
							</div>
							<br style="clear: both;"/>
						</div>
						
						<div id="tickets_table">
						<table cellpadding="0" cellspacing="0">
							<thead>
								<tr>
									<td class="hidden"></td>
									<td><h2><g:message code="customer.event.ticketType.label" /></h2></td>
									<td><h2><g:message code="customer.event.salesEnd.label" /></h2></td>
									<td><h2><g:message code="customer.event.price.label" /></h2></td>
									<td class="last"><h2><g:message code="customer.event.quantity.label" /></h2></td>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
						</div>
						<!-- End Tickets Table -->
						
						<label style="float:right; position: relative; right: 39px;" class="uiButton uiButtonConfirm uiButtonMedium"><input type="submit" id="registerButton" value="<g:message code="customer.event.register.label" />" style="width:95px;"></input></label>
						
						<div class="clear"></div>
					</div>
					
					<!---------------------------------------------------------------------------------------------------->
					
					<div id="eventPictures">
					<div class="section_title"><g:message code="customer.event.pictures.label" /></div>
					<div class="section" id="screenshots">
						<a href="javascript:;" class="controls prev"><g:message code="customer.event.previous.label" /></a>
						<div class="scrollable"><div class="items"></div></div>
						<a href="javascript:;" class="controls next"><g:message code="customer.event.next.label" /></a>
					</div>
					</div>
					
					<!---------------------------------------------------------------------------------------------------->
					
					<div id="eventDetailsDiv">
						<div class="section_title"><g:message code="customer.event.eventDetails.label" /></div>
						<div class="section" id="eventDetails"></div>
					</div>
					
					<!---------------------------------------------------------------------------------------------------->
					
					<div class="section_title"><g:message code="customer.event.location.label" /></div>
					<div class="section" id="eventLocation">
						<div id="mapDiv"></div>
						<div id="poiInfoWindow" style="display:none;">
							<div id="showPoiInfoDiv" style="padding: 5px; width:200px;">
								<div>
									<span id="poiName_info"><b><g:message code="customer.event.poi.name.label" />:&nbsp;</b><span id="poiNameLabel"></span><br/></span>
									<span id="poiCountry_info"><b><g:message code="customer.event.poi.country.label" />:&nbsp;</b><span id="poiCountryLabel"></span><br/></span>
									<span id="poiCity_info"><b><g:message code="customer.event.poi.city.label" />:&nbsp;</b><span id="poiCityLabel"></span><br/></span>
									<span id="poiRoad_info"><b><g:message code="customer.event.poi.street.label" />:&nbsp;</b><span id="poiRoadLabel"></span><br/></span>
									<span id="poiPostalCode_info"><b><g:message code="customer.event.poi.postalcode.label" />:&nbsp;</b><span id="poiPostalCodeLabel"></span><br/></span>
									<span id="poiDesc_info"><b><g:message code="customer.event.poi.description.label" />:&nbsp;</b><span id="poiDescLabel"></span><br/></span>
								</div>
							</div>
						</div>
						<div class="clear"></div>
					</div>
					
					<!---------------------------------------------------------------------------------------------------->
					
					<div class="section_title"><g:message code="customer.event.comments.label" /></div>
					<div class="section" id="facebookComments">
						<div class="fb-comments" data-href="" data-num-posts="5" data-width="720"></div>
					</div>
				</div>
			</div>
		</div>
		
		<div id="bottom"></div>
	</div>
	
	<!---------------------------------------------------------------------------------------------------->
	<div id="footer">
		<p><g:message code="customer.event.copyright.label" /></p>
		<div class="clear"></div>
	</div>
</body>
</html>