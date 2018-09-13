import bindClass from "jwidget/bindClass";
import bindRadio from "jwidget/bindRadio";
import Component from "jwidget/Component";
import template from "jwidget/template";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {

	protected renderRect(el: JQuery) {
		// Watch radio button selection
		const color = bindRadio(this.getElement("colors"), "color");

		// Bind CSS class name to color property value
		bindClass(el, color);
	}
}
