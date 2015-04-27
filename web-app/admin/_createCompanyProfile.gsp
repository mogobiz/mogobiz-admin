<div id="companyProfilesCreateDiv">
    <input type="hidden" id="companyProfilesId" />
    <div class="newline">
        <div class="companyProfilesDialog-full">
            <label for="companyProfilesName"><g:message code="company.profiles.name.label"></g:message>&nbsp;<sup>*</sup></label>
        </div>
        <div class="spacer-small"></div>
        <div class="companyProfilesDialog-full">
            <input type="text" id="companyProfilesName" />
        </div>
    </div>
    <div id="companyProfilesCopyCheckDiv" class="newline">
        <div class="spacer"></div>
        <label for="companyProfilesCopyCheck"><g:message code="company.profiles.copy.label"/></label>
        <input type="checkbox" id="companyProfilesCopyCheck"/>
    </div>
    <div class="spacer"></div>
    <div id="companyProfilesPermissionsDiv" class="newline multiselectSlides">
        <label><g:message code="company.profiles.permissions.label"/>&nbsp;<sup>*</sup></label>
        <div class="spacer-small"></div>
        <div class="left">
            <select name="from" id="companyProfilesPermissions" size="14" multiple="multiple">
                <option value="updateCompany">Update company</option>
                <option value="updateProfiles">Update profiles</option>
                <option value="updateUsers">Update users</option>
                <option value="updateShipping">Update shipping</option>
                <option value="updateTaxes">Update taxes</option>
                <option value="updatePayment">Update payment</option>
                <option value="updateBrands">Update brands</option>
                <option value="updateCoupons">Update coupons</option>
                <option value="updateKeys">Update api keys</option>
                <option value="updateBeacons">Update beacons</option>
                <option value="updateTags">Update tags</option>
                <option value="updateNetworks">Update social networks</option>
                <option value="showBo">Access back office</option>
                <option value="updateBoOperations">Return product / refund customer</option>
                <option value="createCatalogs">Create catalogs</option>
                <option value="deleteCatalogs">Delete catalogs</option>
                <option value="importCatalogs">Import catalogs</option>
                <option value="exportCatalogs">Export catalogs</option>
            </select>
        </div>
        <div class="center">
            <button type="button" id="companyProfilesPermissions_right_All"><i class="icon icon-forward-all"></i></button>
            <button type="button" id="companyProfilesPermissions_right_Selected"><i class="icon icon-forward"></i></button>
            <button type="button" id="companyProfilesPermissions_left_Selected"><i class="icon icon-backward"></i></button>
            <button type="button" id="companyProfilesPermissions_left_All"><i class="icon icon-backward-all"></i></button>
        </div>
        <div class="right">
            <select name="to" id="companyProfilesPermissions_to" size="14" multiple="multiple"></select>
        </div>
    </div>
    <div id="companyProfilesCopyDiv" class="newline">
        <div class="newline">
            <div class="companyProfilesDialog-full">
                <label for="companyProfilesAddCopy"><g:message code="company.profiles.parent.label"></g:message>&nbsp;<sup>*</sup></label>
            </div>
            <div class="spacer-small"></div>
            <div class="companyProfilesDialog-full">
                <select id="companyProfilesAddCopy"></select>
            </div>
        </div>
    </div>
    <div class="spacer"></div>
</div>