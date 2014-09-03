function displayTime(field, numSeconds) {
	timeMinutes = parseInt(numSeconds / 60);
	timeSeconds = parseInt(numSeconds - timeMinutes*60);
	if (timeSeconds < 10)
		timeLabel   = timeMinutes + ":0" + timeSeconds + " ";
	else
		timeLabel   = timeMinutes + ":" + timeSeconds + " ";

	document.getElementById(field).innerHTML = timeLabel;
}

function updateCountdown() {
	now = new Date();
	if (now < endTime) {
		displayTime("time_left", (endTime - now)/1000);
		window.setTimeout("updateCountdown();", 1000);
	} else {
		window.location.href = homePage;
	}
}
$(document).ready(function() {
	if (bookTime && totalPrice) {
		var timePassed =(new Date().getTime() - bookTime)/1000;
		var timeLimit = 5*60;
		var timeLeft  = timeLimit - timePassed;
		var now = new Date();
		endTime = new Date(now.getTime() + timeLeft*1000);

		displayTime("time_limit", timeLimit);
		displayTime("time_left", timeLeft);
		window.setTimeout("updateCountdown();", 1000);
	}
	else {
		$('#countdown_timer_notification').remove();
	}
});

