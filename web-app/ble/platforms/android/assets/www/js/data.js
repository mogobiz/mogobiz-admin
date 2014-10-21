var dataXhr = null;
var dataFileEntry = null;
var dataFileUrl = null;
var dataDirEntry = null;
var dataDirUrl = null;

var dataConferences = [];
var dataConferencesDates = [];
var dataConferencesTimes = [];
var dataSpeakers = [];
var dataSpeakersLogo = [];

function dataDownloadZipFile(scope, rootScope, location, route) {
	if (noInternetConnection(scope, rootScope, location, route, true)) {
		return;
	}
	localStorage.setItem("destinationAddress", "67,rue du Faubourg Saint-Martin,75010,Paris,FR");

	$("#bottomTtooltip").html(rootScope.resourceBundle.label_loading + "...").show(0).css({
		"height": 50,
		"-webkit-transform": "translate3d(0px, -50px, 0px)",
		"-webkit-transition": "-webkit-transform 500ms ease",
		"opacity": "0.9"
	});
	$("#modalMask").modal("show");

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
		var fileTransfer = new FileTransfer();
		fileTransfer.onprogress = function (progressEvent) {
			if (progressEvent.lengthComputable) {
				var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
				$("#bottomTtooltip").html(perc + "% " + rootScope.resourceBundle.label_loaded);
			}
			else {
				var load = Math.floor(progressEvent.loaded / 1024);
				$("#bottomTtooltip").html(load + " " + rootScope.resourceBundle.label_bytes + " " + rootScope.resourceBundle.label_loaded);
			}
		};

		var zipFileUrl = serverUrl + serverCtrl + "zipStore?store=" + serverStore + "&date=" + eventStartDate + "&_=" + new Date().getTime();
		fileTransfer.download(
			zipFileUrl,
			fileSystem.root.toNativeURL() + serverStore + ".zip",
			function (fileEntry) {
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, function (fileSystem) {
					dataFileSystemSuccess(scope, rootScope, location, route, fileSystem);
				}, dataErrorFunction);
			},
			function (evt) {
				dataDownloadFailed(scope, rootScope, location, route, evt);
			}
		);
	}, dataErrorFunction);
}

function dataDownloadFailed(scope, rootScope, location, route, evt) {
	$("#modalMask").modal("hide");
	$("#bottomTtooltip").html(rootScope.resourceBundle.message_serverUnavailabbe).show(0).css({
		"height": 50,
		"-webkit-transform": "translate3d(0px, -50px, 0px)",
		"-webkit-transition": "-webkit-transform 500ms ease",
		"opacity": "0.9"
	});
	bottomTtooltipTimeout = setTimeout(function () {
		clearTimeout(bottomTtooltipTimeout);
		$("#bottomTtooltip").css({
			"-webkit-transform": "translate3d(0px, 0px, 0px)",
			"-webkit-transition": "-webkit-transform 500ms ease",
			"opacity": "1"
		});
		setTimeout(function () {
			$("#bottomTtooltip").html("").hide(0).removeAttr("style");
		}, 500);
	}, 2000);
}

function dataFileSystemSuccess(scope, rootScope, location, route, fileSystem) {
	fileSystem.root.getDirectory(serverStore, {create: true}, function (dirEntry) {
		dirEntry.removeRecursively();
		dataUnzipFile(scope, rootScope, location, route, fileSystem);
	});
}

function dataUnzipFile(scope, rootScope, location, route, fileSystem){
	fileSystem.root.getDirectory(serverStore, {create: true}, function (dirEntry) {
		dataDirUrl = dirEntry.toNativeURL();
		dataDirEntry = dirEntry;
		localStorage.removeItem("mogoBleDataDirUrl");
		localStorage.setItem("mogoBleDataDirUrl", dataDirUrl);
		fileSystem.root.getFile(serverStore + ".zip", {create: false}, function (fileEntry) {
			dataFileEntry = fileEntry;
			dataFileUrl = fileEntry.toNativeURL();
			zip.unzip(dataFileUrl, dataDirUrl, function (result) {
				if (result == 0) {
					window.resolveLocalFileSystemURI(
						dataDirUrl + serverStore + "/products",
						function (dirEntry) {
							dataConferences = [];
							dataConferencesDates = [];
							dataConferencesTimes = [];
							dataSpeakers = [];
							dataSpeakersLogo = [];
							dataReadConferencesDirectory(scope, rootScope, location, route, dirEntry)
						},
						dataErrorFunction
					);
				}
			});
		}, dataErrorFunction);
	}, dataErrorFunction);
}

