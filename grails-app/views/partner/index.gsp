<%@ page contentType="text/html;charset=UTF-8"%>
<html>
<head>
<meta name="layout" content="main">
<title>IPER2010 - ${request.seller.company.name}</title>
<r:require modules="core, partner, company"/>

<script src="http://www.openlayers.org/api/OpenLayers.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>

<r:script>
	//-----CATALOG----//
	var showCatalogUrl = "${createLink(controller: 'catalog', action:'show')}";
	var createCatalogUrl = "${createLink(controller: 'catalog', action:'save')}";
	var updateCatalogUrl = "${createLink(controller: 'catalog', action:'update')}";
	var deleteCatalogUrl = "${createLink(controller: 'catalog', action:'delete')}";
	var publishCatalogUrl = "${createLink(controller: 'elasticsearch', action:'publish')}";

	var catalogCreatePageUrl = "${resource(dir: 'partner', file:'_createCatalog.gsp')}";
	var catalogTabPageUrl = "${resource(dir: 'partner', file:'_catalogTab.gsp')}";

	var catalogTitleLabel = "${message(code:'catalog.title.label')}";
	var catalogUniqueNameLabel = "${message(code:'catalog.unique.name.label')}";
	var catalogDeleteEmptyLabel = "${message(code:'catalog.delete.empty.label')}";

	//-----CATEGORY----//
	var showCategoryUrl = "${createLink(controller: 'category', action:'show')}";
	var createCategoryUrl = "${createLink(controller: 'category', action:'save')}";
	var updateCategoryUrl = "${createLink(controller: 'category', action:'update')}";
	var deleteCategoryUrl = "${createLink(controller: 'category', action:'delete')}";

	var categoryCreateTreeLabel = "${message(code:'category.tree.create.label')}";
	var categoryDeleteTreeLabel = "${message(code:'category.tree.delete.label')}";
	var categoryCreateFeatureTreeLabel = "${message(code:'category.tree.create.feature.label')}";
	var categoryCreateVariationTreeLabel = "${message(code:'category.tree.create.variation.label')}";
	var categoryCreateTitleLabel = "${message(code:'category.create.title.label')}";
	var categoryNameExistLabel = "${message(code:'category.name.exist.error.label')}";
	var categoryDeleteFailedLabel = "${message(code:'category.delete.failed.label')}";
	var categoryFeaturesTitleLabel = "${message(code:'category.features.title.label')}";
	var categoryVariationsTitleLabel = "${message(code:'category.variations.title.label')}";
	var categoryDeleteCatalogTreeLabel = "${message(code:'category.tree.deleteCatalog.label')}";

	var categoryCreatePageUrl = "${resource(dir: 'partner', file:'_createCategory.gsp')}";
	var categoryTabPageUrl = "${resource(dir: 'partner', file:'_categoryTab.gsp')}";
	var categoryFeaturePageUrl = "${resource(dir: 'partner', file:'_categoryFeature.gsp')}";
	var categoryVariationsPageUrl = "${resource(dir: 'partner', file:'_categoryVariation.gsp')}";

	//-----TRANSLATE----//
	var createTranslationPageUrl = "${resource(dir: 'partner', file: '_createTranslation.gsp')}";
	var deleteTranslationPageUrl = "${resource(dir: 'partner', file: '_deleteTranslation.gsp')}";

	var languagesTranslationUrl = "${createLink(controller: 'translation', action:'languages')}";
	var listTranslationUrl = "${createLink(controller: 'translation', action:'list')}";
	var updateTranslationUrl = "${createLink(controller: 'translation', action:'update')}";
	var deleteTranslationUrl = "${createLink(controller: 'translation', action:'delete')}";

	var translationLanguageGridLabel = "${message(code:'translation.language.label')}";
	var translationNameGridLabel = "${message(code:'translation.name.label')}";
	var translationKeywordsGridLabel = "${message(code:'translation.keywords.label')}";
	var translationValueGridLabel = "${message(code:'translation.value.label')}";
	var translationValuesGridLabel = "${message(code:'translation.values.label')}";
	var translationWebstieGridLabel = "${message(code:'translation.website.label')}";
	var translationDescriptionGridLabel = "${message(code:'translation.description.label')}";
	var translationDialogTitleLabel = "${message(code:'translation.dialog.title.label')}";

	//-----VARIATIONS----//
	var showVariationsUrl = "${createLink(controller: 'variation', action:'show')}";
	var createVariationsUrl = "${createLink(controller: 'variation', action:'save')}";
	var updateVariationsUrl = "${createLink(controller: 'variation', action:'update')}";
	var updateVariationsPositionUrl = "${createLink(controller: 'variation', action:'updatePosition')}";
	var deleteVariationsUrl = "${createLink(controller: 'variation', action:'delete')}";
	var createVariationValueUrl = "${createLink(controller: 'variation', action:'addVariationValue')}";
	var updateVariationValueUrl = "${createLink(controller: 'variation', action:'updateVariationValue')}";
	var deleteVariationValueUrl = "${createLink(controller: 'variation', action:'removeVariationValue')}";
	var variationsUniqueErrorLabel = "${message(code:'variations.error.unique.label')}";
	var variationsMaximumErrorLabel = "${message(code:'variations.error.maximum.label')}";
	var variationsEmptyValueErrorLabel = "${message(code:'variations.error.emptyValue.label')}";
	var variationsTranslationErrorLabel = "${message(code:'variations.error.translation.label')}";

	//-----PRODUCT----//
	var showProductUrl = "${createLink(controller: 'product', action:'show')}";
	var updateProductUrl = "${createLink(controller: 'product', action:'update')}";
	var createProductUrl = "${createLink(controller: 'product', action:'save')}";
	var existProductCodeUrl = "${createLink(controller: 'product', action:'existCode')}";

	var createProductPageUrl = "${resource(dir: 'partner', file: '_createProduct.gsp')}";
	var productTourismPageUrl = "${resource(dir: 'partner', file: '_tourismProduct.gsp')}";
	var productDescriptionPageUrl = "${resource(dir: 'partner', file: '_tourismDescription.gsp')}";

	var uploadResourceUrl = "${createLink(controller: 'upload', action:'uploadResource')}?format=json";
	var getProductPicturesUrl = '${createLink(controller: 'productResource', action:'retrieveProductResources')}';
	var unbindProductPicturesUrl = '${createLink(controller: 'productResource', action:'unbindResourceToProduct')}';

	//-----PRODUCT TAGS----//
	var getProductTagsUrl = "${createLink(controller: 'product', action:'getTagsByProduct')}";
	var getCompanyTagsUrl = "${createLink(controller: 'product', action:'getTagsByCompany')}";
	var addProductTagUrl = "${createLink(controller: 'product', action:'addTag')}";
	var removeProductTagUrl = "${createLink(controller: 'product', action:'removeTag')}";

	//-----Properties----//
	var savePropertyUrl = "${createLink(controller: 'product', action:'saveProperty')}";
	var deletePropertyUrl = "${createLink(controller: 'product', action:'deleteProperty')}";
	var tourismPropertiesPageUrl = "${resource(dir: 'partner', file: '_tourismProperties.gsp')}";
	
	//-----FEATURES----//
	var showFeaturesUrl = "${createLink(controller: 'feature', action:'show')}";
	var createFeaturesUrl = "${createLink(controller: 'feature', action:'save')}";
	var updateFeaturesUrl = "${createLink(controller: 'feature', action:'update')}";
	var updateFeaturesPositionUrl = "${createLink(controller: 'feature', action:'updatePosition')}";
	var deleteFeaturesUrl = "${createLink(controller: 'feature', action:'delete')}";
	var tourismFeaturePageUrl = "${resource(dir: 'partner', file: '_tourismFeatures.gsp')}";
	
	//----- POI -----//
	var showPoiUrl = "${createLink(controller: 'poi', action:'show')}";
	var updatePoiUrl = "${createLink(controller: 'poi', action:'update')}";
	var createPoiUrl = "${createLink(controller: 'poi', action:'save')}";
	var deletePoiUrl = "${createLink(controller: 'poi', action:'delete')}";
	var listPoiTypesUrl = "${createLink(controller: 'poi', action:'listPOITypes')}";
	var listPoiPicturesUrl = "${createLink(controller: 'poi', action:'listPOIPictures')}";

	var poiPictureDialogPageUrl = "${resource(dir: 'partner', file: '_poiPicture.gsp')}";
	var poiDialogPageUrl = "${resource(dir: 'partner', file: '_poi.gsp')}";

	// Calendar
	var getCalendarEventUrl =  "${createLink(controller: 'intraDayPeriod', action:'show')}";
	var saveCalendarEventUrl =  "${createLink(controller: 'intraDayPeriod', action:'save')}";
	var updateCalendarEventUrl =  "${createLink(controller: 'intraDayPeriod', action:'update')}";
	var deleteCalendarEventUrl = "${createLink(controller: 'intraDayPeriod', action:'delete')}";
	var getKoPeriodsUrl = "${createLink(controller: 'productKoPeriods', action:'show')}";
	var createKoPeriodsUrl = "${createLink(controller: 'productKoPeriods', action:'save')}";
	var updateKoPeriodsUrl = "${createLink(controller: 'productKoPeriods', action:'update')}";
	var deleteKoPeriodsUrl = "${createLink(controller: 'productKoPeriods', action:'delete')}";

	var tourismCalendarPageUrl = "${resource(dir: 'partner', file: '_tourismCalendar.gsp')}";

	//Suggestions
	var tourismSuggestionsListCompanies = "${createLink(controller: 'suggestions', action: 'listCompaniesForSuggestions')}";
	var tourismSuggestionsListProducts = "${createLink(controller: 'suggestions', action: 'listProductsForSuggestions')}";
	var tourismSuggestionsListSuggestions = "${createLink(controller: 'suggestions', action: 'retrieveProductSuggestions')}";
	var tourismSuggestionsBindSuggestions = "${createLink(controller: 'suggestions', action: 'bindSuggestionsToProduct')}";

	var tourismSuggestionsPageUrl = "${resource(dir: 'partner', file: '_tourismSuggestions.gsp')}";

	//TicketTypes
	var loadTicketTypeURL = '${createLink(controller: 'ticketType', action:'show')}';
	var createTicketTypeURL = '${createLink(controller: 'ticketType', action:'save')}';
	var updateTicketTypeURL = '${createLink(controller: 'ticketType', action:'update')}';
	var deleteTicketTypeURL = '${createLink(controller: 'ticketType', action:'delete')}';

	var tourismPricingPageUrl = "${resource(dir: 'partner', file: '_tourismPricing.gsp')}";

	//Brands
	var fetchBrandUrl = "${createLink(controller: 'brand', action:'show')}";
	var createBrandUrl = "${createLink(controller: 'brand', action:'save')}";
	var updateBrandUrl = "${createLink(controller: 'brand', action:'update')}";
	var deleteBrandUrl = "${createLink(controller: 'brand', action:'delete')}";
	var productBrandsUploadLogoUrl = "${createLink(controller: 'brand', action:'uploadLogo')}?format=json";
	var productBrandsDeleteLogoUrl = "${createLink(controller: 'brand', action:'removeLogo')}";
	var productBrandsDisplayLogoUrl = "${createLink(controller: 'brand', action:'displayLogo')}";
	var productBrandsHasLogoUrl = "${createLink(controller: 'brand', action:'hasLogo')}";

	var BrandPageUrl = "${resource(dir: 'partner', file: '_brand.gsp')}";

	//----- Company -----//
	var companyPageUrl = "${createLink(controller: 'company', action:'initDisplayCompany')}";

	// General
	var showCompanyUrl = "${createLink(controller: 'company', action:'show')}";
	var updateCompanyUrl = "${createLink(controller: 'company', action:'update')}";

	// Seller
	var sellerShowUrl = "${createLink(controller: 'seller', action: 'show')}";
	var sellerSaveUrl = "${createLink(controller: 'seller', action: 'save')}";
	var sellerUpdateUrl = "${createLink(controller: 'seller', action: 'update')}";
	var existSellerEmailUrl = "${createLink(controller: 'seller', action: 'isEmailNew')}";
	var sellerDialogPageUrl = "${createLink(controller: 'seller', action:'initSellerDialogPage')}";
	var sellerPasswordUrl = "${createLink(controller: 'sellerPassword', action:'resetPassword')}";

	// Shipping
	var shippingPolicyShowUrl = "${createLink(controller: 'companyShippingPolicy', action:'show')}";
	var shippingPolicyUpdateUrl = "${createLink(controller: 'companyShippingPolicy', action:'update')}";
	var shippingRulesListUrl = "${createLink(controller: 'shippingRule', action: 'list')}";
	var shippingRulesSaveUrl = "${createLink(controller: 'shippingRule', action: 'save')}";
	var shippingRulesDeleteUrl = "${createLink(controller: 'shippingRule', action: 'delete')}";

	var companyShippingRulesCountryCodeLabel = "${message(code: 'company.shipping.rules.countryCode.label')}";
	var companyShippingRulesMaxAmountLabel = "${message(code: 'company.shipping.rules.maxAmount.label')}";
	var companyShippingRulesMinAmountLabel = "${message(code: 'company.shipping.rules.minAmount.label')}";
	var companyShippingRulesPriceLabel = "${message(code: 'company.shipping.rules.price.label')}";

	var companyShippingRulesCreatePageUrl = "${resource(dir: 'admin', file: '_createShippingRule.gsp')}";

	//TaxRate
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

