import Component from "jwidget/Component";
import {redirectRoute} from "jwidget/RouteRedirector";
import template from "jwidget/template";

@template(require("./EmailNotFound.jw.html"))
export default class EmailNotFound extends Component {

	constructor(private id: string) {
		super();
	}

	protected renderId(el: JQuery) {
		el.text(this.id);
	}

	protected renderBack(el: JQuery) {
		el.on("click", event => {
			event.preventDefault();

			// In this particular case we know that there is no router below, so we can skip
			// router selection on redirection. The next call uses a current top router
			redirectRoute("inbox");
		});
	}
}
