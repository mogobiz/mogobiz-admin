var map = null;
var markers = null;
var proj4326 = new OpenLayers.Projection("EPSG:4326"); // transform from WGS 1984
var projmerc = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
var zoom = 12; // Default Zoom level
var activeFeature;
var activeResponse;

/**
 * Show and initialize map controls
 */
function showMap() {
	var options = {
		controls: [
			new OpenLayers.Control.Navigation({'zoomWheelEnabled': false}),
			new OpenLayers.Control.PanZoomBar(),
			new OpenLayers.Control.OverviewMap(),
			new OpenLayers.Control.KeyboardDefaults()
		],
		projection: projmerc,
        displayProjection: proj4326
    };
	
	if (map) {
		map.destroy();
	}
	
	map = new OpenLayers.Map("mapDiv", options);
	var newLayer = new OpenLayers.Layer.OSM();
    map.addLayer(newLayer);
    
    markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
    
    var lonLat = new OpenLayers.LonLat(2.3509871,48.8566667) // Center of the map
				.transform(proj4326, projmerc);
	map.setCenter(lonLat, zoom);
	
	// Create the Context Menu and attached it to the map
	var menu = new contextMenu({map:map});

	menu.addItem(contextMenu_zoomIn_label, function(map, lonlat){
		map.zoomTo(map.getZoom() + 1);
		map.panTo(lonlat.transform(proj4326, projmerc));
	});
	menu.addItem(contextMenu_zoomOut_label, function(map, lonlat){
		map.zoomTo(map.getZoom() - 1);
		map.panTo(lonlat.transform(proj4326, projmerc));
	});
	menu.addItem(contextMenu_center_label, function(map, lonlat){
		map.panTo(lonlat.transform(proj4326, projmerc));
	});
}

/**
 * Get all POIs
 */
function getAllPois(productId) {
	var dataToSend = "format=json";

	$('#mapDiv').showLoading();
	$.ajax({
		url : showPoiUrl + '?' + dataToSend,
		type : "GET",
		data : '',
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$.each(response, function(i, responseData) {
				// place poi markers on map
				if(eventMapProvider == "OPEN_STREET_MAP")
					placePoiMarker(responseData);
				else
					googleMapPlacePoiMarker(responseData);
			});
		}
	});
	$('#mapDiv').hideLoading();
}

/**
 * Place marker on a given location
 */
function placePoiMarker(response) {
	var lonLat = new OpenLayers.LonLat(response.longitude ,response.latitude).transform(proj4326, projmerc);
    
    // Marker Icon
    var icon, iconSize, iconOffset;
	if (response.picture && response.picture.length > 0 && response.pictureType) {
		iconSize = new OpenLayers.Size(32,37);
		iconOffset = new OpenLayers.Pixel(-(iconSize.w/2), -iconSize.h);
		icon = new OpenLayers.Icon("../images/markers/"+ response.pictureType +"/" + response.picture, iconSize, iconOffset);
	}
	else {
		iconSize = new OpenLayers.Size(21, 25);
		iconOffset = new OpenLayers.Pixel(-(iconSize.w / 2), -iconSize.h);
		icon = new OpenLayers.Icon("http://www.openstreetmap.org/openlayers/img/marker.png",iconSize, iconOffset);
	}
    
    var marker = new OpenLayers.Marker(lonLat, icon);
	var feature = new OpenLayers.Feature(markers, lonLat);
	marker.feature = feature;
	
	marker.events.register("mousedown", feature, function(evt) {
		if (activeFeature && activeFeature.popup) {
        	map.removePopup(activeFeature.popup);
        	activeFeature.popup = null;
    	}
    	getPoi(response.id, this);
        OpenLayers.Event.stop(evt);
    });
	
    markers.addMarker(marker);
    map.setCenter(lonLat);
}

/**
 * Get POI information
 */
function getPoi(poiId, feature) {
	var dataToSend = "id="+poiId+"&format=json";
	
	$.ajax({
		url : showPoiUrl + '?' + dataToSend,
		type : "GET",
		data : '',
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			poiInfo = response[0];
			
			// poiName_info
			if (poiInfo.name == null || poiInfo.name == "") {
				$('#poiInfoWindow #poiName_info').hide();
			}
			else {
				$('#poiInfoWindow #poiNameLabel').html(poiInfo.name);
				$('#poiInfoWindow #poiName_info').show();
			}
			// poiCountry_info
			if (poiInfo.country == null || poiInfo.country == "") {
				$('#poiInfoWindow #poiCountry_info').hide();
			}
			else {
				$('#poiInfoWindow #poiCountryLabel').html(poiInfo.country.name);
				$('#poiInfoWindow #poiCountry_info').show();
			}
			// poiCity_info
			if (poiInfo.city == null || poiInfo.city == "") {
				$('#poiInfoWindow #poiCity_info').hide();
			}
			else {
				$('#poiInfoWindow #poiCityLabel').html(poiInfo.city);
				$('#poiInfoWindow #poiCity_info').show();
			}
			// poiRoad_info
			if (poiInfo.road1 == null || poiInfo.road1 == "") {
				$('#poiInfoWindow #poiRoad_info').hide();
			}
			else {
				$('#poiInfoWindow #poiRoadLabel').html(poiInfo.road1);
				$('#poiInfoWindow #poiRoad_info').show();
			}
			// poiPostalCode_info
			if (poiInfo.postalCode == null || poiInfo.postalCode == "") {
				$('#poiInfoWindow #poiPostalCode_info').hide();
			}
			else {
				$('#poiInfoWindow #poiPostalCodeLabel').html(poiInfo.postalCode);
				$('#poiInfoWindow #poiPostalCode_info').show();
			}
			// poiDesc_info
			if (poiInfo.description == null || poiInfo.description == "") {
				$('#poiInfoWindow #poiDesc_info').hide();
			}
			else {
				$('#poiInfoWindow #poiDescLabel').html(shortTheString(poiInfo.description,200));
				$('#poiInfoWindow #poiDesc_info').show();
			}
			if(eventMapProvider == "OPEN_STREET_MAP"){
			    feature.closeBox = true;
			    var popupClass = OpenLayers.Class(OpenLayers.Popup.FramedCloud, {
			        "autoSize": true,
			        "closeOnMove": true,
			        "keepInMap": true,
			        "displayClass": "poiInfo"
			    });
			    feature.popupClass = popupClass;
			    feature.data.popupContentHTML = $('#poiInfoWindow').html();
			    feature.data.overflow = "visible";
			    feature.popup = feature.createPopup(feature.closeBox);
	            map.addPopup(feature.popup);
	            feature.popup.show();
	            
	            activeFeature = feature;
	            activeResponse = poiInfo;
	            
	            feature.popup.updateSize();
			}
			else{
				googleMapInfowindow = new google.maps.InfoWindow();
				googleMapInfowindow.setContent($('#poiInfoWindow').html());
				googleMapInfowindow.open(iperGoogleMap, feature);
			}
		}
	});
}