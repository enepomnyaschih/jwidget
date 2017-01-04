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

JW.Tests.UI.JQEventAttachmentTestCase = JW.Unit.TestCase.extend({
	testWithScope: function() {
		/* Preset */

		var test = this;

		var Component = function() {
			Component._super.call(this);
		};

		JW.extend(Component, JW.UI.Component);

		JW.UI.template(Component, {
			main:
				'<div jwclass="root">' +
					'<div class="item" jwid="a"></div>' +
					'<div class="item" jwid="b"></div>' +
				'</div>'
		});

		var Client = function(component) {
			Client._super.call(this);
			this.own(component.el.jwon("click", this.onRootClick, this));
			this.own(component.el.jwon("click", ".item", this.onItemClick, this));
		};

		JW.extend(Client, JW.Class, {
			onRootClick: function(event, target) {
				test.assertTrue(this instanceof Client);
				test.output("onRootClick for " + target.className);
			},

			onItemClick: function(event, target) {
				test.assertTrue(this instanceof Client);
				test.output("onItemClick for " + target.className);
			}
		});

		/* Test case */

		var component = new Component().render();
		var client = new Client(component);

		this.setExpectedOutput(
			"onRootClick for root"
		);
		component.el.trigger("click");

		this.setExpectedOutput(
			"onItemClick for item root-a",
			"onRootClick for root"
		);
		component.getElement("a").trigger("click");

		this.setExpectedOutput(
			"onItemClick for item root-b",
			"onRootClick for root"
		);
		component.getElement("b").trigger("click");

		this.setExpectedOutput();
		client.destroy();
		component.el.trigger("click");
		component.getElement("a").trigger("click");
		component.getElement("b").trigger("click");
		component.destroy();
	},

	testWithoutScope: function() {
		/* Preset */

		var test = this;

		var Component = function() {
			Component._super.call(this);
		};

		JW.extend(Component, JW.UI.Component);

		JW.UI.template(Component, {
			main:
				'<div jwclass="root">' +
					'<div class="item" jwid="a"></div>' +
					'<div class="item" jwid="b"></div>' +
				'</div>'
		});

		var Client = function(component) {
			Client._super.call(this);
			this.own(component.el.jwon("click", this.onRootClick));
			this.own(component.el.jwon("click", ".item", this.onItemClick));
		};

		JW.extend(Client, JW.Class, {
			onRootClick: function(event, target) {
				test.assertUndefined(target);
				test.output("onRootClick for " + this.className);
			},

			onItemClick: function(event, target) {
				test.assertUndefined(target);
				test.output("onItemClick for " + this.className);
			}
		});

		/* Test case */

		var component = new Component().render();
		var client = new Client(component);

		this.setExpectedOutput(
			"onRootClick for root"
		);
		component.el.trigger("click");

		this.setExpectedOutput(
			"onItemClick for item root-a",
			"onRootClick for root"
		);
		component.getElement("a").trigger("click");

		this.setExpectedOutput(
			"onItemClick for item root-b",
			"onRootClick for root"
		);
		component.getElement("b").trigger("click");

		this.setExpectedOutput();
		client.destroy();
		component.el.trigger("click");
		component.getElement("a").trigger("click");
		component.getElement("b").trigger("click");
		component.destroy();
	},

	testReturnValue: function() {
		var el = jQuery('<div></div>');
		el.jwon("click", function() {
			return false;
		}, this);
		var e = jQuery.Event("click");
		el.trigger(e);
		this.assertTrue(e.isDefaultPrevented());
	},

	testFalseCallback: function() {
		var el = jQuery('<div></div>');
		el.jwon("click", false, this);
		var e = jQuery.Event("click");
		el.trigger(e);
		this.assertTrue(e.isDefaultPrevented());
	}
});
