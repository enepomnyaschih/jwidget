import $ from "jquery";
import Component from "jwidget/Component";
import listen from "jwidget/listen";
import template from "jwidget/template";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {

	protected beforeRender() {
		super.beforeRender();

		$("body").val();
		// Bind a handler to "mousemove" event and aggregate the attachment
		this.own(listen($(window), "mousemove", event => {
			$(".output").text(event.pageX + ":" + event.pageY);
		}));
	}

	protected renderDestroyButton(el: JQuery) {
		// On button click, destroy this component
		el.on("click", () => this.destroy());
	}
}
