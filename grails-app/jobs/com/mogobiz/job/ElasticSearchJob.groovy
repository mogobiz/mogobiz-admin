/*
 * Copyright (C) 2015 Mogobiz SARL. All rights reserved.
 */

package com.mogobiz.job

import com.mogobiz.service.ElasticsearchService

/**
 */
class ElasticSearchJob {

    def concurrent = false

    ElasticsearchService elasticsearchService

    static triggers = {
        cron name:'ESJobTrigger', startDelay:0, cronExpression: '0 * * * * ?'
    }

    def execute(){
        log.debug("Export to Elastic Search has started ...")
        elasticsearchService.publishAll()
        log.debug("Export to Elastic Search has finished")
    }

}
