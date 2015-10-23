<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<style type="text/css">
#catalogImportDiv{
    font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
    font-size: 11px;
    color: #888;
    text-align: left;
    direction: ltr;
}
#catalogCreateDialog {
    color: #888;
    text-align: left;
    direction: ltr;
    background:#F2F2F2;
    border:1px solid #CCCCCC;
    padding: 10px;
    margin: 5px 0px 0px 0px;
}
</style>
<div id="catalogImportDiv">
    <form id="catalogImportForm" onsubmit="return false;" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="format" value="html"/>
        <div class="newline">
            <div>
                <label for="catalogImportFile"><g:message locale="${lang}" code="catalog.selectFile.label"/>&nbsp;<sup>*</sup></label><br />
            </div>
        </div>
        <div class="spacer-small"></div>
        <div class="newline">
            <div>
                <input type="file" id="catalogImportFile" name="file"/>
            </div>
        </div>
        <div class="spacer"></div>
        <div id="catalogImportError"></div>
    </form>
    <iframe id="catalogImportHiddenFrame" name="catalogImportHiddenFrame" style="display:none;"></iframe>
</div>
