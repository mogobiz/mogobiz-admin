<style>
#createCompanyDialog {
	overflow: visible;
	font-family: "lucida grande";
	font-size: 11px;
	color: #888;
	text-align: left;
	direction: ltr;
	background:#F2F2F2;
	border:1px solid #CCCCCC;
	padding: 10px;
	margin: 5px 0px 0px 0px;
	height: 100px !important;
}

</style>
<form id="companyAddForm" onsubmit="return false;">
	<div class="newline">
		<div class="createCompany">
			<label for="createCompanyName"><g:message code="company.general.storeName.label" />&nbsp;<sup>*</sup></label>
		</div>
		<div class="createCompany">
			<label for="createCompanyCode"><g:message code="company.general.storeCode.label" />&nbsp;<sup>*</sup></label>
		</div>
	</div>
	<div class="spacer-small"></div>
	<div class="newline">
		<div class="createCompany">
			<input type="text" name="company.name" id="createCompanyName" required pattern="[a-zA-Z0-9- ]+"/>
		</div>
		<div class="createCompany">
			<input type="text" name="company.code" id="createCompanyCode" required pattern="[a-zA-Z0-9]+"/>
		</div>
	</div>
	<div class="spacer"></div>
	<div class="newline">
		<div class="createCompany">
			<label for="createCompanyEmail"><g:message code="company.general.email.label" />&nbsp;<sup>*</sup></label>
		</div>
		<div class="createCompany">
			<label for="createCompanyCountry"><g:message code="company.general.country.label" />&nbsp;<sup>*</sup></label>
		</div>
	</div>
	<div class="spacer-small"></div>
	<div class="newline">
		<div class="createCompany">
			<input type="email" name="company.email" id="createCompanyEmail" pattern="[a-zA-Z0-9._-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}" required/>
		</div>
		<div class="createCompany">
			<select name="company.location.countryCode" id="createCompanyCountry" multiple="multiple"></select>
		</div>
	</div>
</form>