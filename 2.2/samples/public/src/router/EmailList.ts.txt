import Component from "jwidget/Component";
import {mapList} from "jwidget/mapper/list";
import ReadonlyList from "jwidget/ReadonlyList";
import Email from "./Email";
import EmailListItem from "./EmailListItem";

export default class EmailList extends Component {

	constructor(private emails: ReadonlyList<Email>) {
		super();
	}

	protected renderRoot(el: JQuery) {
		el.addClass("email-list");
		return this.own(mapList(this.emails, email => new EmailListItem(email)));
	}
}
