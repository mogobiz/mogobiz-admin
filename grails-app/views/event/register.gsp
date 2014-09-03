<%@ page contentType="text/html;charset=UTF-8"%>
<html>
<head>  
	<title><g:message code="customer.event.register.label" /></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
	<g:javascript library="jquery" />
	<jqui:resources themeCss="${resource(dir:'css/jquery-ui/themes/facebookApps-theme',file:'jquery-ui-1.8.17.custom.css')}" />

	<!-- #include theme files -->
	<p:css name='event/event.styles' />
	<p:css name='event/theme' />
	<p:javascript src="event/site" />
	
	<!-- Validation Plug-in -->
	<p:javascript src="jQueryValidation/jquery.validate" />
	<p:javascript src="jQueryValidation/additional-methods" />
	<p:javascript src="jQueryValidation/localization/messages_fr" />
	
	<!-- Page js -->
	<p:javascript src="event/register" />
	
	<script type="text/javascript" charset="utf-8">
		var countriesUrl = "${createLink(controller: 'country')}";
		var paymentTypesUrl = "${createLink(controller: 'event', action:'getPaymentTypes')}";
		var cardNumberLabel = "${message(code:'customer.event.cardNumber.label')}";
		var countryName ="${session.ipcountry?.name}";
		var countryCode ="${session.ipcountry?.code}";
		$(document).ready(function() {
			$("#register_form").validate();
		});
	</script>
</head>
<body>
	<!-- header -->
	<g:render template="header" />
	
	<!---------------------------------------------------------------------------------------------------->
	
	<div id="page">
		<!-- The div "top" add the rounded corner look to the theme and contain no content. -->
		<div class="top"></div>
		
		<div class="content">
			
			<div class="header page">
				<h1><g:message code="customer.event.completeOrder.label" /></h1>
			</div>
			
			<div id="register" class="padding">
				
				<div class="left">
					<!-- ERROR MESSAGE -->
					<g:if test="${result?.listeAvailability?.length > 0}">
					<div id="errorMessage" class="ui-widget" style="display: none;">
						<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"> 
							<p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>
							<strong><g:message code="customer.event.error.label" />:</strong>&nbsp;&nbsp;&nbsp;<span class="message">
								<br/>
								<g:each in="${result.listeAvailability}">
									<g:if test="${it.available}">
										-&nbsp;${message(code:'customer.event.error.quantityAvailableInStock')}.
										
									</g:if>
									<g:else>
										-&nbsp;${message(code:'customer.event.error.quantityNotAvailableInStock')}.
									</g:else>
									<br/>
								</g:each>
							</span></p>
						</div>
						<br style="clear: both;"/>
					</div>
					</g:if>
					<!-- END ERROR MESSAGE -->
				
					<g:form name="register_form" action="completeRegistration">
						<g:set var="nbTickets" value="${0}" />
						<div id="tickets">
							<g:each in="${session.renderedTickets?.liste}">
								<g:each var="i" in="${(0..<it.quantity)}">
								<div class="ticket_regInformation">
									<h2><span class="header_left">${it.ticketType}&nbsp;(${i+1})</span><span class="header_right">${it.price} &nbsp;&euro;</span></h2>
									<g:hiddenField id="idTicketType_${nbTickets}" name="idTicketType_${nbTickets}" value="${it.idTicketType}"></g:hiddenField>
									
									<p><label><g:message code="customer.event.firstName.label" /></label>
									<input type="text" id="f_name_${nbTickets}" name="f_name_${nbTickets}" class="f_name_input text_field required" style="width: 350px;" /></p>
									
									<p><label><g:message code="customer.event.lastName.label" /></label>
									<input type="text" id="l_name_${nbTickets}" name="l_name_${nbTickets}" class="l_name_input text_field required" style="width: 350px;" /></p>
									
									<p><label><g:message code="customer.event.emailAddress.label" /></label>
									<input type="text" id="email_${nbTickets}" name="email_${nbTickets}" class="email_input text_field required email" style="width: 350px;" /></p>
									<div class="clear margin"></div>
								</div>
								<g:set var="nbTickets" value="${nbTickets + 1}" />
								<g:if test="${nbTickets == 1}">
									<div style="margin-left: 115px; position: relative; top:-10px;">
										<a href="javascript:;" class="button" id="copyTicketInfo"><span><g:message code="customer.event.copyTicketInfo.label" /></span></a>
									</div>
									<br class="clear"></br>
								</g:if>
								</g:each>
							</g:each>
						</div>
						<g:hiddenField name="idEvent" value="${session.renderedTickets.idEvent}"></g:hiddenField>
						<g:hiddenField name="nbTickets" value="${nbTickets}"></g:hiddenField>
						
						<div class="clear"></div>
						<div class="send_form" style="float:right">
							<a href="javascript:;" class="button submit" id="completeRegistration"><span><g:message code="customer.event.completeRegistration.label" /></span></a>
						</div>					
					</g:form>
				</div>

				<div class="right">			
					<div class="sidebar_box">
						<h4><g:message code="customer.event.contact.label" /></h4>
						<p><g:message code="customer.event.haveQuestions.label" />&nbsp;<a href="contact"><g:message code="customer.event.contact.label" /></a>.</p>
					</div>
				</div>
				<div class="clear"></div>

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