<%@ page contentType="text/html;charset=UTF-8"%>
<html>
    <head>
        <meta name="layout" content="main">
        <title><g:message code="default.admin.label" /></title>

        %{--<r:require modules="core, admin, company"/>--}%
        <g:if env="development">
            <g:set var="env" value="development"/>
        </g:if>
        <g:else>
            <g:set var="env" value="release"/>
        </g:else>

        <!-- core stylesheet -->
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jquery-ui/themes/facebook-theme/jquery-ui-1.8.10.custom.css")}' />

        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jwysiwyg/jquery.wysiwyg.css")}' />

        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jQueryMultiSelect/jquery.multiselect.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jQueryMultiSelect/jquery.multiselect.filter.css")}' />

        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/fancybox/jquery.fancybox-1.3.4.css")}' />

        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/showLoading/showLoading.css")}' />

        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jquery.notice/jquery.notice.css")}' />

        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/cleditor/jquery.cleditor.css")}' />

        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jQueryPaginate/jquery.paginate.css")}' />

        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/slickgrid_v2.0/slick.grid.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/slickgrid_v2.0/slick.pager.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/slickgrid_v2.0/slick.columnpicker.css")}' />

        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jQueryFileUpload/jquery.fileupload-ui.css")}' />

        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jquery-cron/jquery-cron.css")}' />

        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jquery-gentleSelect/jquery-gentleSelect.css")}' />

        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jquery.tagsinput.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jquery.weekcalendar.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/uniform.aristo.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/agile_carousel.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/upload.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/popup.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/main.css")}' />

        <!-- company stylesheet -->
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/company.css")}' />

        <!-- admin stylesheet -->
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/admin.css")}' />

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

        <g:javascript src="${env}/jquery-cron/jquery-cron.js"/>

        <g:javascript src="${env}/jquery-gentleSelect/jquery-gentleSelect.js"/>

        <g:javascript src="${env}/application.js"/>
        <g:javascript src="${env}/main.js"/>

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

        <!-- company javascript -->
        <g:javascript src="${env}/admin.js"/>

        <r:script>
            //----- Company -----//
            var companyPageUrl = "${createLink(controller: 'company', action:'initDisplayCompany')}";
            var createCompanyPageUrl = "${createLink(controller: 'company', action:'initCreateCompany')}";

            // General
            var existCompanyNameUrl = "${createLink(controller: 'company', action:'isNameNew')}";
            var showCompanyUrl = "${createLink(controller: 'company', action:'show')}";
            var createCompanyUrl = "${createLink(controller: 'company', action:'save')}";
            var updateCompanyUrl = "${createLink(controller: 'company', action:'update')}";

            //Profiles
            var companyShowProfilesUrl = "${createLink(controller: 'profile', action:'index')}";
            var companyApplyProfileUrl = "${createLink(controller: 'profile', action:'apply')}";
            var companySaveProfileUrl = "${createLink(controller: 'profile', action:'save')}";
            var companyCopyProfileUrl = "${createLink(controller: 'profile', action:'copy')}";
            var companyDeleteProfileUrl = "${createLink(controller: 'profile', action:'delete')}";
            var companyUnbindProfileUrl = "${createLink(controller: 'profile', action:'unbind')}";

            var companyProfilesPageUrl = "${resource(dir: 'admin', file: '_createCompanyProfile.gsp')}";
            var companySystemProfilePageUrl = "${resource(dir: 'admin', file: '_applySystemProfile.gsp')}";

            var companyProfilesTitleAddLabel = "${message(code: 'company.profiles.add.title')}";
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
            var sellerAddCompanyUrl = "${createLink(controller: 'seller', action:'addCompany')}";
            var sellerRemoveCompanyUrl = "${createLink(controller: 'seller', action:'removeCompany')}";
            var existSellerEmailUrl = "${createLink(controller: 'seller', action: 'isEmailNew')}";
            var sellerDialogPageUrl = "${createLink(controller: 'seller', action:'initSellerDialogPage')}";
            var sellerPasswordUrl = "${createLink(controller: 'sellerPassword', action:'resetPassword')}";

            // Shipping
            var shippingPolicyShowUrl = "${createLink(controller: 'companyShippingPolicy', action:'show')}";
            var shippingPolicyUpdateUrl = "${createLink(controller: 'companyShippingPolicy', action:'update')}";
            var shippingRulesListUrl = "${createLink(controller: 'shippingRule', action: 'list')}";
            var shippingRulesSaveUrl = "${createLink(controller: 'shippingRule', action: 'save')}";
            var shippingRulesDeleteUrl = "${createLink(controller: 'shippingRule', action: 'delete')}";

            var companyShippingCountryRequiredLabel = "${message(code: 'company.shipping.errors.chooseCountry.label')}";

            var companyShippingRulesCountryCodeLabel = "${message(code: 'company.shipping.rules.countryCode.label')}";
            var companyShippingRulesMaxAmountLabel = "${message(code: 'company.shipping.rules.maxAmount.label')}";
            var companyShippingRulesMinAmountLabel = "${message(code: 'company.shipping.rules.minAmount.label')}";
            var companyShippingRulesPriceLabel = "${message(code: 'company.shipping.rules.price.label')}";

            var companyShippingRulesCreatePageUrl = "${resource(dir: 'admin', file: '_createShippingRule.gsp')}";

            // TaxRate
            var taxRateListUrl = "${createLink(controller: 'taxRate', action:'listTaxRate')}";
            var taxRateCreateUrl = "${createLink(controller: 'taxRate', action:'createTaxRate')}";
            var taxRateUpdateUrl = "${createLink(controller: 'taxRate', action:'updateTaxRate')}";
            var taxRateDeleteUrl = "${createLink(controller: 'taxRate', action:'deleteTaxRate')}";
            var taxRateListLocalUrl = "${createLink(controller: 'taxRate', action:'listLocalTaxRate')}";
            var taxRateCreateLocalUrl = "${createLink(controller: 'taxRate', action:'createLocalTaxRate')}";
            var taxRateUpdateLocalUrl = "${createLink(controller: 'taxRate', action:'updateLocalTaxRate')}";
            var taxRateDeleteLocalUrl = "${createLink(controller: 'taxRate', action:'deleteLocalTaxRate')}";

            var taxRateCreatePageUrl = "${resource(dir: 'admin', file:'_createTaxRate.gsp')}";
            var taxRateLocalCreatePageUrl = "${resource(dir: 'admin', file:'_createLocalTaxRate.gsp')}";

            // Payment
            var paymentPolicyShowUrl = "${createLink(controller: 'companyPaymentPolicy', action: "show")}";
            var paymentPolicyUpdateUrl = "${createLink(controller: 'companyPaymentPolicy', action: "update")}";

            // API KEY
            var apiKeyGeneratorUrl = "${createLink(controller: 'keyGen', action: "generateAPIKey")}";
            //--------------------------------------------------//

            // hide username subnav menu after clicking an option
            function hideUsernameSubnav() {
                $("#user_name_div").parent().find("ul.subnav").hide();
            }
        </r:script>

    </head>
    <body>
        <content tag="header">
        <!-- header -->
        <div id="logo">
            <img src="${resource(dir:'images',file:'ebiznext_logo.png')}" />
        </div>
        <jsec:isLoggedIn>
            <div id="user" align="right">
                <ul class="topnav">
                    <li id="user_name_div"><g:message code="default.menu.label" /></li>
                    <li>
                        <ul class="subnav" style="display: none; ">
                            <li onclick="hideUsernameSubnav();"><a href="javascript:void(0);"><g:message code="default.support.label" /></a></li>
                            <li onclick="hideUsernameSubnav();"><a href="${createLink(controller:'auth',action:'signOut')}" id="logout"><g:message code="default.logout.label" /></a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div id="userLabel" align="right">
                <ul class="topnav">
                    <li id="username_label_div">${request.user?.firstName}&nbsp;${request.user?.lastName}</li>
                </ul>
            </div>
            <div id="createCompanyLnk">
              <ul>
                <li><label><g:message code="navigation.create.label" /></label></li>
              </ul>
            </div>
            <br />
        </jsec:isLoggedIn>
        </content>

        <!-- inner-content -->
        <div id="searchForm"></div>
        <div id="createCompanyDialog"></div>
        <div id="companyProfilesDialog"></div>
        <div id="items"></div>
        <div id="dialog"></div>
        <div id="sellerForm"></div>
        <div id="taxRateDialog"></div>
        <div id="shippingRuleDialog"></div>
        <content tag="footer">
        <!-- footer -->
        <g:render template="/layouts/footer" />
        </content>
        <div id="fancyboxGroup"></div>
    </body>
</html>
