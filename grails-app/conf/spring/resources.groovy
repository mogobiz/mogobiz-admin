import com.mogobiz.service.TrackingService
import grails.rest.render.json.JsonCollectionRenderer
import grails.rest.render.json.JsonRenderer

beans = {

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
    eventRenderer(JsonRenderer, com.mogobiz.store.domain.Event) {
        excludes = ['class']
    }
    eventCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.Event) {
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
    uuidDataRenderer(JsonRenderer, com.mogobiz.store.domain.UuidData) {
        excludes = ['class']
    }
    uuidDataCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.UuidData) {
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
    reductionSoldRenderer(JsonRenderer, com.mogobiz.store.domain.ReductionSold) {
        excludes = ['class']
    }
    reductionSoldCollectionRenderer(JsonCollectionRenderer, com.mogobiz.store.domain.ReductionSold) {
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

    sanitizeUrlService(com.mogobiz.service.SanitizeUrlService)
    rateService(com.mogobiz.service.RateService)
    taxRateService(com.mogobiz.service.TaxRateService)
    cookieService(com.dalew.CookieService)
    trackingService(TrackingService) {
        cookieService = ref("cookieService")
    }
    uuidDataService(com.mogobiz.service.UuidDataService) {
        trackingService = ref("trackingService")
    }
    productService(com.mogobiz.service.ProductService) {
        sanitizeUrlService = ref("sanitizeUrlService")
        rateService = ref("rateService")
        taxRateService = ref("taxRateService")
        uuidDataService = ref("uuidDataService")
    }
    productRender(com.mogobiz.store.domain.ProductRender) {
        productService = ref("productService")
        taxRateService = ref("taxRateService")
    }
    suggestionRender(com.mogobiz.store.domain.SuggestionRender) {
        productService = ref("productService")
    }
    googleCategoryService (com.mogobiz.service.GoogleCategoryService)
    elasticsearchService (com.mogobiz.service.ElasticsearchService){
        uuidDataService = ref('uuidDataService')
        grailsApplication = ref('grailsApplication')
    }
    cfpService (bootstrap.CfpService) {
        commonService = ref('commonService')
    }
    embeddedElasticSearchService (bootstrap.EmbeddedElasticSearchService)





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
    eventValidation (com.mogobiz.store.domain.EventValidation)
    eventRender (com.mogobiz.store.domain.EventRender)
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
    uuidDataValidation (com.mogobiz.store.domain.UuidDataValidation)
    uuidDataRender (com.mogobiz.store.domain.UuidDataRender)
    googleContentValidation (com.mogobiz.store.domain.GoogleContentValidation)
    googleContentRender (com.mogobiz.store.domain.GoogleContentRender)
    taxRateValidation (com.mogobiz.store.domain.TaxRateValidation)
    taxRateRender (com.mogobiz.store.domain.TaxRateRender)
    couponValidation (com.mogobiz.store.domain.CouponValidation)
    couponRender (com.mogobiz.store.domain.CouponRender)
    reductionRuleValidation (com.mogobiz.store.domain.ReductionRuleValidation)
    reductionRuleRender (com.mogobiz.store.domain.ReductionRuleRender)
    reductionSoldValidation (com.mogobiz.store.domain.ReductionSoldValidation)
    reductionSoldRender (com.mogobiz.store.domain.ReductionSoldRender)
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


}
