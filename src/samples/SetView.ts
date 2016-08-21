/// <reference path="../build/d.ts/jwui.d.ts" />

class ItemView extends JW.UI.Component {
	constructor(public setView: SetView, public index: number) {
		super();
	}

	renderRemove(el: JQuery) {
		el.text("#" + this.index + " - Remove");
		el.click(() => {
			this.setView.items.remove(this);
		});
	}
}

JW.UI.template(ItemView, {
	main:
		'<div jwclass="item">' +
			'<button jwid="remove"></button>' +
		'</div>'
});

class SetView extends JW.UI.Component {
	items: JW.AbstractSet<JW.UI.Component> = new JW.ObservableSet<JW.UI.Component>();
	index: number = 0;

	renderAdd(el: JQuery) {
		el.click(() => {
			this.items.add(new ItemView(this, ++this.index));
		});
	}

	renderItems(el: JQuery) {
		return this.items;
	}
}

JW.UI.template(SetView, {
	main:
		'<div jwclass="set-view">' +
			'<button jwid="add">Add</button> ' +
			'<div jwid="items"></div>' +
		'</div>'
});

var setView: SetView;

jQuery(() => {
	setView = new SetView();
	setView.renderTo(document.body);
});
