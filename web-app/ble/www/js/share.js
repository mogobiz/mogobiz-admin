var serverStore = "scalaio";
var eventStartDate = "23/10/2014";
var twitterTimelineWidgetId = "493305865378598913";
var conferenceTwitterHashtag = "#ScalaIO_FR";
var conferenceTwitterTimeline = "scalaIO_FR";
var serverUrl = "http://mogobiz.ebiznext.com/iper2010/";
var serverCtrl = "elasticsearch/";
var scanTime = 5000; // in milliseconds
var scanInterval = 10000; // in milliseconds
var maxAcceptedDistance = 100; // in meters 
var maxGeocodingDistance = 200000; // in meters
var bottomTtooltipTimeout;
var bigDataBufferLen = 1;

var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var smallWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function callServer(action, dataToSend, success, error){
	var afterCallingSuccess = function(response){
		if(success && typeof(success) === "function"){
			success.call(this, response);}
	};
	var afterCallingError = function(response){
		if(error && typeof(error) === "function")
			error.call(this, response);
	};
	$.ajax({
		url :  serverUrl + serverCtrl + action,
		type : "GET",
		data : dataToSend,
		cache : false,
		async : true,
		success : afterCallingSuccess,
		error: afterCallingError
	});
}

function registerBigData(scope, rootScope, location, route, action, params){
	var dataToSend = "deviceuuid=" + device.uuid + "&store=" + serverStore + "&action=" + action + "&date=" + new Date().getTime();
	if(action == "speaker"){
		dataToSend += "&speaker_id=" + params.id + "&speaker_name=" + params.name;
	}
	else if(action == "product" || action == "bookmark-on" || action == "bookmark-off" || action == "vote"){
		dataToSend += "&product_id=" + params.id + "&product_name=" + params.name;
	}
	if(navigator.connection.type == Connection.WIFI){
		callServer("registerUserAction", dataToSend);
	}
	else{
		var bigDataStr = localStorage.getItem("mogoBleBigDataEvents");
		var bigData = [];
		if(bigDataStr != null){
			bigData = JSON.parse(bigDataStr);
		}
		bigData[bigData.length] = {
			action: action,
			dataToSend: dataToSend
		}
		if(noInternetConnection(scope, rootScope, location, route, false) || bigData.length < bigDataBufferLen){
			var newBigDataStr = JSON.stringify(bigData);
			localStorage.removeItem("mogoBleBigDataEvents");
			localStorage.setItem("mogoBleBigDataEvents", newBigDataStr);
		}
		else{
			for(var i = 0; i < bigData.length; i++){
				callServer("registerUserAction", bigData[i].dataToSend);
			}
			localStorage.removeItem("mogoBleBigDataEvents");
		}
	}
}

function checkForWaitingData(scope, rootScope, location, route){
	if(noInternetConnection(scope, rootScope, location, route, false))
		return;
	var ratesStr = localStorage.getItem("mogoBleRates");
	var rates = [];
	if(ratesStr != null){
		rates = JSON.parse(ratesStr);
	}
	for(var i = 0; i < rates.length; i++){
		callServer("saveComment", rates[i].dataToSend);
	}
	localStorage.removeItem("mogoBleRates");

	var bigDataStr = localStorage.getItem("mogoBleBigDataEvents");
	var bigData = [];
	if(bigDataStr != null){
		bigData = JSON.parse(bigDataStr);
	}
	if(navigator.connection.type == Connection.WIFI || bigData.length >= bigDataBufferLen){
		for(var i = 0; i < bigData.length; i++){
			callServer("registerUserAction", bigData[i].dataToSend);
		}
		localStorage.removeItem("mogoBleBigDataEvents");
	}
}

function dateToString(date, withHours){
	var dateString = "";
	if(date){
		var day = ""+(parseInt(date.getDate()));
		if(day.length == 1)
			dateString += "0"+day;
		else
			dateString += day;
		var month = ""+(parseInt(date.getMonth())+1);
		if(month.length == 1)
			dateString += "/0"+month;
		else
			dateString += "/"+month;
		dateString += "/"+date.getFullYear();
		if(withHours)
			dateString +=" "+date.getHours()+":"+date.getSeconds();
	}
	return dateString;
}

function noInternetConnection(scope, rootScope, location, route, withNotification){
	var status = navigator.connection.type;
	if(status == Connection.UNKNOWN || status == Connection.ETHERNET || status == Connection.CELL_2G || status == Connection.CELL || status == Connection.NONE){
		if(withNotification){
			if($("#bottomTtooltip").is(":visible")){
				clearTimeout(bottomTtooltipTimeout);
				$("#bottomTtooltip").html("").hide(0).removeAttr("style");
			}
			$("#bottomTtooltip").html(rootScope.resourceBundle.message_noInternet).show(0).css({
				"height": 50,
				"-webkit-transform":"translate3d(0px, -50px, 0px)",
				"-webkit-transition": "-webkit-transform 500ms ease",
				"opacity": "0.9"
			});
			bottomTtooltipTimeout = setTimeout(function(){
				clearTimeout(bottomTtooltipTimeout);
				$("#bottomTtooltip").css({
					"-webkit-transform":"translate3d(0px, 0px, 0px)",
					"-webkit-transition": "-webkit-transform 500ms ease",
					"opacity": "1"
				});
				setTimeout(function(){
					$("#bottomTtooltip").html("").hide(0).removeAttr("style");
				}, 500);
			}, 2000);
		}
		return true;
	}
	return false;
}

function resetMainContainerSize(location){
	var height = $(window).height() - 52;
	$("#mainContainer").css("height", height + "px");
	if(location.path() == "/home"){
		$("#homeListContent > div").css("height", (height - 41) + "px");
	}
}

function updateNavigationBarClasses(page){
	$("#navigationbar ul li").removeClass("active");
	if(page && page != "")
		$("#navigationbar ul li#" + page + "Nav").addClass("active");
}

function isBookmarkedConference(idConference){
	var bookmarksStr = localStorage.getItem("mogoBleConferencesBookmarks");
	var bookmarks = [];
	if(bookmarksStr != null){
		bookmarks = JSON.parse(bookmarksStr);
	}
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].id == idConference){
			return true;
		}
	}
	return false;
}

if (typeof(Number.prototype.toRadians) === "undefined") {
	Number.prototype.toRadians = function() {
		return this * Math.PI / 180;
	}
}

