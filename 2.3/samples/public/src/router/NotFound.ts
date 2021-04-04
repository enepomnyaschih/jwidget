import Component from "jwidget/Component";

export default class NotFound extends Component {

	constructor(private route: string) {
		super();
	}

	protected renderRoot(el: JQuery) {
		el.text('The requested page "' + this.route + '" is not found');
	}
}
