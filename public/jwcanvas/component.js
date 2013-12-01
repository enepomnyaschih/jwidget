/*
	JW.Canvas base component implementation.
	
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

JW.Canvas.Component = JW.ObservableConfig.extend({
	// Events:
	// mousedown(event:JW.Canvas.Event.Mouse)
	// mouseup(event:JW.Canvas.Event.Mouse)
	// mousemove(event:JW.Canvas.Event.Mouse)
	// click(event:JW.Canvas.Event.Mouse)
	// mouseover(event:JW.Event)
	// mouseout(event:JW.Event)
	
	x               : 0,        // [optional] Number
	y               : 0,        // [optional] Number
	scaleX          : 1,        // [optional] Number
	scaleY          : 1,        // [optional] Number
	rotate          : 0,        // [optional] Number
	width           : 0,        // [optional] Number
	height          : 0,        // [optional] Number
	
	plugins         : null,     // [optional] Array of JW.Canvas.Plugin
	
	visible         : true,     // [optional] Boolean
	clip            : false,    // [optional] Boolean
	mouseClip       : true,     // [optional] Boolean
	mouseEnabled    : true,     // [optional] Boolean
	mouseChildren   : true,     // [optional] Boolean
	
	// The next options correspond to addChild method specification
	renderParent    : null,     // [optional] JW.Canvas.Component
	renderPosition  : null,     // [optional] Number
	
	parent          : null,     // [readonly] JW.Canvas.Component
	stage           : null,     // [readonly] JW.Canvas.Stage
	graphics        : null,     // [readonly] JW.Canvas.Graphics
	appended        : false,    // [readonly] Boolean
	destroyed       : false,    // [readonly] Boolean
	
	children        : null,     // [readonly] Array of JW.Canvas.Component
	
	transform       : null,     // [readonly] JW.Canvas.Transform
	backTransform   : null,     // [readonly] JW.Canvas.Transform
	
	init: function(config)
	{
		this._super(config);
		
		this._initComponent();
		this._render();
	},
	
	destroy: function()
	{
		if (this.destroyed)
			return;
		
		this.remove();
		
		var plugins  = this.plugins;
		var children = this.children;
		
		this.plugins = [];
		this.removeChildren();
		
		JW.eachByMethod(plugins,  "destroy");
		JW.eachByMethod(children, "destroy");
		
		this.destroyComponent();
		
		delete this.plugins;
		delete this.children;
		delete this.renderParent;
		delete this.stage;
		
		this._super();
	},
	
	/*
	 * Component initialization.
	 * Override this to specify initial values for component properties.
	 * You can build plugins array here, these plugins will prepend ones from config object.
	 * Append superclass method call.
	 */
	initComponent: function()
	{
	},
	
	/*
	 * Component rendering.
	 * Override this to render component's HTML/Graphics.
	 * Template is applied here and all elements are defined.
	 * You can customize elements' properties in this method and finish rendering.
	 * Prepend superclass method call.
	 */
	render: function()
	{
	},
	
	/*
	 * After append to DOM.
	 * Override this to specify any initialization actions that require element
	 * to be inserted into DOM.
	 * Use renderParent or addChild EVERYWHERE to get this work.
	 * Prepend superclass method call.
	 */
	afterAppend: function()
	{
	},
	
	/*
	 * Layout the component.
	 * Use renderParent or addChild EVERYWHERE to get this work.
	 * Prepend superclass method call.
	 */
	doLayout: function()
	{
	},
	
	/*
	 * Layout component totally.
	 */
	doLayoutAll: function()
	{
		if (!this.stage)
			return;
		
		this.doLayout();
		JW.eachByMethod(this.plugins,  "doLayout");
		JW.eachByMethod(this.children, "doLayoutAll");
	},
	
	/*
	 * Component destructor.
	 */
	destroyComponent: function()
	{
	},
	
	/*
	 * Hit testing function. Tests rectangle (0, 0) - (w, h) by default.
	 * Override to specify custom hit testing.
	 */
	hitTest: function( // Boolean
		point) // Array[2]
	{
		return this.mouseClip ? this._inRect(point) : true;
	},
	
	/*
	 * Get plugin instance by its xtype.
	 */
	getPlugin: function(xtype)
	{
		return JW.searchBy(this.plugins, "xtype", xtype);
	},
	
	/*
	 * Add child. Opposite to appendTo.
	 */
	addChild: function(
		cmp,   // [required] JW.Canvas.Component
		index) // [optional] Number
	{
		index = JW.defn(index, this.children.length);
		
		cmp.remove();
		
		this.children.splice(index, 0, cmp);
		
		if (this.stage)
		{
			var stage = this.stage;
			function stageRec(c)
			{
				c.stage = stage;
				JW.each(c.children, stageRec);
			}
			
			stageRec(cmp);
		}
		
		cmp.parent = this;
		cmp._afterAppend();
	},
	
	/*
	 * Remove component from the parent and DOM.
	 */
	remove: function()
	{
		if (this.parent)
		{
			this.parent._removeChild(this);
			delete this.parent;
			delete this.stage;
		}
	},
	
	/*
	 * Remove all children.
	 */
	removeChildren: function()
	{
		var children = this.children;
		
		JW.each(this.children, function(cmp) {
			delete cmp.parent;
		}, this);
		
		this.children = [];
		
		return children;
	},
	
	/*
	 * Removes child at specified position and returns one.
	 */
	removeChild: function(index)
	{
		var cmp = this.children[index];
		cmp.remove();
		return cmp;
	},
	
	/*
	 * Get all children.
	 */
	getChildren: function()
	{
		return this.children.concat();
	},
	
	/*
	 * Get DOM branch (from body to this).
	 */
	getBranch: function()
	{
		var result = [];
		function rec(cmp)
		{
			if (!cmp)
				return;
			
			rec(cmp.parent);
			result.push(cmp);
		}
		
		rec(this);
		return result;
	},
	
	/*
	 * Set component coordinates.
	 */
	setX: function(x)
	{
		this.x = x;
		this._invalidateTransform();
	},
	
	/*
	 * Set component coordinates.
	 */
	setY: function(y)
	{
		this.y = y;
		this._invalidateTransform();
	},
	
	/*
	 * Set component coordinates.
	 */
	setXY: function(x, y)
	{
		this.x = x;
		this.y = y;
		this._invalidateTransform();
	},
	
	/*
	 * Set component rotation.
	 */
	setRotate: function(value)
	{
		this.rotate = value;
		this._invalidateTransform();
	},
	
	/*
	 * Set component scale.
	 */
	setScaleX: function(x)
	{
		this.scaleX = x;
		this._invalidateTransform();
	},
	
	/*
	 * Set component scale.
	 */
	setScaleY: function(y)
	{
		this.scaleY = y;
		this._invalidateTransform();
	},
	
	/*
	 * Set component scale.
	 */
	setScale: function(x, y)
	{
		y = JW.defn(y, x);
		this.scaleX = x;
		this.scaleY = y;
		this._invalidateTransform();
	},
	
	/*
	 * Set component size.
	 */
	setWidth: function(w)
	{
		this.width = w;
	},
	
	/*
	 * Set component size.
	 */
	setHeight: function(h)
	{
		this.height = h;
	},
	
	/*
	 * Set component size.
	 */
	setSize: function(w, h)
	{
		h = JW.defn(h, w);
		this.width  = w;
		this.height = h;
	},
	
	/*
	 * Set component visibility.
	 */
	setVisible: function(value)
	{
		this.visible = value;
	},
	
	/*
	 * Set component clipping.
	 */
	setClip: function(value)
	{
		this.clip = value;
	},
	
	/*
	 * Set component mouse clipping.
	 */
	setMouseClip: function(value)
	{
		this.mouseClip = value;
	},
	
	/*
	 * Set component mouse events enabled.
	 */
	setMouseEnabled: function(value)
	{
		this.mouseEnabled = value;
	},
	
	/*
	 * Set component children mouse events enabled.
	 */
	setMouseChildren: function(value)
	{
		this.mouseChildren = value;
	},
	
	/*
	 * Get transformation matrix from global to local.
	 */
	getTransform: function()
	{
		if (this.transform)
			return this.transform;
		
		var parentTransform = this.parent ? this.parent.getTransform() : JW.Canvas.Transform.identity;
		this.transform = parentTransform.complex(this.x, this.y, this.scaleX, this.scaleY, this.rotate);
		return this.transform;
	},
	
	/*
	 * Get transformation matrix from local to global.
	 */
	getBackTransform: function()
	{
		if (this.backTransform)
			return this.backTransform;
		
		this.backTransform = this.getTransform().back();
		return this.backTransform;
	},
	
	/*
	 * Convert coordinates from global to local.
	 */
	globalToLocal: function(point)
	{
		return this.getBackTransform().convert(point);
	},
	
	/*
	 * Convert coordinates from local to global.
	 */
	localToGlobal: function(point)
	{
		return this.getTransform().convert(point);
	},
	
	_draw: function()
	{
		if (!this.visible)
			return;
		
		var context = this.stage.context;
		
		context.save();
		
		context.translate(this.x, this.y);
		context.rotate(this.rotate);
		context.scale(this.scaleX, this.scaleY);
		
		if (this.clip)
		{
			context.beginPath();
			context.rect(0, 0, this.width, this.height);
			context.closePath();
			context.clip();
		}
		
		this._drawGraphics();
		JW.eachByMethod(this.children, "_draw");
		
		context.restore();
	},
	
	_drawGraphics: function()
	{
		var context = this.stage.context;
		var pathBegun = false;
		
		function drawItem(item) {
			item.draw(context);
			
			// close first to handle 2 consequtive beginPath calls
			if (item.isClosePath)
				pathBegun = false;
			
			if (item.isBeginPath)
				pathBegun = true;
		}
		
		context.save();
		JW.each(this.graphics.items, drawItem, this);
		if (pathBegun)
			drawItem(new JW.Canvas.Graphics.Item.ClosePath());
		context.restore();
	},
	
	_processMouseEvent: function(mouseEventProcessor)
	{
		if (!this.visible || !this.mouseEnabled)
			return;
		
		var local = this.globalToLocal(mouseEventProcessor.global);
		if (this.hitTest(local))
			mouseEventProcessor.target = this;
		
		if (this.clip && !this._inRect(local))
			return;
		
		if (!this.mouseChildren)
			return;
		
		JW.eachByMethod(this.children, "_processMouseEvent", [ mouseEventProcessor ]);
	},
	
	_invalidateTransform: function()
	{
		if (!this.transform)
			return;
		
		delete this.transform;
		delete this.backTransform;
		
		JW.eachByMethod(this.children, "_invalidateTransform");
	},
	
	_initComponent: function()
	{
		var plugins = this.plugins || [];
		this.plugins = [];
		this.children = [];
		
		this.initComponent();
		
		this.plugins = this.plugins.concat(plugins);
		for (var i = 0; i < this.plugins.length; ++i)
			this.plugins[i].attach(this);
	},
	
	_render: function()
	{
		this.graphics = new JW.Canvas.Graphics();
		
		this.render();
		for (var i = 0; i < this.plugins.length; ++i)
			this.plugins[i].render();
		
		this._applyRenderTo();
	},
	
	_applyRenderTo: function()
	{
		if (this.renderParent)
			this.renderParent.addChild(this, this.renderPosition);
		
		this._afterAppend();
	},
	
	_afterAppend: function()
	{
		if (this.appended || this.destroyed || !this.stage)
			return;
		
		this.appended = true;
		this.afterAppend();
		JW.eachByMethod(this.children, "_afterAppend");
		JW.eachByMethod(this.plugins,   "afterAppend");
		
		this.doLayoutAll();
	},
	
	_removeChild: function(cmp)
	{
		this.children.removeItem(cmp);
	},
	
	_inRect: function(point)
	{
		return (point[0] >= 0) && (point[0] <= this.width) &&
			   (point[1] >= 0) && (point[1] <= this.height);
	}
});
