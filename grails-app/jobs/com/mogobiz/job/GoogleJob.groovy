package com.mogobiz.job

import com.mogobiz.common.client.ClientConfig
import com.mogobiz.common.client.Credentials
import com.mogobiz.common.rivers.spi.RiverConfig
import com.mogobiz.google.rivers.GoogleRivers
import com.mogobiz.store.domain.Catalog
import com.mogobiz.store.domain.Company
import com.mogobiz.store.domain.EsEnv
import com.mogobiz.elasticsearch.rivers.ESRivers
import com.mogobiz.elasticsearch.client.ESClient
import com.mogobiz.store.domain.Translation
import grails.util.Holders
import org.quartz.CronExpression
import scala.Function1

/**
 * Created by stephane.manciot@ebiznext.com on 30/05/2014.
 */
class GoogleJob {

    def concurrent = false

    static triggers = {
        cron name:'GoogleJobTrigger', startDelay:0, cronExpression: '0 * * * * ?'
    }

    def execute(){
        log.info("Export to Google has started ...")
        def cal = Calendar.getInstance()
        cal.set(Calendar.SECOND, 0)
        cal.set(Calendar.MILLISECOND, 0)
        def now = cal.getTime()
        Company.findAll().each { Company c ->
            Collection<Catalog> catalogs = Catalog.findAllByActivationDateLessThanEqualsAndCompany(
                    new Date(),
                    Company.get(c.id),
                    [sort:'activationDate', order:'desc'])
            Catalog catalog = catalogs.size() > 0 ? catalogs.get(0) : null
            def env = c.googleEnv
            def cron = env?.cronExpr
            if(catalog && env && env.active && !env.running && CronExpression.isValidExpression(cron) && new CronExpression(cron).isSatisfiedBy(now)){
                def languages  = Translation.executeQuery('SELECT DISTINCT t.lang FROM Translation t WHERE t.companyId=:idCompany', [idCompany:c.id]) as String[]
                def ec  = GoogleRivers.dispatcher()
                def debug = true
                def riverConfig = new RiverConfig(
                        idCatalog: catalog.id,
                        debug : debug,
                        dry_run: env.dry_run,
                        countryCode: c.countryCode,
                        currencyCode: c.currencyCode,
                        languages: languages,
                        defaultLang: c.defaultLanguage,
                        clientConfig: new ClientConfig(
                                debug : debug,
                                store: c.code,
                                merchant_id: env.merchant_id,
                                merchant_url: env.merchant_url,
                                credentials: new Credentials(
                                        client_id: env.client_id,
                                        client_secret: env.client_secret,
                                        client_token:env.client_token
                                ),
                                config: [version:2]//env.version
                        )
                )
                GoogleRivers.instance.export(riverConfig, ec).onComplete({
                    log.info("End Google export for " + c.name)
                }as Function1, ec)
            }
        }
        log.info("Export to Google has finished")
    }

}
