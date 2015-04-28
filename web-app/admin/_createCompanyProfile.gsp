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
            <select name="from" id="companyProfilesPermissions" size="14" multiple="multiple"></select>
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