;(function($) {
	$(document).ready(function() {

		var $win = $(window);
		var $doc = $(document);

		// Load Foundation
		$doc.foundation();

		// Navigation Submenu Icons
		$('.top-bar-section .has-dropdown').append('<i class="fa fa-angle-right"></i>')

		// Fullscreener
		$('.fullscreener img').fullscreener();

		// Home Slider
		$('.slider-home').flexslider({
			animation: 'fade',
			prevText: '<i class="fa fa-angle-left"></i>',
			nextText: '<i class="fa fa-angle-right"></i>',
			pauseOnAction: true,
			pauseOnHover: true,
			smoothHeight: true,
			controlNav: false,
			start: function(slider) {
				$('.slider-home').removeClass('loading');
			}
		});

		// Section Quote Parallax
		var $quoteImage = $('.section-quote .section-image');
		if( $quoteImage.length) {
			$win.on('scroll', function() {
				percentageScroll = 300 * (($win.scrollTop()+$win.height() - $quoteImage.parent().offset().top) / ($doc.height() - $win.height()));
				$quoteImage.css('background-position', '50% ' + percentageScroll + '%');
			});
		}

		// Wow
		new WOW().init();

		// Clients
		$('.slider-clients').flexslider({
			animation: 'slide',
			nextText: '<span class="button grey"><i class="fa fa-angle-right"></i></span>',
			prevText: '<span class="button grey"><i class="fa fa-angle-left"></i></span>'
		});

		// Single Project
		var $projectHead = $('.section-project .section-head');
		var $projectImage = $('.section-project .section-image');
		var $header = $('.header');
		var $bar = $('.bar');

		if ($projectHead.length) {
			$win.on('load resize', function() {
				$projectImage.height($win.height() - ($header.outerHeight() + $bar.outerHeight()));
			});
	
		}

		// Scroll Down
		$('.scroll-down').on('click', function(e) {
			e.preventDefault();
			var offset = $(this).offset().top + $(this).height();

			$('html, body').animate({ scrollTop : offset }, {
				queue: false,
				duration: 500
			});
		});

		// Map
		if ($('#map').length) {
			var geocoder;
			var map;
			var latlng;
			var address = $('#map').data('address');

			function initialize() {
				geocoder = new google.maps.Geocoder();
				latlng = new google.maps.LatLng(50, -50);
				var mapOptions = {
					zoom: 14,
					center: latlng,
					scrollwheel: false,
					disableDefaultUI: true
				};

				geocoder.geocode( { 'address': address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						map.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
							map: map,
							position: results[0].geometry.location
						});
						latlng = new google.maps.LatLng(results[0].geometry.location.k, results[0].geometry.location.D);
					}
				});

				map = new google.maps.Map(document.getElementById('map'), mapOptions);

			}

			google.maps.event.addDomListener(window, 'load', initialize);
		}

	});
})(jQuery);