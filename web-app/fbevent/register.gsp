<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title><g:message code="customer.event.events.label" /></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<g:javascript library="jquery" />
<jqui:resources themeCss="${resource(dir:'css/jquery-ui/themes/facebookApps-theme',file:'jquery-ui-1.8.17.custom.css')}" />

<!-- #include JS -->
<p:javascript src="fbevent/utils" />
<p:javascript src="fbevent/register" />

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
	var listAllCartUrl = "${createLink(controller: 'fbevent', action:'listAllCart')}";
	var clearCartUrl = "${createLink(controller: 'fbevent', action:'clearCart')}";
	var registrationCompleteUrl = "${createLink(controller: 'fbevent', action:'payment')}";
	// Country
	var countriesUrl = "${createLink(controller: 'country')}";

	var completeRegistrationOrderUrl = "${createLink(controller: 'fbevent', action:'order')}";
	var completeRegistrationCommitUrl = "${createLink(controller: 'fbevent', action:'commit')}";
	//------------------------- messages.properties -------------------------//
	var autofillMessageLabel = "${message(code:'customer.event.autofillMessage.label')}";
	var autofillLabel = "${message(code:'customer.event.autofill.label')}";
	var copyTicketInfoLabel = "${message(code:'customer.event.copyTicketInfo.label')}";
	var allCategoriesLabel = "${message(code:'customer.event.allCategories.label')}";
	var yesLabel = "${message(code:'default.button.yes.label')}";
	var noLabel = "${message(code:'default.button.no.label')}";
	
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
	<div id="page" style="display: none;">
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
					<div class="title-logo">
						<img src="${resource(dir:'images/fbevent_images',file:'register-icon.png')}" />
					</div>
					<div class="title"><g:message code="customer.event.completeOrder.label" /></div>
					<input type="hidden" name="idEvent" id="idEvent" value=""></input>
				</div>
				<div class="panel_body">
					<g:if test="${request.getParameter('page')}">
					<div style="font-weight: bold; color:red;">
						${request.getParameter('error')}
					</div>
					</g:if>
					<div id="register">
						<form id="register_form" onsubmit="return false;">
							<div id="tickets"></div>
							
							<div id="payment">
								<label style="float:right;" class="uiButton uiButtonConfirm uiButtonMedium submit">
									<input type="submit" id="completeRegistrationButton" value="<g:message code="customer.event.completeRegistration.label" />" style="width:auto;"/>
								</label>
								<br style="clear:both;"></br>
							</div>
						</form>
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