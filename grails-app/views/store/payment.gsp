<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en" xml:lang="en" xmlns:fb="http://www.facebook.com/2008/fbml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Your Store</title>
<meta name="description" content="My Store" />

<g:javascript library="jquery" />
<!-- Validation Plug-in -->
<p:javascript src="jQueryValidation/jquery.validate" />
<p:javascript src="jQueryValidation/additional-methods" />
<p:javascript src="jQueryValidation/localization/messages_fr" />
<p:css name="shoppica/960" />
<p:css name="shoppica/screen" />
<p:css name="shoppica/color" />
<p:css name="store/store" />

<!--[if lt IE 9]>
<link rel="stylesheet" type="text/css" href="stylesheet/ie.css" media="screen" />
<![endif]-->

<p:javascript src="store/shoppica" />
<p:javascript src="store/globals" />
<p:javascript src="store/payment" />

<!-- show Loading -->
<p:css name="showLoading/showLoading" />
<p:javascript src="showLoading/showLoading" />

<script type="text/javascript" charset="utf-8">
	var listAllCategoriesUrl = "${createLink(controller: 'store', action:'listAllCategories')}";
	var displayLogoUrl = "${createLink(controller: 'store', action:'displayLogo')}";
	var getPaymentTypesUrl = "${createLink(controller: 'store', action:'getPaymentTypes')}";
	var pathUrl = "${createLink(controller: 'store', absolute:'true')}";
</script>

</head>

