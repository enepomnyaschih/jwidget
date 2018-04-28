import Component from "jwidget/Component";
import template from "jwidget/template";
import cls from "jwidget/ui/cls";
import radio from "jwidget/ui/radio";
import initExample from "../common/initExample";

require("./index.css");

@template(
	'<div jwclass="application">' +
	'  <div jwid="colors">' +
	'    <div><label><input type="radio" name="color" value="red">Add "red" class</label></div>' +
	'    <div><label><input type="radio" name="color" value="green">Add "green" class</label></div>' +
	'    <div><label><input type="radio" name="color" value="blue">Add "blue" class</label></div>' +
	'  </div>' +
	'  <div jwid="rect"></div>' +
	'</div>'
)
class Application extends Component {

	protected renderRect(el: JQuery) {
		// Watch radio button selection
		const color = this.own(radio(this.getElement("colors"), "color"));

		// Bind CSS class name to color property value
		this.own(cls(el, color));
	}
}

$(() => {
	initExample("cls2", ["index.ts", "index.css"]);
	new Application().renderTo("body");
});
