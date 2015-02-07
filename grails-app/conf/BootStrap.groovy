import bootstrap.CommonService
import bootstrap.EmbeddedElasticSearchService
import bootstrap.CommerceService
import bootstrap.PerfCommerceService

class BootStrap {
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
            perfCommerceService.init()
        }
    }

    def destroy = {
        commerceService.destroy()
        commonService.destroy()
        embeddedElasticSearchService.destroy()
    }
}
