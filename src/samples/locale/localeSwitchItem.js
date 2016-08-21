var LocaleSwitchItem = function(locale, lang) {
	LocaleSwitchItem._super.call(this);
	this.locale = locale; // JW.Plugins.Locale
	this.lang = lang; // string
};

JW.extend(LocaleSwitchItem, JW.UI.Component, {
	renderInput: function(el) {
		el.attr("value", this.lang);
	},

	renderLabel: function(el) {
		el.text(this.locale.getString(this.lang, "_lang"));
	}
});

JW.UI.template(LocaleSwitchItem, {
	main:
		'<div><label>' +
			'<input type="radio" name="lang" jwid="input"><span jwid="label"></span>' +
		'</label></div>'
});
