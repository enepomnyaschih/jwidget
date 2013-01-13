/*
	jWidget Lib source file.
	
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

JW.Event = function() {
	JW.Event.superclass.call(this);
	this.attachments = {};
};

JW.extend(JW.Event, JW.Class, {
	/*
	Fields
	Map<JW.EventAttachment> attachments;
	*/
	
	destroy: function() {
		this.purge();
	},
	
	bind: function(callback, scope) {
		var attachment = new JW.EventAttachment(this, callback, scope);
		this.attachments[attachment._iid] = attachment;
		return attachment;
	},
	
	unbind: function(attachment) {
		delete this.attachments[attachment._iid];
	},
	
	purge: function() {
		this.attachments = {};
	},
	
	trigger: function(params) {
		JW.getValuesArray(this.attachments).eachByMethod("_trigger", [ params ]);
	}
});
