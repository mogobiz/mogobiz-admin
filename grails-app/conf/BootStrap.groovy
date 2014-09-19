import bootstrap.CommonService
import bootstrap.EmbeddedElasticSearchService
import bootstrap.JahiaCommerceService
import com.mogobiz.store.domain.Role

class BootStrap {
    def grailsApplication
    CommonService commonService
    JahiaCommerceService jahiaCommerceService
    EmbeddedElasticSearchService embeddedElasticSearchService

    private def isFirstTime() {
        return Role.findAll().size() == 0
    }

    def init = { servletContext ->
        boolean firstTime = isFirstTime()
        println("firsttime=" + firstTime)
        if (grailsApplication.config.elasticsearch.embedded.active)
            embeddedElasticSearchService.init()
        //if (grailsApplication.config.dataSource.dbCreate in  ['create', 'create-drop', 'drop-create'])
        if (firstTime) {
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
