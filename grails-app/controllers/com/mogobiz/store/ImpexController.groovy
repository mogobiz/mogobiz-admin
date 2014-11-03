package com.mogobiz.store

import com.mogobiz.authentication.AuthenticationService
import com.mogobiz.service.CatalogService
import com.mogobiz.service.ExportService
import com.mogobiz.service.ImportService
import com.mogobiz.store.domain.Catalog
import com.mogobiz.store.domain.Company
import grails.converters.JSON

class ImpexController {

    ExportService exportService
    ImportService importService
    CatalogService catalogService
    AuthenticationService authenticationService

    def purge() {
        try {
            int count = catalogService.purge(31063L)
            render "$count"
        }
        catch(Exception e) {
            response.sendError(404)
        }
    }

    def export() {
        File outFile = exportService.export(31262L)
        response.setContentType("application/excel")
        response.setHeader("Content-disposition", "attachment;filename=${outFile.getName()}")

        response.outputStream << outFile.newInputStream()
        outFile.delete()
    }

    def ximport() {
        def seller = request.seller ? request.seller : authenticationService.retrieveAuthenticatedSeller()
        if (!seller) {
            response.sendError 401
            return
        }
        Company company = seller.company
        def name = "impex"
        Catalog catalog = Catalog.findByNameAndCompany(name, seller.company)
        if (catalog)
            catalogService.purge(catalog.id)

        if (!catalog) {
            catalog = new Catalog()
            catalog.company = company
            catalog.name = name
            catalog.activationDate = new Date(2040 - 1900, 11, 31)
            catalog.uuid = UUID.randomUUID().toString()
            if (catalog.validate()) {
                catalog.save(flush: true)
                importService.ximport(catalog, null)
            } else {
                System.out.println(catalog.errors)
            }
            withFormat {
                json { render catalog as JSON }
            }
        } else {
            // Plese delete IMPEX catalog first
            response.sendError 404
        }
    }
}
