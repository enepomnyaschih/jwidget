import bindText from "jwidget/bindText";
import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import template from "jwidget/template";
import initExample from "../common/initExample";

@template(
	'<div jwclass="application">' +
	'  <div>Text:</div>' +
	'  <textarea jwid="input" rows="5" cols="80"></textarea>' +
	'  <div>Output:</div>' +
	'  <div jwid="output"></div>' +
	'</div>'
)
class Application extends Component {

	protected renderOutput(el: JQuery) {
		const input = this.getElement("input");
		input.html('<b>Hello!</b>');

		// Watch input value
		const text = bindVal(input);

		// Bind inner HTML to html property value
		bindText(el, text);
	}
}

$(() => {
	initExample("bindText", ["index.ts"]);
	new Application().renderTo("body");
});
