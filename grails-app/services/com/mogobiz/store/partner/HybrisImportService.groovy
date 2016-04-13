package com.mogobiz.store.partner

import com.mogobiz.service.SanitizeUrlService
import com.mogobiz.store.domain.*
import com.mogobiz.utils.Html2Text
import com.mogobiz.utils.IperUtil
import com.mogobiz.utils.ZipFileUtil
import groovy.io.FileType

import java.text.SimpleDateFormat
import java.util.zip.ZipFile

class HybrisImportService {
    static transactional = true
    final static Map<String, String> csvSettings = ['separatorChar': ';', 'charset': 'UTF-8',]
    //# pk	Europe1prices	Europe1PriceFactory_PTG	approvalStatus	articleStatus_en	catalog	catalogVersion	code	creationtime	data_sheet	description_en	detail	ean	europe1Prices	europe1Taxes	galleryImages	manufacturerAID	manufacturerName	modifiedtime	name_en	normal	others	picture	priceQuantity	summary_en	thumbnail	thumbnails	unit

    final
    static Map<String, Map<String, String>> csvObjectMappings = ['Category.csv': ['className' : 'com.mogobiz.store.domain.Category',
                                                                                  'properties': ['code'          : 'externalCode',                                       //hybris_attr -> mogobiz_attr
                                                                                                 'name_en'       : 'name',
                                                                                                 'description_en': 'description',
                                                                                                 'detail'        : 'keywords']],
                                                                 'Product.csv' : ['className' : 'com.mogobiz.store.domain.Product',
                                                                                  'properties': [Europe1prices                 : 'ProductProperty',
                                                                                                 Europe1PriceFactory_PDG       : 'ProductProperty',
                                                                                                 Europe1PriceFactory_PPG       : 'ProductProperty',
                                                                                                 Europe1PriceFactory_PTG       : 'ProductProperty',
                                                                                                 approvalStatus                : 'ProductProperty',
                                                                                                 articleStatus_en              : 'ProductProperty',
                                                                                                 articleStatus_fr              : 'ProductProperty',
                                                                                                 buyerIDS                      : 'ProductProperty',
                                                                                                 catalogVersion                : 'ProductProperty',
                                                                                                 code                          : 'externalCode',
                                                                                                 contentUnit                   : 'ProductProperty',
                                                                                                 // creationtime                  : 'startDate',
                                                                                                 data_sheet                    : 'ProductProperty',
                                                                                                 deliveryTime                  : 'ProductProperty',
                                                                                                 description_en                : 'description',
                                                                                                 description_fr                : 'ProductProperty',
                                                                                                 detail                        : 'keywords',
                                                                                                 ean                           : 'ProductProperty',
                                                                                                 endLineNumber                 : 'ProductProperty',
                                                                                                 erpGroupBuyer                 : 'ProductProperty',
                                                                                                 erpGroupSupplier              : 'ProductProperty',
                                                                                                 europe1Discounts              : 'ProductProperty',
                                                                                                 europe1Prices                 : 'ProductProperty',
                                                                                                 europe1Taxes                  : 'ProductProperty',
                                                                                                 galleryImages                 : 'ProductProperty',
                                                                                                 logo                          : 'ProductProperty',
                                                                                                 manufacturerAID               : 'ProductProperty',
                                                                                                 manufacturerName              : 'ProductProperty',
                                                                                                 manufacturerTypeDescription_en: 'ProductProperty',
                                                                                                 manufacturerTypeDescription_fr: 'ProductProperty',
                                                                                                 maxOrderQuantity              : 'ProductProperty',
                                                                                                 minOrderQuantity              : 'ProductProperty',
                                                                                                 modifiedtime                  : 'ProductProperty',
                                                                                                 name_en                       : 'name',
                                                                                                 name_fr                       : 'ProductProperty',
                                                                                                 normal                        : 'ProductProperty',
                                                                                                 numberContentUnits            : 'ProductProperty',
                                                                                                 offlineDate                   : 'ProductProperty',
                                                                                                 onlineDate                    : 'ProductProperty',
                                                                                                 order                         : 'ProductProperty',
                                                                                                 orderQuantityInterval         : 'ProductProperty',
                                                                                                 others                        : 'ProductProperty',
                                                                                                 owner                         : 'ProductProperty',
                                                                                                 picture                       : 'ProductProperty',
                                                                                                 priceQuantity                 : 'ProductProperty',
                                                                                                 productOrderLimit             : 'ProductProperty',
                                                                                                 remarks_en                    : 'ProductProperty',
                                                                                                 remarks_fr                    : 'ProductProperty',
                                                                                                 segment_en                    : 'ProductProperty',
                                                                                                 segment_fr                    : 'ProductProperty',
                                                                                                 sequenceId                    : 'ProductProperty',
                                                                                                 specialTreatmentClasses       : 'ProductProperty',
                                                                                                 startLineNumber               : 'ProductProperty',
                                                                                                 summary_en                    : 'ProductProperty',
                                                                                                 summary_fr                    : 'ProductProperty',
                                                                                                 supplierAlternativeAID        : 'ProductProperty',
                                                                                                 thumbnail                     : 'ProductProperty',
                                                                                                 thumbnails                    : 'ProductProperty',
                                                                                                 unit                          : 'ProductProperty',
                                                                                                 variantType                   : 'ProductProperty',
                                                                                                 variants                      : 'ProductProperty',
                                                                                                 xmlcontent                    : 'ProductProperty',
                                                                                                 '# pk_categ'                  : 'Category']],
                                                                 'CategoryProductRelation' : []]

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

