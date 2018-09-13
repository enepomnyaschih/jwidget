import bindVal from "jwidget/bindVal";
import Component from "jwidget/Component";
import hash from "jwidget/hash";
import Router from "jwidget/Router";
import Switcher from "jwidget/Switcher";
import template from "jwidget/template";
import UIRouter from "jwidget/UIRouter";
import Compose from "./Compose";
import Inbox from "./Inbox";
import NotFound from "./NotFound";
import Settings from "./Settings";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {

	private router: UIRouter;

	protected beforeRender() {
		super.beforeRender();
		this.router = this.own(new UIRouter({
			path: hash,
			handler: {
				routes: {
					"inbox": arg => new Inbox(arg, this.router),
					"compose": () => new Compose(),
					"settings": () => new Settings(),
					"": () => new Router.Redirector("inbox", this.router)
				},
				notFound: route => new NotFound(route)
			}
		}));
		this.router.update();
	}

	// This method simulates browser query string submitting
	protected renderUrlForm(el: JQuery) {
		el.on("submit", event => {
			event.preventDefault();
			location.hash = "#" + this.getElement("url").val();
		});
	}

	// This method simulates browser query string output
	protected renderUrl(el: JQuery) {
		this.own(bindVal(el, hash));
	}

	protected renderPage() {
		return this.router.target;
	}

	protected renderRoute(el: JQuery) {
		// Assign href attributes using getFullPath method
		const router = this.router;
		el.each(function () {
			const route = $(this).attr("data-route");
			$(this).attr("href", "#" + router.getFullPath(route));
		});

		// The next structure highlights the active menu item
		const activeElement = this.router.route.map(route => el.filter('[data-route="' + route + '"]'));
		new Switcher(activeElement, {
			init: el => el.css("font-weight", "bold"),
			done: el => el.css("font-weight", "")
		});
	}
}
