import bindCss from "jwidget/bindCss";
import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import template from "jwidget/template";
import initExample from "../common/initExample";

require("./index.css");

@template(
	'<div jwclass="application">' +
	'  <div>"background-color" style: <input jwid="input" type="text" value="red"></div>' +
	'  <div jwid="rect">Modify as you wish to see result here</div>' +
	'</div>'
)
class Application extends Component {

	protected renderRect(el: JQuery) {
		// Watch input value
		const color = bindVal(this.getElement("input"));

		// Bind background color style to color property value
		bindCss(el, "background-color", color);
	}
}

$(() => {
	initExample("bindCss", ["index.ts", "index.css"]);
	new Application().renderTo("body");
});
