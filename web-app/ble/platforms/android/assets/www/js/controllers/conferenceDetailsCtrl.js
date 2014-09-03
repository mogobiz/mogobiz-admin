function ConferenceDetailsCtrl($scope, $rootScope, $location, $route){
	resetMainContainerSize($location);
	updateNavigationBarClasses("");
	registerBigData($scope, $rootScope, $location, $route, "product", {id: $rootScope.conferenceDetails.id, name: $rootScope.conferenceDetails.name});
	$scope.rate = 0;
	$scope.rateImages = ["images/star.png", "images/star.png", "images/star.png", "images/star.png", "images/star.png"];
	$rootScope.conferenceDetails.isBookmarked = isBookmarkedConference($rootScope.conferenceDetails.id);

	$scope.conferenceDetailsAddToBookmark = function(){conferenceDetailsAddToBookmark($scope, $rootScope, $location, $route)};
	$scope.conferenceDetailsRemoveFromBookmark = function(idConference){conferenceDetailsRemoveFromBookmark($scope, $rootScope, $location, $route, idConference)};
	$scope.conferenceDetailsShowSpeakerDetails = function(idSpeaker){conferenceDetailsShowSpeakerDetails($scope, $rootScope, $location, $route, idSpeaker)};
	$scope.conferenceDetailsShareTwitter = function(){conferenceDetailsShareTwitter($scope, $rootScope, $location, $route)};
	$scope.conferenceDetailsRate = function(rate){conferenceDetailsRate($scope, $rootScope, $location, $route, rate);};
	$scope.conferenceDetailsSubmitRate = function(){conferenceDetailsSubmitRate($scope, $rootScope, $location, $route);};

	$scope.conferenceDetailsListRate = [0, 0, 0, 0, 0];
	conferenceDetailsGetListRate($scope, $rootScope, $location, $route);

	$scope.$on("$destroy", function (event, next, current) {
		if($("#bottomTtooltip").is(":visible")){
			clearTimeout(bottomTtooltipTimeout);
			$("#bottomTtooltip").html("").hide(0).removeAttr("style");
		}
	});
	setTimeout(function(){
		var height = ($(window).height() - 52 - $("#conferenceDetailsHeader h4").outerHeight(true) - $("#conferenceDetailsHeader p").outerHeight(true) - 20) + "px";
		$("#conferenceDetailsContent").css({
			"height": height,
			"overflow-y": "auto"
		});
	}, 100);
}

