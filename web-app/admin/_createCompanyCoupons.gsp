<div id="companyCouponsTabs">
    <div id="ulTabs">
        <ul class="tabs">
            <li>
                <a id="companyCouponsGeneralTab">
                    <g:message code="tabs.general.label" />
                </a>
            </li>
            <li>
                <a id="companyCouponsRulesTab">
                    <g:message code="tabs.rules.label" />
                </a>
            </li>
            <li>
                <a id="companyCouponsCategoriesTab">
                    <g:message code="tabs.categories.label" />
                </a>
            </li>
            <li>
                <a id="companyCouponsProductTab">
                    <g:message code="tabs.product.label" />
                </a>
            </li>
            <li>
                <a id="companyCouponsSkuTab">
                    <g:message code="tabs.pricing.label" />
                </a>
            </li>
            <li>
                <a id="companyCouponsTranslationTab">
                    <g:message code="tabs.translation.label" />
                </a>
            </li>
        </ul>
        <hr style="margin-top: 5px;" />
    </div>
    <div id="companyCouponsCreateDiv">
        <form id="companyCouponsForm" onsubmit="return false;">
            <input id="companyCouponsId" type="hidden"/>
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <label for="companyCouponsName"><g:message code="company.coupons.name.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
                <div class="companyCouponsDialog-large">
                    <label for="companyCouponsCode"><g:message code="company.coupons.code.label"></g:message>&nbsp;<sup>*</sup></label><br />
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
                    <label for="companyCouponsStartDate"><g:message code="company.coupons.startDate.label"></g:message></label><br />
                </div>
                <div class="companyCouponsDialog-large">
                    <label for="companyCouponsEndDate"><g:message code="company.coupons.endDate.label"></g:message></label><br />
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
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <label for="companyCouponsNumberOfUse"><g:message code="company.coupons.numberOfUse.label"></g:message></label><br />
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <input type="text" id="companyCouponsNumberOfUse" pattern="[0-9]+" />
                </div>
            </div>
            <div class="spacer"></div>
            <div>
                <input type="checkbox" id="companyCouponsActive" value="true"/>&nbsp;
                <label for="companyCouponsActive"><g:message code="company.coupons.active.label" /></label>&nbsp;&nbsp;
                <input type="checkbox" id="companyCouponsCatalogWise" value="false"/>&nbsp;
                <label for="companyCouponsCatalogWise"><g:message code="company.coupons.catalogWise.label" /></label>&nbsp;&nbsp;
                <input type="checkbox" id="companyCouponsAnonymous" value="false"/>&nbsp;
                <label for="companyCouponsAnonymous"><g:message code="company.coupons.anonymous.label" /></label>
            </div>
            <div class="spacer"></div>
        </form>
    </div>
    <div id="companyCouponsRulesDiv">
        <div style="padding: 10px;">
            <g:message code="company.coupons.rules.header.label" /> <a id="companyCouponsRulesAddLink"><g:message code="company.coupons.rules.add.label" /></a>
        </div>
        <div id="companyCouponsRulesGridDiv">
            <div id="companyCouponsRulesGrid" style="height: 220px;"></div>
        </div>
    </div>
    <div id="companyCouponsCategoriesDiv" class="multiselectSlides">
        <div class="search"><input type="text" id="companyCouponsCategoriesSearch"/><button type="button" id="companyCouponsCategoriesSearchBtn"><i class="ui-icon ui-icon-search"></i></button></div>
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
    </div>
    <div id="companyCouponsProductDiv" class="multiselectSlides">
        <div class="search"><input type="text" id="companyCouponsProductSearch"/><button type="button" id="companyCouponsProductSearchBtn"><i class="ui-icon ui-icon-search"></i></button></div>
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
    </div>
    <div id="companyCouponsSkuDiv" class="multiselectSlides">
        <div class="search"><input type="text" id="companyCouponsSkuSearch"/><button type="button" id="companyCouponsSkuSearchBtn"><i class="ui-icon ui-icon-search"></i></button></div>
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
    </div>
    <div id="companyCouponsTranslationDiv">
        <div style="padding: 10px;">
            <a id="companyCouponsTranslationAddLink"><g:message code="translation.add.label" /></a>
        </div>
        <div id="companyCouponsTranslationGridDiv">
            <div id="companyCouponsTranslationGrid" style="height: 144px;"></div>
        </div>
    </div>
</div>