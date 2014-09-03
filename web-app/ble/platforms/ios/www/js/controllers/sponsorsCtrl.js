function SponsorsCtrl($scope, $rootScope, $location, $route) {
	resetMainContainerSize($location);
	updateNavigationBarClasses("sponsors");
	$scope.sponsorsOpenLink = function(url){sponsorsOpenLink($scope, $rootScope, $location, $route, url);};
}

function sponsorsOpenLink(scope, rootScope, location, route, url){
	var ref = window.open(url, "_blank", "location=yes");
	ref.addEventListener("exit", function() {navigateToPage(scope, rootScope, location, route, "sponsors");});
}