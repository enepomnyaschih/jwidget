import "core-js/stable";
import "regenerator-runtime/runtime";

import $ from "jquery";
import {TWOWAY} from "jwidget";
import bindText from "jwidget/bindText";
import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import Property from "jwidget/Property";
import template from "jwidget/template";

@template(`<div class="greeter">
             <p>Your name: <input jwid="name-field" type="text"></p>
             <div jwid="greeting"></div>
           </div>`)
class Greeter extends Component {

	private name = new Property("guest");

	protected renderNameField(el: JQuery) {
		// Bind element value to property
		bindVal(el, this.name, TWOWAY);
	}

	protected renderGreeting(el: JQuery) {
		// Build greeting message
		const text = this.name.map(name => `Hello, ${name}!`);

		// Bind element text to message
		bindText(el, text);
	}
}

$(() => {
	new Greeter().renderTo("body");
});
