"use strict";

/* App Module */

var mogoBle = angular.module("mogoBle",  ["ngRoute", "ngI18n","ui.bootstrap", "ngSanitize"]).config(["$routeProvider", "$httpProvider", function($routeProvider, $httpProvider) {
	$routeProvider.
	when("/home",				{templateUrl: "partials/home.html",						controller: HomeCtrl}).
	when("/tracks", 			{templateUrl: "partials/tracks.html",					controller: TracksCtrl}).
	when("/tracksConferences",	{templateUrl: "partials/tracksConferences.html",		controller: TracksConferencesCtrl}).
	when("/speakers",			{templateUrl: "partials/speakers.html",					controller: SpeakersCtrl}).
	when("/speakerDetails",		{templateUrl: "partials/speakerDetails.html",			controller: SpeakerDetailsCtrl}).
	when("/conferenceDetails",	{templateUrl: "partials/conferenceDetails.html",		controller: ConferenceDetailsCtrl}).
	when("/agendaDates",		{templateUrl: "partials/agendaDates.html",				controller: AgendaDatesCtrl}).
	when("/agendaTimes",		{templateUrl: "partials/agendaTimes.html",				controller: AgendaTimesCtrl}).
	when("/bookmarks",			{templateUrl: "partials/bookmarks.html",				controller: BookmarksCtrl}).
	when("/timeline",			{templateUrl: "partials/timeline.html",					controller: TimelineCtrl}).
	when("/aroundMe",			{templateUrl: "partials/aroundMe.html",					controller: AroundMeCtrl}).
	when("/sponsors",			{templateUrl: "partials/sponsors.html",					controller: SponsorsCtrl}).
	when("/info",				{templateUrl: "partials/info.html",						controller: InfoCtrl}).
	otherwise({redirectTo: "/"} );
	$httpProvider.responseInterceptors.push(function($q, $rootScope) {
		return function (promise) {
			return promise.then(function (response) {
				$rootScope.request = response.config;
				return response;
			}, function (response) {
				return $q.reject(response);
			});
		};
	});
}]).directive("ngXpull", function() {
	return function(scope, elm, attr) {
		return $(elm[0]).xpull({
			spinnerTimeout: 500,
			"callback": function() {
				return scope.$apply(attr.ngXpull);
			}
		});
	};
});

mogoBle.value("ngI18nConfig", {
	//defaultLocale should be in lowercase and is required!!
	defaultLocale:"en",
	//supportedLocales is required - all locales should be in lowercase!!
	supportedLocales:["en", "fr"],
	//without leading and trailing slashes, default is i18n
	basePath:"js/i18n",
	//default is false
	cache:true
});

