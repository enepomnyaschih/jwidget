import Component from "jwidget/Component";
import template from "jwidget/template";
import cls from "jwidget/ui/cls";
import prop from "jwidget/ui/prop";
import initExample from "../common/initExample";

require("./index.css");

@template(
	'<div jwclass="application">' +
	'  <div><label><input jwid="checkbox" type="checkbox">Enable class</label></div>' +
	'  <div jwid="rect"></div>' +
	'</div>'
)
class Application extends Component {

	protected renderRect(el: JQuery) {
		// Watch checkbox state
		const checked = this.own(prop(this.getElement("checkbox"), "checked"));

		// Bind "checked" CSS class to checked property value
		this.own(cls(el, "checked", checked));
	}
}

$(() => {
	initExample("cls1", ["index.ts", "index.css"]);
	new Application().renderTo("body");
});
