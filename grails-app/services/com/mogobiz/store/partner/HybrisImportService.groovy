package com.mogobiz.store.partner

import com.mogobiz.service.SanitizeUrlService
import com.mogobiz.store.domain.Catalog
import com.mogobiz.utils.ZipFileUtil
import groovy.io.FileType

import java.text.SimpleDateFormat
import java.util.zip.ZipFile

class HybrisImportService {
    static transactional = true
    final static Map<String,String> csvSettings = ['separatorChar':';', 'charset':'UTF-8',]
    final static Map<String,String> fileToObject = ['Category.csv': 'com.mogobiz.store.domain.Category', 'Product.csv': 'com.mogobiz.store.domain.Product']
    final static Map<String,String> categoryMapping = ['externalCode': '# pk', 'name': 'name_en', description: 'description_en', 'keywords':'detail']
    static SanitizeUrlService sanitizeUrlService


    public static File getTempDir(String now) {
        String tempPath = System.getProperty("java.io.tmpdir")
        File tempDir = new File(new File(tempPath, "hybris-import"), now)
        tempDir.mkdirs()
        return tempDir
    }

    public static void unzipFileIntoDirectoryRecursively(ZipFile zipFile, File targetDir) {
        ZipFileUtil.unzipFileIntoDirectory(zipFile, targetDir)
        targetDir.listFiles().each {
            if (it.getName().endsWith(".zip")) {
                ZipFile itemZip = new ZipFile(it)
                String fileName = it.getName()
                String folderName = fileName.subSequence(0, fileName.lastIndexOf(".")).toString()
                File itemFile = new File(it.getParentFile().getAbsolutePath() + File.separator + folderName)
                ZipFileUtil.unzipFileIntoDirectory(itemZip, itemFile)
            }
        }
    }

    public static Object mapToObject(Map map, String objectType,Catalog catalog) {
        def object = Class.forName(objectType).newInstance()
        //TODO use dynamic mapping
        categoryMapping.keySet().each {
            def val = map.get(categoryMapping.get(it))
            object.setProperty(it, val)
        }

        //TODO Add specific properties for each object
        //Example : Category
        /*
        def category = new Category()
        category.catalog = catalog
        category.company = catalog.company
        category.uuid = UUID.randomUUID().toString()
        category.sanitizedName = sanitizeUrlService.sanitizeWithDashes(category.name)
        */

        return object
    }

    def ximport(Catalog catalog, File file) {
        //unzip hybris files
        String now = new SimpleDateFormat("yyyy-MM-dd.HHmmss").format(new Date())
        ZipFile zipFile = new ZipFile(file)
        File tempDir = getTempDir(now)
        unzipFileIntoDirectoryRecursively(zipFile, tempDir)
        def csvToImport = []

        //get list of csv files
        tempDir.eachFileRecurse(FileType.FILES) {
            if (it.name.endsWith('.csv')) {
                csvToImport << it
            }
        }

        //hybris -> mogobis mapping
        fileToObject.keySet().each { f ->
            def csv = csvToImport.find { it.getName().equals(f)}
            def csvMapReader = new File(csv.getAbsolutePath()).toCsvMapReader(csvSettings)
            def maps = csvMapReader.toList()
            maps.each { map ->
                def objectType = fileToObject.get(f)
                def object = mapToObject(map, objectType, catalog)

                //save object
                if (object.validate()) {
                    //TODO category.save(flush: true)
                    println object.toString()
                } else {
                    println(" KO! ")
                }
            }
        }
    }
}
