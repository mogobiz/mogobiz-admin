<style>
#shippingRuleCreateDiv{
    font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
    font-size: 11px;
    color: #888;
    text-align: left;
    direction: ltr;
    height: 100px;
    width: 500px;
}
#shippingRuleDialog {
    color: #888;
    text-align: left;
    direction: ltr;
    background:#F2F2F2;
    border:1px solid #CCCCCC;
    padding: 10px;
    margin: 5px 0px 0px 0px;
}
</style>
<div id="shippingRuleCreateDiv">
    <form id="shippingRuleForm" onsubmit="return false;">
        <input id="shippingRuleCompanyId" type="hidden"/>
        <input id="shippingRuleId" type="hidden"/>
        <div class="newline">
            <div class="shipping_medium">
                <label for="shippingRuleCountry"><g:message code="company.shipping.rules.countryCode.label"></g:message>&nbsp;<sup>*</sup></label><br />
            </div>
            <div class="shipping_medium">
                <label for="shippingRulePrice"><g:message code="company.shipping.rules.price.label"></g:message>&nbsp;<sup>*</sup></label><br />
            </div>
        </div>
        <div class="spacer-small"></div>
        <div class="newline">
            <div class="shipping_medium">
                <select id="shippingRuleCountry" multiple="multiple"></select>
            </div>
            <div class="shipping_medium">
                <input type="text" id="shippingRulePrice" pattern="([+-])?(\d+)(\.\d+)?\%?"/>
            </div>
        </div>
        <div class="spacer"></div>
        <div class="newline">
            <div class="shipping_medium">
                <label for="shippingRuleMinAmount"><g:message code="company.shipping.rules.minAmount.label"></g:message>&nbsp;<sup>*</sup></label><br />
            </div>
            <div class="shipping_medium">
                <label for="shippingRuleMaxAmount"><g:message code="company.shipping.rules.maxAmount.label"></g:message>&nbsp;<sup>*</sup></label><br />
            </div>
        </div>
        <div class="spacer-small"></div>
        <div class="newline">
            <div class="shipping_medium">
                <input type="text" id="shippingRuleMinAmount" pattern="(\d+).?(\d+)?"/>
            </div>
            <div class="shipping_medium">
                <input type="text" id="shippingRuleMaxAmount" pattern="(\d+).?(\d+)?"/>
            </div>
        </div>
        <div class="spacer"></div>
    </form>
</div>