import Component from "jwidget/Component";
import Router from "jwidget/Router";
import template from "jwidget/template";

@template(
	'<div jwclass="email-not-found">' +
	'  <div>Email with id <span jwid="id"></span> is not found</div>' +
	'  <div><a jwid="back" href="#">Back</a></div>' +
	'</div>'
)
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
