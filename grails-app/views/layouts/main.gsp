<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr" xml:lang="fr">
<head>
<title>
<g:layoutTitle default="Mogobiz" /></title>
<r:layoutResources/>

<link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />

<r:script>

var companyCountriesUrl = "${createLink(controller: 'country', action:'countries')}";

//----------------------- messages.properties Labels -----------------------//
//default
var createLabel = "${message(code:'default.button.create.label')}";
var editLabel = "${message(code:'default.button.edit.label')}";
var updateLabel = "${message(code:'default.button.update.label')}";
var deleteLabel = "${message(code:'default.button.delete.label')}";
var cancelLabel = "${message(code:'default.button.cancel.label')}";
var closeLabel = "${message(code:'default.button.close.label')}";
var importLabel = "${message(code:'default.button.import.label')}";
var okLabel = "${message(code:'default.button.ok.label')}";
var resetPasswordLabel = "${message(code:'default.button.resetPassword.label')}";
var defaultSearchLabel = "${message(code:'default.search.label')}";
var defaultNameLabel = "${message(code:'default.name.label')}";
var defaultTypeLabel = "${message(code:'package.type.label')}";
var fieldsRequiredMessageLabel = "${message(code:'default.message.fields.required.label')}";
var fieldsInvalidMessageLabel = "${message(code:'default.message.fields.invalid.label')}";
var fieldsTooLongMessageLabel = "${message(code:'default.message.fields.tooLong.label')}";
var multiselectNoneSelectedTextLabel = "${message(code:'multiselect.noneSelectedText.label')}";
var multiselectNoneSelectedTextDisabledLabel = "${message(code:'multiselect.noneSelectedText.disabled.label')}";
var fancyBoxErrorMessage_1 = "${message(code:'default.fancybox.error1.message')}";
var fancyBoxErrorMessage_2 = "${message(code:'default.fancybox.error2.message')}";

//company labels
var createCompanyLabel = "${message(code:'company.new.label')}";
var companyNameExistLabel = "${message(code:'company.mane.exist.label')}";

//company General
var companyGeneralErrors_requiredStoreNameLabel = "${message(code:'company.general.errors.requiredStoreName.label')}";
var companyGeneralErrors_invalidStoreNameLabel = "${message(code:'company.general.errors.invalidStoreName.label')}";
var companyGeneralErrors_requiredStoreCodeLabel = "${message(code:'company.general.errors.requiredStoreCode.label')}";
var companyGeneralErrors_invalidStoreCodeLabel = "${message(code:'company.general.errors.invalidStoreCode.label')}";
var companyGeneralErrors_invalidWebsiteLabel = "${message(code:'company.general.errors.invalidWebsite.label')}";
var companyGeneralErrors_requiredCountryLabel = "${message(code:'company.general.errors.requiredCountry.label')}";
var companyGeneralErrors_invalidPhoneNumberLabel = "${message(code:'company.general.errors.invalidPhoneNumber.label')}";
var companyGeneralErrors_requiredEmailLabel = "${message(code:'company.general.errors.requiredEmail.label')}";
var companyGeneralErrors_invalidEmailLabel = "${message(code:'company.general.errors.invalidEmail.label')}";

//company Shipping
var companyShippingErrors_requiredCountryLabel = "${message(code:'company.shipping.errors.requiredCountry.label')}";
var companyShippingErrors_invalidHandlingTimeLabel = "${message(code:'company.shipping.errors.invalidHandlingTime.label')}";
var companyShippingErrors_invalidReturnPolicyLabel = "${message(code:'company.shipping.errors.invalidReturnPolicy.label')}";

var companyShippingRule_TitleLabel = "${message(code:'company.shipping.rule.title.label')}";
var companyShippingRuleErrors_uniqueCountryCode = "${message(code:'company.shipping.rule.errors.uniqueCountryCode.label')}";
var companyShippingRuleErrors_invalidPrice = "${message(code:'company.shipping.rule.errors.invalidPrice.label')}";
var companyShippingRuleErrors_invalidMinAmount = "${message(code:'company.shipping.rule.errors.minAmount.label')}";
var companyShippingRuleErrors_invalidMaxAmount = "${message(code:'company.shipping.rule.errors.maxAmount.label')}";
var companyShippingRuleErrors_invalidMinAmountMaxAmount = "${message(code:'company.shipping.rule.errors.minAmountMaxAmount.label')}";

//company Tax 
var companyTax_createLabel = "${message(code:'company.tax.create.label')}";
var companyTax_countryLabel = "${message(code:'company.tax.country.label')}";
var companyTax_taxRateLabel = "${message(code:'company.tax.taxRate.label')}";
var companyTax_activeLabel = "${message(code:'company.tax.active.label')}";
var companyTaxErrors_requiredCountryLabel = "${message(code:'company.tax.errors.requiredCountry.label')}";
var companyTaxErrors_requiredTaxRateLabel = "${message(code:'company.tax.errors.requiredTaxRate.label')}";
var companyTaxErrors_invalidTaxRateLabel = "${message(code:'company.tax.errors.invalidTaxRate.label')}";

