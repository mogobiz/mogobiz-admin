/*
 * Copyright (C) 2015 Mogobiz SARL. All rights reserved.
 */

package com.mogobiz.job

import com.mogobiz.service.GoogleCategoryService
import grails.util.Holders

/**
 */
class GoogleCategoriesJob {

    def concurrent = false

    GoogleCategoryService googleCategoryService

    static triggers = {
        cron name:'GoogleCategoriesJobTrigger', startDelay:0, cronExpression: Holders.config.google.importCategories.cron
    }

    def execute(){
        log.info("Import From Google Categories has started ...")
        googleCategoryService.importGoogleCategories()
        log.info("Import From Google Categories has finished")
    }

}
