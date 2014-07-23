var EquipmentSelector = function(locale) {
	EquipmentSelector._super.call(this);
	this.locale = locale; // JW.Plugins.Locale
};

JW.extend(EquipmentSelector, JW.UI.Component, {
	renderMonitor: function(el) {
		var text = this.own(this.locale.getFunctor("monitor")).target;
		this.own(new JW.UI.TextUpdater(el, text));
	},

	renderKeyboard: function(el) {
		var text = this.own(this.locale.getFunctor("keyboard")).target;
		this.own(new JW.UI.TextUpdater(el, text));
	},

	renderMouse: function(el) {
		var text = this.own(this.locale.getFunctor("mouse")).target;
		this.own(new JW.UI.TextUpdater(el, text));
	}
});

JW.UI.template(EquipmentSelector, {
	main:
		'<form>' +
			'<button jwid="monitor"></button>' +
			'<button jwid="keyboard"></button>' +
			'<button jwid="mouse"></button>' +
		'</form>'
});
