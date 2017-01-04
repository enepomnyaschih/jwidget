/*
	JW.Canvas component graphics model.
	
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
	
	----
	
	See http://www.w3.org/TR/2dcontext for canvas 2D context specification.
*/

JW.Canvas.Graphics = JW.Class.extend({
	items : null, // Array of JW.Canvas.Graphics.Item
	
	init: function()
	{
		this.items = [];
	},
	
	save: function()
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("save"));
	},
	
	restore: function()
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("restore"));
	},
	
	scale: function(x, y)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("scale", [ x, y ]));
	},
	
	rotate: function(angle)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("rotate", [ angle ]));
	},
	
	translate: function(x, y)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("translate", [ x, y ]));
	},
	
	transform: function(a, b, c, d, e, f)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("transform", [ a, b, c, d, e, f ]));
	},
	
	flipX: function(x)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("transform", [ -1, 0, 0, 1, 2 * x, 0 ]));
	},
	
	flipY: function(y)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("transform", [ 1, 0, 0, -1, 0, 2 * y ]));
	},
	
	// TODO: test
	flip: function(a, r)
	{
		var sin  = Math.sin(a);
		var cos  = Math.cos(a);
		var sin2 = Math.sin(2 * a);
		var cos2 = Math.cos(2 * a);
		
		this.items.push(new JW.Canvas.Graphics.Item.Method("transform", [ -cos2, -sin2, -sin2, cos2, 2 * r * cos, 2 * r * sin ]));
	},
	
	setTransform: function(a, b, c, d, e, f)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("setTransform", [ a, b, c, d, e, f ]));
	},
	
	globalAlpha: function(value)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Property("globalAlpha", value));
	},
	
	strokeStyle: function(value)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Property("strokeStyle", value));
	},
	
	fillStyle: function(value)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Property("fillStyle", value));
	},
	
	lineWidth: function(value)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Property("lineWidth", value));
	},
	
	lineCap: function(value)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Property("lineCap", value));
	},
	
	lineJoin: function(value)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Property("lineJoin", value));
	},
	
	miterLimit: function(value)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Property("miterLimit", value));
	},
	
	shadowOffsetX: function(value)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Property("shadowOffsetX", value));
	},
	
	shadowOffsetY: function(value)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Property("shadowOffsetY", value));
	},
	
	shadowBlur: function(value)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Property("shadowBlur", value));
	},
	
	shadowColor: function(value)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Property("shadowColor", value));
	},
	
	fillRect: function(x, y, w, h)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("fillRect", [ x, y, w, h ]));
	},
	
	strokeRect: function(x, y, w, h)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("strokeRect", [ x, y, w, h ]));
	},
	
	beginPath: function()
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method.Path("beginPath", true));
	},
	
	closePath: function()
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method.Path("closePath", false));
	},
	
	moveTo: function(x, y)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("moveTo", [ x, y ]));
	},
	
	lineTo: function(x, y)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("lineTo", [ x, y ]));
	},
	
	quadraticCurveTo: function(cpx, cpy, x, y)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("quadraticCurveTo", [ cpx, cpy, x, y ]));
	},
	
	bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("bezierCurveTo", [ cp1x, cp1y, cp2x, cp2y, x, y ]));
	},
	
	arcTo: function(x1, y1, x2, y2, radius)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("arcTo", [ x1, y1, x2, y2, radius ]));
	},
	
	rect: function(x, y, w, h)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("rect", [ x, y, w, h ]));
	},
	
	arc: function(x, y, radius, startAngle, endAngle, anticlockwise)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("arc", [ x, y, radius, startAngle, endAngle, anticlockwise ]));
	},
	
	fill: function()
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("fill"));
	},
	
	stroke: function()
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("stroke"));
	},
	
	font: function(value)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Property("font", value));
	},
	
	textAlign: function(value)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Property("textAlign", value));
	},
	
	textBaseline: function(value)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Property("textBaseline", value));
	},
	
	fillText: function(text, x, y, maxWidth)
	{
		// Temporary hack due to http://code.google.com/p/chromium/issues/detail?id=110995
		if (JW.isSet(maxWidth))
			this.items.push(new JW.Canvas.Graphics.Item.Method("fillText", [ text, x, y, maxWidth ]));
		else
			this.items.push(new JW.Canvas.Graphics.Item.Method("fillText", [ text, x, y ]));
	},
	
	strokeText: function(text, x, y, maxWidth)
	{
		// Temporary hack due to http://code.google.com/p/chromium/issues/detail?id=110995
		if (JW.isSet(maxWidth))
			this.items.push(new JW.Canvas.Graphics.Item.Method("strokeText", [ text, x, y, maxWidth ]));
		else
			this.items.push(new JW.Canvas.Graphics.Item.Method("strokeText", [ text, x, y ]));
	},
	
	measureText: function(text)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("measureText", [ text ]));
	},
	
	drawImage: function(image, sx, sy, sw, sh, dx, dy, dw, dh)
	{
		this.items.push(new JW.Canvas.Graphics.Item.Method("drawImage", [ image, sx, sy, sw, sh, dx, dy, dw, dh ]));
	},
	
	clear: function()
	{
		this.items.splice(0, this.items.length);
	}
});
