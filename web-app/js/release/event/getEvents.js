$(document).ready(function() {
	localStorage.removeItem('ticketInformation');
	if(getHTTPParameter("store") != null) {
		listCarouselImages(getHTTPParameter("store"));
	}
});


function listCarouselImages(companyCode) {
	var dataToSend = "store="+companyCode;
	dataToSend += "&format=json";
	
	$.ajax({
		url : listCarouselImagesUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			var carouselPics = [];
			if (response) {
				$.each(response.filenames,function(i, filename){
					var res = new Object();
					res.id = i;
					res.content = "<div class='slide_inner'>" +
							"<a rel='fancyboxpackres' type = 'image' class='photo_link' title='" + filename + "' href='"+displayCarouselUrl+"?store="+companyCode+"&filename="+filename+"&format=json'>" +
								"<img title='" + filename + "'  src='"+displayCarouselUrl+"?store="+companyCode+"&filename="+filename+"&format=json' class='photo'/>" +
							"</a>" +
						"</div>";
					res.content_button = "<div class='thumb'><a class='photo_link'><img src='"+displayCarouselUrl+"?store="+companyCode+"&filename="+filename+"&format=json' alt=''/></a></div>";
					carouselPics[carouselPics.length] = res;
				});
				
				$("#designCarouselDiv").agile_carousel({
					// req info for the agile_carousel
					carousel_data : carouselPics,
					carousel_outer_height : 320,
					carousel_height : 320,
					slide_height: 320,
					carousel_outer_width : 960,
					slide_width : 960,
					// end req
					transition_type : "fade",
					transition_time : 2000,
					timer : 5000,
					continuous_scrolling : true,
					control_set_1 : "previous_button,numbered_buttons,next_button",
				});
				
				$("a[rel=fancyboxpackres]").fancybox({
					'transitionIn' : 'elastic',
					'transitionOut' : 'elastic',
					'titlePosition' : 'inside',
					'titleFormat' : function(title, currentArray, currentIndex, currentOpts) {
						return '<span id="fancybox-title-inside">Image ' + (currentIndex + 1) + ' / ' + currentArray.length
								+ (title.length ? ' &nbsp; ' + title : '') + '</span>';
					}
				});
			}
		}
	});
}