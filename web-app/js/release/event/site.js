$(document).ready(function() {
	// CSS3 rounded corners / shadows
	jQuery("div#header li.active a").css({ '-moz-border-radius': '6px', '-webkit-border-radius': '6px', 'border-radius': '6px' });
	jQuery("div.sidebar_box").css({ '-moz-border-radius': '8px', '-webkit-border-radius': '8px', 'border-radius': '8px' });
	jQuery("div.search_box").css({ '-moz-border-radius': '8px', '-webkit-border-radius': '8px', 'border-radius': '8px' });
	jQuery("div#price_table table").css({ '-moz-border-radius': '8px', '-webkit-border-radius': '8px', 'border-radius': '8px' });
	jQuery("div#tickets_table table").css({ '-moz-border-radius': '8px', '-webkit-border-radius': '8px', 'border-radius': '8px' });
	jQuery("span.highlight_dark, span.highlight_light").css({ '-moz-border-radius': '2px', '-webkit-border-radius': '2px', 'border-radius': '2px' });
	jQuery("div#about .team ul li a").css({ '-moz-border-radius': '8px', '-webkit-border-radius': '8px', 'border-radius': '8px' });
	jQuery("form .text_field").css({ '-moz-border-radius': '8px', '-webkit-border-radius': '8px', 'border-radius': '8px' });
	jQuery("a.button span").css({ 'text-shadow': '#000 0px -0px 2px' });
	jQuery("div#page .section_title h3").css({ 'text-shadow': '#3e2828 0px 0px 2px' });
	
	if (getHTTPParameter("store") != null) {
		localStorage.setItem('store', getHTTPParameter("store"));
	}
	if (displayLogoUrl) {
		// LOGO
		$('div#header a.logo').css('background-image','url("'+displayLogoUrl+'?store='+localStorage.getItem('store')+'&format=json")');
	}
	// Set pages urls
	$('div#header a.logo').attr('href',homePage+'?store='+localStorage.getItem('store'));
	$('div#header ul li#homePage a').attr('href',homePage+'?store='+localStorage.getItem('store'));
	$('div#header ul li#blogPage a').attr('href','http://iper2010.tumblr.com/?store='+localStorage.getItem('store'));
	$('div#footer ul li#footer_homePage a').attr('href',homePage+'?store='+localStorage.getItem('store'));
	$('div#footer ul li#footer_blogPage a').attr('href','http://iper2010.tumblr.com/?store='+localStorage.getItem('store'));
	
	// Default text field values
	jQuery(".text_field").focus(function(srcc)
  {
      if (jQuery(this).val() == jQuery(this)[0].title)
      {
          jQuery(this).addClass("default_text_active");
          jQuery(this).val("");
      }
  });
  jQuery(".text_field").blur(function()
  {
      if (jQuery(this).val() == "")
      {
          jQuery(this).removeClass("default_text_active");
          jQuery(this).val(jQuery(this)[0].title);
      }
  });
  jQuery(".text_field").blur();
	
	// Button Hover
	if(jQuery.browser.msie && jQuery.browser.version == "7.0") {
		jQuery(".button").css("padding-top", "0px");
	} else {
		jQuery('.button').hover(
			function() { jQuery(this).stop().animate({opacity:0.8},400); },
			function() { jQuery(this).stop().animate({opacity:1},400); }
		);
	}
	
	// Add form submit capability to buttons
	jQuery("a.submit").click(function() {
		jQuery(this).parent().submit();
	});

});

function getHTTPParameter(paramName) {
	var parameters = document.location.search;
	if (parameters != null && parameters.length > 0) {
		parameters = parameters.substring(1);
		var parametersArray = parameters.split("&");
		for (var i = 0; i < parametersArray.length; i++) {
			var param = parametersArray[i].split("=");
			if (param[0] == paramName) {				
				return decodeURI(param[1]);
			}
		}
	}
	return null;
}