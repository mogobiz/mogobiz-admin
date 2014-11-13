package com.mogobiz.job

import com.mogobiz.service.CountryImportService
import grails.util.Holders

/**
 * Periodically import countries into the database
 * In prodution mode, imported files are renamed to the current date/time
 */
class ImportCountriesJob {
    CountryImportService countryImportService
    def concurrent = false
    static triggers = {
        cron name: 'importCountriesTrigger', startDelay: 60000, cronExpression: Holders.config.importCountries.cron
    }

    def execute() {
        log.info("BEGIN ImportCountriesJob")
        countryImportService.importAll()
        log.info("END ImportCountriesJob")
    }
}
