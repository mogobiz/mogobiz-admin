/*
 * Copyright (C) 2015 Mogobiz SARL. All rights reserved.
 */

package com.mogobiz.store

import com.mogobiz.store.domain.Catalog
import com.mogobiz.store.domain.Company
import com.mogobiz.store.domain.EsEnv
import com.mogobiz.utils.PermissionType
import grails.converters.JSON
import grails.converters.XML

import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

import static com.mogobiz.utils.ProfileUtils.*

class ElasticsearchController {

    def grailsApplication

    def authenticationService

    def elasticsearchService

    // private static final STORE_DATA = 'storeData'

    def isNewVersionAvailable(String store, long millis) {
        File file = new File((grailsApplication.config.resources.path + '/stores/' as String) + store + '.zip')
        if (!file.exists() || file.lastModified() > millis) {
            render "true"
        } else {
            render "false"
        }
    }

    def retrievePreviousIndices(long envId){
        def seller = request.seller ? request.seller : authenticationService.retrieveAuthenticatedSeller()
        if(!seller){
            response.sendError 401
            return
        }
        def company = seller.company
        EsEnv env = envId ? EsEnv.get(envId) : null
        if(company != env?.company){
            response.sendError 401
            return
        }
        def permission = computePermission(PermissionType.PUBLISH_STORE_CATALOGS_TO_ENV, "${company.id}", "$envId")
        if(!authenticationService.isPermitted(permission)){
            response.sendError 401
            return
        }
        def ret = [:] << [previousIndices: elasticsearchService.retrievePreviousIndices(env)]
        withFormat {
            xml { render ret as XML }
            json { render ret as JSON }
        }
    }

    def activateIndex(String index, long envId){
        def seller = request.seller ? request.seller : authenticationService.retrieveAuthenticatedSeller()
        if(!seller){
            response.sendError 401
            return
        }
        def company = seller.company
        EsEnv env = envId ? EsEnv.get(envId) : null
        if(company != env?.company){
            response.sendError 401
            return
        }
        def permission = computePermission(PermissionType.PUBLISH_STORE_CATALOGS_TO_ENV, "${company.id}", "$envId")
        if(!authenticationService.isPermitted(permission)){
            response.sendError 401
            return
        }
        def ret = [:] << [success: elasticsearchService.activateIndex(index, env)]
        withFormat {
            xml { render ret as XML }
            json { render ret as JSON }
        }
    }

    def publish = {
        def seller = request.seller ? request.seller : authenticationService.retrieveAuthenticatedSeller()
        if(!seller){
            response.sendError 401
            return
        }
        def company = seller.company
        long envId = params.long('esenv.id')
        EsEnv env = envId ? EsEnv.get(envId) : null
        if(company != env?.company){
            response.sendError 401
            return
        }
        def permission = computePermission(PermissionType.PUBLISH_STORE_CATALOGS_TO_ENV, "${company.id}", "$envId")
        if(!authenticationService.isPermitted(permission)){
            response.sendError 401
            return
        }
        long catalogId = params.long('catalog.id')
        Catalog catalog = catalogId ? Catalog.get(catalogId) : null
        if (catalog?.name == "impex") {
            render status:403, text: "Impex Catalog cannot be published"
        }
        else {
            elasticsearchService.publish(company, env, catalog, true)
            withFormat {
                xml { render [:] as XML }
                json { render [:] as JSON }
            }
        }
    }

    def mogopay(Long esEnvId) {
        if(authenticationService.isAdministrator()){
            Company all = Company.findByCode(ALL)
            EsEnv env = esEnvId ? EsEnv.get(esEnvId) : EsEnv.findByCompanyAndName(all, "mogopay")
            if(authenticationService.isPermitted(
                    computePermission(
                            PermissionType.PUBLISH_BO_TO_MOGOPAY,
                            ALL,
                            env.id?.toString()
                    )
            )){
                elasticsearchService.mogopay(env)
                withFormat {
                    xml { render [:] as XML }
                    json { render [:] as JSON }
                }
            }
            else{
                response.sendError(403)
            }
        }
        else{
            response.sendError(403)
        }
    }

    def zipStore(String store, String date, boolean forceRefresh) {
        File file = new File("${grailsApplication.config.resources.path}/stores/${store}.zip")
        response.setContentType("application/octet-stream")
        response.setHeader("Content-Disposition", "Attachment;Filename=\"${store}.zip\"")
        if (!file.exists() || forceRefresh) {
            file.getParentFile().mkdirs()
            file.delete()
            FileOutputStream dest = new FileOutputStream(file);
            ZipOutputStream zip = new ZipOutputStream(new BufferedOutputStream(dest));
            String dir = elasticsearchService.saveToLocalStorage(store, date, true)
            addFolderToZip("", dir, zip)
            zip.close()
        }
        response.setHeader("Content-Length", "" + file?.size())
        response.outputStream << file.newInputStream()
        response.outputStream.flush()
    }

    /*
     * add folder to the zip file
     */

    private void addFolderToZip(String path, String srcFolder, ZipOutputStream zip) throws Exception {
        File folder = new File(srcFolder)
        /*
         * check the empty folder
         */
        if (folder.list().length == 0) {
            addFileToZip(path, srcFolder, zip, true)
        } else {
            folder.listFiles().sort{ it.lastModified() }.each { File file ->
                def srcFile = srcFolder + "/" + file.getName()
                if (path.equals("")) {
                    addFileToZip(folder.name, srcFile, zip, false)
                } else {
                    addFileToZip(path + "/" + folder.name, srcFile, zip, false)
                }
            }
        }
    }

    /*
     * recursively add files to the zip files
     */

    private void addFileToZip(String path, String srcFile, ZipOutputStream zip, boolean flag) throws Exception {
        File f = new File(srcFile)
        if (flag) {
            /*
             * add empty folder to the Zip file
             */
            zip.putNextEntry(new ZipEntry(path + "/" + f.name + "/"))
        } else {
            if (f.isDirectory()) {
                addFolderToZip(path, srcFile, zip)
            } else {
                byte[] buffer = new byte[1024]
                int len
                FileInputStream is = new FileInputStream(srcFile)
                zip.putNextEntry(new ZipEntry(path + "/" + f.name))
                while ((len = is.read(buffer)) > 0) {
                    zip.write(buffer, 0, len)
                }
                is.close()
            }
        }
    }

}
