<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en" xml:lang="en" xmlns:fb="http://www.facebook.com/2008/fbml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Your Store</title>
		<meta name="description" content="My Store" />
		<g:javascript library="jquery" />

		<p:css name="shoppica/960" />
		<p:css name="shoppica/screen" />
		<p:css name="shoppica/color" />
		<p:css name="store/store" />

		<p:javascript src="store/shoppica" />
		<p:javascript src="store/globals" />
		<p:javascript src="store/about" />

		<!-- show Loading -->
		<p:css name="showLoading/showLoading" />
		<p:javascript src="showLoading/showLoading" />

		<script type="text/javascript" charset="utf-8">
			var displayLogoUrl = "${createLink(controller: 'store', action:'displayLogo')}";
			var listAllCategoriesUrl = "${createLink(controller: 'store', action:'listAllCategories')}";
			var getProductUrl = "${createLink(controller: 'store', action:'getProduct')}";
			var getStockInfoUrl = "${createLink(controller: 'store', action:'getStockInfo')}";
			var getProductDatesUrl = "${createLink(controller: 'store', action:'getProductDates')}";
			var getProductTimesUrl = "${createLink(controller: 'fbevent', action:'getProductTimes')}";
			var getPaymentTypesUrl = "${createLink(controller: 'store', action:'getPaymentTypes')}";
			
			var listAllCartUrl = "${createLink(controller: 'cart', action:'listAllCart')}";
			var clearCartUrl = "${createLink(controller: 'cart', action:'clearCart')}";
			var addTicketToCartUrl = "${createLink(controller: 'cart', action:'addTicketToCart')}";
			var updateTicketToCartUrl = "${createLink(controller: 'cart', action:'updateCartItem')}";
			var removeTicketFromCartUrl = "${createLink(controller: 'cart', action:'removeCartItem')}";

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
						<div id="breadcrumbs" class="grid_12">
							<a id="breadcrumb_homePage" href="javascript:void(0)"><g:message code="store.common.home"/></a> > <g:message code="store.common.menu.aboutUs"/>
						</div>
						<h1><g:message code="store.common.menu.aboutUs"/></h1>
					</div>
				</div>
			</div>
			<!-- end of intro -->
			<!-- ********************** -->
			<!--      C O N T E N T     -->
			<!-- ********************** -->
			<div id="content" class="product_view container_12">
				<div class="grid_12 alpha">
					<h2><span class="s_secondary_color"><g:message code="store.common.about"/> </span> <g:message code="store.common.us"/></h2>
				</div>
				<div class="grid_12 mb_18">
					<g:if test="${companyVO?.aboutUs}">
						${companyVO?.aboutUs }
					</g:if>
				</div>
				<span class="clear border_ddd"></span>
				<div class="grid_12 alpha">
					<h2><span class="s_secondary_color"><g:message code="store.common.terms"/> </span> <g:message code="store.common.conditions"/></h2>
				</div>
				<div class="grid_12">
					<g:if test="${companyVO?.termsAndPolicies}">
						${companyVO?.termsAndPolicies }
					</g:if>
				</div>
			</div>
			<!-- end of content -->
			<!-- ********************** -->
			<!--      F O O T E R       -->
			<!-- ********************** -->
			<g:render template="footer" />
			<!-- end of FOOTER -->
		</div>
	</body>
</html>
