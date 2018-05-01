import bindDisplay from "jwidget/bindDisplay";
import bindProp from "jwidget/bindProp";
import Component from "jwidget/Component";
import template from "jwidget/template";
import initExample from "../common/initExample";

require("./index.css");

@template(
	'<div jwclass="application">' +
	'  <div><label><input jwid="checkbox" type="checkbox">Show rectangle</label></div>' +
	'  <div jwid="rect"></div>' +
	'</div>'
)
class Application extends Component {

	protected renderRect(el: JQuery) {
		// Watch checkbox state
		const checked = bindProp(this.getElement("checkbox"), "checked");

		// Bind rectangle visibility to property value
		bindDisplay(el, checked);
	}
}

$(() => {
	initExample("bindDisplay", ["index.ts", "index.css"]);
	new Application().renderTo("body");
});
