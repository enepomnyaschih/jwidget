import bindAttr from "jwidget/bindAttr";
import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import template from "jwidget/template";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {

	protected renderRect(el: JQuery) {
		// Watch input value
		const title = bindVal<string>(this.getElement("input"));

		// Bind rectangle "title" attribute to title property value
		bindAttr(el, "title", title);
	}
}
