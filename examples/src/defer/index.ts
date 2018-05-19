import bindText from "jwidget/bindText";
import CancelToken from "jwidget/CancelToken";
import Component from "jwidget/Component";
import defer from "jwidget/defer";
import IProperty from "jwidget/IProperty";
import Property from "jwidget/Property";
import template from "jwidget/template";
import initExample from "../common/initExample";

class DelayedGreeter extends Component {

	private cancelToken = this.own(new CancelToken());

	constructor(private count: IProperty<number>) {
		super();
	}

	protected async renderRoot(el: JQuery) {
		el.text("Wait...");
		await defer(1000, this.cancelToken);
		el.text("Hello!");
		this.count.set(this.count.get() + 1);
	}
}

@template(
	'<div>' +
	'  <button type="button" jwid="button">Show greeter</button>' +
	'  <div>Hellos displayed: <span jwid="count"></span></div>' +
	'  <div jwid="greeter"></div>' +
	'</div>'
)
class Application extends Component {

	private count = this.own(new Property(0));
	private greeter = this.own(new Property<Component>()).ownValue();

	protected renderButton(el: JQuery) {
		el.click(() => {
			el.text("Destroy current greeter and show a new one")
			this.greeter.set(new DelayedGreeter(this.count));
		});
	}

	protected renderCount(el: JQuery) {
		bindText(el, this.count);
	}

	protected renderGreeter() {
		return this.greeter;
	}
}

$(() => {
	initExample("defer", ["index.ts"]);
	new Application().renderTo("body");
});
