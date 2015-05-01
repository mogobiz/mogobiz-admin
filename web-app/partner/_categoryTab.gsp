<%@ page import="com.mogobiz.utils.PermissionType"%>
<div id="editCategoryTabs">
	<div id="CategoryTabs">
		<div id="ulTabs">
			<ul class="tabs">
				<li>
					<a id="categoryGeneralTab">
						<g:message code="category.tabs.general.label" />
					</a>
				</li>
				<li>
					<a id="categoryVariationsTab">
						<g:message code="category.tabs.variations.label" />
					</a>
				</li>
				<li>
					<a id="categoryFeaturesTab">
						<g:message code="category.tabs.features.label" />
					</a>
				</li>
				<li>
					<a id="categoryProductsTab">
						<g:message code="category.tabs.products.label" />
					</a>
				</li>
				<li>
					<a id="categoryTranslationTab">
						<g:message code="tabs.translation.label" />
					</a>
				</li>
<store:hasPermission permission="${PermissionType.ADMIN_STORE_USERS.key}">
                <li>
                    <a id="categorySecurityTab">
                        <g:message code="tabs.security.label" />
                    </a>
                </li>
</store:hasPermission>
			</ul>
			<hr style="margin-top: 5px;" />
		</div>
		<div id="categoryGeneralTabInfo">
			<form id="categoryEditGeneralForm" onsubmit="return false;" enctype="multipart/form-data">
				<input type="hidden" name="category.id" id="categoryEditId" />
				<input type="hidden" name="category.parent[id]" id="categoryEditParentId"/>
				<div class="newline">
					<div class="category-general-medium">
						<label for="categoryEditName"><g:message code="category.tabs.general.name.label" />&nbsp;<sup>*</sup></label>
					</div>
					<div class="category-general-medium">
						<label for="categoryEditExternalCode"><g:message code="category.tabs.general.externalCode.label" /></label>
					</div>
				</div>
				<div class="spacer-small"></div>
				<div class="newline">
					<div class="category-general-medium">
						<input type="text" id="categoryEditName" name="category.name" required/>
					</div>
					<div class="category-general-medium">
						<input type="text" id="categoryEditExternalCode" name="category.externalCode" class="textInput"/>
					</div>
				</div>
				<div class="spacer"></div>
				<div class="newline">
					<div class="category-general-medium">
						<label for="categoryEditIBeacon"><g:message code="category.tabs.general.iBeacon.label" /></label>
					</div>
                    <div class="category-general-medium">
						<label for="categoryEditUUID"><g:message code="category.tabs.general.uuid.label" /></label>
					</div>
				</div>
				<div class="spacer-small"></div>
				<div class="newline">
					<div class="category-general-medium">
						<select id="categoryEditIBeacon"></select>
					</div>
					<div class="category-general-medium">
						<input type="text" id="categoryEditUUID" name="category.uuid" class="textInput" disabled/>
					</div>
				</div>
				<div class="spacer"></div>
				<div class="newline">
					<div class="category-general-full">
						<label for="categoryEditDescription"><g:message code="category.tabs.general.descripton.label" /></label>
					</div>
				</div>
				<div class="spacer-small"></div>
				<div class="newline">
					<div class="category-general-full">
						<textarea id="categoryEditDescription" name="category.description" rows="5"></textarea>
					</div>
				</div>
				<div class="spacer"></div>
				<div class="newline">
					<input type="checkbox" id="categoryEditHide" />
					<label for="categoryEditHide"><g:message code="category.tabs.general.hide.label"/></label>
				</div>
				<div class="spacer"></div>
			</form>
		</div>
		<div id="categoryVariationsTabInfo">
            <p style="font-weight: bold; padding: 5px;"><g:message code="category.variations.header.label" /> <a href="javascript:void(0)" id="categoryAddNewVariation"><g:message code="category.variations.add.label" /></a></p>
			<div id="categoryVariationsGridDiv">
				<div id="categoryVariationsGrid" style="height: 335px;"></div>
			</div>
		</div>
		<div id="categoryFeaturesTabInfo">
            <p style="font-weight: bold; padding: 5px;"><g:message code="category.features.header.label" /> <a href="javascript:void(0)" id="categoryAddNewFeature"><g:message code="category.features.add.label" /></a></p>
			<div id="categoryFeaturesGridDiv">
				<div id="categoryFeaturesGrid" style="height: 335px;"></div>
			</div>
		</div>
		<div id="categoryProductsTabInfo"">
			<div id="categoryProductSearchForm"></div>
			<div id="categoryProductsList"></div>
		</div>
		<div id="categoryTranslationTabInfo"">
			<div style="padding: 10px;">
				<a id="categoryTranslationAddLink"><g:message code="translation.add.label" /></a>
			</div>
			<div id="categoryTranslationGridDiv">
				<div id="categoryTranslationGrid" style="height: 335px;"></div>
			</div>
		</div>
        <div id="categorySecurityTabInfo">
            <div>
                <label for="categorySecurityUsers"><g:message code="security.users.label" /></label>
            </div>
            <div class="spacer-small"/>
            <div>
                <select id="categorySecurityUsers" multiple="multiple"></select>
            </div>
        </div>
	</div>
</div>