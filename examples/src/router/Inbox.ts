import Bindable from "jwidget/Bindable";
import BindableArray from "jwidget/BindableArray";
import Component from "jwidget/Component";
import Router from "jwidget/Router";
import template from "jwidget/template";
import UIRouter from "jwidget/UIRouter";
import {EMAILS} from "./data";
import EmailList from "./EmailList";
import EmailNotFound from "./EmailNotFound";
import EmailView from "./EmailView";

@template(require<string>("./Inbox.jw.html"))
export default class Inbox extends Component {

	private router: UIRouter;
	private emails = new BindableArray(EMAILS, true);

	constructor(private path: Bindable<string>, private parentRouter: Router<any>) {
		super();
	}

	protected beforeRender() {
		super.beforeRender();
		this.router = this.own(new UIRouter({
			name: "inbox",
			parent: this.parentRouter,
			path: this.path,
			handler: id => {
				if (!id) {
					return new EmailList(this.emails);
				}
				const email = this.emails.find(email => email.id === id);
				return email != null ? new EmailView(email, this.router) : new EmailNotFound(id);
			}
		}));
		this.router.update();
	}

	protected renderContent() {
		return this.router.target;
	}
}
