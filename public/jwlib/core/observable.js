/*
	JW observer pattern implementation.
	
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

/**
 * Event object.
 */
JW.Event = JW.Class.extend({
	type    : null, // [required][read-only] String
	target  : null, // [required][read-only] JW.Observable
	
	init: function(type, target)
	{
		this.type   = type;
		this.target = target;
	}
});

/**
 * Base observable object.
 * Used to dispatch events.
 */
JW.Observable = JW.Class.extend({
	__listeners : null, // [private] Map from type to Array of JW.Observable.Listener
	__observers : null, // [private] JW.Map from scope to Array of JW.Observable.Listener
	__flags     : null, // [private] Map from type to Mixed (true - registered, Array - event args)
	
	destroy: function()
	{
		this.purgeAll();
	},
	
	/**
	 * Add event handler.
	 * Supports many various signatures.
	 */
	bind: function(
	/* Signature 1 */
		type,       // [required] String, event type
		handler,    // [required] Function, event handler
		scope,      // [optional] Object, recommended. If specified, event handler will be called in specified scope. Also the handler will be registered to remove on purge(scope) or unbind (type, handler, scope) call
		disposable  // [optional] Boolean, set to true to auto-unbind the listener as soon as event is triggered first time
	
	/* Signature 2
		listeners   // Each argument is Object similar to JW.Observable.Listener */
	
	/* Signature 3
		listeners   // Array of Objects similar to JW.Observable.Listener */
	
	/* Signature 4
		listeners   // Map from type:String to Object { handler, scope, disposable } or handler:Function, and from "scope" and "disposable" to their default values */
	)
	{
		this.__parseListeners(this.__bind, JW.args(arguments));
	},
	
	/**
	 * Remove event listener or all listeners of specified event.
	 * Supports many various signatures (see bind method for more info).
	 */
	unbind: function(
		type,       // [required] String, event type
		handler,    // [optional] Function, event handler
		scope)      // [optional] Object, if specified, only handlers with this scope will be unbound
	{
		this.__parseListeners(this.__unbind, JW.args(arguments));
	},
	
	/**
	 * Remove all event listeners registered for specified scope.
	 */
	purge: function(
		scope)  // [required] Object
	{
		if (!this.__observers)
			return;
		
		var observers = this.__observers.get(scope);
		if (!observers)
			return;
		
		for (var i = 0; i < observers.length; ++i)
		{
			var observer = observers[i];
			this.__removeHandler(observer);
		}
		
		this.__observers.del(scope);
	},
	
	/**
	 * Remove all event listeners. Used in destructor usually.
	 */
	purgeAll: function()
	{
		delete this.__listeners;
		delete this.__observers;
	},
	
	/**
	 * Fire event to call all registered event handlers for specified event type.
	 */
	trigger: function(
		type        // [required] String, event type
		/* args */) // Additional arguments for event handler call
	{
		this.triggerArray(type, JW.args(arguments, 1));
	},
	
	/**
	 * Fire event to call all registered event handlers for specified event type.
	 */
	triggerArray: function(
		type,   // [required] String, event type
		args)   // [optional] Array, additional arguments for event handler call
	{
		// Generate event
		this.__triggerEvent(new JW.Event(type, this), args);
	},
	
	/**
	 * Relay specified event up from another object.
	 * Each event of specified type, triggered by source object, will be
	 * triggered by this object as well.
	 * Use source.unbind(type) to stop events relaying.
	 * Returns handler function.
	 */
	relay: function(
		source, // [required] JW.Observable, source object to relay events from
		type)   // [required] String, event type, all events by default
	{
		return source.bind(type, this.__relayHandler, this);
	},
	
	/**
	 * Relay specified event up from another object, adding it as first parameter.
	 * Each event of specified type, triggered by source object, will be
	 * triggered by this object as well.
	 * Use source.unbind(type) to stop events relaying.
	 * Returns handler function.
	 */
	relayChild: function(
		source,   // [required] JW.Observable, source object to relay events from
		fromType, // [required] String, event type to relay
		toType)   // [optional] String, name of redispatched event
	{
		return source.bind(fromType, function(event) {
			this.triggerArray(toType || fromType, [ event.target ].concat(JW.args(arguments).slice(1)));
		}, this);
	},
	
	/**
	 * Registers specified events as flags. If user binds a new listener to
	 * flag event which has been triggered already, the listener is called
	 * immediately. For example, Ajax "load" event should be flag event to
	 * avoid "if (loaded)" checking each time on binding.
	 *
	 * Can be used several times, for example, on Ajax request reloading.
	 */
	resetFlagEvents: function(/* eventTypes */)
	{
		this.resetFlagEventsArray(JW.args(arguments));
	},
	
	resetFlagEventsArray: function(eventTypes)
	{
		this.__flags = this.__flags || {};
		for (var i = 0; i < eventTypes.length; ++i)
			this.__flags[eventTypes[i]] = true;
	},
	
	__parseListeners: function(callback, args)
	{
		var main = args[0];
		
		if (!main)
			return;
		
		// Signature 1
		if (typeof main === "string")
			return callback.call(this, main, args[1], args[2], args[3]);
		
		// Signature 2
		if (main.type)
		{
			for (var i = 0; i < args.length; ++i)
				callback.call(this, args[i].type, args[i].handler, args[i].scope, args[i].disposable);
			return;
		}
		
		// Signature 3
		if (JW.isArray(main))
		{
			for (var i = 0; i < main.length; ++i)
				callback.call(this, main[i].type, main[i].handler, main[i].scope, main[i].disposable);
			return;
		}
		
		// Signature 4
		for (var i in main)
		{
			if (i === "scope" || i === "disposable")
				continue;
			
			var value = main[i];
			if (typeof value === "function")
				callback.call(this, i, value, main.scope, main.disposable);
			else
				callback.call(this, i, value.handler, JW.def(value.scope, main.scope), JW.def(value.disposable, main.disposable));
		}
	},
	
	__bind: function(
		type,       // [required] String, event type
		handler,    // [required] Function, event handler
		scope,      // [optional] Object, recommended. If specified, event handler will be called in specified scope. Also the handler will be registered to remove on purge(scope) or unbind (type, handler, scope) call
		disposable) // [optional] Boolean, set to true to auto-unbind the listener as soon as event is triggered first time
	{
		// For flag events and disposable handler, just call it and return
		if (disposable && this.__flags && JW.isArray(this.__flags[type]))
		{
			handler.apply(scope || this, this.__flags[type]);
			return;
		}
		
		// Else register new listener
		var listener = {
			type        : type,
			handler     : handler,
			scope       : scope,
			disposable  : !!disposable
		};
		
		this.__listeners = this.__listeners || {};
		this.__listeners[type] = this.__listeners[type] || [];
		this.__listeners[type].push(listener);
		
		if (scope)
		{
			this.__observers = this.__observers || new JW.Map();
			var observers = this.__observers.get(scope);
			if (observers)
				observers.push(listener);
			else
				this.__observers.set(scope, [ listener ]);
		}
		
		// For flag events and simple handler, call it
		if (this.__flags && JW.isArray(this.__flags[type]))
			handler.apply(scope || this, this.__flags[type]);
	},
	
	__unbind: function(
		type,       // [required] String, event type
		handler,    // [optional] Function, event handler
		scope)      // [optional] Object, if specified, only handlers with this scope will be unbound
	{
		if (!this.__listeners)
			return;
		
		var listeners = this.__listeners[type];
		if (!listeners)
			return;
		
		for (var i = 0; i < listeners.length; ++i)
		{
			var listener = listeners[i];
			if ((!handler || listener.handler === handler) &&
				(!scope   || listener.scope   === scope))
			{
				this.__removeObserver(listener);
				listeners.splice(i, 1);
				--i;
			}
		}
		
		if (listeners.length === 0)
			delete this.__listeners[type];
	},
	
	__removeObserver: function(listener)
	{
		if (!this.__observers)
			return;
		
		var observers = this.__observers.get(listener.scope);
		if (!observers)
			return;
		
		JW.Array.removeItem(observers, listener);
		if (observers.length === 0)
			this.__observers.del(listener.scope);
	},
	
	__removeHandler: function(listener)
	{
		if (!this.__listeners)
			return;
		
		var listeners = this.__listeners[listener.type];
		if (!listeners)
			return;
		
		JW.Array.removeItem(listeners, listener);
		if (listeners.length === 0)
			delete this.__listeners[listener.type];
	},
	
	__relayHandler: function(event)
	{
		this.triggerArray(event.type, JW.args(arguments).slice(1));
	},
	
	__triggerEvent: function(event, args)
	{
		var type = event.type;
		var handlerArgs = [ event ].concat(args);
		
		// Store flag event arguments
		if (this.__flags && this.__flags[type])
			this.__flags[type] = handlerArgs;
		
		// Retrieve listeners list
		if (!this.__listeners)
			return;
		
		var listeners = this.__listeners[type];
		if (!listeners)
			return;
		
		var triggers = listeners.concat();
		
		// Unbind disposable listeners
		for (var i = 0; i < listeners.length; ++i)
		{
			var listener = listeners[i];
			if (listener.disposable)
			{
				this.__removeObserver(listener);
				listeners.splice(i, 1);
				--i;
			}
		}
		
		if (listeners.length === 0)
			delete this.__listeners[type];
		
		// Trigger event
		for (var i = 0; i < triggers.length; ++i)
		{
			var listener = triggers[i];
			listener.handler.apply(listener.scope || this, handlerArgs);
		}
	}
});

// Prototype
JW.Observable.Listener = {
	type        : null, // String
	handler     : null, // Function
	scope       : null, // Object
	disposable  : null  // Boolean
};
