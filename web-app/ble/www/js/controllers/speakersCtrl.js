function SpeakersCtrl($scope, $rootScope, $location, $route) {
	resetMainContainerSize($location);
	updateNavigationBarClasses("speakers");
	$scope.speakersGetSpeakerDetails = function(speaker){speakersGetSpeakerDetails($scope, $rootScope, $location, $route, speaker)};
}

function speakersGetSpeakerDetails(scope, rootScope, location, route, speaker){
	rootScope.speakerDetails = speaker;
	navigateToPage(scope, rootScope, location, route, "speakerDetails");
}