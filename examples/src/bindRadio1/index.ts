import bindRadio from "jwidget/bindRadio";
import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import template from "jwidget/template";
import initExample from "../common/initExample";

@template(
	'<div jwclass="application">' +
	'  <div>Enter a letter (a, b or c): <input jwid="input" type="text" value="a"></div>' +
	'  <div jwid="letters">' +
	'    <div><label><input type="radio" name="letter" value="a" disabled>Is a?</label></div>' +
	'    <div><label><input type="radio" name="letter" value="b" disabled>Is b?</label></div>' +
	'    <div><label><input type="radio" name="letter" value="c" disabled>Is c?</label></div>' +
	'  </div>' +
	'</div>'
)
class Application extends Component {

	protected renderLetters(el: JQuery) {
		// Watch input value
		const value = bindVal(this.getElement("input"));

		// Bind radio button selection to property value
		bindRadio(el, "letter", value);
	}
}

$(() => {
	initExample("bindRadio1", ["index.ts"]);
	new Application().renderTo("body");
});
