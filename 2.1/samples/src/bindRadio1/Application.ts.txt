import bindRadio from "jwidget/bindRadio";
import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import template from "jwidget/template";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {

	protected renderLetters(el: JQuery) {
		// Watch input value
		const value = bindVal(this.getElement("input"));

		// Bind radio button selection to property value
		bindRadio(el, "letter", value);
	}
}
