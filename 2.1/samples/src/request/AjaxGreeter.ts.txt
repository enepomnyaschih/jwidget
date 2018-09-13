import CancelToken from "jwidget/CancelToken";
import Component from "jwidget/Component";
import IProperty from "jwidget/IProperty";
import request from "jwidget/request";

export default class AjaxGreeter extends Component {

	private cancelToken = this.own(new CancelToken());

	constructor(private count: IProperty<number>) {
		super();
	}

	protected async renderRoot(el: JQuery) {
		el.text("Loading...");
		const data = await request($.get("data.json"), this.cancelToken);
		el.text(data.message);
		this.count.set(this.count.get() + 1);
	}
}
