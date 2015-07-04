import com.mogobiz.service.ElasticsearchService
import com.mogobiz.service.GoogleCategoryService
import com.mogobiz.service.GoogleService
import com.mogobiz.service.ProductService
import com.mogobiz.service.SanitizeUrlService
import com.mogobiz.service.TaxRateService
import grails.rest.render.json.JsonCollectionRenderer
import grails.rest.render.json.JsonRenderer

beans = {

    featureValueRenderer(JsonRenderer, com.mogobiz.store.domain.FeatureValue) {
        excludes = ['class']
    }
    featureValueCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.FeatureValue) {
        excludes = ['class']
    }
    warehouseRenderer(JsonRenderer, com.mogobiz.store.domain.Warehouse) {
        excludes = ['class']
    }
    warehouseCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Warehouse) {
        excludes = ['class']
    }
    priceRenderer(JsonRenderer, com.mogobiz.store.domain.Price) {
        excludes = ['class']
    }
    priceCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Price) {
        excludes = ['class']
    }
    customerProfileRenderer(JsonRenderer, com.mogobiz.store.domain.CustomerProfile) {
        excludes = ['class']
    }
    customerProfileCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.CustomerProfile) {
        excludes = ['class']
    }
    paymentDataRenderer(JsonRenderer, com.mogobiz.pay.domain.PaymentData) {
        excludes = ['class']
    }
    paymentDataCollectionRenderer(JsonCollectionRenderer, com.mogobiz.pay.domain.PaymentData) {
        excludes = ['class']
    }
    countryRenderer(JsonRenderer, com.mogobiz.store.domain.Country) {
        excludes = ['class']
    }
    countryCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Country) {
        excludes = ['class']
    }
    countryAdminRenderer(JsonRenderer, com.mogobiz.store.domain.CountryAdmin) {
        excludes = ['class']
    }
    countryAdminCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.CountryAdmin) {
        excludes = ['class']
    }
    poiTypeRenderer(JsonRenderer, com.mogobiz.geolocation.domain.PoiType) {
        excludes = ['class']
    }
    poiTypeCollectionRenderer(JsonCollectionRenderer, com.mogobiz.geolocation.domain.PoiType) {
        excludes = ['class']
    }
    locationRenderer(JsonRenderer, com.mogobiz.geolocation.domain.Location) {
        excludes = ['class']
    }
    locationCollectionRenderer(JsonCollectionRenderer, com.mogobiz.geolocation.domain.Location) {
        excludes = ['class']
    }
    roleRenderer(JsonRenderer, com.mogobiz.store.domain.Role) {
        excludes = ['class']
    }
    roleCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Role) {
        excludes = ['class']
    }
    externalAccountRenderer(JsonRenderer, com.mogobiz.store.domain.ExternalAccount) {
        excludes = ['class']
    }
    externalAccountCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.ExternalAccount) {
        excludes = ['class']
    }
    variationValueRenderer(JsonRenderer, com.mogobiz.store.domain.VariationValue) {
        excludes = ['class']
    }
    variationValueCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.VariationValue) {
        excludes = ['class']
    }
    ticketTypeRenderer(JsonRenderer, com.mogobiz.store.domain.TicketType) {
        excludes = ['class']
    }
    ticketTypeCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.TicketType) {
        excludes = ['class']
    }
    localTaxRateRenderer(JsonRenderer, com.mogobiz.store.domain.LocalTaxRate) {
        excludes = ['class']
    }
    localTaxRateCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.LocalTaxRate) {
        excludes = ['class']
    }
    brandRenderer(JsonRenderer, com.mogobiz.store.domain.Brand) {
        excludes = ['class']
    }
    brandCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Brand) {
        excludes = ['class']
    }
    intraDayPeriodRenderer(JsonRenderer, com.mogobiz.store.domain.IntraDayPeriod) {
        excludes = ['class']
    }
    intraDayPeriodCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.IntraDayPeriod) {
        excludes = ['class']
    }
    featureRenderer(JsonRenderer, com.mogobiz.store.domain.Feature) {
        excludes = ['class']
    }
    featureCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Feature) {
        excludes = ['class']
    }
    externalAuthLoginRenderer(JsonRenderer, com.mogobiz.store.domain.ExternalAuthLogin) {
        excludes = ['class']
    }
    externalAuthLoginCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.ExternalAuthLogin) {
        excludes = ['class']
    }
    bOCartRenderer(JsonRenderer, com.mogobiz.store.domain.BOCart) {
        excludes = ['class']
    }
    bOCartCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.BOCart) {
        excludes = ['class']
    }
    consumptionRenderer(JsonRenderer, com.mogobiz.store.domain.Consumption) {
        excludes = ['class']
    }
    consumptionCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Consumption) {
        excludes = ['class']
    }
    permissionRenderer(JsonRenderer, com.mogobiz.store.domain.Permission) {
        excludes = ['class']
    }
    permissionCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Permission) {
        excludes = ['class']
    }
    tagRenderer(JsonRenderer, com.mogobiz.store.domain.Tag) {
        excludes = ['class']
    }
    tagCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Tag) {
        excludes = ['class']
    }
    productRenderer(JsonRenderer, com.mogobiz.store.domain.Product) {
        excludes = ['class']
    }
    productCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Product) {
        excludes = ['class']
    }
    userRenderer(JsonRenderer, com.mogobiz.store.domain.User) {
        excludes = ['class']
    }
    userCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.User) {
        excludes = ['class']
    }
    stockCalendarRenderer(JsonRenderer, com.mogobiz.store.domain.StockCalendar) {
        excludes = ['class']
    }
    stockCalendarCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.StockCalendar) {
        excludes = ['class']
    }
    variationRenderer(JsonRenderer, com.mogobiz.store.domain.Variation) {
        excludes = ['class']
    }
    variationCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Variation) {
        excludes = ['class']
    }
    userPermissionRenderer(JsonRenderer, com.mogobiz.store.domain.UserPermission) {
        excludes = ['class']
    }
    userPermissionCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.UserPermission) {
        excludes = ['class']
    }
    eventPeriodSaleRenderer(JsonRenderer, com.mogobiz.store.domain.EventPeriodSale) {
        excludes = ['class']
    }
    eventPeriodSaleCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.EventPeriodSale) {
        excludes = ['class']
    }
    bOTicketTypeRenderer(JsonRenderer, com.mogobiz.store.domain.BOTicketType) {
        excludes = ['class']
    }
    bOTicketTypeCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.BOTicketType) {
        excludes = ['class']
    }
    suggestionRenderer(JsonRenderer, com.mogobiz.store.domain.Suggestion) {
        excludes = ['class']
    }
    suggestionCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Suggestion) {
        excludes = ['class']
    }
    shippingRenderer(JsonRenderer, com.mogobiz.store.domain.Shipping) {
        excludes = ['class']
    }
    shippingCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Shipping) {
        excludes = ['class']
    }
    rolePermissionRenderer(JsonRenderer, com.mogobiz.store.domain.RolePermission) {
        excludes = ['class']
    }
    rolePermissionCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.RolePermission) {
        excludes = ['class']
    }
    resourceRenderer(JsonRenderer, com.mogobiz.store.domain.Resource) {
        excludes = ['class']
    }
    resourceCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Resource) {
        excludes = ['class']
    }
    product2ResourceRenderer(JsonRenderer, com.mogobiz.store.domain.Product2Resource) {
        excludes = ['class']
    }
    product2ResourceCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Product2Resource) {
        excludes = ['class']
    }
    bOProductRenderer(JsonRenderer, com.mogobiz.store.domain.BOProduct) {
        excludes = ['class']
    }
    bOProductCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.BOProduct) {
        excludes = ['class']
    }
    companyRenderer(JsonRenderer, com.mogobiz.store.domain.Company) {
        excludes = ['class']
    }
    companyCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Company) {
        excludes = ['class']
    }
    datePeriodRenderer(JsonRenderer, com.mogobiz.store.domain.DatePeriod) {
        excludes = ['class']
    }
    datePeriodCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.DatePeriod) {
        excludes = ['class']
    }
    bOCartItemRenderer(JsonRenderer, com.mogobiz.store.domain.BOCartItem) {
        excludes = ['class']
    }
    bOCartItemCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.BOCartItem) {
        excludes = ['class']
    }
    catalogRenderer(JsonRenderer, com.mogobiz.store.domain.Catalog) {
        excludes = ['class']
    }
    catalogCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Catalog) {
        excludes = ['class']
    }
    categoryRenderer(JsonRenderer, com.mogobiz.store.domain.Category) {
        excludes = ['class']
    }
    categoryCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Category) {
        excludes = ['class']
    }
    translationRenderer(JsonRenderer, com.mogobiz.store.domain.Translation) {
        excludes = ['class']
    }
    translationCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Translation) {
        excludes = ['class']
    }
    albumRenderer(JsonRenderer, com.mogobiz.store.domain.Album) {
        excludes = ['class']
    }
    albumCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Album) {
        excludes = ['class']
    }
    googleContentRenderer(JsonRenderer, com.mogobiz.store.domain.GoogleContent) {
        excludes = ['class']
    }
    googleContentCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.GoogleContent) {
        excludes = ['class']
    }
    taxRateRenderer(JsonRenderer, com.mogobiz.store.domain.TaxRate) {
        excludes = ['class']
    }
    taxRateCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.TaxRate) {
        excludes = ['class']
    }
    couponRenderer(JsonRenderer, com.mogobiz.store.domain.Coupon) {
        excludes = ['class']
    }
    couponCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Coupon) {
        excludes = ['class']
    }
    reductionRuleRenderer(JsonRenderer, com.mogobiz.store.domain.ReductionRule) {
        excludes = ['class']
    }
    reductionRuleCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.ReductionRule) {
        excludes = ['class']
    }
    esEnvRenderer(JsonRenderer, com.mogobiz.store.domain.EsEnv) {
        excludes = ['class']
    }
    esEnvCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.EsEnv) {
        excludes = ['class']
    }
    ibeaconRenderer(JsonRenderer, com.mogobiz.store.domain.Ibeacon) {
        excludes = ['class']
    }
    ibeaconCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Ibeacon) {
        excludes = ['class']
    }
    googleCategoryRenderer(JsonRenderer, com.mogobiz.store.domain.GoogleCategory) {
        excludes = ['class']
    }
    googleCategoryCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.GoogleCategory) {
        excludes = ['class']
    }
    googleEnvRenderer(JsonRenderer, com.mogobiz.store.domain.GoogleEnv) {
        excludes = ['class']
    }
    googleEnvCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.GoogleEnv) {
        excludes = ['class']
    }
    googleVariationMappingRenderer(JsonRenderer, com.mogobiz.store.domain.GoogleVariationMapping) {
        excludes = ['class']
    }
    googleVariationMappingCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.GoogleVariationMapping) {
        excludes = ['class']
    }
    googleVariationValueRenderer(JsonRenderer, com.mogobiz.store.domain.GoogleVariationValue) {
        excludes = ['class']
    }
    googleVariationValueCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.GoogleVariationValue) {
        excludes = ['class']
    }
    googleVariationTypeRenderer(JsonRenderer, com.mogobiz.store.domain.GoogleVariationType) {
        excludes = ['class']
    }
    googleVariationTypeCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.GoogleVariationType) {
        excludes = ['class']
    }
    tokenRenderer(JsonRenderer, com.mogobiz.store.domain.Token) {
        excludes = ['class']
    }
    tokenCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Token) {
        excludes = ['class']
    }
    userPropertyRenderer(JsonRenderer, com.mogobiz.store.domain.UserProperty) {
        excludes = ['class']
    }
    userPropertyCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.UserProperty) {
        excludes = ['class']
    }
    brandPropertyRenderer(JsonRenderer, com.mogobiz.store.domain.BrandProperty) {
        excludes = ['class']
    }
    brandPropertyCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.BrandProperty) {
        excludes = ['class']
    }
    companyPropertyRenderer(JsonRenderer, com.mogobiz.store.domain.CompanyProperty) {
        excludes = ['class']
    }
    companyPropertyCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.CompanyProperty) {
        excludes = ['class']
    }
    productPropertyCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.ProductProperty){
        excludes = ['class']
    }
    productPropertyCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.ProductProperty){
        excludes = ['class']
    }
    shippingRuleRenderer(JsonRenderer, com.mogobiz.store.domain.ShippingRule){
        excludes = ['class']
    }
    shippingRuleCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.ShippingRule){
        excludes = ['class']
    }
    bODeliveryRenderer(JsonRenderer, com.mogobiz.store.domain.BODelivery){
        excludes = ['class']
    }
    bODeliveryCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.BODelivery){
        excludes = ['class']
    }
    bOReturnRenderer(JsonRenderer, com.mogobiz.store.domain.BOReturn){
        excludes = ['class']
    }
    bOReturnCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.BOReturn){
        excludes = ['class']
    }
    bOReturnedItemRenderer(JsonRenderer, com.mogobiz.store.domain.BOReturnedItem){
        excludes = ['class']
    }
    bOReturnedItemCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.BOReturnedItem){
        excludes = ['class']
    }
    bOTransactionRenderer(JsonRenderer, com.mogobiz.pay.domain.BOTransaction){
        excludes = ['class']
    }
    bOTransactionCollectionRenderer(JsonCollectionRenderer, com.mogobiz.pay.domain.BOTransaction){
        excludes = ['class']
    }
    bOAccountRenderer(JsonRenderer, com.mogobiz.pay.domain.BOAccount){
        excludes = ['class']
    }
    bOAccountCollectionRenderer(JsonCollectionRenderer, com.mogobiz.pay.domain.BOAccount){
        excludes = ['class']
    }

    profileRenderer(JsonRenderer, com.mogobiz.store.domain.Profile){
        excludes = ['class']
    }
    profileCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Profile){
        excludes = ['class']
    }
    profilePermissionRenderer(JsonRenderer, com.mogobiz.store.domain.ProfilePermission){
        excludes = ['class']
    }
    profilePermissionCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.ProfilePermission){
        excludes = ['class']
    }
    bOTransactionLogRenderCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.BOTransactionLogRender){
        excludes = ['class']
    }

    loadBeans("classpath:*defaultResources.groovy")
