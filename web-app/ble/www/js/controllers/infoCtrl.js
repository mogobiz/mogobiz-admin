function InfoCtrl($scope, $rootScope, $location, $route) {
	resetMainContainerSize($location);
	updateNavigationBarClasses("info");
	$scope.infoBuyTickets = function(){infoBuyTickets($scope, $rootScope, $location, $route);};
}

function infoBuyTickets(scope, rootScope, location, route){
	var ref = window.open("http://yurplan.com/event/Scala-IO-2014/3029/tickets", "_blank", "location=yes");
	ref.addEventListener("exit", function() {navigateToPage(scope, rootScope, location, route, "info");});
}