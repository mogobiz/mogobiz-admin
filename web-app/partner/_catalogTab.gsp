<%@ page import="com.mogobiz.utils.PermissionType"%>
<div id="catalogTabs">
	<div id="ulTabs">
		<ul class="tabs">
			<li>
				<a id="catalogGeneralTab">
					<g:message code="tabs.general.label" />
				</a>
			</li>
			<li>
				<a id="catalogTranslationTab">
					<g:message code="tabs.translation.label" />
				</a>
			</li>
<store:hasPermission permission="${PermissionType.ADMIN_STORE_USERS.key}">
            <li>
                <a id="catalogSecurityTab">
                    <g:message code="tabs.security.label" />
                </a>
            </li>
</store:hasPermission>
		</ul>
		<hr style="margin-top: 5px;" />
	</div>
	<div id="catalogGeneralDiv" >
		<div class="newline">
			<div class="catalog-large">
				<label for="catalogName"><g:message code="catalog.name.label"/>&nbsp;<sup>*</sup></label>
			</div>
			<div class="catalog-large">
				<label for="catalogExternalCode"><g:message code="catalog.externalCode.label"/></label>
			</div>
		</div>
		<div class="spacer-small"></div>
		<div class="newline">
			<div class="catalog-large">
				<input id="catalogName" autofocus type="text" required name="catalog.name"/>
			</div>
			<div class="catalog-large">
				<input id="catalogExternalCode" type="text" name="catalog.externalCode"/>
			</div>
		</div>
		<div class="spacer"></div>
		<div class="newline">
			<div class="catalog-large">
				<label for="catalogActivationDate"><g:message code="catalog.activationDate.label"/>&nbsp;<sup>*</sup></label>
			</div>
			%{--<div class="catalog-large">--}%
				%{--<label for="catalogChannels"><g:message code="catalog.channels.label"/></label>--}%
			%{--</div>--}%
		</div>
		<div class="spacer-small"></div>
		<div class="newline">
			<div class="catalog-large">
				<input id="catalogActivationDate" type="text" required name="catalog.activationDate"/>
			</div>
			%{--<div class="catalog-large">--}%
				%{--<select id="catalogChannels"  multiple="multiple" name="catalog.channels">--}%
					%{--<option value="web">Web</option>--}%
					%{--<option value="mobile">Mobile</option>--}%
					%{--<option value="tablet">Tablet</option>--}%
				%{--</select>--}%
			%{--</div>--}%
		</div>
		<div class="spacer"></div>
		<div class="newline">
			<div class="catalog-full">
				<label for="catalogDescription"><g:message code="catalog.description.label" /></label>
			</div>
		</div>
		<div class="spacer-small"></div>
		<div class="newline">
			<div class="catalog-full">
				<textarea id="catalogDescription" name="catalog.description" rows="5"></textarea>
			</div>
		</div>
		%{--<div class="spacer"></div>
		<div class="newline">
			<input type="checkbox" id="catalogSocial" />
			<label for="catalogSocial"><g:message code="catalog.social.label"/></label>
		</div>--}%
		<div class="spacer"></div>
		<div id="catalogPublicationDiv">
			<div class="newline">
				<div class="catalog-medium">
					<label for="catalogListPublication"><g:message code="catalog.publish.label"/></label>
				</div>
                <div class="catalog-medium">&nbsp;</div>
                <div class="catalog-medium">
                    <label for="catalogListIndices"><g:message code="catalog.indices.label"/></label>
                </div>
			</div>
			<div class="spacer-small"></div>
			<div class="newline">
				<div class="catalog-medium">
					<select id="catalogListPublication"></select>
				</div>
				<div class="catalog-medium">
					<button type="submit" id="catalogPublishBtn" class="fk_ok_btn"><g:message code="catalog.publishBtn.label" /></button>
				</div>
                <div class="catalog-medium">
                    <select id="catalogListIndices" style="width:170px;"></select>
                </div>
			</div>
		</div>
		<div class="spacer"></div>
        <div id="catalogPublicationError"></div>
        <div id="catalogLastPublicationStatus"></div>
		<div class="spacer"></div>
	</div>
	<div id="catalogTranslationDiv">
		<div style="padding: 10px;">
			<a id="catalogTranslationAddLink"><g:message code="translation.add.label" /></a>
		</div>
		<div id="catalogTranslationGridDiv">
			<div id="catalogTranslationGrid" style="height: 174px;"></div>
		</div>
	</div>
    <div id="catalogSecurityDiv">
        <div>
            <label for="catalogSecurityUsers"><g:message code="security.users.label" /></label>
        </div>
        <div class="spacer-small"/>
        <div>
            <select id="catalogSecurityUsers" multiple="multiple"></select>
        </div>
    </div>
</div>