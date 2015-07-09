var iperGoogleMap;
var googleMapInfowindow = null;
var iperGoogleMapMarkers = [];

function showGoogleMap(){
    iperGoogleMap = null;
	var latlng = new google.maps.LatLng(48.8566667,2.3509871);
	var mapOptions = {
		center: latlng,
		zoom: 12,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.DEFAULT
		},
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	iperGoogleMap = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);

	google.maps.event.addListener(iperGoogleMap, "rightclick",function(event){GoogleMapShowContextMenu(event.latLng);});
	google.maps.event.addListener(iperGoogleMap, "click",function(event){$("#googleMapContextmenu").remove();});
}

function googleMapGetCanvasXY(currentLatLng){
	var scale = Math.pow(2, iperGoogleMap.getZoom());
	var nw = new google.maps.LatLng(
		iperGoogleMap.getBounds().getNorthEast().lat(),
		iperGoogleMap.getBounds().getSouthWest().lng()
	);
	var worldCoordinateNW = iperGoogleMap.getProjection().fromLatLngToPoint(nw);
	var worldCoordinate = iperGoogleMap.getProjection().fromLatLngToPoint(currentLatLng);
	var caurrentLatLngOffset = new google.maps.Point(
		Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
		Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
	);
	return caurrentLatLngOffset;
}

function googleMapSetMenuXY(currentLatLng){
	var mapWidth = $("#mapDiv").width();
	var mapHeight = $("#mapDiv").height();
	var menuWidth = $("#googleMapContextmenu").width();
	var menuHeight = $("#googleMapContextmenu").height();
	var clickedPosition = googleMapGetCanvasXY(currentLatLng);
	var x = clickedPosition.x ;
	var y = clickedPosition.y ;

	if((mapWidth - x ) < menuWidth)
		x = x - menuWidth;
	if((mapHeight - y ) < menuHeight)
		y = y - menuHeight;

	$('#googleMapContextmenu').css('left',x  );
	$('#googleMapContextmenu').css('top',y );
}

function GoogleMapShowContextMenu(currentLatLng) {
	var projection;
	var contextmenuDir;
	projection = iperGoogleMap.getProjection() ;
	$('#googleMapContextmenu').remove();
	contextmenuDir = document.createElement("div");
	contextmenuDir.id = "googleMapContextmenu";
	contextmenuDir.className = "googleMapContextmenu";
	contextmenuDir.innerHTML = "<a onclick='googleMapCreatePoi(\"" + currentLatLng.lat() + "\", \"" + currentLatLng.lng() + "\")'><div>" + contextMenu_create_label + "<\/div><\/a><div class='separator'></div>" +
			"<a onclick='googleMapZoomIn()'><div>" + contextMenu_zoomIn_label + "<\/div><\/a>" +
			"<a onclick='googleMapZoomOut()'><div class='brodered'>" + contextMenu_zoomOut_label + "<\/div><\/a>" +
			"<a onclick='googleMapCenterHere(\"" + currentLatLng.lat() + "\", \"" + currentLatLng.lng() + "\")'><div class='brodered'>" + contextMenu_center_label + "<\/div><\/a>";
	$(iperGoogleMap.getDiv()).append(contextmenuDir);

	googleMapSetMenuXY(currentLatLng);
	contextmenuDir.style.visibility = "visible";
}

function googleMapZoomIn(){
	iperGoogleMap.setZoom(iperGoogleMap.getZoom() + 1);
	$('#googleMapContextmenu').remove();
}

function googleMapZoomOut(){
	iperGoogleMap.setZoom(iperGoogleMap.getZoom() - 1);
	$('#googleMapContextmenu').remove();
}

function googleMapCenterHere(lat, lng){
	var latLng = new google.maps.LatLng(lat, lng);
	iperGoogleMap.setCenter(latLng);
	$('#googleMapContextmenu').remove();
}

