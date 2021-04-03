import bindDisplay from "jwidget/bindDisplay";
import bindProp from "jwidget/bindProp";
import Component from "jwidget/Component";
import template from "jwidget/template";

@template(require("./Application.jw.html"))
export default class Application extends Component {

	protected renderRect(el: JQuery) {
		// Watch checkbox state
		const checked = bindProp(this.getElement("checkbox"), "checked");

		// Bind rectangle visibility to property value
		bindDisplay(el, checked);
	}
}
