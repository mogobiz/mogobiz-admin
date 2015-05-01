<%@ page contentType="text/html; charset=UTF-8" %>

<div id="sellerDialog">
    <form id="formSeller" name="formSeller" onsubmit="return false;">
        <div id="sellerContent">
            <div class="newline">
                <div class="sellerDialog-medium">
                    <label for="sellerFirstName"><g:message code="company.sellers.firstName.label" />&nbsp;<sup>*</sup></label>
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="sellerDialog-medium">
                    <input type="text" id="sellerFirstName"/>
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <div class="sellerDialog-medium">
                    <label for="sellerLastName"><g:message code="company.sellers.lastName.label" />&nbsp;<sup>*</sup></label>
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="sellerDialog-medium">
                    <input type="text" id="sellerLastName"/>
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <div class="sellerDialog-medium">
                    <label for="sellerEmail"><g:message code="company.sellers.email.label" />&nbsp;<sup>*</sup></label>
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="sellerDialog-medium">
                    <input type="email" id="sellerEmail" pattern="[a-zA-Z0-9._-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}"/>
                </div>
            </div>
            <div id="sellerConfirmEmailDiv">
                <div class="spacer"></div>
                <div class="newline">
                    <div class="sellerDialog-medium">
                        <label for="sellerConfirmEmail" id="sellerConfirmEmailLabel" ><g:message code="company.sellers.confirmEmail.label" />&nbsp;<sup>*</sup></label>
                    </div>
                </div>
                <div class="spacer-small"></div>
                <div class="newline">
                    <div class="sellerDialog-medium">
                        <input type="email" id="sellerConfirmEmail" pattern="[a-zA-Z0-9._-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}"/>
                    </div>
                </div>
            </div>
            <div id="sellerCompaniesDiv">
                <div class="spacer"></div>
                <div class="newline">
                    <div class="sellerDialog-medium">
                        <label for="sellerCompanies"><g:message code="company.sellers.companies.label" /></label>
                    </div>
                </div>
                <div class="spacer-small"></div>
                <div class="newline">
                    <div class="sellerDialog-medium">
                        <select id="sellerCompanies" multiple="multiple"/>
                    </div>
                </div>
            </div>
            <div id="sellerProfilesDiv">
                <div class="spacer"></div>
                <div class="newline">
                    <div class="sellerDialog-medium">
                        <label for="sellerProfiles"><g:message code="company.sellers.profiles.label" /></label>
                    </div>
                </div>
                <div class="spacer-small"></div>
                <div class="newline">
                    <div class="sellerDialog-medium">
                        <select id="sellerProfiles" multiple="multiple"/>
                    </div>
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <div class="sellerDialog-medium">
                    <input type="checkbox" id="sellerActive" value="true" />
                    <label for="sellerActive"><g:message code="company.sellers.isActive.label" /></label>
                </div>
            </div>
            <div class="spacer"></div>
        </div>
    </form>
</div>