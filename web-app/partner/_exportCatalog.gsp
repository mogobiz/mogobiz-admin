<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<style type="text/css">
#catalogExportDiv{
    font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
    font-size: 11px;
    color: #888;
    text-align: left;
    direction: ltr;
}
#catalogExportDiv label{
    position: relative;
    top: -4px;
}
#catalogExportDialog{
    color: #888;
    text-align: left;
    direction: ltr;
    background:#F2F2F2;
    border:1px solid #CCCCCC;
    padding: 10px;
    margin: 5px 0px 0px 0px;
}
</style>
<div id="catalogExportDiv">
    <div class="spacer-small"></div>
    <div class="newline">
        <div>
            <input type="radio" id="catalogExportXLS" name="catalogExportType" value="xls" checked="checked"/>&nbsp;
            <label for="catalogExportXLS"><g:message locale="${lang}" code="catalog.export.type.xls"/></label>
        </div>
    </div>
    <div class="spacer"></div>
    <div class="newline">
        <div>
            <input type="radio" id="catalogExportJSON" name="catalogExportType" value="json"/>&nbsp;
            <label for="catalogExportJSON"><g:message locale="${lang}" code="catalog.export.type.json"/></label>
        </div>
    </div>
</div>
