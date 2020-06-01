import Component from "jwidget/Component";
import Router from "jwidget/Router";
import template from "jwidget/template";
import Email from "./Email";

@template(require<string>("./EmailView.jw.html"))
export default class EmailView extends Component {

	constructor(private email: Email, private parentRouter: Router<any>) {
		super();
	}

	protected renderSummary(el: JQuery) {
		el.text(this.email.summary);
	}

	protected renderContent(el: JQuery) {
		el.html(this.email.content);
	}

	protected renderBack(el: JQuery) {
		el.on("click", event => {
			event.preventDefault();

			// If you don't know exactly how many routers can be above or below this component,
			// using parent router on redirection is a smart choice
			this.parentRouter.redirect("");
		});
	}
}
