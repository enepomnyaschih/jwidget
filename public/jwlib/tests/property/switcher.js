/*
	jWidget Lib tests.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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

JW.Tests.Property.SwitcherTestCase = JW.Unit.TestCase.extend({
	testSwitcher: function()
	{
		var property = new JW.Property(1);
		
		this.setExpectedOutput("init 1");
		var switcher = new JW.Switcher(property, {
			init: function(x) { this.output("init " + x); return x + 1; },
			done: function(y, x) { this.output("done " + x + " tracked by " + y); },
			scope: this
		});
		
		this.setExpectedOutput("done 1 tracked by 2", "init 2");
		property.set(2);
		
		this.setExpectedOutput("done 2 tracked by 3");
		property.set(null);
		
		this.setExpectedOutput("init 3");
		property.set(3);
		
		this.setExpectedOutput("done 3 tracked by 4");
		switcher.destroy();
	},
	
	testOptional: function()
	{
		var property = new JW.Property(1);
		var switcher = new JW.Switcher(property);
		switcher.destroy();
	},
	
	testChaining: function()
	{
		var Folder = function() {
			Folder._super.call(this);
			this.selectedDocument = this.own(new JW.Property());
		};
		
		JW.extend(Folder, JW.Class);
		
		var App = function() {
			App._super.call(this);
			this.selectedFolder = this.own(new JW.Property());
			this.selectedDocument = this.own(new JW.Property());
			this.own(new JW.Switcher(this.selectedFolder, {
				init: function(folder) {
					return new JW.Copier(folder.selectedDocument, {target: this.selectedDocument});
				},
				done: JW.destroy,
				scope: this
			}));
		};
		
		JW.extend(App, JW.Class);
	}
});