function conferenceDetailsAddToBookmark(scope, rootScope, location, route){
	registerBigData(scope, rootScope, location, route, "bookmark-on", {id: rootScope.conferenceDetails.id, name: rootScope.conferenceDetails.name});
	var bookmarksStr = localStorage.getItem("mogoBleConferencesBookmarks");
	var bookmarks = [];
	if(bookmarksStr != null){
		bookmarks = JSON.parse(bookmarksStr);
	}
	var len = bookmarks.length
	bookmarks[len] = {
		id: rootScope.conferenceDetails.id,
		name: rootScope.conferenceDetails.name,
		startDate: rootScope.conferenceDetails.startDate,
		stopDate: rootScope.conferenceDetails.stopDate,
		descriptionAsText: rootScope.conferenceDetails.descriptionAsText,
		weekDay: rootScope.conferenceDetails.weekDay,
		monthDay: rootScope.conferenceDetails.monthDay,
		realStartTime: rootScope.conferenceDetails.realStartTime,
		realEndTime: rootScope.conferenceDetails.realEndTime
	};
	if(rootScope.conferenceDetails.category){
		bookmarks[len].category = {
			id: rootScope.conferenceDetails.category.id,
			name: rootScope.conferenceDetails.category.name
		}
	}
	if(rootScope.conferenceDetails.brand){
		bookmarks[len].brand = {
			id: rootScope.conferenceDetails.brand.id,
			name: rootScope.conferenceDetails.brand.name
		}
	}
	var newBookmarksStr = JSON.stringify(bookmarks);
	localStorage.removeItem("mogoBleConferencesBookmarks");
	localStorage.setItem("mogoBleConferencesBookmarks", newBookmarksStr);
	rootScope.conferenceDetails.isBookmarked = true;

	var parts = rootScope.conferenceDetails.realStartDate.split("/");
	var time =rootScope.conferenceDetails.realStartTime.split(":");
	var startDate = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10)-1, parseInt(parts[0], 10), parseInt(time[0], 10), parseInt(time[1], 10), 0, 0);
	var time =rootScope.conferenceDetails.realEndTime.split(":");
	var endDate = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10)-1, parseInt(parts[0], 10), parseInt(time[0], 10), parseInt(time[1], 10), 0, 0);

	var title = rootScope.conferenceDetails.name;
	var location = localStorage.getItem("destinationAddress");
	var notes = "The Scala event in Paris!"
	var calOptions = window.plugins.calendar.getCalendarOptions();
	calOptions.firstReminderMinutes = 10;
	var success = function(){
		if($("#bottomTtooltip").is(":visible")){
			clearTimeout(bottomTtooltipTimeout);
			$("#bottomTtooltip").html("").hide(0).removeAttr("style");
		}
		$("#bottomTtooltip").html(rootScope.resourceBundle.message_addToCalendar).show(0).css({
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
	window.plugins.calendar.createEventWithOptions(title, location, notes, startDate, endDate, calOptions, success, function(){});
}

function conferenceDetailsRemoveFromBookmark(scope, rootScope, location, route, idConference){
	registerBigData(scope, rootScope, location, route, "bookmark-off", {id: rootScope.conferenceDetails.id, name: rootScope.conferenceDetails.name});
	var bookmarksStr = localStorage.getItem("mogoBleConferencesBookmarks");
	var bookmarks = [];
	var newBookmarks = [];
	if(bookmarksStr != null){
		bookmarks = JSON.parse(bookmarksStr);
	}
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].id != idConference){
			newBookmarks[newBookmarks.length] = bookmarks[i];
		}
	}
	var newBookmarksStr = JSON.stringify(newBookmarks);
	localStorage.removeItem("mogoBleConferencesBookmarks");
	localStorage.setItem("mogoBleConferencesBookmarks", newBookmarksStr);
	rootScope.conferenceDetails.isBookmarked = false;

	var parts = rootScope.conferenceDetails.realStartDate.split("/");
	var time =rootScope.conferenceDetails.realStartTime.split(":");
	var startDate = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10)-1, parseInt(parts[0], 10), parseInt(time[0], 10), parseInt(time[1], 10), 0, 0);
	var time =rootScope.conferenceDetails.realEndTime.split(":");
	var endDate = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10)-1, parseInt(parts[0], 10), parseInt(time[0], 10), parseInt(time[1], 10), 0, 0);

	var title = rootScope.conferenceDetails.name;
	var location = localStorage.getItem("destinationAddress");
	var notes = "The Scala event in Paris!"
	var success = function(){
		if($("#bottomTtooltip").is(":visible")){
			clearTimeout(bottomTtooltipTimeout);
			$("#bottomTtooltip").html("").hide(0).removeAttr("style");
		}
		$("#bottomTtooltip").html(rootScope.resourceBundle.message_removeFromCalendar).show(0).css({
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
	window.plugins.calendar.deleteEvent(title, location, notes, startDate, endDate, success, function(){});
}

function conferenceDetailsShowSpeakerDetails(scope, rootScope, location, route, idSpeaker){
	for(var i = 0; i < rootScope.speakers.length; i++){
		if(rootScope.speakers[i].id == idSpeaker){
			rootScope.speakerDetails = rootScope.speakers[i];
			navigateToPage(scope, rootScope, location, route, "speakerDetails");
			break;
		}
	}
}

function conferenceDetailsShareTwitter(scope, rootScope, location, route){
	window.plugins.socialsharing.shareViaTwitter(conferenceTwitterHashtag + " @" + rootScope.conferenceDetails.brand.twitter + " \"" + rootScope.conferenceDetails.name + "\"");
}

function conferenceDetailsSubmitRate(scope, rootScope, location, route){
	$("button.btn.btn-default.pull-right").blur();
	if(scope.rate == 0)
		return;
	if(!conferenceDetailsCanBeRated(scope, rootScope, location, route)){
		scope.rate = 0;
		scope.rateImages = ["images/star.png", "images/star.png", "images/star.png", "images/star.png", "images/star.png"];
		if($("#bottomTtooltip").is(":visible")){
			clearTimeout(bottomTtooltipTimeout);
			$("#bottomTtooltip").html("").hide(0).removeAttr("style");
		}
		$("#bottomTtooltip").html(rootScope.resourceBundle.message_canRate).show(0).css({
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
	else{
		registerBigData(scope, rootScope, location, route, "vote", {id: rootScope.conferenceDetails.id, name: rootScope.conferenceDetails.name});
		if(noInternetConnection(scope, rootScope, location, route, true)){
			var ratesStr = localStorage.getItem("mogoBleRates");
			var rates = [];
			if(ratesStr != null){
				rates = JSON.parse(ratesStr);
			}
			rates[rates.length] = {
				dataToSend: "store=" + serverStore + "&userUuid=" + device.uuid + "&productUuid=" + rootScope.conferenceDetails.uuid + "&notation=" + scope.rate
			}
			var newRatesStr = JSON.stringify(rates);
			localStorage.removeItem("mogoBleRates");
			localStorage.setItem("mogoBleRates", newRatesStr);
		}
		else{
			var success = function(){
				setTimeout(function(){conferenceDetailsGetListRate(scope, rootScope, location, route);}, 1000);
			}
			var dataToSend = "store=" + serverStore + "&userUuid=" + device.uuid + "&productUuid=" + rootScope.conferenceDetails.uuid + "&notation=" + scope.rate;
			callServer("saveComment", dataToSend, success);
		}
	}
}

function conferenceDetailsCanBeRated(scope, rootScope, location, route){
	var now = new Date().getTime();
	var conferenceStartTime = new Date(rootScope.conferenceDetails.realTime).getTime();
	return (now >= conferenceStartTime);
}

function conferenceDetailsRate(scope, rootScope, location, route, rate){
	scope.rate = rate;
	for(var i = 0; i < rate; i++){
		scope.rateImages[i] = "images/star1.png";
	}
	for(var i = rate; i < 5; i++){
		scope.rateImages[i] = "images/star.png";
	}
}

function conferenceDetailsGetListRate(scope, rootScope, location, route){
	scope.conferenceDetailsListRate = [0, 0, 0, 0, 0];
	var rateIndex = -1;
	var listRatesStr = localStorage.getItem("mogoBleListRates");
	var listRates = [];
	if(listRatesStr != null){
		listRates = JSON.parse(listRatesStr);
	}
	for(var i = 0; i < listRates.length; i++){
		if(listRates[i].id == rootScope.conferenceDetails.id){
			rateIndex = i;
			break;
		}
	}
	if(noInternetConnection(scope, rootScope, location, route, false)){
		if(rateIndex >= 0){
			var list = listRates[rateIndex].list;
			for(var i = 0; i < list.length; i++){
				scope.conferenceDetailsListRate[list[i].key - 1] = list[i].doc_count;
			}
			scope.$apply();
		}
	}
	else{
		var success = function(response){
			if(rateIndex == -1)
				rateIndex = listRates.length;
			listRates[rateIndex] = {
				id: rootScope.conferenceDetails.id,
				list: response.rates_count.buckets
			};
			var newListRatesStr = JSON.stringify(listRates);
			localStorage.removeItem("mogoBleListRates");
			localStorage.setItem("mogoBleListRates", newListRatesStr);
			var list = response.rates_count.buckets;
			for(var i = 0; i < list.length; i++){
				scope.conferenceDetailsListRate[list[i].key - 1] = list[i].doc_count;
			}
			scope.$apply();
		}
		var dataToSend = "store=" + serverStore + "&productUuid=" + rootScope.conferenceDetails.uuid + "&aggregation=true";
		callServer("listProductComments", dataToSend, success);
	}
}