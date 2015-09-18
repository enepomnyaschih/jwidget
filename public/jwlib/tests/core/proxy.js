/*
	jWidget Lib tests.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
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

JW.Tests.Core.ProxyTestCase = JW.Unit.TestCase.extend({
	testOwnValue: function() {
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
		
		var proxy = new JW.Proxy();
		var a = new cls(this, "a");
		var b = new cls(this, "b");
		var c = new cls(this, "c");
		proxy.ownValue();
		proxy.set(a);
		this.setExpectedOutput("destroy a");
		proxy.set(b);
		this.setExpectedOutput();
		proxy.set(b);
		this.setExpectedOutput("destroy b");
		proxy.set(null);
		this.setExpectedOutput();
		proxy.set(c);
		this.setExpectedOutput("destroy c");
		proxy.destroy();
	}
});
