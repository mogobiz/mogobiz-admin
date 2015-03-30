<style type="text/css">
	#categoryVariationsCreateDiv, #categoryVariationsTranslationDiv, #categoryVariationsResourcesDiv{
		font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
		font-size: 11px;
		color: #888;
		text-align: left;
		direction: ltr;
		width: 500px;
	}
	#categoryVariationsDialog/*, #categoryVariationsResourcesDialog */{
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
					<g:message code="tabs.general.label" />
				</a>
			</li>
            <!--<li>
                <a id="categoryVariationsResourcesTab">
                    <g:message code="tabs.resource.label" />
                </a>
            </li>-->
			<li>
				<a id="categoryVariationsTranslationTab">
					<g:message code="tabs.translation.label" />
				</a>
			</li>
		</ul>
		<hr style="margin-top: 5px;" />
	</div>
	<div id="categoryVariationsCreateDiv" >
		<form id="categoryVariationsEditForm" onsubmit="return false;">
			<div class="newline">
				<div class="variations-large">
					<label for="categoryVariationName"><g:message code="category.variations.name.label"/>&nbsp;<sup>*</sup></label>
				</div>
				<div class="variations-large">
					<label for="categoryVariationExternalCode"><g:message code="category.variations.externalCode.label"/></label>
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
					<label for="categoryVariationValues"><g:message code="category.variations.values.label"/></label>
				</div>
			</div>
			<div class="spacer-small"></div>
			<div class="newLine">
				<div class="variations-full">
					<input id="categoryVariationValues" autofocus type="text" name="variation.values" placeholder="<g:message code="category.variations.values.placeholder"/>"/>
				</div>
			</div>
			<div id="categoryVariationsEditDiv">
				<div class="spacer"></div>
				<div class="newline">
					<div class="variations-large">
						<label for="categoryVariationUUID"><g:message code="category.variations.uuid.label"/>&nbsp;</label>
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
				<label for="categoryVariationHide"><g:message code="category.variations.hide.label"/></label>
			</div>
			<div class="spacer"></div>
		</form>
	</div>
    <!--<div id="categoryVariationsResourcesDiv" >
        <div class="spacer"></div>
        <div class="newline">
            <div class="variations-full" id="categoryVariationsResources">
                <div class="flavor_2" id="categoryVariationsResourcesCaroussel"></div>
            </div>
        </div>
        <div class="spacer"></div>
        <div class="newLine">
            <div class="variations-full">
                <form id="categoryVariationResourceForm" onsubmit="return false;" method="POST" enctype="multipart/form-data">
                    <input id="categoryVariationId" type="hidden" name="id"/>
                    <input id="categoryVariationResource" type="file" name="file"/>
                </form>
            </div>
        </div>
        <div class="spacer"></div>
    </div>-->
	<div id="categoryVariationsTranslationDiv" >
		<div style="padding: 10px;">
			<a id="categoryVariationsTranslationAddLink"><g:message code="translation.add.label" /></a>
		</div>
		<div id="categoryVariationsTranslationGridDiv">
			<div id="categoryVariationsTranslationGrid" style="height: 144px;"></div>
		</div>
	</div>
    <iframe id="categoryVariationsHiddenFrame" name="categoryVariationsHiddenFrame" style="display: none"></iframe>
</div>