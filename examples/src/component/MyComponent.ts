import Component from "jwidget/Component";
import template from "jwidget/template";

@template(
	'<div jwclass="my-component">' +
	'<div jwid="hello-message"></div>' +
	'<a href="#" jwid="link">Click me!</a>' +
	'</div>'
)
export default class MyComponent extends Component {
	constructor(private message: string, private link: string) {
		super();
	}

	afterRender() {
		super.afterRender();
		this.getElement("hello-message").text(this.message);
		this.getElement("link").attr("href", this.link);
	}
}