<%@ page contentType="text/html;charset=UTF-8"%>
<html>
<head>
<meta name="layout" content="main">
<title><g:message code="default.admin.label" /></title>
<r:require modules="core, admin, company"/>

<r:script>
	//----- Company -----//
	var companyPageUrl = "${createLink(controller: 'company', action:'initDisplayCompany')}";
	var createCompanyPageUrl = "${createLink(controller: 'company', action:'initCreateCompany')}";

	// General
	var existCompanyNameUrl = "${createLink(controller: 'company', action:'isNameNew')}";
	var showCompanyUrl = "${createLink(controller: 'company', action:'show')}";
	var createCompanyUrl = "${createLink(controller: 'company', action:'save')}";
	var updateCompanyUrl = "${createLink(controller: 'company', action:'update')}";

	// Seller
	var sellerShowUrl = "${createLink(controller: 'seller', action: 'show')}";
	var sellerSaveUrl = "${createLink(controller: 'seller', action: 'save')}";
	var sellerUpdateUrl = "${createLink(controller: 'seller', action: 'update')}";
	var sellerAddCompanyUrl = "${createLink(controller: 'seller', action:'addCompany')}";
	var sellerRemoveCompanyUrl = "${createLink(controller: 'seller', action:'removeCompany')}";
	var existSellerEmailUrl = "${createLink(controller: 'seller', action: 'isEmailNew')}";
	var sellerDialogPageUrl = "${createLink(controller: 'seller', action:'initSellerDialogPage')}";
	var sellerPasswordUrl = "${createLink(controller: 'sellerPassword', action:'resetPassword')}";

	// Shipping
	var shippingPolicyShowUrl = "${createLink(controller: 'companyShippingPolicy', action:'show')}";
	var shippingPolicyUpdateUrl = "${createLink(controller: 'companyShippingPolicy', action:'update')}";
	var shippingRulesListUrl = "${createLink(controller: 'shippingRule', action: 'list')}";
	var shippingRulesSaveUrl = "${createLink(controller: 'shippingRule', action: 'save')}";
	var shippingRulesDeleteUrl = "${createLink(controller: 'shippingRule', action: 'delete')}";

	var companyShippingCountryRequiredLabel = "${message(code: 'company.shipping.errors.chooseCountry.label')}";

	var companyShippingRulesCountryCodeLabel = "${message(code: 'company.shipping.rules.countryCode.label')}";
	var companyShippingRulesMaxAmountLabel = "${message(code: 'company.shipping.rules.maxAmount.label')}";
	var companyShippingRulesMinAmountLabel = "${message(code: 'company.shipping.rules.minAmount.label')}";
	var companyShippingRulesPriceLabel = "${message(code: 'company.shipping.rules.price.label')}";

	var companyShippingRulesCreatePageUrl = "${resource(dir: 'admin', file: '_createShippingRule.gsp')}";

	// TaxRate
	var taxRateListUrl = "${createLink(controller: 'taxRate', action:'listTaxRate')}";
	var taxRateCreateUrl = "${createLink(controller: 'taxRate', action:'createTaxRate')}";
	var taxRateUpdateUrl = "${createLink(controller: 'taxRate', action:'updateTaxRate')}";
	var taxRateDeleteUrl = "${createLink(controller: 'taxRate', action:'deleteTaxRate')}";
	var taxRateListLocalUrl = "${createLink(controller: 'taxRate', action:'listLocalTaxRate')}";
	var taxRateCreateLocalUrl = "${createLink(controller: 'taxRate', action:'createLocalTaxRate')}";
	var taxRateUpdateLocalUrl = "${createLink(controller: 'taxRate', action:'updateLocalTaxRate')}";
	var taxRateDeleteLocalUrl = "${createLink(controller: 'taxRate', action:'deleteLocalTaxRate')}";

	var taxRateCreatePageUrl = "${resource(dir: 'admin', file:'_createTaxRate.gsp')}";
	var taxRateLocalCreatePageUrl = "${resource(dir: 'admin', file:'_createLocalTaxRate.gsp')}";

	// Payment
	var paymentPolicyShowUrl = "${createLink(controller: 'companyPaymentPolicy', action: "show")}";
	var paymentPolicyUpdateUrl = "${createLink(controller: 'companyPaymentPolicy', action: "update")}";

	// API KEY
	var apiKeyGeneratorUrl = "${createLink(controller: 'keyGen', action: "generateAPIKey")}";
	//--------------------------------------------------//

	// hide username subnav menu after clicking an option
	function hideUsernameSubnav() {
		$("#user_name_div").parent().find("ul.subnav").hide();
	}
</r:script>

</head>
<body>
<content tag="header">
<!-- header -->
<div id="logo">
	<img src="${resource(dir:'images',file:'ebiznext_logo.png')}" />
</div>
<jsec:isLoggedIn>
	<div id="user" align="right">
		<ul class="topnav">
			<li id="user_name_div">${request.user?.firstName}&nbsp;${request.user?.lastName}</li>
			<li>
				<ul class="subnav" style="display: none; ">
					<li onclick="hideUsernameSubnav();"><a href="javascript:void(0);"><g:message code="default.support.label" /></a></li>
					<li onclick="hideUsernameSubnav();"><a href="${createLink(controller:'auth',action:'signOut')}" id="logout"><g:message code="default.logout.label" /></a></li>
				</ul>
			</li>
		</ul>
	</div>
	<div id="createCompanyLnk">
	  <ul>
		<li><label><g:message code="navigation.create.label" /></label></li>
	  </ul>
	</div>
	<br />
</jsec:isLoggedIn>
</content>

<!-- inner-content -->
<div id="searchForm"></div>
<div id="createCompanyDialog"></div>
<div id="items"></div>
<div id="dialog"></div>
<div id="sellerForm"></div>
<div id="taxRateDialog"></div>
<div id="shippingRuleDialog"></div>
<content tag="footer">
<!-- footer -->
<g:render template="/layouts/footer" />
</content>
<div id="fancyboxGroup"></div>
</body>
</html>