function dataReadConferencesDirectory(scope, rootScope, location, route, dirEntry) {
	rootScope.allConferences = [];
	rootScope.tracks = [];
	rootScope.agendaDatesList = [];
	rootScope.agendaTimesList = [];
	var reader = dirEntry.createReader();
	reader.readEntries(function (entries) {
		dataSuccessReadConferencesDirectory(scope, rootScope, location, route, entries);
	}, dataFailedReadDirectory);
}

function dataSuccessReadConferencesDirectory(scope, rootScope, location, route, entries) {
	for (i = 0; i < entries.length; i++) {
		entries[i].file(function (file) {
				var reader = new FileReader();
				reader.onloadend = function (e) {
					var obj = JSON.parse(reader.result);
					if (file.name.indexOf("product_") == 0) {
						dataConferences[dataConferences.length] = obj;
					}
					else if (file.name.indexOf("dates_product_") == 0) {
						dataConferencesDates[dataConferencesDates.length] = obj;
					}
					else if (file.name.indexOf("date_product_") == 0) {
						var fileName = file.name.split(".")[0];
						var parts = fileName.split("_");
						dataConferencesTimes[dataConferencesTimes.length] = {
							conferenceId: parts[2],
							date: obj[0].date,
							startTime: obj[0].startTime,
							endTime: obj[0].endTime
						};
					}
					if (dataConferences.length + dataConferencesDates.length + dataConferencesTimes.length == entries.length) {
						rootScope.allConferences = dataConferences;
						rootScope.tracks = dataResolveTracks(rootScope.allConferences);

						for (var i = 0; i < dataConferencesTimes.length; i++) {
							for (var j = 0; j < rootScope.allConferences.length; j++) {
								if (dataConferencesTimes[i].conferenceId == rootScope.allConferences[j].id) {
									rootScope.agendaTimesList[rootScope.agendaTimesList.length] = {
										conference: rootScope.allConferences[j],
										date: dataConferencesTimes[i].date,
										startTime: dataConferencesTimes[i].startTime,
										endTime: dataConferencesTimes[i].endTime
									}
									rootScope.allConferences[j].realStartDate = dataConferencesTimes[i].date;
									rootScope.allConferences[j].realStartTime = dataConferencesTimes[i].startTime;
									rootScope.allConferences[j].realEndTime = dataConferencesTimes[i].endTime;
									var parts = dataConferencesTimes[i].date.split("/");
									var time = dataConferencesTimes[i].startTime.split(":");
									var theDate = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10), parseInt(time[0], 10), parseInt(time[1], 10), 0, 0);
									rootScope.allConferences[j].realTime = theDate.getTime();
									rootScope.allConferences[j].weekDay = smallWeekDays[theDate.getDay()];
									rootScope.allConferences[j].monthDay = theDate.getDate();
								}
							}
						}
						for (var i = 0; i < dataConferencesDates.length; i++) {
							for (var j = 0; j < dataConferencesDates[i].length; j++) {
								var index = dataExistDateIndex(scope, rootScope, location, route, dataConferencesDates[i][j]);
								if (index == -1) {
									var parts = dataConferencesDates[i][j].split("/");
									var date = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10), 0, 0, 0, 0);
									rootScope.agendaDatesList[rootScope.agendaDatesList.length] = {
										date: dataConferencesDates[i][j],
										time: date.getTime()
									};
								}
							}
						}
						rootScope.agendaDatesList.sort(function (a, b) {
							var time1 = a.time;
							var time2 = b.time;
							return ((time1 < time2) ? -1 : ((time1 > time2) ? 1 : 0));
						});
						window.resolveLocalFileSystemURI(
							dataDirUrl + serverStore + "/brands",
							function (dirEntry) {
								dataReadSpeakersDirectory(scope, rootScope, location, route, dirEntry)
							},
							dataErrorFunction
						);
					}
				};
				reader.onerror = function (e) {
				};
				reader.readAsText(file);
			},
			function (e) {
			});
	}
}

