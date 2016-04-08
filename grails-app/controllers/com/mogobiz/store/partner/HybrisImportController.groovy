package com.mogobiz.store.partner

import com.mogobiz.authentication.AuthenticationService
import com.mogobiz.job.ImpexJob
import com.mogobiz.store.domain.Catalog
import com.mogobiz.store.domain.Company
import com.mogobiz.utils.PermissionType
import grails.converters.JSON
import grails.converters.XML

class HybrisImportController {
	AuthenticationService authenticationService
	//HybrisImportService hybrisImportService

    def ximport() {
		def seller = request.seller ? request.seller : authenticationService.retrieveAuthenticatedSeller()
		if (!seller) {
			response.sendError 401
			return
		}

		Long id = 35026 //params['catalog']?.id?.toLong()
		if (id != null) {
			def catalog = Catalog.get(id)
			if (catalog && catalog.company == seller.company) {
				log.info("Uploading hybris catalog ...")
				def file = request.getFile('file')
				if (file && !file.empty) {
					File tmpFile = File.createTempFile("import", ".zip")
					file.transferTo(tmpFile)
					Company company = seller.company
					//TODO call service hybris here
					//hybrisImportService.ximport(id, seller.id, company.id, file)
				}
			} else {
				response.sendError 404
			}
		} else {
			response.sendError 404
		}
	}
}