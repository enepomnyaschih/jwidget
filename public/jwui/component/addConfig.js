/*
	JW base UI component adding config.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.UI.Component.AddConfig = JW.Class.extend({
	id      : null,     // [optional] String
	index   : null,     // [optional] Number
	el      : null,     // [optional] jQuery element
	insert  : false     // [optional] Boolean
});

/*
	id index el insert
	-    -    -    -    insert to the end of child box as plain child (-+-+)
	+    -    -    -    replace idEl as named child (+-+-)
	-    +    -    -    insert to position of child box as plain child (-+-+)
	+    +    -    -    insert to position of idEl as free child (-+++)
	-    -    +    -    replace el as free child (--+-)
	+    -    +    -    replace el as named child (+-+-)
	-    +    +    -    insert to position of el as free child (-+++)
	+    +    +    -    insert to position of el as free child (-+++)
	-    -    -    +    insert to the end of child box as plain child (-+-+)
	+    -    -    +    insert to the end of idEl as free child (-+++)
	-    +    -    +    insert to position of child box as plain child (-+-+)
	+    +    -    +    insert to position of idEl as free child (-+++)
	-    -    +    +    insert to the end of el as free child (-+++)
	+    -    +    +    insert to the end of el as free child (-+++)
	-    +    +    +    insert to position of el as free child (-+++)
	+    +    +    +    insert to position of el as free child (-+++)
	
	+    -    +    -    replace el as named child (+-+-)
	-    -    +    -    replace el as free child (--+-)
	-    +    -    +    insert to position of child box as plain child (-+-+)
	-    +    +    +    insert to position of el as free child (-+++)
*/