//company payment
var companyPaymentErrors_requiredCurrencyLabel = "${message(code:'company.payment.errors.requiredCurrency.label')}";

//company sellers
var companySellers_nameLabel = "${message(code:'company.sellers.name.label')}";
var companySellers_emailLabel = "${message(code:'company.sellers.email.label')}";
var companySellers_adminLabel = "${message(code:'company.sellers.admin.label')}";
var companySellers_sellerLabel = "${message(code:'company.sellers.seller.label')}";
var companySellers_validatorLabel = "${message(code:'company.sellers.validator.label')}";
var companySellers_activeLabel = "${message(code:'company.sellers.active.label')}";
var companySellersErrors_requiredFirstNameLabel = "${message(code:'company.sellers.errors.requiredFirstName.label')}";
var companySellersErrors_requiredLastNameLabel = "${message(code:'company.sellers.errors.requiredLastName.label')}";
var companySellersErrors_requiredCompaniesLabel = "${message(code:'company.sellers.errors.requiredCompanies.label')}";
var companySellersErrors_requiredEmailLabel = "${message(code:'company.sellers.errors.requiredEmail.label')}";
var companySellersErrors_invalidEmailLabel = "${message(code:'company.sellers.errors.invalidEmail.label')}";
var companySellersErrors_confirmEmailLabel = "${message(code:'company.sellers.errors.confirmEmail.label')}";
var companySellersErrors_emailsDontMatchLabel = "${message(code:'company.sellers.errors.emailsDontMatch.label')}";
var companySellersErrors_emailMustBeUniqueLabel = "${message(code:'company.sellers.errors.emailMustBeUnique.label')}";
var companySellers_passwordResetSuccessLabel = "${message(code:'company.sellers.passwordResetSuccess.label')}";

//----------------------------- Partner Labels -----------------------------//
//Product labels
var createProductLabel = "${message(code:'product.create.product.label')}";
var productCodeExistLabel = "${message(code:'product.productCodeExist.label')}";
var productFreePriceLabel = "${message(code:'product.free.price.label')}";

var allLabel = "${message(code:'default.all.label')}";
var priceLabel = "${message(code:'default.price.label')}";
var dateLabel = "${message(code:'default.date.label')}";
var nameLabel = "${message(code:'default.name.label')}";
var ascendingLabel = "${message(code:'default.ascending.label')}";
var descendingLabel = "${message(code:'default.descending.label')}";

var productXtypeServiceLabel = "${message(code:'product.xtype.service.label')}";
var productXtypePhysicalLabel = "${message(code:'product.xtype.physical.label')}";
var productXtypeDownloadableLabel = "${message(code:'product.xtype.downloadable.label')}";
var productActiveLabel = "${message(code:'product.active.label')}";
var productInActiveLabel = "${message(code:'product.inactive.label')}";

//description labels
var descriptionTitleLabel = "${message(code:'product.description.label')}";
var brandTitleLabel = "${message(code:'brand.title.label')}";
var brandNameLabel = "${message(code:'brand.BrandNameLabel.label')}";
var brandURLLabel = "${message(code:'brand.BrandURLLabel.label')}";
var brandHideLabel = "${message(code:'brand.BrandHideLabel.label')}";
var brandComboTitle = "${message(code:'brand.comboTitle.label')}";
var categoryComboTitle = "${message(code:'category.comboTitle.label')}";

//shipping labels
var shippingTitleLabel = "${message(code:'shipping.title.label')}";
var shippingNoPolicy = "${message(code:'shipping.nopolicy.label')}";
var shippingNameLabel = "${message(code:'shipping.name.label')}";
var shippingAmountLabel = "${message(code:'shipping.amount.label')}";
var shippingSizeLabel = "${message(code:'shipping.size.label')}";

// properties labels
var tourismPropertiesTitleLabel = "${message(code:'properties.propertiesAdd.title')}";
var tourismPropertiesNameLabel = "${message(code:'properties.name.label')}";
var tourismPropertiesValueLabel = "${message(code:'properties.value.label')}";

// features labels
var tourismFeaturesTitleLabel = "${message(code:'features.featuresAdd.title')}";
var featuresUniqueErrorLabel = "${message(code:'features.error.unique.label')}";

