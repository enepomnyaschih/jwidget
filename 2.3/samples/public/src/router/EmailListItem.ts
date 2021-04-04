import Component from "jwidget/Component";
import template from "jwidget/template";
import Email from "./Email";

@template('<a jwclass="email-list-item" style="display: block;"></a>')
export default class EmailListItem extends Component {

	constructor(private email: Email) {
		super();
	}

	protected renderRoot(el: JQuery) {
		el.text(this.email.summary).attr("href", "#inbox/" + this.email.id);
	}
}
