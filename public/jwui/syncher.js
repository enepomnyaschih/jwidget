/*
	JW ordered collection syncher with UI component.
	
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

JW.UI.Syncher = JW.Syncher.extend({
	collection  : null,     // [required] JW.Collection
	scope       : null,     // [required] JW.UI.Component
	provider    : null,     // [optional] JW.UI.Component subclass, alternative
							// to creator
	dataField   : null,     // [optional] String, if specified, passes data to
							// creator as a field
	extraCfg    : null,     // [optional] Object, extra data to pass to creator
	
	_creator: function(data)
	{
		if (this.creator)
			return this.creator.call(this.scope || this, data, this.extraCfg);
		
		var config;
		if (this.dataField)
		{
			config = {};
			config[this.dataField] = data;
		}
		else
		{
			config = data;
		}
		
		JW.apply(config, this.extraCfg);
		
		return new this.provider(config);
	},
	
	_inserter: function(cmp, index)
	{
		this.scope.addChild(cmp, index);
	},
	
	_remover: function(index)
	{
		return this.scope.removeChild(index);
	},
	
	_destroyer: function(cmp)
	{
		if (this.destroyer)
			return this.destroyer.call(this.scope || this, cmp);
		
		cmp.destroy();
	},
	
	_clearer: function()
	{
		return this.scope.removeChildren();
	}
});
