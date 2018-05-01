import {TWOWAY} from "jwidget";
import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import Property from "jwidget/Property";
import template from "jwidget/template";
import initExample from "../common/initExample";

@template(
	'<div jwclass="application">' +
	'  <div>This sample demonstrates how to bind two inputs to a single string property.</div>' +
	'  <div><input jwid="first" type="text"></div>' +
	'  <div><input jwid="second" type="text"></div>' +
	'</div>'
)
class Application extends Component {

	private value = new Property("Input some text");

	protected renderFirst(el: JQuery) {
		bindVal(el, this.value, TWOWAY);
	}

	protected renderSecond(el: JQuery) {
		bindVal(el, this.value, TWOWAY);
	}
}

$(() => {
	initExample("bindVal2", ["index.ts"]);
	new Application().renderTo("body");
});
