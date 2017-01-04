/// <reference path="../build/d.ts/jwlib.d.ts" />

module JW {
	export module Plugins {
		/**
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
		 * It is easy thanks to JW.Plugins.Locale. It is based on [[JW.Property]].
		 *
		 * <iframe style="border: 1px solid green; padding: 10px;" width="400" height="140" src="http://enepomnyaschih.github.io/mt/1.2/locale.html"></iframe>
		 *
		 * Source code of the example is not minified so you can review it using "View source code of the frame" context
		 * menu item in your browser.
		 *
		 * ## getString method
		 *
		 * You can get a specified string in a current or specified locale using [[getString]] method.
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
		 *         assert("Name" === locale.getString("name"));
		 *         assert("Monitor" === locale.getString("equipment.monitor"));
		 *         assert("Feb" === locale.getString(["monthsShort", 1]));
		 *
		 *         lang.set("ru");
		 *         assert("Имя" === locale.getString("name"));
		 *         assert("Монитор" === locale.getString("equipment.monitor"));
		 *         assert("Фев" === locale.getString(["monthsShort", 1]));
		 *
		 *         assert("English" === locale.getString("en", "_lang"));
		 *         assert("Русский" === locale.getString("ru", "_lang"));
		 *     });
		 *
		 * ## getProperty method
		 *
		 * If you need to switch the application locale dynamically, getString method is not enough.
		 * Let's try [[getProperty]] method which builds a new instance of [[JW.Property]] containing
		 * a specified string in a current locale. The property will update itself automatically when user selects another locale.
		 *
		 *     $(function() {
		 *         var lang = new JW.Property("en");
		 *         var locale = new JW.Plugins.Locale(dictionary, lang);
		 *
		 *         var submitProperty = locale.getProperty("submit");
		 *         assert("Submit" === submitProperty.get());
		 *
		 *         lang.set("ru");
		 *         assert("Отправить" === submitProperty.get());
		 *
		 *         submitProperty.destroy(); // destroy the property since it is no more in use
		 *     });
		 *
		 * ## getProperty method usage in the components
		 *
		 * Assume that you need to output a "name" string as a label inside a form, and "submit" string as a
		 * submit button caption. Let's use [[JQuery|jQuery extension methods]].
		 *
		 *     var Form = function(locale) {
		 *         Form._super.call(this);
		 *         this.locale = locale; // JW.Plugins.Locale
		 *     };
		 *
		 *     JW.extend(Form, JW.UI.Component, {
		 *         renderNameLabel: function(el) {
		 *             var text = this.own(this.locale.getProperty("name"));
		 *             this.own(el.jwtext(text));
		 *         },
		 *
		 *         renderSubmit: function(el) {
		 *             var text = this.own(this.locale.getProperty("submit"));
		 *             this.own(el.jwval(text));
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
		 *         var form = new Form(locale).renderTo("body");
		 *
		 *         // In 2 seconds, switch to Russian locale
		 *         setTimeout(function() { lang.set("ru"); }, 2000);
		 *     });
		 *
		 * ## Locale switch component
		 *
		 * We need a nice component for localization switching. Let's render it as a radio group.
		 *
		 *     var LocaleSwitch = function(locale) {
		 *         LocaleSwitch._super.call(this);
		 *         this.locale = locale; // JW.Plugins.Locale
		 *     };
		 *
		 *     JW.extend(LocaleSwitch, JW.UI.Component, {
		 *         renderRoot: function() {
		 *             return JW.Array.$map(this.locale.getLanguages(), function(lang) {
		 *                 return this.own(new LocaleSwitchItem(this.locale, lang));
		 *             }, this);
		 *         },
		 *
		 *         afterRender: function() {
		 *             this._super();
		 *             this.own(this.el.jwradio("lang", this.locale.lang, JW.TWOWAY));
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
		 *         LocaleSwitchItem._super.call(this);
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
		 *             el.text(this.locale.getString(this.lang, "_lang"));
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
		 *         var switcher = new LocaleSwitch(locale).renderTo("body");
		 *     });
		 *
		 * ## Child localization (getSubLocale method)
		 *
		 * Let's look at one more way to simplify localization management. Sometimes a component needs just an isolated part
		 * of dictionary (e.g. strings in "equipment" object). To make access keys shorter, let's create child
		 * localization object.
		 *
		 *     var EquipmentSelector = function(locale) {
		 *         EquipmentSelector._super.call(this);
		 *         this.locale = locale; // JW.Plugins.Locale, child localization object
		 *     };
		 *
		 *     JW.extend(EquipmentSelector, JW.UI.Component, {
		 *         renderMonitor: function(el) {
		 *             var text = this.own(this.locale.getProperty("monitor"));
		 *             this.own(el.jwtext(text));
		 *         },
		 *
		 *         renderKeyboard: function(el) {
		 *             var text = this.own(this.locale.getProperty("keyboard"));
		 *             this.own(el.jwtext(text));
		 *         },
		 *
		 *         renderMouse: function(el) {
		 *             var text = this.own(this.locale.getProperty("mouse"));
		 *             this.own(el.jwtext(text));
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
		 * Let's use [[getSubLocale]] method to build the requested child localization object.
		 *
		 *     $(function() {
		 *         var lang = new JW.Property("en");
		 *         var locale = new JW.Plugins.Locale(dictionary, lang);
		 *         var equipmentLocale = locale.getSubLocale("equipment");
		 *         var equipmentSelector = new EquipmentSelector(equipmentLocale).renderTo("body");
		 *     });
		 *
		 * As you can see, we can use shorter keys inside EquipmentSelector component now:
		 *
		 * - "monitor", not "equipment.monitor"
		 * - "keyboard", not "equipment.keyboard"
		 * - "mouse", not "equipment.mouse"
		 *
		 * ## Localization by template (expandTemplate and getTemplateProperty methods)
		 *
		 * It is quite challenging to format the dates sometimes. First, date string is formatted by mask (e.g., "mmm'yy").
		 * Second, date string depends on current localization ("Jan" or "Янв"). Let's use template formatting method
		 * to format the dates.
		 *
		 *     $(function() {
		 *         var lang = new JW.Property("en");
		 *         var locale = new JW.Plugins.Locale(dictionary, lang);
		 *         assert("Jan'10" === locale.expandTemplate("${monthsShort.0}'10");
		 *     });
		 *
		 * [[JW.Plugins.Locale.formatDate]] method allows you to build an appropriate date formatting template by mask.
		 *
		 *     $(function() {
		 *         var lang = new JW.Property("en");
		 *         var locale = new JW.Plugins.Locale(dictionary, lang);
		 *         var date = new Date(2010, 0, 1);
		 *         var format = JW.Plugins.Locale.formatDate(date, "mmm'yy");
		 *         assert("Jan'10" === locale.expandTemplate(format);
		 *     });
		 *
		 * Method [[getTemplateProperty]] allows you to start dynamic date
		 * reformatting on localization change.
		 *
		 *     $(function() {
		 *         var lang = new JW.Property("en");
		 *         var locale = new JW.Plugins.Locale(dictionary, lang);
		 *
		 *         var date = new Date(2010, 0, 1);
		 *         var format = JW.Plugins.Locale.formatDate(date, "mmm'yy");
		 *         var dateProperty = locale.getTemplateProperty(format);
		 *         assert("Jan'10" === dateProperty.get());
		 *
		 *         lang.set("ru");
		 *         assert("Янв'10" === dateProperty.get());
		 *
		 *         dateProperty.destroy();
		 *     });
		 *
		 * Just as in previous examples, you can now easily bind text inside any DOM-element to dateProperty.
		 */
		export class Locale extends JW.Class {
			/**
			 * @param data Dictionary.
			 * @param lang Currently selected locale identifier.
			 */
			constructor(public data: any, public lang: JW.Property<string>) {
				super();
			}

