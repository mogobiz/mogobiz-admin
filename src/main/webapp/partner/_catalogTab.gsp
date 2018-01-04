<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<%@ page import="com.mogobiz.utils.PermissionType"%>
<div id="catalogTabs">
	<div id="ulTabs">
		<ul class="tabs">
			<li>
				<a id="catalogGeneralTab">
					<g:message locale="${lang}" code="tabs.general.label" />
				</a>
			</li>
            <li>
                <a id="catalogPublishTab">
                    <g:message locale="${lang}" code="tabs.publishing.label" />
                </a>
            </li>
            <li>
                <a id="catalogMarketplaceTab">
                    <g:message locale="${lang}" code="tabs.marketplace.label" />
                </a>
            </li>
            <li>
                <a id="catalogTranslationTab">
                    <g:message locale="${lang}" code="tabs.translation.label" />
                </a>
            </li>
<store:hasPermission permission="${PermissionType.ADMIN_STORE_USERS.key}">
            <li>
                <a id="catalogSecurityTab">
                    <g:message locale="${lang}" code="tabs.security.label" />
                </a>
            </li>
</store:hasPermission>
		</ul>
        <hr style="margin-top: -1px;"/>
	</div>
	<div id="catalogGeneralDiv" >
		<div class="newline">
			<div class="catalog-large">
				<label for="catalogName"><g:message locale="${lang}" code="catalog.name.label"/>&nbsp;<sup>*</sup></label>
			</div>
			<div class="catalog-large">
				<label for="catalogExternalCode"><g:message locale="${lang}" code="catalog.externalCode.label"/></label>
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
				<label for="catalogActivationDate"><g:message locale="${lang}" code="catalog.activationDate.label"/>&nbsp;<sup>*</sup></label>
			</div>
			%{--<div class="catalog-large">--}%
				%{--<label for="catalogChannels"><g:message locale="${lang}" code="catalog.channels.label"/></label>--}%
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
				<label for="catalogDescription"><g:message locale="${lang}" code="catalog.description.label" /></label>
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
			<label for="catalogSocial"><g:message locale="${lang}" code="catalog.social.label"/></label>
		</div>--}%
		<div class="spacer"></div>
        <div id="catalogPublicationError"></div>
		<div class="spacer"></div>
	</div>

    <div id="catalogPublishDiv">
        <div class="newline">
            <div class="catalog-full">
                <label for="catalogPublishListPublication"><g:message locale="${lang}" code="catalog.publish.label"/></label>
            </div>
        </div>
        <div class="spacer-small"></div>
        <div class="newline">
            <div class="catalog-large">
                <select id="catalogPublishListPublication"></select>
            </div>
            <div class="catalog-large">
                <button type="submit" id="catalogPublishBtn" class="fk_ok_btn"><g:message locale="${lang}" code="catalog.publishBtn.label" /></button>&nbsp;&nbsp;
                <input type="checkbox" id="catalogPublishRunDifferences" />
                <label for="catalogPublishRunDifferences"><g:message locale="${lang}" code="catalog.runDiff.label"/></label>
            </div>
        </div>
        <div class="spacer-small"></div>
        <div id="catalogPublishLastPublicationStatus"></div>
        <div class="spacer"></div>
        <div class="newline">
            <div class="catalog-large">
                <label for="catalogPublishListIndices"><g:message locale="${lang}" code="catalog.indices.label"/></label>
            </div>
        </div>
        <div class="spacer-small"></div>
        <div class="newline">
            <div class="catalog-large">
                <select id="catalogPublishListIndices"></select>
            </div>
        </div>
        <div class="spacer"></div>
        <div style="padding: 10px;">
            <span class="catalog-reports-title"><g:message locale="${lang}" code="catalog.history.title.label" /></span><a id="catalogPublishRefreshHistory" class="catalog-refresh-icon"></a>
        </div>
        <div id="catalogPublishHistoryGridDiv">
            <div id="catalogPublishHistoryGrid" style="height: 174px;"></div>
        </div>
        <div id="catalogPublishHistoryPaginationDiv">
            <div id="catalogPublishHistoryPagination"></div>
        </div>
        <div class="spacer"></div>
    </div>
    <div id="catalogMarketplaceDiv">
        <div id="catalogMiraklPublicationDiv">
            <div class="newline">
                <div class="catalog-medium">
                    <label for="catalogListMiraklEnv"><g:message locale="${lang}" code="catalog.mirakl.label"/></label>
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="catalog-medium">
                    <select id="catalogListMiraklEnv"></select>
                </div>
                <div class="catalog-xlarge">
                    <button type="submit" id="catalogMarketplacePublishBtn" class="fk_ok_btn" style="float: none;"><g:message locale="${lang}" code="catalog.publishBtn.label" /></button>
                    <button type="submit" id="catalogMarketplaceRefreshBtn" class="fk_ok_btn" style="float: none;"><g:message locale="${lang}" code="catalog.refreshBtn.label" /></button>
                </div>
            </div>
        </div>
        <div class="spacer"></div>
        <div style="padding: 10px;">
            <span class="catalog-reports-title"><g:message locale="${lang}" code="catalog.report.title.label" /></span><a id="catalogMarketplaceRefreshReports" class="catalog-refresh-icon"></a>
        </div>
        <div id="catalogMarketplaceReportsGridDiv">
            <div id="catalogMarketplaceReportsGrid" style="height: 174px;"></div>
        </div>
        <div id="catalogMarketplaceReportsPaginationDiv">
            <div id="catalogMarketplaceReportsPagination"></div>
        </div>
    </div>
    <div id="catalogTranslationDiv">
        <div style="padding: 10px;">
            <a id="catalogTranslationAddLink"><g:message locale="${lang}" code="translation.add.label" /></a>
        </div>
        <div id="catalogTranslationGridDiv">
            <div id="catalogTranslationGrid" style="height: 174px;"></div>
        </div>
    </div>
    <div id="catalogSecurityDiv">
        <div>
            <label for="catalogSecurityUsers"><g:message locale="${lang}" code="security.users.label" /></label>
        </div>
        <div class="spacer-small"/>
        <div>
            <select id="catalogSecurityUsers" multiple="multiple"></select>
        </div>
    </div>
</div>