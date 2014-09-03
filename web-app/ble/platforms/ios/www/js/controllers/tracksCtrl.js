function TracksCtrl($scope, $rootScope, $location, $route) {
	resetMainContainerSize($location);
	updateNavigationBarClasses("tracks");
	$scope.tracksListAllConferences = function(track){tracksListAllConferences($scope, $rootScope, $location, $route, track)};
}

function tracksListAllConferences(scope, rootScope, location, route, track){
	rootScope.track = track;
	navigateToPage(scope, rootScope, location, route, "tracksConferences" );
}
