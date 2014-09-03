/**
 * jQuery Spinner Control Widget
 * Depends:
 *	- jQuery 1.4.2+
 *	- jQuery UI 1.8 widget factory
 *
*/

(function($){
	var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
	var isIE = !!window.attachEvent && !isOpera;
	$.widget("ech.spinnerControl", {
		// default options
		options: {
			interval: 1,
			round: 0,
			min: false,
			max: false,
			prefix: '',
			suffix: '',
			data: false,
			onIncrement: spinnerEmptyFunction,
			onDecrement: spinnerEmptyFunction,
			afterUpdate: spinnerEmptyFunction,
			onStop: spinnerEmptyFunction,
			downElement: '',
			upElement: ''
		},

		_init: function(){
			// store the elements
			this.inputElement = this.element;
			this.upElement = $(this.options.upElement);
			this.downElement = $(this.options.downElement);
			// set initial values
			this.reset();
			// build our update function
			this.buildUpdateFunction();
			// define the rate of increasing speed
			if (isIE) {
				this.speedHash = {5: 300, 10: 175, 20: 90, 30: 17};
			}
			else {
				this.speedHash = {5: 250, 10: 85, 20: 35, 30: 10};
			}
			// attach listeners
			this.bindEvents();
		},
		
		/**
			* Helper function to define the update function
			*
			* @return void
			*/
		buildUpdateFunction: function() {
			// do we have a data list?
			if (this.options.data == false) {
				// no, we are an integer or decimal
				this.updateValue = function(event) {
					var multiplier = event.data.multiplier;
					// parse the value ignoring the substring
					var value = parseFloat(this.inputElement.val().replace(/^(.*?)([\-\d\.]+)(.*)$/, '$2'));
					if (isNaN(value)) value = this.options.min || 0;
					// what are we adding
					if (multiplier == 1) {
						value = (value + this.options.interval).toFixed(this.options.round);
					}
					else if (multiplier == -1) {
						value = (value - this.options.interval).toFixed(this.options.round);
					}
					// ensure value falls between the min and max
					if (this.options.min !== false)
						value = Math.max(this.options.min, value);
					if (this.options.max !== false)
						value = Math.min(this.options.max, value);
					this.setValue(value);
					// call our afterUpdate function
					this.options.afterUpdate(this);
				};
				// set an initial value if not given
				if (this.inputElement.val() === '') {
					this.inputElement.val(this.options.min || 0);
				}
			}
			else if (this.options.data.constructor == Array && this.options.data.length) {
				// we have a data list
				// set the position pointer to the current or first element
				var current = this.options.data.indexOf(this.inputElement.val());
				this.pos = current == -1 ? 0 : current;
				// define our function
				this.updateValue = function(multiplier) {
					// advance the pointer forward or backward, wrapping between the last and first item
					this.pos = this.pos + multiplier;
					this.pos = this.pos < 0 ? this.options.data.length -1 : (
						this.pos > this.options.data.length - 1 ? 0 : this.pos
					);
					// update the value to the prefix, plus the rounded number, plus the suffix
					this.setValue(this.options.data[this.pos]);
					// call our afterUpdate function
					this.options.afterUpdate(this);
				}.proxy(this);
				// set an initial value if not given
				if (this.inputElement.val() === '') {
					this.inputElement.val(this.options.data[0]);
				}
			}
			else {
				// we have an invalid data option
				throw new Error('SpinnerControl.initialize(): invlalid value for options.data');
			}
		},
		setValue: function(value) {
			this.inputElement.val(this.options.prefix + value + this.options.suffix);
		},
		/**
		 * Helper function to attach listeners
		 */
		bindEvents: function() {
			// define a pre-bound stop function
			var stop = jQuery.proxy(this.stop, this);
			// bind the input
			this.inputElement
			// begin incrementing at start of a keypress
			.bind('keydown', jQuery.proxy(this.keyStart, this))
			// stop incrementing at the end of a keypress
			.bind('keyup', stop)
			// reformat and enforce min-max for typed values
			.bind('blur', {multiplier:0}, jQuery.proxy(this.updateValue, this));
			// bind the up element
			this.upElement
			// begin incrementing at start of click
			.bind('mousedown', {multiplier:1}, jQuery.proxy(this.clickStart, this))
			// stop incrementing at end of click
			.bind('mouseup', stop)
			// in the case of a click and drag, also stop
			.bind('mouseout', stop);
			// bind the down element
			this.downElement
			// begin decrementing at start of click
			.bind('mousedown', {multiplier:-1}, jQuery.proxy(this.clickStart, this))
			// stop decrementing at end of click
			.bind('mouseup', stop)
			// in the case of a click and drag, also stop
			.bind('mouseout', stop);
		},
		/**
		 * Start incrementing or decrementing based on a pressed key
		 *
		 * @event keydown on this.inputElement
		 * @param object evt
		 * @return void
		 */
		keyStart: function(evt) {
			if (this.running == false) {
				if (evt.keyCode == 38) {
					this.running = 'key';
					this.increment();
				}
				else if (evt.keyCode == 40) {
					this.running = 'key';
					this.decrement();
				}
			}
		},
		/**
		 * Start incrementing or decrementing based on a mousedown action
		 *
		 * @param boolean multiplier  If multipler is 1, increment
		 * @return void
		 */
		clickStart: function(event) {
			this.running = 'mouse';
			if (event.data.multiplier == 1) {
				this.increment();
			}
			else {
				this.decrement();
			}
		},
		/**
		 * Set to resting state
		 *
		 * return @void
		 */
		reset: function() {
			// blur the up/down buttons if we got started by clicking
			if (this.running == 'mouse') {
				this.upElement.blur();
				this.downElement.blur();
			}
			this.running = false;
			this.iterations = 0;
		},
		/**
		 * Reset and clear timeout
		 *
		 * @return void
		 */
		stop: function() {
			this.reset();
			window.clearTimeout(this.timeout);
			this.options.onStop(this);
		},
		/**
		 * Increment the value
		 *
		 * @return void
		 */
		increment: function() {
			var evt = new Object();
			evt.data = {multiplier: 1}
			this.updateValue(evt);
			this.timeout = window.setTimeout(jQuery.proxy(this.increment, this), this.getSpeed());
			this.options.onIncrement(this);
		},
		/**
		 * Decrement the value
		 *
		 * @return void
		 */
		decrement: function() {
			var evt = new Object();
			evt.data = {multiplier: -1}
			this.updateValue(evt);
			this.timeout = window.setTimeout(jQuery.proxy(this.decrement, this), this.getSpeed());
			this.options.onDecrement(this);
		},
		/**
		 * Get the delay for the next timeout
		 * Overwrite this function for custom speed schemes
		 *
		 * @return integer
		 */
		getSpeed: function() {
			this.iterations++;
			for (var iterations in this.speedHash) {
				if (this.iterations < iterations) {
					return this.speedHash[iterations];
				}
			}
			return this.speedHash[30];
		}
	});
})(jQuery);

function spinnerEmptyFunction(){

}