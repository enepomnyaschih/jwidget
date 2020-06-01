import bindText from "jwidget/bindText";
import Component from "jwidget/Component";
import Property from "jwidget/Property";
import template from "jwidget/template";
import AjaxGreeter from "./AjaxGreeter";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {

	private count = this.own(new Property(0));
	private greeter = this.own(new Property<Component>()).ownValue();

	protected renderButton(el: JQuery) {
		el.on("click", () => {
			el.text("Destroy current greeter and show a new one");
			this.greeter.set(new AjaxGreeter(this.count));
		});
	}

	protected renderCount(el: JQuery) {
		bindText(el, this.count);
	}

	protected renderGreeter() {
		return this.greeter;
	}
}
