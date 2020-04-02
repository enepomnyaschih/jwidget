/*
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

JW.Tests.Core.ClassTestCase = JW.Unit.TestCase.extend({
	testExtend: function()
	{
		var Shape = function() {
			Shape._super.call(this);
		};
		JW.extend(Shape, JW.Class, {
			name      : "shape",
			perimeter : function() { return 0; },
			area      : function() { return 0; }
		});
		
		var Square = function(edge) {
			Square._super.call(this);
			this.edge = edge;
		};
		JW.extend(Square, Shape, {
			name: "square",
			
			perimeter: function()
			{
				return 4 * this.edge;
			},
			
			area: function()
			{
				return this.edge * this.edge;
			}
		});
		
		var Rectangle = function(a, b) {
			Rectangle._super.call(this);
			this.a = a;
			this.b = b;
		};
		JW.extend(Rectangle, Shape, {
			name: "rectangle",
			
			perimeter: function()
			{
				return 2 * (this.a + this.b);
			},
			
			area: function()
			{
				return this.a * this.b;
			}
		});
		
		var Circle = function(r) {
			Circle._super.call(this);
			this.r = r;
		};
		JW.extend(Circle, Shape, {
			name: "circle",
			
			perimeter: function()
			{
				return 2 * Math.PI * this.r;
			},
			
			area: function()
			{
				return Math.PI * this.r * this.r;
			}
		});
		
		var Complex = function(x, y) {
			Complex._super.call(this);
			this.x = x;
			this.y = y;
		};
		JW.extend(Complex, Shape, {
			name: "complex"
		});
		
		var Sum = function(x, y) {
			Sum._super.call(this, x, y);
		};
		JW.extend(Sum, Complex, {
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
		
		var Diff = function(x, y) {
			Diff._super.call(this, x, y);
		};
		JW.extend(Diff, Complex, {
			name: "diff",
			
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
	},
	
	testOwn: function()
	{
		var cls = function(testCase, value) {
			cls._super.call(this);
			this.testCase = testCase;
			this.value = value;
		};
		
		JW.extend(cls, JW.Class, {
			destroyObject: function() {
				this.testCase.output("destroy " + this.value);
				this._super();
			}
		});
		
		var a = new cls(this, "a");
		var b = new cls(this, "b");
		var c = new cls(this, "c");
		var d = new cls(this, "d");
		a.own(b);
		a.own(c);
		b.own(d);
		this.setExpectedOutput(
			"destroy c",
			"destroy d",
			"destroy b",
			"destroy a"
		);
		a.destroy();
	}
});
