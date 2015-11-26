<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="main">
    <title>Mogobiz - ${request.seller.company.name}</title>



    <script src="http://www.openlayers.org/api/OpenLayers.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>


    %{--<r:require modules="core, partner, company"/>--}%
    <%
        String env = grails.util.Environment.current.name
    %>
    <!-- core stylesheet -->
    <link rel="stylesheet" type="text/css"
          href='${resource(dir: "css", file: "${env}/jquery-ui/themes/facebook-theme/jquery-ui-1.8.10.custom.css")}'/>

    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jwysiwyg/jquery.wysiwyg.css")}'/>

    <link rel="stylesheet" type="text/css"
          href='${resource(dir: "css", file: "${env}/jQueryMultiSelect/jquery.multiselect.css")}'/>
    <link rel="stylesheet" type="text/css"
          href='${resource(dir: "css", file: "${env}/jQueryMultiSelect/jquery.multiselect.filter.css")}'/>

    <link rel="stylesheet" type="text/css"
          href='${resource(dir: "css", file: "${env}/fancybox/jquery.fancybox-1.3.4.css")}'/>

    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/showLoading/showLoading.css")}'/>

    <link rel="stylesheet" type="text/css"
          href='${resource(dir: "css", file: "${env}/jquery.notice/jquery.notice.css")}'/>

    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/cleditor/jquery.cleditor.css")}'/>

    <link rel="stylesheet" type="text/css"
          href='${resource(dir: "css", file: "${env}/jQueryPaginate/jquery.paginate.css")}'/>

    <link rel="stylesheet" type="text/css"
          href='${resource(dir: "css", file: "${env}/slickgrid_v2.0/slick.grid.css")}'/>
    <link rel="stylesheet" type="text/css"
          href='${resource(dir: "css", file: "${env}/slickgrid_v2.0/slick.pager.css")}'/>
    <link rel="stylesheet" type="text/css"
          href='${resource(dir: "css", file: "${env}/slickgrid_v2.0/slick.columnpicker.css")}'/>

    <link rel="stylesheet" type="text/css"
          href='${resource(dir: "css", file: "${env}/jQueryFileUpload/jquery.fileupload-ui.css")}'/>

    <link rel="stylesheet" type="text/css"
          href='${resource(dir: "css", file: "${env}/jquery-gentleSelect/jquery-gentleSelect.css")}'/>

    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jquery.tagsinput.css")}'/>
    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jquery.weekcalendar.css")}'/>
    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/uniform.aristo.css")}'/>
    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/agile_carousel.css")}'/>
    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/upload.css")}'/>
    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/popup.css")}'/>
    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/main.css")}'/>

    <!-- company stylesheet -->
    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/company.css")}'/>

    <!-- partner stylesheet -->
    <link rel="stylesheet" type="text/css"
          href='${resource(dir: "css", file: "${env}/openStreetMap/openStreetMap.css")}'/>
    <link rel="stylesheet" type="text/css"
          href='${resource(dir: "css", file: "${env}/openStreetMap/openStreetMapContextMenu.css")}'/>

    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/googleMap/googleMap.css")}'/>

    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/partner.css")}'/>
    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/categories.css")}'/>

    <!-- core javascript -->
    <g:javascript src="${env}/jquery/jquery-1.9.1.js"/>
    <g:javascript src="${env}/jquery/jquery-ui.js"/>
    <g:javascript src="${env}/jquery/JStepper.js"/>
    <g:javascript src="${env}/jquery/jquery.json-2.2.min.js"/>
    <g:javascript src="${env}/jquery/jquery.populate.js"/>
    <g:javascript src="${env}/jquery/agile_carousel.a1.js"/>
    <g:javascript src="${env}/jquery/jquery.notice.js"/>
    <g:javascript src="${env}/jquery/jquery.event.drag-2.0.min.js"/>
    <g:javascript src="${env}/jquery.weekcalendar.js"/>
    <g:javascript src="${env}/jquery/jquery.tagsinput.js"/>

    <g:javascript src="${env}/jQueryBrowser/jQuery.browser.js"/>

    <g:javascript src="${env}/jQueryMultiSelect/jquery.multiselect.js"/>
    <g:javascript src="${env}/jQueryMultiSelect/jquery.multiselect.filter.js"/>
    <g:javascript src="${env}/jQueryMultiSelect/multiselectSlides.min.js"/>

    <g:javascript src="${env}/fancybox/jquery.fancybox-1.3.4.js"/>

    <g:javascript src="${env}/showLoading/showLoading.js"/>

    <g:javascript src="${env}/jwysiwyg/jquery.wysiwyg.js"/>

    <g:javascript src="${env}/cleditor/jquery.cleditor.js"/>

    <g:javascript src="${env}/jQueryPaginate/jquery.paginate.js"/>

    <g:javascript src="${env}/iphone-switch/jquery.iphone-switch.js"/>

    <g:javascript src="${env}/slickgrid_v2.0/slick.autotooltips.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.cellcopymanager.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.cellrangedecorator.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.cellrangeselector.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.cellselectionmodel.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.checkboxselectcolumn.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.columnpicker.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.core.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.dataview.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.editors.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.formatters.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.grid.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.groupitemmetadataprovider.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.pager.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.remotemodel.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.rowmovemanager.js"/>
    <g:javascript src="${env}/slickgrid_v2.0/slick.rowselectionmodel.js"/>

    <g:javascript src="${env}/jQueryFileUpload/jquery.fileupload.js"/>
    <g:javascript src="${env}/jQueryFileUpload/jquery.fileupload-ui.js"/>

    <g:javascript src="${env}/jquery-gentleSelect/jquery-gentleSelect.js"/>

    <g:javascript src="${env}/application.js"/>
    <g:javascript src="${env}/main.js"/>

    <g:javascript src="${env}/translation.js"/>
    <g:javascript src="${env}/security.js"/>

    <!-- company javascript -->
    <g:javascript src="${env}/company.js"/>
    <g:javascript src="${env}/companyGeneral.js"/>
    <g:javascript src="${env}/companyProfiles.js"/>
    <g:javascript src="${env}/companyVariations.js"/>
    <g:javascript src="${env}/companyShipping.js"/>
    <g:javascript src="${env}/companyTax.js"/>
    <g:javascript src="${env}/companyPayment.js"/>
    <g:javascript src="${env}/companySellers.js"/>
    <g:javascript src="${env}/companyBrands.js"/>
    <g:javascript src="${env}/companyCoupons.js"/>
    <g:javascript src="${env}/companyPublishing.js"/>
    <g:javascript src="${env}/companyApiKeys.js"/>
    <g:javascript src="${env}/companyIBeacon.js"/>
    <g:javascript src="${env}/companyTags.js"/>

    <!-- partner javascript -->
    <g:javascript src="${env}/openStreetMap/openStreetMap.js"/>
    <g:javascript src="${env}/openStreetMap/openStreetMapContextMenu.js"/>

    <g:javascript src="${env}/googleMap/googleMap.js"/>

    <g:javascript src="${env}/catalog.js"/>
    <g:javascript src="${env}/category.js"/>
    <g:javascript src="${env}/partner.js"/>
    <g:javascript src="${env}/userProfile.js"/>
    <g:javascript src="${env}/brand.js"/>

    <g:javascript src="${env}/catalogProducts.js"/>

    <g:javascript src="${env}/tourismDescription.js"/>
    <g:javascript src="${env}/tourismFeatures.js"/>
    <g:javascript src="${env}/tourismPricing.js"/>
    <g:javascript src="${env}/tourismCalendar.js"/>
    <g:javascript src="${env}/tourismSuggestions.js"/>
    <g:javascript src="${env}/tourismProduct.js"/>
    <g:javascript src="${env}/tourismProperties.js"/>
    <g:javascript src="${env}/tourismTranslation.js"/>
    <g:javascript src="${env}/sale.js"/>

    <g:javascript src="${env}/categoryTree.js"/>
    <g:javascript src="${env}/categoryGeneral.js"/>
    <g:javascript src="${env}/categoryFeatures.js"/>
    <g:javascript src="${env}/categoryProducts.js"/>
    <g:javascript src="${env}/categoryTranslation.js"/>
    <g:javascript src="${env}/categoryVariations.js"/>

    <g:javascript src="${env}/jQueryJSTree/jquery.jstree.js"/>
    <g:javascript src="${env}/jQueryJSTree/script.js"/>

    <r:script>
            //-----MENUS----//
            var userMenuListPageUrl = "${resource(dir: 'menus', file:'_userMenu.gsp')}";
            var catalogMenuListPageUrl = "${resource(dir: 'menus', file:'_catalogMenu.gsp')}";

            //-----Security----//
            var securityGetAllUsersUrl = "${createLink(controller: 'seller', action: 'show')}";
            var securityGetUserGrantedPermissionUrl = "${createLink(controller: 'profile', action: 'showUsersGrantedPermission')}";
            var securityAddUserPermissionUrl = "${createLink(controller: 'profile', action: 'addUserPermission')}";
            var securityRemoveUserPermissionUrl = "${createLink(controller: 'profile', action: 'removeUserPermission')}";

            //-----Companies----//
            var getAllCompaniesUrl = "${createLink(controller: 'seller', action: 'show')}";
            var setActiveCompanyUrl ="${createLink(controller: 'seller', action: 'setActiveCompany')}";

            //-----CATALOG----//
            var showCatalogUrl = "${createLink(controller: 'catalog', action: 'show')}";
            var createCatalogUrl = "${createLink(controller: 'catalog', action: 'save')}";
            var updateCatalogUrl = "${createLink(controller: 'catalog', action: 'update')}";
            var deleteCatalogUrl = "${createLink(controller: 'catalog', action: 'delete')}";
            var markDeletedCatalogUrl = "${createLink(controller: 'catalog', action: 'markDeleted')}";
            var publishCatalogUrl = "${createLink(controller: 'elasticsearch', action: 'publish')}";
            var importCatalogUrl = "${createLink(controller: 'impex', action: 'ximport')}";
            var exportCatalogUrl = "${createLink(controller: 'impex', action: 'export')}";

            var catalogCreatePageUrl = "${resource(dir: 'partner', file: '_createCatalog.gsp')}";
            var catalogTabPageUrl = "${resource(dir: 'partner', file: '_catalogTab.gsp')}";
            var catalogImportPageUrl = "${resource(dir: 'partner', file: '_importCatalog.gsp')}";

            var catalogTitleLabel = "${message(code: 'catalog.title.label')}";
            var catalogUniqueNameLabel = "${message(code: 'catalog.unique.name.label')}";
            var catalogDeleteEmptyLabel = "${message(code: 'catalog.delete.empty.label')}";
            var catalogDeleteLabel = "${message(code: 'catalog.delete.label')}";
            var catalogImportLabel  = "${message(code: 'catalog.import.label')}";
            var catalogExportLabel = "${message(code: 'catalog.export.label')}";
            var catalogPublicationRunningLabel = "${message(code: 'catalog.publicationRunning.label')}";
            var catalogLastPublicationLabel = "${message(code: 'catalog.lastPublication.label')}";
            var catalogPublicationSuccessLabel = "${message(code: 'catalog.publicationSuccess.label')}";
            var catalogPublicationFailureLabel = "${message(code: 'catalog.publicationFailure.label')}";
            var catalogImportFailureLabel = "${message(code: 'catalog.importFailure.label')}";

            //-----CATALOG PRODUCTS----//
            var catalogProductsSearchPageUrl = "${resource(dir: 'partner', file: '_catalogProducts.gsp')}";
            var catalogProductsSearchUrl = "${createLink(controller: 'product', action: 'search')}";

            //-----CATEGORY----//
            var showCategoryUrl = "${createLink(controller: 'category', action: 'show')}";
            var createCategoryUrl = "${createLink(controller: 'category', action: 'save')}";
            var updateCategoryUrl = "${createLink(controller: 'category', action: 'update')}";
            var deleteCategoryUrl = "${createLink(controller: 'category', action: 'delete')}";
            var markDeletedCategoryUrl = "${createLink(controller: 'category', action: 'markDeleted')}";

            var categoryCreateTreeLabel = "${message(code: 'category.tree.create.label')}";
            var categoryDeleteTreeLabel = "${message(code: 'category.tree.delete.label')}";
            var categoryCreateTitleLabel = "${message(code: 'category.create.title.label')}";
            var categoryNameExistLabel = "${message(code: 'category.name.exist.error.label')}";
            var categoryDeleteFailedLabel = "${message(code: 'category.delete.failed.label')}";
            var categoryFeaturesTitleLabel = "${message(code: 'category.features.title.label')}";
            var categoryVariationsTitleLabel = "${message(code: 'category.variations.title.label')}";

            var categoryCreatePageUrl = "${resource(dir: 'partner', file: '_createCategory.gsp')}";
            var categoryTabPageUrl = "${resource(dir: 'partner', file: '_categoryTab.gsp')}";
            var categoryFeaturePageUrl = "${resource(dir: 'partner', file: '_categoryFeature.gsp')}";
            var categoryVariationsPageUrl = "${resource(dir: 'partner', file: '_categoryVariation.gsp')}";

            //-----TRANSLATE----//
            var createTranslationPageUrl = "${resource(dir: 'partner', file: '_createTranslation.gsp')}";
            var deleteTranslationPageUrl = "${resource(dir: 'partner', file: '_deleteTranslation.gsp')}";

            var listTranslationUrl = "${createLink(controller: 'translation', action: 'list')}";
            var updateTranslationUrl = "${createLink(controller: 'translation', action: 'update')}";
            var deleteTranslationUrl = "${createLink(controller: 'translation', action: 'delete')}";

            var translationLanguageGridLabel = "${message(code: 'translation.language.label')}";
            var translationNameGridLabel = "${message(code: 'translation.name.label')}";
            var translationKeywordsGridLabel = "${message(code: 'translation.keywords.label')}";
            var translationValueGridLabel = "${message(code: 'translation.value.label')}";
            var translationValuesGridLabel = "${message(code: 'translation.values.label')}";
            var translationWebstieGridLabel = "${message(code: 'translation.website.label')}";
            var translationDescriptionGridLabel = "${message(code: 'translation.description.label')}";
            var translationPastilleGridLabel = "${message(code: 'translation.pastille.label')}";
            var translationDialogTitleLabel = "${message(code: 'translation.dialog.title.label')}";

            //-----VARIATIONS----//
            var showVariationsUrl = "${createLink(controller: 'variation', action: 'show')}";
            var createVariationsUrl = "${createLink(controller: 'variation', action: 'save')}";
            var updateVariationsUrl = "${createLink(controller: 'variation', action: 'update')}";
            var updateVariationsPositionUrl = "${createLink(controller: 'variation', action: 'updatePosition')}";
            var deleteVariationsUrl = "${createLink(controller: 'variation', action: 'delete')}";
            var createVariationValueUrl = "${createLink(controller: 'variation', action: 'addVariationValue')}";
            var updateVariationValueUrl = "${createLink(controller: 'variation', action: 'updateVariationValue')}";
            var deleteVariationValueUrl = "${createLink(controller: 'variation', action: 'removeVariationValue')}";
            var variationsUniqueErrorLabel = "${message(code: 'variations.error.unique.label')}";
            var variationsMaximumErrorLabel = "${message(code: 'variations.error.maximum.label')}";
            var variationsEmptyValueErrorLabel = "${message(code: 'variations.error.emptyValue.label')}";
            var variationsValueNotAllowedErrorLabel = "${message(code: 'variations.error.notAllowed.label')}";
            var variationsTranslationErrorLabel = "${message(code: 'variations.error.translation.label')}";
            var variationsReferenceErrorLabel = "${message(code: 'variations.error.reference.label')}";
            var variationsResourceErrorLabel = "${message(code: 'variations.error.invalidResource.label')}";

            var listVariationResourcesUrl = "${createLink(controller: 'variation', action: 'ListVariationsResources')}";
            var addVariationResourceUrl = "${createLink(controller: 'variation', action: 'AddVariationResource')}";
            var removeVariationResourceUrl = "${createLink(controller: 'variation', action: 'RemoveVariationResource')}";
            var removeAllVariationResourcesUrl = "${createLink(controller: 'variation', action: 'RemoveVariationResources')}";

            var removeAllVariationResourcesMessage = "${message(code: 'variations.resources.removeAll.message')}";

            //-----PRODUCT----//
            var showProductUrl = "${createLink(controller: 'product', action: 'show')}";
            var updateProductUrl = "${createLink(controller: 'product', action: 'update')}";
            var createProductUrl = "${createLink(controller: 'product', action: 'save')}";
            var existProductCodeUrl = "${createLink(controller: 'product', action: 'existCode')}";
            var markDeletedProductUrl = "${createLink(controller: 'product', action: 'markDeleted')}";

            var createProductPageUrl = "${resource(dir: 'partner', file: '_createProduct.gsp')}";
            var productTourismPageUrl = "${resource(dir: 'partner', file: '_tourismProduct.gsp')}";
            var productDescriptionPageUrl = "${resource(dir: 'partner', file: '_tourismDescription.gsp')}";

            var uploadResourceUrl = "${createLink(controller: 'upload', action: 'uploadResource')}?format=json";
            var getProductPicturesUrl = '${createLink(controller: 'productResource', action: 'retrieveProductResources')}';
            var unbindProductPicturesUrl = '${createLink(controller: 'productResource', action: 'unbindResourceToProduct')}';

            //-----PRODUCT TAGS----//
            var getProductTagsUrl = "${createLink(controller: 'product', action: 'getTagsByProduct')}";
            var getCompanyTagsUrl = "${createLink(controller: 'product', action: 'getTagsByCompany')}";
            var addProductTagUrl = "${createLink(controller: 'product', action: 'addTag')}";
            var removeProductTagUrl = "${createLink(controller: 'product', action: 'removeTag')}";

            //-----Properties----//
            var savePropertyUrl = "${createLink(controller: 'product', action: 'saveProperty')}";
            var deletePropertyUrl = "${createLink(controller: 'product', action: 'deleteProperty')}";
            var tourismPropertiesPageUrl = "${resource(dir: 'partner', file: '_tourismProperties.gsp')}";

            //-----FEATURES----//
            var showFeaturesUrl = "${createLink(controller: 'feature', action: 'show')}";
            var createFeaturesUrl = "${createLink(controller: 'feature', action: 'save')}";
            var updateFeaturesUrl = "${createLink(controller: 'feature', action: 'update')}";
            var updateFeaturesPositionUrl = "${createLink(controller: 'feature', action: 'updatePosition')}";
            var deleteFeaturesUrl = "${createLink(controller: 'feature', action: 'delete')}";
            var tourismFeaturePageUrl = "${resource(dir: 'partner', file: '_tourismFeatures.gsp')}";

            //----- POI -----//
            var showPoiUrl = "${createLink(controller: 'poi', action: 'show')}";
            var updatePoiUrl = "${createLink(controller: 'poi', action: 'update')}";
            var createPoiUrl = "${createLink(controller: 'poi', action: 'save')}";
            var deletePoiUrl = "${createLink(controller: 'poi', action: 'delete')}";
            var listPoiTypesUrl = "${createLink(controller: 'poi', action: 'listPOITypes')}";
            var listPoiPicturesUrl = "${createLink(controller: 'poi', action: 'listPOIPictures')}";

            var poiPictureDialogPageUrl = "${resource(dir: 'partner', file: '_poiPicture.gsp')}";
            var poiDialogPageUrl = "${resource(dir: 'partner', file: '_poi.gsp')}";

            // Calendar
            var getCalendarEventUrl =  "${createLink(controller: 'intraDayPeriod', action: 'show')}";
            var saveCalendarEventUrl =  "${createLink(controller: 'intraDayPeriod', action: 'save')}";
            var updateCalendarEventUrl =  "${createLink(controller: 'intraDayPeriod', action: 'update')}";
            var deleteCalendarEventUrl = "${createLink(controller: 'intraDayPeriod', action: 'delete')}";
            var getKoPeriodsUrl = "${createLink(controller: 'productKoPeriods', action: 'show')}";
            var createKoPeriodsUrl = "${createLink(controller: 'productKoPeriods', action: 'save')}";
            var updateKoPeriodsUrl = "${createLink(controller: 'productKoPeriods', action: 'update')}";
            var deleteKoPeriodsUrl = "${createLink(controller: 'productKoPeriods', action: 'delete')}";

            var tourismCalendarPageUrl = "${resource(dir: 'partner', file: '_tourismCalendar.gsp')}";

            //Suggestions
            var tourismSuggestionsListCompanies = "${createLink(controller: 'suggestions', action: 'listCompaniesForSuggestions')}";
            var tourismSuggestionsListProducts = "${createLink(controller: 'suggestions', action: 'listProductsForSuggestions')}";
            var tourismSuggestionsListSuggestions = "${createLink(controller: 'suggestions', action: 'retrieveProductSuggestions')}";
            var tourismSuggestionsBindSuggestions = "${createLink(controller: 'suggestions', action: 'bindSuggestionsToProduct')}";

            var tourismSuggestionsPageUrl = "${resource(dir: 'partner', file: '_tourismSuggestions.gsp')}";

            //TicketTypes
            var loadTicketTypeURL = '${createLink(controller: 'ticketType', action: 'show')}';
            var createTicketTypeURL = '${createLink(controller: 'ticketType', action: 'save')}';
            var updateTicketTypeURL = '${createLink(controller: 'ticketType', action: 'update')}';
            var deleteTicketTypeURL = '${createLink(controller: 'ticketType', action: 'delete')}';

            var tourismPricingSaveResourceUrl = "${createLink(controller: 'downloadable', action: 'save')}";
            var tourismPricingDeleteResourceUrl = "${createLink(controller: 'downloadable', action: 'delete')}";
            var tourismPricingGetResourceUrl = "${createLink(controller: 'downloadable', action: 'display')}";
            var tourismPricingHasResourceUrl = "${createLink(controller: 'downloadable', action: 'hasResource')}";

            var tourismPricingResourceUnauthorizedError = "${message(code: 'tourismPricing.errors.resourceUnauthorized.label')}";
            var tourismPricingResourceNotFoundError = "${message(code: 'tourismPricing.errors.resourceNotFound.label')}";

            var tourismPricingPageUrl = "${resource(dir: 'partner', file: '_tourismPricing.gsp')}";

            //Brands
            var fetchBrandUrl = "${createLink(controller: 'brand', action: 'show')}";
            var createBrandUrl = "${createLink(controller: 'brand', action: 'save')}";
            var updateBrandUrl = "${createLink(controller: 'brand', action: 'update')}";
            var deleteBrandUrl = "${createLink(controller: 'brand', action: 'delete')}";
            var productBrandsUploadLogoUrl = "${createLink(controller: 'brand', action: 'uploadLogo')}?format=json";
            var productBrandsDeleteLogoUrl = "${createLink(controller: 'brand', action: 'removeLogo')}";
            var productBrandsDisplayLogoUrl = "${createLink(controller: 'brand', action: 'displayLogo')}";
            var productBrandsHasLogoUrl = "${createLink(controller: 'brand', action: 'hasLogo')}";

            var BrandPageUrl = "${resource(dir: 'partner', file: '_brand.gsp')}";

            //----- Profile -----//
            var profileChangePasswordUrl = "${createLink(controller: 'sellerPassword', action: 'renewPassword')}";
            var profilePageUrl = "${resource(dir: 'user', file: '_profile.gsp')}";
            var profilePasswordPageUrl = "${resource(dir: 'user', file: '_changePassword.gsp')}";

            var profilePasswordPageTitle = "${message(code: 'company.sellers.changePassword.title')}";
            var profilePasswordDontMatchError = "${message(code: 'company.sellers.errors.passwordDontMatch.message')}";
            var profilePasswordIncorrectError = "${message(code: 'company.sellers.errors.incorrectPassword.message')}";
            var profilePasswordIncorrectOldError = "${message(code: 'company.sellers.errors.incorrectOldPassword.message')}";

            //----- Company -----//
            var companyPageUrl = "${createLink(controller: 'company', action: 'initDisplayCompany')}";

            // General
            var showCompanyUrl = "${createLink(controller: 'company', action: 'show')}";
            var updateCompanyUrl = "${createLink(controller: 'company', action: 'update')}";

            //Profiles
            var companyShowProfilesUrl = "${createLink(controller: 'profile', action: 'index')}";
            var companyApplyProfileUrl = "${createLink(controller: 'profile', action: 'apply')}";
            var companySaveProfileUrl = "${createLink(controller: 'profile', action: 'save')}";
            var companyCopyProfileUrl = "${createLink(controller: 'profile', action: 'copy')}";
            var companyDeleteProfileUrl = "${createLink(controller: 'profile', action: 'delete')}";
            var companyUnbindProfileUrl = "${createLink(controller: 'profile', action: 'unbind')}";
            var companyGetProfilePermissionsUrl = "${createLink(controller: 'profile', action: 'permissions')}";

            var companyProfilesPageUrl = "${resource(dir: 'admin', file: '_createCompanyProfile.gsp')}";
            var companySystemProfilePageUrl = "${resource(dir: 'admin', file: '_applySystemProfile.gsp')}";

            var companyProfilesTitleLabel = "${message(code: 'company.profiles.title')}";
            var companyProfilesTitleAddLabel = "${message(code: 'company.profiles.add.title')}";
            var companyProfilesTitleEditLabel = "${message(code: 'company.profiles.edit.title')}";
            var companyProfilesTitleApplyLabel = "${message(code: 'company.profiles.apply.title')}";
            var companyProfilesTitleUnbindLabel = "${message(code: 'company.profiles.unbind.title')}";
            var companyProfilesNameLabel = "${message(code: 'company.profiles.name.label')}";
            var companyProfilesSystemProfileLabel = "${message(code: 'company.profiles.systemProfile.label')}";
            var companyProfilesUnbindMessage = "${message(code: 'company.profiles.unbind.message')}";
            var companyProfilesUnauthorizedMessage = "${message(code: 'company.profiles.unauthorized.message')}";

            // Seller
            var sellerShowUrl = "${createLink(controller: 'seller', action: 'show')}";
            var sellerSaveUrl = "${createLink(controller: 'seller', action: 'save')}";
            var sellerUpdateUrl = "${createLink(controller: 'seller', action: 'update')}";
            var sellerAddCompanyUrl = "${createLink(controller: 'seller', action: 'addCompany')}";
            var sellerRemoveCompanyUrl = "${createLink(controller: 'seller', action: 'removeCompany')}";
            var existSellerEmailUrl = "${createLink(controller: 'seller', action: 'isEmailNew')}";
            var sellerDialogPageUrl = "${createLink(controller: 'seller', action: 'initSellerDialogPage')}";
            var sellerPasswordUrl = "${createLink(controller: 'sellerPassword', action: 'resetPassword')}";
            var sellerAddProfileUrl = "${createLink(controller: 'profile', action: 'addUserProfile')}";
            var sellerRemoveProfileUrl = "${createLink(controller: 'profile', action: 'removeUserProfile')}";

            var companySellersTitleAddLabel = "${message(code: 'company.sellers.add.title')}";
            var companySellersTitleEditLabel = "${message(code: 'company.sellers.edit.title')}";

            // Shipping
            var shippingPolicyShowUrl = "${createLink(controller: 'companyShippingPolicy', action: 'show')}";
            var shippingPolicyUpdateUrl = "${createLink(controller: 'companyShippingPolicy', action: 'update')}";
            var shippingRulesListUrl = "${createLink(controller: 'shippingRule', action: 'list')}";
            var shippingRulesSaveUrl = "${createLink(controller: 'shippingRule', action: 'save')}";
            var shippingRulesDeleteUrl = "${createLink(controller: 'shippingRule', action: 'delete')}";

            var companyShippingChooseCountryErrorLabel = "${message(code: 'company.shipping.errors.chooseCountry.label')}";

            var companyShippingRulesCountryCodeLabel = "${message(code: 'company.shipping.rules.countryCode.label')}";
            var companyShippingRulesMaxAmountLabel = "${message(code: 'company.shipping.rules.maxAmount.label')}";
            var companyShippingRulesMinAmountLabel = "${message(code: 'company.shipping.rules.minAmount.label')}";
            var companyShippingRulesPriceLabel = "${message(code: 'company.shipping.rules.price.label')}";

            var companyShippingRulesCreatePageUrl = "${resource(dir: 'admin', file: '_createShippingRule.gsp')}";

            //TaxRate
            var taxRateListUrl = "${createLink(controller: 'taxRate', action: 'listTaxRate')}";
            var taxRateCreateUrl = "${createLink(controller: 'taxRate', action: 'createTaxRate')}";
            var taxRateUpdateUrl = "${createLink(controller: 'taxRate', action: 'updateTaxRate')}";
            var taxRateDeleteUrl = "${createLink(controller: 'taxRate', action: 'deleteTaxRate')}";
            var taxRateListLocalUrl = "${createLink(controller: 'taxRate', action: 'listLocalTaxRate')}";
            var taxRateCreateLocalUrl = "${createLink(controller: 'taxRate', action: 'createLocalTaxRate')}";
            var taxRateUpdateLocalUrl = "${createLink(controller: 'taxRate', action: 'updateLocalTaxRate')}";
            var taxRateDeleteLocalUrl = "${createLink(controller: 'taxRate', action: 'deleteLocalTaxRate')}";

            var taxRateCreatePageUrl = "${resource(dir: 'admin', file: '_createTaxRate.gsp')}";
            var taxRateLocalCreatePageUrl = "${resource(dir: 'admin', file: '_createLocalTaxRate.gsp')}";

            // Payment
            var paymentPolicyShowUrl = "${createLink(controller: 'companyPaymentPolicy', action: "show")}";
            var paymentPolicyUpdateUrl = "${createLink(controller: 'companyPaymentPolicy', action: "update")}";

            // API KEY
            var apiKeyGeneratorUrl = "${createLink(controller: 'keyGen', action: "generateAPIKey")}";

        //Brands
            var companyShowBrandsUrl = '${createLink(controller: 'brand', action: 'show')}';
            var companyCreateBrandsUrl = '${createLink(controller: 'brand', action: 'save')}';
            var companyUpdateBrandsUrl = '${createLink(controller: 'brand', action: 'update')}';
            var companyDeleteBrandsUrl = '${createLink(controller: 'brand', action: 'delete')}';
            var companyBrandsUploadLogoUrl = "${createLink(controller: 'brand', action: 'uploadLogo')}?format=json";
            var companyBrandsDeleteLogoUrl = "${createLink(controller: 'brand', action: 'removeLogo')}";
            var companyBrandsDisplayLogoUrl = "${createLink(controller: 'brand', action: 'displayLogo')}";
            var companyBrandsHasLogoUrl = "${createLink(controller: 'brand', action: 'hasLogo')}";

            var companyBrandsPageUrl = "${resource(dir: 'admin', file: '_createCompanyBrand.gsp')}";

            var companyBrandsTitleLabel = "${message(code: 'company.brands.title.label')}";
            var companyBrandsNameLabel = "${message(code: 'company.brands.name.label')}";
            var companyBrandsWebsiteLabel = "${message(code: 'company.brands.website.label')}";
            var companyBrandsHideLabel = "${message(code: 'company.brands.hide.label')}";
            var companyBrandsWebsiteErrorLabel = "${message(code: 'company.brands.invalidWebsite.label')}";
            var companyBrandsUniqueErrorLabel = "${message(code: 'company.brands.uniqueName.label')}";
            var companyBrandsLogoErrorLabel = "${message(code: 'company.brands.invalidLogo.label')}";

            //Coupons
            var companyShowCouponsUrl = '${createLink(controller: 'coupon', action: 'list')}';
            var companyCreateCouponsUrl = '${createLink(controller: 'coupon', action: 'create')}';
            var companyUpdateCouponsUrl = '${createLink(controller: 'coupon', action: 'update')}';

            var companyCouponsSearchCategoriesUrl = '${createLink(controller: 'category', action: 'show')}';
            var companyCouponsSearchProductsUrl = '${createLink(controller: 'product', action: 'show')}';
            var companyCouponsSearchSkuUrl = '${createLink(controller: 'ticketType', action: 'show')}';

            var companyCouponsPageUrl = "${resource(dir: 'admin', file: '_createCompanyCoupons.gsp')}";
            var companyCouponsRulesPageUrl = "${resource(dir: 'admin', file: '_createCompanyCouponsRule.gsp')}";

            var companyCouponsTitleLabel = "${message(code: 'company.coupons.title.label')}";
            var companyCouponsNameLabel = "${message(code: 'company.coupons.name.label')}";
            var companyCouponsCodeLabel = "${message(code: 'company.coupons.code.label')}";
            var companyCouponsPastilleLabel= "${message(code: 'company.coupons.pastille.label')}";
            var companyCouponsActiveLabel = "${message(code: 'company.coupons.active.label')}";
            var companyCouponsCatalogWiseLabel = "${message(code: 'company.coupons.catalogWise.label')}";
            var companyCouponsNumberOfUseLabel = "${message(code: 'company.coupons.numberOfUse.label')}";
            var companyCouponsStartDateLabel = "${message(code: 'company.coupons.startDate.label')}";
            var companyCouponsEndDateLabel = "${message(code: 'company.coupons.endDate.label')}";
            var companyCouponsNumberErrorLabel = "${message(code: 'company.coupons.invalidNumber.label')}";
            var companyCouponsUniqueNameErrorLabel = "${message(code: 'company.coupons.uniqueName.label')}";
            var companyCouponsUniqueCodeErrorLabel = "${message(code: 'company.coupons.uniqueCode.label')}";
            var companyCouponsCatalogErrorLabel = "${message(code: 'company.coupons.catalog.label')}";

            var companyCouponsRulesTitleLabel = "${message(code: 'company.coupons.rules.title.label')}";
            var companyCouponsRulesTypeLabel = "${message(code: 'company.coupons.rules.type.label')}";
            var companyCouponsRulesDiscountLabel = "${message(code: 'company.coupons.rules.discount.label')}";
            var companyCouponsRulesPurchasedLabel = "${message(code: 'company.coupons.rules.purchased.label')}";
            var companyCouponsRulesOfferedLabel = "${message(code: 'company.coupons.rules.offered.label')}";
            var companyCouponsRulesDiscountValueLabel = "${message(code: 'company.coupons.rules.discountValue.label')}";
            var companyCouponsRulesPurchasedOfferedValueLabel = "${message(code: 'company.coupons.rules.purchasedOfferedValue.label')}";

            //Publishing
            var companyShowPublishingUrl = '${createLink(controller: 'esEnv', action: 'show')}';
            var companyCreatePublishingUrl = '${createLink(controller: 'esEnv', action: 'save')}';
            var companyUpdatePublishingUrl = '${createLink(controller: 'esEnv', action: 'update')}';
            var companyDeletePublishingUrl = '${createLink(controller: 'esEnv', action: 'delete')}';

            var companyShowPublishingPreviousIndicesUrl = "${createLink(controller: 'elasticsearch', action: 'retrievePreviousIndices')}";
            var companyUpdatePublishingIndicesUrl = "${createLink(controller: 'elasticsearch', action: 'activateIndex')}";

            var companyPublishingPageUrl = "${resource(dir: 'admin', file: '_createCompanyPublishing.gsp')}";

            var companyPublishingTitleLabel = "${message(code: 'company.publishing.title.label')}";
            var companyPublishingNameLabel = "${message(code: 'company.publishing.name.label')}";
            var companyPublishingUrlLabel = "${message(code: 'company.publishing.url.label')}";
            var companyPublishingActiveLabel = "${message(code: 'company.publishing.active.label')}";
            var companyPublishingManualLabel = "${message(code: 'company.publishing.manual.label')}";
            var companyPublishingUniqueErrorLabel = "${message(code: 'company.publishing.unique.label')}";
            var companyPublishingUrlErrorLabel = "${message(code: 'company.publishing.invalidUrl.label')}";
            var companyPublishingCronErrorLabel = "${message(code: 'company.publishing.invalidCron.label')}";

            //IBeacon
            var companyShowIBeaconUrl = '${createLink(controller: 'ibeacon', action: 'list')}';
            var companySaveIBeaconUrl = '${createLink(controller: 'ibeacon', action: 'save')}';
            var companyDeleteIBeaconUrl = '${createLink(controller: 'ibeacon', action: 'delete')}';

            var companyIBeaconPageUrl = "${resource(dir: 'admin', file: '_createCompanyIBeacon.gsp')}";

            var companyIBeaconTitleLabel = "${message(code: 'company.iBeacon.title.label')}";
            var companyIBeaconNameLabel = "${message(code: 'company.iBeacon.name.label')}";
            var companyIBeaconUuidLabel = "${message(code: 'company.iBeacon.uuid.label')}";
            var companyIBeaconStartDateLabel = "${message(code: 'company.iBeacon.startDate.label')}";
            var companyIBeaconEndDateLabel = "${message(code: 'company.iBeacon.endDate.label')}";
            var companyIBeaconActiveLabel = "${message(code: 'company.iBeacon.active.label')}";
            var companyIBeaconUniqueErrorLabel = "${message(code: 'company.iBeacon.unique.label')}";

            //Tags
            var companyShowTagUrl = '${createLink(controller: 'tag', action: 'list')}';
            var companySaveTagUrl = '${createLink(controller: 'tag', action: 'save')}';

            var companyTagNameLabel = "${message(code: 'company.tag.name.label')}";
            var companyTagIBeaconLabel = "${message(code: 'company.tag.iBeacon.label')}";

            //END COMPANY

            //----- Sales -----//
            var backOfficePageUrl = "${createLink(controller: 'sale', action: 'initGetSalesByBuyer')}";
            var salesSearchByBuyerUrl = "${createLink(controller: 'sale', action: 'getSalesByCriteria')}";
            var salesProductsSearchByCodeAndNameUrl = "${createLink(controller: 'sale', action: 'getProducts')}";
            var salesSearchByProductAndDateUrl = "${createLink(controller: 'sale', action: 'getSalesByProduct')}";
            var sellerLocation=
            {
                city : "${request.seller?.location?.city}",
                road1 : "${request.seller?.location?.road1}",
                road2 : "${request.seller?.location?.road2}",
                road3 : "${request.seller?.location?.road3}",
                roadNum : "${request.seller?.location?.roadNum}",
                postalCode : "${request.seller?.location?.postalCode}",
                country:"${request.seller?.location?.countryCode}"
            };

            var sellerAdmin = ${request.seller.admin};
            var sellerCompanyId = ${request.seller.company.id};
            var sellerCompanyCode = "${request.seller.company.code}";
            var sellerCompanyMapProvider = "${request.seller.company.mapProvider}";
            var partnerSellerId = "${request.seller.id}";
            var partnerUserId = "${request.user?.id}";

            // hide username subnav menu after clicking an option
            function hideUsernameSubnav() {
                $("#user_name_div").parent().find("ul.subnav").hide();
            }
            function hideCompanySubnav() {
                $("#active_company_div").parent().find("ul.subnav").hide();
            }
            function hideCatalogMenuSubnav() {
                $("#catalogMenuDiv").parent().find("ul.subnav").hide();
            }
    </r:script>
    <g:render template="/partner/custom-header"/>