function dataReadSpeakersDirectory(scope, rootScope, location, route, dirEntry) {
	rootScope.speakers = [];
	var reader = dirEntry.createReader();
	reader.readEntries(function (entries) {
		dataSuccessReadSpeakersDirectory(scope, rootScope, location, route, entries);
	}, dataFailedReadDirectory);
}

function dataSuccessReadSpeakersDirectory(scope, rootScope, location, route, entries) {
	for (i = 0; i < entries.length; i++) {
		if (entries[i].isFile) {
			entries[i].file(function (file) {
					var reader = new FileReader();
					reader.onloadend = function (e) {
						var obj = JSON.parse(reader.result);
						dataSpeakers[dataSpeakers.length] = obj;
						if (dataSpeakers.length == entries.length - 1) {
							dataSpeakers.sort(function (a, b) {
								var name1 = a.name;
								var name2 = b.name;
								return ((name1 < name2) ? -1 : ((name1 > name2) ? 1 : 0));
							});
							rootScope.speakers = dataResolveSpeakersConferences(dataSpeakers, rootScope.allConferences);
							window.resolveLocalFileSystemURI(
								dataDirUrl + serverStore + "/venue",
								function (dirEntry) {
									dataReadVenueDirectory(scope, rootScope, location, route, dirEntry)
								},
								function () {
									dataFailedReadVenueDirectory(scope, rootScope, location, route)
								}
							);
						}
					};
					reader.onerror = function (e) {
					};
					reader.readAsText(file);
				},
				function (e) {
				});
		}
	}
}

function dataReadVenueDirectory(scope, rootScope, location, route, dirEntry) {
	var reader = dirEntry.createReader();
	reader.readEntries(function (entries) {
		dataSuccessReadVenueDirectory(scope, rootScope, location, route, entries);
	}, dataFailedReadDirectory);
}

function dataSuccessReadVenueDirectory(scope, rootScope, location, route, entries) {
	var imageLoaded = false;
	var coordinatesLoaded = false;
	for (i = 0; i < entries.length; i++) {
		entries[i].file(function (file) {
				var reader = new FileReader();
				var extension = file.name.split(".")[1];
				if (extension == "json") {
					reader.onloadend = function (e) {
						coordinatesLoaded = true;
						rootScope.venueImageInfo = JSON.parse(reader.result);
						if (imageLoaded) {
							updateLocalStorage(scope, rootScope, location, route);
						}
					};
					reader.onerror = function (e) {
					};
					reader.readAsText(file);
				}
				else {
					reader.onloadend = function (e) {
						imageLoaded = true;
						rootScope.venueImage = {url: reader.result};
						if (coordinatesLoaded) {
							updateLocalStorage(scope, rootScope, location, route);
						}
					};
					reader.onerror = function (e) {
					};
					reader.readAsDataURL(file);
				}
			},
			function (e) {
			});
	}
}

function dataFailedReadVenueDirectory(scope, rootScope, location, route) { // TO BE DELETED
	rootScope.venueImageInfo = {
		"roomsCoordinates": [{
			"location": {"x": 1038, "y": 330},
			"name": "(1)"
		},{
			"location": {"x": 1038, "y": 670},
			"name": "(2)"
		},{
			"location": {"x": 1038, "y": 945},
			"name": "Salon Parisien"
		},{
			"location": {"x": 1038, "y": 1195},
			"name": "Sponsor"
		},{
			"location": {"x": 1038, "y": 1425},
			"name": "Salon France"
		},{
			"location": {"x": 2300, "y": 1100},
			"name": "(7)"
		},{
			"location": {"x": 2300, "y": 1360},
			"name": "Petit salon"
		},{
			"location": {"x": 2300, "y": 1590},
			"name": "Accueil"
		}],
		"originalImageDimensions": {"width": 2700, "height": 2100}
	};
	rootScope.venueImage = {url: "images/map.png"};
	updateLocalStorage(scope, rootScope, location, route);
}

function dataFailedReadDirectory() {
	// TODO
}

function dataErrorFunction() {
	// TODO
}

