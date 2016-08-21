/*
	JW.Canvas 2D coordinates system.
	
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
