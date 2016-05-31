<html>
    <head>
        <title>Welcome to Mogobiz</title>
        <meta name="layout" content="main" />

        %{--<r:require modules="core"/>--}%
        <%
            String env = grails.util.Environment.current.name
        %>

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

        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jquery-gentleSelect/jquery-gentleSelect.css")}' />

        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jquery.tagsinput.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jquery.weekcalendar.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/uniform.aristo.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/agile_carousel.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/upload.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/popup.css")}' />
        <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/main.css")}' />

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
        <!-- agile carousel -->
        <style>#inner-content{display: none;}</style>
   </head>
    <body>
        <content tag="header">
            <!-- header -->
            <div id="logo" style="float:left;">
                <img src="${resource(dir:'images',file:'logo.png')}" />
            </div>
            <br/>
            <div align="right">
                <a href="${createLink(controller: 'admin')}"><g:message locale="${params.lang}" code="navigation.companyManagement.label" /></a>
                &nbsp;|&nbsp;
                <a href="${createLink(controller: 'partner')}"><g:message locale="${params.lang}" code="navigation.myShop.label" /></a>
            </div>
            <br/>
        </content>
        <!-- inner-content -->
        <content tag="footer">
        <!-- footer -->
            <g:render template="/layouts/footer" />
        </content>
    </body>
</html>
