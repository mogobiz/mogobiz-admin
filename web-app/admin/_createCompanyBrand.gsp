<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<div id="companyBrandsTabs">
    <div id="ulTabs">
        <ul class="tabs">
            <li>
                <a id="companyBrandsGeneralTab">
                    <g:message locale="${lang}" code="tabs.general.label" />
                </a>
            </li>
            <li>
                <a id="companyBrandsTranslationTab">
                    <g:message locale="${lang}" code="tabs.translation.label" />
                </a>
            </li>
        </ul>
        <hr style="margin-top: -1px;"/>
    </div>
    <div id="companyBrandsCreateDiv">
        <form id="companyBrandsForm" onsubmit="return false;" method="POST" enctype="multipart/form-data">
            <input id="companyBrandsId" type="hidden" name="brand.id"/>


            <div class="newline">
                <div class="companyBrandsDialog-large">
                    <div class="newline">
                        <div class="companyBrandsDialog-large">
                            <label for="companyBrandsName"><g:message locale="${lang}" code="company.brands.name.label"></g:message>&nbsp;<sup>*</sup></label>
                            <div class="spacer-small"></div>
                            <input type="text" id="companyBrandsName" />
                        </div>
                    </div>
                    <div class="spacer"></div>
                    <div class="newline">
                        <div class="companyBrandsDialog-large">
                            <label for="companyBrandsWebsite"><g:message locale="${lang}" code="company.brands.website.label"></g:message></label>
                            <div class="spacer-small"></div>
                            <input type="text" id="companyBrandsWebsite" pattern="(https?://)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}((\/[^\/~,]+)+)?/?"/>
                        </div>
                    </div>
                    <div class="spacer"></div>
                    <div class="newline">
                        <div class="companyBrandsDialog-large">
                            <label for="companyBrandsIBeacon"><g:message locale="${lang}" code="company.brands.iBeacon.label" /></label>
                            <div class="spacer-small"></div>
                            <select id="companyBrandsIBeacon"></select>
                        </div>
                    </div>
                </div>
                <div class="companyBrandsDialog-small">
                    <div class="imgDiv">
                        <img id="companyBrandsLogoImage" src=""/>
                    </div>
                    <input type="file" id="companyBrandsLogo" name="file"/>
                    <a href="javascript:void(0)" id="companyBrandsRemoveLogoLink"><g:message locale="${lang}" code="company.brands.deleteLogo.label"/></a>
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <div class="companyBrandsDialog-full">
                    <label for="companyBrandsDescription"><g:message locale="${lang}" code="company.brands.description.label" /></label>
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="companyBrandsDialog-full">
                    <textarea id="companyBrandsDescription" rows="5"></textarea>
                </div>
            </div>
            <div class="spacer"></div>
            <div>
                <input type="checkbox" id="companyBrandsHide" value="true"/>&nbsp;
                <label for="companyBrandsHide"><g:message locale="${lang}" code="company.brands.hide.label" /></label>
            </div>
            <div class="spacer"></div>
        </form>
    </div>
    <div id="companyBrandsTranslationDiv" >
        <div style="padding: 10px;">
            <a id="companyBrandsTranslationAddLink"><g:message locale="${lang}" code="translation.add.label" /></a>
        </div>
        <div id="companyBrandsTranslationGridDiv">
            <div id="companyBrandsTranslationGrid" style="height: 144px;"></div>
        </div>
    </div>
    <iframe id="companyBrandsHiddenFrame" name="companyBrandsHiddenFrame" style="display: none"></iframe>
</div>