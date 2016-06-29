<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<div id="companyPublishingCacheUrlCreateDiv" style="padding-top: 7px;">
    <form id="companyPublishingCacheUrlForm" onsubmit="return false;">
        <input id="companyPublishingCacheUrlId" type="hidden"/>
        <div class="newline">
            <div class="companyPublishingDialog-full">
                <label for="companyPublishingCacheUrl"><g:message locale="${lang}" code="company.publishing.url.label"></g:message>&nbsp;<sup>*</sup></label><br />
            </div>
        </div>
        <div class="spacer-small"></div>
        <div class="newline">
            <div class="companyPublishingDialog-full">
                <input type="text" id="companyPublishingCacheUrl" pattern="https?://.+"/>
            </div>
        </div>
        <div class="spacer"></div>
    </form>
</div>