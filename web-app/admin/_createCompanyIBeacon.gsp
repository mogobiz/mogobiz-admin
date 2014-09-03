<div id="companyIBeaconCreateDiv">
    <form id="companyIBeaconForm" onsubmit="return false;">
        <input id="companyIBeaconId" type="hidden"/>
        <div class="newline">
            <div class="companyIBeaconDialog-large">
                <label for="companyIBeaconUUID"><g:message code="company.iBeacon.uuid.label"></g:message>&nbsp;<sup>*</sup></label><br />
            </div>
            <div class="companyIBeaconDialog-large">
                <label for="companyIBeaconName"><g:message code="company.iBeacon.name.label"></g:message>&nbsp;<sup>*</sup></label><br />
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
        <div class="spacer"></div><div class="newline">
        <div class="companyIBeaconDialog-large">
            <label for="companyIBeaconStartDate"><g:message code="company.iBeacon.startDate.label"></g:message></label><br />
        </div>
        <div class="companyIBeaconDialog-large">
            <label for="companyIBeaconEndDate"><g:message code="company.iBeacon.endDate.label"></g:message></label><br />
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
            <label for="companyIBeaconActive"><g:message code="company.iBeacon.active.label" /></label>
        </div>
        <div class="spacer"></div>
    </form>
</div>