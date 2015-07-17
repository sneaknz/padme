/* 
	Padme plugin
	v1.0.3
	Mike Harding
	
	A jQuery plugin to pad a justified list with placeholders, based on the number of columns.

	For usage see http://code.sneak.co.nz/padme/
*/

(function($) {

	$.fn.padme = function(options) {
		
		var opts = $.extend({}, $.fn.padme.defaults, options);
		
		function addPlaceholders(num, me) {
			if ( num > 0 ) {
				// Pad out the list with placeholders
				var p = '';
				var max = (me.cols - num);
				
				if ( opts.matchCols ) {
					max = num;
				}
					
				for ( var i = 0; i < max; i++ ) {
					p += ' ' + me.placeholder;
				}

				me.$group.append(p);
			}
		}
		
		function removeOverflow(me) {
			// EXPERIMENTAL
			// Remove placeholders that get wrapped to another line 
			// due to floats and other external influences
			me.$group.find('.' + opts.placeholderClass).each(function() {
				if ( $(this).position().top > me.top ) {
					$(this).remove();
				}
			});					
		}

		return this.each(function() {
			var dataCols = $(this).data('padme-cols'),
				me = {
					$group: $(this),
					cols: opts.cols ? opts.cols : dataCols
				};
				
			// If cols have been defined, then go for it
			if (me.cols !== null && me.cols > 1 ) {
				// If children are defined then use them, otherwise default to all children
				if ( opts.children ) {
					me.$items = me.$group.children(opts.children).not('.' + opts.placeholderClass);
				} else {
					me.$items = me.$group.children().not('.' + opts.placeholderClass);
				}	
				
				if ( me.$items.length > 0 ) {
					var el;
			
					if ( opts.placeholderEl ) {
						el = opts.placeholderEl;
					} else {
						el = me.$items.eq(0).prop('tagName');
					}
			
					me.placeholder = '<' + el + ' class="' + opts.placeholderClass + '"></' + el + '>';

					me.$group.find('.' + opts.placeholderClass).remove();

					if ( opts.matchCols ) {
						// Force the max number of placeholders to be added, regardless of other options
						addPlaceholders((me.cols - 1), me);
					} else {
						var	count = 1;
					
						if ( opts.allowExtras ) {
							// Get top position of last item
							var itemIndex = me.$items.length - 1;
							me.top = me.$items.eq( itemIndex ).position().top;
							var	count = 1,
								currTop = me.top,
								exit = false;
				
							// Check for previous siblings
							while ( count < me.cols && !exit && itemIndex > 0 ) {
								itemIndex--;

								var $prevItem = me.$items.eq( itemIndex );
					
								if ( $prevItem.length ) {
									currTop = $prevItem.position().top;

									if ( currTop >= me.top ) {
										count++;
									} else {
										exit = true;
									}
								} else {
									exit = true;
								}
							}
						} else {
							count = me.$items.length % me.cols;
						}

						addPlaceholders(count, me);

						if ( opts.removeOverflow ) {
							removeOverflow(me);
						}
					}
				}	
			}
		});
		
	};
	
	// plugin defaults
	$.fn.padme.defaults = {
		cols: null,
		children: null,
		placeholderEl: null,
		placeholderClass: 'placeholder',
		removeOverflow: false,
		allowExtras: false,
		matchCols: false
	};

})(jQuery);