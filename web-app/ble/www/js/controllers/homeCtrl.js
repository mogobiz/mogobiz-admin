function HomeCtrl($scope, $rootScope, $location, $route) {
	resetMainContainerSize($location);
	updateNavigationBarClasses("");
	$("#toolbar button").hide();
	$("#toolbar a.backBtn").hide();
	$scope.$on("$destroy", function (event, next, current) {
		if($rootScope.isAndroid)
			$("#toolbar button").show();
		else
			$("#toolbar a.backBtn").show();
		$(".snap-drawers").removeAttr("style");
		if($("#bottomTtooltip").is(":visible")){
			$("#bottomTtooltip").html("").hide(0).removeAttr("style");
		}
	});
	if($rootScope.showRefreshMessage){
		$("#bottomTtooltip").html($rootScope.resourceBundle.menu_refreshSchedule + "<div class='arrow-body'></div><div class='triangle-down'>").show(0).css({
			"height": 50,
			"-webkit-transform":"translate3d(0px, -50px, 0px)",
			"-webkit-transition": "-webkit-transform 500ms ease",
			"opacity": "0.9"
		});
	}
}