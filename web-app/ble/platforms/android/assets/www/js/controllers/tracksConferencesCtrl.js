function TracksConferencesCtrl($scope, $rootScope, $location, $route) {
	resetMainContainerSize($location);
	updateNavigationBarClasses("trackConferences");
	$scope.tracksConferencesGetConferenceDetails = function(conferenceId){tracksConferencesGetConferenceDetails($scope, $rootScope, $location, $route, conferenceId);}
}

function tracksConferencesGetConferenceDetails(scope, rootScope, location, route, conferenceId){
	for(var i = 0; i < rootScope.allConferences.length; i++){
		if(rootScope.allConferences[i].id == conferenceId){
			rootScope.conferenceDetails = rootScope.allConferences[i];
			navigateToPage(scope, rootScope, location, route, "conferenceDetails");
			break;
		}
	}
}