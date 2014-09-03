<style>
	#localTaxRateCreateDiv{
		font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
		font-size: 11px;
		color: #888;
		text-align: left;
		direction: ltr;
		height: 100px;
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
<div id="localTaxRateCreateDiv">
	<form id="localTaxRateForm" onsubmit="return false;">
		<input id="localTaxRateCompanyId" type="hidden"/>
		<input id="localTaxRateId" type="hidden"/>
		<div class="newline">
			<div class="taxRate-large">
				<label for="localTaxRateCountry"><g:message code="company.tax.country.label"></g:message>&nbsp;<sup>*</sup></label><br />
			</div>
			<div class="taxRate-large">
				<label for="localTaxRateRate"><g:message code="company.tax.taxRate.label"></g:message>&nbsp;<sup>*</sup></label><br />
			</div>
		</div>
		<div class="spacer-small"></div>
		<div class="newline">
			<div class="taxRate-large">
				<select id="localTaxRateCountry" multiple="multiple"></select>
			</div>
			<div class="taxRate-large">
				 <input type="text" id="localTaxRateRate" pattern="\d{0,6}\.?\d{0,2}"/>
			</div>
		</div>
		<div class="spacer"></div>
		<div class="taxRateDialog-small">
			<input type="checkbox" id="localTaxRateActive" value="true" checked="checked"/>&nbsp;
			<label for="localTaxRateActive"><g:message code="company.tax.active.label" /></label>
		</div>
		<div class="spacer"></div>
	</form>
</div>