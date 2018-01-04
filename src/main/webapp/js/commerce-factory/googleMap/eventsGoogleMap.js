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
	contextmenuDir.innerHTML = "<a onclick='googleMapZoomIn()'><div>" + contextMenu_zoomIn_label + "<\/div><\/a>" +
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
	iperGoogleMap.setCenter(latLng);
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