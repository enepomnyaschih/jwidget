import bindHtml from "jwidget/bindHtml";
import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import template from "jwidget/template";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {

	protected renderOutput(el: JQuery) {
		const input = this.getElement("input");
		input.html('<b>Hello!</b>');

		// Watch input value
		const html = bindVal(input);

		// Bind inner HTML to html property value
		bindHtml(el, html);
	}
}
