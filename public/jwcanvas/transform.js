﻿/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

JW.Canvas.Transform = JW.Class.extend({
	matrix : null, // Array[6]
	// a c e
	// b d f
	// 0 0 1
	
	init: function(matrix)
	{
		this.matrix = matrix || [ 1, 0, 0, 1, 0, 0 ];
	},
	
	convert: function(point)
	{
		return JW.Canvas.Transform.multMatrixVector(this.matrix, point);
	},
	
	complex: function(x, y, scaleX, scaleY, rotate)
	{
		var cos = Math.cos(rotate);
		var sin = Math.sin(rotate);
		return this.transform(scaleX * cos, scaleX * sin, -scaleY * sin, scaleY * cos, x, y);
	},
	
	transform: function(a, b, c, d, e, f)
	{
		return new JW.Canvas.Transform(JW.Canvas.Transform.multMatrix(this.matrix, arguments));
	},
	
	back: function()
	{
		return new JW.Canvas.Transform(JW.Canvas.Transform.backMatrix(this.matrix));
	}
});

JW.apply(JW.Canvas.Transform, {
	identity: new JW.Canvas.Transform(),
	
	multMatrixVector: function(m, u)
	{
		return [
			m[0] * u[0] + m[2] * u[1] + m[4],
			m[1] * u[0] + m[3] * u[1] + m[5]
		];
	},
	
	multMatrix: function(m, n)
	{
		return [
			m[0] * n[0] + m[2] * n[1],
			m[1] * n[0] + m[3] * n[1],
			m[0] * n[2] + m[2] * n[3],
			m[1] * n[2] + m[3] * n[3],
			m[0] * n[4] + m[2] * n[5] + m[4],
			m[1] * n[4] + m[3] * n[5] + m[5]
		];
	},
	
	backMatrix: function(m)
	{
		var d = m[0] * m[3] - m[1] * m[2];
		return [
			 m[3] / d,
			-m[1] / d,
			-m[2] / d,
			 m[0] / d,
			(m[2] * m[5] - m[3] * m[4]) / d,
			(m[1] * m[4] - m[0] * m[5]) / d
		 ];
	}
});
