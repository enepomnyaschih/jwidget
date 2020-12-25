import bindText from "jwidget/bindText";
import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import template from "jwidget/template";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {

	protected renderOutput(el: JQuery) {
		const input = this.getElement("input");
		input.html('<b>Hello!</b>');

		// Watch input value
		const text = bindVal<string>(input);

		// Bind inner HTML to html property value
		bindText(el, text);
	}
}
