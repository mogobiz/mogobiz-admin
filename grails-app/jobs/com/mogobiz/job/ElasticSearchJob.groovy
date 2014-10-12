package com.mogobiz.job

import com.mogobiz.service.ElasticsearchService
import com.mogobiz.store.domain.Catalog
import com.mogobiz.store.domain.Company
import com.mogobiz.store.domain.EsEnv
import com.mogobiz.elasticsearch.client.ESClient
import com.mogobiz.store.domain.Translation
import grails.util.Holders
import org.quartz.CronExpression

/**
 * Created by stephane.manciot@ebiznext.com on 17/02/2014.
 */
class ElasticSearchJob {

    def concurrent = false

    ElasticsearchService elasticsearchService

    static client = ESClient.instance

    static triggers = {
        cron name:'ESJobTrigger', startDelay:0, cronExpression: '0 * * * * ?'
    }

    def execute(){
        log.info("Export to Elastic Search has started ...")
        def cal = Calendar.getInstance()
        cal.set(Calendar.SECOND, 0)
        cal.set(Calendar.MILLISECOND, 0)
        def now = cal.getTime()
        Company.findAll().each { Company company ->
            Collection<Catalog> catalogs = Catalog.findAllByActivationDateLessThanEqualsAndCompanyAndDeleted(
                    new Date(),
                    company,
                    false,
                    [sort:'activationDate', order:'desc'])
            Catalog catalog = catalogs.size() > 0 ? catalogs.get(0) : null
            if(catalog){
                EsEnv.findAllByCompany(company).each {env ->
                    def cron = env.cronExpr
                    if(CronExpression.isValidExpression(cron) && new CronExpression(cron).isSatisfiedBy(now)){
                        elasticsearchService.publish(company, env, catalog)
                    }
                }
            }
        }
        log.info("Export to Elastic Search has finished")
    }

}