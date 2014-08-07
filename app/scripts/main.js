(function(root, factory)	{

	'use strict';

	root.pkgeo = factory;

})(this, (function()	{
	
	'use strict';

	/*
	 * Setup default global object
	 * @return: Empty object
	 */
	var pkgeo = {};

	/*
	 * Setup Google Maps API object
	 * @return: Object and methods collection
	 */
	pkgeo.gmap = {
		iw: null,
		markers: [],
		init: function(canvas, lat, lng, zoom, callback) {
			this.canvas = canvas;
			this.defaultPosition = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
			this.zoom = parseInt(zoom);
			this.mapDefaults = {
				center: this.defaultPosition,
				zoom: this.zoom ? this.zoom : 5,
				minZoom: 1,
				disableDefaultUI: true
			};

			var map = this.map = new google.maps.Map(this.canvas, this.mapDefaults);

			google.maps.event.addListenerOnce(this.map, 'tilesloaded', function()	{
				return (callback && typeof callback === 'function') ? callback.call(this, map) : false;
			});
		}
	};

	/*
	 * Setup an activity indicator, animated circle 
	 * using GIF or plain HTML/CSS 
	 * @return: new empty Object
	 */
	pkgeo.activityIndicator = function() {};

	/*
	 * Prototype method to add the indicator 
	 * to document's element
	 * @return: jQuery DOM object
	 */
	pkgeo.activityIndicator.prototype.add = function(options) {
		this.el = $('<div />', {
			'class': 'glyphicon glyphicon-activity-indicator',
			'css': (typeof options !== 'undefined' && typeof options.css !== 'undefined') ? options.css : ''
		});
		return this.el;
	};

	/*
	 * Prototype method to remove the indicator 
	 * from document's element
	 * @return: jQuery DOM object
	 */
	pkgeo.activityIndicator.prototype.remove = function() {
		if ( typeof this !== 'undefined' && typeof this.el !== 'undefined' ) {
			return this.el.remove();
		}
		else {
			return $('div.glyphicon-activity-indicator').remove();
		}
	};

	/*
	 * @return: global object
	 */
	return pkgeo;
})());

// On ready, fire up the functions
$(document).ready(function() {
	
	/*
	 * Setup new global activity indicator object
	 * @return: activityIndicator Object
	 */
	var ai = new pkgeo.activityIndicator();

	/*
	 * Canvas for global access
	 */

	var mapCanvas = $('#mapCanvas');

	// Add activity indicator to map
	ai.add().addClass('with-background').insertAfter(mapCanvas);

	/*
	 * Load Google Maps with async method
	 * @return: Google Maps Object
	 */
	pkgeo.gmap.init(mapCanvas[0], 37, 70, 4, function(map)	{
		// console.log(map);

		// remove the activity indicator
		ai.remove();
	});
});