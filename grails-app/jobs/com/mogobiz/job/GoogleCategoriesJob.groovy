package com.mogobiz.job

import com.mogobiz.service.GoogleCategoryService

/**
 * Created by stephane.manciot@ebiznext.com on 04/06/2014.
 */
class GoogleCategoriesJob {

    def concurrent = false

    GoogleCategoryService googleCategoryService

    static triggers = {
        cron name:'GoogleCategoriesJobTrigger', startDelay:0, cronExpression: '0 * * * * ?'
    }

    def execute(){
        log.info("Import From Google Categories has started ...")
        googleCategoryService.importGoogleCategories()
        log.info("Import From Google Categories has finished")
    }

}
