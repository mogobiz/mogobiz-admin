import bootstrap.CommonService
import bootstrap.EmbeddedElasticSearchService
import bootstrap.JahiaCommerceService
import bootstrap.CfpService

class BootStrap {
    def dataSource

    def grailsApplication
    CommonService commonService
    JahiaCommerceService jahiaCommerceService
    EmbeddedElasticSearchService embeddedElasticSearchService
    CfpService cfpService

    def init = { servletContext ->
        embeddedElasticSearchService.init()
        if (grailsApplication.config.dataSource.dbCreate in  ['create', 'create-drop', 'drop-create']) {
            commonService.init()
            jahiaCommerceService.init()
            cfpService.init()
        }
    }

    def destroy = {
        jahiaCommerceService.destroy()
        commonService.destroy()
        embeddedElasticSearchService.destroy()
        cfpService.destroy()
    }
}
