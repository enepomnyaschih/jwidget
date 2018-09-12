import CancelToken from "jwidget/CancelToken";
import Component from "jwidget/Component";
import defer from "jwidget/defer";
import IProperty from "jwidget/IProperty";

export default class DelayedGreeter extends Component {

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
