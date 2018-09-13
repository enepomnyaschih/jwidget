JW.Plugins = JW.Plugins || {};

/**
 * @class
 *
 * Application localization management class.
 *
 * ## Definition of a problem
 *
 * Assume that you have the next localization dictionary:
 *
 *     var dictionary = {
 *         en: {
 *             _lang: "English",
 *             name: "Name",
 *             submit: "Submit",
 *             equipment: {
 *                 monitor: "Monitor",
 *                 keyboard: "Keyboard",
 *                 mouse: "Mouse"
 *             },
 *             monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
 *                           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
 *         },
 *         ru: {
 *             _lang: "Русский",
 *             name: "Имя",
 *             submit: "Отправить",
 *             equipment: {
 *                 monitor: "Монитор",
 *                 keyboard: "Клавиатура",
 *                 mouse: "Мышь"
 *             },
 *             monthsShort: ["Янв", "Фев", "Мар", "Апр", "Мая", "Июн",
 *                           "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
 *         }
 *     };
 *
 * You need to implement a component for dynamic switching of application localization without page refreshing.
 * It is easy thanks to JW.Plugins.Locale. It is based on JW.Property.
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="400" height="140" src="http://enepomnyaschih.github.io/mt/1.0.0/locale.html"></iframe>
 *
 * Source code of the example is not minified so you can review it using "View source code of the frame" context
 * menu item in your browser.
 *
 * ## getString method
 *
 * You can get a specified string in a current or specified locale using {@link JW.Plugins.Locale#getString getString} method.
 *
 *     // ... define the dictionary
 *
 *     function assert(x) {
 *         if (!x) {
 *             throw "Assertion failed";
 *         }
 *     }
 *
 *     $(function() {
 *         var lang = new JW.Property("en");
 *         var locale = new JW.Plugins.Locale(dictionary, lang);
 *         assert("Name" === locale.{@link JW.Plugins.Locale#getString getString}("name"));
 *         assert("Monitor" === locale.{@link JW.Plugins.Locale#getString getString}("equipment.monitor"));
 *         assert("Feb" === locale.{@link JW.Plugins.Locale#getString getString}(["monthsShort", 1]));
 *
 *         lang.{@link JW.Property#set set}("ru");
 *         assert("Имя" === locale.{@link JW.Plugins.Locale#getString getString}("name"));
 *         assert("Монитор" === locale.{@link JW.Plugins.Locale#getString getString}("equipment.monitor"));
 *         assert("Фев" === locale.{@link JW.Plugins.Locale#getString getString}(["monthsShort", 1]));
 *
 *         assert("English" === locale.{@link JW.Plugins.Locale#getString getString}("en", "_lang"));
 *         assert("Русский" === locale.{@link JW.Plugins.Locale#getString getString}("ru", "_lang"));
 *     });
 *
 * ## getFunctor method
 *
 * If you need to switch the application locale dynamically, {@link JW.Plugins.Locale#getString getString} method is not enough.
 * Let's try {@link JW.Plugins.Locale#getFunctor getFunctor} method which builds a new instance of JW.Property containing
 * a specified string in a current locale. The function will update the string automatically when user selects another locale.
 *
 *     $(function() {
 *         var lang = new JW.Property("en");
 *         var locale = new JW.Plugins.Locale(dictionary, lang);
 *
 *         var submitFunctor = locale.{@link JW.Plugins.Locale#getFunctor getFunctor}("submit");
 *         assert("Submit" === submitFunctor.{@link JW.Functor#property-target target}.{@link JW.Property#get get}());
 *
 *         lang.{@link JW.Property#set set}("ru");
 *         assert("Отправить" === submitFunctor.{@link JW.Functor#property-target target}.{@link JW.Property#get get}());
 *
 *         submitFunctor.{@link JW.Functor#destroy destroy}(); // destroy the functor since it is no more in use
 *     });
 *
 * ## getFunctor method usage in the components
 *
 * Assume that you need to output a "name" string as a label inside a form, and "submit" string as a
 * submit button caption. Let's use JW.UI.TextUpdater and JW.UI.ValueUpdater helpers.
 *
 *     var Form = function(locale) {
 *         Form.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.locale = locale; // JW.Plugins.Locale
 *     };
 *
 *     JW.extend(Form, JW.UI.Component, {
 *         renderNameLabel: function(el) {
 *             var text = this.{@link JW.Class#own own}(this.locale.{@link JW.Plugins.Locale#getFunctor getFunctor}("name")).{@link JW.Functor#property-target target};
 *             this.{@link JW.Class#own own}(new JW.UI.TextUpdater(el, text));
 *         },
 *
 *         renderSubmit: function(el) {
 *             var text = this.{@link JW.Class#own own}(this.locale.{@link JW.Plugins.Locale#getFunctor getFunctor}("submit")).{@link JW.Functor#property-target target};
 *             this.{@link JW.Class#own own}(new JW.UI.ValueUpdater(el, text));
 *         }
 *     });
 *
 *     JW.UI.template(Form, {
 *         main:
 *             '<form>' +
 *                 '<label><span jwid="name-label"></span><input type="text"></label>' +
 *                 '<input jwid="submit" type="submit">' +
 *             '</form>'
 *     });
 *
 * Test the form.
 *
 *     $(function() {
 *         var lang = new JW.Property("en");
 *         var locale = new JW.Plugins.Locale(dictionary, lang);
 *
 *         var form = new Form(locale).{@link JW.UI.Component#renderTo renderTo}("body");
 *
 *         // In 2 seconds, switch to Russian locale
 *         setTimeout(function() { lang.{@link JW.Property#set set}("ru"); }, 2000);
 *     });
 *
 * ## Locale switch component
 *
 * We need a nice component for localization switching. Let's render it as a set of radios with
 * JW.UI.RadioUpdater and JW.UI.RadioListener helpers bound to them.
 *
 *     var LocaleSwitch = function(locale) {
 *         LocaleSwitch.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.locale = locale; // JW.Plugins.Locale
 *     };
 *
 *     JW.extend(LocaleSwitch, JW.UI.Component, {
 *         renderRoot: function() {
 *             return JW.Array.$map(this.locale.getLanguages(), function(lang) {
 *                 return this.{@link JW.Class#own own}(new LocaleSwitchItem(this.locale, lang));
 *             }, this);
 *         },
 *
 *         afterRender: function() {
 *             this.{@link JW.Class#method-_super _super}();
 *             this.{@link JW.Class#own own}(new JW.UI.RadioUpdater(this.{@link JW.UI.Component#el el}, "lang", this.locale.{@link JW.Plugins.Locale#lang lang}));
 *             this.{@link JW.Class#own own}(new JW.UI.RadioListener(this.{@link JW.UI.Component#el el}, "lang", this.locale.{@link JW.Plugins.Locale#lang lang}));
 *         }
 *     });
 *
 *     JW.UI.template(LocaleSwitch, {
 *         main: '<form></form>'
 *     });
 *
 *     //--------
 *
 *     var LocaleSwitchItem = function(locale, lang) {
 *         LocaleSwitchItem.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.locale = locale; // JW.Plugins.Locale
 *         this.lang = lang; // string
 *     };
 *
 *     JW.extend(LocaleSwitchItem, JW.UI.Component, {
 *         renderInput: function(el) {
 *             el.attr("value", this.lang);
 *         },
 *
 *         renderLabel: function(el) {
 *             el.text(this.locale.{@link JW.Plugins.Locale#getString getString}(this.lang, "_lang"));
 *         }
 *     });
 *
 *     JW.UI.template(LocaleSwitchItem, {
 *         main:
 *             '<div><label>' +
 *                 '<input type="radio" name="lang" jwid="input"><span jwid="label"></span>' +
 *             '</label></div>'
 *     });
 *
 * Test.
 *
 *     $(function() {
 *         var lang = new JW.Property("en");
 *         var locale = new JW.Plugins.Locale(dictionary, lang);
 *         var switcher = new LocaleSwitch(locale).{@link JW.UI.Component#renderTo renderTo}("body");
 *     });
 *
 * ## Child localization (getSubLocale method)
 *
 * Let's look at one more way to simplify localization management. Sometimes a component needs just an isolated part
 * of dictionary (e.g. strings in "equipment" object). To make access keys shorter, let's create child
 * localization object.
 *
 *     var EquipmentSelector = function(locale) {
 *         EquipmentSelector.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.locale = locale; // JW.Plugins.Locale, child localization object
 *     };
 *
 *     JW.extend(EquipmentSelector, JW.UI.Component, {
 *         renderMonitor: function(el) {
 *             var text = this.{@link JW.Class#own own}(this.locale.{@link JW.Plugins.Locale#getFunctor getFunctor}("monitor")).{@link JW.Functor#property-target target};
 *             this.{@link JW.Class#own own}(new JW.UI.TextUpdater(el, text));
 *         },
 *
 *         renderKeyboard: function(el) {
 *             var text = this.{@link JW.Class#own own}(this.locale.{@link JW.Plugins.Locale#getFunctor getFunctor}("keyboard")).{@link JW.Functor#property-target target};
 *             this.{@link JW.Class#own own}(new JW.UI.TextUpdater(el, text));
 *         },
 *
 *         renderMouse: function(el) {
 *             var text = this.{@link JW.Class#own own}(this.locale.{@link JW.Plugins.Locale#getFunctor getFunctor}("mouse")).{@link JW.Functor#property-target target};
 *             this.{@link JW.Class#own own}(new JW.UI.TextUpdater(el, text));
 *         }
 *     });
 *
 *     JW.UI.template(EquipmentSelector, {
 *         main:
 *             '<form>' +
 *                 '<button jwid="monitor"></button>' +
 *                 '<button jwid="keyboard"></button>' +
 *                 '<button jwid="mouse"></button>' +
 *             '</form>'
 *     });
 *
 * Let's use {@link JW.Plugins.Locale#getSubLocale getSubLocale} method to build the required child localization object.
 *
 *     $(function() {
 *         var lang = new JW.Property("en");
 *         var locale = new JW.Plugins.Locale(dictionary, lang);
 *         var equipmentLocale = locale.{@link JW.Plugins.Locale#getSubLocale getSubLocale}("equipment");
 *         var equipmentSelector = new EquipmentSelector(equipmentLocale).{@link JW.UI.Component#renderTo renderTo}("body");
 *     });
 *
 * As you can see, we can use shorter keys inside EquipmentSelector component now:
 *
 * - "monitor", not "equipment.monitor"
 * - "keyboard", not "equipment.keyboard"
 * - "mouse", not "equipment.mouse"
 *
 * ## Localization by template (expandTemplate and getTemplateFunctor methods)
 *
 * It is quite challenging to format the dates sometimes. First, date string is formatted by mask (e.g., "mmm'yy").
 * Second, date string depends on current localization ("Jan" or "Янв"). Let's use template formatting method
 * to format the dates.
 *
 *     $(function() {
 *         var lang = new JW.Property("en");
 *         var locale = new JW.Plugins.Locale(dictionary, lang);
 *         assert("Jan'10" === locale.{@link JW.Plugins.Locale#expandTemplate expandTemplate}("${monthsShort.0}'10");
 *     });
 *
 * JW.Plugins.Locale.formatDate method allows you to build an appropriate date formatting template by mask.
 *
 *     $(function() {
 *         var lang = new JW.Property("en");
 *         var locale = new JW.Plugins.Locale(dictionary, lang);
 *         var date = new Date(2010, 0, 1);
 *         var format = JW.Plugins.Locale.formatDate(date, "mmm'yy");
 *         assert("Jan'10" === locale.{@link JW.Plugins.Locale#expandTemplate expandTemplate}(format);
 *     });
 *
 * Method {@link JW.Plugins.Locale#getTemplateFunctor getTemplateFunctor} allows you to start dynamic date
 * reformatting on localization change.
 *
 *     $(function() {
 *         var lang = new JW.Property("en");
 *         var locale = new JW.Plugins.Locale(dictionary, lang);
 *
 *         var date = new Date(2010, 0, 1);
 *         var format = JW.Plugins.Locale.formatDate(date, "mmm'yy");
 *         var dateFunctor = locale.{@link JW.Plugins.Locale#getTemplateFunctor getTemplateFunctor}(format);
 *         assert("Jan'10" === dateFunctor.{@link JW.Functor#property-target target}.{@link JW.Property#get get}());
 *
 *         lang.{@link JW.Property#set set}("ru");
 *         assert("Янв'10" === dateFunctor.{@link JW.Functor#property-target target}.{@link JW.Property#get get}());
 *
 *         dateFunctor.{@link JW.Functor#destroy destroy}();
 *     });
 *
 * Just as in previous examples, you can now easily bind text inside any DOM-element to dateFunctor.{@link JW.Functor#property-target target}.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates localization management model.
 * @param {Object} data Dictionary.
 * @param {JW.Property} lang `<string>` Currently selected locale identifier.
 */
