var map = null;
var markers = null;
var proj4326 = new OpenLayers.Projection("EPSG:4326"); // transform from WGS 1984
var projmerc = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
var zoom = 12; // Default Zoom level
var latestLonLat = null;
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
	
	// Add items to the menu
	menu.addItem(contextMenu_create_label, function(map, lonlat){
		createPoiOnMap(lonlat);
	});
	menu.addSeparator();
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
	currentProductId = productId;
	
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
				if(sellerCompanyMapProvider == "OPEN_STREET_MAP")
					placePoiMarker(responseData);
				else
					googleMapPlacePoiMarker(responseData);
			});
			latestLonLat = null;
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
	if (latestLonLat == null) {
		map.setCenter(lonLat);
	}
	else {
		map.setCenter(latestLonLat);
	}
}

/**
 * Get POI information
 */
function getPoi(poiId, feature) {
	var dataToSend = "id=" + poiId + "&format=json";
	
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
			
			if(sellerCompanyMapProvider == "OPEN_STREET_MAP"){
				var lonLat = new OpenLayers.LonLat(poiInfo.longitude ,poiInfo.latitude).transform(proj4326, projmerc);
				latestLonLat = lonLat;
				
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
			}
			else{
				latestLonLat = new google.maps.LatLng(poiInfo.latitude, poiInfo.longitude);;
				googleMapInfowindow = new google.maps.InfoWindow();
				googleMapInfowindow.setContent($('#poiInfoWindow').html());
				googleMapInfowindow.open(iperGoogleMap, feature);
			}
			activeFeature = feature;
			activeResponse = poiInfo;
		}
	});
}

function openStreetMapEditPoiDialog() {
    showEditPoiDialog(activeResponse, activeFeature);
}

/**
 * Open POI edit dialog
 * @param response
 */
