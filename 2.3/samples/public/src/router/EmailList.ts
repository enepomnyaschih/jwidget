import {destroy} from "jwidget";
import {startMappingArray} from "jwidget/collection/ArrayMapper";
import Component from "jwidget/Component";
import ReadonlyBindableArray from "jwidget/ReadonlyBindableArray";
import Email from "./Email";
import EmailListItem from "./EmailListItem";

export default class EmailList extends Component {

	constructor(private emails: ReadonlyBindableArray<Email>) {
		super();
	}

	protected renderRoot(el: JQuery) {
		el.addClass("email-list");
		return this.own(startMappingArray(this.emails, email => new EmailListItem(email), {destroy}));
	}
}