			/**
			 * @returns Available locale identifiers in the dictionary.
			 */
			getLanguages(): string[] {
				return JW.Map.getKeys(this.data);
			}

			/**
			 * Returns locale string with specified key in a current locale.
			 *
			 * As opposed to [[getString]], returns `undefined` if the value is missing in the dictionary.
			 *
			 * @param id String key to retrieve via [[JW.get]] method.
			 * @returns The localized string.
			 * If dictionary doesn't contain string with a specified key, returns `undefined`.
			 */
			getRawString(id: any): string;

			/**
			 * Returns locale string with specified key in a specified locale.
			 *
			 * As opposed to [[getString]], returns `undefined` if the value is missing in the dictionary.
			 *
			 * @param lang Locale identifier.
			 * @param id String key to retrieve via [[JW.get]] method.
			 * @returns The localized string.
			 * If dictionary doesn't contain string with a specified key, returns `undefined`.
			 */
			getRawString(lang: string, id: any): string;
			getRawString(lang: string, id?: any): string {
				if (!JW.isSet(id)) {
					id = lang;
					lang = this.lang.get();
				}
				return JW.get<string>(this.data[lang], id);
			}

			/**
			 * Checks the string presence in the dictionary.
			 *
			 * @param id String key to retrieve via [[JW.get]] method.
			 */
			hasString(id: any): boolean;

			/**
			 * Checks the string presence in the dictionary.
			 *
			 * @param lang Locale identifier.
			 * @param id String key to retrieve via [[JW.get]] method.
			 */
			hasString(lang: string, id: any): boolean;
			hasString(lang: string, id?: any): boolean {
				return this.getRawString(lang, id) != null;
			}

