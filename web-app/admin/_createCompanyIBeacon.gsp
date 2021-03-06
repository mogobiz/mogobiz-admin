<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<div id="companyIBeaconCreateDiv">
    <form id="companyIBeaconForm" onsubmit="return false;">
        <input id="companyIBeaconId" type="hidden"/>
        <div class="newline">
            <div class="companyIBeaconDialog-large">
                <label for="companyIBeaconUUID"><g:message locale="${lang}" code="company.iBeacon.uuid.label"></g:message>&nbsp;<sup>*</sup></label><br />
            </div>
            <div class="companyIBeaconDialog-large">
                <label for="companyIBeaconName"><g:message locale="${lang}" code="company.iBeacon.name.label"></g:message>&nbsp;<sup>*</sup></label><br />
            </div>
        </div>
        <div class="spacer-small"></div>
        <div class="newline">
            <div class="companyIBeaconDialog-large">
                <input type="text" id="companyIBeaconUUID" />
            </div>
            <div class="companyIBeaconDialog-large">
                <input type="text" id="companyIBeaconName"/>
            </div>
        </div>
        <div class="spacer"></div>
        <div class="newline">
            <div class="companyIBeaconDialog-large">
                <label for="companyIBeaconMinor"><g:message locale="${lang}" code="company.iBeacon.minor.label"></g:message>&nbsp;<sup>*</sup></label><br />
            </div>
            <div class="companyIBeaconDialog-large">
                <label for="companyIBeaconMajor"><g:message locale="${lang}" code="company.iBeacon.major.label"></g:message>&nbsp;<sup>*</sup></label><br />
            </div>
        </div>
        <div class="spacer-small"></div>
        <div class="newline">
            <div class="companyIBeaconDialog-large">
                <input type="text" id="companyIBeaconMinor" />
            </div>
            <div class="companyIBeaconDialog-large">
                <input type="text" id="companyIBeaconMajor"/>
            </div>
        </div>
        <div class="spacer"></div>
        <div class="newline">
            <div class="companyIBeaconDialog-large">
                <label for="companyIBeaconStartDate"><g:message locale="${lang}" code="company.iBeacon.startDate.label"></g:message></label><br />
            </div>
            <div class="companyIBeaconDialog-large">
                <label for="companyIBeaconEndDate"><g:message locale="${lang}" code="company.iBeacon.endDate.label"></g:message></label><br />
            </div>
        </div>
        <div class="spacer-small"></div>
        <div class="newline">
            <div class="companyIBeaconDialog-large">
                <input type="text" id="companyIBeaconStartDate" />
            </div>
            <div class="companyIBeaconDialog-large">
                <input type="text" id="companyIBeaconEndDate" />
            </div>
        </div>
        <div class="spacer"></div>
        <div>
            <input type="checkbox" id="companyIBeaconActive" value="true"/>&nbsp;
            <label for="companyIBeaconActive"><g:message locale="${lang}" code="company.iBeacon.active.label" /></label>
        </div>
        <div class="spacer"></div>
    </form>
</div>