function showEditPoiDialog(response, feature) {
	$.get(poiDialogPageUrl, function(responseText) {
		if ($('#poiDialog').dialog( "isOpen" ) !== true) {
			htmlresponse = jQuery.trim(responseText);
			$('#poiDialog').empty();
			$('#poiDialog').html(htmlresponse);
			$('#poiDialog').dialog({
				width : 'auto',
				height : 'auto',
				title: poiEdit_label,
				resizable: false,
				modal:true,
				open: function(event) {
					// Fill the edit form with data
					fillPoiEditForm(response);
					$('#poiAdress').attr('readonly','readonly');
					$('#poiAdress').addClass('poiAddressReadOnly');

					$("#poiTabs .tabs a").unbind();
					$("#poiTranslationTab").removeClass("disabled");
					$("#poiTranslationDiv").hide();
					$("#poiGeneralTab").addClass("selected");
					$("#poiTabs .tabs a").click(function() {
						$("#poiTabs .tabs .selected").removeClass("selected");
						$(this).addClass("selected");
						switch($(this).attr("id")){
						case "poiGeneralTab":
							$("#poiTranslationDiv").hide();
							$("#creatPoiDiv").show();
							break;
						case "poiTranslationTab":
							$("#creatPoiDiv").hide();
							$("#poiTranslationDiv").show();
							break;
						default:
							break;
						}
					});

					$('.ui-dialog-buttonpane').find('button:contains("deleteLabel")').addClass("ui-delete-button");
					$('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
					$('.ui-dialog-buttonpane').find('button:contains("updateLabel")').addClass("ui-update-button");
					$('.ui-dialog-buttonpane').find('button:contains("deleteLabel")').html('<span class="ui-button-text">'+deleteLabel+'</span>');
					$('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">'+cancelLabel+'</span>');
					$('.ui-dialog-buttonpane').find('button:contains("updateLabel")').html('<span class="ui-button-text">'+updateLabel+'</span>');
				},
				buttons : {
					deleteLabel : function() {
						deletePoi(currentProductId, response.id, feature);
						closePoiDialog();
					},
					cancelLabel : function() {
						closePoiDialog();
					},
					updateLabel : function() {
						if(validatePoiInfo()) {
							updatePoi(currentProductId, response.id, feature);
							closePoiDialog();
						}
					}
				}
			});
		}
	}, "html");
}

/**
 * Fill the POI Edit form with data
 * @param response
 */
function fillPoiEditForm(response) {
	var poiEncoded = $.toJSON(response);
	var poiFormValues = poiEncoded;

	poiFormValues = poiFormValues.replace(/(^\s+|\s+$)/, '');
	poiFormValues = "(" + poiFormValues + ");";
	try	{
		var poiJson = eval(poiFormValues);
		poiTranslationDrawAll(poiJson.id);
		var newPoiJson = new Object();
        console.log(poiJson)
		for(var key in poiJson){
			var newKey;
			newKey = "poi."+key;
			if(key=='poiType'){
				if(poiJson[key]){
					newPoiJson[newKey] = poiJson[key].code;
				}
			}
			else if(key=='countryCode'){
				if(poiJson[key]){
					newPoiJson["poi.country.code"] = poiJson[key];
				}
			}
			else if(key=='visibility'){
				if(poiJson[key]){
					newPoiJson[newKey] = poiJson[key].name;
				}
			}
			else{
				newPoiJson[newKey] = poiJson[key];
			}
		}
	}
	catch(err)	{
		('That appears to be invalid JSON!')
		return false;
	}
	var poiLocForm = document.forms['form_poiPrdLocation'];
	$(poiLocForm).populate(newPoiJson, {debug:1});
	var poiInfoForm = document.forms['form_poiPrdInfos'];
	$(poiInfoForm).populate(newPoiJson, {debug:1});
	$('#poiAdress').val(response.road1);
	$('#poiMain').prop('checked', newPoiJson["poi.isMain"]);
	$('#pictureTypeList').val(newPoiJson["poi.picture"]);
	$('#poiPictureImg').attr("src", "../images/markers/"+newPoiJson["poi.pictureType"]+"/"+newPoiJson["poi.picture"]);
}

/**
 * Close POI Dialog
 */
function closePoiDialog() {
	$('#poiDialog').empty();
	$('#poiDialog').dialog('close');
}

/**
 * Open POI Picture Dialog
 */
function openPoiPictureDialog() {
	$.get(poiPictureDialogPageUrl, function(responseText) {
		if ($('#poiPictureDialog').dialog( "isOpen" ) !== true) {
			htmlresponse = jQuery.trim(responseText);
			$('#poiPictureDialog').empty();
			$('#poiPictureDialog').html(htmlresponse);
			$('#poiPictureDialog').dialog({
				width : '450',
				height : '400',
				title: poiSelectIcon_label,
				resizable: false,
				modal:true,
				open: function(event) {
					// Fill the edit form with data
					loadPoiPictureTypes();
					$('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
					$('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">'+cancelLabel+'</span>');
				},
				buttons : {
					cancelLabel : function() {
						closePoiPictureDialog();
					}
				}
			});
		}
	}, "html");
}

/**
 * Load POI Picture Types
 */
function loadPoiPictureTypes() {
	var dataToSend = "format=json";
	$.ajax({
		url : listPoiTypesUrl + '?' + dataToSend,
		type : "GET",
		data : '',
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$("#pictureTypeList").get(0).options.length = 0;
			$.each(response, function(i, responseData) {
				var opt = new Option(responseData, responseData);
				$("#pictureTypeList").get(0).options[$("#pictureTypeList").get(0).options.length] = opt;
			});
			$('#pictureTypeList option:nth-child(1)').attr('selected', true);
			loadPoiPictures();
		}
	});
}

/**
 * load Poi Pictures
 */
function loadPoiPictures() {
	var pictureType = $("#pictureTypeList").val();
	var dataToSend = "format=json" + "&pictureType=" + pictureType;
	$.ajax({
		url : listPoiPicturesUrl + '?' + dataToSend,
		type : "GET",
		data : '',
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			$("#poiPictureDiv").empty();
			$.each(response, function(i, responseData) {
				var imgName = responseData.replace(".png", "");
				var imgTag = "<img title='"+imgName+"' src='"+"../images/markers/"+pictureType+"/"+responseData+"'>";
				var divImg = "<div style='float:left;height:44px;width:40px;'>"+imgTag+"</div>";
				var href = "<a href='javascript:void(0)' onclick='selectPoi(\""+responseData+"\")'>"+divImg+"</a>"
				$("#poiPictureDiv").append(href);
			});
		}
	});
}

