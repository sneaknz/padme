/* 
	Padme plugin
	v1.0
	Mike Harding
	
	A jQuery plugin to pad a justified list with placeholders, based on the number of columns.

	Usage: $('.list').padme(4);

	       $('.list').padme(4, { placeholderClass: 'classname' });
*/

(function($) {

	$.fn.padme = function(cols, options) {
		
		var opts = $.extend({}, $.fn.padme.defaults, options);

		return this.each(function(index) {
			var $group = $(this),
				$items = $group.children().not('.' + opts.placeholderClass);
			
			if ( $items.length > 0 ) {
				var tag = $items.eq(0).prop('tagName'),
					placeholder = '<' + tag + ' class="' + opts.placeholderClass + '"></' + tag + '>';
				
				$group.find('.' + opts.placeholderClass).remove();
				
				// Get top position of last item
				var itemIndex = $items.length - 1,
					top = $items.eq( itemIndex ).position().top,
					count = 1,
					currTop = top,
					exit = false;
				
				
				function addPlaceholders(num) {
					// Pad out the list with placeholders
					var p = '';
					for ( var i = 0; i < (cols - num); i++ ) {
						p += ' ' + placeholder;
					}
					$group.append(p);
				}
				
				function removeOverflow() {
					// Remove placeholders that get wrapped to another line 
					// due to floats and other external influences
					$group.find('.' + opts.placeholderClass).each(function() {
						if ( $(this).position().top > top ) {
							$(this).remove();
						}
					});					
				}
				
				// Check for previous siblings
				while ( count < cols && !exit && itemIndex > 0 ) {
					itemIndex--;

					var $prevItem = $items.eq( itemIndex );
					
					if ( $prevItem.length ) {
						currTop = $prevItem.position().top;
						if ( currTop >= top ) {
							count++;
						} else {
							exit = true;
						}
					} else {
						exit = true;
					}
				}
				
				addPlaceholders(count);
				removeOverflow();
			}
			
		});
		
	};
	
	// plugin defaults
	$.fn.padme.defaults = {
		placeholderClass: 'placeholder'
	};

})(jQuery);