function googleMapPlacePoiMarker(response){
	var latLng = new google.maps.LatLng(response.latitude, response.longitude);
	if (latestLonLat == null) {
		iperGoogleMap.setCenter(latLng);
    }
    else {
    	iperGoogleMap.setCenter(latestLonLat);
    }
	var iconPath = "http://maps.google.com/intl/en_us/mapfiles/ms/micons/red.png";
	var iconSize = {w: 32, h: 32};
	if (response.picture && response.picture.length > 0 && response.pictureType) {
		iconPath = "../images/markers/" + response.pictureType + "/" + response.picture;
		iconSize = {w: 32, h: 37}
	}
	var len = iperGoogleMapMarkers.length;
	iperGoogleMapMarkers[len] = new google.maps.Marker({
		position: latLng,
		map: iperGoogleMap,
		title: response.name,
		icon: {
			url: iconPath,
			size: new google.maps.Size(iconSize.w, iconSize.h)
		}
	});
	google.maps.event.addListener(iperGoogleMapMarkers[len], "rightclick",function(event){
		if(googleMapInfowindow){
			googleMapInfowindow.close();
			googleMapInfowindow = null;
		}
		getPoi(response.id, iperGoogleMapMarkers[len]);
	});
	google.maps.event.addListener(iperGoogleMapMarkers[len], "click",function(event){
		if(googleMapInfowindow){
			googleMapInfowindow.close();
			googleMapInfowindow = null;
		}
		getPoi(response.id, iperGoogleMapMarkers[len]);
	});
}

function googleMapCreatePoi(lat, lng) {
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
	    "location": new google.maps.LatLng(lat, lng)
	},
	function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var response = {};
			var addressTab = results[0].address_components;
			response = {
				display_name: results[0].formatted_address,
				lat: results[0].geometry.location.lat(),
				lon: results[0].geometry.location.lng(),
				address: {}
			};
			for(var j = 0; j < addressTab.length; j++){
				switch(addressTab[j].types[0]){
				case "country":
					response.address.country = addressTab[j].long_name;
					response.address.country_code = addressTab[j].short_name;
					break;
				case "locality":
					response.address.city = addressTab[j].long_name;
					break;
				case "administrative_area_level_1":
					response.address.state = addressTab[j].long_name;
					response.address.state_code = addressTab[j].short_name;
					break;
				case "postal_code":
					response.address.postcode = addressTab[j].long_name;
					break;
				case "street_number":
					response.address.streetnumber = addressTab[j].long_name;
					break;
				case "route":
					response.address.road = addressTab[j].long_name;
					break;
				}
			}
			$('#googleMapContextmenu').remove();
			showCreatePoiDialog(response);
		}
	});
}

function googleFindPoiAddress(address){
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
	    "address": address
	},
	function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			latestLonLat = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());;
			var addressTab = results[0].address_components;
			$('#poiLat').val(results[0].geometry.location.lat());
			$('#poiLng').val(results[0].geometry.location.lng());
			$('#poiRoad1').val(results[0].formatted_address);
			for(var i = 0; i < addressTab.length; i++){
				switch(addressTab[i].types[0]){
				case "country":
					$('#poiCountryName').val(addressTab[i].long_name);
					$('#poiCountryCode').val(addressTab[i].short_name);
					break;
				case "locality":
					$('#poiCity').val(addressTab[i].long_name);
					break;
				case "administrative_area_level_1":
					$('#poiRegionName').val(addressTab[i].long_name);
					$('#poiRegionCode').val(addressTab[i].short_name);
					break;
				case "postal_code":
					$('#poiPostalCode').val(addressTab[i].long_name);
					break;
				case "street_number":
					$('#poiRoadNum').val(addressTab[i].long_name);
					break;
				}
			}
			setTimeout(function() {
				createPoi(currentProductId);
				$('#poiDialog').parent().hideLoading();
				closePoiDialog();
			},500);
		}
	});
}

function googleMapRemoveMarkers(){
	for(var i = 0; i < iperGoogleMapMarkers.length; i++){
		iperGoogleMapMarkers[i].setMap(null);
	}
	iperGoogleMapMarkers = [];
}