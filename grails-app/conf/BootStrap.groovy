import bootstrap.CommonService
import bootstrap.EmbeddedElasticSearchService
import bootstrap.JahiaCommerceService
import com.mogobiz.store.domain.Role

class BootStrap {
    def grailsApplication
    CommonService commonService
    JahiaCommerceService jahiaCommerceService
    EmbeddedElasticSearchService embeddedElasticSearchService

    def init = { servletContext ->
        commonService.init()
        if (grailsApplication.config.elasticsearch.embedded.active)
            embeddedElasticSearchService.init()
        if (grailsApplication.config.demo) {
            jahiaCommerceService.init()
        }
    }

    def destroy = {
        jahiaCommerceService.destroy()
        commonService.destroy()
        embeddedElasticSearchService.destroy()
    }
}
