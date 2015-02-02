/* 
	Padme plugin
	v1.1
	Mike Harding
	
	A jQuery plugin to pad a justified list with placeholders, based on the number of columns.

	Usage: $('.list').padme(4);

	       $('.list').padme(4, {
				children: 'li, .child',
				placeholderEl: 'div',
				placeholderClass: 'classname'
			});
*/

(function($) {

	$.fn.padme = function(cols, options) {
		
		var opts = $.extend({}, $.fn.padme.defaults, options);
		
		function addPlaceholders(num, me) {
			// Pad out the list with placeholders
			var p = '';
			for ( var i = 0; i < (opts.cols - num); i++ ) {
				p += ' ' + me.placeholder;
			}
			me.$group.append(p);
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
			var me = {
					$group: $(this),
					cols: $(this).data('padme-cols')
				};
			
			opts.cols = me.cols ? me.cols : cols;
			
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
				
				// Get top position of last item
				var itemIndex = me.$items.length - 1;
				me.top = me.$items.eq( itemIndex ).position().top;
				var	count = 1,
					currTop = me.top,
					exit = false;
				
				// Check for previous siblings
				while ( count < opts.cols && !exit && itemIndex > 0 ) {
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
				
				addPlaceholders(count, me);

				if ( opts.removeOverflow ) {
					removeOverflow(me);
				}
			}
			
		});
		
	};
	
	// plugin defaults
	$.fn.padme.defaults = {
		children: null,
		placeholderEl: null,
		placeholderClass: 'placeholder',
		removeOverflow: false
	};

})(jQuery);