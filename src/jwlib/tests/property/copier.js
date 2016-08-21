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

JW.Tests.Property.CopierTestCase = JW.Unit.TestCase.extend({
	testCopier: function()
	{
		var source = new JW.Property(1);
		var target = new JW.Property();
		target.changeEvent.bind(function(params) {
			this.output(params.oldValue + " to " + params.value);
		}, this);
		
		this.setExpectedOutput("null to 1");
		var copier = new JW.Copier(source, {target: target});
		this.assertStrictEqual(1, target.get());
		
		this.setExpectedOutput("1 to 2");
		source.set(2);
		this.assertStrictEqual(2, target.get());
		
		this.setExpectedOutput("2 to null");
		source.set(null);
		this.assertStrictEqual(null, target.get());
		
		this.setExpectedOutput("null to 3");
		source.set(3);
		this.assertStrictEqual(3, target.get());
		
		this.setExpectedOutput();
		copier.destroy();
		source.set(4);
		this.assertStrictEqual(3, target.get());
	},
	
	testAutoTarget: function()
	{
		var source = new JW.Property(1);
		var copier = new JW.Copier(source);
		var target = copier.target;
		target.changeEvent.bind(function(params) {
			this.output(params.oldValue + " to " + params.value);
		}, this);
		this.assertStrictEqual(1, target.get());
		
		this.setExpectedOutput("1 to 2");
		source.set(2);
		this.assertStrictEqual(2, target.get());
		
		this.setExpectedOutput("2 to null");
		source.set(null);
		this.assertStrictEqual(null, target.get());
		
		this.setExpectedOutput("null to 3");
		source.set(3);
		this.assertStrictEqual(3, target.get());
		
		this.setExpectedOutput();
		copier.destroy();
		source.set(4);
	}
});
