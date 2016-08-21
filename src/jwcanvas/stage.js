/*
	JW.Canvas stage - canvas HTML element adapter for JW.UI.Component.
	
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

JW.Canvas.Stage = JW.UI.Component.extend({
	width       : null,  // [required] Number
	height      : null,  // [required] Number
	fps         : 25,    // [optional] Number
	bodyCls     : null,  // [optional] JW.Canvas.Body subclass
	bodyCfg     : null,  // [optional] Object
	stopOnError : false, // [optional] Boolean
	
	context     : null,  // [readonly] CanvasRenderingContext2D
	body        : null,  // [readonly] this.bodyCls
	mouseBranch : null,  // [readonly] Array of JW.Canvas.Component
	mdownBranch : null,  // [readonly] Array of JW.Canvas.Component
	timer       : null,  // [readonly] JW.Timer
	
	render: function()
	{
		this._super();
		
		this.el.attr({
			width  : this.width,
			height : this.height
		});
		
		this.context = this.el[0].getContext("2d");
		
		this.initBody();
		
		this.mouseBranch = [];
		this.mdownBranch = [];
		
		this.timer = new JW.Timer(1000 / this.fps, true);
		this.timer.bind("tick", this._onTimer, this);
		
		this.el.bind("mousedown", JW.Function.inScope(this._onMouseEvent, this));
		this.el.bind("mouseup",   JW.Function.inScope(this._onMouseEvent, this));
		this.el.bind("mousemove", JW.Function.inScope(this._onMouseEvent, this));
		this.el.bind("mouseout",  JW.Function.inScope(this._onMouseOut, this));
	},
	
	initBody: function()
	{
		var cls = this.bodyCls || JW.Canvas.Component.Body;
		var cfg = JW.apply({}, this.bodyCfg);
		cfg.stage = this;
		this.body = new cls(cfg);
	},
	
	afterAppend: function()
	{
		this._super();
		
		this.timer.start();
	},
	
	destroyComponent: function()
	{
		this.timer.stop();
		
		this._super();
	},
	
	_draw: function()
	{
		this.context.clearRect(0, 0, this.width, this.height);
		this.body._draw();
	},
	
	_onTimer: function()
	{
		if (this.stopOnError)
		{
			if (this._timerHandling)
				return;
			
			this._timerHandling = true;
		}
		
		this._draw();
		
		if (this.stopOnError)
			delete this._timerHandling;
	},
	
	_onMouseEvent: function(event)
	{
		event.preventDefault();
		
		var mouseEventProcessor = this._processMouseEvent(event);
		
		var target = mouseEventProcessor.target;
		var global = mouseEventProcessor.global;
		
		this._setMouseTarget(target);
		this._triggerMouseEvent(event, target, global);
		
		if (event.type === "mousedown")
			this.mdownBranch = this.mouseBranch.concat();
		
		if (event.type === "mouseup")
			this._onMouseUp(event, global);
	},
	
	_onMouseOut: function(event)
	{
		this._setMouseTarget(null);
	},
	
	_onMouseUp: function(event, global)
	{
		var diffIndex = this._getBranchesDiffIndex(this.mdownBranch, this.mouseBranch);
		var target = this.mouseBranch[diffIndex - 1];
		this._triggerMouseEvent(event, target, global, "click");
		this.mdownBranch = [];
	},
	
	_processMouseEvent: function(event)
	{
		var position = this.el.offset();
		var mouseEventProcessor = new JW.Canvas.Event.Mouse.Processor(
			event.pageX - position.left,
			event.pageY - position.top
		);
		
		this.body._processMouseEvent(mouseEventProcessor);
		
		return mouseEventProcessor;
	},
	
	_setMouseTarget: function(target)
	{
		var oldBranch = this.mouseBranch;
		this.mouseBranch = target ? target.getBranch() : [];
		
		var diffIndex = this._getBranchesDiffIndex(oldBranch, this.mouseBranch);
		for (var i = 0; i < oldBranch.length - diffIndex; ++i)
			oldBranch[oldBranch.length - i - 1].trigger("mouseout");
		
		for (var i = diffIndex; i < this.mouseBranch.length; ++i)
			this.mouseBranch[i].trigger("mouseover");
	},
	
	_triggerMouseEvent: function(event, target, global, type)
	{
		if (!target)
			return;
		
		var wasTarget = false;
		var canvasEvent = new JW.Canvas.Event.Mouse(event, target, global, type);
		for (var i = 0; i < this.mouseBranch.length; ++i)
		{
			if (!canvasEvent.isBubble)
				break;
			
			var currentTarget = this.mouseBranch[this.mouseBranch.length - i - 1];
			wasTarget = wasTarget || (currentTarget == target);
			if (!wasTarget)
				continue;
			
			canvasEvent._setCurrentTarget(currentTarget);
			currentTarget.__triggerEvent(canvasEvent, []);
		}
	},
	
	_getBranchesDiffIndex: function(x, y)
	{
		var l = Math.min(x.length, y.length);
		for (var i = 0; i < l; ++i)
		{
			if (x[i] !== y[i])
				return i;
		}
		
		return l;
	}
});

JW.UI.template(JW.Canvas.Stage, {
	main: '<canvas />'
});
