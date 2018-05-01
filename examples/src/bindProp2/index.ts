import {TWOWAY} from "jwidget";
import bindProp from "jwidget/bindProp";
import Component from "jwidget/Component";
import Property from "jwidget/Property";
import template from "jwidget/template";
import initExample from "../common/initExample";

@template(
	'<div jwclass="application">' +
	'  <div>This sample demonstrates how to bind two checkboxes to a single boolean property.</div>' +
	'  <div><label><input jwid="first" type="checkbox">First checkbox</label></div>' +
	'  <div><label><input jwid="second" type="checkbox">Second checkbox</label></div>' +
	'</div>'
)
class Application extends Component {

	private value = new Property(false);

	protected renderFirst(el: JQuery) {
		bindProp(el, "checked", this.value, TWOWAY);
	}

	protected renderSecond(el: JQuery) {
		bindProp(el, "checked", this.value, TWOWAY);
	}
}

$(() => {
	initExample("bindProp2", ["index.ts"]);
	new Application().renderTo("body");
});
