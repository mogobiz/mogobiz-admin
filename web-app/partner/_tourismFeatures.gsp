<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<style type="text/css">
	#tourismFeaturesAddDiv, #tourismFeaturesTranslationDiv{
		font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
		font-size: 11px;
		color: #888;
		text-align: left;
		direction: ltr;
		width: 500px;
	}
	#tourismFeaturesCreateDialog {
		color: #888;
		text-align: left;
		direction: ltr;
		background:#F2F2F2;
		border:1px solid #CCCCCC;
		padding: 10px;
		margin: 5px 0px 0px 0px;
	}
	#tourismFeaturesTabs ul.tabs{
		padding-top: 5px;
		padding-left: 0px;
	}
</style>

<div id="tourismFeaturesTabs">
	<div id="ulTabs">
		<ul class="tabs">
			<li>
				<a id="tourismFeaturesGeneralTab">
					<g:message locale="${lang}" code="tabs.general.label" />
				</a>
			</li>
			<li>
				<a id="tourismFeaturesTranslationTab">
					<g:message locale="${lang}" code="tabs.translation.label" />
				</a>
			</li>
		</ul>
		<hr style="margin-top: 5px;" />
	</div>
	<div id="tourismFeaturesAddDiv" >
		<form id="tourismFeaturesAddForm" onsubmit="return false;">
			<input type="hidden" name="feature.id" id="tourismFeatureId"/>
			<div class="newline">
				<div class="features-large">
					<label for="tourismFeatureName"><g:message locale="${lang}" code="features.name.label"/>&nbsp;<sup>*</sup></label>
				</div>
				<div class="features-large">
					<label for="tourismFeatureValue" id="tourismFeatureValueLabel"><g:message locale="${lang}" code="features.value.label"/>&nbsp;</label>
				</div>
			</div>
			<div class="spacer-small"></div>				
			<div class="newline">
				<div class="features-large">
					<input id="tourismFeatureName" autofocus type="text" required name="feature.name"/>
				</div>
				<div class="features-large">
					<input type="text" id="tourismFeatureValue" name="feature.value"/>
				</div>
			</div>
			<div id="tourismFeaturesEditDiv">
				<div class="spacer"></div>
				<div class="newline">
					<div class="features-large">
						<label for="tourismFeatureExternalCode"><g:message locale="${lang}" code="features.externalCode.label"/>&nbsp;</label>
					</div>
					<div class="features-large">
						<label for="tourismFeatureUUID"><g:message locale="${lang}" code="features.uuid.label"/>&nbsp;</label>
					</div>
				</div>
				<div class="spacer-small"></div>				
				<div class="newline">
					<div class="features-large">
						<input type="text" id="tourismFeatureExternalCode" name="feature.externalCode"/>
					</div>
					<div class="features-large">
						<input type="text" id="tourismFeatureUUID" name="feature.uuid" disabled/>
					</div>
				</div>
			</div>
			<div class="spacer"></div>
			<div class="newline">
				<input type="checkbox" id="tourismFeatureHide"/>
				<label for="tourismFeatureHide"><g:message locale="${lang}" code="features.hide.label"/></label>
			</div>
			<div class="spacer"></div>
		</form>
	</div>
	<div id="tourismFeaturesTranslationDiv" >
		<div style="padding: 10px;">
			<a id="tourismFeaturesTranslationAddLink"><g:message locale="${lang}" code="translation.add.label" /></a>
		</div>
		<div id="tourismFeaturesTranslationGridDiv">
			<div id="tourismFeaturesTranslationGrid" style="height: 144px;"></div>
		</div>
	</div>
</div>