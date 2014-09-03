modules = {
	login {
		dependsOn 'jquery-ui'

		resource 'css/main.css'
		resource 'js/login.js'
		resource '/css/jquery.notice/jquery.notice.css'
		resource '/js/jquery/jquery.notice.js'
	}
	
	core {
		dependsOn 'jquery-ui'

		resource '/js/jQueryBrowser/jQuery.browser.js'
		resource '/js/application.js'
		resource '/js/jquery/JStepper.js'
		resource '/js/jquery/jquery.json-2.2.min.js'
		resource '/js/jquery/jquery.populate.js'
		resource '/js/jwysiwyg/jquery.wysiwyg.js'
		resource '/js/jQueryMultiSelect/jquery.multiselect.js'
		resource '/js/jQueryMultiSelect/jquery.multiselect.filter.js'
        resource '/js/jQueryMultiSelect/multiselectSlides.min.js'
		resource '/js/jquery/agile_carousel.a1.js'
		resource '/js/fancybox/jquery.fancybox-1.3.4.js'
		resource '/js/main.js'
		resource '/css/jquery-ui/themes/facebook-theme/jquery-ui-1.8.10.custom.css'
		resource '/css/jwysiwyg/jquery.wysiwyg.css'
		resource '/css/jQueryMultiSelect/jquery.multiselect.css'
		resource '/css/jQueryMultiSelect/jquery.multiselect.filter.css'
		resource '/css/agile_carousel.css'
		resource '/css/fancybox/jquery.fancybox-1.3.4.css'
		resource '/css/main.css'

		resource '/js/showLoading/showLoading.js'
		resource '/css/showLoading/showLoading.css'

		resource '/css/jquery.notice/jquery.notice.css'
		resource '/css/jquery.weekcalendar.css'
		resource '/css/uniform.aristo.css'
		resource '/css/cleditor/jquery.cleditor.css'
		resource '/css/jQueryPaginate/jquery.paginate.css'
		resource '/css/jquery.tagsinput.css'
		resource '/css/jquery.tagsinput.css'
		resource '/css/company.css'
		resource '/css/popup.css'

		//slickgrid
		resource '/css/slickgrid_v2.0/slick.grid.css'
		resource '/css/slickgrid_v2.0/slick.pager.css'
		resource '/css/slickgrid_v2.0/slick.columnpicker.css'

		// jquery and plugins
		resource '/js/jquery/jquery.notice.js'
		resource '/js/jquery/jquery.event.drag-2.0.min.js'
		resource '/js/jquery.weekcalendar.js'
		resource '/js/cleditor/jquery.cleditor.js'
		resource '/js/jQueryPaginate/jquery.paginate.js'
		resource '/js/jquery/jquery.tagsinput.js'
		resource '/js/iphone-switch/jquery.iphone-switch.js'

		// slickgrid
		resource '/js/slickgrid_v2.0/slick.autotooltips.js'
		resource '/js/slickgrid_v2.0/slick.cellcopymanager.js'
		resource '/js/slickgrid_v2.0/slick.cellrangedecorator.js'
		resource '/js/slickgrid_v2.0/slick.cellrangeselector.js'
		resource '/js/slickgrid_v2.0/slick.cellselectionmodel.js'
		resource '/js/slickgrid_v2.0/slick.checkboxselectcolumn.js'
		resource '/js/slickgrid_v2.0/slick.columnpicker.js'
		resource '/js/slickgrid_v2.0/slick.core.js'
		resource '/js/slickgrid_v2.0/slick.dataview.js'
		resource '/js/slickgrid_v2.0/slick.editors.js'
		resource '/js/slickgrid_v2.0/slick.formatters.js'
		resource '/js/slickgrid_v2.0/slick.grid.js'
		resource '/js/slickgrid_v2.0/slick.groupitemmetadataprovider.js'
		resource '/js/slickgrid_v2.0/slick.pager.js'
		resource '/js/slickgrid_v2.0/slick.remotemodel.js'
		resource '/js/slickgrid_v2.0/slick.rowmovemanager.js'
		resource '/js/slickgrid_v2.0/slick.rowselectionmodel.js'

		//file upload
		resource '/css/upload.css'
		resource '/css/jQueryFileUpload/jquery.fileupload-ui.css'
		resource '/js/jQueryFileUpload/jquery.fileupload.js'
		resource '/js/jQueryFileUpload/jquery.fileupload-ui.js'

		//agile carousel
        resource '/css/agile_carousel.css'
		resource '/js/jquery/agile_carousel.a1.min.js'

        //corn
        resource '/css/jquery-cron/jquery-cron.css'
        resource '/js/jquery-cron/jquery-cron.js'

        //gentleSelect
        resource '/css/jquery-gentleSelect/jquery-gentleSelect.css'
        resource '/js/jquery-gentleSelect/jquery-gentleSelect.js'
	}
	
	company {
		dependsOn 'core'

		resource '/js/company.js'
		resource '/js/companyGeneral.js'
		resource '/js/companyVariations.js'
		resource '/js/companyShipping.js'
		resource '/js/companyTax.js'
		resource '/js/companyPayment.js'
        resource '/js/companySellers.js'
        resource '/js/companyBrands.js'
        resource '/js/companyCoupons.js'
        resource '/js/companyPublishing.js'
        resource '/js/companyApiKeys.js'
        resource '/js/companyIBeacon.js'
        resource '/js/companyTags.js'
	}
	
	admin {
		dependsOn 'core'

		resource '/js/admin.js'
		resource '/css/admin.css'
	}
	
	partner {
		dependsOn 'core'

		resource '/css/partner.css'
		resource '/css/categories.css'
		//Add OpenStreetMap Scripts
		resource '/js/openStreetMap/openStreetMap.js'
		resource '/js/openStreetMap/openStreetMapContextMenu.js'
		resource '/css/openStreetMap/openStreetMap.css'
		resource '/css/openStreetMap/openStreetMapContextMenu.css'

		//Add GoogleMap
		resource '/js/googleMap/googleMap.js'
		resource '/css/googleMap/googleMap.css'

		resource '/js/catalog.js'
		resource '/js/category.js'
		resource '/js/partner.js'
		resource '/js/brand.js'

		// tourism product
		resource '/js/tourismDescription.js'
		resource '/js/tourismFeatures.js'
		resource '/js/tourismPricing.js'
		resource '/js/tourismCalendar.js'
		resource '/js/tourismSuggestions.js'
		resource '/js/tourismProduct.js'
		resource '/js/tourismProperties.js'
		resource '/js/tourismTranslation.js'
		resource '/js/sale.js'

		// category
		resource '/js/categoryTree.js'
		resource '/js/categoryGeneral.js'
		resource '/js/categoryFeatures.js'
		resource '/js/categoryProducts.js'
		resource '/js/categoryTranslation.js'
		resource '/js/categoryVariations.js'

		// jsTree
		resource '/js/jQueryJSTree/jquery.jstree.js'
		resource '/js/jQueryJSTree/script.js'
		
		resource '/js/translation.js'
	}

    social {
        dependsOn 'jquery-ui'

        resource '/css/jquery-ui/themes/facebook-theme/jquery-ui-1.8.10.custom.css'
        resource '/css/main.css'
        resource '/css/social.css'
    }
	
	eventsCore {
		dependsOn 'jquery-ui'

		// Style sheets
		resource '/css/event/event.styles.css'
		resource '/css/event/theme.css'

		resource '/js/jQueryBrowser/jQuery.browser.js'
		// Java script
		resource'/js/event/site.js'

		// fancy box
		resource '/css/fancybox/jquery.fancybox-1.3.4.css'
		resource '/js/fancybox/jquery.fancybox-1.3.4.js'
	}
	
	getEvents {
		dependsOn 'eventsCore'

		// Java script
		resource '/js/event/getEvents.js'

		//agile carousel
		resource '/css/agile_carousel.css'
		resource '/js/jquery/agile_carousel.a1.min.js'

		// Pagination 
		resource '/css/jQueryPaginate/jquery.paginate.css'
		resource '/js/jQueryPaginate/jquery.paginate.js'
	}
	
	getEvent {
		dependsOn 'eventsCore'

		// Java script
		resource '/js/event/getEvent.js'

		// fancy date
		resource '/css/event/fancydate.css'

		// Spinner Control
		resource '/css/SpinnerControl/SpinnerControl.css'
		resource '/js/SpinnerControl/jquery.SpinnerControl.js'

		// Loading
		resource '/css/showLoading/showLoading.css'
		resource '/js/showLoading/showLoading.js'

		// tools
		resource '/js/jQueryTools/jquery.tools.min.js'

		// Open Street Map
		resource '/css/openStreetMap/openStreetMap.css'
		resource '/css/openStreetMap/openStreetMapContextMenu.css'
		resource 'http://www.openlayers.org/api/OpenLayers.js'
		resource '/js/openStreetMap/openStreetMapView.js'
		resource '/js/openStreetMap/openStreetMapContextMenu.js'

		//Google Map
		//resource 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false'
		//resource '/js/googleMap/eventsGoogleMap.js'
		resource '/css/googleMap/googleMap.css'
	}
	
	storeCore{
		dependsOn 'jquery-ui'

		resource '/css/storeFiles/bootstrap.css'
		resource '/css/storeFiles/stylesheet.css'
		resource '/css/storeFiles/stylesheet-mobile.css'
		resource '/css/storeFiles/ui.totop.css'
		resource '/css/storeFiles/tipTip.css'
		resource '/css/storeFiles/slideshow.css'
		resource '/css/storeFiles/carousel.css'
		resource '/css/storeFiles/flexslider.css'
		resource '/css/storeFiles/elastic_slideshow.css'
		resource '/css/storeFiles/camera.css'
		resource '/css/storeFiles/cloud-zoom.css'
		resource '/css/storeFiles/dcaccordion.css'
		resource '/css/storeFiles/css.css'
		resource '/css/storeFiles/css1.css'
		resource '/css/storeFiles/css2.css'
		resource '/css/showLoading/showLoading.css'
		
		resource '/js/showLoading/showLoading.js'
		resource '/js/storeFiles/jsme/jQuery.browser.js'
		resource '/js/storeFiles/jsme/common.js'
		resource '/js/storeFiles/jsme/camera.js'
		resource '/js/storeFiles/lc_dropdown.js'
        resource '/js/storeFiles/custom.js'
		resource '/js/storeFiles/jquery/jquery.dcjqaccordion.js'
		resource '/js/storeFiles/jquery/jquery.flexslider-min.js'
		resource '/js/storeFiles/jquery/jquery.elastislide.js'
		resource '/js/storeFiles/jquery/jquery.bxSlider.js'
		resource '/js/storeFiles/jquery/jquery.nivo.slider.pack.js'
		resource '/js/storeFiles/jquery/jquery.jcarousel.min.js'
		resource '/js/storeFiles/jquery/jquery.tipTip.js'
		resource '/js/storeFiles/jquery/jquery.ui.totop.js'
		resource '/js/storeFiles/jquery/tabs.js'
		resource '/js/storeFiles/cloud-zoom.js'
		resource '/js/storeFiles/bootstrap/bootstrap-dropdown.js'
		resource '/js/storeFiles/bootstrap/bootstrap-collapse.js'

		resource '/js/main.js'
	}
	
	store{
		dependsOn 'storeCore'

		resource '/css/storeFiles/index.css'
		resource '/js/storeFiles/index.js'
		resource '/js/storeFiles/listProduct.js'
		resource '/js/storeFiles/getProduct.js'
	}
}
