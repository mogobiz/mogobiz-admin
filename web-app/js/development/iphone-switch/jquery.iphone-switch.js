/************************************************ 
*  jQuery iphoneSwitch plugin                   *
*                                               *
*  Author: Daniel LaBare                        *
*  Date:   2/4/2008                             *
************************************************/
/**
 * Updated on 27/8/2012
 * We have added the lines 38,60,63,67,71 in order this iphoneSwitch may handle may iphoneSwitch on same page.
 * The state variable is now being read from the span where the iphoneSwitch is created in order to know state of each
 * iphoneSwitch.
 * At the end we should store this new state at this span when we finish the process of changing the state.
 * We are also sending the id of the span in the callback functions, this id will be stored in the same span that we created
 * the iphoneSwitch.
 * Finally this span will store the state and the id of each switch.
 */
jQuery.fn.iphoneSwitch = function(start_state, switched_on_callback, switched_off_callback, options) {

	var state = start_state == 'on' ? start_state : 'off';
	
	// define default settings
	var settings = {
		mouse_over: 'pointer',
		mouse_out:  'default',
		switch_on_container_path: '../images/iphone-switch/iphone_switch_container_on.png',
		switch_off_container_path: '../images/iphone-switch/iphone_switch_container_off.png',
		switch_path: '../images/iphone-switch/iphone_switch.png',
		switch_height: 20,
		switch_width: 94
	};

	if(options) {
		jQuery.extend(settings, options);
	}

	// create the switch
	return this.each(function() {

		var container;
		var image;
		
		// make the container
		container = jQuery('<div class="iphone_switch_container" style="height:'+settings.switch_height+'px; width:'+settings.switch_width+'px; position: relative; overflow: hidden"></div>');
		
		state= jQuery(this).parent().parent().attr('state');
		
		// make the switch image based on starting state
		image = jQuery('<img class="iphone_switch" style="height:'+settings.switch_height+'px; width:'+settings.switch_width+'px; background-image:url('+settings.switch_path+'); background-repeat:none; background-position:'+(state == 'on' ? 0 : -53)+'px" src="'+(state == 'on' ? settings.switch_on_container_path : settings.switch_off_container_path)+'" /></div>');

		// insert into placeholder
		jQuery(this).html(jQuery(container).html(jQuery(image)));

		jQuery(this).mouseover(function(){
			jQuery(this).css("cursor", settings.mouse_over);
		});

		jQuery(this).mouseout(function(){
			jQuery(this).css("background", settings.mouse_out);
		});

		// click handling
		jQuery(this).click(function() {			
			state= jQuery(this).parent().parent().attr('state');//read state from selected span
			if(state == 'on') {
				jQuery(this).find('.iphone_switch').animate({backgroundPosition: -53}, "slow", function() {
					jQuery(this).attr('src', settings.switch_off_container_path);
					switched_off_callback(jQuery(this).parent().parent().attr('id'));//send id attribute of the span
				});
				state = 'off';
				jQuery(this).parent().parent().attr('state','off');//store state to the selected span
			}
			else {
				jQuery(this).find('.iphone_switch').animate({backgroundPosition: 0}, "slow", function() {
					switched_on_callback(jQuery(this).parent().parent().attr('id'));//send id attribute of the span
				});
				jQuery(this).find('.iphone_switch').attr('src', settings.switch_on_container_path);
				state = 'on';
				jQuery(this).parent().parent().attr('state','on');//store state to the selected span
			}
		});		

	});
	
};
