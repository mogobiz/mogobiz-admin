function BookmarksCtrl($scope, $rootScope, $location, $route) {
	resetMainContainerSize($location);
	updateNavigationBarClasses("bookmarks");
	var bookmarksStr = localStorage.getItem("mogoBleConferencesBookmarks");
	$scope.bookmarks = [];
	if(bookmarksStr != null){
		$scope.bookmarks = JSON.parse(bookmarksStr);
	}
	$scope.bookmarksGetConferenceDetails = function(conferenceId){bookmarksGetConferenceDetails($scope, $rootScope, $location, $route, conferenceId);};
}

function bookmarksGetConferenceDetails(scope, rootScope, location, route, conferenceId){
	for(var i = 0; i < rootScope.allConferences.length; i++){
		if(rootScope.allConferences[i].id == conferenceId){
			rootScope.conferenceDetails = rootScope.allConferences[i];
			navigateToPage(scope, rootScope, location, route, "conferenceDetails");
			break;
		}
	}
}