//tourismPricing labels
var pricingTitleLabel = "${message(code:'pricing.pricetitle.label')}";
var tourismPricing_ticketType_label = "${message(code:'tourismPricing.ticketType.label')}";
var tourismPricing_ticketPrice_label = "${message(code:'tourismPricing.ticketPrice.label')}";
var tourismPricing_ticketStock_label = "${message(code:'tourismPricing.ticketStock.label')}";
var tourismPricing_startDate_label = "${message(code:'tourismPricing.startDate.label')}";
var tourismPricing_endDate_label = "${message(code:'tourismPricing.endDate.label')}";
var tourismPricingErrors_ticketTypeUniqueLabel = "${message(code:'tourismPricing.errors.ticketTypeUnique.label')}";
var tourismPricingErrors_insufficientStockLabel = "${message(code:'tourismPricing.errors.insufficientStock.label')}";
var tourismPricingErrors_maxMustBeGreaterThanMin_label = "${message(code:'tourismPricing.errors.maxMustBeGreaterThanMin.label')}";
var tourismPricingErrors_deleteSold_label = "${message(code:'tourismPricing.errors.deleteSold.label')}";

//tourismCalendar labels
var calendarComboTicketValidityTitle = "${message(code:'product.calendar.select.nonselected')}";
var calendarTitleLabel = "${message(code:'calendar.event.title.label')}";
var calendarMondaySymbolLabel = "${message(code:'calendar.mondaySymbol.label')}";
var calendarTuesdaySymbolLabel = "${message(code:'calendar.tuesdaySymbol.label')}";
var calendarWednesdaySymbolLabel = "${message(code:'calendar.wednesdaySymbol.label')}";
var calendarThursdaySymbolLabel = "${message(code:'calendar.thursdaySymbol.label')}";
var calendarFridaySymbolLabel = "${message(code:'calendar.fridaySymbol.label')}";
var calendarSaturdaySymbolLabel = "${message(code:'calendar.saturdaySymbol.label')}";
var calendarSundaySymbolLabel = "${message(code:'calendar.sundaySymbol.label')}";
var tourismCalendar_startDate_label = "${message(code:'tourismCalendar.startDate.label')}";
var tourismCalendar_endDate_label = "${message(code:'tourismCalendar.endDate.label')}";
var tourismCalendar_startTime_label = "${message(code:'tourismCalendar.startTime.label')}";
var tourismCalendar_endTime_label = "${message(code:'tourismCalendar.endTime.label')}";
var tourismCalendarErrors_startDateBeforeEndDate_label = "${message(code:'tourismCalendar.errors.startDateBeforeEndDate.label')}";
var tourismCalendarErrors_startTimeBeforeEndTime_label = "${message(code:'tourismCalendar.errors.startTimeBeforeEndTime.label')}";
var tourismCalendarErrors_selectWeek_label = "${message(code:'tourismCalendar.errors.selectWeek.label')}";

//Direction labels
var addressNotFound_label = "${message(code:'poi.addressNotFound.label')}";
var contextMenu_create_label = "${message(code:'poi.contextMenu.create.label')}";
var contextMenu_zoomIn_label = "${message(code:'poi.contextMenu.zoomIn.label')}";
var contextMenu_zoomOut_label = "${message(code:'poi.contextMenu.zoomOut.label')}";
var contextMenu_center_label = "${message(code:'poi.contextMenu.center.label')}";
var poiCreate_label = "${message(code:'poi.create.label')}";
var poiEdit_label = "${message(code:'poi.edit.label')}";
var poiSelectIcon_label = "${message(code:'poi.selectIcon.label')}";
var poiErrors_requiredName_label = "${message(code:'poi.errors.requiredName.label')}";
var poiErrors_requiredAddress_label = "${message(code:'poi.errors.requiredAddress.label')}";
var poiErrors_longDescription_label = "${message(code:'poi.errors.longDescription.label')}";

//tourismSuggestions Labels
var tourismSuggestionsAddButtonLabel = "${message(code:'tourismSuggestions.addButton.label')}";
var tourismSuggestionsProductNameLabel = "${message(code:'tourismSuggestions.productName.label')}";
var tourismSuggestionsDiscountLabel = "${message(code:'tourismSuggestions.discount.label')}";
var tourismSuggestionsRequiredLabel = "${message(code:'tourismSuggestions.required.label')}";

//Sales Labels
var saleBuyerLoginLabel= "${message(code:'sale.buyer.login')}";
var saleCodeLabel= "${message(code:'sale.buyer.code')}";
var buyerStartDateLabel = "${message(code:'buyer.startDate')}";
var buyerEndDateLabel = "${message(code:'buyer.endDate')}";
var salePriceLabel= "${message(code:'sale.price')}";
var saleStartLabel= "${message(code:'sale.start')}";
var saleStatusLabel= "${message(code:'sale.status')}";
var saleProductLabel= "${message(code:'sale.product')}";
var saleQuantityLabel= "${message(code:'sale.quantity')}";

</r:script>

<g:layoutHead />
</head>
<body>
	<div id="container" class="group">
		<div id="header" class="group">
			<g:pageProperty name="page.header" />
		</div>
		<div id="main" class="group">
			<div id="content">
				<div id="inner-content">
					<g:layoutBody />
			        <r:layoutResources/>
				</div>
			</div>
		</div>
		<br class="clear" />
	</div>
	<div id="footer">
		<g:pageProperty name="page.footer" />
	</div>
	
</body>
</html>