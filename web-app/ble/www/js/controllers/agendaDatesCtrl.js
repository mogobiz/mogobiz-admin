function AgendaDatesCtrl($scope, $rootScope, $location, $route) {
	resetMainContainerSize($location);
	updateNavigationBarClasses("agendaDates");
	$scope.agendaDatesGetTimes = function(index){agendaDatesGetTimes($scope, $rootScope, $location, $route, index)};
}

function agendaDatesGetTimes(scope, rootScope, location, route, index){
	rootScope.agendaSelectedDate = rootScope.agendaDatesList[index].date;
	navigateToPage(scope, rootScope, location, route, "agendaTimes");
}