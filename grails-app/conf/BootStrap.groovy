import bootstrap.CommonService
import bootstrap.EmbeddedElasticSearchService
import bootstrap.CommerceService
import bootstrap.PerfCommerceService

class BootStrap {
    public static final int LEVEL_ONE_CATEGORY = 10
    public static final int LEVEL_TWO_CATEGORY = 5
    public static final int MAX_PRODUCTS_PER_CATEGORY = 10
    def grailsApplication
    CommonService commonService
    CommerceService commerceService
    PerfCommerceService perfCommerceService
    EmbeddedElasticSearchService embeddedElasticSearchService

    def init = { servletContext ->
        commonService.init()
        if (grailsApplication.config.elasticsearch.embedded.active)
            embeddedElasticSearchService.init()
        if (grailsApplication.config.demo) {
            perfCommerceService.init(LEVEL_ONE_CATEGORY, LEVEL_TWO_CATEGORY, MAX_PRODUCTS_PER_CATEGORY)
        }
    }

    def destroy = {
        commerceService.destroy()
        commonService.destroy()
        embeddedElasticSearchService.destroy()
    }
}
