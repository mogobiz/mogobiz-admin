<style type="text/css">
	#translationCreateDiv{
		font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
		font-size: 11px;
		color: #888;
		text-align: left;
		direction: ltr;
	}
	#translationDialog {
		color: #888;
		text-align: left;
		direction: ltr;
		background:#F2F2F2;
		border:1px solid #CCCCCC;
		padding: 10px;
		margin: 5px 0px 0px 0px;
	}
</style>

<div id="translationCreateDiv" >
	<form id="translationCreateForm" onsubmit="return false;">
		<input type="hidden" id="translationCreateTarget"/>
		<div class="newline">
			<label for="translationLanguageSelect"><g:message code="translation.language.label"/></label>
			<select multiple="multiple" id="translationLanguageSelect"></select>
		</div>
		<div class="spacer"></div>
	</form>
</div>