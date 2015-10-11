/*
 * Copyright (C) 2015 Mogobiz SARL. All rights reserved.
 */

package com.mogobiz.job

import com.mogobiz.service.GoogleService
import grails.util.Holders

/**
 * Created by stephane.manciot@ebiznext.com on 30/05/2014.
 */
class GoogleJob {

    def concurrent = false
    GoogleService googleService
    static triggers = {
        cron name:'GoogleJobTrigger', startDelay:0, cronExpression: Holders.config.google.export.cron
    }

    def execute(){
        log.info("Export to Google has started ...")
        googleService.export()
        log.info("Export to Google has finished")
    }

}
