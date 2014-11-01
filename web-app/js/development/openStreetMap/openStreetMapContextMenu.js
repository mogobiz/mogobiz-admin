/**
 * Context Menu for OSM
 */
(function(window, undefined){
	
	// Use the correct document accordingly with window argument (sandbox)
	var document = window.document;
	
	// shorthand some stuff
	$ = jQuery;
	
	/**
	 * Create the context menu
	 *
	 * @param array opts Array of options.
	 * @todo Menu id needs to be unique, in case of multiple maps and context menus
	 */
	function contextMenu(opts)
	{
		// A way to access 'this' object from inside functions
		var self = this;
		
		if ( opts.map !== undefined )
		{
			// Put the map onto the object
			this.theMap = opts.map;
			
			// Keep track of where you clicked, for the callback functions.
			this.clickedLonLat = null;
			
			// Create the context menu element
			this.theMenu = $(document.createElement('div'))
				.attr('class', 'contextMenu')
				
				// .. disable the browser context menu on our context menu
				.bind('contextmenu', function() { return false; })
				
				// .. append a ul list element
				.append($(document.createElement('ul')))
				
				// .. then append it to the map object
				.appendTo($("#mapDiv"));
			
			// Get control of the right-click event:
			document.getElementById('mapDiv').oncontextmenu = function(e) {
				e = e?e:window.event;
				if (e.preventDefault) e.preventDefault(); // For non-IE browsers.
				else return false; // For IE browsers.
			};
			
			// A control class for capturing click events...
			OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
				defaultHandlerOptions: {
					'single': true,
					'double': true,
					'pixelTolerance': 0,
					'stopSingle': false,
					'stopDouble': false
				},
				handleRightClicks:true,
				initialize: function(options) {
					this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
					OpenLayers.Control.prototype.initialize.apply(this, arguments); 
					this.handler = new OpenLayers.Handler.Click(this, this.eventMethods, this.handlerOptions);
				},
				CLASS_NAME: "OpenLayers.Control.Click"
			});
			
			// Add an instance of the Click control that listens to various click events:
			var oClick = new OpenLayers.Control.Click({eventMethods:{
				'rightclick': function(e) { // Display and position the menu
					// Shorthand some stuff
					var mapDiv = $("#mapDiv"),
						menu = self.theMenu,
						x = e.xy.x,
						y = e.xy.y;
					
					// Hide the context menu if its open
					menu.hide();
					
					// Save the clicked location
					var projmerc_LonLat = map.getLonLatFromPixel(e.xy);
					var proj4326_LonLat = projmerc_LonLat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
					self.clickedLonLat = proj4326_LonLat;
					
					// Adjust the menu if clicked to close to the edge of the map
					if ( x > mapDiv.width() - menu.width() )
						x -= menu.width();
	
					if ( y > mapDiv.height() - menu.height() )
						y -= menu.height();
					
					// Set the location and fade in the context menu
					menu.fadeIn(200).css({ top: y - mapDiv.height(), left: x, display: "inline-block" });
				},
				'dblrightclick': function(e) { // Display and position the menu
					// Shorthand some stuff
					var mapDiv = $("#mapDiv"),
						menu = self.theMenu,
						x = e.xy.x,
						y = e.xy.y;
					
					// Hide the context menu if its open
					menu.hide();
					
					// Save the clicked location
					var projmerc_LonLat = map.getLonLatFromPixel(e.xy);
					var proj4326_LonLat = projmerc_LonLat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
					self.clickedLonLat = proj4326_LonLat;
					
					// Adjust the menu if clicked to close to the edge of the map
					if ( x > mapDiv.width() - menu.width() )
						x -= menu.width();
	
					if ( y > mapDiv.height() - menu.height() )
						y -= menu.height();
					
					// Set the location and fade in the context menu
					menu.fadeIn(200).css({ top: y - mapDiv.height(), left: x, display: "inline-block" });
				},
				'click': function(e) { // Hide context menu
					self.theMenu.hide();
				},
				'dblclick': function(e) { // Hide context menu
					self.theMenu.hide();
				}
			}});
			
			this.theMap.events.register('movestart', this.theMap, function() {
				self.theMenu.hide();
			});
			
			this.theMap.addControl(oClick);
			oClick.activate();
		}
	}

	/**
	 * Add new items to the context menu
	 *
	 * @param string   name     Name of the list item.
	 * @param function callback Function to run when you click the list item
	 * @return jQuery           The list item that is created.
	 */
	contextMenu.prototype.addItem = function(name, loc, callback)
	{
		// If no loc was provided
		if ( typeof loc === 'function')
		{
			callback = loc;
			loc = undefined;
		}

		// A way to access 'this' object from inside functions
		var self = this,

			// The name turned into camelCase for use in the li id, and anchor href
			idName = name.toCamel(),

			// The li element
			li = $(document.createElement('li'))
				.attr('id', idName);

		// the anchor element
		$(document.createElement('a'))
			.attr('href', '#'+idName).html(name)
			.appendTo(li)

			// Add some nice hover effects
			.hover(function() {
				$(this).parent().toggleClass('hover');
			})

			// Set the click event
			.click(function(){

				// fade out the menu
				self.theMenu.hide();

				// call the callback function - 'this' would refer back to the jQuery object of the item element
				callback.call(this, self.theMap, self.clickedLonLat);

				// make sure the click doesnt take us anywhere
				return false;
			});

		// If `loc` is a number put it at that location
		if ( typeof loc === 'number' && loc < this.theMenu.find('li').length)
			this.theMenu.find('li').eq(loc).before(li);

		// .. else appened it to the end of the menu
		else
			this.theMenu.find('ul').append(li);

		// Return the whole list item
		return li;
	};

	/**
	 * Add a seperators
	 *
	 * @return jQuery The list item that is created.
	 */
	contextMenu.prototype.addSeparator = function(loc)
	{
		// Create the li element
		var li = $(document.createElement('li'))
			.addClass('separator')

			// .. add a div child
			.append($(document.createElement('div')))

		// If loc is a number put the li at that location
		if ( typeof loc === 'number' )
			this.theMenu.find('li').eq(loc).before(li)

		// .. else appened it to the end
		else
			this.theMenu.find('ul').append(li);

		// Return the li element
		return li
	};

	/**
	 * Remove a menu list item.
	 *
	 * @param string name The string used to create the list item.
	 * @param number name The index value of the list item.
	 * @param jQuery name The jQuery object that is returned by addItem() or addSeparator()
	 */
	contextMenu.prototype.remove = function(item)
	{
		// No need to search for name if its a jquery object
		if ( item instanceof $ )
			item.remove();

		// Find all the elements and remove the one at the specified index
		else if ( typeof item === 'number' )
			this.theMenu.find('li').eq(item).remove()

		// Find all the items by the id name and remove them
		else if ( typeof item === 'string' )
		{
			// Find and remove the element
			this.theMenu.find('#'+item.toCamel()).remove()
		}
	};

	// Expose this to the global object
	window.contextMenu = contextMenu;

	/**
	 * Convert a string into a 'camelCase' string
	 *
	 * @example 'Camel case string'.toCamel() -> 'camelCaseString'
	 */
	String.prototype.toCamel = function() {
		return this.toLowerCase().replace(/(\s)([a-z])/gi, function(match, group1, group2){
			return group2.toUpperCase().replace(group1,'');
		});
	}
})(window);