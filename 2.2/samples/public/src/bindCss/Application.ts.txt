import bindCss from "jwidget/bindCss";
import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import template from "jwidget/template";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {

	protected renderRect(el: JQuery) {
		// Watch input value
		const color = bindVal(this.getElement("input"));

		// Bind background color style to color property value
		bindCss(el, "background-color", color);
	}
}
