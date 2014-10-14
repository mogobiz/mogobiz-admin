var pushNotification;

function registerDevice() {
	pushNotification = window.plugins.pushNotification
    try {
        var data = JSON.parse(localStorage.getItem('mogoBleRegid'))
        if (data != "") return
            }
    catch(e) {
    }

	var successHandler = function successHandler(result) {};
	var errorHandler = function (result) {};

	if (device.platform == 'android' || device.platform == 'Android') {
		pushNotification.register(
			successHandler,
			errorHandler,
			{
				"senderID": "replace_with_sender_id",
				"ecb": "onNotificationGCM"
			});
	} else {
		var tokenHandler = function (status) {
			localStorage.setItem('mogoBleRegid', JSON.stringify(status.deviceToken));
			// callServer.register(store, deviceUuid=device.uuid, regId=status.deviceToken, platform=IOS, lang=navigator.globalization.getPreferredLanguage
		}
		pushNotification.register(
			tokenHandler,
			errorHandler,
			{
				"badge": "true",
				"sound": "true",
				"alert": "true",
				"ecb": "onNotificationAPN"
			});
	}
}

function onNotificationAPN(event) {
	if (event.alert)
		navigator.notification.alert(event.alert);
	if (event.sound) {
		var snd = new Media(event.sound);
		snd.play();
	}
	if (event.badge)
		pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
}

function onNotificationGCM(e) {
	switch (e.event) {
		case 'registered':
			if (e.regid.length > 0) {
				localStorage.setItem('mogoBleRegid', JSON.stringify(e.regid));
				// Your GCM push server needs to know the regID before it can push to this device
				// here is where you might want to send it the regID for later use.
				// callServer.register(store, deviceUuid=device.uuid, regId=e.regId, platform=ANDROID, lang=navigator.globalization.getPreferredLanguage
			}
			break;

		case 'message':
			// if this flag is set, this notification happened while we were in the foreground.
			// you might want to play a sound to get the user's attention, throw up a dialog, etc.
			if (e.foreground) {
				// on Android soundname is outside the payload.
				//var soundfile = e.soundname || e.payload.sound;
				// if the notification contains a soundname, play it.
				//var my_media = new Media("/android_asset/www/"+ soundfile);
				//my_media.play();
			}
			else {  // otherwise we were launched because the user touched a notification in the notification tray.
				if (e.coldstart){
				
				}
				else{
				
				}
			}
			break;

		case 'error':
			break;

		default:
			break;
	}
}