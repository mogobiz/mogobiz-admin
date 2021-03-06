<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<div id="companyCouponsRulesCreateDiv">
    <form id="companyCouponsRulesForm" onsubmit="return false;">
        <input type="hidden" id="companyCouponsRulesId"/>
        <div class="newline">
            <div class="companyCouponsDialog-large">
                <label for="companyCouponsRulesType"><g:message locale="${lang}" code="company.coupons.rules.type.label"/>&nbsp;<sup>*</sup></label>
            </div>
        </div>
        <div class="spacer-small"></div>
        <div class="newline">
            <div class="companyCouponsDialog-large">
                <select id="companyCouponsRulesType">
                    <option value="DISCOUNT"><g:message locale="${lang}" code="company.coupons.rules.discountValue.label"/></option>
                    <option value="X_PURCHASED_Y_OFFERED"><g:message locale="${lang}" code="company.coupons.rules.purchasedOfferedValue.label"/></option>
                    <option value="CUSTOM"><g:message locale="${lang}" code="company.coupons.rules.custom.label"/></option>
                </select>
            </div>
        </div>
        <div id="companyCouponsRulesCreateDiscountDiv">
            <div class="spacer"></div>
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <label for="companyCouponsRulesDiscount"><g:message locale="${lang}" code="company.coupons.rules.discount.label" />&nbsp;<sup>*</sup></label>
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <input type="text" id="companyCouponsRulesDiscount" required pattern="((\-|\+)?[0-9](\d+)?(\.\d+)?)|(([1-9]\d?(\.(\d+)?[1-9])?|0\.(\d+)?[1-9]|100)%)" />
                </div>
            </div>
        </div>

        <div id="companyCouponsRulesCreatePurchaseOfferedDiv">
            <div class="spacer"></div>
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <label for="companyCouponsRulesPurchased"><g:message locale="${lang}" code="company.coupons.rules.purchased.label" />&nbsp;<sup>*</sup></label>
                </div>
                <div class="companyCouponsDialog-large">
                    <label for="companyCouponsRulesOffered"><g:message locale="${lang}" code="company.coupons.rules.offered.label" />&nbsp;<sup>*</sup></label>
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <input type="text" id="companyCouponsRulesPurchased" required pattern="\d{0,32}" />
                </div>
                <div class="companyCouponsDialog-large">
                    <input type="text" id="companyCouponsRulesOffered" required pattern="\d{0,32}" />
                </div>
            </div>
        </div>

        <div id="companyCouponsRulesCreateCustomDiv">
            <div class="spacer"></div>
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <label for="companyCouponsRulesCustomDiscount"><g:message locale="${lang}" code="company.coupons.rules.customdata.label" />&nbsp;<sup>*</sup></label>
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="companyCouponsDialog-large">
                    <input type="text" id="companyCouponsRulesCustomDiscount" required />
                </div>
            </div>
        </div>
        <div class="spacer"></div>
    </form>
</div>