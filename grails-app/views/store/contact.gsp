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
		<p:javascript src="store/contact" />

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
							<a id="breadcrumb_homePage" href="javascript:void(0)"><g:message code="store.common.home"/></a> > <g:message code="store.common.contact"/>
						</div>
						<h1><g:message code="store.common.contact"/></h1>
					</div>
				</div>
			</div>
			<!-- end of intro -->
			<!-- ********************** -->
			<!--      C O N T E N T     -->
			<!-- ********************** -->
			<div id="content" class="product_view container_12">
				<div class="grid_8 alpha">
					<h2><span class="s_secondary_color"><g:message code="store.common.shop"/> </span> <g:message code="store.common.address"/></h2>
				</div>
				<div class="clear"></div>
				<p class="alpha grid_4">
					<g:if test="${companyVO?.name}">
						<strong>${companyVO?.name }</strong>
					</g:if>
					<g:if test="${companyVO?.location?.road1 }">
						<br /> ${companyVO?.location?.road1 }
					</g:if>
					<g:if test="${companyVO?.location?.roadNum }">
						 (${companyVO?.location?.roadNum })
					</g:if>
					<g:if test="${companyVO?.location?.city }">
						<br /> ${companyVO?.location?.city }
					</g:if>
					<g:if test="${companyVO?.location?.state }">
						<br /> ${companyVO?.location?.state }
					</g:if>
					<g:if test="${companyVO?.location?.country?.name }">
						<br /> ${companyVO?.location?.country?.name }
					</g:if>
					<g:if test="${companyVO?.location?.postalCode}">
						<br /> ${companyVO?.location?.postalCode }
					</g:if>
				</p>
				<p class="grid_4"><strong><g:message code="store.common.telephone"/>:</strong><br /> ${companyVO?.phone }</p>
				<p class="omega grid_4"><strong><g:message code="store.common.website"/>:</strong>
				<br/> <a href="${companyVO?.website }" target="_blank">${companyVO?.website }</a></p>
				<br />
				<span class="clear border_ddd"></span>
				<br />
				<div class="clear"></div>
				<h2><span class="s_secondary_color"><g:message code="store.common.send"/></span> <g:message code="store.common.message"/></h2>
				<form id="contact_form" action="javascript:void(0)" method="post" enctype="multipart/form-data">
					<div id="contact_form_icon"></div>
					<div class="s_row_3 clearfix">
						<label><strong><g:message code="store.common.firstName"/>:</strong> *</label>
						<input type="text" size="40" class="required"/>
					</div>
					<div class="s_row_3 clearfix">
						<label><strong><g:message code="store.common.emailAdddress"/>:</strong> *</label>
						<input type="text" size="40" class="required email" pattern="[a-zA-Z0-9._-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}"/>
					</div>
					<div class="s_row_3 clearfix">
						<label><strong><g:message code="store.common.emailMessage"/>:</strong> *</label>
						<div class="s_full">
							<textarea id="enquiry" style="width: 98%;" rows="10" class="required" cols="50"></textarea>
						</div>
					</div>
					<a class="s_button_1 s_main_color_bgr" onclick="$('#contact_form').submit();"><span class="s_text"><g:message code="store.common.sendMessage"/></span></a>
				</form>
				<div class="clear"></div>
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