JW.Plugins.Locale = function(data, lang) {
	JW.Plugins.Locale._super.call(this);
	this.data = data;
	this.lang = lang;
};

JW.extend(JW.Plugins.Locale, JW.Class, {
	/**
	 * @property {Object} data Dictionary.
	 */
	/**
	 * @property {JW.Property} lang `<string>` Currently selected locale identifier.
	 */

	/**
	 * Returns an array of all available locale identifiers in the dictionary.
	 * @returns {Array} `<string>` Available locale identifiers.
	 */
	getLanguages: function() {
		return JW.Map.getKeys(this.data);
	},

	/**
	 * Returns locale string by key. Supports two variations:
	 *
	 * - getString(id:string/Array):string - returns string with key "id" in a current locale
	 * - getString(lang:string, id:string/Array):string - returns string with key "id" in locale "lang"
	 *
	 * @param {string} lang Locale identifier.
	 * @param {string/Array} [id] String key to retrieve via JW.get method.
	 * @returns {string} String. If dictionary doesn't contain string with a specified key, returns id.
	 * If id is an array in this situation, returns the last item of the array.
	 */
	getString: function(lang, id) {
		if (!JW.isSet(id)) {
			id = lang;
			lang = this.lang.get();
		}
		var str = JW.get(this.data[lang], id);
		return JW.isSet(str) ? str : (typeof id === "string") ? id : JW.Array.getLast(id);
	},

	/**
	 * Returns a functor which builds the string with a key "id" in a current locale.
	 * The client which uses this method must take care of its destruction.
	 * @param {string/Array} id String key to retrieve via JW.get method.
	 * @returns {JW.Functor} `<string>` Functor.
	 */
	getFunctor: function(id) {
		return new JW.Functor([this.lang], function(lang) {
			return this.getString(id);
		}, this);
	},

	/**
	 * Builds a child localization object, which provides access to the strings in a specified sub-dictionary.
	 * @param {string/Array} id Sub-dictionary key to retrieve via JW.get method.
	 * @returns {JW.Plugins.Locale} Child localization object.
	 */
	getSubLocale: function(id) {
		var data = JW.Map.map(this.data, function(langData) {
			return JW.get(langData, id);
		}, this);
		return new JW.Plugins.Locale(data, this.lang);
	},

	/**
	 * Formats a string by a template in a current locale. For example, "${months.0}'10" string
	 * will be expanded to either "Jan'10" or "Янв'10" depending on current locale. The words which are taken to
	 * the curly braces with $ sign will be replaced with the corresponding strings in the localization
	 * dictionary.
	 * @param {string} template Template.
	 * @returns {string} Formatted string.
	 */
	expandTemplate: function(template) {
		var data = this.data[this.lang.get()];
		return template.replace(/\$\{([^\}]+)\}/g, function(a, b) {
			return JW.get(data, b, a);
		});
	},

	/**
	 * Returns a functor which formats the specified template in a current locale.
	 * The client which uses this method must take care of its destruction.
	 * @param {string} template Template.
	 * @returns {JW.Functor} `<string>` Functor.
	 */
	getTemplateFunctor: function(template) {
		return new JW.Functor([this.lang], function(lang) {
			return this.expandTemplate(template);
		}, this);
	}
});

