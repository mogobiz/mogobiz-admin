<div id="companyPublishingCreateDiv">
    <form id="companyPublishingForm" onsubmit="return false;">
        <input id="companyPublishingId" type="hidden"/>
        <div class="newline">
            <div class="companyPublishingDialog-large">
                <label for="companyPublishingName"><g:message code="company.publishing.name.label"></g:message>&nbsp;<sup>*</sup></label><br />
            </div>
            <div class="companyPublishingDialog-large">
                <label for="companyPublishingUrl"><g:message code="company.publishing.url.label"></g:message>&nbsp;<sup>*</sup></label><br />
            </div>
        </div>
        <div class="spacer-small"></div>
        <div class="newline">
            <div class="companyPublishingDialog-large">
                <input type="text" id="companyPublishingName" />
            </div>
            <div class="companyPublishingDialog-large">
                <input type="text" id="companyPublishingUrl" pattern="https?://.+"/>
            </div>
        </div>
        <div class="spacer"></div>
        <div class="newline">
            <input type="checkbox" id="companyPublishingActive"/>&nbsp;
            <label for="companyPublishingActive"><g:message code="company.publishing.active.label" /></label>&nbsp;&nbsp;
            <input type="checkbox" id="companyPublishingManual"/>&nbsp;
            <label for="companyPublishingManual"><g:message code="company.publishing.manual.label" /></label>
        </div>
        <div class="spacer"></div>
        <div class="newline">
            <div id="companyPublishingCron"></div>
        </div>
        <div class="spacer"></div>
    </form>
</div>