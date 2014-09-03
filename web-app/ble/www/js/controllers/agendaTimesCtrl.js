function AgendaTimesCtrl($scope, $rootScope, $location, $route) {
	resetMainContainerSize($location);
	updateNavigationBarClasses("");
	$scope.times = {};
	for(var i = 0; i < $rootScope.agendaTimesList.length; i++){
		if($rootScope.agendaTimesList[i].date == $rootScope.agendaSelectedDate){
			if(!$scope.times[$rootScope.agendaTimesList[i].startTime])
				$scope.times[$rootScope.agendaTimesList[i].startTime] = [];
				$scope.times[$rootScope.agendaTimesList[i].startTime][$scope.times[$rootScope.agendaTimesList[i].startTime].length] = $rootScope.agendaTimesList[i];
		}
	}
	$scope.agendaTimesGetConferenceDetails = function(conferenceId){agendaTimesGetConferenceDetails($scope, $rootScope, $location, $route, conferenceId)};
}

function agendaTimesGetConferenceDetails(scope, rootScope, location, route, conferenceId){
	for(var i = 0; i < rootScope.allConferences.length; i++){
		if(rootScope.allConferences[i].id == conferenceId){
			rootScope.conferenceDetails = rootScope.allConferences[i];
			navigateToPage(scope, rootScope, location, route, "conferenceDetails");
			break;
		}
	}
}