import bootstrap.CommonService
import bootstrap.EmbeddedElasticSearchService
import bootstrap.JahiaCommerceService

class BootStrap {
    def dataSource

    def grailsApplication
    CommonService commonService
    JahiaCommerceService jahiaCommerceService
    EmbeddedElasticSearchService embeddedElasticSearchService

    def init = { servletContext ->
        embeddedElasticSearchService.init()
        if (grailsApplication.config.dataSource.dbCreate in  ['create', 'create-drop', 'drop-create']) {
            commonService.init()
            jahiaCommerceService.init()
        }
    }

    def destroy = {
        jahiaCommerceService.destroy()
        commonService.destroy()
        embeddedElasticSearchService.destroy()
    }
}
