/*
	jWidget UI tests.
	
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