    public static Category getHybrisCategory(Catalog catalog) {
        def category = Category.findByNameAndCompany('Hybris Product', catalog.company)
        if (!category) {
            category = Category.newInstance()
            category.name = 'Hybris Product'
            category.catalog = catalog
            category.company = catalog.company
            category.uuid = UUID.randomUUID()
            category.sanitizedName = sanitizeUrlService.sanitizeWithDashes(category.name)
            if (category.validate()) {
                category.save(flush: true)
            } else {
                category.errors.allErrors.each { println(it) }
            }
        }
        return category

    }

    public static Object mapToObject(Map data, Map mapping, Catalog catalog, List objectPropreties) {

        def object = Class.forName(mapping.className).newInstance()
        //TODO use category from imported data
        def hybrisCategory = getHybrisCategory(catalog)

        mapping.properties.keySet().each { csvHeader ->
            def property = mapping.properties.get(csvHeader)
            String value = data.get(csvHeader)?.take(255)
            if (value != null && !value.equals("")) {
                switch (property) {
                    case 'ProductProperty':
                        ProductProperty productProperty = ProductProperty.newInstance()
                        productProperty.uuid = UUID.randomUUID().toString()
                        productProperty.product = object
                        productProperty.name = csvHeader
                        productProperty.value = value
                        productProperty.product = object
                        if (productProperty.validate()) {
                            objectPropreties << productProperty
                        } else {
                            productProperty.errors.allErrors.each { println(it) }
                        }
                        break

                    default:
                        object.setProperty(property, value)
                        break
                }
            }
        }

        switch (object.class.name) {
            case 'com.mogobiz.store.domain.Category':
                object.catalog = catalog
                object.company = catalog.company
                object.uuid = UUID.randomUUID()
                object.sanitizedName = sanitizeUrlService.sanitizeWithDashes(object.name)
                break
            case 'com.mogobiz.store.domain.Product':
                object.sanitizedName = sanitizeUrlService.sanitizeWithDashes(object.name)
                object.modificationDate = Calendar.getInstance();
                if (object.description) {
                    object.descriptionAsText = new Html2Text(object.description).getText()
                }
                object.company = catalog.company
                object.code = UUID.randomUUID()
                object.uuid = UUID.randomUUID()
                object.xtype = ProductType.PRODUCT
                object.category = hybrisCategory
                object.startDate = Calendar.getInstance()
                object.stopDate = Calendar.getInstance().add(Calendar.YEAR, 100)
                //Product p = Product.newInstance()
                //p.getProductProperties().
                object.setProductProperties(objectPropreties.toSet())

                //add the brand
                def ppBrand = objectPropreties.find { it.name == 'manufacturerName' }
                if (ppBrand) {
                    Brand brand = Brand.findByNameAndCompany(ppBrand.value, catalog.company)
                    if (brand == null) {
                        brand = new Brand()
                        brand.name = ppBrand.value
                        brand.company = catalog.company
                        if (brand.validate()) {
                            brand.save(flush: true)
                            println 'brand.save(flush: false)'
                        } else {
                            brand.errors.allErrors.each { println(it) }
                        }
                    }
                }
                break
        }


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
            def csv = csvToImport.find { it.getName().equals(f) }
            def csvMapReader = new File(csv.getAbsolutePath()).toCsvMapReader(csvSettings)
            def datalist = csvMapReader.toList()
            datalist.each { data ->
                def mapping = csvObjectMappings.get(f)
                if (mapping) {
                    def objectProperties = []
                    def object = mapToObject(data, mapping, catalog, objectProperties)
                    //save objects
                    if (object.validate()) {
                        object.save(flush: true)
                        objectProperties.each {
                            it.save(flush: true)
                        }
                        println "Saving object : " + object.toString()
                    } else {
                        println(" KO creating : " + object.toString())
                        object.errors.allErrors.each { println(it) }
                    }

                }

            }
        }

        //delete tempDir
        tempDir.delete()
    }

}
