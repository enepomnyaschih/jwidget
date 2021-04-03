import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import template from "jwidget/template";

@template(require("./Application.jw.html"))
export default class Application extends Component {

	protected renderOutput(el: JQuery) {
		// Watch input element value
		const value = bindVal<string>(this.getElement("input"));

		// Bind element value to property
		bindVal(el, value);
	}
}
