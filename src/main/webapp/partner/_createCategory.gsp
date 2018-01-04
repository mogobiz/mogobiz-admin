<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<style>
#categoryCreateDiv{
	font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
	font-size: 11px;
	color: #888;
	text-align: left;
	direction: ltr;
}
#categoryCreateDialog {
	color: #888;
	text-align: left;
	direction: ltr;
	background:#F2F2F2;
	border:1px solid #CCCCCC;
	padding: 10px;
	margin: 5px 0px 0px 0px;
}

</style>
<div id="categoryCreateDiv">
	<form id="categoryCreateForm" onsubmit="return false;">
		<input id="createCategoryParent" type="hidden" name="category.parentId"/>
		<input type="hidden" name="category.position" value = "0"/>
		<div class="newline">
			<div class="category-general-large">
				<label for="createCategoryNameField"><g:message locale="${lang}" code="category.tabs.general.name.label"/>&nbsp;<sup>*</sup></label><br />
			</div>
		</div>
		<div class="spacer-small"></div>
		<div class="newline">
			<div class="category-general-full">
				<input id="createCategoryNameField" autofocus required placeholder="<g:message locale="${lang}" code="category.create.name.label"/>" type="text" name="category.name" class="textInput" /> <br />
			</div>
		</div>
		<div class="spacer"></div>
	</form>
</div>	