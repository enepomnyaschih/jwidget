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

JW.Tests.Core.CoreTestCase = JW.Unit.TestCase.extend({
	testIsArray: function()
	{
		this.assertFalse(JW.isArray(undefined));
		this.assertFalse(JW.isArray(null));
		this.assertFalse(JW.isArray(0));
		this.assertFalse(JW.isArray(1));
		this.assertFalse(JW.isArray(true));
		this.assertFalse(JW.isArray(false));
		this.assertFalse(JW.isArray(''));
		this.assertFalse(JW.isArray('lala'));
		this.assertFalse(JW.isArray({}));
		this.assertFalse(JW.isArray({ length: 1 }));
		this.assertTrue (JW.isArray([]));
		this.assertTrue (JW.isArray([ 1 ]));
		this.assertFalse(JW.isArray(JW.emptyFn));
		this.assertFalse(JW.isArray(/abc/i));
		this.assertFalse(JW.isArray(new Date()));
	},
	
	testIsObject: function()
	{
		this.assertFalse(JW.isObject(undefined));
		this.assertFalse(JW.isObject(null));
		this.assertFalse(JW.isObject(0));
		this.assertFalse(JW.isObject(1));
		this.assertFalse(JW.isObject(true));
		this.assertFalse(JW.isObject(false));
		this.assertFalse(JW.isObject(''));
		this.assertFalse(JW.isObject('lala'));
		this.assertTrue (JW.isObject({}));
		this.assertTrue (JW.isObject({ length: 1 }));
		this.assertFalse(JW.isObject([]));
		this.assertFalse(JW.isObject([ 1 ]));
		this.assertFalse(JW.isObject(JW.emptyFn));
		this.assertFalse(JW.isObject(/abc/i));
		this.assertFalse(JW.isObject(new Date()));
	},
	
	testIsUndefined: function()
	{
		this.assertTrue (JW.isUndefined(undefined));
		this.assertFalse(JW.isUndefined(null));
		this.assertFalse(JW.isUndefined(0));
		this.assertFalse(JW.isUndefined(1));
		this.assertFalse(JW.isUndefined(true));
		this.assertFalse(JW.isUndefined(false));
		this.assertFalse(JW.isUndefined(''));
		this.assertFalse(JW.isUndefined('lala'));
		this.assertFalse(JW.isUndefined({}));
		this.assertFalse(JW.isUndefined({ length: 1 }));
		this.assertFalse(JW.isUndefined([]));
		this.assertFalse(JW.isUndefined([ 1 ]));
		this.assertFalse(JW.isUndefined(JW.emptyFn));
		this.assertFalse(JW.isUndefined(/abc/i));
		this.assertFalse(JW.isUndefined(new Date()));
	},
	
	testIsDefined: function()
	{
		this.assertFalse(JW.isDefined(undefined));
		this.assertTrue (JW.isDefined(null));
		this.assertTrue (JW.isDefined(0));
		this.assertTrue (JW.isDefined(1));
		this.assertTrue (JW.isDefined(true));
		this.assertTrue (JW.isDefined(false));
		this.assertTrue (JW.isDefined(''));
		this.assertTrue (JW.isDefined('lala'));
		this.assertTrue (JW.isDefined({}));
		this.assertTrue (JW.isDefined({ length: 1 }));
		this.assertTrue (JW.isDefined([]));
		this.assertTrue (JW.isDefined([ 1 ]));
		this.assertTrue (JW.isDefined(JW.emptyFn));
		this.assertTrue (JW.isDefined(/abc/i));
		this.assertTrue (JW.isDefined(new Date()));
	},
	
	testIsNull: function()
	{
		this.assertFalse(JW.isNull(undefined));
		this.assertTrue (JW.isNull(null));
		this.assertFalse(JW.isNull(0));
		this.assertFalse(JW.isNull(1));
		this.assertFalse(JW.isNull(true));
		this.assertFalse(JW.isNull(false));
		this.assertFalse(JW.isNull(''));
		this.assertFalse(JW.isNull('lala'));
		this.assertFalse(JW.isNull({}));
		this.assertFalse(JW.isNull({ length: 1 }));
		this.assertFalse(JW.isNull([]));
		this.assertFalse(JW.isNull([ 1 ]));
		this.assertFalse(JW.isNull(JW.emptyFn));
		this.assertFalse(JW.isNull(/abc/i));
		this.assertFalse(JW.isNull(new Date()));
	},
	
	testIsNotNull: function()
	{
		this.assertTrue (JW.isNotNull(undefined));
		this.assertFalse(JW.isNotNull(null));
		this.assertTrue (JW.isNotNull(0));
		this.assertTrue (JW.isNotNull(1));
		this.assertTrue (JW.isNotNull(true));
		this.assertTrue (JW.isNotNull(false));
		this.assertTrue (JW.isNotNull(''));
		this.assertTrue (JW.isNotNull('lala'));
		this.assertTrue (JW.isNotNull({}));
		this.assertTrue (JW.isNotNull({ length: 1 }));
		this.assertTrue (JW.isNotNull([]));
		this.assertTrue (JW.isNotNull([ 1 ]));
		this.assertTrue (JW.isNotNull(JW.emptyFn));
		this.assertTrue (JW.isNotNull(/abc/i));
		this.assertTrue (JW.isNotNull(new Date()));
	},
	
	testIsSet: function()
	{
		this.assertFalse(JW.isSet(undefined));
		this.assertFalse(JW.isSet(null));
		this.assertTrue (JW.isSet(0));
		this.assertTrue (JW.isSet(1));
		this.assertTrue (JW.isSet(true));
		this.assertTrue (JW.isSet(false));
		this.assertTrue (JW.isSet(''));
		this.assertTrue (JW.isSet('lala'));
		this.assertTrue (JW.isSet({}));
		this.assertTrue (JW.isSet({ length: 1 }));
		this.assertTrue (JW.isSet([]));
		this.assertTrue (JW.isSet([ 1 ]));
		this.assertTrue (JW.isSet(JW.emptyFn));
		this.assertTrue (JW.isSet(/abc/i));
		this.assertTrue (JW.isSet(new Date()));
	},
	
	testIsNotSet: function()
	{
		this.assertTrue (JW.isNotSet(undefined));
		this.assertTrue (JW.isNotSet(null));
		this.assertFalse(JW.isNotSet(0));
		this.assertFalse(JW.isNotSet(1));
		this.assertFalse(JW.isNotSet(true));
		this.assertFalse(JW.isNotSet(false));
		this.assertFalse(JW.isNotSet(''));
		this.assertFalse(JW.isNotSet('lala'));
		this.assertFalse(JW.isNotSet({}));
		this.assertFalse(JW.isNotSet({ length: 1 }));
		this.assertFalse(JW.isNotSet([]));
		this.assertFalse(JW.isNotSet([ 1 ]));
		this.assertFalse(JW.isNotSet(JW.emptyFn));
		this.assertFalse(JW.isNotSet(/abc/i));
		this.assertFalse(JW.isNotSet(new Date()));
	},
	
	testIsBlank: function()
	{
		this.assertTrue (JW.isBlank(undefined));
		this.assertTrue (JW.isBlank(null));
		this.assertTrue (JW.isBlank(0));
		this.assertFalse(JW.isBlank(1));
		this.assertFalse(JW.isBlank(true));
		this.assertTrue (JW.isBlank(false));
		this.assertTrue (JW.isBlank(''));
		this.assertFalse(JW.isBlank('lala'));
		this.assertFalse(JW.isBlank({}));
		this.assertFalse(JW.isBlank({ length: 1 }));
		this.assertFalse(JW.isBlank([]));
		this.assertFalse(JW.isBlank([ 1 ]));
		this.assertFalse(JW.isBlank(JW.emptyFn));
		this.assertFalse(JW.isBlank(/abc/i));
		this.assertFalse(JW.isBlank(new Date()));
	},
	
	testIsNotBlank: function()
	{
		this.assertFalse(JW.isNotBlank(undefined));
		this.assertFalse(JW.isNotBlank(null));
		this.assertFalse(JW.isNotBlank(0));
		this.assertTrue (JW.isNotBlank(1));
		this.assertTrue (JW.isNotBlank(true));
		this.assertFalse(JW.isNotBlank(false));
		this.assertFalse(JW.isNotBlank(''));
		this.assertTrue (JW.isNotBlank('lala'));
		this.assertTrue (JW.isNotBlank({}));
		this.assertTrue (JW.isNotBlank({ length: 1 }));
		this.assertTrue (JW.isNotBlank([]));
		this.assertTrue (JW.isNotBlank([ 1 ]));
		this.assertTrue (JW.isNotBlank(JW.emptyFn));
		this.assertTrue (JW.isNotBlank(/abc/i));
		this.assertTrue (JW.isNotBlank(new Date()));
	},
	
	testIsInt: function()
	{
		this.assertTrue (JW.isInt(0));
		this.assertTrue (JW.isInt(-1));
		this.assertTrue (JW.isInt(1));
		this.assertFalse(JW.isInt(0.5));
		this.assertFalse(JW.isInt(-0.001));
		this.assertFalse(JW.isInt(undefined));
		this.assertFalse(JW.isInt(null));
		this.assertFalse(JW.isInt(true));
		this.assertFalse(JW.isInt(false));
		this.assertFalse(JW.isInt(''));
		this.assertFalse(JW.isInt('lala'));
		this.assertFalse(JW.isInt({}));
		this.assertFalse(JW.isInt({ length: 1 }));
		this.assertFalse(JW.isInt([]));
		this.assertFalse(JW.isInt([ 1 ]));
		this.assertFalse(JW.isInt(JW.emptyFn));
		this.assertFalse(JW.isInt(/abc/i));
		this.assertFalse(JW.isInt(new Date()));
	},
	
	testIsNumber: function()
	{
		this.assertTrue (JW.isNumber(0));
		this.assertTrue (JW.isNumber(-1));
		this.assertTrue (JW.isNumber(1));
		this.assertTrue (JW.isNumber(0.5));
		this.assertTrue (JW.isNumber(-0.001));
		this.assertFalse(JW.isNumber(undefined));
		this.assertFalse(JW.isNumber(null));
		this.assertFalse(JW.isNumber(true));
		this.assertFalse(JW.isNumber(false));
		this.assertFalse(JW.isNumber(''));
		this.assertFalse(JW.isNumber('lala'));
		this.assertFalse(JW.isNumber({}));
		this.assertFalse(JW.isNumber({ length: 1 }));
		this.assertFalse(JW.isNumber([]));
		this.assertFalse(JW.isNumber([ 1 ]));
		this.assertFalse(JW.isNumber(JW.emptyFn));
		this.assertFalse(JW.isNumber(/abc/i));
		this.assertFalse(JW.isNumber(new Date()));
	},
	
	testIsString: function()
	{
		this.assertFalse(JW.isString(0));
		this.assertFalse(JW.isString(-1));
		this.assertFalse(JW.isString(1));
		this.assertFalse(JW.isString(0.5));
		this.assertFalse(JW.isString(-0.001));
		this.assertFalse(JW.isString(undefined));
		this.assertFalse(JW.isString(null));
		this.assertFalse(JW.isString(true));
		this.assertFalse(JW.isString(false));
		this.assertTrue (JW.isString(''));
		this.assertTrue (JW.isString('lala'));
		this.assertFalse(JW.isString({}));
		this.assertFalse(JW.isString({ length: 1 }));
		this.assertFalse(JW.isString([]));
		this.assertFalse(JW.isString([ 1 ]));
		this.assertFalse(JW.isString(JW.emptyFn));
		this.assertFalse(JW.isString(/abc/i));
		this.assertFalse(JW.isString(new Date()));
	},
	
	testIsBoolean: function()
	{
		this.assertFalse(JW.isBoolean(undefined));
		this.assertFalse(JW.isBoolean(null));
		this.assertFalse(JW.isBoolean(0));
		this.assertFalse(JW.isBoolean(1));
		this.assertTrue (JW.isBoolean(true));
		this.assertTrue (JW.isBoolean(false));
		this.assertFalse(JW.isBoolean(''));
		this.assertFalse(JW.isBoolean('lala'));
		this.assertFalse(JW.isBoolean({}));
		this.assertFalse(JW.isBoolean({ length: 1 }));
		this.assertFalse(JW.isBoolean([]));
		this.assertFalse(JW.isBoolean([ 1 ]));
		this.assertFalse(JW.isBoolean(JW.emptyFn));
		this.assertFalse(JW.isBoolean(/abc/i));
		this.assertFalse(JW.isBoolean(new Date()));
	},
	
	testIsFunction: function()
	{
		this.assertFalse(JW.isFunction(undefined));
		this.assertFalse(JW.isFunction(null));
		this.assertFalse(JW.isFunction(0));
		this.assertFalse(JW.isFunction(1));
		this.assertFalse(JW.isFunction(true));
		this.assertFalse(JW.isFunction(false));
		this.assertFalse(JW.isFunction(''));
		this.assertFalse(JW.isFunction('lala'));
		this.assertFalse(JW.isFunction({}));
		this.assertFalse(JW.isFunction({ length: 1 }));
		this.assertFalse(JW.isFunction([]));
		this.assertFalse(JW.isFunction([ 1 ]));
		this.assertTrue (JW.isFunction(JW.emptyFn));
		this.assertFalse(JW.isFunction(/abc/i));
		this.assertFalse(JW.isFunction(new Date()));
	},
	
	testIsRegExp: function()
	{
		this.assertFalse(JW.isRegExp(undefined));
		this.assertFalse(JW.isRegExp(null));
		this.assertFalse(JW.isRegExp(0));
		this.assertFalse(JW.isRegExp(1));
		this.assertFalse(JW.isRegExp(true));
		this.assertFalse(JW.isRegExp(false));
		this.assertFalse(JW.isRegExp(''));
		this.assertFalse(JW.isRegExp('lala'));
		this.assertFalse(JW.isRegExp({}));
		this.assertFalse(JW.isRegExp({ length: 1 }));
		this.assertFalse(JW.isRegExp([]));
		this.assertFalse(JW.isRegExp([ 1 ]));
		this.assertFalse(JW.isRegExp(JW.emptyFn));
		this.assertTrue (JW.isRegExp(/abc/i));
		this.assertFalse(JW.isRegExp(new Date()));
	},
	
	testIsDate: function()
	{
		this.assertFalse(JW.isDate(undefined));
		this.assertFalse(JW.isDate(null));
		this.assertFalse(JW.isDate(0));
		this.assertFalse(JW.isDate(1));
		this.assertFalse(JW.isDate(true));
		this.assertFalse(JW.isDate(false));
		this.assertFalse(JW.isDate(''));
		this.assertFalse(JW.isDate('lala'));
		this.assertFalse(JW.isDate({}));
		this.assertFalse(JW.isDate({ length: 1 }));
		this.assertFalse(JW.isDate([]));
		this.assertFalse(JW.isDate([ 1 ]));
		this.assertFalse(JW.isDate(JW.emptyFn));
		this.assertFalse(JW.isDate(/abc/i));
		this.assertTrue (JW.isDate(new Date()));
	},
	
	testDef: function()
	{
		this.assertStrictEqual(10,        JW.def(undefined,   10));
		this.assertStrictEqual(null,      JW.def(null,        10));
		this.assertStrictEqual(0,         JW.def(0,           10));
		this.assertStrictEqual(1,         JW.def(1,           10));
		this.assertStrictEqual(true,      JW.def(true,        10));
		this.assertStrictEqual(false,     JW.def(false,       10));
		this.assertStrictEqual('',        JW.def('',          10));
		this.assertStrictEqual('lala',    JW.def('lala',      10));
		
		var a = {};
		var b = { length: 1 };
		var c = [];
		var d = [ 1 ];
		
		this.assertStrictEqual(a, JW.def(a, 10));
		this.assertStrictEqual(b, JW.def(b, 10));
		this.assertStrictEqual(c, JW.def(c, 10));
		this.assertStrictEqual(d, JW.def(d, 10));
	},
	
	testDefn: function()
	{
		this.assertStrictEqual(10,        JW.defn(undefined,   10));
		this.assertStrictEqual(10,        JW.defn(null,        10));
		this.assertStrictEqual(0,         JW.defn(0,           10));
		this.assertStrictEqual(1,         JW.defn(1,           10));
		this.assertStrictEqual(true,      JW.defn(true,        10));
		this.assertStrictEqual(false,     JW.defn(false,       10));
		this.assertStrictEqual('',        JW.defn('',          10));
		this.assertStrictEqual('lala',    JW.defn('lala',      10));
		
		var a = {};
		var b = { length: 1 };
		var c = [];
		var d = [ 1 ];
		
		this.assertStrictEqual(a, JW.defn(a, 10));
		this.assertStrictEqual(b, JW.defn(b, 10));
		this.assertStrictEqual(c, JW.defn(c, 10));
		this.assertStrictEqual(d, JW.defn(d, 10));
	},
	
	testArgs: function()
	{
		var scope = this;
		function f1()
		{
			scope.assertTrue(JW.Array.equal(JW.args(arguments), [ 'a', 'b', 'c', 'd' ]));
			scope.assertTrue(JW.Array.equal(JW.args(arguments, 1), [ 'b', 'c', 'd' ]));
			scope.assertTrue(JW.Array.equal(JW.args(arguments, 1, 2), [ 'b', 'c' ]));
		}
		
		f1('a', 'b', 'c', 'd');
	},
	
	testRemoveScripts: function()
	{
		var html = '<div width="100" height="100" style="background-color: red;">&nbsp;<script type="text/javascript">while(1)alert();</script></div>';
		var expected = '<div width="100" height="100" style="background-color: red;">&nbsp;</div>';
		this.assertStrictEqual(expected, JW.String.removeScripts(html));
	},
	
	testCmp: function()
	{
		this.assertStrictEqual( 0, JW.cmp(10, 10));
		this.assertStrictEqual( 1, JW.cmp(20, 10));
		this.assertStrictEqual(-1, JW.cmp(10, 20));
		this.assertStrictEqual( 0, JW.cmp("10", "10"));
		this.assertStrictEqual( 1, JW.cmp("20", "10"));
		this.assertStrictEqual(-1, JW.cmp("10", "20"));
		this.assertStrictEqual( 1, JW.cmp("100", "10"));
		this.assertStrictEqual(-1, JW.cmp("10", "100"));
		this.assertStrictEqual( 1, JW.cmp("aB", "Ab"));
		this.assertStrictEqual( 0, JW.cmp("aB", "Ab", true));
		this.assertStrictEqual( 1, JW.cmp("aBc", "Ab", true));
		this.assertStrictEqual(-1, JW.cmp("aB", "Abc", true));
		this.assertStrictEqual( 1, JW.cmp([ "aB" ], [ "Ab" ]));
		this.assertStrictEqual( 0, JW.cmp([ "aB" ], [ "Ab" ], true));
		this.assertStrictEqual( 1, JW.cmp([ "aBc" ], [ "Ab" ], true));
		this.assertStrictEqual(-1, JW.cmp([ "aB" ], [ "Abc" ], true));
		this.assertStrictEqual( 0, JW.cmp([ "ab", "cd" ], [ "ab", "cd" ]));
		this.assertStrictEqual( 1, JW.cmp([ "ab", "ce" ], [ "ab", "cd" ]));
		this.assertStrictEqual(-1, JW.cmp([ "ab", "cd" ], [ "ab", "ce" ]));
		this.assertStrictEqual( 1, JW.cmp([ "ab", "cd", "ef" ], [ "ab", "cd" ]));
		this.assertStrictEqual(-1, JW.cmp([ "ab", "cd" ], [ "ab", "cd", "ef" ]));
		this.assertStrictEqual(-1, JW.cmp([ "ab", "cd" ], [ "ab!cd" ]));
	},
	
	testGet: function()
	{
		var api = {
			_base               : "/app",
			details             : "/details",
			calculationlines    : {
				_base               : "/calclines",
				add                 : "/create",
				modify              : "/modify",
				delet_              : "/delete",
				"0"                 : "/zero"
			},
			extractor           : {
				_base               : "/extractor",
				launch              : "/launch",
				status              : "/status"
			}
		};
		
		this.assertEqual("/details", JW.get(api.details));
		this.assertEqual("/status", JW.get(api, "extractor.status"));
		this.assertEqual("/status", JW.get(api, [ "extractor", "status" ]));
		
		this.assertUndefined(JW.get(api.lala));
		this.assertUndefined(JW.get(api, "extractor.launch.now"));
		this.assertUndefined(JW.get(api, [ "extractor", "launch", "now" ]));
		this.assertUndefined(JW.get(api, "extractor.run.now"));
		this.assertUndefined(JW.get(api, [ "extractor", "run", "now" ]));
		
		this.assertEqual("/details", JW.get(api.details, null, "default!"));
		this.assertEqual("/status", JW.get(api, "extractor.status", "default!"));
		this.assertEqual("/status", JW.get(api, [ "extractor", "status" ], "default!"));
		
		this.assertEqual("default!", JW.get(api.lala, null, "default!"));
		this.assertEqual("default!", JW.get(api, "extractor.launch.now", "default!"));
		this.assertEqual("default!", JW.get(api, [ "extractor", "launch", "now" ], "default!"));
		this.assertEqual("default!", JW.get(api, "extractor.run.now", "default!"));
		this.assertEqual("default!", JW.get(api, [ "extractor", "run", "now" ], "default!"));
		
		this.assertEqual("/zero", JW.get(api, "calculationlines.0"));
		this.assertEqual("/zero", JW.get(api, [ "calculationlines", 0 ]));
	},
	
	testSet: function()
	{
		var api = {
			_base               : "/app",
			details             : "/details",
			calculationlines    : {
				_base               : "/calclines",
				add                 : "/create",
				modify              : "/modify",
				delet_              : "/delete"
			},
			extractor           : {
				_base               : "/extractor",
				launch              : "/launch",
				status              : "/status"
			}
		};
		
		JW.set(api, "Status", "extractor.status");
		JW.set(api, "Base", [ "extractor", "_base" ]);
		
		JW.set(api, "Run", "extractor.run.now");
		JW.set(api, "Update", [ "calculationlines", "update", "now" ]);
		JW.set(api, "Zero", [ "calculationlines", 0, "now" ]);
		
		var expected = {
			_base               : "/app",
			details             : "/details",
			calculationlines    : {
				_base               : "/calclines",
				add                 : "/create",
				modify              : "/modify",
				delet_              : "/delete",
				update              : {
					now                 : "Update"
				},
				"0"                 : {
					now                 : "Zero"
				}
			},
			extractor           : {
				_base               : "Base",
				launch              : "/launch",
				status              : "Status",
				run                 : {
					now                 : "Run"
				}
			}
		};
		
		this.assertStrictEqual(JSON.stringify(expected), JSON.stringify(api));
	},
	
	testMod: function()
	{
		this.assertEpsEqual(0, JW.mod(0, 1), .001);
		this.assertEpsEqual(0, JW.mod(0, 2), .001);
		this.assertEpsEqual(0, JW.mod(1, 1), .001);
		this.assertEpsEqual(1, JW.mod(1, 2), .001);
		this.assertEpsEqual(0, JW.mod(2, 1), .001);
		this.assertEpsEqual(0, JW.mod(2, 2), .001);
		this.assertEpsEqual(2, JW.mod(2, 3), .001);
		this.assertEpsEqual(0, JW.mod(3, 1), .001);
		this.assertEpsEqual(1, JW.mod(3, 2), .001);
		this.assertEpsEqual(0, JW.mod(3, 3), .001);
		this.assertEpsEqual(3, JW.mod(3, 4), .001);
		this.assertEpsEqual(5, JW.mod(26, 7), .001);
		this.assertEpsEqual(1, JW.mod(-1, 2), .001);
		this.assertEpsEqual(0, JW.mod(-2, 2), .001);
		this.assertEpsEqual(3, JW.mod(-25, 7), .001);
		this.assertEpsEqual(.6, JW.mod(.6, 7), .001);
		this.assertEpsEqual(1.6, JW.mod(1.6, 7), .001);
		this.assertEpsEqual(.6, JW.mod(7.6, 7), .001);
		this.assertEpsEqual(.7, JW.mod(7.6, 2.3), .001);
		this.assertEpsEqual(.5, JW.mod(-7.6, 2.7), .001);
	},

	testIid: function()
	{
		this.assertStrictEqual(undefined, JW.iid());
		this.assertStrictEqual(undefined, JW.iid(undefined));
		this.assertStrictEqual(null, JW.iid(null));
		this.assertStrictEqual(1, JW.iid(1));
		this.assertStrictEqual(true, JW.iid(true));
		this.assertStrictEqual(false, JW.iid(false));
		this.assertStrictEqual("", JW.iid(""));
		this.assertStrictEqual(undefined, JW.iid({}));
		this.assertStrictEqual(10, JW.iid({_iid: 10}));
	},

	testDestroy: function()
	{
		JW.destroy();
		JW.destroy(undefined);
		JW.destroy(null);
		JW.destroy(1);
		JW.destroy(true);
		JW.destroy(false);
		JW.destroy("");
		JW.destroy({destroy: 0});

		this.setExpectedOutput("hello");
		var self = this;
		JW.destroy({
			value: 10,
			destroy: function() {
				self.output("hello");
				self.assertStrictEqual(10, this.value);
			}
		});
	}
});
