import Component from "jwidget/Component";
import Router from "jwidget/Router";
import template from "jwidget/template";

@template(require<string>("./EmailNotFound.jw.html"))
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
			Router.redirect("inbox");
		});
	}
}
