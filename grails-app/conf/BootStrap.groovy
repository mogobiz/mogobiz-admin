import bootstrap.CommonService
import bootstrap.EmbeddedElasticSearchService
import bootstrap.CommerceService
import com.mogobiz.store.domain.Role

class BootStrap {
    def grailsApplication
    CommonService commonService
    CommerceService commerceService
    EmbeddedElasticSearchService embeddedElasticSearchService

    def init = { servletContext ->
        commonService.init()
        if (grailsApplication.config.elasticsearch.embedded.active)
            embeddedElasticSearchService.init()
        if (grailsApplication.config.demo) {
            commerceService.init()
        }
    }

    def destroy = {
        commerceService.destroy()
        commonService.destroy()
        embeddedElasticSearchService.destroy()
    }
}
