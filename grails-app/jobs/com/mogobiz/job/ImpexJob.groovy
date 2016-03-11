/*
 * Copyright (C) 2015 Mogobiz SARL. All rights reserved.
 */

package com.mogobiz.job

import com.mogobiz.service.ExportService
import com.mogobiz.service.ImportService
import com.mogobiz.store.domain.Company
import com.mogobiz.store.domain.Seller
import com.mogobiz.store.domain.User
import grails.util.Holders
import org.quartz.JobExecutionContext

import java.util.concurrent.locks.Lock
import java.util.concurrent.locks.ReentrantLock
import java.util.zip.ZipFile

/**
 */
class ImpexJob {
    static boolean isRunning = false
    def concurrent = false
    ImportService importService
    ExportService exportService
    static triggers = {
        cron name: 'ImportJobTrigger', startDelay: 0, cronExpression: "0 15 10 * * ? 2040" // never fire
    }

    def execute(JobExecutionContext context) {
        try {
            isRunning = true
            boolean export = context.mergedJobDataMap.getBoolean("export");
            long catalogId = context.mergedJobDataMap.getLong("catalogId")
            File zipFile = new File(context.mergedJobDataMap.getString("zipFile"))
            if (export) {
                log.info("EXPORT STARTED")
                Date start = new Date()
                File xlsFile = new File(context.mergedJobDataMap.getString("xlsFile"))
                log.info("Catalog Export started ...")
                exportService.export(catalogId, xlsFile, zipFile)
                log.info("Catalog Export finished")
                log.info("EXPORT FINISHED")
                Date end = new Date()
                log.info("EXPORT DURATION (in seconds) =" + (end.getTime() - start.getTime()) / 1000)
                File successFile = new File(zipFile.getAbsolutePath()+".success")
                successFile.createNewFile()
            }
            else {
                long sellerId = context.mergedJobDataMap.getLong("sellerId")
                log.info("IMPORT STARTED")
                Date start = new Date()
                importService.ximport(catalogId, sellerId, new ZipFile(zipFile))
                zipFile.delete()
                String impexPath = Holders.config.impex.path
                File prefixFile = new File(new File(impexPath), "import")
                File successFile = new File(prefixFile.getAbsolutePath() + ".success")
                successFile.createNewFile()
                log.info("IMPORT FINISHED")
                Date end = new Date()
                log.info("IMPORT DURATION (in seconds) =" + (end.getTime() - start.getTime()) / 1000)
            }
        }
        catch (Exception e) {
            e.printStackTrace()
        }
        finally {
            isRunning = false
        }
    }
}
