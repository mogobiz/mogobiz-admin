<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<div id="companyProfilesApplyDiv">
    <div class="newline">
        <div class="companyProfilesDialog-full">
            <label for="companyProfilesApplyName"><g:message locale="${lang}" code="company.profiles.name.label"></g:message>&nbsp;<sup>*</sup></label>
        </div>
        <div class="spacer-small"></div>
        <div class="companyProfilesDialog-full">
            <input type="text" id="companyProfilesApplyName" />
        </div>
    </div>
    <div class="spacer"></div>
    <div class="newline">
        <div class="companyProfilesDialog-full">
            <label for="companyProfilesApplySystemProfile"><g:message locale="${lang}" code="company.profiles.systemProfile.label"></g:message>&nbsp;<sup>*</sup></label>
        </div>
        <div class="spacer-small"></div>
        <div class="companyProfilesDialog-full">
            <select id="companyProfilesApplySystemProfile" name="companyProfilesApplySystemProfile" multiple="multiple"></select>
        </div>
    </div>
    <div class="spacer"></div>
</div>