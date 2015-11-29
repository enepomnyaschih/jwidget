/*
	jWidget UI tests.
	
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

JW.Tests = {};
JW.Tests.Plugins = {};

JW.Tests.Plugins.RouterTestCase = JW.Unit.TestCase.extend({
	setupAll: function() {
		var test = this;

		test.Base = function(name, path) {
			test.Base._super.call(this);
			this.name = name;
			path = path || null;
			test.output("Create " + name + " as " + path);
			this.path = this.own(new JW.Property(path));
		};

		JW.extend(test.Base, JW.UI.Component, {
			setPath: function(path) {
				this.path.set(path);
			},

			beforeRender: function() {
				this._super();
				test.output("Render " + this.name);
			},

			afterDestroy: function() {
				test.output("Destroy " + this.name);
				this._super();
			}
		});

		test.Routable = function(name, path) {
			test.Routable._super.call(this, name, path);
			this.path.changeEvent.bind(function(params) {
				test.output("Set " + this.name + " to " + params.value);
			}, this);
		};

		JW.extend(test.Routable, test.Base);

		test.Router = function(name, path, cfg) {
			test.Router._super.call(this, name, path);
			this.cfg = cfg;
		};

		JW.extend(test.Router, test.Base, {
			renderTarget: function() {
				var cfg = JW.apply({}, this.cfg, {path: this.path});
				this.router = this.own(new JW.Plugins.Router(cfg));
				this.router.update();
				return this.router.target;
			}
		});

		JW.UI.template(this.Router, {
			main: '<div style="display: none;"><div jwid="target"></div></div>'
		});
	},

	testRouter: function() {
		var target = new JW.Property();

		this.setExpectedOutput(
			"Create router as null",
			"Render router",
			"Create blank as null",
			"Render blank"
		);
		var router = new this.Router("router", null, {
			handler: {
				routes: {
					"admin"   : function(arg) { return new this.Routable("admin", arg);    },
					"app"     : function(arg) { return new this.Routable("app", arg);      },
					"settings": function()    { return new this.Routable("settings");      }, // arg is missing by intent - checking setPath call
					""        : function(arg) { return new this.Routable("blank", arg);    }
				},
				notFound: function(route, arg) { return new this.Routable("not found: " + route, arg); }
			},
			scope: this
		});
		router.renderTo('body');

		this.setExpectedOutput(
			"Destroy blank",
			"Create admin as null",
			"Render admin"
		);
		router.path.set("admin");

		this.setExpectedOutput();
		router.path.set("admin");
		router.path.set("/admin");

		this.setExpectedOutput(
			"Set admin to users"
		);
		router.path.set("admin/users");

		this.setExpectedOutput(
			"Set admin to companies"
		);
		router.path.set("admin/companies");

		this.setExpectedOutput(
			"Destroy admin",
			"Create app as emails",
			"Render app"
		);
		router.path.set("app/emails");

		this.setExpectedOutput(
			"Set app to null"
		);
		router.path.set("app");

		this.setExpectedOutput(
			"Destroy app",
			"Create blank as null",
			"Render blank"
		);
		router.path.set(null);

		this.setExpectedOutput();
		router.path.set("");

		this.setExpectedOutput(
			"Destroy blank",
			"Create settings as null",
			"Render settings",
			"Set settings to profile/password"
		);
		router.path.set("settings/profile/password");

		this.setExpectedOutput(
			"Destroy settings",
			"Create not found: other as smile/happy",
			"Render not found: other"
		);
		router.path.set("other/smile/happy");

		this.setExpectedOutput(
			"Destroy not found: other",
			"Destroy router"
		);
		router.destroy();
	},

	testSubrouter: function() {
		var target = new JW.Property();

		this.setExpectedOutput(
			"Create router as null",
			"Render router",
			"Create blank as null",
			"Render blank"
		);
		var router = new this.Router("router", null, {
			handler: {
				routes: {
					"admin": function(arg) {
						return new this.Router("admin", arg, {
							handler: {
								routes: {
									"users" : function(arg) { return new this.Routable("users", arg);  },
									""      : function(arg) { return new this.Routable("a-blank", arg) }
								}
							},
							scope: this
						});
					},
					"settings": function(arg) {
						return new this.Router("settings", arg, {
							handler: {
								routes: {
									"profile": function(arg) { return new this.Routable("profile", arg); },
									"social" : function(arg) { return new this.Routable("social", arg);  },
									""       : function(arg) { return new this.Routable("s-blank", arg)  }
								}
							},
							scope: this
						});
					},
					"": function(arg) { return new this.Routable("blank", arg); }
				},
				notFound: function(route, arg) { return new this.Routable("not found: " + route, arg); }
			},
			scope: this
		});
		router.renderTo('body');

		this.setExpectedOutput(
			"Destroy blank",
			"Create admin as null",
			"Render admin",
			"Create a-blank as null",
			"Render a-blank"
		);
		router.path.set("admin");

		this.setExpectedOutput(
			"Destroy a-blank",
			"Create users as null",
			"Render users"
		);
		router.path.set("admin/users");

		this.setExpectedOutput(
			"Destroy users",
			"Destroy admin",
			"Create settings as profile",
			"Render settings",
			"Create profile as null",
			"Render profile"
		);
		router.path.set("settings/profile");

		this.setExpectedOutput(
			"Set profile to companies"
		);
		router.path.set("settings/profile/companies");

		this.setExpectedOutput(
			"Destroy profile",
			"Create social as facebook",
			"Render social"
		);
		router.path.set("settings/social/facebook");

		this.setExpectedOutput(
			"Destroy social",
			"Destroy settings",
			"Destroy router"
		);
		router.destroy();
	},

	testDestroyActiveError: function() {
		this.setExpectedOutput(
			"Create router as one",
			"Render router"
		);
		var router = new this.Router("router", "one", {
			handler: {
				routes: {
					"one": function(arg) {
						router.path.set("two");
					}
				}
			},
			scope: this
		});

		try {
			router.renderTo("body");
		} catch (e) {
			if (e.message.indexOf("Can't update router because its update cycle is already active") === 0) {
				JW.Plugins.Router._routerStack = [];
				return;
			}
		}
		JW.Plugins.Router._routerStack = [];
		throw new Error("Active router error wasn't thrown");
	},

	testDestroyNonTopError: function() {
		this.setExpectedOutput(
			"Create router as one",
			"Render router"
		);
		var router = new this.Router("router", "one", {
			handler: {
				routes: {}
			},
			scope: this
		});
		router.renderTo("body");

		this.setExpectedOutput(
			"Create router2 as two",
			"Render router2"
		);
		var router2 = new this.Router("router2", "two", {
			handler: {
				routes: {}
			},
			scope: this
		});
		router2.renderTo("body");

		try {
			router.router.destroy();
		} catch (e) {
			if (e.message.indexOf("Router can not be destroyed because it is not on top of router stack") === 0) {
				JW.Plugins.Router._routerStack = [];
				return;
			}
		}
		JW.Plugins.Router._routerStack = [];
		throw new Error("Router stack position error wasn't thrown");
	},

	testRedirect: function() {
		var target = new JW.Property();

		this.setExpectedOutput(
			"Create router as null",
			"Render router"
		);
		var router = new this.Router("router", null, {
			handler: {
				routes: {
					"source": function(arg) { return new JW.Plugins.Router.Redirector("target/" + arg); },
					"target": function(arg) {
						return new this.Router("target", arg, {
							handler: {
								routes: {
									"source": function(arg) { return new JW.Plugins.Router.Redirector("target/" + arg); },
									"target": function(arg) { return new this.Routable("nested-target", arg); },
									"back"  : function(arg) { return new JW.Plugins.Router.Redirector("target2", -1); },
									"abs"   : function(arg) { return new JW.Plugins.Router.Redirector("target2", 0); },
									"into"  : function(arg) { return new JW.Plugins.Router.Redirector("source/jaja", 1); }
								}
							},
							scope: this
						});
					},
					"target2": function(arg) {
						return new this.Router("target2", arg, {
							handler: {
								routes: {
								}
							},
							scope: this
						});
					},
					"admin": function(arg) { return new this.Routable("admin", arg); }
				}
			},
			scope: this
		});
		router.renderTo("body");

		step0.call(this);

		function step0() {
			this.setExpectedOutput(
				"Create target as hello",
				"Render target"
			);
			router.path.set("source/hello");

			this.sleep(100, step1, this);
		}

		function step1() {
			this.assertStrictEqual("target/hello", router.path.get());

			this.setExpectedOutput(
				"Create nested-target as magic",
				"Render nested-target"
			);
			router.path.set("target/source/magic");

			this.sleep(100, step2, this);
		}

		function step2() {
			this.assertStrictEqual("target/target/magic", router.path.get());

			this.setExpectedOutput(
				"Destroy nested-target",
				"Destroy target",
				"Create target2 as null",
				"Render target2"
			);
			router.path.set("target/back");

			this.sleep(100, step3, this);
		}

		function step3() {
			this.assertStrictEqual("target2", router.path.get());

			this.setExpectedOutput(
				"Destroy target2",
				"Create target as target",
				"Render target",
				"Create nested-target as null",
				"Render nested-target"
			);
			router.path.set("target/target");

			this.setExpectedOutput(
				"Destroy nested-target",
				"Destroy target",
				"Create target2 as null",
				"Render target2"
			);
			JW.Plugins.Router.redirect("abs");

			this.sleep(100, step4, this);
		}

		function step4() {
			this.assertStrictEqual("target2", router.path.get());

			this.setExpectedOutput(
				"Destroy target2",
				"Create target as target",
				"Render target",
				"Create nested-target as null",
				"Render nested-target"
			);
			router.path.set("target/target");

			this.setExpectedOutput(
				"Destroy nested-target", // redirecting to source
				"Create nested-target as jaja", // and back to target
				"Render nested-target"
			);
			JW.Plugins.Router.redirect("target/into", -1);

			this.sleep(100, step5, this);
		}

		function step5() {
			this.assertStrictEqual("target/target/jaja", router.path.get());

			this.setExpectedOutput(
				"Destroy nested-target",
				"Destroy target",
				"Create admin as vasya",
				"Render admin"
			);
			router.router.redirect("admin/vasya");

			this.setExpectedOutput(
				"Destroy admin",
				"Destroy router"
			);
			router.destroy();
		}
	},

	testRedirectNoRouterError: function() {
		try {
			JW.Plugins.Router.redirect("hello");
		} catch (e) {
			if (e.message.indexOf("Can not perform URL redirection to hello in scope CURRENT: No routers exist in the system.") === 0) {
				return;
			}
		}
		JW.Plugins.Router._routerStack = [];
		throw new Error("Router inexistance error wasn't thrown");
	},

	testRedirectActiveError: function() {
		this.setExpectedOutput(
			"Create router as one",
			"Render router"
		);
		var router = new this.Router("router", "one", {
			handler: {
				routes: {
					"one": function(arg) {
						JW.Plugins.Router.redirect("hello");
					}
				}
			},
			scope: this
		});

		try {
			router.renderTo("body");
		} catch (e) {
			if (e.message.indexOf("Can not perform URL redirection to hello in scope CURRENT: Update cycle is already active.") === 0) {
				JW.Plugins.Router._routerStack = [];
				return;
			}
		}
		JW.Plugins.Router._routerStack = [];
		throw new Error("Active router error wasn't thrown");
	},

	testRedirectDepthError: function() {
		this.setExpectedOutput(
			"Create router as one",
			"Render router"
		);
		var router = new this.Router("router", "one", {
			handler: {
				routes: {}
			},
			scope: this
		});
		router.renderTo("body");

		try {
			JW.Plugins.Router.redirect("hello", -1)
		} catch (e) {
			if (e.message.indexOf("Can not perform URL redirection to hello in scope -1: Current router stack contains only") === 0) {
				JW.Plugins.Router._routerStack = [];
				return;
			}
		}
		JW.Plugins.Router._routerStack = [];
		throw new Error("Router stack depth error wasn't thrown");
	}
});

jQuery(function() {
	setTimeout(function() {
		JW.Unit.run("JW.Tests", JW.Tests);
	}, 1000);
});
