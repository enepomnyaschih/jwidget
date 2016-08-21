/*
	JW tests UI events broadcaster.
	
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

JW.Unit.UI.Broadcaster = function() {
	JW.Unit.UI.Broadcaster._super.call(this);
	this.selectEvent = new JW.Event();
	this.startEvent = new JW.Event();
};

JW.extend(JW.Unit.UI.Broadcaster, JW.Class, {
	/*
	Fields
	JW.Event<JW.Unit.UI.Broadcaster.UnitEventParams> selectEvent;
	JW.Event<JW.Unit.UI.Broadcaster.UnitEventParams> startEvent;
	*/
	
	destroy: function() {
		this.startEvent.destroy();
		this.selectEvent.destroy();
		this._super();
	}
});

JW.Unit.UI.Broadcaster.EventParams = function(sender) {
	JW.Unit.UI.Broadcaster.EventParams._super.call(this, sender);
};

JW.extend(JW.Unit.UI.Broadcaster.EventParams, JW.EventParams, {
	/*
	Fields
	JW.Unit.UI.Broadcaster sender;
	*/
});

JW.Unit.UI.Broadcaster.UnitEventParams = function(sender, unit) {
	JW.Unit.UI.Broadcaster.UnitEventParams._super.call(this, sender);
	this.unit = unit;
};

JW.extend(JW.Unit.UI.Broadcaster.UnitEventParams, JW.Unit.UI.Broadcaster.EventParams, {
	/*
	Fields
	JW.Unit.UI.TestUnit unit;
	*/
});
