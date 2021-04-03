import bindClass from "jwidget/bindClass";
import bindProp from "jwidget/bindProp";
import Component from "jwidget/Component";
import template from "jwidget/template";

@template(require("./Application.jw.html"))
export default class Application extends Component {

	protected renderRect(el: JQuery) {
		// Watch checkbox state
		const checked = bindProp(this.getElement("checkbox"), "checked");

		// Bind "checked" CSS class to checked property value
		bindClass(el, "checked", checked);
	}
}
