package com.mogobiz.store

import com.mogobiz.store.domain.Catalog
import com.mogobiz.store.domain.EsEnv
import grails.converters.JSON
import grails.converters.XML

import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

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

    def publish = {
        def seller = request.seller ? request.seller : authenticationService.retrieveAuthenticatedSeller()
        if(!seller){
            response.sendError 401
            return
        }
        def company = seller.company
        long envId = params.long('esenv.id')
        long catalogId = params.long('catalog.id')
        EsEnv env = envId ? EsEnv.get(envId) : null
        Catalog catalog = catalogId ? Catalog.get(catalogId) : null
        if (catalog?.name == "impex") {
            render status:403, text: "Impex Catalog cannot be published"
        }
        else {
            elasticsearchService.publish(company, env, catalog, true)
            try {
                new URL(grailsApplication.config.external.jahiaClearCache).content
            }
            catch (Exception ex) {
                log.warn("Unable to clear Jahia cache", ex)
            }
            withFormat {
                xml { render [:] as XML }
                json { render [:] as JSON }
            }
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
