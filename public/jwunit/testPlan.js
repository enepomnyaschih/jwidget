/*
	JW test plan.
	
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

JW.ns("JW.Unit");

JW.Unit.TestPlan = JW.Config.extend({
	/*
	Required
	String __name;
	Object ns;
	
	Fields
	JW.Unit.TestSuit testSuit;
	JW.Unit.Broadcaster __broadcaster;
	JW.Unit.UI.View view;
	*/
	
	init: function(config) {
		this._super(config);
		this._initBroadcaster();
		this._initTestSuit();
		this._initView();
	},
	
	run: function() {
		this.testSuit.__start();
	},
	
	_initBroadcaster: function() {
		this.__broadcaster = new JW.Unit.Broadcaster();
	},
	
	_initTestSuit: function() {
		this.testSuit = JW.Unit.TestSuit.getSuit({
			__name        : this.__name,
			__broadcaster : this.__broadcaster,
			ns            : this.ns
		});
		this.testSuit.__build();
	},
	
	_initView: function() {
		this.view = new JW.Unit.UI.View({
			testPlan : this,
			renderTo : document.body
		});
	}
});