function selectPoi(pngName) {
	var pictureType = $("#pictureTypeList").val();
	$("#poiPicture").val(pngName);
	$("#poiPictureType").val(pictureType);
	$("#poiPictureImg").attr("src", "../images/markers/"+pictureType+"/"+pngName);
	closePoiPictureDialog();
}

/**
 * Close POI Picture Dialog
 */
function closePoiPictureDialog() {
	$('#poiPictureDialog').empty();
	$('#poiPictureDialog').dialog('close');
}

/**
 * create
 */
function createPoi(productId) {
	var dataToSend = $('#poiPrdInfoForm').serialize(); // poi.name - poi.postalCode - poi.roadNum - poi.road1 - poi.description
	dataToSend += "&" + $('#poiPrdLocationForm').serialize(); // poi.country.name - poi.country.code - poi.city - poi.region.name - poi.region.code - poi.latitude - poi.longitude
	dataToSend += "&product.id="+productId;
	if($('#poiMain').is(':checked'))
		dataToSend += "&poi.isMain=true";
	dataToSend += "&format=json";
	
	$.ajax({
		url : createPoiUrl + '?' + dataToSend,
		type : "POST",
		noticeType : "POST",
		data : '',
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if(sellerCompanyMapProvider == "OPEN_STREET_MAP"){
				clearMapMarkers();
			}
			else{
				googleMapRemoveMarkers();
			}
			getAllPois(productId);
		}
	});
}

/**
 * update
 */
function updatePoi(productId, poiId, feature) {
	var dataToSend = "poi.id="+poiId;
	dataToSend += "&product.id="+productId;
	if($('#poiMain').is(':checked'))
		dataToSend += "&poi.isMain=true";
	dataToSend += "&" + $('#poiPrdInfoForm').serialize(); // poi.name - poi.postalCode - poi.roadNum - poi.road1 - poi.description
	dataToSend += "&" + $('#poiPrdLocationForm').serialize(); // poi.country.name - poi.country.code - poi.city - poi.region.name - poi.region.code - poi.latitude - poi.longitude
	dataToSend += "&format=json";

	$.ajax({
		url : updatePoiUrl + '?' + dataToSend,
		type : "POST",
		noticeType : "PUT",
		data : '',
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if(sellerCompanyMapProvider == "OPEN_STREET_MAP"){
				map.removePopup(feature.popup);
				feature.popup = null;
				clearMapMarkers();
			}
			else{
				googleMapInfowindow.close();
				googleMapInfowindow = null;
				googleMapRemoveMarkers();
			}
			getAllPois(productId);
		}
	});
}

/**
 * delete
 */
function deletePoi(productId, poiId, feature) {
	var dataToSend = "id="+poiId;
	dataToSend += "&format=json";
	
	$.ajax({
		url : deletePoiUrl + "?" + dataToSend,
		type : "POST",
		noticeType : "DELETE",
		data : '',
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if(sellerCompanyMapProvider == "OPEN_STREET_MAP"){
				map.removePopup(feature.popup);
				feature.popup = null;
				clearMapMarkers();
			}
			else{
				googleMapInfowindow.close();
				googleMapInfowindow = null;
				googleMapRemoveMarkers();
			}
			latestLonLat = null;
			getAllPois(productId);
		}
	});
}