//Brands
	var companyShowBrandsUrl = '${createLink(controller: 'brand', action:'show')}';
	var companyCreateBrandsUrl = '${createLink(controller: 'brand', action:'save')}';
	var companyUpdateBrandsUrl = '${createLink(controller: 'brand', action:'update')}';
	var companyDeleteBrandsUrl = '${createLink(controller: 'brand', action:'delete')}';
	var companyBrandsUploadLogoUrl = "${createLink(controller: 'brand', action:'uploadLogo')}?format=json";
	var companyBrandsDeleteLogoUrl = "${createLink(controller: 'brand', action:'removeLogo')}";
	var companyBrandsDisplayLogoUrl = "${createLink(controller: 'brand', action:'displayLogo')}";
	var companyBrandsHasLogoUrl = "${createLink(controller: 'brand', action:'hasLogo')}";

	var companyBrandsPageUrl = "${resource(dir: 'admin', file:'_createCompanyBrand.gsp')}";

	var companyBrandsTitleLabel = "${message(code:'company.brands.title.label')}";
	var companyBrandsNameLabel = "${message(code:'company.brands.name.label')}";
	var companyBrandsWebsiteLabel = "${message(code:'company.brands.website.label')}";
	var companyBrandsHideLabel = "${message(code:'company.brands.hide.label')}";
	var companyBrandsWebsiteErrorLabel = "${message(code:'company.brands.invalidWebsite.label')}";
	var companyBrandsUniqueErrorLabel = "${message(code:'company.brands.uniqueName.label')}";
	var companyBrandsLogoErrorLabel = "${message(code:'company.brands.invalidLogo.label')}";

	//Coupons
	var companyShowCouponsUrl = '${createLink(controller: 'coupon', action:'list')}';
	var companyCreateCouponsUrl = '${createLink(controller: 'coupon', action:'create')}';
	var companyUpdateCouponsUrl = '${createLink(controller: 'coupon', action:'update')}';

	var companyCouponsSearchCategoriesUrl = '${createLink(controller: 'category', action:'show')}';
	var companyCouponsSearchProductsUrl = '${createLink(controller: 'product', action:'show')}';
	var companyCouponsSearchSkuUrl = '${createLink(controller: 'ticketType', action:'show')}';

	var companyCouponsPageUrl = "${resource(dir: 'admin', file:'_createCompanyCoupons.gsp')}";
	var companyCouponsRulesPageUrl = "${resource(dir: 'admin', file:'_createCompanyCouponsRule.gsp')}";

	var companyCouponsTitleLabel = "${message(code:'company.coupons.title.label')}";
	var companyCouponsNameLabel = "${message(code:'company.coupons.name.label')}";
	var companyCouponsCodeLabel = "${message(code:'company.coupons.code.label')}";
	var companyCouponsActiveLabel = "${message(code:'company.coupons.active.label')}";
	var companyCouponsCatalogWiseLabel = "${message(code:'company.coupons.catalogWise.label')}";
	var companyCouponsNumberOfUseLabel = "${message(code:'company.coupons.numberOfUse.label')}";
	var companyCouponsStartDateLabel = "${message(code:'company.coupons.startDate.label')}";
	var companyCouponsEndDateLabel = "${message(code:'company.coupons.endDate.label')}";
	var companyCouponsNumberErrorLabel = "${message(code:'company.coupons.invalidNumber.label')}";
	var companyCouponsUniqueNameErrorLabel = "${message(code:'company.coupons.uniqueName.label')}";
	var companyCouponsUniqueCodeErrorLabel = "${message(code:'company.coupons.uniqueCode.label')}";

	var companyCouponsRulesTitleLabel = "${message(code:'company.coupons.rules.title.label')}";
	var companyCouponsRulesTypeLabel = "${message(code:'company.coupons.rules.type.label')}";
	var companyCouponsRulesDiscountLabel = "${message(code:'company.coupons.rules.discount.label')}";
	var companyCouponsRulesPurchasedLabel = "${message(code:'company.coupons.rules.purchased.label')}";
	var companyCouponsRulesOfferedLabel = "${message(code:'company.coupons.rules.offered.label')}";
	var companyCouponsRulesDiscountValueLabel = "${message(code:'company.coupons.rules.discountValue.label')}";
	var companyCouponsRulesPurchasedOfferedValueLabel = "${message(code:'company.coupons.rules.purchasedOfferedValue.label')}";

	//Publishing
	var companyShowPublishingUrl = '${createLink(controller: 'esEnv', action:'show')}';
	var companyCreatePublishingUrl = '${createLink(controller: 'esEnv', action:'save')}';
	var companyUpdatePublishingUrl = '${createLink(controller: 'esEnv', action:'update')}';
	var companyDeletePublishingUrl = '${createLink(controller: 'esEnv', action:'delete')}';

	var companyPublishingPageUrl = "${resource(dir: 'admin', file:'_createCompanyPublishing.gsp')}";

	var companyPublishingTitleLabel = "${message(code:'company.publishing.title.label')}";
	var companyPublishingNameLabel = "${message(code:'company.publishing.name.label')}";
	var companyPublishingUrlLabel = "${message(code:'company.publishing.url.label')}";
	var companyPublishingActiveLabel = "${message(code:'company.publishing.active.label')}";
	var companyPublishingManualLabel = "${message(code:'company.publishing.manual.label')}";
	var companyPublishingUniqueErrorLabel = "${message(code:'company.publishing.unique.label')}";
	var companyPublishingUrlErrorLabel = "${message(code:'company.publishing.invalidUrl.label')}";

	//IBeacon
	var companyShowIBeaconUrl = '${createLink(controller: 'ibeacon', action:'list')}';
	var companySaveIBeaconUrl = '${createLink(controller: 'ibeacon', action:'save')}';
	var companyDeleteIBeaconUrl = '${createLink(controller: 'ibeacon', action:'delete')}';

	var companyIBeaconPageUrl = "${resource(dir: 'admin', file:'_createCompanyIBeacon.gsp')}";

	var companyIBeaconTitleLabel = "${message(code:'company.iBeacon.title.label')}";
	var companyIBeaconNameLabel = "${message(code:'company.iBeacon.name.label')}";
	var companyIBeaconUuidLabel = "${message(code:'company.iBeacon.uuid.label')}";
	var companyIBeaconStartDateLabel = "${message(code:'company.iBeacon.startDate.label')}";
	var companyIBeaconEndDateLabel = "${message(code:'company.iBeacon.endDate.label')}";
	var companyIBeaconActiveLabel = "${message(code:'company.iBeacon.active.label')}";
	var companyIBeaconUniqueErrorLabel = "${message(code:'company.iBeacon.unique.label')}";

	//Tags
	var companyShowTagUrl = '${createLink(controller: 'tag', action:'list')}';
	var companySaveTagUrl = '${createLink(controller: 'tag', action:'save')}';

	var companyTagNameLabel = "${message(code:'company.tag.name.label')}";
	var companyTagIBeaconLabel = "${message(code:'company.tag.iBeacon.label')}";

	//END COMPANY

	//----- Sales -----//
	var backOfficePageUrl = "${createLink(controller: 'sale', action:'initGetSalesByBuyer')}";
	var salesSearchByBuyerUrl = "${createLink(controller: 'sale', action:'getSalesByCriteria')}";
	var salesProductsSearchByCodeAndNameUrl = "${createLink(controller: 'sale', action:'getProducts')}";
	var salesSearchByProductAndDateUrl = "${createLink(controller: 'sale', action:'getSalesByProduct')}";
	var sellerLocation= 
	{
		city : "${request.seller?.location?.city}",
		road1 : "${request.seller?.location?.road1}",
		road2 : "${request.seller?.location?.road2}",
		road3 : "${request.seller?.location?.road3}",
		roadNum : "${request.seller?.location?.roadNum}",
		postalCode : "${request.seller?.location?.postalCode}",
		country:"${request.seller?.location?.countryCode}"
	};

	var sellerAdmin = ${request.seller.admin};
	var sellerCompanyId = ${request.seller.company.id};
	var sellerCompanyMapProvider = "${request.seller.company.mapProvider}";

	// hide username subnav menu after clicking an option
	function hideUsernameSubnav() {
		$("#user_name_div").parent().find("ul.subnav").hide();
	}
	
