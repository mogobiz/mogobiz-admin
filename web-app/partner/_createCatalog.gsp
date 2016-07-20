<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<style type="text/css">
	#catalogCreateDiv{
		font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
		font-size: 11px;
		color: #888;
		text-align: left;
		direction: ltr;
	}
	#catalogCreateDialog {
		color: #888;
		text-align: left;
		direction: ltr;
		background:#F2F2F2;
		border:1px solid #CCCCCC;
		padding: 10px;
		margin: 5px 0px 0px 0px;
	}
</style>
<div id="catalogCreateDiv" >
	<div class="newline">
		<div class="catalog-large">
			<label for="catalogCreateName"><g:message locale="${lang}" code="catalog.name.label"/>&nbsp;<sup>*</sup></label>
		</div>
		<div class="catalog-large">
			<label for="catalogCreateExternalCode"><g:message locale="${lang}" code="catalog.externalCode.label"/></label>
		</div>
	</div>
	<div class="spacer-small"></div>
	<div class="newline">
		<div class="catalog-large">
			<input id="catalogCreateName" autofocus type="text" required name="catalog.name"/>
		</div>
		<div class="catalog-large">
			<input id="catalogCreateExternalCode" type="text" name="catalog.externalCode"/>
		</div>
	</div>
	<div class="spacer"></div>
	<div class="newline">
		<div class="catalog-large">
			<label for="catalogCreateActivationDate"><g:message locale="${lang}" code="catalog.activationDate.label"/>&nbsp;<sup>*</sup></label>
		</div>
		<div class="catalog-large">
			<label for="catalogCreateMiraklEnv"><g:message locale="${lang}" code="catalog.miraklEnv.label"/></label>
		</div>
		%{--<div class="catalog-large">--}%
			%{--<label for="catalogCreateChannels"><g:message locale="${lang}" code="catalog.channels.label"/></label>--}%
		%{--</div>--}%
	</div>
	<div class="spacer-small"></div>
	<div class="newline">
		<div class="catalog-large">
			<input id="catalogCreateActivationDate" type="text" required name="catalog.activationDate"/>
		</div>
        <div class="catalog-large">
            <select id="catalogCreateMiraklEnv"  multiple="multiple" name="catalog.mirakelEnv"></select>
        </div>
		%{--<div class="catalog-large">--}%
			%{--<select id="catalogCreateChannels"  multiple="multiple" name="catalog.channels">--}%
				%{--<option value="web">Web</option>--}%
				%{--<option value="mobile">Mobile</option>--}%
				%{--<option value="tablet">Tablet</option>--}%
			%{--</select>--}%
		%{--</div>--}%
	</div>
	<div class="spacer"></div>
	<div class="newline">
		<div class="catalog-full">
			<label for="catalogCreateDescription"><g:message locale="${lang}" code="catalog.description.label" /></label>
		</div>
	</div>
	<div class="spacer-small"></div>
	<div class="newline">
		<div class="catalog-full">
			<textarea id="catalogCreateDescription" name="catalog.description" rows="5"></textarea>
		</div>
	</div>
	%{--<div class="spacer"></div>
	<div class="newline">
		<input type="checkbox" id="catalogCreateSocial" />
		<label for="catalogCreateSocial"><g:message locale="${lang}" code="catalog.social.label"/></label>
	</div>--}%
	<div class="spacer"></div>
</div>