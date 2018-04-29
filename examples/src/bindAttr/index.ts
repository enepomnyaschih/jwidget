import bindAttr from "jwidget/bindAttr";
import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import template from "jwidget/template";
import initExample from "../common/initExample";

require("./index.css");

@template(
	'<div jwclass="application">' +
	'  <div>"title" attribute: <input jwid="input" type="text" value="This is a tooltip!"></div>' +
	'  <div jwid="rect">Modify as you wish and hover mouse to see a tooltip</div>' +
	'</div>'
)
class Application extends Component {

	protected renderRect(el: JQuery) {
		// Watch input value
		const title = bindVal(this.getElement("input"));

		// Bind rectangle "title" attribute to title property value
		bindAttr(el, "title", title);
	}
}

$(() => {
	initExample("bindAttr", ["index.ts", "index.css"]);
	new Application().renderTo("body");
});
