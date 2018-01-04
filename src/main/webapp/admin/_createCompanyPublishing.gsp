<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<%@ page import="com.mogobiz.utils.PermissionType"%>
<div id="companyPublishingTabs">
    <div id="ulTabs">
        <ul class="tabs">
            <li>
                <a id="companyPublishingGeneralTab">
                    <g:message locale="${lang}" code="tabs.general.label" />
                </a>
            </li>
            <li>
                <a id="companyPublishingCacheUrlTab">
                    <g:message locale="${lang}" code="tabs.cacheUrl.label" />
                </a>
            </li>
<store:hasPermission permission="${PermissionType.ADMIN_STORE_USERS.key}">
            <li id="companyPublishingSecurityLi">
                <a id="companyPublishingSecurityTab">
                    <g:message locale="${lang}" code="tabs.security.label" />
                </a>
            </li>
</store:hasPermission>
        </ul>
        <hr style="margin-top: -1px;"/>
    </div>
    <div id="companyPublishingCreateDiv" style="padding-top: 7px;">
        <form id="companyPublishingForm" onsubmit="return false;">
            <input id="companyPublishingId" type="hidden"/>
            <div class="newline">
                <div class="companyPublishingDialog-large">
                    <label for="companyPublishingName"><g:message locale="${lang}" code="company.publishing.name.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
                <div class="companyPublishingDialog-large">
                    <label for="companyPublishingUrl"><g:message locale="${lang}" code="company.publishing.url.label"></g:message>&nbsp;<sup>*</sup></label><br />
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="companyPublishingDialog-large">
                    <input type="text" id="companyPublishingName" />
                </div>
                <div class="companyPublishingDialog-large">
                    <input type="text" id="companyPublishingUrl" pattern="https?://.+"/>
                </div>
            </div>
            <div class="spacer"></div>
            <div class="newline">
                <input type="checkbox" id="companyPublishingActive"/>&nbsp;
                <label for="companyPublishingActive"><g:message locale="${lang}" code="company.publishing.active.label" /></label>&nbsp;&nbsp;
                <input type="checkbox" id="companyPublishingManual"/>&nbsp;
                <label for="companyPublishingManual"><g:message locale="${lang}" code="company.publishing.manual.label" /></label>
            </div>
            %{--<div class="spacer"></div>--}%
            %{--<div class="newline">--}%
                %{--<div id="companyPublishingCron"></div>--}%
            %{--</div>--}%
            <div class="spacer"></div>
            <div class="newline">
                <div id="companyPublishingCron">
                    <ul class="cronTabs">
                        <li>
                            <a href="javascript:void(0)" id="companyPublishingCronMinutesTab" name="minutes"><g:message locale="${lang}" code="cron.expression.tabs.minutes"/></a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" id="companyPublishingCronHourlyTab" name="hourly"><g:message locale="${lang}" code="cron.expression.tabs.hourly"/></a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" id="companyPublishingCronDailyTab" name="daily"><g:message locale="${lang}" code="cron.expression.tabs.daily"/></a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" id="companyPublishingCronWeeklyTab" name="weekly"><g:message locale="${lang}" code="cron.expression.tabs.weekly"/></a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" id="companyPublishingCronMonthlyTab" name="monthly"><g:message locale="${lang}" code="cron.expression.tabs.monthly"/></a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" id="companyPublishingCronYearlyTab" name="yearly"><g:message locale="${lang}" code="cron.expression.tabs.yearly"/></a>
                        </li>
                    </ul>
                    <div id="companyPublishingCronMinutesDiv" class="cronForm">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <g:message locale="${lang}" code="cron.expression.label.every"/>&nbsp;<sup>*</sup>&nbsp;<input type="text" value="1" id="companyPublishingCronMinutesVal" pattern="[1-9]{1}([0-9]+)?"/>&nbsp;<g:message locale="${lang}" code="cron.expression.label.minutes"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="companyPublishingCronHourlyDiv" class="cronForm">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="radio" id="companyPublishingCronHourlyRepeat" name="companyPublishingCronHourlyRadio" value="repeat" checked="checked"/>
                                    </td>
                                    <td>
                                        <g:message locale="${lang}" code="cron.expression.label.every"/>&nbsp;<sup>*</sup>&nbsp;<input type="text" value="1" id="companyPublishingCronHourlyVal" pattern="[1-9]{1}([0-9]+)?"/>&nbsp;<g:message locale="${lang}" code="cron.expression.label.hours"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="radio" id="companyPublishingCronHourlyOnce" name="companyPublishingCronHourlyRadio" value="once"/>
                                    </td>
                                    <td>
                                        <g:message locale="${lang}" code="cron.expression.label.at"/>&nbsp;
                                        <select id="companyPublishingCronHourlyHour" disabled="disabled"></select>
                                        <select id="companyPublishingCronHourlyMinutes" disabled="disabled"></select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="companyPublishingCronDailyDiv" class="cronForm">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="radio" id="companyPublishingCronDailyRepeat" name="companyPublishingCronDailyRadio" value="repeat" checked="checked"/>
                                    </td>
                                    <td>
                                        <g:message locale="${lang}" code="cron.expression.label.every"/>&nbsp;<sup>*</sup>&nbsp;<input type="text" value="1" id="companyPublishingCronDailyVal" pattern="[1-9]{1}([0-9]+)?"/>&nbsp;<g:message locale="${lang}" code="cron.expression.label.days"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="radio" id="companyPublishingCronDailyOnce" name="companyPublishingCronDailyRadio" value="once"/>
                                    </td>
                                    <td><g:message locale="${lang}" code="cron.expression.label.everyWeekDay"/></td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <g:message locale="${lang}" code="cron.expression.label.startTime"/>&nbsp;
                                        <select id="companyPublishingCronDailyHour"></select>
                                        <select id="companyPublishingCronDailyMinutes"></select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="companyPublishingCronWeeklyDiv" class="cronForm">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <table><tbody><tr><td><input type="checkbox" id="companyPublishingCronWeeklyMON" value="MON"></td><td><g:message locale="${lang}" code="cron.expression.label.monday"/></td></tr></tbody></table>
                                </td>
                                <td>
                                    <table><tbody><tr><td><input type="checkbox" id="companyPublishingCronWeeklyTUE" value="TUE"></td><td><g:message locale="${lang}" code="cron.expression.label.tuesday"/></td></tr></tbody></table>
                                </td>
                                <td>
                                    <table><tbody><tr><td><input type="checkbox" id="companyPublishingCronWeeklyWED" value="WED"></td><td><g:message locale="${lang}" code="cron.expression.label.wednesday"/></td></tr></tbody></table>
                                </td>
                                <td>
                                    <table><tbody><tr><td><input type="checkbox" id="companyPublishingCronWeeklyTHU" value="THU"></td><td><g:message locale="${lang}" code="cron.expression.label.thursday"/></td></tr></tbody></table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table><tbody><tr><td><input type="checkbox" id="companyPublishingCronWeeklyFRI" value="FRI"></td><td><g:message locale="${lang}" code="cron.expression.label.friday"/></td></tr></tbody></table>
                                </td>
                                <td>
                                    <table><tbody><tr><td><input type="checkbox" id="companyPublishingCronWeeklySAT" value="SAT"></td><td><g:message locale="${lang}" code="cron.expression.label.saturday"/></td></tr></tbody></table>
                                </td>
                                <td>
                                    <table><tbody><tr><td><input type="checkbox" id="companyPublishingCronWeeklySUN" value="SUN"></td><td><g:message locale="${lang}" code="cron.expression.label.sunday"/></td></tr></tbody></table>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <g:message locale="${lang}" code="cron.expression.label.startTime"/>&nbsp;
                                    <select id="companyPublishingCronWeeklyHour"></select>
                                    <select id="companyPublishingCronWeeklyMinutes"></select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="companyPublishingCronMonthlyDiv" class="cronForm">
                        <table>
                            <tbody>
                                <tr>
                                    <td><input type="radio" id="companyPublishingCronMonthlyRepeat" name="companyPublishingCronMonthlyRadio" value="repeat" checked="checked"/></td>
                                    <td>
                                        <g:message locale="${lang}" code="cron.expression.label.day"/>&nbsp;<sup>*</sup>&nbsp;<input type="text" value="1" id="companyPublishingCronMonthlyRepeatDay" pattern="[1-9]{1}([0-9]+)?">&nbsp;<g:message locale="${lang}" code="cron.expression.label.ofEvery"/>&nbsp;<sup>*</sup>&nbsp;<input type="text" value="1" id="companyPublishingCronMonthlyRepeatMonths" pattern="[1-9]{1}([0-9]+)?">&nbsp;<g:message locale="${lang}" code="cron.expression.label.months"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input type="radio" id="companyPublishingCronMonthlyOnce" name="companyPublishingCronMonthlyRadio" value="repeat"/></td>
                                    <td>
                                        <g:message locale="${lang}" code="cron.expression.label.the"/>&nbsp;
                                        <select id="companyPublishingCronMonthlyOnceRank" disabled="disabled">
                                            <option selected="selected" value="1"><g:message locale="${lang}" code="cron.expression.label.first"/></option>
                                            <option value="2"><g:message locale="${lang}" code="cron.expression.label.second"/></option>
                                            <option value="3"><g:message locale="${lang}" code="cron.expression.label.third"/></option>
                                            <option value="4"><g:message locale="${lang}" code="cron.expression.label.fourth"/></option>
                                        </select>
                                        &nbsp;
                                        <select id="companyPublishingCronMonthlyOnceDay" disabled="disabled">
                                            <option selected="selected" value="MON"><g:message locale="${lang}" code="cron.expression.label.monday"/></option>
                                            <option value="TUE"><g:message locale="${lang}" code="cron.expression.label.tuesday"/></option>
                                            <option value="WED"><g:message locale="${lang}" code="cron.expression.label.wednesday"/></option>
                                            <option value="THU"><g:message locale="${lang}" code="cron.expression.label.thursday"/></option>
                                            <option value="FRI"><g:message locale="${lang}" code="cron.expression.label.friday"/></option>
                                            <option value="SAT"><g:message locale="${lang}" code="cron.expression.label.saturday"/></option>
                                            <option value="SUN"><g:message locale="${lang}" code="cron.expression.label.sunday"/></option>
                                        </select>
                                        &nbsp;<g:message locale="${lang}" code="cron.expression.label.ofEvery"/>&nbsp;<sup>*</sup>&nbsp;<input type="text" value="1" id="companyPublishingCronMonthlyOnceMonths" pattern="[1-9]{1}([0-9]+)?" disabled="disabled"/>&nbsp;<g:message locale="${lang}" code="cron.expression.label.months"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <g:message locale="${lang}" code="cron.expression.label.startTime"/>&nbsp;
                                        <select id="companyPublishingCronMonthlyHour"></select>
                                        <select id="companyPublishingCronMonthlyMinutes"></select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="companyPublishingCronYearlyDiv" class="cronForm">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <input type="radio" id="companyPublishingCronYearlyRepeat" name="companyPublishingCronYearlyRadio" checked="checked" value="repeat"/>
                                </td>
                                <td>
                                    <g:message locale="${lang}" code="cron.expression.label.the"/>&nbsp;
                                    <select id="companyPublishingCronYearlyRepeatMonth">
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
                                    <input type="text" value="1" id="companyPublishingCronYearlyRepeatDay" pattern="[1-9]{1}([0-9]+)?">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" id="companyPublishingCronYearlyOnce" name="companyPublishingCronYearlyRadio" value="repeat">
                                </td>
                                <td>
                                    <g:message locale="${lang}" code="cron.expression.label.the"/>&nbsp;
                                    <select id="companyPublishingCronYearlyOnceRank" disabled="disabled">
                                        <option selected="selected" value="1"><g:message locale="${lang}" code="cron.expression.label.first"/></option>
                                        <option value="2"><g:message locale="${lang}" code="cron.expression.label.second"/></option>
                                        <option value="3"><g:message locale="${lang}" code="cron.expression.label.third"/></option>
                                        <option value="4"><g:message locale="${lang}" code="cron.expression.label.fourth"/></option>
                                    </select>
                                    &nbsp;
                                    <select id="companyPublishingCronYearlyOnceDay" disabled="disabled">
                                    <option selected="selected" value="MON"><g:message locale="${lang}" code="cron.expression.label.monday"/></option>
                                    <option value="TUE"><g:message locale="${lang}" code="cron.expression.label.tuesday"/></option>
                                    <option value="WED"><g:message locale="${lang}" code="cron.expression.label.wednesday"/></option>
                                    <option value="THU"><g:message locale="${lang}" code="cron.expression.label.thursday"/></option>
                                    <option value="FRI"><g:message locale="${lang}" code="cron.expression.label.friday"/></option>
                                    <option value="SAT"><g:message locale="${lang}" code="cron.expression.label.saturday"/></option>
                                    <option value="SUN"><g:message locale="${lang}" code="cron.expression.label.sunday"/></option>
                                    </select>
                                    <g:message locale="${lang}" code="cron.expression.label.of"/>&nbsp;
                                    <select id="companyPublishingCronYearlyOnceMonth" disabled="disabled">
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
                                    <select id="companyPublishingCronYearlyHour"></select>
                                    <select id="companyPublishingCronYearlyMinutes"></select>
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
    <div id="companyPublishingCacheUrlDiv" style="padding-top: 7px;">
        <p style="font-weight: bold;"><g:message code="company.publishing.cache.header.label" /> <a href="javascript:void(0)" id="addNewCacheURL"><g:message code="company.publishing.cache.add.label" /></a></p>
        <div id="companyPublishingCacheURLGridDiv">
            <div id="companyPublishingCacheURLGrid"></div>
        </div>
        <br/>
        <input type="checkbox" id="companyPublishingCacheURLJahia"/>&nbsp;
        <label for="companyPublishingCacheURLJahia"><g:message locale="${lang}" code="company.publishing.cache.jahia.label" /></label>&nbsp;&nbsp;
        <input type="text" id="companyPublishingCacheURLJahiaUrl" pattern="https?://.+" style="width: 250px;"/>&nbsp;&nbsp;
        <button id="companyPublishingCacheURLJahiaBtn" class="fk_ok_btn"><g:message code="default.button.validate.label" /></button>
    </div>
    <div id="companyPublishingSecurityDiv" style="padding-top: 7px;">
        <div>
            <label for="companyPublishingSecurityUsers"><g:message locale="${lang}" code="security.users.label" /></label>
        </div>
        <div class="spacer-small"/>
        <div>
            <select id="companyPublishingSecurityUsers" multiple="multiple"></select>
        </div>
    </div>
</div>