</r:script>

</head>
<body>
<content tag="header">
	<!-- header -->
	<div id="logo" style="float:left;">
		<img src="${resource(dir:'images',file:'ebiznext_logo.png')}" />
	</div>
	<jsec:isLoggedIn>
		<div id="user" align="right">
			<ul class="topnav">
				<li id="user_name_div">${request.user?.firstName}&nbsp;${request.user?.lastName}</li>
				<li>
					<ul class="subnav" style="display:none;">
						<li onclick="hideUsernameSubnav();"><a href="javascript:void(0)" onclick="partnerGetAdminPage(${request.user?.id});"><g:message code="seller.admin.link"/></a></li>
						<li onclick="hideUsernameSubnav();"><a href="javascript:void(0)" onclick="getBackOfficePage();"><g:message code="sales.admin.salesByBuyer" /></a></li>
						<li onclick="hideUsernameSubnav();"><a href="${createLink(controller:'social')}"><g:message code="seller.social.link" /></a></li>
						<li onclick="hideUsernameSubnav();"><a href="javascript:void(0);"><g:message code="default.support.label" /></a></li>
						<li onclick="hideUsernameSubnav();"><a href="${createLink(controller:'auth',action:'signOut')}" id="logout"><g:message code="default.logout.label" /></a></li>
					</ul>
				</li>
			</ul>
		</div>
		
		<div id="createProductMenu">
			<ul class="topnav">  
				<li id="createProductLnk"><label><g:message code="navigation.create.label" /></label></li>
			</ul>
		</div>
		<br/>
	</jsec:isLoggedIn>
