function AroundMeCtrl($scope, $rootScope, $location, $route) {
	resetMainContainerSize($location);
	updateNavigationBarClasses("aroundMe");
	$("#aroundMeLocation").hide(0);
	$scope.$on("$viewContentLoaded", function (event, next, current) {
		aroundMeBle.initializeBluetoothScan($scope, $rootScope, $location, $route);
		setTimeout(function(){
			aroundMeShowHideNextConferences($scope, $rootScope, $location, $route, false);
		}, 50);
	});
	$scope.$on("$destroy", function (event, next, current) {
		$("#snap-content").css("overflow", "");
		aroundMeBle.cancelBluetoothScan();
		if($("#bottomTtooltip").is(":visible")){
			clearTimeout(bottomTtooltipTimeout);
			$("#bottomTtooltip").html("").hide(0).removeAttr("style");
		}
	});
	$scope.mapImage = JSON.parse(localStorage.getItem("mogoBleLastVenueImage"));
	$scope.nextConferences = aroundGetNextConferences($scope, $rootScope, $location, $route);
	$scope.aroundMeGetConferenceDetails = function(conferenceId){aroundMeGetConferenceDetails($scope, $rootScope, $location, $route, conferenceId);}
	$scope.aroundMeShowHideNextConferences = function(){aroundMeShowHideNextConferences($scope, $rootScope, $location, $route, true);}
	
	$("#aroundMeNextConferences").css("top", ($(window).height() - 39) + "px");
	$("#aroundMeNextConferences .arrow").css("left", ($(window).width() * 0.45 - 50) + "px");
}

function aroundGetNextConferences(scope, rootScope, location, route){
	var conferences = rootScope.allConferences;
	conferences.sort(function (a, b){
		var t1 = a.realTime;
		var t2 = b.realTime; 
		return ((t1 < t2) ? -1 : ((t1 > t2) ? 1 : 0));
	});
	var nextConferences = [];
	for(var i = 0; i < conferences.length; i++){
		if(conferences[i].realTime == conferences[0].realTime){
			var len = nextConferences.length;
			nextConferences[nextConferences.length] = conferences[i];
		}
	}
	return nextConferences;
}

function aroundMeShowHideNextConferences(scope, rootScope, location, route, animate){
	if($("#aroundMeNextConferences .list-group").is(":visible")){
		if(animate){
			$("#aroundMeNextConferences").css({
				"-webkit-transform":"translate3d(0px, 0px, 0px)",
				"-webkit-transition": "-webkit-transform 500ms ease",
				"opacity": "1"
			});
			setTimeout(function(){
				$("#aroundMeNextConferences .list-group").hide(0).removeAttr("style");
				$("#aroundMeNextConferences .arrow span").removeClass("chevron-down").addClass("chevron-up");
				$("#aroundMeNextConferences .arrow").removeClass("opened");
				$("#snap-content").css("overflow", "");
			}, 500);
		}
		else{
			$("#aroundMeNextConferences").css({
				"-webkit-transform":"translate3d(0px, 0px, 0px)",
				"-webkit-transition": "-webkit-transform 0ms ease",
				"opacity": "1"
			});
			$("#aroundMeNextConferences .list-group").hide(0).removeAttr("style");
			$("#aroundMeNextConferences .arrow span").removeClass("chevron-down").addClass("chevron-up");
			$("#aroundMeNextConferences .arrow").removeClass("opened");
			$("#snap-content").css("overflow", "");
		}
	}
	else{
		if(animate){
			$("#snap-content").css("overflow", "hidden");
			$("#aroundMeNextConferences .list-group").css({
				"max-height": $(window).height() / 2,
				"overflow": "auto"
			}).show(0);
			$("#aroundMeNextConferences").css({
				"-webkit-transform":"translate3d(0px, -" + $("#aroundMeNextConferences .list-group").height() + "px, 0px)",
				"-webkit-transition": "-webkit-transform 500ms ease",
				"opacity": "0.9"
			});
			$("#aroundMeNextConferences .arrow").addClass("opened");
			setTimeout(function(){
				$("#aroundMeNextConferences .arrow span").removeClass("chevron-up").addClass("chevron-down");
			}, 500);
		}
		else{
			$("#snap-content").css("overflow", "hidden");
			$("#aroundMeNextConferences .list-group").css({
				"max-height": $(window).height() / 2,
				"overflow": "auto"
			}).show(0);
			$("#aroundMeNextConferences").css({
				"-webkit-transform":"translate3d(0px, -" + $("#aroundMeNextConferences .list-group").height() + "px, 0px)",
				"-webkit-transition": "-webkit-transform 0ms ease",
				"opacity": "0.9"
			});
			$("#aroundMeNextConferences .arrow").addClass("opened");
			$("#aroundMeNextConferences .arrow span").removeClass("chevron-up").addClass("chevron-down");
		}
	}
}

