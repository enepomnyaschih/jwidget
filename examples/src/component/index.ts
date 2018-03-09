import Component from "jwidget/Component";
import template from "jwidget/template";
import initExample from "../common/initExample";

@template(
	'<div jwclass="my-component">' +
	'  <div jwid="hello-message"></div>' +
	'  <a href="#" jwid="link">Click me!</a>' +
	'</div>'
)

class MyComponent extends Component {
	constructor(private message: string, private link: string) {
		super();
	}

	protected afterRender() {
		super.afterRender();
		this.getElement("hello-message").text(this.message);
		this.getElement("link").attr("href", this.link);
	}
}

$(() => {
	initExample("component", ["index.ts"]);
	new MyComponent("Hello, World!", "javascript:alert('Hello!')").renderTo("body");
});
