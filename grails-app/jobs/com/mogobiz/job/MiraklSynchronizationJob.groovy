package com.mogobiz.job

import com.mogobiz.service.MiraklService

/**
 *
 * Created by smanciot on 22/06/16.
 */
class MiraklSynchronizationJob {
    def concurrent = false

    MiraklService miraklService

    static triggers = {
        cron name:'MiraklStatusJobTrigger', startDelay:0, cronExpression: '0 * * * * ?'
    }

    def execute(){
        log.debug("Mirakl Synchronization has started ...")
        miraklService.synchronize(null)
        log.debug("Mirakl Synchronization has finished ...")
    }
}