</head>

<body>
<content tag="header">
    <!-- header -->
    <div id="logo" style="float:left;">
        <img src="${resource(dir: 'images', file: 'logo.png')}"/>
    </div>
    <jsec:isLoggedIn>
        <div id="user" align="right">
            <ul class="topnav">
                <li id="user_name_div"><g:message code="default.menu.label"/></li>
                <li id="userMenuList"></li>
            </ul>
        </div>

        <div id="userCompanies" align="right">
            <ul class="topnav">
                <li id="active_company_div"></li>
                <li>
                    <ul class="subnav" style="display:none;"></ul>
                </li>
            </ul>
        </div>

        <div id="userLabel" align="right">
            <ul class="topnav">
                <li id="username_label_div">${request.user?.firstName}&nbsp;${request.user?.lastName}</li>
            </ul>
        </div>

        <div id="createProductMenu">
            <ul class="topnav">
                <li id="createProductLnk"><label><g:message code="navigation.create.label"/></label></li>
            </ul>
        </div>
        <br/>
    </jsec:isLoggedIn>
</content>
<!-- inner-content -->
<div id="searchForm"></div>

<div id="createProductDialog"></div>

<div id="calendarDialog"></div>

<div id="dialog"></div>

<div id="poiDialog" style="display:none;"></div>

