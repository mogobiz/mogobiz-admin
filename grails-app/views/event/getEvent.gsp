<%@ page contentType="text/html;charset=UTF-8"%>
<html>
<head>
	<r:require modules="getEvent"/>
	<title>${eventVO.eventName}</title>
    <meta name="layout" content="empty" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
	
	<r:script>console.log("${eventVO}")
		// Variable Declaration
		ticketsIdsArray = [];
		ticketsMaxOrders = [];
		ticketsMinOrders = [];
		//------------------------- Controller Urls -------------------------//
		var eventStartDate = "${eventVO?.startDate}";
		var eventMapProvider = "${eventVO?.mapProvider}";
		var registerUrl = "${createLink(controller: 'event', action:'register')}";
		var getProductDatesUrl = "${createLink(controller: 'event', action:'getProductDates')}";
		var getProductTimesUrl = "${createLink(controller: 'event', action:'getProductTimes')}";
		var getStockInfoUrl = "${createLink(controller: 'event', action:'getStockInfo')}";
		var paymentTypesUrl = "${createLink(controller: 'event', action:'getPaymentTypes')}";
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
		var selectTimeLabel = "${message(code:'customer.event.selectTime.label')}";
		var notAvailableOnThisDateLabel = "${message(code:'customer.event.notAvailableOnThisDate.label')}";
		
	</r:script>
