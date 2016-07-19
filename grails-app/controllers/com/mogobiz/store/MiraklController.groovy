package com.mogobiz.store

import com.mogobiz.service.PagedList
import com.mogobiz.store.cmd.PagedListCommand
import com.mogobiz.store.domain.Catalog
import com.mogobiz.store.domain.MiraklEnv
import com.mogobiz.store.domain.MiraklSync
import com.mogobiz.utils.PermissionType
import grails.converters.JSON
import grails.converters.XML

import static com.mogobiz.utils.ProfileUtils.computePermission

class MiraklController {

    def grailsApplication

    def authenticationService

    def miraklService

    def profileService

    def ajaxResponseService

    def publish = {
        def seller = request.seller ? request.seller : authenticationService.retrieveAuthenticatedSeller()
        if(!seller){
            response.sendError 401
            return
        }
        def company = seller.company
        Long envId = params.long('miraklenv.id')
        MiraklEnv env = envId ? MiraklEnv.get(envId) : null

        if(!envId){
            env = MiraklEnv.findByCompany(company)
            if(!env && grailsApplication.config.mirakl){
                def mirakl = grailsApplication.config.mirakl["${company.code}"] as Map
                if(mirakl){
                    env = new MiraklEnv(mirakl)
                    env.company = company
                    env.running = false
                    env.validate()
                    if(!env.hasErrors()){
                        env.save(flush: true)
                    }
                    else{
                        env = null
                    }
                }
            }
            if(env){
                profileService.saveUserPermission(
                        seller,
                        true,
                        PermissionType.PUBLISH_STORE_CATALOGS_TO_ENV,
                        company.id as String,
                        env.id as String
                )
                envId = env.id
            }
        }

        if(company != env?.company){
            response.sendError 401
            return
        }
        def permission = computePermission(PermissionType.PUBLISH_STORE_CATALOGS_TO_ENV, "${company.id}", "$envId")
        if(!authenticationService.isPermitted(permission)){
            response.sendError 401
            return
        }
        Long catalogId = params.long('catalog.id')
        Catalog catalog = catalogId ? Catalog.get(catalogId) : null
        if (catalog?.name == "impex") {
            render status:403, text: "Impex Catalog cannot be published"
        }
        else {
            miraklService.publish(company, env, catalog, true)
            withFormat {
                xml { render [:] as XML }
                json { render [:] as JSON }
            }
        }
    }

    def synchronize = {
        def seller = request.seller ? request.seller : authenticationService.retrieveAuthenticatedSeller()
        if(!seller){
            response.sendError 401
            return
        }
        def company = seller.company
        Long catalogId = params.long('catalog.id')
        Catalog catalog = catalogId ? Catalog.get(catalogId) : null
        if(!catalog || company != catalog.company){
            response.sendError 401
        }
        else if (catalog.name == "impex") {
            render status:400, text: "Impex Catalog cannot be synchronized"
        }
        else{
            miraklService.synchronize(catalog)
            withFormat {
                xml { render [:] as XML }
                json { render [:] as JSON }
            }
        }
    }

    def refreshSynchronization(PagedListCommand cmd) {
        def seller = request.seller ? request.seller : authenticationService.retrieveAuthenticatedSeller()
        if(!seller){
            response.sendError 401
            return
        }
        def company = seller.company
        Long catalogId = params.long('catalog.id')
        Catalog catalog = catalogId ? Catalog.get(catalogId) : null
        if(!catalog || company != catalog.company){
            response.sendError 401
        }
        else if (catalog.name == "impex") {
            render status:400, text: "Impex Catalog cannot be refreshed"
        }
        else{
            PagedList<MiraklSync> pagedList = miraklService.refreshSynchronization(catalog, cmd)
            final page = ajaxResponseService.preparePage(pagedList.list, pagedList.totalCount, cmd) { MiraklSync sync ->
                sync.asMapForJSON(["type", "status", "timestamp", "errorReport"])
            }
            withFormat {
                xml { render page as XML }
                json { render page as JSON }
            }
        }
    }

}
