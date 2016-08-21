// TypeScript has fancy syntax for class inheritance.
// In JavaScript, this snippet of code introduces 'this._super' syntax for 'JW.extend' inheritance.
JW.ClassUtil = {
	_iid: 0,

	_fnTest: /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/,

	extend: function(subc, supc, body) {
		body = body || {};

		var F = function() {};
		F.prototype = supc.prototype;
		subc.prototype = new F();
		subc.prototype.constructor = subc;
		subc.superclass = supc.prototype;
		subc._super = supc;
		for (var i in body) {
			subc.prototype[i] = JW.ClassUtil.extendMethod(body[i], supc.prototype[i]);
		}
		subc.extend = function(body) {
			var f = function() {
				subc.apply(this, arguments);
			};
			JW.extend(f, subc, body);
			return f;
		};
		return subc;
	},

	extendMethod: function(sub, sup) {
		if ((typeof sup !== "function") ||
			(typeof sub !== "function") ||
			sub.superclass ||
			!JW.ClassUtil._fnTest.test(sub)) {
			return sub;
		}
		return function() {
			var tmp = this._super;
			this._super = sup;
			var result = sub.apply(this, arguments);
			this._super = tmp;
			return result;
		}
	}
};

JW.extend = JW.ClassUtil.extend;

JW.Class.extend = function(body) {
	var f = function() {
		JW.Class.apply(this, arguments);
	};
	JW.extend(f, JW.Class, body);
	return f;
};
