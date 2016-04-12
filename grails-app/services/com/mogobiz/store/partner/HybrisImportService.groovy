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
    final static Map<String,Map<String,String>> csvObjectMappings = ['Category.csv': ['className':'com.mogobiz.store.domain.Category',
                                                                                      'properties': ['# pk': 'externalCode',
                                                                                                      'name_en' : 'name',
                                                                                                      'description_en' : 'description',
                                                                                                      'detail':'keywords']],
                                                                     'Product.csv': ['className':'com.mogobiz.store.domain.Product',
                                                                                     'properties': ['# pk': 'externalCode',
                                                                                                    'name_en' : 'name',
                                                                                                    'description_en' : 'description',
                                                                                                    'detail':'keywords']]]


    /*
    Category Headers = # pk;catalog;catalogVersion;code;creationtime;data_sheet;description_en;description_fr;detail;logo;modifiedtime;name_en;name_fr;normal;order;others;owner;picture;thumbnail;thumbnails
    Product Headers = # pk;Europe1prices;Europe1PriceFactory_PDG;Europe1PriceFactory_PPG;Europe1PriceFactory_PTG;approvalStatus;articleStatus_en;articleStatus_fr;buyerIDS;catalog;catalogVersion;code;contentUnit;creationtime;data_sheet;deliveryTime;description_en;description_fr;detail;ean;endLineNumber;erpGroupBuyer;erpGroupSupplier;europe1Discounts;europe1Prices;europe1Taxes;galleryImages;logo;manufacturerAID;manufacturerName;manufacturerTypeDescription_en;manufacturerTypeDescription_fr;maxOrderQuantity;minOrderQuantity;modifiedtime;name_en;name_fr;normal;numberContentUnits;offlineDate;onlineDate;order;orderQuantityInterval;others;owner;picture;priceQuantity;productOrderLimit;remarks_en;remarks_fr;segment_en;segment_fr;sequenceId;specialTreatmentClasses;startLineNumber;summary_en;summary_fr;supplierAlternativeAID;thumbnail;thumbnails;unit;variantType;variants;xmlcontent
     */


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

    public static Object mapToObject(Map data, Map mapping, Catalog catalog) {
        def object = Class.forName(mapping.className).newInstance()
        mapping.keySet().each { csvHeader ->
            def property = mapping.properties.get(csvHeader)
            def value = data.get(csvHeader)
            object.setProperty(property, value)
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
        csvObjectMappings.keySet().each { f ->
            def csv = csvToImport.find { it.getName().equals(f)}
            def csvMapReader = new File(csv.getAbsolutePath()).toCsvMapReader(csvSettings)
            def datalist = csvMapReader.toList()
            datalist.each { data ->
                def mapping = csvObjectMappings.get(f)
                def object = mapToObject(data, mapping, catalog)

                //save object
                if (object.validate()) {
                    //TODO category.save(flush: true)
                    println "Saving object : " + object.toString()
                } else {
                    println(" KO! ")
                }
            }
        }
    }
}
