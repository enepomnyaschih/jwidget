[Back to index](../README.md)

# String utilities

* **Functions**
	* [htmlEncode](#htmlencode)
	* [htmlDecode](#htmldecode)
	* [ellipsis](#ellipsis)
	* [pad](#pad)
	* [capitalize](#capitalize)
	* [camel](#camel)
	* [hyphen](#hyphen)
	* [parseClass](#parseclass)

## Consumption

	import * as StringUtils from "jwidget/StringUtils";

## Description

Various utilities for string manipulation.

## Functions

### htmlEncode

    htmlEncode(str: string): string

Escapes special HTML symbols.
Converts symbols `&`, `>`, `<`, `"` to `&amp;` `&gt;` `&lt;` `&quot;` correspondingly.

    htmlEncode('<div/>'); // '&lt;div/&gt;'

### htmlDecode

    htmlDecode(str: string): string

Unescapes special HTML symbols.
Converts sequences `&amp;` `&gt;` `&lt;` `&quot;` to `&`, `>`, `<`, `"` correspondingly.

    htmlDecode('&lt;div/&gt;'); // '<div/>'

### ellipsis

    ellipsis(str: string, length: number, ellipsis?: string): string

Shortens the string to specified length. If string is short enough, it stays the same.
Otherwise it is cutted and `ellipsis` substring is appended so that the resulting string length
equals to `length`.

    ellipsis('This is a long string!', 10); // 'This is...'

### pad

    pad(str: string, length: number, ch: string): string

Prepends string with specified symbol at the beginning to adjust it to specified length.
If string is long enough, it stays the same.

    pad('15', 4, '0'); // 0015

### capitalize

    capitalize(str: string): string

Capitalizes first symbol.

    capitalize('bob'); // 'Bob'

### camel

    camel(str: string): string

Converts hyphen-style to camelStyle.

    camel('i-love-js')  // 'iLoveJs'

### hyphen

    hyphen(str: string): string

Converts camelStyle to hyphen-style.

    hyphen('iLoveJs')  // 'i-love-js'

### parseClass

    parseClass(str: string): string[]
    parseClass(str: any[]): string[]

Parses CSS class string and returns array of CSS class names.
Supports strings, untrimmed strings, space-separated strings, arrays
and subarrays.

    parseClass(['  a    b ', 'c', [], [['d', 'e']]]); // ['a', 'b', 'c', 'd', 'e']