			/**
			 * Returns locale string with specified key in a current locale.
			 *
			 * As opposed to [[getRawString]], returns the key if the value is missing in the dictionary.
			 *
			 * @param id String key to retrieve via [[JW.get]] method.
			 * @returns The localized string.
			 * If dictionary doesn't contain string with a specified key, returns id.
			 * If id is an array in this situation, returns the last item of the array.
			 */
			getString(id: any): string;

			/**
			 * Returns locale string with specified key in a specified locale.
			 *
			 * As opposed to [[getRawString]], returns the key if the value is missing in the dictionary.
			 *
			 * @param lang Locale identifier.
			 * @param id String key to retrieve via JW.get method.
			 * @returns The localized string.
			 * If dictionary doesn't contain string with a specified key, returns id.
			 * If id is an array in this situation, returns the last item of the array.
			 */
			getString(lang: string, id: any): string;
			getString(lang: string, id?: any): string {
				if (!JW.isSet(id)) {
					id = lang;
					lang = this.lang.get();
				}
				var str = JW.get<string>(this.data[lang], id);
				return JW.isSet(str) ? str : (typeof id === "string") ? <string>id : JW.Array.getLast<string>(id);
			}

			/**
			 * Returns a functor which builds the string with a key "id" in a current locale.
			 * The client which uses this method must take care of function destruction.
			 * @param id String key to retrieve via [[JW.get]] method.
			 * @param config Functor configuration.
			 */
			getFunctor(id: any, config?: JW.Functor.Config<string>): JW.Functor<string> {
				return new JW.Functor<string>([this.lang], function(lang: string) {
					return this.getString(id);
				}, this, config);
			}

			/**
			 * Returns a property containing the string with a key "id" in a current locale.
			 * The client which uses this method must take care of property destruction.
			 * @param id String key to retrieve via [[JW.get]] method.
			 * @returns Localized string.
			 */
			getProperty(id: any): JW.Property<string> {
				var result = new JW.Property<string>();
				result.own(this.getFunctor(id, {target: result}));
				return result;
			}

			/**
			 * Builds a child localization object, which provides access to the strings in a specified sub-dictionary.
			 * @param id Sub-dictionary key to retrieve via [[JW.get]] method.
			 * @returns Child localization object.
			 */
			getSubLocale(id: any): Locale {
				var data = JW.Map.map(this.data, function(langData) {
					return JW.get(langData, id);
				}, this);
				return new Locale(data, this.lang);
			}

			/**
			 * Formats a string by a template. For example, "${months.0}'10" string
			 * will be expanded to either "Jan'10" or "Янв'10" depending on the locale. The words which are taken to
			 * the curly braces with $ sign will be replaced with the corresponding strings in the localization
			 * dictionary.
			 *
			 * @param template Template.
			 * @returns Formatted string.
			 */
			expandTemplate(template: string): string;

			/**
			 * @param lang Locale identifier.
			 * @param template Template.
			 * @returns Formatted string.
			 */
			expandTemplate(lang: string, template: string): string;
			expandTemplate(lang: string, template?: string): string {
				if (!JW.isSet(template)) {
					template = lang;
					lang = this.lang.get();
				}
				var data = this.data[lang];
				return template.replace(/\$\{([^\}]+)\}/g, function(a, b) {
					return JW.get(data, b, a);
				});
			}

			/**
			 * Returns a functor which formats the specified template in a current locale.
			 * The client which uses this method must take care of functor destruction.
			 * @param template Template.
			 * @param config Functor configuration.
			 */
			getTemplateFunctor(template: string, config?: JW.Functor.Config<string>): JW.Functor<string> {
				return new JW.Functor<string>([this.lang], function(lang: string) {
					return this.expandTemplate(template);
				}, this, config);
			}

			/**
			 * Returns a property containing the specified template formatted in a current locale.
			 * The client which uses this method must take care of property destruction.
			 * @param template Template.
			 * @returns Localized string.
			 */
			getTemplateProperty(template: string): JW.Property<string> {
				var result = new JW.Property<string>();
				result.own(this.getTemplateFunctor(template, {target: result}));
				return result;
			}

			/**
			 * Formats date string. An optimized version of the utility by Steven Levithan, which
			 * supports dynamic localization switching now.
			 * @param date Date.
			 * @param mask Mask. Supports the next fragments:
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
			 * @param utc Format in UTC.
			 * @returns Template to pass into [[expandTemplate]] method.
			 */
			static formatDate(date: Date, mask: string, utc: boolean): string {
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
						case "yy":   return _JW.S(date[_ + "FullYear"]()).slice(2);
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
			}
		}

		/**
		 * @hidden
		 */
		var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[lq]|"[^"]*"|'[^']*'/g;

		/**
		 * @hidden
		 */
		function pad(val: any, len: number = 2): string {
			val = _JW.S(val);
			while (val.length < len) val = "0" + val;
			return val;
		}
	}
}
