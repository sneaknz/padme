# Padme plugin

A jQuery plugin to pad a justified list or group with placeholders, based on the number of columns in the layout. See an example at <a href="http://code.sneak.co.nz/padme/">http://code.sneak.co.nz/padme/</a>.

## Usage

Call the plugin on the parent element of the list/group. This doesn't have to be an unordered list, so long as all direct children of the parent are items belonging to the list or group. 

**Note: You must pass in a value for the number of columns your list/group is laid out with.** This can either be done when calling the javascript, or as a data attribute on the list/group itself:

	$('.list').padme({ cols: 4 });

Or:

	<ul data-padme-cols="4"> ... </ul>

You can optionally pass in a set of options:

	$('.list').padme({
		cols: 4,
		children: '.item',
		placeholderEl: 'div'
		placeholderClass: 'my-classname'
	});

The plugin first strips out any existing placeholder elements, so you can call the plugin multiple times as your layout changes if required and it will re-pad the list accordingly.

## Options

<table>
 	<tr>
		<th align="left" valign="top">children</th>
		<td><em>Optional, String</em>. A comma separated list of elements or IDs/classes for the children you want to be included as part of the group. Useful when you have a number of 'special case' elements that you will be laying out separately but happen to sit within the parent container.</td>
	</tr>
	<tr>
		<th align="left" valign="top">placeholderEl</th>
		<td><em>Optional, String</em>. The element type to be used for any placeholders that get added as padding for the group. If not specified, this defaults to using the type of the first child in the group.</td>
	</tr>
	<tr>
		<th align="left" valign="top">placeholderClass</th>
		<td><em>Optional, String</em>. A class name to be added to placeholder elements added to pad the group.</td>
	</tr>
	<tr>
		<th align="left" valign="top">allowExtras</th>
		<td><em>Optional, Boolean</em>. Defaults to 'false'. Set this to true if there are likely to be extra elements in your group/list that will be different widths and may cause the column calculation to not divide into consistent sizes.</td>
	</tr>
	<tr>
		<th align="left" valign="top">matchCols</th>
		<td><em>Optional, Boolean</em>. Defaults to 'false'. Set this to true if you want to always force the maximum number of placeholders to be added. This is mostly useful when dealing with a responsive layout where the number of items per column can fluctuate.</td>
	</tr>
</table>