var dictionary = {
	en: {
		_lang: "English",
		name: "Name",
		submit: "Submit",
		equipment: {
			monitor: "Monitor",
			keyboard: "Keyboard",
			mouse: "Mouse"
		},
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
		              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	},
	ru: {
		_lang: "Русский",
		name: "Имя",
		submit: "Отправить",
		equipment: {
			monitor: "Монитор",
			keyboard: "Клавиатура",
			mouse: "Мышь"
		},
		monthsShort: ["Янв", "Фев", "Мар", "Апр", "Мая", "Июн",
		              "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
	}
};

function assert(x) {
	if (!x) {
		throw "Assertion failed";
	}
}

$(function() {
	var lang = new JW.Property("en");
	var locale = new JW.Plugins.Locale(dictionary, lang);
	assert("Name" === locale.getString("name"));
	assert("Monitor" === locale.getString("equipment.monitor"));
	assert("Feb" === locale.getString(["monthsShort", 1]));

	var submitFunctor = locale.getFunctor("submit");
	assert("Submit" === submitFunctor.target.get());

	var date = new Date(2010, 0, 1);
	var format = JW.Plugins.Locale.formatDate(date, "mmm'yy");
	var dateFunctor = locale.getTemplateFunctor(format);
	assert("Jan'10" === dateFunctor.target.get());

	lang.set("ru");
	assert("Имя" === locale.getString("name"));
	assert("Монитор" === locale.getString("equipment.monitor"));
	assert("Фев" === locale.getString(["monthsShort", 1]));
	assert("Отправить" === submitFunctor.target.get());
	assert("Янв'10" === dateFunctor.target.get());

	assert("English" === locale.getString("en", "_lang"));
	assert("Русский" === locale.getString("ru", "_lang"));

	// функторы больше не нужны - уничтожим их
	submitFunctor.destroy();
	dateFunctor.destroy();

	var switcher = new LocaleSwitch(locale).renderTo("body");
	var form = new Form(locale).renderTo("body");
	var equipmentLocale = locale.getSubLocale("equipment");
	var equipmentSelector = new EquipmentSelector(equipmentLocale).renderTo("body");
});
