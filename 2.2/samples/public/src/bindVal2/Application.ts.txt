import {TWOWAY} from "jwidget";
import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import Property from "jwidget/Property";
import template from "jwidget/template";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {

	private value = new Property("Input some text");

	protected renderFirst(el: JQuery) {
		bindVal(el, this.value, TWOWAY);
	}

	protected renderSecond(el: JQuery) {
		bindVal(el, this.value, TWOWAY);
	}
}
