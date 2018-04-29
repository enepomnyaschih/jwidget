import bindHtml from "jwidget/bindHtml";
import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import template from "jwidget/template";
import initExample from "../common/initExample";

require("./index.css");

@template(
	'<div jwclass="application">' +
	'  <div>HTML:</div>' +
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
		const html = bindVal(input);

		// Bind inner HTML to html property value
		bindHtml(el, html);
	}
}

$(() => {
	initExample("bindHtml", ["index.ts"]);
	new Application().renderTo("body");
});
