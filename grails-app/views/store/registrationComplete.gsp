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
<p:javascript src="store/registrationComplete" />

<!-- show Loading -->
<p:css name="showLoading/showLoading" />
<p:javascript src="showLoading/showLoading" />

<script type="text/javascript" charset="utf-8">
	var displayLogoUrl = "${createLink(controller: 'store', action:'displayLogo')}";
	var listAllCategoriesUrl = "${createLink(controller: 'store', action:'listAllCategories')}";
	var completeRegistrationOrderUrl = "${createLink(controller: 'store', action:'order')}";
	var getPaymentTypesUrl = "${createLink(controller: 'store', action:'getPaymentTypes')}";
	
	var listAllCartUrl = "${createLink(controller: 'cart', action:'listAllCart')}";
	var clearCartUrl = "${createLink(controller: 'cart', action:'clearCart')}";
	var completeRegistrationCommitUrl = "${createLink(controller: 'cart', action:'commit')}";

	var pathUrl = "${createLink(controller: 'store', absolute:'true')}";
	// Country
	var countriesUrl = "${createLink(controller: 'country')}";
	
	//--------------------------------------Translations -----------------------------------------
	
	var price_label = "${message(code:'store.common.price')}";
	var firstName_label = "${message(code:'store.common.firstName')}";
	var lastName_label = "${message(code:'store.common.lastName')}";
	var email_label = "${message(code:'store.common.email')}";
	var country_label = "${message(code:'store.common.country')}";
	var cellPhone_label = "${message(code:'store.common.cellPhone')}";
	var SucceedCompleteRegistration_label = "${message(code:'store.registrationComplete.SucceedCompleteRegistration')}";



	
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
        <div id="breadcrumbs" class="grid_12">
          <a id="breadcrumb_homePage" href="javascript:void(0)"><g:message code="store.common.home"/></a>&nbsp;&gt;&nbsp;<a id="productPageLink" href="#"><g:message code="store.common.products"/></a>
        </div>
        <h1><g:message code="store.registrationComplete.completeOrder"/></h1>
      </div>
    </div>
  </div>
  <!-- end of intro -->
  
  <!-- ********************** --> 
  <!--      C O N T E N T     --> 
  <!-- ********************** --> 
  <div id="content" class="container_16">
  
    <div id="order_details_Container" >
		  
		   
		    <form id="register_form" onsubmit="return false;">
		    	<div id = "order_details" class="grid_16"></div>
		   
			  	<br/>
	     	  	<span class="clear border_ddd"></span>
	     	  	<br />
			     
				<div class="s_order clearfix">
					<p class="s_status"><span class="s_999"><g:message code="store.common.total"/>:</span> <span class="s_secondary_color"><span id="totalPaymentValue"></span>&nbsp;&euro;</span></p>
					<p class="s_id"><span class="s_999"><g:message code="store.common.order"/></span> <span class="s_main_color"><g:message code="store.common.information"/></span></p>
					<span class="clear border_eee"></span>	

					<a class="s_button_1 s_main_color_bgr" id="completeRegistrationButton" onclick="$('#register_form').submit();"><span class="s_text"><g:message code="store.registrationComplete.completeRegistration"/></span></a>
		        	  
				</div>		     
     		  
		  </form>
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
