<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>

<div id="userProfileForm">
    <div class="newline">
        <div class="userProfile-large">
            <label for="userProfileFirstName"><g:message code="company.sellers.firstName.label" /></label>
        </div>
    </div>
    <div class="spacer-small"></div>
    <div class="newline">
        <div class="userProfile-large">
            <input type="text" readonly="readonly" id="userProfileFirstName"/>
        </div>
    </div>
    <div class="spacer"></div>
    <div class="newline">
        <div class="large">
            <label for="userProfileLastName"><g:message code="company.sellers.lastName.label" /></label>
        </div>
    </div>
    <div class="spacer-small"></div>
    <div class="newline">
        <div class="userProfile-large">
            <input type="text" readonly="readonly" id="userProfileLastName"/>
        </div>
    </div>
    <div class="spacer"></div>
    <div class="newline">
        <div class="userProfile-large">
            <label for="userProfileEmail"><g:message code="company.sellers.email.label" /></label>
        </div>
    </div>
    <div class="spacer-small"></div>
    <div class="newline">
        <div class="userProfile-large">
            <input type="text" readonly="readonly" id="userProfileEmail"/>
        </div>
    </div>
    <div class="spacer"></div>
    <div class="newline">
        <div class="userProfile-large">
            <label for="userProfileCompanies"><g:message code="company.sellers.companies.label" /></label>
        </div>
    </div>
    <div class="spacer-small"></div>
    <div class="newline">
        <div class="userProfile-large">
            <input type="text" readonly="readonly" id="userProfileCompanies"/>
        </div>
    </div>
    <div class="spacer"></div>
    <div class="newline">
        <div class="userProfile-large">
            <label for="userProfileProfiles"><g:message code="company.sellers.profiles.label" /></label>
        </div>
    </div>
    <div class="spacer-small"></div>
    <div class="newline">
        <div class="userProfile-large">
            <input type="text" readonly="readonly" id="userProfileProfiles"/>
        </div>
    </div>
    <div class="spacer"></div>
    <div class="spacer"></div>
    <div align="right" class="fk_button_area">
        <button type="reset" id="userProfileCloseBtn" class="fk_ok_btn"><g:message locale="${lang}" code="default.button.close.label" /></button>
        <button type="reset" id="userProfileChangePassBtn" class="fk_ok_btn"><g:message locale="${lang}" code="default.button.changePassword.label" /></button>
    </div>
</div>