function aroundMeGetConferenceDetails(scope, rootScope, location, route, conferenceId){
	for(var i = 0; i < rootScope.allConferences.length; i++){
		if(rootScope.allConferences[i].id == conferenceId){
			rootScope.conferenceDetails = rootScope.allConferences[i];
			navigateToPage(scope, rootScope, location, route, "conferenceDetails");
			break;
		}
	}
}

// BLE functions
var aroundMeScanTimer;
var aroundMeScanInterval;
var aroundMeBle = {
	initializeBluetoothScan: function(scope, rootScope, location, route){
		$("#bottomTtooltip").html(rootScope.resourceBundle.message_tryLocateYou).show(0).css({
			"height": 50,
			"-webkit-transform":"translate3d(0px, -50px, 0px)",
			"-webkit-transition": "-webkit-transform 500ms ease",
			"opacity": "0.9"
		});
		bottomTtooltipTimeout = setTimeout(function(){
			clearTimeout(bottomTtooltipTimeout);
			$("#bottomTtooltip").css({
				"-webkit-transform":"translate3d(0px, 0px, 0px)",
				"-webkit-transition": "-webkit-transform 500ms ease",
				"opacity": "1"
			});
			setTimeout(function(){
				$("#bottomTtooltip").html("").hide(0).removeAttr("style");
			}, 500);
		}, 5000);
		aroundMeBle.startBluetoothScan(scope, rootScope, location, route);
		aroundMeScanInterval = setInterval(function(){aroundMeBle.startBluetoothScan(scope, rootScope, location, route);}, scanInterval);
	},
	cancelBluetoothScan: function(){
		bluetoothle.stopScan();
		if(aroundMeScanTimer && aroundMeScanTimer != null){
			clearTimeout(aroundMeScanTimer);
		}
		if(aroundMeScanInterval && aroundMeScanInterval != null){
			clearInterval(aroundMeScanInterval);
		}
	},
	startBluetoothScan: function(scope, rootScope, location, route){
		scope.beaconConferences = [];
		var success = function(response){
			aroundMeBle.successBluetoothScan(scope, rootScope, location, route, response)
		}
		bluetoothle.startScan(success, null, {"serviceUuids":[]});
	},
	stopBluetoothScan: function(scope, rootScope, location, route){
		bluetoothle.stopScan();
		if(aroundMeScanTimer && aroundMeScanTimer != null){
			clearTimeout(aroundMeScanTimer);
		}
		if(scope.beaconConferences.length == 0){
			if(aroundMeScanInterval && aroundMeScanInterval != null){
				clearInterval(aroundMeScanInterval);
			}
			$("#aroundMeLocation").hide(0);
			aroundMeCalculateDestinationDistance(scope, rootScope, location, route);
		}
		else{
			var imageInfo = JSON.parse(localStorage.getItem("mogoBleLastvenueImageInfo"));
			var roomsCoordinates = imageInfo.roomsCoordinates;
			var originalImageDimensions = imageInfo.originalImageDimensions;
			scope.beaconConferences.sort(function (a, b){
				var t1 = a.distance;
				var t2 = b.distance; 
				return ((t1 < t2) ? -1 : ((t1 > t2) ? 1 : 0));
			});
			var newImageDimensions = {
				width: $(window).width(),
				height: $(window).width() * originalImageDimensions.height / originalImageDimensions.width
			};
			$("#aroundMeLocation").show(0);
			var index = -1;
			for(var i = 0; i < roomsCoordinates.length; i++){
				if(roomsCoordinates[i].name == scope.beaconConferences[0].room){
					index = i;
					break;
				}
			}
			if(index >= 0){
				$("#aroundMeLocation").css("position", "absolute");
				$("#aroundMeLocation").css("left", newImageDimensions.width * roomsCoordinates[index].location.x / originalImageDimensions.width);
				$("#aroundMeLocation").css("top", newImageDimensions.height * roomsCoordinates[index].location.y / originalImageDimensions.height + 52);
			}
		}
	},
	successBluetoothScan: function(scope, rootScope, location, route, response){
		if(response && response.status && response.status == "scanStarted"){
			aroundMeScanTimer = setTimeout(function(){aroundMeBle.stopBluetoothScan(scope, rootScope, location, route);}, scanTime);
		}
		else if(response && response.status && response.status == "scanResult"){
			if(!aroundMeBle.existAddressInBeacons(scope, rootScope, location, route, response)){
				var info = aroundMeBle.getBeaconInformation(scope, rootScope, location, route, response);
				var index = aroundMeBle.existConferenceForBeacon(scope, rootScope, location, route, info.proximityUuid);
				if(index >= 0){
					var len = scope.beaconConferences.length;
					scope.beaconConferences[len] = rootScope.allConferences[index];
					scope.beaconConferences[len].distance = parseInt(info.distance * 1000) / 1000;
					scope.beaconConferences[len].address = info.address;
				}
			}
		}
	},
	existAddressInBeacons: function(scope, rootScope, location, route, obj){
		for(var i = 0; i < scope.beaconConferences.length; i++){
			if(scope.beaconConferences[i].address == obj.address){
				return true;
			}
		}
		return false;
	},
	existConferenceForBeacon: function(scope, rootScope, location, route, uuid){
		for(var i = 0; i < rootScope.allConferences.length; i++){
			if(rootScope.allConferences[i].ibeacon){
				if(rootScope.isAndroid && rootScope.allConferences[i].ibeacon.uuid == uuid)
					return i;
				if(!rootScope.isAndroid && rootScope.allConferences[i].ibeacon.name == uuid)
					return i;
			}
		}
		return -1;
	},
	getBeaconInformation: function(scope, rootScope, location, route, obj){
		var proximityUuid = "";
		var distance = -1;
		if(obj.advertisement){
            if(rootScope.isAndroid) {
                var advertisement = bluetoothle.encodedStringToBytes(obj.advertisement);
                proximityUuid = aroundMeBle.convertToHex(advertisement["9"]);
                proximityUuid += aroundMeBle.convertToHex(advertisement["10"]);
                proximityUuid += aroundMeBle.convertToHex(advertisement["11"]);
                proximityUuid += aroundMeBle.convertToHex(advertisement["12"]);
                proximityUuid += "-";
                proximityUuid += aroundMeBle.convertToHex(advertisement["13"]) + aroundMeBle.convertToHex(advertisement["14"]);
                proximityUuid += "-";
                proximityUuid += aroundMeBle.convertToHex(advertisement["15"]) + aroundMeBle.convertToHex(advertisement["16"]);
                proximityUuid += "-";
                proximityUuid += aroundMeBle.convertToHex(advertisement["17"]) + aroundMeBle.convertToHex(advertisement["18"]);
                proximityUuid += "-";
                proximityUuid += aroundMeBle.convertToHex(advertisement["19"]);
                proximityUuid += aroundMeBle.convertToHex(advertisement["20"]);
                proximityUuid += aroundMeBle.convertToHex(advertisement["21"]);
                proximityUuid += aroundMeBle.convertToHex(advertisement["22"]);
                proximityUuid += aroundMeBle.convertToHex(advertisement["23"]);
                proximityUuid += aroundMeBle.convertToHex(advertisement["24"]);

                var txPower = parseInt(parseFloat(advertisement["29"])) - 256;
				distance = aroundMeBle.calculateDistance(parseFloat(obj.rssi), txPower);
            }
			else{
				var data = obj.advertisement.split('/');
                proximityUuid = data[0];
				var txPower = parseInt(parseFloat(data[1]));
				var ratio_db = txPower - obj.rssi;
				var ratio_linear = Math.pow(10, ratio_db / 10);
				distance = Math.sqrt(ratio_linear);
			}
		}
		return {
			address: obj.address,
			proximityUuid: proximityUuid,
			distance: distance
		}
	},
	convertToHex: function(number){
		if(number < 16)
			return "0" + number.toString(16);
		return number.toString(16);
	},
	calculateDistance: function(rssi, txPower){
		if (rssi == 0) {
			return -1.0; // if we cannot determine accuracy, return -1.
		}
		var ratio = rssi * 1.0 / txPower;
		if (ratio < 1.0) {
			return Math.pow(ratio,10);
		}
		else {
			var accuracy =  (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
			return accuracy;
		}
	}
};

// Geolocation functions
var aroundMeMap;
var aroundMeMyLocation;

function aroundMeCalculateDestinationDistance(scope, rootScope, location, route){
	aroundMeMap.getMyLocation(function(myLocation) {
		aroundMeMyLocation = myLocation.latLng;
		var request = {
			"address": localStorage.getItem("destinationAddress")
		};
		aroundMeMap.geocode(request, function(results) {
			if (results.length) {
				var destinationPosition = results[0].position;
				var lat1 = aroundMeMyLocation.lat;
				var lng1 = aroundMeMyLocation.lng;
				var lat2 = destinationPosition.lat;
				var lng2 = destinationPosition.lng;

				var R = 6371000; // m
				var φ1 = lat1.toRadians();
				var φ2 = lat2.toRadians();
				var Δφ = (lat2 - lat1).toRadians();
				var Δλ = (lng2 - lng1).toRadians();

				var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
						Math.cos(φ1) * Math.cos(φ2) *
						Math.sin(Δλ/2) * Math.sin(Δλ/2);
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

				var d = R * c;
				if(d < maxAcceptedDistance){
					$("#modalConfirm .modal-body").html(rootScope.resourceBundle.message_noBeacon);
					$("#modalConfirm #modalConfirmYes").unbind().hide();
					$("#modalConfirm #modalConfirmNo").html(rootScope.resourceBundle.buttonOk).unbind();
					$("#modalConfirm").css("top", ($(window).height() / 2) - 100).modal("show");
				}
				else{
					if(d < maxGeocodingDistance){
						$("#modalConfirm .modal-body").html(rootScope.resourceBundle.message_venueDirection);
						$("#modalConfirm #modalConfirmYes").unbind().show().bind("click", function(){
							$("#modalConfirm").modal("hide");
							aroundMeReverseGeocodeMyLocation();
						});
						$("#modalConfirm #modalConfirmNo").html(rootScope.resourceBundle.buttonNo).unbind();
						$("#modalConfirm").css("top", ($(window).height() / 2) - 100).modal("show");
					}
					else{
						$("#modalConfirm .modal-body").html(rootScope.resourceBundle.message_venueHelp1 + parseInt(d / 1000) + rootScope.resourceBundle.message_venueHelp2);
						$("#modalConfirm #modalConfirmYes").unbind().hide();
						$("#modalConfirm #modalConfirmNo").html(rootScope.resourceBundle.buttonOk).unbind();
						$("#modalConfirm").css("top", ($(window).height() / 2) - 100).modal("show");
					}
				}
			}
		}, function(results) {
			$("#modalConfirm .modal-body").html(rootScope.resourceBundle.message_location);
			$("#modalConfirm #modalConfirmYes").unbind().hide();
			$("#modalConfirm #modalConfirmNo").html(rootScope.resourceBundle.buttonOk).unbind();
			$("#modalConfirm").css("top", ($(window).height() / 2) - 100).modal("show");
		});
	},
	function() {
		$("#modalConfirm .modal-body").html(rootScope.resourceBundle.message_location);
		$("#modalConfirm #modalConfirmYes").unbind().hide();
		$("#modalConfirm #modalConfirmNo").html(rootScope.resourceBundle.buttonOk).unbind();
		$("#modalConfirm").css("top", ($(window).height() / 2) - 100).modal("show");
	});
}


function aroundMeReverseGeocodeMyLocation(scope, rootScope, location, route){
	var request = {
		"position": aroundMeMyLocation
	};
	aroundMeMap.geocode(request, function(results) {
		if (results.length) {
			var result = results[0];
			var address = "";
			address += result.subThoroughfare ? result.subThoroughfare + ", " : "";
			address += result.thoroughfare ? result.thoroughfare + ", " : "";
			address += result.locality ? result.locality + ", " : "";
			address += result.adminArea ? result.adminArea + ", " : "";
			address += result.country ? result.country : "";
			plugin.google.maps.external.launchNavigation({
				"from": address,
				"to": localStorage.getItem("destinationAddress")
			});
		}
		else{
			$("#modalConfirm .modal-body").html(rootScope.resourceBundle.message_location);
			$("#modalConfirm #modalConfirmYes").unbind().hide();
			$("#modalConfirm #modalConfirmNo").html(rootScope.resourceBundle.buttonOk).unbind();
			$("#modalConfirm").css("top", ($(window).height() / 2) - 100).modal("show");
		}
	},function(results) {
		$("#modalConfirm .modal-body").html(rootScope.resourceBundle.message_location);
		$("#modalConfirm #modalConfirmYes").unbind().hide();
		$("#modalConfirm #modalConfirmNo").html(rootScope.resourceBundle.buttonOk).unbind();
		$("#modalConfirm").css("top", ($(window).height() / 2) - 100).modal("show");
	});
}