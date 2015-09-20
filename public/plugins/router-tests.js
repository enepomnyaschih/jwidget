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
	testRouter: function() {
		var test = this;

		var Routable = function(name) {
			Routable._super.call(this);
			this.name = name;
			test.output("Create " + name);
			this.path = this.own(new JW.Property());
			this.path.changeEvent.bind(function(params) {
				test.output("Set path for " + this.name + " to " + params.value);
			}, this);
		};

		JW.extend(Routable, JW.Class, {
			setPath: function(path) {
				this.path.set(path);
			},

			destroyObject: function() {
				test.output("Destroy " + this.name);
			}
		});

		var router = new JW.Plugins.Router({
			handler: {
				routes: {
					"admin": function() {
						return new Routable("admin");
					},
					"app": function() {
						return new Routable("app");
					},
					"settings": function() {
						return new Routable("settings");
					},
					"": function() {
						return new Routable("blank");
					},
				},
				notFound: function(core) {
					return new Routable("not found: " + core);
				}
			}
		});

		router.target.changeEvent.bind(function(params) {
			if (params.value) {
				test.output("Activate " + params.value.name);
			} else {
				test.output("Deactivate");
			}
		});

		this.setExpectedOutput(
			"Create admin",
			"Activate admin"
		);
		router.path.set("admin");

		this.setExpectedOutput();
		router.path.set("admin");
		router.path.set("/admin");

		this.setExpectedOutput(
			"Set path for admin to users"
		);
		router.path.set("admin/users");

		this.setExpectedOutput(
			"Set path for admin to companies"
		);
		router.path.set("admin/companies");

		this.setExpectedOutput(
			"Deactivate",
			"Destroy admin",
			"Create app",
			"Activate app",
			"Set path for app to emails"
		);
		router.path.set("app/emails");

		this.setExpectedOutput(
			"Set path for app to null"
		);
		router.path.set("app");

		this.setExpectedOutput(
			"Deactivate",
			"Destroy app"
		);
		router.path.set(null);

		this.setExpectedOutput(
			"Create blank",
			"Activate blank"
		);
		router.path.set("");

		this.setExpectedOutput(
			"Deactivate",
			"Destroy blank",
			"Create settings",
			"Activate settings",
			"Set path for settings to profile/password"
		);
		router.path.set("settings/profile/password");

		this.setExpectedOutput(
			"Deactivate",
			"Destroy settings",
			"Create not found: other",
			"Activate not found: other",
			"Set path for not found: other to smile/happy"
		);
		router.path.set("other/smile/happy");

		this.setExpectedOutput(
			"Deactivate",
			"Destroy not found: other"
		);
		router.destroy();
	}
});

jQuery(function() {
	setTimeout(function() {
		JW.Unit.run("JW.Tests", JW.Tests);
	}, 1000);
});
