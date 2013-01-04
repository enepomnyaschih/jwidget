/*
	JW simple inheritance tests.
	
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

JW.ns("JW.Tests.Core");

JW.Tests.Core.ClassTestCase = JW.Unit.TestCase.extend({
	testExtend: function()
	{
		var Shape = JW.Class.extend({
			name: "shape",
			
			perimeter   : function() { return 0; },
			area        : function() { return 0; }
		});
		
		var Square = Shape.extend({
			name: "square",
			edge: 0,
			
			init: function(edge)
			{
				this._super();
				this.edge = edge;
			},
			
			perimeter: function()
			{
				return 4 * this.edge;
			},
			
			area: function()
			{
				return this.edge * this.edge;
			}
		});
		
		var Rectangle = Shape.extend({
			name: "rectangle",
			a: 0,
			b: 0,
			
			init: function(a, b)
			{
				this._super();
				this.a = a;
				this.b = b;
			},
			
			perimeter: function()
			{
				return 2 * (this.a + this.b);
			},
			
			area: function()
			{
				return this.a * this.b;
			}
		});
		
		var Circle = Shape.extend({
			name: "circle",
			r: 0,
			
			init: function(r)
			{
				this._super();
				this.r = r;
			},
			
			perimeter: function()
			{
				return 2 * Math.PI * this.r;
			},
			
			area: function()
			{
				return Math.PI * this.r * this.r;
			}
		});
		
		var Complex = Shape.extend({
			name: "complex",
			x: null,
			y: null,
			
			init: function(x, y)
			{
				this._super();
				this.x = x;
				this.y = y;
			}
		});
		
		var Sum = Complex.extend({
			name: "sum",
			
			perimeter: function()
			{
				return this.x.perimeter() + this.y.perimeter();
			},
			
			area: function()
			{
				return this.x.area() + this.y.area();
			}
		});
		
		var Diff = Complex.extend({
			name: "diff",
			
			init: function(x, y)
			{
				this._super(x, y);
			},
			
			perimeter: function()
			{
				return this.x.perimeter() - this.y.perimeter();
			},
			
			area: function()
			{
				return this.x.area() - this.y.area();
			}
		});
		
		var square      = new Square(5);
		var rectangle   = new Rectangle(4, 6);
		var circle      = new Circle(2);
		var complex     = new Complex(square, circle);
		var sum         = new Sum(square, circle);
		var diff        = new Diff(square, circle);
		
		this.assertEqual("square", square.name);
		this.assertEqual(20, square.perimeter());
		this.assertEqual(25, square.area());
		
		this.assertEqual("rectangle", rectangle.name);
		this.assertEqual(20, rectangle.perimeter());
		this.assertEqual(24, rectangle.area());
		
		this.assertEqual("circle", circle.name);
		this.assertEqual("12.566", circle.perimeter().toFixed(3));
		this.assertEqual("12.566", circle.area().toFixed(3));
		
		this.assertEqual("complex", complex.name);
		this.assertEqual(0, complex.perimeter());
		this.assertEqual(0, complex.area());
		
		this.assertEqual("sum", sum.name);
		this.assertEqual("32.566", sum.perimeter().toFixed(3));
		this.assertEqual("37.566", sum.area().toFixed(3));
		
		this.assertEqual("diff", diff.name);
		this.assertEqual("7.434", diff.perimeter().toFixed(3));
		this.assertEqual("12.434", diff.area().toFixed(3));
	}
});
