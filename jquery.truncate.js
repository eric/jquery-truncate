(function($) {
	$.fn.extend({

		truncate: function(options) {
			var defaults = {
				width: 'auto',
				after: '&hellip;',
				center: false,
				addclass: false,
				addtitle: false
			};
			options = $.extend(defaults, options);

			return this.each(function() {

				var element = $(this);

				if( $.fn.isNumber(options.width) ) {
					truncateWidth = options.width;
				}
				else {
					truncateWidth = element.width();
				}
				truncateWidth--;

				var fontCSS = {
					'fontFamily': element.css('fontFamily'),
					'fontSize': element.css('fontSize'),
					'fontStyle': element.css('fontStyle'),
					'fontWeight': element.css('fontWeight'),
					'font-variant': element.css('font-variant'),
					'text-indent': element.css('text-indent'),
					'text-transform': element.css('text-transform'),
					'letter-spacing': element.css('letter-spacing'),
					'word-spacing': element.css('word-spacing'),
					'display': 'none'
				};

				var elementText	  = element.text();

				var $truncateWorker = $('<span/>').css(fontCSS).appendTo('body');

				$truncateWorker.text(elementText);
				var originalWidth = $truncateWorker.width();
				$truncateWorker.text('');

				if ( originalWidth > truncateWidth ) {

					if (options.center) {
						i = 1;
						while ( $truncateWorker.width() < truncateWidth ) {
							$truncateWorker.html( elementText.slice(0, i) + options.after + elementText.slice(-i) );
							if( $truncateWorker.width() > truncateWidth ) {
								temp = elementText.slice(0, i-1) + options.after + elementText.slice(-i);
								$truncateWorker.html(temp);
								if( $truncateWorker.width() <= truncateWidth ) truncatedText = temp;
								break;
							}
							truncatedText = elementText.slice(0, i) + options.after + elementText.slice(-i);
							i++;
						}
					}
					else {
						i = 1;
						while ( $truncateWorker.width() < truncateWidth ) {
							$truncateWorker.html(elementText.slice(0, i) + options.after);
							if( $truncateWorker.width() > truncateWidth ) break;
							truncatedText = elementText.slice(0, i) + options.after;
							i++;
						}
					}
					$truncateWorker.remove();

					if( options.addclass ) {
						element.addClass(options.addclass);
					}
					if( options.addtitle ) {
						element.attr('title', elementText);
					}

					element.html(truncatedText);
				}

			});

		},

		isNumber: function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}

	});
})(jQuery);