package com.mogobiz.store

import com.mogobiz.service.StoreService
import com.mogobiz.store.customer.StoreSessionData
import com.mogobiz.store.domain.Catalog
import com.mogobiz.store.domain.EsEnv
import grails.converters.JSON
import grails.converters.XML

import javax.servlet.http.HttpServletResponse
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

class ElasticsearchController {

    def grailsApplication

    def authenticationService

    def elasticsearchService

    StoreService storeService

    private static final STORE_DATA = 'storeData'

    /**
     * This method is the application entry point of sale
     * @deprecated
     * @param store - the store on which the search will be performed
     * @param currency - the currency code to use within customer session
     * @param country - the country code to use within customer session
     * @param state - the state code to use within customer session
     * @param callback - jsonp callback
     */
    def index(String store, String currency, String country, String state, String callback) {
        try {
            def storeSessionData = storeService.loadStoreSessionData(country, currency, store)
            storeSessionData.state = state
            session[STORE_DATA] = storeSessionData
            renderAsJSON(callback, [:])
        }
        catch (IllegalArgumentException ex) {
            log.error(ex.message);
            response.sendError HttpServletResponse.SC_BAD_REQUEST
        }
    }

    /**
     * This method lists countries for the specified store
     * @param store - the store on which the search will be performed
     * @param lang - the language to use for translations
     * @param callback - jsonp callback
     */
    def countries(String store, String lang, String callback) {
        renderAsJSON(callback, elasticsearchService.countries(store, lang))
    }

    /**
     * This method lists currencies for the specified store
     * @param store - the store on which the search will be performed
     * @param lang - the language to use for translations
     * @param currency - the current currency if any
     * @param callback - jsonp callback
     */
    def currencies(String store, String lang, String currency, String callback) {
        renderAsJSON(callback, elasticsearchService.currencies(store, lang, currency))
    }

    /**
     * This method lists tags for the specified store
     * @param store - the store on which the search will be performed
     * @param categoryId - search tags for products which are associated to this category
     * @param tagName - the tag that has been clicked
     * @param callback - jsonp callback
     */
    def tags(String store, Long categoryId, String tagName, String callback) {
        renderAsJSON(callback, elasticsearchService.tags(store, categoryId, tagName))
    }

    /**
     * This method lists brands for the specified store
     * @param store - the store on which the search will be performed
     * @param lang - the language to use for translations
     * @param hidden - whether to include or not hidden brands
     * @param categoryPath - search brands for products which are associated to this category path
     * @param callback - jsonp callback
     * @param maxItems - max number of items
     */
    def brands(String store, String lang, boolean hidden, String categoryPath, String callback, int maxItems) {
        if(maxItems <= 0){
            maxItems = 10
        }
        renderAsJSON(callback, elasticsearchService.brands(store, lang, hidden, categoryPath, maxItems))
    }

    /**
     * This method lists categories for the specified store
     * @param store - the store on which the search will be performed
     * @param lang - the language to use for translations
     * @param hidden - whether to include or not hidden categories
     * @param parentId - the parent category to which the categories are associated
     * @param brandId - the brand to which the categories are associated
     * @param category - the category which has to be looked up
     * @param callback - jsonp callback
     */
    def categories(String store, String lang, boolean hidden, long parentId, long brandId, String category, String callback) {
        renderAsJSON(callback, elasticsearchService.categories(store, lang, hidden, parentId, brandId, category))
    }

    /**
     * This method search products within a store
     * @param store - the store on which the search will be performed
     * @param productId - the product id
     * @param lang - the language to use for translations
     * @param hidden - whether to include or not hidden products
     * @param addToHistory - whether the product should be added or not to history
     * @param criteria - search criteria
     * @param callback - jsonp callback
     */
    def products(String store, Long productId, String lang, boolean hidden, boolean addToHistory, ProductSearchCriteria criteria, String callback) {
        renderAsJSON(callback, elasticsearchService.products(session[STORE_DATA] as StoreSessionData, store, productId, lang, hidden, addToHistory, criteria))
    }

    def dates(String store, Long productId, String date, String callback) {
        renderAsJSON(callback, elasticsearchService.dates(store, productId, date))
    }

    def times(String store, Long productId, String date, String callback) {
        renderAsJSON(callback, elasticsearchService.times(store, productId, date))
    }

    /**
     * Returns the list of visited products
     * @param store - the store on which the search will be performed
     * @param lang - the language to use for translations
     * @param hidden - whether to include or not hidden products
     * @param criteria - history criteria
     * @param callback - jsonp callback
     */
    def history(String store, String lang, boolean hidden, HistorySearchCriteria criteria, String callback) {
        renderAsJSON(callback, elasticsearchService.history(session[STORE_DATA] as StoreSessionData, store, lang, hidden, criteria))
    }

    /**
     * create a new comment
     * @param store - the store on which the comment will be saved
     * @param comment - the comment to save
     * @param callback - jsonp callback
     * @return
     */
    def saveComment(String store, Comment comment, String callback) {
        renderAsJSON(callback, elasticsearchService.saveComment(store, comment))
    }

    /**
     * update comment
     * @param store - the store on which the comment will be updated
     * @param commentId - the comment id
     * @param notation - 0 if not useful, 1 if useful
     * @param callback - jsonp callback
     * @return
     */
    def updateComment(String store, String commentId, short notation, String callback) {
        renderAsJSON(callback, elasticsearchService.updateComment(store, commentId, notation))
    }

    /**
     * load product comments
     * @param store - the store on which the search will be performed
     * @param criteria - search criteria
     * @param callback - jsonp callback
     * @return
     */
    def listProductComments(String store, CommentSearchCriteria criteria, String callback) {
        renderAsJSON(callback, elasticsearchService.listProductComments(store, criteria))
    }

    /**
     *
     * @param store - the store on which the search will be performed
     * @param callback - jsonp callback
     */
    def languages(String store, String callback) {
        renderAsJSON(callback, elasticsearchService.getStoreLanguages(store))
    }

    /**
     *
     * @param store - the store on which the search will be performed
     * @param lang - the language to use
     * @param q - the terms to look for
     * @param highlight - whether to highlight or not the terms we are looking for
     * @param callback - jsonp callback
     */
    def find(String store, String lang, String q, boolean highlight, String callback) {
        renderAsJSON(callback, elasticsearchService.find(store, lang, q, highlight))
    }

    def isNewVersionAvailable(String store, long millis) {
        File file = new File(grailsApplication.config.rootPath + '/stores/' + store + '.zip')
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
        elasticsearchService.publish(company, env, catalog)
        withFormat {
            xml { render [:] as XML }
            json { render [:] as JSON }
        }
    }

    def zipStore(String store, String date, boolean forceRefresh) {
        File file = new File("${grailsApplication.config.rootPath}/stores/${store}.zip")
        response.setContentType("application/octet-stream")
        response.setHeader("Content-Disposition", "Attachment;Filename=\"${store}.zip\"")
        //ZipOutputStream zip = new ZipOutputStream(response.outputStream)
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

    private void renderAsJSON(String callback, Object o) {
        if (callback) {
            response.contentType = 'text/javascript'
        }
        render callback ? "${callback}(${o as JSON})" : o as JSON
    }

    def registerUserAction() {
        render "OK"
    }
}