/*
	messageSource(com.mogobiz.i18n.SiteMessageSource)
	{ messageBundleMessageSource = ref("messageBundleMessageSource") }
	messageBundleMessageSource(org.codehaus.groovy.grails.context.support.PluginAwareResourceBundleMessageSource) {
		basenames = [
			"WEB-INF/grails-app/i18n/messages",
			"WEB-INF/grails-app/i18n/cmd_errors"
		]
	}
	 customPropertyEditorRegistrar(com.mogobiz.utils.CustomPropertyEditorRegistrar) {
	 dateEditor = { com.mogobiz.utils.CustomDateEditor e ->
	 formats = [
	 'yyyy/MM/dd',
	 'yy-MM-dd HH:mm',
	 'yy-MM-dd',
	 'MM/dd/yy HH:mm',
	 'MM/dd/yy'
	 ]
	 allowEmpty = true
	 }
	 }
	 */

    credentialMatcher(org.apache.shiro.authc.credential.Sha256CredentialsMatcher)

    calendarConverter com.mogobiz.grails.CalendarValueConverter
    defaultDateConverter com.mogobiz.grails.DateValueConverter

    sanitizeUrlService(SanitizeUrlService)
    taxRateService(TaxRateService)

    productService(ProductService) {
        sanitizeUrlService = ref("sanitizeUrlService")
        taxRateService = ref("taxRateService")
    }
    productRender(com.mogobiz.store.domain.ProductRender) {
        productService = ref("productService")
        taxRateService = ref("taxRateService")
    }
    suggestionRender(com.mogobiz.store.domain.SuggestionRender) {
        productService = ref("productService")
    }
    googleCategoryService (GoogleCategoryService)
    elasticsearchService (ElasticsearchService){
        grailsApplication = ref('grailsApplication')
    }
    embeddedElasticSearchService (bootstrap.EmbeddedElasticSearchService)
    googleService (GoogleService)

    featureValueRender (com.mogobiz.store.domain.FeatureValueRender)
    featureValueValidation (com.mogobiz.store.domain.FeatureValueValidation)
    warehouseRender (com.mogobiz.store.domain.WarehouseRender)
    warehouseValidation (com.mogobiz.store.domain.WarehouseValidation)
    priceRender (com.mogobiz.store.domain.PriceRender)
    priceValidation (com.mogobiz.store.domain.PriceValidation)
    customerProfileRender (com.mogobiz.store.domain.CustomerProfileRender)
    customerProfileValidation (com.mogobiz.store.domain.CustomerProfileValidation)
    paymentDataValidation (com.mogobiz.pay.domain.PaymentDataValidation)
    paymentDataRender (com.mogobiz.pay.domain.PaymentDataRender)
    countryAdminValidation (com.mogobiz.store.domain.CountryAdminValidation)
    countryAdminRender (com.mogobiz.store.domain.CountryAdminRender)
    countryValidation (com.mogobiz.store.domain.CountryValidation)
    countryRender (com.mogobiz.store.domain.CountryRender)
    poiTypeValidation (com.mogobiz.geolocation.domain.PoiTypeValidation)
    poiTypeRender (com.mogobiz.geolocation.domain.PoiTypeRender)
    locationValidation (com.mogobiz.geolocation.domain.LocationValidation)
    locationRender (com.mogobiz.geolocation.domain.LocationRender)
    poiValidation (com.mogobiz.geolocation.domain.PoiValidation)
    poiRender (com.mogobiz.geolocation.domain.PoiRender)
    roleValidation (com.mogobiz.store.domain.RoleValidation)
    roleRender (com.mogobiz.store.domain.RoleRender)
    externalAccountValidation (com.mogobiz.store.domain.ExternalAccountValidation)
    externalAccountRender (com.mogobiz.store.domain.ExternalAccountRender)
    variationValueValidation (com.mogobiz.store.domain.VariationValueValidation)
    variationValueRender (com.mogobiz.store.domain.VariationValueRender)
    sellerValidation (com.mogobiz.store.domain.SellerValidation)
    sellerRender (com.mogobiz.store.domain.SellerRender)
    ticketTypeValidation (com.mogobiz.store.domain.TicketTypeValidation)
    ticketTypeRender (com.mogobiz.store.domain.TicketTypeRender)
    localTaxRateValidation (com.mogobiz.store.domain.LocalTaxRateValidation)
    localTaxRateRender (com.mogobiz.store.domain.LocalTaxRateRender)
    brandValidation (com.mogobiz.store.domain.BrandValidation)
    brandRender (com.mogobiz.store.domain.BrandRender)
    intraDayPeriodValidation (com.mogobiz.store.domain.IntraDayPeriodValidation)
    intraDayPeriodRender (com.mogobiz.store.domain.IntraDayPeriodRender)
    featureValidation (com.mogobiz.store.domain.FeatureValidation)
    featureRender (com.mogobiz.store.domain.FeatureRender)
    externalAuthLoginValidation (com.mogobiz.store.domain.ExternalAuthLoginValidation)
    externalAuthLoginRender (com.mogobiz.store.domain.ExternalAuthLoginRender)
    BOCartValidation (com.mogobiz.store.domain.BOCartValidation)
    BOCartRender (com.mogobiz.store.domain.BOCartRender)
    consumptionValidation (com.mogobiz.store.domain.ConsumptionValidation)
    consumptionRender (com.mogobiz.store.domain.ConsumptionRender)
    permissionValidation (com.mogobiz.store.domain.PermissionValidation)
    permissionRender (com.mogobiz.store.domain.PermissionRender)
    tagValidation (com.mogobiz.store.domain.TagValidation)
    tagRender (com.mogobiz.store.domain.TagRender)
    productValidation (com.mogobiz.store.domain.ProductValidation)
    userValidation (com.mogobiz.store.domain.UserValidation)
    userRender (com.mogobiz.store.domain.UserRender)
    stockCalendarValidation (com.mogobiz.store.domain.StockCalendarValidation)
    stockCalendarRender (com.mogobiz.store.domain.StockCalendarRender)
    variationValidation (com.mogobiz.store.domain.VariationValidation)
    variationRender (com.mogobiz.store.domain.VariationRender)
    userPermissionValidation (com.mogobiz.store.domain.UserPermissionValidation)
    userPermissionRender (com.mogobiz.store.domain.UserPermissionRender)
    eventPeriodSaleValidation (com.mogobiz.store.domain.EventPeriodSaleValidation)
    eventPeriodSaleRender (com.mogobiz.store.domain.EventPeriodSaleRender)
    BOTicketTypeValidation (com.mogobiz.store.domain.BOTicketTypeValidation)
    BOTicketTypeRender (com.mogobiz.store.domain.BOTicketTypeRender)
    suggestionValidation (com.mogobiz.store.domain.SuggestionValidation)
    shippingValidation (com.mogobiz.store.domain.ShippingValidation)
    shippingRender (com.mogobiz.store.domain.ShippingRender)
    rolePermissionValidation (com.mogobiz.store.domain.RolePermissionValidation)
    rolePermissionRender (com.mogobiz.store.domain.RolePermissionRender)
    resourceValidation (com.mogobiz.store.domain.ResourceValidation)
    resourceRender (com.mogobiz.store.domain.ResourceRender)
    product2ResourceValidation (com.mogobiz.store.domain.Product2ResourceValidation)
    product2ResourceRender (com.mogobiz.store.domain.Product2ResourceRender)
    BOProductValidation (com.mogobiz.store.domain.BOProductValidation)
    BOProductRender (com.mogobiz.store.domain.BOProductRender)
    companyValidation (com.mogobiz.store.domain.CompanyValidation)
    companyRender (com.mogobiz.store.domain.CompanyRender)
    datePeriodValidation (com.mogobiz.store.domain.DatePeriodValidation)
    datePeriodRender (com.mogobiz.store.domain.DatePeriodRender)
    BOCartItemValidation (com.mogobiz.store.domain.BOCartItemValidation)
    BOCartItemRender (com.mogobiz.store.domain.BOCartItemRender)
    catalogValidation (com.mogobiz.store.domain.CatalogValidation)
    catalogRender (com.mogobiz.store.domain.CatalogRender)
    categoryValidation (com.mogobiz.store.domain.CategoryValidation)
    categoryRender (com.mogobiz.store.domain.CategoryRender)
    translationValidation (com.mogobiz.store.domain.TranslationValidation)
    translationRender (com.mogobiz.store.domain.TranslationRender)
    albumValidation (com.mogobiz.store.domain.AlbumValidation)
    albumRender (com.mogobiz.store.domain.AlbumRender)
    googleContentValidation (com.mogobiz.store.domain.GoogleContentValidation)
    googleContentRender (com.mogobiz.store.domain.GoogleContentRender)
    taxRateValidation (com.mogobiz.store.domain.TaxRateValidation)
    taxRateRender (com.mogobiz.store.domain.TaxRateRender)
    couponValidation (com.mogobiz.store.domain.CouponValidation)
    couponRender (com.mogobiz.store.domain.CouponRender)
    reductionRuleValidation (com.mogobiz.store.domain.ReductionRuleValidation)
    reductionRuleRender (com.mogobiz.store.domain.ReductionRuleRender)
    esEnvValidation (com.mogobiz.store.domain.EsEnvValidation)
    esEnvRender (com.mogobiz.store.domain.EsEnvRender)
    ibeaconValidation (com.mogobiz.store.domain.IbeaconValidation)
    ibeaconRender (com.mogobiz.store.domain.IbeaconRender)
    googleCategoryValidation (com.mogobiz.store.domain.GoogleCategoryValidation)
    googleCategoryRender (com.mogobiz.store.domain.GoogleCategoryRender)
    googleEnvValidation (com.mogobiz.store.domain.GoogleEnvValidation)
    googleEnvRender (com.mogobiz.store.domain.GoogleEnvRender)
    googleVariationMappingValidation (com.mogobiz.store.domain.GoogleVariationMappingValidation)
    googleVariationMappingRender (com.mogobiz.store.domain.GoogleVariationMappingRender)
    googleVariationValueValidation (com.mogobiz.store.domain.GoogleVariationValueValidation)
    googleVariationValueRender (com.mogobiz.store.domain.GoogleVariationValueRender)
    googleVariationTypeValidation (com.mogobiz.store.domain.GoogleVariationTypeValidation)
    googleVariationTypeRender (com.mogobiz.store.domain.GoogleVariationTypeRender)
    tokenValidation (com.mogobiz.store.domain.TokenValidation)
    tokenRender (com.mogobiz.store.domain.TokenRender)
    userPropertyValidation (com.mogobiz.store.domain.UserPropertyValidation)
    userPropertyRender (com.mogobiz.store.domain.UserPropertyRender)
    brandPropertyValidation (com.mogobiz.store.domain.BrandPropertyValidation)
    brandPropertyRender (com.mogobiz.store.domain.BrandPropertyRender)
    companyPropertyValidation (com.mogobiz.store.domain.CompanyPropertyValidation)
    companyPropertyRender (com.mogobiz.store.domain.CompanyPropertyRender)
    productPropertyValidation (com.mogobiz.store.domain.ProductPropertyValidation)
    productPropertyRender (com.mogobiz.store.domain.ProductPropertyRender)
    shippingRuleValidation (com.mogobiz.store.domain.ShippingRuleValidation)
    shippingRuleRender (com.mogobiz.store.domain.ShippingRuleRender)
    profileValidation (com.mogobiz.store.domain.ProfileValidation)
    profileRender (com.mogobiz.store.domain.ProfileRender)
    profilePermissionValidation (com.mogobiz.store.domain.ProfilePermissionValidation)
    profilePermissionRender (com.mogobiz.store.domain.ProfilePermissionRender)
    BOTransactionLogRender (com.mogobiz.store.domain.BOTransactionLogRender)
    BOTransactionLogValidation (com.mogobiz.store.domain.BOTransactionLogValidation)

    BODeliveryValidation (com.mogobiz.store.domain.BODeliveryValidation)
    BODeliveryRender (com.mogobiz.store.domain.BODeliveryRender)

    BOReturnValidation (com.mogobiz.store.domain.BOReturnValidation)
    BOReturnRender (com.mogobiz.store.domain.BOReturnRender)

    BOReturnedItemValidation (com.mogobiz.store.domain.BOReturnedItemValidation)
    BOReturnedItemRender (com.mogobiz.store.domain.BOReturnedItemRender)

    permissionTypeConverter (com.mogobiz.utils.PermissionTypeConverter)
}