<div id="poiPictureDialog" style="display:none; overflow: scroll;"></div>

<div id="pricingDialog"></div>

<div id="tourismProductDescriptionDialog"></div>

<div id="tourismPricingCreateDialog"></div>

<div id="tourismFeaturesCreateDialog"></div>

<div id="tourismPropertiesCreateDialog"></div>

<div id="tourismCalendarCreateDialog"></div>

<div id="tourismResourcesDialog"></div>

<div id="tourismSuggestionsDialog"></div>

<div id="shippingDialog"></div>

<div id="categoryDialog"></div>

<div id="brandDialog"></div>

<div id="items"></div>

<div id="catalogCreateDialog"></div>

<div id="categoryCreateDialog"></div>

<div id="categoryFeaturesDialog"></div>

<div id="categoryVariationsDialog"></div>

<div id="categoryVariationsResourcesDialog"></div>

<div id="translationDialog"></div>

<table id="categoriesMain" class="categoriesMain">
    <tr>
        <td class="treeCol">
            <div class="tree">
                <div class="newline">
                    <div id="catalogList"></div>

                    <div id="catalogMenu">
                        <ul class="topnav">
                            <li id="catalogMenuDiv">
                                <span class="catalog-menu-icon-bar"></span>
                                <span class="catalog-menu-icon-bar"></span>
                                <span class="catalog-menu-icon-bar"></span>
                            </li>
                            <li id="catalogMenuList"></li>
                        </ul>
                    </div>
                </div>

                <div class="newline">
                    <div id="categoryTree" class="categoryTree"></div>
                </div>
            </div>
        </td>
        <td>
            <div id="categoryDetails" class="categoryDetails"></div>
        </td>
    </tr>
