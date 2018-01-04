<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<div id="companyCouponsTabs">
    <div id="ulTabs">
        <ul class="tabs">
            <li>
                <a id="companyCouponsGeneralTab">
                    <g:message locale="${lang}" code="tabs.general.label" />
                </a>
            </li>
            <li>
                <a id="companyCouponsDescriptionTab">
                    <g:message locale="${lang}" code="tabs.description.label" />
                </a>
            </li>
            <li>
                <a id="companyCouponsRulesTab">
                    <g:message locale="${lang}" code="tabs.rules.label" />
                </a>
            </li>
            <li>
                <a id="companyCouponsCategoriesTab">
                    <g:message locale="${lang}" code="tabs.categories.label" />
                </a>
            </li>
            <li>
                <a id="companyCouponsProductTab">
                    <g:message locale="${lang}" code="tabs.product.label" />
                </a>
            </li>
            <li>
                <a id="companyCouponsSkuTab">
                    <g:message locale="${lang}" code="tabs.pricing.label" />
                </a>
            </li>
            <li>
                <a id="companyCouponsTranslationTab">
                    <g:message locale="${lang}" code="tabs.translation.label" />
                </a>
            </li>
        </ul>
        <hr style="margin-top: -1px;"/>
    </div>

    <div id="companyCouponsCreateDiv">
        <form id="companyCouponsForm" onsubmit="return false;">
            <input id="companyCouponsId" type="hidden"/>
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <label for="companyCouponsName"><g:message locale="${lang}" code="company.coupons.name.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
                <div class="companyCouponsDialog-large">
                    <label for="companyCouponsCode"><g:message locale="${lang}" code="company.coupons.code.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <input type="text" id="companyCouponsName" />
                </div>
                <div class="companyCouponsDialog-large">
                    <input type="text" id="companyCouponsCode"/>
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <label for="companyCouponsPastille"><g:message locale="${lang}" code="company.coupons.pastille.label"></g:message></label><br />
                </div>
                <div class="companyCouponsDialog-large">
                    <label for="companyCouponsNumberOfUse"><g:message locale="${lang}" code="company.coupons.numberOfUse.label"></g:message></label><br />
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <input type="text" id="companyCouponsPastille" />
                </div>
                <div class="companyCouponsDialog-large">
                    <input type="text" id="companyCouponsNumberOfUse" pattern="[0-9]+" />
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <label for="companyCouponsStartDate"><g:message locale="${lang}" code="company.coupons.startDate.label"></g:message></label><br />
                </div>
                <div class="companyCouponsDialog-large">
                    <label for="companyCouponsEndDate"><g:message locale="${lang}" code="company.coupons.endDate.label"></g:message></label><br />
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <input type="text" id="companyCouponsStartDate" />
                </div>
                <div class="companyCouponsDialog-large">
                    <input type="text" id="companyCouponsEndDate"/>
                </div>
            </div>
            <div class="spacer"></div>
            <div>
                <input type="checkbox" id="companyCouponsActive" value="true"/>&nbsp;
                <label for="companyCouponsActive"><g:message locale="${lang}" code="company.coupons.active.label" /></label>&nbsp;&nbsp;
                <input type="checkbox" id="companyCouponsAnonymous" value="false"/>&nbsp;
                <label for="companyCouponsAnonymous"><g:message locale="${lang}" code="company.coupons.anonymous.label" /></label>&nbsp;&nbsp;
                <input type="checkbox" id="companyCouponsCatalogWide" value="false"/>&nbsp;
                <label for="companyCouponsCatalogWide"><g:message locale="${lang}" code="company.coupons.catalogWide.label" /></label>&nbsp;&nbsp;
                <select id="companyCouponsGeneralCatalog" multiple="multiple"></select>
            </div>
            <div class="spacer"></div>
        </form>
    </div>

    <div id="companyCouponsDescriptionDiv">
        <div class="newline">
            <div class="companyCouponsDialog-large">
                <label for="companyCouponsDescription"><g:message locale="${lang}" code="company.coupons.description.label"></g:message></label><br />
            </div>
        </div>
        <div class="spacer-small"></div>
        <div class="newline">
            <div>
                <textarea id="companyCouponsDescription" rows="10"></textarea>
            </div>
        </div>
        <div class="spacer"></div>
    </div>

    <div id="companyCouponsRulesDiv">
        <div style="padding: 10px;">
            <g:message locale="${lang}" code="company.coupons.rules.header.label" /> <a id="companyCouponsRulesAddLink"><g:message locale="${lang}" code="company.coupons.rules.add.label" /></a>
        </div>
        <div id="companyCouponsRulesGridDiv">
            <div id="companyCouponsRulesGrid" style="height: 220px;"></div>
        </div>
    </div>

    <div id="companyCouponsCategoriesDiv" class="multiselectSlides">
        <div class="search">
            <select id="companyCouponsCategoriesCatalog" multiple="multiple"></select>
            <input type="text" id="companyCouponsCategoriesSearch"/>
            <button type="button" class="searchButton" id="companyCouponsCategoriesSearchBtn"><i class="ui-icon ui-icon-search"></i></button>
        </div>
        <div class="left">
            <select name="from" id="companyCouponsCategories" size="14" multiple="multiple"></select>
        </div>
        <div class="center">
            <button type="button" id="companyCouponsCategories_right_All"><i class="icon icon-forward-all"></i></button>
            <button type="button" id="companyCouponsCategories_right_Selected"><i class="icon icon-forward"></i></button>
            <button type="button" id="companyCouponsCategories_left_Selected"><i class="icon icon-backward"></i></button>
            <button type="button" id="companyCouponsCategories_left_All"><i class="icon icon-backward-all"></i></button>
        </div>
        <div class="right">
            <select name="to" id="companyCouponsCategories_to" size="14" multiple="multiple"></select>
        </div>
        <div class="clear"></div>
    </div>

    <div id="companyCouponsProductDiv" class="multiselectSlides">
        <div class="search">
            <select id="companyCouponsProductCatalog" multiple="multiple"></select>
            <input type="text" id="companyCouponsProductSearch"/>
            <button type="button" class="searchButton" id="companyCouponsProductSearchBtn"><i class="ui-icon ui-icon-search"></i></button>
        </div>
        <div class="left">
            <select name="from" id="companyCouponsProduct" size="14" multiple="multiple"></select>
        </div>
        <div class="center">
            <button type="button" id="companyCouponsProduct_right_All"><i class="icon icon-forward-all"></i></button>
            <button type="button" id="companyCouponsProduct_right_Selected"><i class="icon icon-forward"></i></button>
            <button type="button" id="companyCouponsProduct_left_Selected"><i class="icon icon-backward"></i></button>
            <button type="button" id="companyCouponsProduct_left_All"><i class="icon icon-backward-all"></i></button>
        </div>
        <div class="right">
            <select name="to" id="companyCouponsProduct_to" size="14" multiple="multiple"></select>
        </div>
        <div class="clear"></div>
    </div>

    <div id="companyCouponsSkuDiv" class="multiselectSlides">
        <div class="search">
            <select id="companyCouponsSkuCatalog" multiple="multiple"></select>
            <input type="text" id="companyCouponsSkuSearch"/>
            <button type="button" id="companyCouponsSkuSearchBtn"><i class="ui-icon ui-icon-search"></i></button>
        </div>
        <div class="left">
            <select name="from" id="companyCouponsSku" size="14" multiple="multiple"></select>
        </div>
        <div class="center">
            <button type="button" id="companyCouponsSku_right_All"><i class="icon icon-forward-all"></i></button>
            <button type="button" id="companyCouponsSku_right_Selected"><i class="icon icon-forward"></i></button>
            <button type="button" id="companyCouponsSku_left_Selected"><i class="icon icon-backward"></i></button>
            <button type="button" id="companyCouponsSku_left_All"><i class="icon icon-backward-all"></i></button>
        </div>
        <div class="right">
            <select name="to" id="companyCouponsSku_to" size="14" multiple="multiple"></select>
        </div>
        <div class="clear"></div>
    </div>

    <div id="companyCouponsTranslationDiv">
        <div style="padding: 10px;">
            <a id="companyCouponsTranslationAddLink"><g:message locale="${lang}" code="translation.add.label" /></a>
        </div>
        <div id="companyCouponsTranslationGridDiv">
            <div id="companyCouponsTranslationGrid" style="height: 144px;"></div>
        </div>
    </div>
</div>