var LocaleSwitch = function(locale) {
	LocaleSwitch._super.call(this);
	this.locale = locale; // JW.Plugins.Locale
};

JW.extend(LocaleSwitch, JW.UI.Component, {
	renderRoot: function() {
		return JW.Array.$map(this.locale.getLanguages(), function(lang) {
			return this.own(new LocaleSwitchItem(this.locale, lang));
		}, this);
	},

	afterRender: function() {
		this._super();
		this.own(new JW.UI.RadioUpdater(this.el, "lang", this.locale.lang));
		this.own(new JW.UI.RadioListener(this.el, "lang", this.locale.lang));
	}
});

JW.UI.template(LocaleSwitch, {
	main: '<form></form>'
});
