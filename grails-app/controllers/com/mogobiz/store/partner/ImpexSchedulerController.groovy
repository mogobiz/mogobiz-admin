package com.mogobiz.store.partner

import com.mogobiz.authentication.AuthenticationService
import com.mogobiz.authentication.ProfileService
import com.mogobiz.job.ImpexJob
import com.mogobiz.service.CatalogService
import com.mogobiz.service.ExportService
import com.mogobiz.service.ImportService
import com.mogobiz.store.domain.Catalog
import com.mogobiz.store.domain.Company
import com.mogobiz.store.domain.Seller
import com.mogobiz.utils.PermissionType
import grails.converters.JSON
import grails.transaction.Transactional

import java.text.SimpleDateFormat

class ImpexSchedulerController {

    ExportService exportService
    CatalogService catalogService
    AuthenticationService authenticationService
    ProfileService profileService


    @Transactional
    def purge() {
        try {
            long catalogId = params.long(["catalog.id"])
            int count = catalogService.purge(catalogId)
            render "$count"
        }
        catch (Exception e) {
            response.sendError(404)
        }
    }

    def downloadExportFile() {
        String zipFilename = params["export"]
        String now = new SimpleDateFormat("yyyy-MM-dd.HHmmss").format(new Date())
        File outDir = exportService.getExportDir(now)
        File zipFile = new File(outDir.getParentFile(), zipFilename)
        File successFile = new File(zipFile.getAbsolutePath() + ".success")
        if (successFile.exists()) {
            response.setContentType("application/octet-stream")
            response.setHeader("Content-Disposition", "Attachment;Filename=\"${zipFile.getName()}\"")
            zipFile.withInputStream { response.outputStream << it }
            zipFile.delete()
            successFile.delete()
        } else {
            render text: "Export not finished", status: 403
        }
    }

    def checkExport() {
        String zipFilename = params["export"]
        String now = new SimpleDateFormat("yyyy-MM-dd.HHmmss").format(new Date())
        File outDir = exportService.getExportDir(now)
        File zipFile = new File(outDir.getParentFile(), zipFilename)
        File successFile = new File(zipFile.getAbsolutePath() + ".success")
        if (successFile.exists()) {
            render text: "Export finished", status: 200
        } else {
            render text: "Export not finished", status: 403
        }
    }

    def downloadImportReport() {
        String impexPath = grailsApplication.config.impex.path
        File prefixFile = new File(new File(impexPath), "import")
        File successFile = new File(prefixFile.getAbsolutePath() + ".success")
        if (successFile.exists()) {
            successFile.delete()
            render text: "Import success", status: 200
        } else {
            render text: "Import not finished", status: 403
        }
    }

    @Transactional(readOnly = true)
    def export() {
        if (!ImpexJob.isRunning) {
            try {
                Seller seller = request.seller ? request.seller : authenticationService.retrieveAuthenticatedSeller()
                if (!seller) {
                    response.sendError 401
                    return
                }
                long catalogId = params.long(["catalog.id"])
                if (Catalog.get(catalogId).company != seller.company) {
                    response.sendError 401
                    return
                }
                String now = new SimpleDateFormat("yyyy-MM-dd.HHmmss").format(new Date())
                File outDir = exportService.getExportDir(now)
                String zipFilename = "mogobiz-${now}.zip"
                File xlsFile = new File(outDir, "mogobiz.xlsx")
                File zipFile = new File(outDir.getParentFile(), zipFilename)

                ImpexJob.triggerNow(["catalogId": catalogId, "export": true, "xlsFile": xlsFile.getAbsolutePath(), "zipFile": zipFile.getAbsolutePath()])
                render zipFilename
            }
            catch (Exception e) {
                e.printStackTrace()
            }
        } else {
            log.info("EXPORT COULD NOT START")
            render text: "Impex currently busy running", status: 403
        }
    }

    @Transactional
    def ximport() {
        def seller = request.seller ? request.seller : authenticationService.retrieveAuthenticatedSeller()
        if (!seller) {
            response.sendError 401
            return
        }
        if (!ImpexJob.isRunning) {
            log.info("Uploading file ...")
            def file = request.getFile('file')
            if (file && !file.empty) {
                File tmpFile = File.createTempFile("import", ".zip")
                file.transferTo(tmpFile)
                Company company = seller.company
                def name = "impex"
                int countSales = 0
                Catalog catalog = null
                Catalog.withNewTransaction {
                    catalog = Catalog.findByNameAndCompany(name, seller.company)
                    if (catalog) {
                        log.info("Purging catalog ...")
                        countSales = catalogService.purge(catalog.id)
                        log.info("Purge ended ...")
                    }
                }
                if (countSales == 0) {
                    catalog = new Catalog()
                    catalog.company = company
                    catalog.name = name
                    catalog.activationDate = new Date(2040 - 1900, 11, 31)
                    catalog.uuid = UUID.randomUUID().toString()
                    if (catalog.validate()) {
                        Catalog.withNewTransaction {
                            catalog.save(flush: true)
                        }
                    } else {
                        System.out.println(catalog.errors)
                        catalog = null
                    }
                }

                if (countSales == 0 && catalog) {
                    profileService.saveUserPermission(
                            seller,
                            true,
                            PermissionType.UPDATE_STORE_CATALOG,
                            company.id as String,
                            catalog.id as String
                    )
                    ImpexJob.triggerNow(["catalogId": catalog.id, "export": false, "sellerId": seller.id, "companyId": company.id, "zipFile": tmpFile.getAbsolutePath()])
                    withFormat {
                        json { render catalog as JSON }
                    }
                } else {
                    tmpFile.delete()
                    render text: "$countSales", status: 403
                }
            } else {
                withFormat {
                    html { render text: "Error: Missing input file", status: 200 }
                    json { render text: "Missing input file", status: 401 }
                }
            }
        } else {
            log.info("IMPORT COULD NOT START")
            render text: "Impex currently busy running", status: 401
        }
    }

}
