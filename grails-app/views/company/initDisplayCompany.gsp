
<div id="editCompanyTabs" style="display: none">
	<div>
		<div id="companyTitle" style="display: none"></div>
		<div  id="editTabs" style='display: none'>
			<ul class="tabs" id="ulTabs">
				<!-- Tabs -->
				<li id ="generalLi">
					<a href="javascript:void(0)" id="generalTab">
						<span><g:message code="tabs.general.label" /></span>
					</a>
				</li>
				<li id ="profilesLi">
					<a href="javascript:void(0)" id="profilesTab">
						<span><g:message code="tabs.profiles.label" /></span>
					</a>
				</li>
                <li id ="sellersLi">
                    <a href="javascript:void(0)" id="sellersTab">
                        <span><g:message code="tabs.sellers.label" /></span>
                    </a>
                </li>
				<li id ="shippingLi">
					<a href="javascript:void(0)" id="shippingTab">
						<span><g:message code="tabs.shipping.label" /></span>
					</a>
				</li>
				<li id ="taxLi">
					<a href="javascript:void(0)" id="taxTab">
						<span><g:message code="tabs.tax.label" /></span>
					</a>
				</li>
				<li id ="paymentLi">
					<a href="javascript:void(0)" id="paymentTab">
						<span><g:message code="tabs.payment.label" /></span>
					</a>
				</li>
                <li id ="brandsLi">
                    <a href="javascript:void(0)" id="brandsTab">
                        <span><g:message code="tabs.brands.label" /></span>
                    </a>
                </li>
                <li id ="couponsLi">
                    <a href="javascript:void(0)" id="couponsTab">
                        <span><g:message code="tabs.coupons.label" /></span>
                    </a>
                </li>
                <li id ="publishingLi">
                    <a href="javascript:void(0)" id="publishingTab">
                        <span><g:message code="tabs.publishing.label" /></span>
                    </a>
                </li>
                <li id ="apiKeysLi">
                    <a href="javascript:void(0)" id="apiKeysTab">
                        <span><g:message code="tabs.apiKeys.label" /></span>
                    </a>
                </li>
                <li id ="iBeaconLi">
                    <a href="javascript:void(0)" id="iBeaconTab">
                        <span><g:message code="tabs.iBeacon.label" /></span>
                    </a>
                </li>
                <li id ="tagsLi">
                    <a href="javascript:void(0)" id="tagsTab">
                        <span><g:message code="tabs.tags.label" /></span>
                    </a>
                </li>
			</ul>
			<hr style="margin-top:5px;"/>
		</div>
		<!-- Tabs Content  -->

		<!-- General Tab -->
		<div id="generalInfo" class="fk_content_area">
			<form id="formGeneral" name="form_general_comp" onsubmit="return false;">
				<div id="generalForm">
					<div class="errors"></div>
					<div id="generalContent">
						<div class="newline">
							<div class="general_medium">
								<label for="generalStoreName"><g:message code="company.general.storeName.label" />&nbsp;<sup>*</sup></label>
							</div>
							<div class="general_medium">
								<label for="generalStoreCode"><g:message code="company.general.storeCode.label" />&nbsp;<sup>*</sup></label>
							</div>
						</div>
						<div class="spacer-small"></div>
						<div class="newline">
							<div class="general_medium">
								<input type="text" name="company.name" id="generalStoreName" required readonly="readonly"/>
							</div>
							<div class="general_medium">
								<input type="url" name="company.code" id="generalStoreCode" required readonly="readonly" />
							</div>
						</div>
						<div class="spacer"></div>
						<div class="newline">
							<div class="general_small">
								<label for="generalCountry"><g:message code="company.general.country.label" />&nbsp;<sup>*</sup></label>
							</div>
							<div class="general_small">
								<label for="generalCity"><g:message code="company.general.city.label" /></label>
							</div>
							<div class="general_small">
								<label for="generalPostalCode"><g:message code="company.general.postalCode.label" /></label>
							</div>
							<div class="general_small">
								<label for="generalPhoneNumber"><g:message code="company.general.phoneNumber.label" /></label>
							</div>
						</div>
						<div class="spacer-small"></div>
						<div class="newline">
							<div class="general_small">
								<select name="company.location.countryCode" id="generalCountry" multiple="multiple"></select>
							</div>
							<div class="general_small">
								<input type="text" name="company.location.city" id="generalCity" />
							</div>
							<div class="general_small">
								<input type="text" name="company.location.postalCode" id="generalPostalCode" />
							</div>
							<div class="general_small">
								<input type="text" name="company.phone" id="generalPhoneNumber" pattern="[0-9]+" />
							</div>
						</div>
						<div class="spacer"></div>
						<div class="newline">
							<div class="general_large">
								<label for="generalAddress1"><g:message code="company.general.address1.label" /></label>
							</div>
						</div>
						<div class="spacer-small"></div>
						<div class="newline">
							<div class="general_large">
								<input type="text" name="company.location.road1" id="generalAddress1" />
							</div>
						</div>
						<div class="spacer"></div>
						<div class="newline">
							<div class="general_large">
								<label for="generalAddress2"><g:message code="company.general.address2.label" /></label>
							</div>
						</div>
						<div class="spacer-small"></div>
						<div class="newline">
							<div class="general_large">
								<input type="text" name="company.location.road2" id="generalAddress2" />
							</div>
						</div>
						<div class="spacer"></div>
						<div class="newline">
							<div class="general_medium">
								<label for="generalWebsite"><g:message code="company.general.website.label" /></label>
							</div>
							<div class="general_medium">
								<label for="generalEmail"><g:message code="company.general.email.label" />&nbsp;<sup>*</sup></label>
							</div>
						</div>
						<div class="spacer-small"></div>
						<div class="newline">
							<div class="general_medium">
								<input type="url" name="company.website" id="generalWebsite" pattern="https?://([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}((\/[^\/~,]+)+)?/?" />
							</div>
							<div class="general_medium">
								<input type="email" name="company.email" id="generalEmail" pattern="[a-zA-Z0-9._-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}" required/>
							</div>
						</div>
						<div class="spacer"></div>
					</div>
				</div>
			</form>
		</div>

        <!-- Profiles Tab -->
        <div id="profiles" class="fk_content_area">
            <form id="formProfiles" name="form_profiles_comp" onsubmit="return false;">
                <div id="profilesContent">
                    <p style="font-weight: bold;"><a href="javascript:void(0)" id="addNewProfile"><g:message code="company.profiles.header.new" /></a>%{-- <g:message code="company.profiles.header.or" /> <a href="javascript:void(0);" id="applySystemProfile"><g:message code="company.profiles.header.system" /></a>--}%</p>
                    <div id="profilesGridDiv">
                        <div id="profilesGrid"></div>
                    </div>
                    <div class="spacer"></div>
                </div>
            </form>
        </div>

    <!-- Sellers Tab -->
    <div id="sellers" class="fk_content_area">
        <form id="formSellers" name="form_sellers_comp" onsubmit="return false;">
            <div id="sellersForm">
                <div id="sellersContent">
                    <p style="font-weight: bold;"><g:message code="company.sellers.header.label" /> <a href="javascript:void(0)" id="addNewSeller"><g:message code="company.sellers.addNewSeller.label" /></a></p>
                    <div id="sellersGridDiv">
                        <div id="sellersGrid"></div>
                    </div>
                    <div class="spacer"></div>
                    <div class="newline">
                        <div class="payment_left">
                            <input type="checkbox" id="paymentOnLineValidation" />
                            <label for="paymentOnLineValidation"><g:message code="company.payment.online.validation.label" /></label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

		<!-- Shipping Tab -->
		<div id="shipping" class="fk_content_area">
			<form id="formShipping" name="form_shipping_comp" onsubmit="return false;">
				<div id="shippingForm">
					<div class="errors"></div>
					<div id="shippingContent">
						<div class="newline">
							<div class="shipping_large">
								<p style="font-weight: bold;"><g:message code="company.shipping.header.label" /> <a href="javascript:void(0)" id="useStoreAddress"><g:message code="company.shipping.useStoreAddress.label" /></a></p>
							</div>
						</div>
						<div class="spacer"></div>
						<div class="newline">
							<div class="shipping_small">
								<label for="shippingCountry"><g:message code="company.shipping.country.label" />&nbsp;<sup>*</sup></label>
							</div>
							<div class="shipping_medium">
								<label for="shippingCity" class="spacer"><g:message code="company.shipping.city.label" /></label>
							</div>
							<div class="shipping_small">
								<label for="shippingPostalCode"><g:message code="company.shipping.postalCode.label" /></label>
							</div>
						</div>
						<div class="spacer-small"></div>
						<div class="newline">
							<div class="shipping_small">
								<select name="company.shipFrom.countryCode" id="shippingCountry" multiple="multiple"></select>
							</div>
							<div class="shipping_medium">
								<input type="text" name="company.shipFrom.city" id="shippingCity" />
							</div>
							<div class="shipping_small">
								<input type="text" name="company.shipFrom.postalCode" id="shippingPostalCode" />
							</div>
						</div>
						<div class="spacer"></div>
						<div class="newline">
                            <div class="shipping_medium">
                                <label for="shippingAddress1"><g:message code="company.shipping.address1.label" /></label>
                            </div>
                            <div class="shipping_medium">
                                <label for="shippingAddress2"><g:message code="company.shipping.address2.label" /></label>
                            </div>
						</div>
						<div class="spacer-small"></div>
						<div class="newline">
							<div class="shipping_medium">
								<input type="text" name="company.shipFrom.road1" id="shippingAddress1" />
							</div>
                            <div class="shipping_medium">
                                <input type="text" name="company.shipFrom.road2" id="shippingAddress2" />
                            </div>
						</div>
						<div class="spacer"></div>
						<div class="newline">
							<div class="shipping_small">
								<label for="shippingCarriers"><g:message code="company.shipping.shippingCarriers.label" /></label>
							</div>
							<div class="shipping_medium">
								<label for="shippingHandlingTime" class="spacer"><g:message code="company.shipping.handlingTime.label" /></label>
							</div>
							<div class="shipping_small">
								<label for="shippingWeightUnit"><g:message code="company.shipping.weightUnit.label" /></label>
							</div>
						</div>
						<div class="spacer-small"></div>
						<div class="newline">
							<div class="shipping_small">
								<select name="shipping.CarriersMultiSelectList" id="shippingCarriers" multiple="multiple">
									<option id="company.shippingCarriers.ups" value="UPS">&nbsp;UPS</option>
									<option id="company.shippingCarriers.fedex" value="FedEx">&nbsp;FedEx</option>
								</select>
							</div>
							<div class="shipping_medium">
								<label style="white-space: nowrap;" class="spacer">
									<input type="number" min="0" max="999999999" name="company.handlingTime" id="shippingHandlingTime" pattern="\d+"/>
									&nbsp;<g:message code="company.shipping.businessdays.label" />
								</label>
							</div>
							<div class="shipping_small">
								<select name="company.weightUnit" id="shippingWeightUnit" multiple="multiple">
									<option value="KG"><g:message code="shipping.kilogram.label" /></option>
									<option value="G"><g:message code="shipping.gram.label" /></option>
									<option value="LB"><g:message code="shipping.pound.label" /></option>
								</select>
							</div>
						</div>
						<div class="spacer"></div>
						<div class="newline">
							<div class="shipping_small">
								<label for="shippingRefundPolicy"><g:message code="company.shipping.refundPolicy.label" /></label>
							</div>
							<div class="shipping_medium">
								<label for="shippingReturnPolicy" class="spacer"><g:message code="company.shipping.returnPolicy.label" /></label>
							</div>
						</div>
						<div class="spacer-small"></div>
						<div class="newline">
							<div class="shipping_small">
								<select name="company.refundPolicy" id="shippingRefundPolicy" multiple="multiple">
									<option value="NO_REFUND">NO_REFUND</option>
									<option value="MONEYBACK">MONEYBACK</option>
									<option value="EXCHANGE">EXCHANGE</option>
								</select>
							</div>
							<div class="shipping_medium">
								<label style="white-space: nowrap;" class="spacer">
									<input type="number" min="0" max="999999999" name="company.returnPolicy" id="shippingReturnPolicy" pattern="\d+" />
									&nbsp;<g:message code="company.shipping.businessdays.label" />
								</label>
							</div>
						</div>
						<div class="spacer"></div>
                        <div class="newline">
                            <p style="font-weight: bold;"><g:message code="company.shipping.rules.header.label" /> <a href="javascript:void(0)" id="addNewShippingRule"><g:message code="company.shipping.rules.add.label" /></a></p>
                            <div id="shippingRulesGridDiv">
                                <div id="shippingRulesGrid"></div>
                            </div>
                        </div>
                        <div class="spacer"></div>
						<div class="newline">
							<br style="clear: both;"/>
							<input type="checkbox" id="shippingAllowInternational"/>
							<label for="shippingAllowInternational"><g:message code="company.shipping.allowInternationalShipping.label" /></label>
						</div>
						<div class="spacer"></div>
					</div>
				</div>
			</form>
		</div>

		<!-- Tax Tab -->
		<div id="tax" class="fk_content_area">
			<select id="companyTaxDropDownList" multiple="multiple"></select>
			<div id="taxForm" style="margin-top: 8px;">
				<div class="errors"></div>
				<div id="taxContent">
					<p style="font-weight: bold;"><g:message code="company.tax.header.label" /> <a href="javascript:void(0)" id="addNewTaxRate"><g:message code="company.tax.addNewTaxRate.label" /></a></p>
					<div id="taxGridDiv">
						<div id="taxGrid"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- Payment Tab -->
		<div id="payment" class="fk_content_area">
			<form id="formPayment" name="form_payment_comp" onsubmit="return false;">
				<div id="paymentForm">
					<div class="errors"></div>
					<div id="paymentContent">
						<div class="newline">
							<div class="payment_left">
								<label for="paymentCurrencyCombo"><g:message code="company.payment.currency.label" />&nbsp;<sup>*</sup></label>
							</div>
						</div>
						<div class="spacer-small"></div>
						<div class="newline">
							<div class="payment_left">
								<select name="company.currencyCode" id="paymentCurrencyCombo" multiple="multiple">
									<option value="USD">USD $</option>
									<option value="EUR">EUR &euro;</option>
								</select>
							</div>
						</div>
						<div class="spacer"></div>
					</div>
				</div>
			</form>
		</div>

        <!-- Brands Tab -->
        <div id="brands" class="fk_content_area">
            <form id="formBrands" name="form_brands_comp" onsubmit="return false;">
                <div id="brandsForm">
                    <div class="errors"></div>
                    <div id="brandsContent">
                        <p style="font-weight: bold;"><g:message code="company.brands.header.label" /> <a href="javascript:void(0)" id="addNewBrand"><g:message code="company.brands.add.label" /></a></p>
                        <div id="brandsGridDiv">
                            <div id="brandsGrid"></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <!-- Coupons Tab -->
        <div id="coupons" class="fk_content_area">
            <form id="formCoupons" name="form_coupons_comp" onsubmit="return false;">
                <div id="couponsForm">
                    <div class="errors"></div>
                    <div id="couponsContent">
                        <p style="font-weight: bold;"><g:message code="company.coupons.header.label" /> <a href="javascript:void(0)" id="addNewCoupon"><g:message code="company.coupons.add.label" /></a></p>
                        <div id="couponsGridDiv">
                            <div id="couponsGrid"></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <!-- publishing Tab -->
        <div id="publishing" class="fk_content_area">
            <form id="formPublishing" name="form_publish_comp" onsubmit="return false;">
                <div id="publishingForm">
                    <div class="errors"></div>
                    <div id="publishingContent">
                        <p style="font-weight: bold;"><g:message code="company.publishing.header.label" /> <a href="javascript:void(0)" id="addNewPublishing"><g:message code="company.publishing.add.label" /></a></p>
                        <div id="publishingGridDiv">
                            <div id="publishingGrid"></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <!-- Api Keys Tab -->
        <div id="apiKeys" class="fk_content_area">
            <form id="formApiKeys" name="form_api_comp" onsubmit="return false;">
                <div id="apiKeysForm">
                    <div class="errors"></div>
                    <div class="newline">
                        <div class="apiKeys_medium">
                            <label for="apiKeysMapProvider"><g:message code="company.general.map.provider.label" /></label>
                        </div>
                        <div class="apiKeys_medium">
                            <label for="apiKeysGoogleAnalyticsKey"><g:message code="company.general.gakey.label" /></label>
                        </div>
                    </div>
                    <div class="spacer-small"></div>
                    <div class="newline">
                        <div class="apiKeys_medium">
                            <select name="company.mapProvider" id="apiKeysMapProvider" multiple="multiple">
                                <option value="GOOGLE_MAP" selected="selected">Google Map</option>
                                <option value="OPEN_STREET_MAP">Open Street Map</option>
                            </select>
                        </div>
                        <div class="apiKeys_medium">
                            <input type="text" name="company.gakey" id="apiKeysGoogleAnalyticsKey" />
                        </div>
                    </div>
                    <div class="spacer"></div>
                    <div class="newline">
                        <div class="apiKeys_medium">
                            <label for="apiKeysCompanyAPIKey"><g:message code="company.payment.APIKey.label" /></label>
                        </div>
                    </div>
                    <div class="spacer-small"></div>
                    <div class="newline">
                        <div class="apiKeys_medium">
                            <input name="company.apiKey" id="apiKeysCompanyAPIKey" type="text" readonly="readonly" placeholder="<g:message code="company.payment.getNewKey.placeholder.label" />" />
                        </div>
                        <div class="apiKeys_medium">
                            <button type="submit" id="getNewKeyBtn" class="fk_ok_btn"><g:message code="company.payment.getNewKeyBtn.label" /></button>
                        </div>
                    </div>
                    <div class="spacer"></div>
                </div>
            </form>
        </div>

        <!-- iBeacon Tab -->
        <div id="iBeacon" class="fk_content_area">
            <form id="formIBeacon" name="form_iBeacon_comp" onsubmit="return false;">
                <div id="iBeaconForm">
                    <div class="errors"></div>
                    <div id="iBeaconContent">
                        <p style="font-weight: bold;"><g:message code="company.iBeacon.header.label" /> <a href="javascript:void(0)" id="addNewIBeacon"><g:message code="company.iBeacon.add.label" /></a></p>
                        <div id="iBeaconGridDiv">
                            <div id="iBeaconGrid"></div>
                        </div>
                        <!-- Pagination -->
                        <div id="iBeaconPaginationDiv">
                            <div id="iBeaconPagination"></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <!-- tags Tab -->
        <div id="tags" class="fk_content_area">
            <form id="formTags" name="form_tags_comp" onsubmit="return false;">
                <div id="tagsForm">
                    <div class="errors"></div>
                    <div id="tagsContent">
                        <div id="tagsGridDiv">
                            <div id="tagsGrid"></div>
                        </div>
                        <!-- Pagination -->
                        <div id="tagsPaginationDiv">
                            <div id="tagsPagination"></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>


	<!-- Create/Edit submit buttons  -->
	<br style="clear:both;"/>
	<div align="right" id="editCompDivBtn" class="fk_button_area">
		<button type="reset" id="cancelEditCompBtn" class="fk_ok_btn"><g:message code="default.button.close.label" /></button>
	</div>
</div>