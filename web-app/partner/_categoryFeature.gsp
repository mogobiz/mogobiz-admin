<style type="text/css">
	#categoryFeaturesCreateDiv, #categoryFeaturesTranslationDiv{
		font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
		font-size: 11px;
		color: #888;
		text-align: left;
		direction: ltr;
		width: 500px;
	}
	#categoryFeaturesDialog {
		color: #888;
		text-align: left;
		direction: ltr;
		background:#F2F2F2;
		border:1px solid #CCCCCC;
		padding: 10px;
		margin: 5px 0px 0px 0px;
	}
	#categoryFeaturesTabs ul.tabs{
		padding-top: 5px;
		padding-left: 0px;
	}
</style>
<div id="categoryFeaturesTabs">
	<div id="ulTabs">
		<ul class="tabs">
			<li>
				<a id="categoryFeaturesGeneralTab">
					<g:message code="tabs.general.label" />
				</a>
			</li>
			<li>
				<a id="categoryFeaturesTranslationTab">
					<g:message code="tabs.translation.label" />
				</a>
			</li>
		</ul>
		<hr style="margin-top: 5px;" />
	</div>
	<div id="categoryFeaturesCreateDiv" >
		<form id="categoryFeaturesEditForm" onsubmit="return false;">
			<input type="hidden" name="feature.id" id="categoryFeatureId"/>
			<div class="newline">
				<div class="features-large">
					<label for="categoryFeatureName"><g:message code="category.features.name.label"/>&nbsp;<sup>*</sup></label>
				</div>
				<div class="features-large">
					<label for="categoryFeatureValue"><g:message code="category.features.value.label"/></label>
				</div>
			</div>
			<div class="spacer-small"></div>				
			<div class="newline">
				<div class="features-large">
					<input id="categoryFeatureName" autofocus type="text" required name="feature.name"/>
				</div>
				<div class="features-large">
					<input id="categoryFeatureValue" autofocus type="text" name="feature.value"/>
				</div>
			</div>
			<div id="categoryFeaturesEditDiv">
				<div class="spacer"></div>
				<div class="newline">
					<div class="features-large">
						<label for="categoryFeatureExternalCode"><g:message code="category.features.externalCode.label"/>&nbsp;</label>
					</div>
					<div class="features-large">
						<label for="categoryFeatureUUID"><g:message code="category.features.uuid.label"/>&nbsp;</label>
					</div>
				</div>
				<div class="spacer-small"></div>				
				<div class="newline">
					<div class="features-large">
						<input type="text" id="categoryFeatureExternalCode" name="feature.externalCode"/>
					</div>
					<div class="features-large">
						<input type="text" id="categoryFeatureUUID" name="feature.uuid" disabled/>
					</div>
				</div>
			</div>
			<div class="spacer"></div>
			<div class="newline">
				<input type="checkbox" id="categoryFeatureHide"/>
				<label for="categoryFeatureHide"><g:message code="category.features.hide.label"/></label>
			</div>
			<div class="spacer"></div>
		</form>
	</div>
	<div id="categoryFeaturesTranslationDiv" >
		<div style="padding: 10px;">
			<a id="categoryFeaturesTranslationAddLink"><g:message code="translation.add.label" /></a>
		</div>
		<div id="categoryFeaturesTranslationGridDiv">
			<div id="categoryFeaturesTranslationGrid" style="height: 144px;"></div>
		</div>
	</div>
</div>