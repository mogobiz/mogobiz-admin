<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<style>
#tourismSuggestionsAddForm {
	font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
	font-size: 11px;
	color: #888;
	text-align: left;
	direction: ltr;
}
#tourismSuggestionsDialog {
	color: #888;
	text-align: left;
	direction: ltr;
	background:#F2F2F2;
	border:1px solid #CCCCCC;
	padding: 10px;
	margin: 5px 0px 0px 0px;
}
</style>

<div id="tourismSuggestionsAddForm">
	<div class="newline">
		<div class="suggestions-medium">
			<label for="tourismSuggestionsDiscount"><g:message locale="${lang}" code="tourismSuggestions.discount.label"/></label>
		</div>
	</div>
	<div class="spacer-small"></div>
	<div class="newline">
		<div>
			<input type="text" id="tourismSuggestionsDiscount" value="0" pattern="((\-|\+)?[0-9](\d+)?(\.\d+)?)|(([1-9]\d?(\.(\d+)?[1-9])?|0\.(\d+)?[1-9]|100)%)" required />
		</div>
	</div>
</div>