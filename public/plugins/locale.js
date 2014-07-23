JW.Plugins = JW.Plugins || {};

/**
 * @class
 *
 * Класс для управления локализацией приложения.
 *
 * ## Постановка задачи
 *
 * Предположим, в вашем распоряжении есть следующий словарь локализации:
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
 * Вам необходимо реализовать компонент для динамического переключения локализации приложения без перезагрузки страницы.
 * С классом JW.Plugins.Locale это делается очень легко. JW.Plugins.Locale работает на базе JW.Property.
 *
 * ## Метод getString
 *
 * С помощью метода getString вы можете получить указанную строку в текущей или указанной локализации.
 *
 *     // ... выше объявляем словарь dictionary
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
 * ## Метод getFunctor
 *
 * Если локализацию приложения необходимо переключать динамически, то одного метода getString не достаточно.
 * Воспользуемся методом getFunctor, который формирует новый экземпляр JW.Property, содержащий указанную строку в
 * текущей локализации и обновляющий ее при изменении текущей локализации.
 *
 *     $(function() {
 *         var lang = new JW.Property("en");
 *         var locale = new JW.Plugins.Locale(dictionary, lang);
 *
 *         var submitFunctor = locale.getFunctor("submit");
 *         assert("Submit" === submitFunctor.target.get());
 *
 *         lang.set("ru");
 *         assert("Отправить" === submitFunctor.target.get());
 *
 *         submitFunctor.destroy(); // если функтор больше не нужен, его необходимо уничтожить
 *     });
 *
 * ## Использование метода getFunctor в компонентах
 *
 * Предположим, вам нужно вывести строку "name" в качестве метки внутри некоторой формы и "submit" в качестве текста для
 * кнопки отправления формы. Воспользуемся хелперами JW.UI.TextUpdater и JW.UI.ValueUpdater.
 *
 *     var Form = function(locale) {
 *         Form._super.call(this);
 *         this.locale = locale; // JW.Plugins.Locale
 *     };
 *
 *     JW.extend(Form, JW.UI.Component, {
 *         renderNameLabel: function(el) {
 *             var text = this.own(this.locale.getFunctor("name")).target;
 *             this.own(new JW.UI.TextUpdater(el, text));
 *         },
 *
 *         renderSubmit: function(el) {
 *             var text = this.own(this.locale.getFunctor("submit")).target;
 *             this.own(new JW.UI.ValueUpdater(el, text));
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
 * Протестируем нашу форму.
 *
 *     $(function() {
 *         var lang = new JW.Property("en");
 *         var locale = new JW.Plugins.Locale(dictionary, lang);
 *
 *         var form = new Form(locale).renderTo("body");
 *
 *         // Спустя 2 секунды меняем локализацию на русскую
 *         setTimeout(function() { lang.set("ru"); }, 2000);
 *     });
 *
 * ## Компонент для переключения локализации
 *
 * Теперь нам нужен нормальный компонент для переключения локализации. Воспользуемся радиокнопками и
 * хелперами JW.UI.RadioUpdater и JW.UI.RadioListener.
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
 *             this.own(new JW.UI.RadioUpdater(this.el, "lang", this.locale.lang));
 *             this.own(new JW.UI.RadioListener(this.el, "lang", this.locale.lang));
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
 * Попробуем протестировать его.
 *
 * $(function() {
 * 	var lang = new JW.Property("en");
 * 	var locale = new JW.Plugins.Locale(dictionary, lang);
 * 	var switcher = new LocaleSwitch(locale).renderTo("body");
 * });
 *
 * ## Дочерняя локализация (метод getSubLocale)
 *
 * Посмотрим, как еще можно упростить работу с локализацией. Иногда некоторому компоненту нужна лишь некоторая часть
 * локализации (например, строки в "equipment"), и, чтобы не писать каждый раз длинные выражения, заведем дочерние
 * объекты локализации.
 *
 *     var EquipmentSelector = function(locale) {
 *         EquipmentSelector._super.call(this);
 *         this.locale = locale; // JW.Plugins.Locale, дочерний объект локализации
 *     };
 *
 *     JW.extend(EquipmentSelector, JW.UI.Component, {
 *         renderMonitor: function(el) {
 *             var text = this.own(this.locale.getFunctor("monitor")).target;
 *             this.own(new JW.UI.TextUpdater(el, text));
 *         },
 *
 *         renderKeyboard: function(el) {
 *             var text = this.own(this.locale.getFunctor("keyboard")).target;
 *             this.own(new JW.UI.TextUpdater(el, text));
 *         },
 *
 *         renderMouse: function(el) {
 *             var text = this.own(this.locale.getFunctor("mouse")).target;
 *             this.own(new JW.UI.TextUpdater(el, text));
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
 * Воспользуемся методом getSubLocale, чтобы сформировать искомый дочерний объект локализации.
 *
 *     $(function() {
 *         var lang = new JW.Property("en");
 *         var locale = new JW.Plugins.Locale(dictionary, lang);
 *         var equipmentLocale = locale.getSubLocale("equipment");
 *         var equipmentSelector = new EquipmentSelector(equipmentLocale).renderTo("body");
 *     });
 *
 * Как видите, внутри компонента EquipmentDescription мы теперь можем кратко записывать ключ локализации:
 *
 * - "monitor", а не "equipment.monitor"
 * - "keyboard", а не "equipment.keyboard"
 * - "mouse", а не "equipment.mouse"
 *
 * ## Локализация по шаблону (методы extendTemplate и getTemplateFunctor)
 *
 * Даты форматировать непросто. Во-первых, строка даты зависит от маски (например, "mmm'yy") и от текущей локализации
 * ("Jan" или "Янв"). Для форматирования дат воспользуемся методом форматирования строки по шаблону.
 *
 *     $(function() {
 *         var lang = new JW.Property("en");
 *         var locale = new JW.Plugins.Locale(dictionary, lang);
 *         assert("Jan'10" === locale.extendTemplate("${monthsShort.0}'10");
 *     });
 *
 * Метод JW.Plugins.Locale.formatDate позволяет сформировать шаблон для форматирования даты.
 *
 *     $(function() {
 *         var lang = new JW.Property("en");
 *         var locale = new JW.Plugins.Locale(dictionary, lang);
 *         var date = new Date(2010, 0, 1);
 *         var format = JW.Plugins.Locale.formatDate(date, "mmm'yy");
 *         assert("Jan'10" === locale.extendTemplate(format);
 *     });
 *
 * Метод getTemplateFunctor позволяет наладить динамическое изменение строки даты при изменении текущей локализации.
 *
 *     $(function() {
 *         var lang = new JW.Property("en");
 *         var locale = new JW.Plugins.Locale(dictionary, lang);
 *
 *         var date = new Date(2010, 0, 1);
 *         var format = JW.Plugins.Locale.formatDate(date, "mmm'yy");
 *         var dateFunctor = locale.getTemplateFunctor(format);
 *         assert("Jan'10" === dateFunctor.target.get());
 *
 *         lang.set("ru");
 *         assert("Янв'10" === dateFunctor.target.get());
 *
 *         dateFunctor.destroy();
 *     });
 *
 * Теперь по аналогии с предыдущими примерами можно легко привязать текст внутри любого DOM-элемента к dateFunctor.target.
 *
 * @extends JW.Class
 *
 * @constructor
 * Создает модель управления локализацией.
 * @param {Object} data Словарь.
 * @param {JW.Property} lang `<string>` Текущий выбранный идентификатор языка.
 */
