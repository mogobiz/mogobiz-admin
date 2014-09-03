"use strict";


/* Controllers */
function MainCtrl(ngI18nResourceBundle, ngI18nConfig, $scope, $rootScope, $location, $route){
	document.addEventListener("deviceready", function(){onDeviceReady(ngI18nResourceBundle, ngI18nConfig, $scope, $rootScope, $location, $route)}, false);
	document.addEventListener("backbutton", function(){navigateBack($scope, $rootScope, $location, $route);}, false);
	document.addEventListener("online", function(){checkForWaitingData($scope, $rootScope, $location, $route);}, false);
	$("#toolbar").bind("touchmove", function(e){e.preventDefault();});

	$rootScope.showRefreshMessage = (localStorage.getItem("mogoBleLastRefreshAnswer") == "no");

	$rootScope.languages = ["fr", "en"]; // first language in this table will be used if device language is not supported in this application

	var maxPosition = ($(window).width() >= 340) ? 265 : $(window).width() * 0.75;
	var minPosition = ($(window).width() >= 340) ? -265 : $(window).width() * -0.75;
	$(".snap-drawer").css("width", maxPosition);
	$rootScope.snapper = new Snap({
		element: $("#snap-content")[0],
		disable: "right",
		addBodyClasses: false,
		maxPosition: maxPosition,
		minPosition: minPosition
	});
	$("#toolbar button").unbind().bind("click", function(){
		if($rootScope.snapper.state().state.toLowerCase() == "closed")
			$rootScope.snapper.open("left");
		else
			$rootScope.snapper.close();
	});

	if($location.path() != ""){
		$location.path("");
		$location.replace();
	}

	$rootScope.conferenceTwitterTimeline = conferenceTwitterTimeline;
	$rootScope.twitterTimelineWidgetId = twitterTimelineWidgetId;
	$rootScope.reloadAllData = function(){dataDownloadZipFile($scope, $rootScope, $location, $route);};
	$scope.navigateToPage = function(page){navigateToPage($scope, $rootScope, $location, $route, page);};
	$scope.navigateBack = function(){navigateBack($scope, $rootScope, $location, $route);};
	$scope.goToHotels = function(){goToHotels($scope, $rootScope, $location, $route);};
	$scope.goToTwitterTimeline = function(){goToTwitterTimeline($scope, $rootScope, $location, $route);};
	$scope.urlHistory = [];
	$scope.$on("$routeChangeSuccess", function () {
		if ($location.$$absUrl.split('#')[1] !== $scope.urlHistory[$scope.urlHistory.length - 1] && $location.$$absUrl.split('#')[1] !== "/") {
			$scope.urlHistory.push($location.$$absUrl.split('#')[1]);
		}
	});
}

MainCtrl.$inject = ["ngI18nResourceBundle", "ngI18nConfig", "$scope", "$rootScope", "$location", "$route"];

function navigateToPage(scope, rootScope, location, route, page){
	if(location.path() == "/" + page){
		return;
	}
	rootScope.snapper.close();
	location.path("/" + page);
	location.replace();
}

function onDeviceReady(ngI18nResourceBundle, ngI18nConfig, scope, rootScope, location, route){
	var success = function(language){
		var lang = language.value.split("-")[0];
		var index = 0;
		for(var i = 0; i < rootScope.languages.length; i++){
			if(rootScope.languages[i] == lang){
				index = i;
				break;
			}
		}
		rootScope.i18n = {language: rootScope.languages[index]};
		ngI18nResourceBundle.get({locale: rootScope.i18n.language}).success(function (resourceBundle) {
			rootScope.resourceBundle = resourceBundle;
			rootScope.$apply();
			initializeStartupFunctionality(scope, rootScope, location, route);
		});
	}
	var error = function(){
		rootScope.i18n = {language: rootScope.languages[0]};
		ngI18nResourceBundle.get({locale: language}).success(function (resourceBundle) {
			rootScope.resourceBundle = resourceBundle;
			rootScope.$apply();
			initializeStartupFunctionality(scope, rootScope, location, route);
		});
	}
	navigator.globalization.getPreferredLanguage(success, error);

	$(function() {
		FastClick.attach(document.body);
	});
	rootScope.device = device;
	registerDevice();
	aroundMeMap = window.plugin.google.maps.Map.getMap();
	if(device.platform.toLowerCase() == "android"){
		rootScope.isAndroid = true;
		window.plugins.socialsharing.canShareVia("com.twitter.android", "msg", null, null, null, function(e){rootScope.availableTwitter = true;}, function(e){rootScope.availableTwitter = false;});
	}
	else{
		rootScope.isAndroid = false;
		window.plugins.socialsharing.canShareVia("com.apple.social.twitter", "msg", null, null, null, function(e){rootScope.availableTwitter = true;}, function(e){rootScope.availableTwitter = false;});
	}
}

function initializeStartupFunctionality(scope, rootScope, location, route){
	navigateToPage(scope, rootScope, location, route, "home");
	scope.$apply();
	if(localStorage.getItem("mogoBleConferencesList") == null){
		registerBigData(scope, rootScope, location, route, "start");
		dataDownloadZipFile(scope, rootScope, location, route);
	}
	else{
		dataCheckForNewSchedule(scope, rootScope, location, route);
		rootScope.allConferences = JSON.parse(localStorage.getItem("mogoBleConferencesList"));
		rootScope.speakers = JSON.parse(localStorage.getItem("mogoBleSpeakersList"));
		rootScope.agendaDatesList = JSON.parse(localStorage.getItem("mogoBleAgendaDatesList"));
		rootScope.agendaTimesList = JSON.parse(localStorage.getItem("mogoBleAgendaTimesList"));
		rootScope.tracks = JSON.parse(localStorage.getItem("mogoBleTracksList"));
		rootScope.venueImage = JSON.parse(localStorage.getItem("mogoBleLastVenueImage"));
		rootScope.venueImageInfo = JSON.parse(localStorage.getItem("mogoBleLastvenueImageInfo"));
		dataDirUrl = localStorage.getItem("mogoBleDataDirUrl");
		dataReadSpeakersLogosDir(scope, rootScope, location, route);
	}
	bluetoothle.initialize(null, null, {"request":true});
}

function navigateBack(scope, rootScope, location, route){
	if(rootScope.snapper.state().state.toLowerCase() != "closed"){
		rootScope.snapper.close();
		return;
	}
	if(scope.urlHistory.length == "1") { 
		navigator.app.exitApp();
	};
	scope.urlHistory.pop();
	location.path(scope.urlHistory[scope.urlHistory.length - 1]);
	scope.$apply();
}

function goToHotels(scope, rootScope, location, route){
	var url = "https://www.google.com/hotels/?gl=FR#search;l=" + encodeURIComponent(localStorage.getItem("destinationAddress")) + ";";
	url += "d=" + new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate() + ";";
	url += "n=2;r=2,3,4,5;us=30;usd=1;s=i;si=a4007778;av=r";
	var ref = window.open(url, "_blank", "location=yes");
	ref.addEventListener("exit", function() {navigateToPage(scope, rootScope, location, route, "info");});
}

function goToTwitterTimeline(scope, rootScope, location, route){
	if(rootScope.isAndroid){
		navigateToPage(scope, rootScope, location, route, "timeline");
		return;
	}
	$("#navigationbar").removeClass("in");
	var ref = window.open(serverUrl + "twitter/timeline.html?" + twitterTimelineWidgetId, "_blank", "location=yes");
	ref.addEventListener("exit", function() {navigateToPage(scope, rootScope, location, route, "info");});
}