</content> 
<!-- inner-content -->
<div id="searchForm"></div>
<div id="createProductDialog"></div>
<div id="calendarDialog"></div>
<div id="dialog"></div>
<div id="poiDialog" style="display:none;"></div>
<div id="poiPictureDialog" style="display:none; overflow: scroll;"></div>
<div id="pricingDialog"></div>
<div id="tourismProductDescriptionDialog"></div>
<div id="tourismPricingCreateDialog"></div>
<div id="tourismFeaturesCreateDialog"></div>
<div id="tourismPropertiesCreateDialog"></div>
<div id="tourismCalendarCreateDialog"></div>
<div id="tourismResourcesDialog"></div>
<div id="tourismSuggestionsDialog"></div>
<div id="shippingDialog"></div>
<div id="categoryDialog"></div>
<div id="brandDialog"></div>
<div id="items"></div>
<div id="catalogCreateDialog"></div>
<div id="categoryCreateDialog"></div>
<div id="categoryFeaturesDialog"></div>
<div id="categoryVariationsDialog"></div>
<div id="translationDialog"></div>
<table id="categoriesMain" class="categoriesMain">
	<tr>
		<td class="treeCol">
			<div class="tree">
				<div id="catalogList"></div>
				<div id="categoryTree" class="categoryTree"></div>
			</div>
		</td>
		<td>
			<div id="categoryDetails" class="categoryDetails"></div>
		</td>
	</tr>
