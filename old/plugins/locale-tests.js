/*
	jWidget UI tests.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Tests = {};
JW.Tests.Plugins = {};

JW.Tests.Plugins.LocaleTestCase = JW.Unit.TestCase.extend({
	setup: function() {
		this.dictionary = {
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
				job: {
					title: "Работа"
				},
				monthsShort: ["Янв", "Фев", "Мар", "Апр", "Мая", "Июн",
				              "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
			}
		};

		this.lang = new JW.Property("en");
		this.locale = new JW.Plugins.Locale(this.dictionary, this.lang);
	},

	teardown: function() {
		this.locale.destroy();
		this.locale = null;
		this.lang.destroy();
		this.lang = null;
	},

	testLocale: function() {
		this.assertTrue(JW.Array.equal(["en", "ru"], this.locale.getLanguages()));
		this.assertStrictEqual("Name", this.locale.getString("name"));
		this.assertStrictEqual("Monitor", this.locale.getString("equipment.monitor"));
		this.assertStrictEqual("Feb", this.locale.getString(["monthsShort", 1]));

		var equipmentLocale = this.locale.getSubLocale("equipment");
		this.assertStrictEqual("Monitor", equipmentLocale.getString("monitor"));

		var submitFunctor = this.locale.getFunctor("submit");
		this.assertStrictEqual("Submit", submitFunctor.target.get());

		var submitProperty = this.locale.getProperty("submit");
		this.assertStrictEqual("Submit", submitProperty.get());

		var monitorFunctor = equipmentLocale.getFunctor("monitor");
		this.assertStrictEqual("Monitor", monitorFunctor.target.get());

		var monitorProperty = equipmentLocale.getProperty("monitor");
		this.assertStrictEqual("Monitor", monitorProperty.get());

		var date = new Date(2010, 0, 1);
		var format = JW.Plugins.Locale.formatDate(date, "mmm'yy");
		this.assertStrictEqual("Jan'10", this.locale.expandTemplate(format));

		var dateFunctor = this.locale.getTemplateFunctor(format);
		this.assertStrictEqual("Jan'10", dateFunctor.target.get());

		var dateProperty = this.locale.getTemplateProperty(format);
		this.assertStrictEqual("Jan'10", dateProperty.get());

		this.lang.set("ru");
		this.assertStrictEqual("Имя", this.locale.getString("name"));
		this.assertStrictEqual("Монитор", this.locale.getString("equipment.monitor"));
		this.assertStrictEqual("Фев", this.locale.getString(["monthsShort", 1]));
		this.assertStrictEqual("Монитор", equipmentLocale.getString("monitor"));
		this.assertStrictEqual("Отправить", submitFunctor.target.get());
		this.assertStrictEqual("Отправить", submitProperty.get());
		this.assertStrictEqual("Монитор", monitorFunctor.target.get());
		this.assertStrictEqual("Монитор", monitorProperty.get());
		this.assertStrictEqual("Янв'10", this.locale.expandTemplate(format));
		this.assertStrictEqual("Янв'10", dateFunctor.target.get());
		this.assertStrictEqual("Янв'10", dateProperty.get());

		this.assertStrictEqual("English", this.locale.getString("en", "_lang"));
		this.assertStrictEqual("Русский", this.locale.getString("ru", "_lang"));

		this.assertStrictEqual("Jan'10", this.locale.expandTemplate("en", format));
		this.assertStrictEqual("Янв'10", this.locale.expandTemplate("ru", format));

		submitFunctor.destroy();
		submitProperty.destroy();
		monitorFunctor.destroy();
		monitorProperty.destroy();
		dateFunctor.destroy();
		dateProperty.destroy();
	},

	testFunctorConfig: function() {
		var target = new JW.Property();
		var functor = this.locale.getFunctor("submit", {target: target});
		this.assertStrictEqual(functor.target, target);
		this.assertStrictEqual("Submit", target.get());

		this.lang.set("ru");
		this.assertStrictEqual("Отправить", target.get());

		functor.destroy();
		this.lang.set("en");
		this.assertStrictEqual("Отправить", target.get());

		target.destroy();
	},

	testTemplateFunctorConfig: function() {
		var date = new Date(2010, 0, 1);
		var format = JW.Plugins.Locale.formatDate(date, "mmm'yy");
		var target = new JW.Property();
		var functor = this.locale.getTemplateFunctor(format, {target: target});
		this.assertStrictEqual(functor.target, target);
		this.assertStrictEqual("Jan'10", target.get());

		this.lang.set("ru");
		this.assertStrictEqual("Янв'10", target.get());

		functor.destroy();
		this.lang.set("en");
		this.assertStrictEqual("Янв'10", target.get());

		target.destroy();
	},

	testMissingStrings: function() {
		this.assertFalse(this.locale.hasString("missing"));
		this.assertUndefined(this.locale.getRawString("missing"));
		this.assertStrictEqual("missing", this.locale.getString("missing"));

		this.assertFalse(this.locale.hasString("job.title"));
		this.assertUndefined(this.locale.getRawString("job.title"));
		this.assertStrictEqual("job.title", this.locale.getString("job.title"));

		this.assertFalse(this.locale.hasString(["job", "title"]));
		this.assertStrictEqual("title", this.locale.getString(["job", "title"]));

		var functor = this.locale.getFunctor("job.title");
		this.assertStrictEqual("job.title", functor.target.get());

		this.lang.set("ru");

		this.assertFalse(this.locale.hasString("missing"));
		this.assertUndefined(this.locale.getRawString("missing"));
		this.assertStrictEqual("missing", this.locale.getString("missing"));

		this.assertTrue(this.locale.hasString("job.title"));
		this.assertStrictEqual("Работа", this.locale.getRawString("job.title"));
		this.assertStrictEqual("Работа", this.locale.getString("job.title"));

		this.assertTrue(this.locale.hasString(["job", "title"]));
		this.assertStrictEqual("Работа", this.locale.getString(["job", "title"]));

		this.assertStrictEqual("Работа", functor.target.get());

		this.assertUndefined(this.locale.getRawString("en", "job.title"));
		this.assertStrictEqual("Работа", this.locale.getRawString("ru", "job.title"));

		functor.destroy();
	}
});

jQuery(function() {
	setTimeout(function() {
		JW.Unit.run("JW.Tests", JW.Tests);
	}, 1000);
});