/**
 * @static
 *
 * Formats date string. An optimized version of the utility by Steven Levithan, which
 * supports dynamic localization switching now.
 * @param {Date} date Date.
 * @param {string} mask Mask. Supports the next fragments:
 *
 * - d - day in month 1-31
 * - dd - day in month 0-31
 * - ddd - day in month ${daysShort.0-6}
 * - dddd - day in month ${days.0-6}
 * - m - month 1-12
 * - mm - month 01-12
 * - mmm - month ${monthsShort.0-11}
 * - mmmm - month ${months.0-11}
 * - yy - year 00-99
 * - yyyy - year 1970-2100
 * - q - quarter 1-4
 * - h - hour 1-12
 * - hh - hour 01-12
 * - H - hour 0-23
 * - HH - hour 00-23
 * - M - minute 0-59
 * - MM - minute 00-59
 * - s - second 0-59
 * - ss - second 00-59
 * - l - millisecond 000-999
 * - t - a/p
 * - tt - am/pm
 * - T - A/P
 * - TT - AM/PM
 *
 * @param {boolean} utc Format in UTC.
 * @returns Template to pass into JW.Plugins.Locale.expandTemplate method.
 */
JW.Plugins.Locale.formatDate = function() {
	var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[lq]|"[^"]*"|'[^']*'/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function(date, mask, utc) {
		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var _ = utc ? "getUTC" : "get";

		return mask.replace(token, function ($0) {
			switch ($0)
			{
				case "d":    return date[_ + "Date"]();
				case "dd":   return pad(date[_ + "Date"]());
				case "ddd":  return "${daysShort." + date[_ + "Day"]() + "}";
				case "dddd": return "${days." + date[_ + "Day"]() + "}";
				case "m":    return date[_ + "Month"]() + 1;
				case "mm":   return pad(date[_ + "Month"]() + 1);
				case "mmm":  return "${monthsShort." + [date[_ + "Month"]()] + "}";
				case "mmmm": return "${months." + [date[_ + "Month"]()] + "}";
				case "yy":   return String(date[_ + "FullYear"]()).slice(2);
				case "yyyy": return date[_ + "FullYear"]();
				case "q":    return "Q" + (Math.floor(date[_ + "Month"]() / 3) + 1);
				case "h":    return date[_ + "Hours"]() % 12 || 12;
				case "hh":   return pad(date[_ + "Hours"]() % 12 || 12);
				case "H":    return date[_ + "Hours"]();
				case "HH":   return pad(date[_ + "Hours"]());
				case "M":    return date[_ + "Minutes"]();
				case "MM":   return pad(date[_ + "Minutes"]());
				case "s":    return date[_ + "Seconds"]();
				case "ss":   return pad(date[_ + "Seconds"]());
				case "l":    return pad(date[_ + "Milliseconds"](), 3);
				case "t":    return date[_ + "Hours"]() < 12 ? "a"  : "p";
				case "tt":   return date[_ + "Hours"]() < 12 ? "am" : "pm";
				case "T":    return date[_ + "Hours"]() < 12 ? "A"  : "P";
				case "TT":   return date[_ + "Hours"]() < 12 ? "AM" : "PM";
				default:     return $0.slice(1, $0.length - 1);
			}
		});
	};
}();