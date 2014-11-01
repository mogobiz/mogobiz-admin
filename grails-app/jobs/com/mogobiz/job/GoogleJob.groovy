package com.mogobiz.job

import com.mogobiz.service.GoogleService

/**
 * Created by stephane.manciot@ebiznext.com on 30/05/2014.
 */
class GoogleJob {

    def concurrent = false
    GoogleService googleService
    static triggers = {
        cron name:'GoogleJobTrigger', startDelay:0, cronExpression: '0 * * * * ?'
    }

    def execute(){
        log.info("Export to Google has started ...")
        googleService.export()
        log.info("Export to Google has finished")
    }

}
