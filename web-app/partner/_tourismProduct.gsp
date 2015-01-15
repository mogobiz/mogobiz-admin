<%@ page import="com.mogobiz.store.domain.ResourceAccountType"%>

<script type="text/javascript">
function uploadAnotherFile() {
	$('#drop-area #uploadSuccess').attr('style','display:none;');
	$('#drop-area #uploadInput').attr('style','display:block;');
}
</script>

<div id="editProductTabs" style='display: none'>
	<div style='height:25px;'>
		<label id="productLabel"></label>
		<label id="productFree" class="productFreeLabel"></label>
	</div>
	<div id="productTabs">
		<div id="ulTabs">
			<ul class="tabs">
				<li><a id="infoTab"> <g:message code="tabs.description.label" /> </a></li>
                <li><a id="propertiesTab"><g:message code="tabs.properties.label" /> </a></li>
				<li><a id="featuresTab"><g:message code="tabs.features.label" /> </a></li>
				<li><a id="pricingTab"><g:message code="tabs.pricing.label" /> </a></li>
				<li><a id="calendarTab"> <g:message code="tabs.calendar.label" /> </a></li>
				<li><a id="geolocTab"> <g:message code="tabs.direction.label" /> </a></li>
                <li><a id="suggestionsTab"> <g:message code="tabs.suggestions.label" /> </a></li>
                <li><a id="shippingTab"> <g:message code="tabs.shipping.label" /> </a></li>
				<li><a id="traslationTab"> <g:message code="tabs.translation.label" /> </a></li>
			</ul>
			<hr style="margin-top: 5px;" />
		</div>
		<div id="generalInfo" class="fk_content_area">
			<form id="formCreerProd" name="form_ProductInfo" onsubmit="return false;" method="POST" enctype="multipart/form-data">
				<input type="hidden" name="product.id" id="productId" />
				<input type="hidden" name="product.xtype" id="productType" />
				<div class="newline">
					<div class="general-large">
						<label for="productName"><g:message code="product.name.label" />&nbsp;<sup>*</sup></label>
					</div>
					<div class="general-small">
						<label for="productSKU"><g:message code="product.unitCode.label" />&nbsp;<sup>*</sup></label>
					</div>
				</div>
				<div class="spacer-small"></div>
 				<div class="newline">
 					<div class="general-large">
						<input type="text" id="productName" name="product.name" required placeholder="(<g:message code="product.enterProductName.label" />)" />
					</div>
					<div class="general-small">
						<input type="text" disabled id="productSKU" name="product.code" class="textInput" required placeholder="(<g:message code="product.enterProductCode.label" />)"/>
					</div>
				</div>
				<div class="spacer"></div>

 				<div class="newline">
					<div class="general-large">
						<label for="productCategories" id="productCategoriesLabel"><g:message code="product.category.label" /></label>
					</div>
					<div class="general-small">
						<label><g:message code="product.externalCode.label" /></label>
					</div>
				</div>
				<div class="spacer-small"></div>
				<div class="newline">
					<div class="general-large">
						<select name="product.categoriesMultiSelectList" multiple="multiple" id="productCategories"></select>
					</div>
					<div class="general-small">
						<input type="text" id="productExternalCode" name="product.externalCode" class="textInput" placeholder="(<g:message code="product.enterProductExternalCode.label" />)"/>
					</div>
				</div>
				<div class="spacer"></div>

                <div class="newline">
                    <div class="general-large">
                        <label for="productKeywords"><g:message code="product.keywords.label" /></label>
                    </div>
                    <div class="general-small">
                        <label for="productAvailabilityDate"><g:message code="product.availabilityDate.label" /></label>
                    </div>
                </div>
                <div class="spacer-small"></div>
                <div class="newline">
                    <div class="general-large">
                        <input type="text" id="productKeywords" name="product.keywords" class="textInput" placeholder="(<g:message code="product.enterProductKeywords.label" />)"/>
                    </div>
                    <div class="general-small">
                        <input id="productAvailabilityDate" type="text" pattern="\d{2}\/\d{2}/\d{4}" placeholder="<g:message code="calendar.datePlaceholder.label"/>" />
                    </div>
                </div>
                <div class="spacer"></div>

				<div class="newline">
					<div class="general-large">
						<label for="productTags"><g:message code="product.tags.label" /></label>
					</div>
					<div class="general-small">
                        <label for="productIBeacon"><g:message code="product.iBeacon.label" /></label>
					</div>
				</div>
 				<div class="spacer-small"></div>
				<div class="newline">
 					<div class="general-large">
     					<input id="productTags" type="text" class="tags" placeholder="<g:message code="product.add.tag"/>" removeMessage="<g:message code="product.remove.tag"/>"/>
     				</div>
					<div class="general-small">
                        <select id="productIBeacon"></select>
                        <div class="spacer"></div>
                        <div>
                            <a id="brandLink"><label><g:message code="product.brand.label" /></label></a>
                        </div>
                        <div class="spacer-small"></div>
                        <div>
                            <select id="productBrand" multiple="multiple" name="product.brand.id"></select>
                        </div>
					</div>
				</div>
				<div class="spacer"></div>

				<div class="newline">
					<div class="general-large">
						<label for="productDescription"><g:message code="product.description.label" /></label>
					</div>
					<div class="general-small">
						<label><g:message code="product.picture.label" /></label>
					</div>
				</div>
				<div class="spacer-small"></div>
				<div class="newline">
					<div class="general-large">
						<div id="productDescriptionTextDiv"></div>
						<textarea name="product.description" id="productDescription" style="display:none; visibility:hidden;"></textarea>
						<div class="spacer"></div>
						<div class="newline">
							<input type="checkbox" id="tourismCalendarValidityPeriod" />
							<label for="tourismCalendarValidityPeriod"><g:message code="calendar.publication.active"/></label>
						</div>
					</div>
					<div class="general-small">
						<div id="carousselDiv">
							<div class="flavor_2" id="flavor_div"></div>
						</div>
						<div id="drop-area">
							<div align="center"><g:message code="product.uploadMedia.label" /></div>
							<div class="spacer"></div>
							<div class="spacer"></div>
							<div align="center" id="uploadInput" style="display:block;">
								<input id="files-upload" type="file" name="file">
							</div>
							<div align="center" id="uploading" style="display:none"><g:message code="product.uploadLoading.label" /></div>
							<div align="center" id="uploadSuccess" style="display:none">
								<g:message code="product.uploadSuccess.label" />
								<div class="spacer-small"></div>
								<a href="javascript:void(0)" onclick="uploadAnotherFile();"><g:message code="product.uploadAnother.label" /></a>
							</div>
						</div>
					</div>
				</div>
 				<div class="spacer"></div>
 			</form>
		</div>

        <div id="tourismProperties" class="fk_content_area">
            <div class="spacer"></div>
            <div id="tourismPropertiesLabelAddText" style="padding-bottom: 10px;">
                <g:message code="properties.propertiesLabel.label" />&nbsp;<a id="tourismPropertiesAddLink"><g:message code="properties.propertiesAdd.label" /></a>
            </div>
            <div id="tourismPropertiesGridDiv" style="width: 100%; float: left;">
                <div id="tourismPropertiesGrid" style="width: 100%; height: 370px;"></div>
            </div>
            <div class="spacer"></div>
        </div>

		<div id="featuresInfo" class="fk_content_area">
			<div class="spacer"></div>
			<div id="tourismFeaturesLabelAddText" style="padding-bottom: 10px;">
				<g:message code="features.featureslabel.label" />&nbsp;<a id="tourismFeaturesAddLink"><g:message code="features.featuresAdd.label" /></a>
			</div>
			<div id="tourismFeaturesGridDiv" style="width: 100%; float: left;">
				<div id="tourismFeaturesGrid" style="width: 100%; height: 370px;"></div>
 			</div>
			<div class="spacer"></div>
		</div>

		<div id="tourismPricing" class="fk_content_area">
			<div id="tourismPricingLabelGlobalStock">
				<g:message for="productMontant" code="pricing.product.label" />:&nbsp;&nbsp;
				<input id="productMontant" type="text" pattern="\d{0,6}\.?\d{0,2}" required name="product.price" style="width: 100px;">&nbsp;&nbsp;
				<g:message for="productTaxRate" code="pricing.taxRate.label" />:&nbsp;&nbsp;
				<select id="productTaxRate" multiple="multiple"></select>&nbsp;&nbsp;
				<input id="globalstockDisplay" type="checkbox" name="pricing.stockdisplay">&nbsp;<g:message code="pricing.stockdisplay.label" />
			</div>
			<div class="spacer"></div>
			<div id="tourismPricingLabelAddText" style="padding-bottom: 10px;">
				<g:message code="pricing.pricinglabel.label" />&nbsp;<a id="tourismPriceAddLink"><g:message code="pricing.pricingAdd.label" /></a>
			</div>
			<div id="tourismPricingGridDiv" style="width: 100%; float: left;">
				<div id="tourismPricingGrid" style="width: 100%; height: 335px;"></div>
			</div>
			<div class="spacer"></div>
		</div>

		<div id="calendarDiv" class="fk_content_area">
			<div style="padding-bottom: 10px;">
				<select id="calendarType" >
					<option value="NO_DATE"><g:message code="product.calendar.select.nodate" /></option>
					<option value="DATE_ONLY"><g:message code="product.calendar.select.dateonly" /></option>
					<option value="DATE_TIME"><g:message code="product.calendar.select.datetime" /></option>
				</select>
			</div>
			<div style="padding-bottom: 10px;">
				<g:message code="product.calendar.select.period" />
				<a id="addCalendarPeriod"><g:message code="product.calendar.add.period" /></a> or
				<a id="excludeCalendarPeriod"><g:message code="product.calendar.exclude.period" /></a>
				<g:message code="product.calendar.period.label" />
			</div>
			<div id="tourismCalendarGridDiv" style="width: 100%; float: left;">
				<div id="tourismCalendarGrid" style="width: 100%; height: 305px;"></div>
			</div>
			<div class="spacer"></div>

			<div class="newline">
				<div class="general-small">
					<label for="validityPeriodfeatured" id="validityPeriodLabelfeatured"><g:message code="package.validityfeatured.date.label" /></label>
				</div>
				<div class="general-small">
					<label for="productStartDatefeatured" id="productStartDatelabelfeatured"><g:message code="product.startDatefeatured.label" />&nbsp;<sup>*</sup></label>
				</div>
				<div class="general-small">
					<label for="productStopDatefeatured" id="productStopDatelabelfeatured"><g:message code="product.stopDatefeatured.label" />&nbsp;<sup>*</sup></label>
				</div>
			</div>
			<div class="spacer-small"></div>
			<div class="newline">
				<div class="general-small">
					<select id="validityPeriodfeatured">
						<option value="alwaysfeatured"><g:message code="package.validityfeatured.date.alwaysfeatured.label" /></option>
						<option value="periodfeatured"><g:message code="package.validityfeatured.date.periodfeatured.label" /></option>
						<option value="notnowfeatured"><g:message code="package.validityfeatured.date.Nnowfeatured.label" /></option>
					</select>
				</div>
				<div class="general-small">
					<input type="text" name="product.startFeatureDate" id="productStartDatefeatured" required pattern="\d{2}\/\d{2}/\d{4}" />
				</div>
				<div class="general-small">
					<input type="text" name="product.stopFeatureDate" id="productStopDatefeatured" required pattern="\d{2}\/\d{2}/\d{4}" />
				</div>
			</div>
		</div>

		<div id="geoloc">
			<div id="geolocalizeProductDiv" class="fk_content_area">
				<div id="poiAddress" align="left">
					<g:message code="poi.select.message" />&nbsp;<a id="createPoiLabel"><g:message code="poi.create.label" /></a>
				</div>
				<div class="spacer"></div>
				<div id="mapDiv"></div>
			</div>
		</div>

		<div id="tourismSuggestions" class="fk_content_area">
			<div class="newline">
				<div class="suggestions-large">
					<label for="tourismSuggestionsCompanySelect"><g:message code="tourismSuggestions.company.label"/></label>
				</div>
				<div class="suggestions-large">
					<label for="tourismSuggestionsProductSelect"><g:message code="tourismSuggestions.productName.label"/></label>
				</div>
			</div>
			<div class="spacer-small"></div>
			<div class="newline">
				<div class='suggestions-large'>
					<select id="tourismSuggestionsCompanySelect" multiple="multiple"></select>
				</div>
				<div class='suggestions-large'>
					<select id="tourismSuggestionsProductSelect" multiple="multiple" style="width: 300px;"></select>
				</div>
			</div>
			<div class="spacer"></div>
			<div id="tourismSuggestionsGridDiv" style="width: 100%; float: left;">
				<div id="tourismSuggestionsGrid" style="width: 100%;"></div>
			</div>
		</div>

        <div id="tourismShipping" class="fk_content_area">
            <div class="newline">
                <div class="product-shipping">
                    <label for="tourismShippingWeight"><g:message code="shipping.weight.label"/></label>
                </div>
                <div class="product-shipping">
                    <label for="tourismShippingWeightUnit"><g:message code="shipping.weightUnit.label"/></label>
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class='product-shipping'>
                    <input type="text" id="tourismShippingWeight" pattern="[0-9]+"/>
                </div>
                <div class='product-shipping'>
                    <select id="tourismShippingWeightUnit" multiple="multiple">
                        <option value="KG"><g:message code="shipping.kilogram.label" /></option>
                        <option value="G"><g:message code="shipping.gram.label" /></option>
                        <option value="LB"><g:message code="shipping.pound.label" /></option>
                    </select>
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <div class="product-shipping">
                    <label for="tourismShippingWidth"><g:message code="shipping.width.label"/></label>
                </div>
                <div class="product-shipping">
                    <label for="tourismShippingHeight"><g:message code="shipping.height.label"/></label>
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class='product-shipping'>
                    <input type="text" id="tourismShippingWidth" pattern="[0-9]+"/>
                </div>
                <div class='product-shipping'>
                    <input type="text" id="tourismShippingHeight" pattern="[0-9]+"/>
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <div class="product-shipping">
                    <label for="tourismShippingDepth"><g:message code="shipping.depth.label"/></label>
                </div>
                <div class="product-shipping">
                    <label for="tourismShippingLinearUnit"><g:message code="shipping.linearUnit.label"/></label>
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class='product-shipping'>
                    <input type="text" id="tourismShippingDepth" pattern="[0-9]+"/>
                </div>
                <div class='product-shipping'>
                    <select id="tourismShippingLinearUnit" multiple="multiple">
                        <option value="CM"><g:message code="shipping.centimeter.label" /></option>
                        <option value="IN"><g:message code="shipping.inch.label" /></option>
                    </select>
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <div class="product-shipping">
                    <label for="tourismShippingAmount"><g:message code="shipping.amount.label"/></label>
                </div>
                <div class="product-shipping">
                    <label for="tourismShippingReturnMaxDelay"><g:message code="shipping.returnDelay.label"/></label>
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class='product-shipping'>
                    <input type="text" id="tourismShippingAmount" pattern="[0-9]+"/>
                </div>
                <div class='product-shipping'>
                    <input type="text" id="tourismShippingReturnMaxDelay" pattern="[0-9]+"/>
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <input type="checkbox" id="tourismShippingFree" />
                <label for="tourismShippingFree"><g:message code="shipping.nopolicy.label"/></label>
            </div>
            <div class="spacer"></div>
        </div>

		<div id="tourismTranslation">
			<div style="padding: 10px;">
				<a id="tourismTranslationAddLink"><g:message code="translation.add.label" /></a>
			</div>
			<div id="tourismTranslationGridDiv">
				<div id="tourismTranslationGrid" style="height: 335px;"></div>
			</div>
		</div>

		<!-- Create/Edit submit buttons  -->
		<br style="clear:both;"/>
		<div align="right" id="editProductBtn">
			<div class="fk_button_area" id="activePrdBtn">
				<button type="submit" id="closeBtn" class="fk_ok_btn"><g:message code="default.button.close.label" /></button>
                <button type="submit" id="deleteBtn" class="fk_ko_btn deleteBtn"><g:message code="default.button.delete.label" /></button>
			</div>
		</div>
	</div>
	<iframe id="hidden-upload-frame" name="hidden-upload-frame" style="display: none" ></iframe>
</div>