</table>

<div id="companySellersDialog"></div>

<div id="taxRateDialog"></div>

<div id="shippingRuleDialog"></div>

<div id="companyBrandsDialog"></div>

<div id="companyProfilesDialog"></div>

<div id="companyCouponsDialog"></div>

<div id="companyCouponsRulesDialog"></div>

<div id="companyPublishingDialog"></div>

<div id="companyIBeaconDialog"></div>

<div id="userChangePasswordDialog"></div>
<content tag="footer">
    <!-- footer -->
    <g:render template="/layouts/footer"/>
</content>

<div id="poiInfoWindow" style="display:none; ">
    <div align="left" id="showPoiInfoDiv" style="padding: 5px; width:200px;">
        <span id="poiName_info"><b><g:message code="customer.event.poi.name.label"/>:&nbsp;</b><span
                id="poiNameLabel"></span><br/></span>
        <span id="poiCountry_info"><b><g:message code="customer.event.poi.country.label"/>:&nbsp;</b><span
                id="poiCountryLabel"></span><br/></span>
        <span id="poiCity_info"><b><g:message code="customer.event.poi.city.label"/>:&nbsp;</b><span
                id="poiCityLabel"></span><br/></span>
        <span id="poiRoad_info"><b><g:message code="customer.event.poi.street.label"/>:&nbsp;</b><span
                id="poiRoadLabel"></span><br/></span>
        <span id="poiPostalCode_info"><b><g:message code="customer.event.poi.postalcode.label"/>:&nbsp;</b><span
                id="poiPostalCodeLabel"></span><br/></span>
        <span id="poiDesc_info"><b><g:message code="customer.event.poi.description.label"/>:&nbsp;</b><span
                id="poiDescLabel"></span><br/></span>
    </div>

    <div class="spacer"></div>

    <div align="right" id="editPoiBtnDiv">
        <a onclick="openStreetMapEditPoiDialog()" id="editPoiBtn"><g:message code="default.button.edit.label"/></a>
    </div>
</div>

</body>
</html>
