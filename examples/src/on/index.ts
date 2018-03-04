import Component from "jwidget/Component";
import template from "jwidget/template";
import on from "jwidget/ui/on";
import initExample from "../common/initExample";

require("./index.css");

@template(
	'<div jwclass="application">' +
	'<div jwid="tip">' +
	'This example demonstrates an easy way ' +
	'to aggregate jQuery event handlers inside components. ' +
	'Handler for "mousemove" event is aggregated inside component, ' +
	'so component destruction triggers event unbinding. Try it!' +
	'</div>' +
	'<div jwid="buttons">' +
	'<button type="button" jwid="destroy-button">Destroy component</button>' +
	'</div>' +
	'</div>'
)
class Application extends Component {

	protected beforeRender() {
		super.beforeRender();

		// Bind a handler to "mousemove" event and aggregate the attachment
		this.own(on($(window), "mousemove", event => {
			$(".output").text(event.pageX + ":" + event.pageY);
		}));
	}

	protected renderDestroyButton(el: JQuery) {
		// On button click, destroy this component
		el.on("click", () => this.destroy());
	}
}

$(() => {
	initExample("on", ["index.ts"]);

	// Keep output outside of application, to demonstate that
	// event handler is unbound on application destruction.
	$("body").append(
		'<div class="output-box">' +
		'Mouse coordinates: <span class="output"></span>' +
		'<div>'
	);

	new Application().renderTo("body");
});
