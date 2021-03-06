/*
 * Copyright (C) 2015 Mogobiz SARL. All rights reserved.
 */


class BootStrap {
    // Nombre de catégories principales
    public static final int LEVEL_ONE_CATEGORY = 10

    // Nombre de sous catégories par catégorie principale
    public static final int LEVEL_TWO_CATEGORY = 5

    // Nombre de produits par sous catégorie
    public static final int MAX_PRODUCTS_PER_CATEGORY = 20
    // le nombre total de produit est le produit des trois valeurs ci-dessus (soit dans ce cas 5 * 10 * 100 = 5000)

    def grailsApplication
    def commonService
    def commerceService
    def perfCommerceService
    def embeddedElasticSearchService
    def translationService

    def init = { servletContext ->
        commonService.init()
        translationService.updateTranslationCatalog()
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
