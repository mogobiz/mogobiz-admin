import bootstrap.CommonService
import bootstrap.EmbeddedElasticSearchService
import bootstrap.CommerceService
import bootstrap.PerfCommerceService

class BootStrap {
    // Nombre de catégories principales
    public static final int LEVEL_ONE_CATEGORY = 10

    // Nombre de sous catégories par catégorie principale
    public static final int LEVEL_TWO_CATEGORY = 5

    // Nombre de produits par sous catégorie
    public static final int MAX_PRODUCTS_PER_CATEGORY = 10
    // le nombre total de produit est le produit des trois valeurs ci-dessus (soit dans ce cas 5 * 10 * 10 = 500)

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
            //commerceService.init()
        }
    }

    def destroy = {
        commerceService.destroy()
        commonService.destroy()
        embeddedElasticSearchService.destroy()
    }
}
