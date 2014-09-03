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
	<p:javascript src="event/displayPayment" />
	
	<g:if test="${erreur}">
		<script type="text/javascript">
			var totalPrice = null;
			var bookTime = null;
		</script>
	</g:if>
	<g:else>
		<script type="text/javascript">
			var totalPrice = ${totalPrice};
			var bookTime = ${bookTime};
		</script>
	</g:else>
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
				<h1>
					<g:message code="customer.event.completeOrder.label" />
				</h1>
			</div>
			
			<div id="register" class="padding">

				<div class="left">
					<div id="countdown_timer_notification">
						Veuillez terminer votre inscription dans les <span id='time_limit'></span> prochaines minutes.<br>
						La réservation que nous retenons sera à nouveau disponible pour les autres dans <span id='time_left'></span> minutes.
					</div>
					
					<g:if test="${erreur}">
						<!-- ERROR MESSAGE -->
						<div id="errorMessage" class="ui-widget">
							<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;">
								<p>
									<span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span> <strong><g:message code="customer.event.error.label" />:</strong>&nbsp;&nbsp;&nbsp;${erreur}
								</p>
							</div>
							<br style="clear: both;" />
						</div>
						<!-- END ERROR MESSAGE -->
					</g:if>
					
					<!-- Payment Type -->
					<h2>
						<span class="header_left"><g:message code="customer.event.paymentInfo.label" /> </span><span class="header_right"><g:message code="customer.event.totalBill.label" />: &nbsp; ${totalPrice}&nbsp;&euro;</span>
					</h2>
					<div id="paymentTypeDiv" class="table">
						<!-- Paiement par provider -->
						<g:paymentByCard>
							<div class="row">
								<div class="cell title">
									<g:message code="customer.event.paymentByCart.label" />
								</div>
								<!-- PAYBOX -->
								<g:paymentPaybox idFormulaire="formPayBox" idTypeCarte="payboxTypeCarte" callbackController="event" callbackAction="traiterRetourPaiement">
									<script>
										function submitPayboxForm(type) {
											document.getElementById('payboxTypeCarte').value = type;
											document.getElementById('formPayBox').submit();
										}
									</script>								
									<div class='cell'>
										<img class="paymentType" src="${resource(dir:'images/payment-icons', file:'mastercard.png')}" alt="mastercard" onclick="submitPayboxForm('EUROCARD_MASTERCARD')"/>									
									</div>
									<div class='cell'>
										<img class="paymentType" src="${resource(dir:'images/payment-icons', file:'visa.png')}" alt="visa" onclick="submitPayboxForm('VISA')"/>									
									</div>
								</g:paymentPaybox>
								<!-- PAYLINE / SIPS -->
								<g:paymentPaylineSIPS idFormulaire="formPaylineSips" callbackController="event" callbackAction="traiterRetourPaiement">
									<p class='card_type'><label><g:message code='customer.event.cardType.label' /></label>		
									<select name='cc_type' class='text_field required' style='width: auto;'>
										<option value='CB'>CB</option>
										<option value='Visa'>Visa</option>
										<option value='MasterCard'>MasterCard</option>
									</select></p><div class='clear'></div>									
									<p><label><g:message code='customer.event.cardNumber.label' /></label>
									<input type='text' name='cc_num' autocomplete="off" class='text_field required' /></p>									
									<p><label><g:message code='customer.event.cardExpiration.label' /></label>
									<select name='cc_month' class='text_field' style='width: 125px;'>
										<g:each var="i" in="${['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']}">
											<option value='${i}'>${i}</option>
										</g:each>
									</select> / 
									<select name='cc_year' class='text_field' style='width: 125px;'>
									<g:set var="currentYear" value="${Calendar.getInstance().get(Calendar.YEAR)}" />
									<g:each var="i" in="${[currentYear, currentYear + 1, currentYear + 2]}">
										<option value='${String.valueOf(i).substring(2)}'>${i}</option>
									</g:each>
									</select></p>
									<p><label>Crypto</label>
									<input type='text' name='cc_crypto' autocomplete="off" class='text_field required' /></p>									
									<input type='submit' value='Payer' />
								</g:paymentPaylineSIPS>
								<!-- SPPlus -->
								<g:paymentSPPlus idFormulaire="formSPPlus">
									<script>
										function submitSPPlusForm(type) {
											document.getElementById('formSPPlus').submit();
										}
									</script>								
									<div class='cell'>
										<img class="paymentType" src="${resource(dir:'images/payment-icons', file:'mastercard.png')}" alt="mastercard" onclick="submitSPPlusForm('EUROCARD_MASTERCARD')"/>									
									</div>
									<div class='cell'>
										<img class="paymentType" src="${resource(dir:'images/payment-icons', file:'visa.png')}" alt="visa" onclick="submitSPPlusForm('VISA')"/>									
									</div>
								</g:paymentSPPlus>
 							</div>
						</g:paymentByCard>
						<!-- Paiement par provider -->
						<g:paymentByPartner>
							<div class="row">
								<div class="cell title">
									<g:message code="customer.event.paymentPartner.label" />
								</div>
								<!-- PAYPAL -->
								<g:paymentPaypal style="display: inline" idFormulaire="formPayPal" callbackController="event" callbackAction="traiterRetourPaiement">
									<div class='cell'>
										<img class="paymentType" src="${resource(dir:'images/payment-icons',file:'paypal.png')}" alt="paypal" onclick="document.getElementById('formPayPal').submit();"/>
									</div>
								</g:paymentPaypal>
								<!-- BUYSTER -->
								<g:paymentBuyster style="display: inline" idFormulaire="formBuyster" callbackController="event" callbackAction="traiterRetourPaiement">
									<div class='cell'>
										<img class="paymentType" src="${resource(dir:'images/payment-icons',file:'buyster.png')}" alt="buyster" onclick="document.getElementById('formBuyster').submit();"/>
									</div>
								</g:paymentBuyster>
 							</div>
						</g:paymentByPartner>
					</div>
					<div class="clear"></div>
				</div>

				<div class="right">
					<div class="sidebar_box">
						<h4>
							<g:message code="customer.event.contact.label" />
						</h4>
						<p>
							<g:message code="customer.event.haveQuestions.label" />
							&nbsp;<a href="contact"><g:message code="customer.event.contact.label" /> </a>.
						</p>
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