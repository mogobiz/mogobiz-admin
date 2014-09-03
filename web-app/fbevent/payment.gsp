<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title><g:message code="customer.event.events.label" /></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<g:javascript library="jquery" />
<jqui:resources themeCss="${resource(dir:'css/jquery-ui/themes/facebookApps-theme',file:'jquery-ui-1.8.17.custom.css')}" />

<!-- #include JS -->
<p:javascript src="fbevent/utils" />
<p:javascript src="fbevent/payment" />

<!-- #include CSS -->
<p:css name="fbevent/facebook.styles" />
<p:css name="fbevent/fbevent.styles" />

<!-- show Loading -->
<p:css name="showLoading/showLoading" />
<p:javascript src="showLoading/showLoading" />

<!-- chosen select combo -->
<p:css name="chosen/chosen" />
<p:javascript src="chosen/chosen.jquery" />

<!-- Validation Plug-in -->
<p:javascript src="jQueryValidation/jquery.validate" />
<p:javascript src="jQueryValidation/additional-methods" />
<p:javascript src="jQueryValidation/localization/messages_fr" />

<script type="text/javascript" charset="utf-8">
	//------------------------- Controller Urls -------------------------//
	var displayLogoUrl = "${createLink(controller: 'store', action:'displayLogo')}";
	var listAllCategoriesUrl = "${createLink(controller: 'fbevent', action:'listAllCategories')}";
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

	<div id="dialog" style="display:none"></div>
	
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

		<div id="content">

			<div class="panel">
				<div class="panel_head">
					<div class="title-logo">
						<img src="${resource(dir:'images/fbevent_images',file:'register-icon.png')}" />
					</div>
					<div class="title"><g:message code="customer.event.completeOrder.label" /></div>
				</div>
				<div class="panel_body">
					<div id="register" class="padding">
						<g:if test="${ erreur }">
							<!-- ERROR MESSAGE -->
							<div id="errorMessage" class="ui-widget">
								<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;">
									<p>
										<span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span> <strong><g:message code="customer.event.error.label" />:</strong>&nbsp;&nbsp;&nbsp;${ erreur }
									</p>
								</div>
								<br style="clear: both;" />
							</div>
							<!-- END ERROR MESSAGE -->
						</g:if>
						<!-- Payment Type -->
						<h2>
							<span class="header_left"><g:message code="customer.event.paymentInfo.label" /> </span><span class="header_right"><g:message code="customer.event.totalBill.label" />: &nbsp; ${request.getParameter('totalPrice')} &nbsp;&euro;</span>
						</h2>
						<div id="paymentTypeDiv" class="table">
							<!-- Paiement par provider -->
							<%--<g:paymentByCard>
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
										<input type='text' name='cc_num' class='text_field required' /></p>									
										<p><label><g:message code='customer.event.cardExpiration.label' /></label>
										<select name='cc_month' class='text_field' style='width: 125px;'>
											<g:each var="i" in="${ ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'] }">
												<option value='${i}'>${i}</option>
											</g:each>
										</select> / 
										<select name='cc_year' class='text_field' style='width: 125px;'>
										<g:set var="currentYear" value="${ Calendar.getInstance().get(Calendar.YEAR) }" />
										<g:each var="i" in="${ [currentYear, currentYear + 1, currentYear + 2] }">
											<option value='${String.valueOf(i).substring(2)}'>${i}</option>
										</g:each>
										</select></p>
										<p><label>Crypto</label>
										<input type='text' name='cc_crypto' class='text_field required' /></p>									
										<input type='submit' value='Payer' />
									</g:paymentPaylineSIPS>
	 							</div>
							</g:paymentByCard>--%>
							<!-- Paiement par provider -->
							<g:paymentByPartner>
								<div class="row">
									<div class="cell title">
										<g:message code="customer.event.paymentPartner.label" />
									</div>
									<!-- PAYPAL -->
									<g:paymentPaypal style="display: inline" idFormulaire="formPayPal" callbackController="store" callbackAction="passnguideTraiterRetourPaiement" target="_top">
										<div class='cell'>
											<img class="paymentType" src="${resource(dir:'images/payment-icons',file:'paypal.png')}" alt="paypal" onclick="document.getElementById('formPayPal').submit();"/>
										</div>
									</g:paymentPaypal>
									<!-- BUYSTER -->
									<%--<g:paymentBuyster style="display: inline" idFormulaire="formBuyster" callbackController="event" callbackAction="traiterRetourPaiement">
										<div class='cell'>
											<img class="paymentType" src="${resource(dir:'images/payment-icons',file:'buyster.png')}" alt="buyster" onclick="document.getElementById('formBuyster').submit();"/>
										</div>
									</g:paymentBuyster>--%>
	 							</div>
							</g:paymentByPartner>
						</div>
						<div class="clear"></div>
					</div>
				</div>
			</div>

		</div>
		<!-- The div "bottom" add the rounded corner look to the theme and contain no content. -->
		<div class="bottom"></div>
	</div>

	<!---------------------------------------------------------------------------------------------------->
	<div id="footer">
		<p><g:message code="customer.event.copyright.label" /></p>
		<div class="clear"></div>
	</div>
</body>
</html>