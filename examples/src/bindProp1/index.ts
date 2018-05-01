import bindProp from "jwidget/bindProp";
import Component from "jwidget/Component";
import template from "jwidget/template";
import initExample from "../common/initExample";

@template(
	'<div jwclass="application">' +
	'  <div><label><input jwid="checkbox" type="checkbox">Disable textarea</label></div>' +
	'  <textarea jwid="textarea">This is a textarea</textarea>' +
	'</div>'
)
class Application extends Component {

	protected renderTextarea(el: JQuery) {
		// Watch checkbox state
		const property = bindProp(this.getElement("checkbox"), "checked");

		// Bind text area state to property
		bindProp(el, "disabled", property);
	}
}

$(() => {
	initExample("bindProp1", ["index.ts"]);
	new Application().renderTo("body");
});
