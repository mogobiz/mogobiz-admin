<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<%@ page import="com.mogobiz.utils.PermissionType"%>
<div id="companyMiraklTabs">
    <div id="ulTabs">
        <ul class="tabs">
            <li>
                <a id="companyMiraklGeneralTab">
                    <g:message locale="${lang}" code="tabs.general.label" />
                </a>
            </li>
            <li>
                <a id="companyMiraklOperatorTab">
                    <g:message locale="${lang}" code="tabs.operator.label" />
                </a>
            </li>
<store:hasPermission permission="${PermissionType.ADMIN_STORE_USERS.key}">
            <li id="companyMiraklSecurityLi">
                <a id="companyMiraklSecurityTab">
                    <g:message locale="${lang}" code="tabs.security.label" />
                </a>
            </li>
</store:hasPermission>
        </ul>
        <hr style="margin-top: -1px;"/>
    </div>
    <div id="companyMiraklCreateDiv" style="padding-top: 7px;">
        <form id="companyMiraklForm" onsubmit="return false;">
            <input id="companyMiraklId" type="hidden"/>
            <div class="newline">
                <div class="companyMiraklDialog-large">
                    <label for="companyMiraklName"><g:message locale="${lang}" code="company.mirakl.name.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
                <div class="companyMiraklDialog-large">
                    <label for="companyMiraklUrl"><g:message locale="${lang}" code="company.mirakl.url.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="companyMiraklDialog-large">
                    <input type="text" id="companyMiraklName" />
                </div>
                <div class="companyMiraklDialog-large">
                    <input type="text" id="companyMiraklUrl" pattern="https?://.+"/>
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <div class="companyMiraklDialog-large">
                    <label for="companyMiraklFrontKey"><g:message locale="${lang}" code="company.mirakl.apiKey.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
                <div class="companyMiraklDialog-large">
                    <label for="companyMiraklApiKey"><g:message locale="${lang}" code="company.mirakl.shopId.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="companyMiraklDialog-large">
                    <input type="text" id="companyMiraklApiKey" />
                </div>
                <div class="companyMiraklDialog-large">
                    <input type="text" id="companyMiraklShopId" />
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <input type="checkbox" id="companyMiraklActive"/>&nbsp;
                <label for="companyMiraklActive"><g:message locale="${lang}" code="company.mirakl.active.label" /></label>&nbsp;&nbsp;
                <input type="checkbox" id="companyMiraklManual"/>&nbsp;
                <label for="companyMiraklManual"><g:message locale="${lang}" code="company.mirakl.manual.label" /></label>&nbsp;&nbsp;
                <input type="checkbox" id="companyMiraklOperator"/>&nbsp;
                <label for="companyMiraklOperator"><g:message locale="${lang}" code="company.mirakl.operator.label" /></label>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <div id="companyMiraklCron">
                    <ul class="cronTabs">
                        <li>
                            <a href="javascript:void(0)" id="companyMiraklCronMinutesTab" name="minutes"><g:message locale="${lang}" code="cron.expression.tabs.minutes"/></a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" id="companyMiraklCronHourlyTab" name="hourly"><g:message locale="${lang}" code="cron.expression.tabs.hourly"/></a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" id="companyMiraklCronDailyTab" name="daily"><g:message locale="${lang}" code="cron.expression.tabs.daily"/></a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" id="companyMiraklCronWeeklyTab" name="weekly"><g:message locale="${lang}" code="cron.expression.tabs.weekly"/></a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" id="companyMiraklCronMonthlyTab" name="monthly"><g:message locale="${lang}" code="cron.expression.tabs.monthly"/></a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" id="companyMiraklCronYearlyTab" name="yearly"><g:message locale="${lang}" code="cron.expression.tabs.yearly"/></a>
                        </li>
                    </ul>
                    <div id="companyMiraklCronMinutesDiv" class="cronForm">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <g:message locale="${lang}" code="cron.expression.label.every"/>&nbsp;<sup>*</sup>&nbsp;<input type="text" value="1" id="companyMiraklCronMinutesVal" pattern="[1-9]{1}([0-9]+)?"/>&nbsp;<g:message locale="${lang}" code="cron.expression.label.minutes"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="companyMiraklCronHourlyDiv" class="cronForm">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="radio" id="companyMiraklCronHourlyRepeat" name="companyMiraklCronHourlyRadio" value="repeat" checked="checked"/>
                                    </td>
                                    <td>
                                        <g:message locale="${lang}" code="cron.expression.label.every"/>&nbsp;<sup>*</sup>&nbsp;<input type="text" value="1" id="companyMiraklCronHourlyVal" pattern="[1-9]{1}([0-9]+)?"/>&nbsp;<g:message locale="${lang}" code="cron.expression.label.hours"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="radio" id="companyMiraklCronHourlyOnce" name="companyMiraklCronHourlyRadio" value="once"/>
                                    </td>
                                    <td>
                                        <g:message locale="${lang}" code="cron.expression.label.at"/>&nbsp;
                                        <select id="companyMiraklCronHourlyHour" disabled="disabled"></select>
                                        <select id="companyMiraklCronHourlyMinutes" disabled="disabled"></select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="companyMiraklCronDailyDiv" class="cronForm">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="radio" id="companyMiraklCronDailyRepeat" name="companyMiraklCronDailyRadio" value="repeat" checked="checked"/>
                                    </td>
                                    <td>
                                        <g:message locale="${lang}" code="cron.expression.label.every"/>&nbsp;<sup>*</sup>&nbsp;<input type="text" value="1" id="companyMiraklCronDailyVal" pattern="[1-9]{1}([0-9]+)?"/>&nbsp;<g:message locale="${lang}" code="cron.expression.label.days"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="radio" id="companyMiraklCronDailyOnce" name="companyMiraklCronDailyRadio" value="once"/>
                                    </td>
                                    <td><g:message locale="${lang}" code="cron.expression.label.everyWeekDay"/></td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <g:message locale="${lang}" code="cron.expression.label.startTime"/>&nbsp;
                                        <select id="companyMiraklCronDailyHour"></select>
                                        <select id="companyMiraklCronDailyMinutes"></select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="companyMiraklCronWeeklyDiv" class="cronForm">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <table><tbody><tr><td><input type="checkbox" id="companyMiraklCronWeeklyMON" value="MON"></td><td><g:message locale="${lang}" code="cron.expression.label.monday"/></td></tr></tbody></table>
                                </td>
                                <td>
                                    <table><tbody><tr><td><input type="checkbox" id="companyMiraklCronWeeklyTUE" value="TUE"></td><td><g:message locale="${lang}" code="cron.expression.label.tuesday"/></td></tr></tbody></table>
                                </td>
                                <td>
                                    <table><tbody><tr><td><input type="checkbox" id="companyMiraklCronWeeklyWED" value="WED"></td><td><g:message locale="${lang}" code="cron.expression.label.wednesday"/></td></tr></tbody></table>
                                </td>
                                <td>
                                    <table><tbody><tr><td><input type="checkbox" id="companyMiraklCronWeeklyTHU" value="THU"></td><td><g:message locale="${lang}" code="cron.expression.label.thursday"/></td></tr></tbody></table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table><tbody><tr><td><input type="checkbox" id="companyMiraklCronWeeklyFRI" value="FRI"></td><td><g:message locale="${lang}" code="cron.expression.label.friday"/></td></tr></tbody></table>
                                </td>
                                <td>
                                    <table><tbody><tr><td><input type="checkbox" id="companyMiraklCronWeeklySAT" value="SAT"></td><td><g:message locale="${lang}" code="cron.expression.label.saturday"/></td></tr></tbody></table>
                                </td>
                                <td>
                                    <table><tbody><tr><td><input type="checkbox" id="companyMiraklCronWeeklySUN" value="SUN"></td><td><g:message locale="${lang}" code="cron.expression.label.sunday"/></td></tr></tbody></table>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <g:message locale="${lang}" code="cron.expression.label.startTime"/>&nbsp;
                                    <select id="companyMiraklCronWeeklyHour"></select>
                                    <select id="companyMiraklCronWeeklyMinutes"></select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="companyMiraklCronMonthlyDiv" class="cronForm">
                        <table>
                            <tbody>
                                <tr>
                                    <td><input type="radio" id="companyMiraklCronMonthlyRepeat" name="companyMiraklCronMonthlyRadio" value="repeat" checked="checked"/></td>
                                    <td>
                                        <g:message locale="${lang}" code="cron.expression.label.day"/>&nbsp;<sup>*</sup>&nbsp;<input type="text" value="1" id="companyMiraklCronMonthlyRepeatDay" pattern="[1-9]{1}([0-9]+)?">&nbsp;<g:message locale="${lang}" code="cron.expression.label.ofEvery"/>&nbsp;<sup>*</sup>&nbsp;<input type="text" value="1" id="companyMiraklCronMonthlyRepeatMonths" pattern="[1-9]{1}([0-9]+)?">&nbsp;<g:message locale="${lang}" code="cron.expression.label.months"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input type="radio" id="companyMiraklCronMonthlyOnce" name="companyMiraklCronMonthlyRadio" value="repeat"/></td>
                                    <td>
                                        <g:message locale="${lang}" code="cron.expression.label.the"/>&nbsp;
                                        <select id="companyMiraklCronMonthlyOnceRank" disabled="disabled">
                                            <option selected="selected" value="1"><g:message locale="${lang}" code="cron.expression.label.first"/></option>
                                            <option value="2"><g:message locale="${lang}" code="cron.expression.label.second"/></option>
                                            <option value="3"><g:message locale="${lang}" code="cron.expression.label.third"/></option>
                                            <option value="4"><g:message locale="${lang}" code="cron.expression.label.fourth"/></option>
                                        </select>
                                        &nbsp;
                                        <select id="companyMiraklCronMonthlyOnceDay" disabled="disabled">
                                            <option selected="selected" value="MON"><g:message locale="${lang}" code="cron.expression.label.monday"/></option>
                                            <option value="TUE"><g:message locale="${lang}" code="cron.expression.label.tuesday"/></option>
                                            <option value="WED"><g:message locale="${lang}" code="cron.expression.label.wednesday"/></option>
                                            <option value="THU"><g:message locale="${lang}" code="cron.expression.label.thursday"/></option>
                                            <option value="FRI"><g:message locale="${lang}" code="cron.expression.label.friday"/></option>
                                            <option value="SAT"><g:message locale="${lang}" code="cron.expression.label.saturday"/></option>
                                            <option value="SUN"><g:message locale="${lang}" code="cron.expression.label.sunday"/></option>
                                        </select>
                                        &nbsp;<g:message locale="${lang}" code="cron.expression.label.ofEvery"/>&nbsp;<sup>*</sup>&nbsp;<input type="text" value="1" id="companyMiraklCronMonthlyOnceMonths" pattern="[1-9]{1}([0-9]+)?" disabled="disabled"/>&nbsp;<g:message locale="${lang}" code="cron.expression.label.months"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <g:message locale="${lang}" code="cron.expression.label.startTime"/>&nbsp;
                                        <select id="companyMiraklCronMonthlyHour"></select>
                                        <select id="companyMiraklCronMonthlyMinutes"></select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="companyMiraklCronYearlyDiv" class="cronForm">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <input type="radio" id="companyMiraklCronYearlyRepeat" name="companyMiraklCronYearlyRadio" checked="checked" value="repeat"/>
                                </td>
                                <td>
                                    <g:message locale="${lang}" code="cron.expression.label.the"/>&nbsp;
                                    <select id="companyMiraklCronYearlyRepeatMonth">
                                        <option selected="selected" value="1"><g:message locale="${lang}" code="cron.expression.label.january"/></option>
                                        <option value="2"><g:message locale="${lang}" code="cron.expression.label.february"/></option>
                                        <option value="3"><g:message locale="${lang}" code="cron.expression.label.march"/></option>
                                        <option value="4"><g:message locale="${lang}" code="cron.expression.label.april"/></option>
                                        <option value="5"><g:message locale="${lang}" code="cron.expression.label.may"/></option>
                                        <option value="6"><g:message locale="${lang}" code="cron.expression.label.june"/></option>
                                        <option value="7"><g:message locale="${lang}" code="cron.expression.label.july"/></option>
                                        <option value="8"><g:message locale="${lang}" code="cron.expression.label.august"/></option>
                                        <option value="9"><g:message locale="${lang}" code="cron.expression.label.september"/></option>
                                        <option value="10"><g:message locale="${lang}" code="cron.expression.label.october"/></option>
                                        <option value="11"><g:message locale="${lang}" code="cron.expression.label.november"/></option>
                                        <option value="12"><g:message locale="${lang}" code="cron.expression.label.december"/></option>
                                    </select>
                                    <input type="text" value="1" id="companyMiraklCronYearlyRepeatDay" pattern="[1-9]{1}([0-9]+)?">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" id="companyMiraklCronYearlyOnce" name="companyMiraklCronYearlyRadio" value="repeat">
                                </td>
                                <td>
                                    <g:message locale="${lang}" code="cron.expression.label.the"/>&nbsp;
                                    <select id="companyMiraklCronYearlyOnceRank" disabled="disabled">
                                        <option selected="selected" value="1"><g:message locale="${lang}" code="cron.expression.label.first"/></option>
                                        <option value="2"><g:message locale="${lang}" code="cron.expression.label.second"/></option>
                                        <option value="3"><g:message locale="${lang}" code="cron.expression.label.third"/></option>
                                        <option value="4"><g:message locale="${lang}" code="cron.expression.label.fourth"/></option>
                                    </select>
                                    &nbsp;
                                    <select id="companyMiraklCronYearlyOnceDay" disabled="disabled">
                                    <option selected="selected" value="MON"><g:message locale="${lang}" code="cron.expression.label.monday"/></option>
                                    <option value="TUE"><g:message locale="${lang}" code="cron.expression.label.tuesday"/></option>
                                    <option value="WED"><g:message locale="${lang}" code="cron.expression.label.wednesday"/></option>
                                    <option value="THU"><g:message locale="${lang}" code="cron.expression.label.thursday"/></option>
                                    <option value="FRI"><g:message locale="${lang}" code="cron.expression.label.friday"/></option>
                                    <option value="SAT"><g:message locale="${lang}" code="cron.expression.label.saturday"/></option>
                                    <option value="SUN"><g:message locale="${lang}" code="cron.expression.label.sunday"/></option>
                                    </select>
                                    <g:message locale="${lang}" code="cron.expression.label.of"/>&nbsp;
                                    <select id="companyMiraklCronYearlyOnceMonth" disabled="disabled">
                                        <option selected="selected" value="1"><g:message locale="${lang}" code="cron.expression.label.january"/></option>
                                        <option value="2"><g:message locale="${lang}" code="cron.expression.label.february"/></option>
                                        <option value="3"><g:message locale="${lang}" code="cron.expression.label.march"/></option>
                                        <option value="4"><g:message locale="${lang}" code="cron.expression.label.april"/></option>
                                        <option value="5"><g:message locale="${lang}" code="cron.expression.label.may"/></option>
                                        <option value="6"><g:message locale="${lang}" code="cron.expression.label.june"/></option>
                                        <option value="7"><g:message locale="${lang}" code="cron.expression.label.july"/></option>
                                        <option value="8"><g:message locale="${lang}" code="cron.expression.label.august"/></option>
                                        <option value="9"><g:message locale="${lang}" code="cron.expression.label.september"/></option>
                                        <option value="10"><g:message locale="${lang}" code="cron.expression.label.october"/></option>
                                        <option value="11"><g:message locale="${lang}" code="cron.expression.label.november"/></option>
                                        <option value="12"><g:message locale="${lang}" code="cron.expression.label.december"/></option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <g:message locale="${lang}" code="cron.expression.label.startTime"/>&nbsp;
                                    <select id="companyMiraklCronYearlyHour"></select>
                                    <select id="companyMiraklCronYearlyMinutes"></select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="spacer"></div>
        </form>
    </div>
    <div id="companyMiraklOperatorDiv" style="padding-top: 7px;">
        <form id="companyMiraklOperatorForm" onsubmit="return false;">
            <div class="newline">
                <div class="companyMiraklDialog-large">
                    <label for="companyMiraklFrontKey"><g:message locale="${lang}" code="company.mirakl.frontKey.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
                <div class="companyMiraklDialog-large">
                    <label for="companyMiraklLocalPath"><g:message locale="${lang}" code="company.mirakl.localPath.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="companyMiraklDialog-large">
                    <input type="text" id="companyMiraklFrontKey" />
                </div>
                <div class="companyMiraklDialog-large">
                    <input type="text" id="companyMiraklLocalPath"/>
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <div class="companyMiraklDialog-large">
                    <label for="companyMiraklRemoteHost"><g:message locale="${lang}" code="company.mirakl.remoteHost.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
                <div class="companyMiraklDialog-large">
                    <label for="companyMiraklRemotePath"><g:message locale="${lang}" code="company.mirakl.remotePath.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="companyMiraklDialog-large">
                    <input type="text" id="companyMiraklRemoteHost" />
                </div>
                <div class="companyMiraklDialog-large">
                    <input type="text" id="companyMiraklRemotePath" />
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <div class="companyMiraklDialog-large">
                    <label for="companyMiraklUsername"><g:message locale="${lang}" code="company.mirakl.username.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
                <div class="companyMiraklDialog-large">
                    <label for="companyMiraklLocalPath"><g:message locale="${lang}" code="company.mirakl.connexionType.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="companyMiraklDialog-large">
                    <input type="text" id="companyMiraklUsername" />
                </div>
                <div class="companyMiraklDialog-large">
                    <select id="companyMiraklConnexionType" multiple="multiple">
                        <option value="password" selected="true"><g:message locale="${lang}" code="company.mirakl.passwordOption.label"></g:message></option>
                        <option value="ssh"><g:message locale="${lang}" code="company.mirakl.sshOption.label"></g:message></option>
                    </select>
                </div>
            </div>
            <div class="spacer"></div>
            <div id="companyMiraklPasswordDiv">
                <div class="newline">
                    <div class="companyMiraklDialog-large">
                        <label for="companyMiraklPassword"><g:message locale="${lang}" code="company.mirakl.password.label"></g:message>&nbsp;<sup>*</sup></label><br />
                    </div>
                </div>
                <div class="spacer-small"></div>
                <div class="newline">
                    <div class="companyMiraklDialog-large">
                        <input type="text" id="companyMiraklPassword" />
                    </div>
                </div>
            </div>
            <div id="companyMiraklSSHDiv">
                <div class="newline">
                    <div class="companyMiraklDialog-large">
                        <label for="companyMiraklKeyPath"><g:message locale="${lang}" code="company.mirakl.keyPath.label"></g:message>&nbsp;<sup>*</sup></label><br />
                    </div>
                    <div class="companyMiraklDialog-large">
                        <label for="companyMiraklPassphrase"><g:message locale="${lang}" code="company.mirakl.passphrase.label"></g:message></label><br />
                    </div>
                </div>
                <div class="spacer-small"></div>
                <div class="newline">
                    <div class="companyMiraklDialog-large">
                        <input type="text" id="companyMiraklKeyPath" />
                    </div>
                    <div class="companyMiraklDialog-large">
                        <input type="text" id="companyMiraklPassphrase" />
                    </div>
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <div class="companyMiraklDialog-full">
                    <label><g:message locale="${lang}" code="company.mirakl.shopIds.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div id="companyMiraklShopIdsGridDiv">
                    <div id="companyMiraklShopIdsGrid" style="height: 174px;"></div>
                </div>
                <div id="companyMiraklShopIdsPaginationDiv">
                    <div id="companyMiraklShopIdsPagination"></div>
                </div>
            </div>
            <div class="spacer"></div>
        </form>
    </div>
    <div id="companyMiraklSecurityDiv" style="padding-top: 7px;">
        <div>
            <label for="companyMiraklSecurityUsers"><g:message locale="${lang}" code="security.users.label" /></label>
        </div>
        <div class="spacer-small"/>
        <div>
            <select id="companyMiraklSecurityUsers" multiple="multiple"></select>
        </div>
    </div>
</div>