<body class="s_layout_fixed">
<div id="wrapper"> 
  
  <!-- ********************** --> 
  <!--      H E A D E R       --> 
  <!-- ********************** -->
  <g:render template="header" />
  <!-- end of header --> 

  <!-- ********************** --> 
  <!--     I N T R O          -->
  <!-- ********************** --> 
  <div id="intro">
    <div id="intro_wrap">
      <div class="container_12">
        <div id="breadcrumbs" class="grid_12" style="display:none">
          <a id="breadcrumb_homePage" href="javascript:void(0)"><g:message code="store.common.home"/></a>&nbsp;&gt;&nbsp;<a id="productPageLink" href="#"><g:message code="store.common.products"/></a>&nbsp;&gt;&nbsp;<a href="registrationComplete"><g:message code="store.common.registration"/></a>
        </div>
        <h1><g:message code="store.completePayment.completePayment"/></h1>
      </div>
    </div>
  </div>
  <!-- end of intro -->
  
  
  <!-- ********************** --> 
  <!--      C O N T E N T     --> 
  <!-- ********************** --> 
  <div id="content" class="container_16">
  
    <div id="order_details_Container" >
		   
			  	<br/>
	     	  	<span class="clear border_ddd"></span>
	     	  	<br />
			     
				<div class="s_order clearfix">
					<p class="s_status"><span class="s_999"><g:message code="customer.event.totalBill.label" />:</span> <span class="s_secondary_color">&nbsp; ${request.getParameter('totalPrice')} &nbsp;&euro;</span></p>
					<p class="s_id"><span class="s_999"><g:message code="store.common.payment"/></span> <span class="s_main_color"><g:message code="store.common.information"/></span></p>

					</br>
					<div id="paymentsContainer" class="grid_16">
						<div class="s_row_2 clearfix" style="display:none">
							<label ><strong>Payment Type</strong></label>
							<select id="paymentType" name="paymentType" class="required" style="width: 150px;"></select>
						</div>
						 
						<div class="s_row_2 clearfix" id="payboxContainer">
						
								<g:paymentPaybox idFormulaire="formPayBox" idTypeCarte="payboxTypeCarte" callbackController="store" callbackAction="traiterRetourPaiement">
									<script>
										addOptionToCombo('PayBox');
										function submitPayboxForm(type) {
											document.getElementById('payboxTypeCarte').value = type;
											document.getElementById('formPayBox').submit();
										}
									</script>								
									<div class='s_subcategory'>
										<img class="paymentType" src="${resource(dir:'images/payment-icons', file:'mastercard.png')}" alt="mastercard" onclick="submitPayboxForm('EUROCARD_MASTERCARD')"/>									
									</div>
									<div class='s_subcategory'>
										<img class="paymentType" src="${resource(dir:'images/payment-icons', file:'visa.png')}" alt="visa" onclick="submitPayboxForm('VISA')"/>									
									</div>
								</g:paymentPaybox>
						</div>
						
						<div class="s_row_2 clearfix" id="paylineSIPSContainer">
						
								<!-- PAYLINE / SIPS -->
								<g:paymentPaylineSIPS idFormulaire="formPaylineSips" callbackController="store" callbackAction="traiterRetourPaiement">
									<script>
										addOptionToCombo('PaylineSIPS');
									</script>
									<label><strong><g:message code='customer.event.cardType.label' /></strong></label>		
									<select name='cc_type' class='text_field required' style='width: 150px;'>
										<option value='CB'>CB</option>
										<option value='Visa'>Visa</option>
										<option value='MasterCard'>MasterCard</option>
									</select>
						</div>	
						<div class="s_row_2 clearfix" id="paylineSIPSContainer">								
									<label><strong><g:message code='customer.event.cardNumber.label' /></strong></label>
									<input type='text' name='cc_num' class='text_field required' />
						</div>	
						<div class="s_row_2 clearfix" id="paylineSIPSContainer">							
									<label><strong><g:message code='customer.event.cardExpiration.label' /></strong></label>
									
										<select name='cc_month' class='text_field' style='width: 150px;'>
											<g:each var="i" in="${ ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'] }">
												<option value='${i}'>${i}</option>
											</g:each>
										</select>
										<span class="left">&nbsp;/&nbsp;</span>  
									
									
									<div class="left">
										<select name='cc_year' class='text_field' style='width: 150px;'>
										<g:set var="currentYear" value="${ Calendar.getInstance().get(Calendar.YEAR) }" />
										<g:each var="i" in="${ [currentYear, currentYear + 1, currentYear + 2] }">
											<option value='${String.valueOf(i).substring(2)}'>${i}</option>
										</g:each>
										</select>
									</div>
									
					 	</div>
					 	<div class="s_row_2 clearfix" id="paylineSIPSContainer">
									<label><strong>Crypto</strong></label>
									<input type='text' name='cc_crypto' class='text_field required' />									
									
						</div>
						<div class="s_row_2 clearfix" id="paylineSIPSContainer">
									<label>&nbsp;</label>
									<input type='submit' style='width: 150px;' value='Payer' />
									
						</div>
								</g:paymentPaylineSIPS>
 							
							
												
							<div class="s_row_2 clearfix" id="paypalContainer">
						
								<g:paymentPaypal  idFormulaire="formPayPal" callbackController="store" callbackAction="traiterRetourPaiement">
									<script>
										addOptionToCombo('PayPal');
									</script>
									<div class='s_subcategory'>
										<img src="${resource(dir:'images/payment-icons',file:'paypal.png')}" alt="paypal" onclick="document.getElementById('formPayPal').submit();"/>
									</div>
								</g:paymentPaypal>
								
								<g:paymentBuyster idFormulaire="formBuyster" callbackController="store" callbackAction="traiterRetourPaiement">
									<script>
										addOptionToCombo('Buyster');
									</script>
									<div class='s_subcategory'>
										<img class="paymentType" src="${resource(dir:'images/payment-icons',file:'buyster.png')}" alt="buyster" onclick="document.getElementById('formBuyster').submit();"/>
									</div>
								</g:paymentBuyster>
						</div>

					</div> <!-- end grid_16 -->
					  
				</div>	<!-- end s_order clearfix-->	     

	</div>
  </div>

  <!-- end of content --> 
  
  <!-- ********************** --> 
  <!--   S H O P   I N F O    --> 
  <!-- ********************** --> 

  <!-- end of shop info --> 

  <!-- ********************** --> 
  <!--      F O O T E R       --> 
  <!-- ********************** --> 
  <g:render template="footer" />
  <!-- end of FOOTER --> 
  
</div>
</body>
</html>
