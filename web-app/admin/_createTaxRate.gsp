<style>
	#taxRateCreateDiv{
		font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
		font-size: 11px;
		color: #888;
		text-align: left;
		direction: ltr;
	}
	#taxRateDialog {
		color: #888;
		text-align: left;
		direction: ltr;
		background:#F2F2F2;
		border:1px solid #CCCCCC;
		padding: 10px;
		margin: 5px 0px 0px 0px;
	}
</style>
<div id="taxRateCreateDiv">
	<form id="taxRateCreateForm" onsubmit="return false;">
		<input id="taxRateCompanyId" type="hidden"/>
		<input id="taxRateId" type="hidden"/>
		<div class="newline">
			<div class="taxRate-large">
				<label for="taxRateName"><g:message code="company.tax.name.label"></g:message>&nbsp;<sup>*</sup></label><br />
			</div>
		</div>
		<div class="spacer-small"></div>
		<div class="newline">
			<div class="taxRate-large">
				<input id="taxRateName" autofocus required placeholder="<g:message code="company.tax.name.label"></g:message>" type="text" class="textInput" />
			</div>
		</div>
		<div class="spacer"></div>
	</form>
</div>	