function updateLocalStorage(scope, rootScope, location, route) {
	localStorage.removeItem("mogoBleConferencesList");
	localStorage.removeItem("mogoBleSpeakersList");
	localStorage.removeItem("mogoBleAgendaDatesList");
	localStorage.removeItem("mogoBleAgendaTimesList");
	localStorage.removeItem("mogoBleTracksList");
	localStorage.removeItem("mogoBleLastVenueImage");
	localStorage.removeItem("mogoBleLastvenueImageInfo");
	localStorage.removeItem("mogoBleLastRefreshDate");
	localStorage.removeItem("mogoBleLastRefreshAnswer");

	localStorage.setItem("mogoBleConferencesList", JSON.stringify(rootScope.allConferences));
	localStorage.setItem("mogoBleSpeakersList", JSON.stringify(rootScope.speakers));
	localStorage.setItem("mogoBleAgendaDatesList", JSON.stringify(rootScope.agendaDatesList));
	localStorage.setItem("mogoBleAgendaTimesList", JSON.stringify(rootScope.agendaTimesList));
	localStorage.setItem("mogoBleTracksList", JSON.stringify(rootScope.tracks));
	localStorage.setItem("mogoBleLastVenueImage", JSON.stringify(rootScope.venueImage));
	localStorage.setItem("mogoBleLastvenueImageInfo", JSON.stringify(rootScope.venueImageInfo));
	localStorage.setItem("mogoBleLastRefreshDate", new Date().getTime());
	rootScope.showRefreshMessage = false;
	dataReadSpeakersLogosDir(scope, rootScope, location, route);
	scope.$apply();

	dataFileEntry.remove();
	$("#modalMask").modal("hide");
	$("#bottomTtooltip").css({
		"-webkit-transform": "translate3d(0px, 0px, 0px)",
		"-webkit-transition": "-webkit-transform 500ms ease",
		"opacity": "1"
	});
	setTimeout(function () {
		$("#bottomTtooltip").html("").hide(0).removeAttr("style");
	}, 500);
}

function dataReadSpeakersLogosDir(scope, rootScope, location, route){
	window.resolveLocalFileSystemURI(
		dataDirUrl + serverStore + "/brands/logos",
		function (dirEntry) {
			dataReadSpeakersLogosDirectory(scope, rootScope, location, route, dirEntry)
		},
		function(){
			dataDownloadZipFile(scope, rootScope, location, route);
		}
	);
}

function dataReadSpeakersLogosDirectory(scope, rootScope, location, route, dirEntry) {
	var reader = dirEntry.createReader();
	reader.readEntries(function (entries) {
		dataSuccessReadSpeakersLogosDirectory(scope, rootScope, location, route, entries);
	}, dataFailedReadDirectory);
}

function dataSuccessReadSpeakersLogosDirectory(scope, rootScope, location, route, entries) {
	for (i = 0; i < entries.length; i++) {
		entries[i].file(function (file) {
				var reader = new FileReader();
				reader.onloadend = function (e) {
					var speakerId = file.name.split(".")[0];
					dataSpeakersLogo[dataSpeakersLogo.length] = {
						speakerId: speakerId,
						logo: reader.result
					}
					if (dataSpeakersLogo.length == entries.length) {
						dataResolveSpeakerLogo(scope, rootScope, location, route, dataSpeakersLogo);
					}
				};
				reader.onerror = function (e) {
				};
				reader.readAsDataURL(file);
			},
			function (e) {
			});
	}
}

/*
 dataExistDateIndex
 permet de tester si la date déjà existe dans la liste
 */
function dataExistDateIndex(scope, rootScope, location, route, date) {
	for (var i = 0; i < rootScope.agendaDatesList.length; i++) {
		if (rootScope.agendaDatesList[i].date == date)
			return i;
	}
	return -1;
}

/*
 dataResolveTracks
 permet de regrouper la liste des conference par tags
 */
function dataResolveTracks(list) {
	var newList = [];
	for (var i = 0; i < list.length; i++) {
		if (list[i].tags) {
			for (var j = 0; j < list[i].tags.length; j++) {
				var track = list[i].tags[j].name;
				var index = dataExistTrackIndex(newList, track);
				if (index == -1) {
					index = newList.length;
					newList[index] = {
						track: track,
						conferences: []
					}
				}
				newList[index].conferences[newList[index].conferences.length] = list[i];
			}
		}
	}
	newList.sort(function (a, b){
		var name1 = a.track;
		var name2 = b.track;
		return ((name1 < name2) ? -1 : ((name1 > name2) ? 1 : 0));
	});
	return newList;
}