/**
 * Remove all markers from the map
 */
function clearMapMarkers() {
	markers.destroy();
	markers = new OpenLayers.Layer.Markers( "Markers" );
	map.addLayer(markers);
}

/**
 * Open POI create dialog
 * In case of creation of new POI on map click, response will contain the results returned by reverse-geocoding
 * @param response (for creation on map click)
 */
function showCreatePoiDialog(response) {
	$.get(poiDialogPageUrl, function(responseText) {
		if ($('#poiDialog').dialog( "isOpen" ) !== true) {
			htmlresponse = jQuery.trim(responseText);
			$('#poiDialog').empty();
			$('#poiDialog').html(htmlresponse);
			$('#poiDialog').dialog({
				width : 'auto',
				height : 'auto',
				title: poiCreate_label,
				resizable: false,
				modal:true,
				open: function(event) {
					if (response) {
						$('#poiLat').val(response.lat);
						$('#poiLng').val(response.lon);
						$('#poiCountryName').val(response.address.country);
						$('#poiCountryCode').val(response.address.country_code);
						$('#poiCity').val(response.address.city);
						$('#poiRegionName').val(response.address.state);
						$('#poiRegionCode').val(response.address.state_code);
						$('#poiPostalCode').val(response.address.postcode);
						$('#poiRoadNum').val(response.address.streetnumber);
						$('#poiRoad1').val(response.address.road);
						

						$('#poiAdress').val(response.display_name);
						$('#poiAdress').attr('readonly','readonly');
						$('#poiAdress').addClass('poiAddressReadOnly');
					}
					$("#poiTabs .tabs a").unbind();
					$("#poiTranslationTab").removeClass("disabled");
					$("#poiTranslationDiv").hide();
					$("#poiGeneralTab").addClass("selected");
					$("#poiTranslationTab").addClass("disabled");
					$('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
					$('.ui-dialog-buttonpane').find('button:contains("createLabel")').addClass("ui-create-button");
					$('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">'+cancelLabel+'</span>');
					$('.ui-dialog-buttonpane').find('button:contains("createLabel")').html('<span class="ui-button-text">'+createLabel+'</span>');
				},
				buttons : {
					cancelLabel : function() {
						closePoiDialog();
					},
					createLabel : function() {
						if (validatePoiInfo()) {
							$('#poiDialog').parent().showLoading({'addClass': 'loading-indicator-SquaresCircleBig'});
							if (response) {
								createPoi(currentProductId);
								$('#poiDialog').parent().hideLoading();
								closePoiDialog();
							}
							else if(sellerCompanyMapProvider == "OPEN_STREET_MAP"){
								findPoiAddress($('#poiAdress').val());
							}
							else{
								googleFindPoiAddress($('#poiAdress').val());
							}
						}
					}
				}
			});
		}
	}, "html");
}

/**
 * Create new POI on map click
 */
function createPoiOnMap(clickedLonLat) {
	var dataToSend = "zoom=20";
	dataToSend += "&lat="+clickedLonLat.lat,
	dataToSend += "&lon="+clickedLonLat.lon,
	dataToSend += "&addressdetails=1",
	dataToSend += "&accept-language=en,fr",
	dataToSend += "&format=json";
	
	$.get("http://nominatim.openstreetmap.org/reverse" + "?" + dataToSend, function() {})
	.success(function(response) {
		if (!response || response.length < 1) {
			jQuery.noticeAdd({
				stayTime : 2000,
				text : 'NO RESPONSE',
				stay : false,
				type : 'error'
			});
		}
		else {
			map.panTo(clickedLonLat.transform(proj4326, projmerc));
			if(! response.address.state_code)
				response.address.state_code = response.address.state;
			showCreatePoiDialog(response);
		}
	})
	.error(function() {
		jQuery.noticeAdd({
			stayTime : 2000,
			text : 'ERROR',
			stay : false,
			type : 'error'
		});
	});
}

/**
 * Search for a given address
 */
function findPoiAddress(address) {
	var dataToSend = "q="+address;
	dataToSend += "&addressdetails=1",
	dataToSend += "&accept-language=en,fr",
	dataToSend += "&polygon=0",
	//dataToSend += "&limit=1",
	dataToSend += "&format=json";
	
	$.get("http://nominatim.openstreetmap.org/search" + "?" + dataToSend, function() {})
	.success(function(response) {
		if (!response || response.length < 1) {
			$('#poiDialog').parent().hideLoading();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : addressNotFound_label,
				stay : false,
				type : 'error'
			});
		}
		else {
			var lonLat = new OpenLayers.LonLat(response[0].lon ,response[0].lat).transform(proj4326, projmerc);
			latestLonLat = lonLat;
			
			$('#poiRoad1').val(response[0].road);
			$('#poiLat').val(response[0].lat);
			$('#poiLng').val(response[0].lon);
			$('#poiCountryName').val(response[0].address.country);
			$('#poiCountryCode').val(response[0].address.country_code);
			$('#poiCity').val(response[0].address.city);
			$('#poiPostalCode').val(response[0].address.postcode);
			//$('#poiRoadNum').val();
			$('#poiRegionName').val(response[0].address.state);
			//$('#poiRegionCode').val();
			
			setTimeout(function() {
				createPoi(currentProductId);
				$('#poiDialog').parent().hideLoading();
				closePoiDialog();
			},500);
		}
	})
	.error(function() {
		jQuery.noticeAdd({
			stayTime : 2000,
			text : 'ERROR',
			stay : false,
			type : 'error'
		});
	});
}

