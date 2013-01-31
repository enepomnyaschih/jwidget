/*
	JW function prototype extension tests.
	
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

JW.Tests.FunctionTestCase = JW.Unit.TestCase.extend({
	testAs: function()
	{
		this.addExpectedOutput(
			"Handler is called in scope 'This is scope!'. param = 20, extraParam = 10"
		);
		
		var testCase = this;
		
		var event = new JW.Event();
		
		var scope = {
			a: "This is scope!"
		};
		
		function handler(param, extraParam)
		{
			testCase.output("Handler is called in scope '" + this.a + "'. param = " + param + ", extraParam = " + extraParam);
		}
		
		event.bind(handler.as(scope, "\0", 10));
		event.trigger(20);
	},
	
	testReturns: function()
	{
		var testCase = this;
		
		function add(x, y)
		{
			testCase.output("add " + x + " + " + y);
			return x + y;
		}
		
		function test(callback, x, y, result)
		{
			testCase.assertStrictEqual(result, callback(x, y));
		}
		
		this.setExpectedOutput("add 5 + 7");
		test(add, 5, 7, 12);
		
		this.setExpectedOutput("add 5 + 7");
		test(add.returns("lala"), 5, 7, "lala");
		
		this.setExpectedOutput("add 5 + 7");
		test(add.returnsArg(1), 5, 7, 7);
		
		test(JW.Function.returns(null, "lala"), 5, 7, "lala");
		test(JW.Function.returnsArg(null, 1), 5, 7, 7);
	},
	
	testBooleanFormulasSimple: function()
	{
		var testCase = this;
		var t = JW.Function.returns(null, true);
		var f = JW.Function.returns(null, false);
		
		function test(callback, result)
		{
			testCase.assertStrictEqual(result, callback());
		}
		
		test(t.and(t), true);
		test(t.and(f), false);
		test(f.and(t), false);
		test(f.and(f), false);
		
		test(t.or(t), true);
		test(t.or(f), true);
		test(f.or(t), true);
		test(f.or(f), false);
		
		test(t.xor(t), 0);
		test(t.xor(f), 1);
		test(f.xor(t), 1);
		test(f.xor(f), 0);
		
		test(t.impl(t), true);
		test(t.impl(f), false);
		test(f.impl(t), true);
		test(f.impl(f), true);
		
		test(t.and(t, t), true);
		test(t.and(t, f), false);
		test(t.and(f, t), false);
		test(f.and(t, t), false);
		
		test(t.and(f.or(t)), true);
		test(f.or(t.and(f)), false);
	},
	
	testBooleanFormulasComplex: function()
	{
		var testCase = this;
		
		function isEven(a)
		{
			return a % 2 == 0;
		}
		
		function isPositive(a)
		{
			return a > 0;
		}
		
		function isFibonacci(a)
		{
			var x = 1;
			var y = 1;
			while (a > y)
			{
				var z = x + y;
				x = y;
				y = z;
			}
			return a == y;
		}
		
		function test(callback, a, result)
		{
			testCase.assertStrictEqual(result, callback(a));
		}
		
		test(JW.Function.and(isEven,       isPositive.not(),   isFibonacci.not()),  0, true);
		test(JW.Function.and(isEven.not(), isPositive,         isFibonacci),        1, true);
		test(JW.Function.and(isEven,       isPositive,         isFibonacci),        2, true);
		test(JW.Function.and(isEven.not(), isPositive,         isFibonacci),        3, true);
		test(JW.Function.and(isEven,       isPositive,         isFibonacci.not()),  4, true);
		test(JW.Function.and(isEven.not(), isPositive,         isFibonacci),        5, true);
		test(JW.Function.and(isEven.not(), isPositive.not(),   isFibonacci.not()), -1, true);
		
		test(JW.Function.and(isEven.not(), isPositive.not(),   isFibonacci.not()),  0, false);
		
		test(JW.Function.or (isEven.not(), isPositive,         isFibonacci),        0, false);
		test(JW.Function.or (isEven,       isPositive.not(),   isFibonacci.not()),  1, false);
		test(JW.Function.or (isEven.not(), isPositive.not(),   isFibonacci.not()),  2, false);
		test(JW.Function.or (isEven,       isPositive.not(),   isFibonacci.not()),  3, false);
		test(JW.Function.or (isEven.not(), isPositive.not(),   isFibonacci),        4, false);
		test(JW.Function.or (isEven,       isPositive.not(),   isFibonacci.not()),  5, false);
		test(JW.Function.or (isEven,       isPositive,         isFibonacci),       -1, false);
		
		test(JW.Function.or (isEven.not(), isPositive.not(),   isFibonacci.not()),  0, true);
	},
	
	testFly: function()
	{
		function func()
		{
			this.output("in func");
			return 10;
		}
		
		var delegate = JW(func).inScope(this).returns(3);
		
		this.setExpectedOutput("in func");
		this.assertStrictEqual(3, delegate());
	}
});