JW.Plugins.Locale = function(data, lang) {
	JW.Plugins.Locale._super.call(this);
	this.data = data;
	this.lang = lang;
};

JW.extend(JW.Plugins.Locale, JW.Class, {
	/**
	 * Возвращает массив всех доступных языков в словаре.
	 * @returns {Array} `<string>` Доступные языки.
	 */
	getLanguages: function() {
		return JW.Map.getKeys(this.data);
	},

	/**
	 * Возвращает строку локализации с указанным ключом. Поддерживается две вариации:
	 *
	 * - getString(id:string/Array):string - возвращает строку с ключом id в текущей локализации
	 * - getString(lang:string, id:string/Array):string - возвращает строку с ключом id в локализации lang
	 *
	 * @param {string} lang Идентификатор языка.
	 * @param {string/Array} [id] Ключ слова для поиска через метод JW.get.
	 * @returns {string} Слово. Если в указанное слово в словаре отсутствует, возвращает id.
	 * Если id при этом является массивом, возвращает последний элемент массива.
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
	 * Возвращает функтор, который строит строку с ключом id в текущей локализации.
	 * Клиент, использующий этот метод, должен уничтожить функтор после использования.
	 * @param {string/Array} id Ключ слова для поиска через метод JW.get.
	 * @returns {JW.Functor} `<string>` Функтор.
	 */
	getFunctor: function(id) {
		return new JW.Functor([this.lang], function(lang) {
			return this.getString(id);
		}, this);
	},

	/**
	* Создает дочерний объект локализации, дающий доступ к строкам в подсловаре с ключом "id".
	* @param {string/Array} id Ключ подсловаря для поиска через метод JW.get.
	* @returns {JW.Plugins.Locale} Дочерний объект локализации.
	*/
	getSubLocale: function(id) {
		var data = JW.Map.map(this.data, function(langData) {
			return JW.get(langData, id);
		}, this);
		return new JW.Plugins.Locale(data, this.lang);
	},

	/**
	* Форматирует строку по шаблону в текущей локализации. Например, строка "${months.0}'10"
	* может раскрыться в "Jan'10" или "Янв'10", в зависимости от текущей локализации. Слова,
	* заключенные в фигурные скобки со знаком $, заменяются на соответствующие строки
	* локализации.
	* @param {string} template Шаблон.
	* @returns {string} Отформатированная строка.
	*/
	expandTemplate: function(template) {
		var data = this.data[this.lang.get()];
		return template.replace(/\$\{([^\}]+)\}/g, function(a, b) {
			return JW.get(data, b, a);
		});
	},

	/**
	* Возвращает функтор, который форматирует указанный шаблон в текущей локализации.
	* Клиент, использующий этот метод, должен уничтожить функтор после использования.
	* @param {string} template Шаблон.
	* @returns {JW.Functor} `<string>` Функтор.
	*/
	getTemplateFunctor: function(template) {
		return new JW.Functor([this.lang], function(lang) {
			return this.expandTemplate(template);
		}, this);
	}
});

/**
 * Форматирует строку даты. Оптимизированная версия утилиты от Steven Levithan, поддерживающая
 * динамическую смену локализации.
 * @param {Date} date Дата.
 * @param {string} mask Маска. Поддерживает следующие фрагменты:
 *
 * - d - день месяца 1-31
 * - dd - день месяца 0-31
 * - ddd - день недели ${daysShort.0-6}
 * - dddd - день недели ${days.0-6}
 * - m - месяц 1-12
 * - mm - месяц 01-12
 * - mmm - месяц ${monthsShort.0-11}
 * - mmmm - месяц ${months.0-11}
 * - yy - год 00-99
 * - yyyy - год 1970-2100
 * - q - четверть 1-4
 * - h - час 1-12
 * - hh - час 01-12
 * - H - час 0-23
 * - HH - час 00-23
 * - M - минута 0-59
 * - MM - минута 00-59
 * - s - секунда 0-59
 * - ss - секунда 00-59
 * - l - миллисекунда 000-999
 * - t - a/p
 * - tt - am/pm
 * - T - A/P
 * - TT - AM/PM
 *
 * @param {boolean} utc Форматировать дату в UTC.
 * @returns Шаблон для передачи в функцию Locale.expandTemplate.
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