</head>
<body>
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
	<script src="/iper2010/js/googleMap/eventsGoogleMap.js"></script>
	<!-- Facebook -->
	<div id="fb-root"></div>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>
	
	<!-- header -->
	<g:render template="header" />
	
	<!---------------------------------------------------------------------------------------------------->
	
	<div id="page">
		<!-- The div "top" add the rounded corner look to the theme and contain no content. -->
		<div class="top"></div>
		
		<div class="content">
			
			<div class="header page">
				<div class="fancy-date">
					<span class="month"></span>
					<span class="white-shadow day"></span>
				</div>
				<h1>${eventVO.eventName}</h1>
				<g:hiddenField name="idEvent" id="idEvent" value="${eventVO.idEvent}"></g:hiddenField>
				<g:hiddenField name="calendarType" id="calendarType" value="${eventVO.calendarType}"></g:hiddenField>
			</div>
			
			<div id="event" class="padding">
			
				<div class="section_title">
					<h3><g:message code="customer.event.ticketInformation.label" /></h3>
				</div>
				
				<div id="ticketInformation">
					<table border="0">
					  <tr>
					    <td><b><g:message code="customer.event.start.label" />:&nbsp;&nbsp;</b></td>
					    <td><g:javascript>document.write(getDate("${eventVO.startDate}"));</g:javascript></td>
					  </tr>
					  <tr>
					    <td><b><g:message code="customer.event.end.label" />:&nbsp;&nbsp;</b></td>
					    <td><g:javascript>document.write(getDate("${eventVO.stopDate}"));</g:javascript></td>
					  </tr>
					  <g:if test="${eventVO.location != null}">
					  <tr>
					    <td><b><g:message code="customer.event.where.label" />:&nbsp;&nbsp;</b></td>
					    <td>${eventVO.location}</td>
					  </tr>
					  </g:if>
					</table>

					<br style="clear: both;"/>
					
					<!-- ERROR MESSAGE -->
					<div id="errorMessage" class="ui-widget" style="display: none;">
						<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"> 
							<p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>
							<strong><g:message code="customer.event.error.label" />:</strong>&nbsp;&nbsp;&nbsp;<span class="message"></span></p>
						</div>
						<br style="clear: both;"/>
					</div>
					<!-- END ERROR MESSAGE -->
					
					<g:if test="${eventVO?.ticketTypes}">
					<!-- event date time -->
					<div id="event-date-time" style="float:right">
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
					
					<br style="clear: both;"/><br style="clear: both;"/>
					
					<!-- Start Tickets Table -->			
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
							<tbody>
							<g:set var="colorFlag" value="${false}" />
							<g:each in="${eventVO?.ticketTypes}">
								<g:if test="${colorFlag}"><tr class="color"></g:if>
								<g:else><tr></g:else>
									<td class="hidden"><input type="hidden" value="${it.idTicketType}"></input></td>
									<td class="td-left">${it.ticketType}</td>
									<td>${it.salesEnd}</td>
									<td>${it.price}</td>
									<td class="last spinner" align="center">
										<button id="dn_${it.idTicketType}">&ndash;</button>
										<input type="text" class="spin-list" id="quantitySpin_${it.idTicketType}" value="0" disabled="disabled" />
										<button id="up_${it.idTicketType}">+</button>
									</td>
								</tr>
								<g:javascript>
									ticketsIdsArray.push(${it.idTicketType});
									ticketsMaxOrders.push(${it.maxOrder});
									ticketsMinOrders.push(${it.minOrder});
								</g:javascript>
								<g:set var="colorFlag" value="${!colorFlag}" />
							</g:each>
							</tbody>
						</table>
					</div>
					</g:if>
					<!-- End Tickets Table -->
					
					<g:if test="${eventVO?.ticketTypes}">
						<a href="javascript:;" class="button" id="register" style="float: right; right: 70px;"><span><g:message code="customer.event.register.label" /></span></a>
					</g:if>
					<div class="clear"></div>
				</div>
				
				<g:form name="ticketForm" controller="event" action="register" method="get">
					<g:hiddenField id="ticketInformationInput" name="ticketInformation" value=""/>
				</g:form>
				
				<!---------------------------------------------------------------------------------------------------->
				
				<g:if test="${eventVO?.pictures}">
				<div class="section_title">
					<h3><g:message code="customer.event.pictures.label" /></h3>
				</div>
				
				<div id="screenshots">
					<a href="javascript:;" class="controls prev"><g:message code="customer.event.previous.label" /></a>
				
					<div class="scrollable">
						<div class="items">
							<g:set var="new_group" value="${true}" />
							<g:set var="count" value="${0}" />
							<g:each in="${eventVO?.pictures}">
								<g:if test="${new_group}">
									<g:set var="new_group" value="${false}" />
									<ul>	
								</g:if>
								<li><a href="${it?.url}" class="screenshot" rel="group"><img src="${it?.url}" alt="" /></a></li>
								<g:set var="count" value="${count + 1}" />
								<g:if test="${count >= 5}">
									<g:set var="new_group" value="${true}" />
									<g:set var="count" value="${0}" />
									</ul>	
								</g:if>
							</g:each>
						</div>
					</div>
				
					<a href="javascript:;" class="controls next"><g:message code="customer.event.next.label" /></a>
					<div class="clear"></div>
				</div>
				</g:if>
				<!---------------------------------------------------------------------------------------------------->
				
				<div class="section_title">
					<h3><g:message code="customer.event.eventDetails.label" /></h3>
				</div>
				
				<div id="eventDetails">
					<div class="panel">
						<div class="panel_head"><h4><g:message code="customer.event.host.label" />&nbsp;${eventVO.host}</h4></div>
						<div class="panel_body">
							<p>${eventVO.description}</p>
						</div>
					</div>
					<div class="clear"></div>
				</div>
				
				<!---------------------------------------------------------------------------------------------------->
				
				<div class="section_title">
					<h3><g:message code="customer.event.location.label" /></h3>
				</div>
				
				<!--- MAPS --->
				
				<div id="eventLocation">
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
				<div class="section_title">
					<h3><g:message code="customer.event.comments.label" /></h3>
				</div>
				
				<!-- Facebook Comments -->
				<div id="facebookComments">
					<div class="fb-comments" data-href="http://www.codechic.org:9999/iper2010/event/getEvent?event.idEvent=${eventVO.idEvent}" data-num-posts="5" data-width="890"></div>
				</div>
				<div class="clear"></div>
				<!-- End Facebook Comments -->
			</div>
			
		</div>
		
		<!-- The div "bottom" add the rounded corner look to the theme and contain no content. -->
		<div class="bottom"></div>
	</div>
	
	<!---------------------------------------------------------------------------------------------------->
	
	<!-- footer -->
	<g:render template="footer" />
	
</body>
</html>