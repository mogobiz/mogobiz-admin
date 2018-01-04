<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<style>
#event_create_container {
	font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
	font-size: 11px;
	color: #888;
	text-align: left;
	direction: ltr;
}
#tourismCalendarCreateDialog {
	color: #888;
	text-align: left;
	direction: ltr;
	background:#F2F2F2;
	border:1px solid #CCCCCC;
	padding: 10px;
	margin: 5px 0px 0px 0px;
}
</style>
<div id="event_create_container">
	<form id="calendarCreateEventForm">
		<input id="calendarPeriodId" type="hidden" name="calendarPeriodId" />
		<div class="newline">
			<div class="pricing-large">
				<label for="calendarStartDate"><g:message locale="${lang}" code="calendar.start.date.label" />&nbsp;<sup>*</sup></label>
			</div>
			<div class="pricing-large">
				<label for="calendarEndDate"><g:message locale="${lang}" code="calendar.end.date.label" />&nbsp;<sup>*</sup></label>
			</div>
		</div>
		<div class="spacer-small"></div>
		<div class="newline">
			<div class="pricing-large">
				<input id="calendarStartDate" placeholder="<g:message locale="${lang}" code="calendar.datePlaceholder.label" />" type="text" pattern="\d{2}\/\d{2}/\d{4}" required name="calendarStartDate" class="calendar" />
			</div>
			<div class="pricing-large">
				<input id="calendarEndDate" placeholder="<g:message locale="${lang}" code="calendar.datePlaceholder.label" />" pattern="\d{2}\/\d{2}/\d{4}" required type="text" autofocus="autofocus" name="calendarEndDate" class="calendar" />
			</div>
		</div>
		<div class="spacer"></div>
		<div id="calendarTimeInputs">
			<div class="pricing-large" id="calendarStartTimeLabel">
				<label for="calendarStartTime"><g:message locale="${lang}" code="calendar.start.time.label" />&nbsp;<sup>*</sup></label>
			</div>
			<div class="pricing-large" id="calendarEndTimeLabel">
				<label for="calendarEndTime"><g:message locale="${lang}" code="calendar.end.time.label" />&nbsp;<sup>*</sup></label>
			</div>
			<div class="spacer-small"></div>
			<div class="newline">
				<div class="pricing-large">
					<input type="text" placeholder="<g:message locale="${lang}" code="calendar.timePlaceholder.label" />" id="calendarStartTime" pattern="\d{2}\:\d{2}" required name="calendarStartTime" />
				</div>
				<div class="pricing-large">
					<input type="text" placeholder="<g:message locale="${lang}" code="calendar.timePlaceholder.label" />" id="calendarEndTime" pattern="\d{2}\:\d{2}" required name="calendarEndTime" />
				</div>
			</div>
			<div class="spacer"></div>
			<div id="checkBoxesLabel" class="newline">
				<g:message locale="${lang}" code="calendar.days.label" />
			</div>
			<div class="spacer"></div>
			<div class="newline">
				<div id="checkBoxes">
					<input type="checkbox" value="lun" id="monday" />&nbsp;<g:message locale="${lang}" code="calendar.monday.label" />&nbsp;&nbsp;&nbsp;
					<input type="checkbox" value="mar" id="tuesday" />&nbsp;<g:message locale="${lang}" code="calendar.tuesday.label" />&nbsp;&nbsp;&nbsp;
					<input type="checkbox" value="mer" id="wednesday" />&nbsp;<g:message locale="${lang}" code="calendar.wednesday.label" />&nbsp;&nbsp;&nbsp;
					<input type="checkbox" value="jed" id="thursday" />&nbsp;<g:message locale="${lang}" code="calendar.thursday.label" />&nbsp;&nbsp;&nbsp;
					<input type="checkbox" value="ven" id="friday" />&nbsp;<g:message locale="${lang}" code="calendar.friday.label" />&nbsp;&nbsp;&nbsp;
					<input type="checkbox" value="sam" id="saturday" />&nbsp;<g:message locale="${lang}" code="calendar.saturday.label" />&nbsp;&nbsp;&nbsp;
					<input type="checkbox" value="dim" id="sunday" />&nbsp;<g:message locale="${lang}" code="calendar.sunday.label" />
				</div>
			</div>
			<div class="spacer"></div>
		</div>
	</form>
</div>
