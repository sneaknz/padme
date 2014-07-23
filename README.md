# Padme plugin

A jQuery plugin to pad a justified list or group with placeholders, based on the number of columns in the layout. See an example at <a href="http://code.sneak.co.nz/padme/">http://code.sneak.co.nz/padme/</a>.

## Usage

Call the plugin on the parent element of the list/group. This doesn't have to be an unordered list, so long as all direct children of the parent are items belonging to the list or group. **You must pass in a value for the number of 
columns your list/group is laid out with**.

	$('.list').padme(4);

You can optionally pass in a CSS class name to be used for the placeholder elements (default is 'placeholder'):
	
	$('.list').padme(4 {
		placeholderClass: 'my-classname'
	});

The plugin first strips out any existing placeholder elements, so you can call the plugin multiple times as your layout changes if required and it will re-pad the list accordingly.