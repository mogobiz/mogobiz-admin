<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<style type="text/css">
	#categoryVariationsCreateDiv, #categoryVariationsTranslationDiv{
		font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
		font-size: 11px;
		color: #888;
		text-align: left;
		direction: ltr;
		width: 500px;
	}
	#categoryVariationsDialog{
		color: #888;
		text-align: left;
		direction: ltr;
		background:#F2F2F2;
		border:1px solid #CCCCCC;
		padding: 10px;
		margin: 5px 0px 0px 0px;
	}
	#categoryVariationsTabs ul.tabs{
		padding-top: 5px;
		padding-left: 0px;
	}
</style>
<div id="categoryVariationsTabs">
	<div id="ulTabs">
		<ul class="tabs">
			<li>
				<a id="categoryVariationsGeneralTab">
					<g:message locale="${lang}" code="tabs.general.label" />
				</a>
			</li>
			<li>
				<a id="categoryVariationsTranslationTab">
					<g:message locale="${lang}" code="tabs.translation.label" />
				</a>
			</li>
		</ul>
		<hr style="margin-top: 5px;" />
	</div>
	<div id="categoryVariationsCreateDiv" >
		<form id="categoryVariationsEditForm" onsubmit="return false;">
			<div class="newline">
				<div class="variations-large">
					<label for="categoryVariationName"><g:message locale="${lang}" code="category.variations.name.label"/>&nbsp;<sup>*</sup></label>
				</div>
				<div class="variations-large">
					<label for="categoryVariationExternalCode"><g:message locale="${lang}" code="category.variations.externalCode.label"/></label>
				</div>
			</div>
			<div class="spacer-small"></div>
			<div class="newline">
				<div class="variations-large">
					<input id="categoryVariationName" autofocus type="text" required name="variation.name"/>
				</div>
				<div class="variations-large">
					<input id="categoryVariationExternalCode" autofocus type="text" name="variation.externalCode"/>
				</div>
			</div>
			<div class="spacer"></div>
			<div class="newLine">
				<div class="variations-full">
					<label for="categoryVariationValues"><g:message locale="${lang}" code="category.variations.values.label"/></label>
				</div>
			</div>
			<div class="spacer-small"></div>
			<div class="newLine">
				<div class="variations-full">
					<input id="categoryVariationValues" autofocus type="text" name="variation.values" pattern="[^_]+" placeholder="<g:message locale="${lang}" code="category.variations.values.placeholder"/>"/>
				</div>
			</div>
			<div id="categoryVariationsEditDiv">
				<div class="spacer"></div>
				<div class="newline">
					<div class="variations-large">
						<label for="categoryVariationUUID"><g:message locale="${lang}" code="category.variations.uuid.label"/>&nbsp;</label>
					</div>
				</div>
				<div class="spacer-small"></div>				
				<div class="newline">
					<div class="variations-large">
						<input type="text" id="categoryVariationUUID" name="variation.uuid" disabled/>
					</div>
				</div>
			</div>
			<div class="spacer"></div>
			<div class="newline">
				<input type="checkbox" id="categoryVariationHide"/>
				<label for="categoryVariationHide"><g:message locale="${lang}" code="category.variations.hide.label"/></label>
			</div>
			<div class="spacer"></div>
		</form>
	</div>
	<div id="categoryVariationsTranslationDiv" >
		<div style="padding: 10px;">
			<a id="categoryVariationsTranslationAddLink"><g:message locale="${lang}" code="translation.add.label" /></a>
		</div>
		<div id="categoryVariationsTranslationGridDiv">
			<div id="categoryVariationsTranslationGrid" style="height: 144px;"></div>
		</div>
	</div>
</div>