/*
 dataExistTrackIndex
 cette méthode test si déjà on a des conference dans ce track ou non
 */
function dataExistTrackIndex(list, track) {
	for (var i = 0; i < list.length; i++) {
		if (list[i].track == track)
			return i;
	}
	return -1;
}

/*
 dataResolveSpeakersConferences
 permet d'arranger pour chaque speaker sa liste des conferences
 */
function dataResolveSpeakersConferences(speakers, conferences) {
	var list = [];
	for (var i = 0; i < speakers.length; i++) {
		var len = list.length
		list[len] = speakers[i];
		list[len].speakerConferences = [];
		for (var j = 0; j < conferences.length; j++) {
			if (conferences[j].brand && conferences[j].brand.id == list[len].id) {
				list[len].speakerConferences[list[len].speakerConferences.length] = conferences[j];
			}
		}
	}
	return list;
}

/*
 dataResolveSpeakerLogo
 permet de mettre le bon logo du speaker
 dans la liste des speakers et celle des conferences
 */
function dataResolveSpeakerLogo(scope, rootScope, location, route, list) {
	for (var i = 0; i < rootScope.speakers.length; i++) {
		var index = dataSpeakerHasLogo(list, rootScope.speakers[i].id);
		if(index < 0){
			rootScope.speakers[i].logo = "images/no_image.gif";
			for (var j = 0; j < rootScope.allConferences.length; j++) {
				if (rootScope.allConferences[j].brand && rootScope.allConferences[j].brand.id == rootScope.speakers[i].id) {
					rootScope.allConferences[j].brand.logo = "images/no_image.gif";
				}
			}
		}
		else{
			$("<img/>").attr("index", i).attr("src", list[index].logo).load(function() {
				var imgElement = this;
				var canvas = document.createElement("canvas");
				canvas.width = 50;
				canvas.height = 50;
				var ctx = canvas.getContext("2d");
				ctx.scale(50 / this.width, 50 / this.height);
				ctx.drawImage(imgElement, 0, 0);
				var logo = canvas.toDataURL();
				var speakerIndex = $(this).attr("index");
				rootScope.speakers[speakerIndex].logo = logo;

				for (var j = 0; j < rootScope.allConferences.length; j++) {
					if (rootScope.allConferences[j].brand && rootScope.allConferences[j].brand.id == rootScope.speakers[speakerIndex].id) {
						rootScope.allConferences[j].brand.logo = logo;
					}
				}
			});
		}
	}
}

/*
 dataSpeakerHasLogo
 cette méthode test si le logo a un logo ou non
 */
function dataSpeakerHasLogo(list, speakerId) {
	for (var i = 0; i < list.length; i++) {
		if (list[i].speakerId == speakerId)
			return i;
	}
	return -1;
}

/*
 dataCheckForNewSchedule
 cette méthode test si on a un nouveau schedule
 */
function dataCheckForNewSchedule(scope, rootScope, location, route) {
	var success = function (response) {
		if (response == "true") {
			$("#modalConfirm .modal-body").html(rootScope.resourceBundle.message_newSchedule);
			$("#modalConfirm #modalConfirmYes").unbind().show().bind("click", function () {
				$("#modalConfirm").modal("hide");
				dataDownloadZipFile(scope, rootScope, location, route);
			});
			$("#modalConfirm #modalConfirmNo").html(rootScope.resourceBundle.buttonNo).unbind().bind("click", function () {
				localStorage.setItem("mogoBleLastRefreshAnswer", "no");
				rootScope.showRefreshMessage = true;
				scope.$apply();
				if (location.path() == "/home") {
					$("#bottomTtooltip").html(rootScope.resourceBundle.menu_refreshSchedule + "<div class='arrow-body'></div><div class='triangle-down'>").show(0).css({
						"height": 50,
						"-webkit-transform": "translate3d(0px, -50px, 0px)",
						"-webkit-transition": "-webkit-transform 500ms ease",
						"opacity": "0.9"
					});
				}
			});
			$("#modalConfirm").css("top", ($(window).height() / 2) - 100).modal("show");
		}
	};
	callServer("isNewVersionAvailable", "store=" + serverStore + "&millis=" + localStorage.getItem("mogoBleLastRefreshDate"), success);
	setTimeout(function () {
		dataCheckForNewSchedule(scope, rootScope, location, route);
	}, 86400000);
}