<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<style>
#profileChangePassword{
    font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
    font-size: 11px;
    color: #888;
    text-align: left;
    direction: ltr;
}
#userChangePasswordDialog {
    color: #888;
    text-align: left;
    direction: ltr;
    background:#F2F2F2;
    border:1px solid #CCCCCC;
    padding: 10px;
    margin: 5px 0px 0px 0px;
}

</style>

<div id="profileChangePassword">
    <div class="newline">
        <div class="userProfile-large">
            <label for="profileCurrentPassword"><g:message locale="${lang}" code="company.sellers.oldPassword.label" />&nbsp;<sup>*</sup></label>
        </div>
    </div>
    <div class="spacer-small"></div>
    <div class="newline">
        <div class="userProfile-large">
            <input type="password" id="profileCurrentPassword" required="required"/>
        </div>
    </div>
    <div class="spacer"></div>
    <div class="newline">
        <div class="large">
            <label for="profileNewPassword"><g:message locale="${lang}" code="company.sellers.newPassword.label" />&nbsp;<sup>*</sup></label>
        </div>
    </div>
    <div class="spacer-small"></div>
    <div class="newline">
        <div class="userProfile-large">
            <input type="password" id="profileNewPassword" required="required"/>
        </div>
    </div>
    <div class="spacer"></div>
    <div class="newline">
        <div class="userProfile-large">
            <label for="profileConfirmPassword"><g:message locale="${lang}" code="company.sellers.confirmPassword.label" />&nbsp;<sup>*</sup></label>
        </div>
    </div>
    <div class="spacer-small"></div>
    <div class="newline">
        <div class="userProfile-large">
            <input type="password" id="profileConfirmPassword" required="required"/>
        </div>
    </div>
    <div class="spacer"></div>
    <div class="newline">
        <input type="checkbox" id="profilePasswordShowChars" />
        <label for="profilePasswordShowChars"><g:message locale="${lang}" code="company.sellers.showPasswordChars.label"/></label>
    </div>
</div>