</table>
<div id="sellerForm"></div>
<div id="taxRateDialog"></div>
<div id="shippingRuleDialog"></div>
<div id="companyBrandsDialog"></div>
<div id="companyCouponsDialog"></div>
<div id="companyCouponsRulesDialog"></div>
<div id="companyPublishingDialog"></div>
<div id="companyIBeaconDialog"></div>
<content tag="footer">
<!-- footer -->
<g:render template="/layouts/footer" />
</content>

<div id="poiInfoWindow" style="display:none; ">
	<div align="left" id="showPoiInfoDiv" style="padding: 5px; width:200px;">
		<span id="poiName_info"><b><g:message code="customer.event.poi.name.label" />:&nbsp;</b><span id="poiNameLabel"></span><br/></span>
		<span id="poiCountry_info"><b><g:message code="customer.event.poi.country.label" />:&nbsp;</b><span id="poiCountryLabel"></span><br/></span>
		<span id="poiCity_info"><b><g:message code="customer.event.poi.city.label" />:&nbsp;</b><span id="poiCityLabel"></span><br/></span>
		<span id="poiRoad_info"><b><g:message code="customer.event.poi.street.label" />:&nbsp;</b><span id="poiRoadLabel"></span><br/></span>
		<span id="poiPostalCode_info"><b><g:message code="customer.event.poi.postalcode.label" />:&nbsp;</b><span id="poiPostalCodeLabel"></span><br/></span>
		<span id="poiDesc_info"><b><g:message code="customer.event.poi.description.label" />:&nbsp;</b><span id="poiDescLabel"></span><br/></span>
	</div>
	<div class="spacer"></div>
	<div align="right" id="editPoiBtnDiv">
		<a onclick="openStreetMapEditPoiDialog()" id="editPoiBtn"><g:message code="default.button.edit.label" /></a>
	</div>
</div>

</body>
</html>
