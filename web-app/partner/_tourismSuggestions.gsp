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
			<label for="tourismSuggestionsDiscount"><g:message code="tourismSuggestions.discount.label"/></label>
		</div>
	</div>
	<div class="spacer-small"></div>
	<div class="newline">
		<div>
			<input type="text" id="tourismSuggestionsDiscount" value="0" pattern="([+-])?(\d+)(\.\d+)?\%?" required></input>
		</div>
	</div>
</div>