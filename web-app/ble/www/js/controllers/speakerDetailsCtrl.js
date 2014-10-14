function SpeakerDetailsCtrl($scope, $rootScope, $location, $route) {
	resetMainContainerSize($location);
	updateNavigationBarClasses("SpeakerDetailsCtrl");
	registerBigData($scope, $rootScope, $location, $route, "speaker", {id: $rootScope.speakerDetails.id, name: $rootScope.speakerDetails.name});
	$scope.speakersGetConferenceDetails = function(conferenceId){speakersGetConferenceDetails($scope, $rootScope, $location, $route, conferenceId)};
	$scope.speakersShareTwitter = function(speaker){speakersShareTwitter($scope, $rootScope, $location, $route, speaker)};
	$scope.speakersGoToWebsite = function(speaker){speakersGoToWebsite($scope, $rootScope, $location, $route, speaker);};
	setTimeout(function(){
		var height = ($(window).height() - 52 - $("#speakerDetailsHeader h4").outerHeight(true) - 20) + "px";
		$("#speakerDetailsContent").css({
			"height": height,
			"overflow-y": "auto"
		});
	}, 100);
}

function speakersGetConferenceDetails(scope, rootScope, location, route, conferenceId){
	for(var i = 0; i < rootScope.allConferences.length; i++){
		if(rootScope.allConferences[i].id == conferenceId){
			rootScope.conferenceDetails = rootScope.allConferences[i];
			navigateToPage(scope, rootScope, location, route, "conferenceDetails");
			break;
		}
	}
}

function speakersShareTwitter(scope, rootScope, location, route, speaker){
	var twitterConfig = conferenceTwitterHashtag;
	if(speaker.twitter != null && speaker.twitter !="")
		twitterConfig += " " + speaker.twitter;
	window.plugins.socialsharing.shareViaTwitter(twitterConfig);
}

function speakersGoToWebsite(scope, rootScope, location, route, speaker){
	var ref = window.open(speaker.website, "_blank", "location=yes");
	ref.addEventListener("exit", function() {navigateToPage(scope, rootScope, location, route, "speakerDetails");});
}