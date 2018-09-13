import Component from "jwidget/Component";
import template from "jwidget/template";

@template(require<string>("./MyComponent.jw.html"))
export default class MyComponent extends Component {

	constructor(private message: string, private link: string) {
		super();
	}

	protected afterRender() {
		super.afterRender();
		this.getElement("hello-message").text(this.message);
		this.getElement("link").attr("href", this.link);
	}
}