/**
 * Validate POI dialog info (check for missing fields)
 * @returns Boolean
 */
function validatePoiInfo() {
	var valid;
	if($('#poiName').val() == '') {
		valid = false;
		$('#poiName').focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : poiErrors_requiredName_label,
			stay : false,
			type : 'error'
		});
	}
	else if ($('#poiAdress').val() == '') {
		$('#poiAdress').focus();
		valid = false;
		jQuery.noticeAdd({
			stayTime : 2000,
			text : poiErrors_requiredAddress_label,
			stay : false,
			type : 'error'
		});
	}
	else if ($('#poiDescription').val().length > 1024) {
		$('#poiDescription').focus();
		valid = false;
		jQuery.noticeAdd({
			stayTime : 2000,
			text : poiErrors_longDescription_label,
			stay : false,
			type : 'error'
		});
	}
	else {
		valid = true;
	}
	return valid;
}

//TRANSLATION

var poiTranslationGrid = null;

function poiTranslationDrawAll(poiId){
	poiTranslationGrid = null;
	var successCallback = function (response){
		var fields = ["name", "description"];
		$("#poiTranslationAddLink").unbind();
		$("#poiTranslationAddLink").bind("click", function(){
            var defaultsData = {name: $("#poiName").val(), description: $("#poiDescription").val()};
            translationGetCreatePage("poi", poiId, fields, defaultsData);
        });
		var columns = [{field: "name", title: translationNameGridLabel},{field: "description", title: translationDescriptionGridLabel}];
		var data = [];
		for (var i = 0; i < response.length; i++) {
			var value = eval( "(" + response[i].value + ")" );
			data[data.length] = {
				"id" : response[i].id,
				"targetId": poiId,
				"translationType": "poi",
				"lang": response[i].lang,
				"type": response[i].type,
				"name": value.name,
				"description": value.description
			}
		}
		var tabVisible = $("#poiTranslationDiv").is(":visible");
		if(! tabVisible)
			$("#poiTranslationDiv").show();

		poiTranslationGrid = translationGetGrid("poiTranslationGrid", poiId, fields, columns, data);

		if(! tabVisible)
			$("#poiTranslationDiv").hide();
		$("#categoriesMain").hideLoading();
	};
	translationGetAllData("poi", poiId, successCallback);
}