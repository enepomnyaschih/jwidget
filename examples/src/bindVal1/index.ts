import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import template from "jwidget/template";
import initExample from "../common/initExample";

@template(
	'<div jwclass="application">' +
	'  <div>Value:</div>' +
	'  <textarea jwid="input" rows="5" cols="80">Hello!</textarea>' +
	'  <div>Output:</div>' +
	'  <textarea jwid="output" rows="5" cols="80" disabled></textarea>' +
	'</div>'
)
class Application extends Component {

	protected renderOutput(el: JQuery) {
		// Watch input element value
		const value = bindVal(this.getElement("input"));

		// Bind element value to property
		bindVal(el, value);
	}
}

$(() => {
	initExample("bindVal1", ["index.ts"]);
	new Application().renderTo("body");
});
