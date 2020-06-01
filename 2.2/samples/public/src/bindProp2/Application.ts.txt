import {TWOWAY} from "jwidget";
import bindProp from "jwidget/bindProp";
import Component from "jwidget/Component";
import Property from "jwidget/Property";
import template from "jwidget/template";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {

	private value = new Property(false);

	protected renderFirst(el: JQuery) {
		bindProp(el, "checked", this.value, TWOWAY);
	}

	protected renderSecond(el: JQuery) {
		bindProp(el, "checked", this.value, TWOWAY);
	}
}
