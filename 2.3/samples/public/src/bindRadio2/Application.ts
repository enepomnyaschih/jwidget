import {TWOWAY} from "jwidget";
import bindRadio from "jwidget/bindRadio";
import Component from "jwidget/Component";
import Property from "jwidget/Property";
import template from "jwidget/template";

@template(require("./Application.jw.html"))
export default class Application extends Component {

	private value = new Property("a");

	protected renderRoot(el: JQuery) {
		bindRadio(el, "first", this.value, TWOWAY);
		bindRadio(el, "second", this.value, TWOWAY);
	}
}
