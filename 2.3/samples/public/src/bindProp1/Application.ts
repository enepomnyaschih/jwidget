import bindProp from "jwidget/bindProp";
import Component from "jwidget/Component";
import template from "jwidget/template";

@template(require("./Application.jw.html"))
export default class Application extends Component {

	protected renderTextarea(el: JQuery) {
		// Watch checkbox state
		const property = bindProp(this.getElement("checkbox"), "checked");

		// Bind text area state to property
		bindProp(el, "disabled", property);
	}
}
