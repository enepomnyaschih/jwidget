import {TWOWAY} from "jwidget";
import bindRadio from "jwidget/bindRadio";
import Component from "jwidget/Component";
import Property from "jwidget/Property";
import template from "jwidget/template";
import initExample from "../common/initExample";

@template(
	'<div jwclass="application">' +
	'  <div>This sample demonstrates how to bind two radio groups to a single string property.</div>' +
	'  <div>First group:</div>' +
	'  <div><label><input type="radio" name="first" value="a">a</label></div>' +
	'  <div><label><input type="radio" name="first" value="b">b</label></div>' +
	'  <div><label><input type="radio" name="first" value="c">c</label></div>' +
	'  <div>Second group:</div>' +
	'  <div><label><input type="radio" name="second" value="a">a</label></div>' +
	'  <div><label><input type="radio" name="second" value="b">b</label></div>' +
	'  <div><label><input type="radio" name="second" value="c">c</label></div>' +
	'</div>'
)
class Application extends Component {

	private value = new Property("a");

	protected renderRoot(el: JQuery) {
		bindRadio(el, "first", this.value, TWOWAY);
		bindRadio(el, "second", this.value, TWOWAY);
	}
}

$(() => {
	initExample("bindRadio2", ["index.ts"]);
	new Application().renderTo("body");
});
