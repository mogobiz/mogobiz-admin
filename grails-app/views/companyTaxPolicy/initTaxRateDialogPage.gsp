<%@ page contentType="text/html; charset=UTF-8" %>

<div id="taxRateDialog">
  <form id="formTaxRate" name="formTaxRate" onsubmit="return false;">
    <div class="errors"></div>
    <div id="taxRateContent">
      <div class="newline">
        <div class="taxRateDialog-large">
    	  <label for="taxRateCountryCombo"><g:message code="company.tax.country.label" />&nbsp;<sup>*</sup></label><br />
    	</div>
    	<div class="taxRateDialog-large taxRateStateDiv">
    	  <label for="taxRateStateCombo" id="taxRateStateComboLabel"><g:message code="company.tax.state.label" />&nbsp;<sup>*</sup></label><br />
        </div>
        <div class="taxRateDialog-medium">
          <label for="taxRateValue"><g:message code="company.tax.taxRate.label" />&nbsp;<sup>*</sup></label><br />
        </div>
        <div class="taxRateDialog-small"></div>
      </div>
      <div class="spacer-small"></div>
      <div class="newline">
        <div class="taxRateDialog-large">
          <select name="taxRate.country.id" id="taxRateCountryCombo" multiple="multiple"></select>
        </div>
        <div class="taxRateDialog-large taxRateStateDiv">
        <select name="taxRate.state" id="taxRateStateCombo" multiple="multiple">
		  <option value="Alabama">Alabama</option>
		  <option value="Alaska">Alaska</option>
		  <option value="Arizona">Arizona</option>
		  <option value="Arkansas">Arkansas</option>
		  <option value="California">California</option>
		  <option value="Colorado">Colorado</option>
		  <option value="Connecticut">Connecticut</option>
		  <option value="Delaware">Delaware</option>
		  <option value="District Of Columbia">District Of Columbia</option>
		  <option value="Florida">Florida</option>
		  <option value="Georgia">Georgia</option>
		  <option value="Hawaii">Hawaii</option>
		  <option value="Idaho">Idaho</option>
		  <option value="IL">Illinois</option>
		  <option value="Illinois">Indiana</option>
		  <option value="Iowa">Iowa</option>
		  <option value="Kansas">Kansas</option>
		  <option value="Kentucky">Kentucky</option>
		  <option value="Louisiana">Louisiana</option>
		  <option value="Maine">Maine</option>
		  <option value="Maryland">Maryland</option>
		  <option value="Massachusetts">Massachusetts</option>
		  <option value="Michigan">Michigan</option>
		  <option value="Minnesota">Minnesota</option>
		  <option value="Mississippi">Mississippi</option>
		  <option value="Missouri">Missouri</option>
		  <option value="Montana">Montana</option>
		  <option value="Nebraska">Nebraska</option>
		  <option value="Nevada">Nevada</option>
		  <option value="New Hampshire">New Hampshire</option>
		  <option value="New Jersey">New Jersey</option>
		  <option value="New Mexico">New Mexico</option>
		  <option value="New York">New York</option>
		  <option value="North Carolina">North Carolina</option>
		  <option value="North Dakota">North Dakota</option>
		  <option value="Ohio">Ohio</option>
		  <option value="Oklahoma">Oklahoma</option>
		  <option value="Oregon">Oregon</option>
		  <option value="Pennsylvania">Pennsylvania</option>
		  <option value="Rhode Island">Rhode Island</option>
		  <option value="South Carolina">South Carolina</option>
		  <option value="South Dakota">South Dakota</option>
		  <option value="Tennessee">Tennessee</option>
		  <option value="Texas">Texas</option>
		  <option value="Utah">Utah</option>
		  <option value="Vermont">Vermont</option>
		  <option value="Virginia">Virginia</option>
		  <option value="Washington">Washington</option>
		  <option value="West Virginia">West Virginia</option>
		  <option value="Wisconsin">Wisconsin</option>
		  <option value="Wyoming">Wyoming</option>
		  <option value="Puerto Rico">Puerto Rico</option>
		  <option value="Virgin Islands">Virgin Islands</option>
		  <option value="Northern Mariana Islands">Northern Mariana Islands</option>
		  <option value="Guam">Guam</option>
		  <option value="American Samoa">American Samoa</option>
		  <option value="Palau">Palau</option>
		  <option value="Armed Forces (AA)">Armed Forces (AA)</option>
		  <option value="Armed Forces (AE)">Armed Forces (AE)</option>
		  <option value="Armed Forces (AP)">Armed Forces (AP)</option>
		</select>
		</div>
		<div class="taxRateDialog-medium">
		  <input type="text" name="taxRate.rate" id="taxRateValue" pattern="\d{0,6}\.?\d{0,2}"/>
		</div>
		<div class="taxRateDialog-small">
		  <input type="checkbox" name="taxRate.active" id="taxRateCheckbox" value="true" checked="checked"/>&nbsp;
		  <label for="taxRateCheckbox"><g:message code="company.tax.active.label" /></label>
		</div>
	  </div>
	  <div class="spacer"></div>
    </div>
  </form>
</div>