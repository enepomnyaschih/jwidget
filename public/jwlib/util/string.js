/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * Набор утилитарных функций для строк.
 */
JW.String = {
	/**
	 * Экранирует специальные символы HTML в строке.
	 * Преобразует символы &amp;, &gt;, &lt;, &quot; в `&amp;` `&gt;` `&lt;` `&quot;` соответственно.
	 * @param {string} str Строка.
	 * @returns {string} Результат.
	 */
	htmlEncode: function(target) {
		return String(target).
			replace(/&/g, "&amp;").
			replace(/>/g, "&gt;").
			replace(/</g, "&lt;").
			replace(/"/g, "&quot;");
	},
	
	/**
	 * Деэкранирует специальные символы HTML в строке.
	 * Преобразует символы `&amp;` `&gt;` `&lt;` `&quot;` в &amp;, &gt;, &lt;, &quot; соответственно.
	 * @param {string} str Строка.
	 * @returns {string} Результат.
	 */
	htmlDecode: function(target) {
		return String(target).
			replace(/&quot;/g, '"').
			replace(/&lt;/g, "<").
			replace(/&gt;/g, ">").
			replace(/&amp;/g, "&");
	},
	
	removeScripts: function(target) {
		target = String(target);
		var result = [];
		var index = 0;
		while (true) {
			var from = target.indexOf("<script", index);
			if (from === -1) {
				break;
			}
			result.push(target.substr(index, from - index));
			index = target.indexOf("</script>", from) + 9;
			if (index === -1) {
				return result.join("");
			}
		}
		result.push(target.substr(index));
		return result.join("");
	},
	
	/**
	 * Сокращает строку до указанного количества символов. Если строка укладывается в указанную длину, она не меняется.
	 * В противном случае, она обрезается, и в конце добавляется подстрока ellipsis, так что итоговая строка
	 * получается длины length.
	 * @param {string} str Строка.
	 * @param {number} length Максимальная длина искомой строки.
	 * @param {string} [ellipsis] Конец строки при сокращении. По умолчанию равен многоточию `...`
	 * @returns {string} Результат.
	 */
	ellipsis: function(target, length, ellipsis) {
		target = String(target);
		if (target.length <= length) {
			return target;
		}
		ellipsis = ellipsis || "...";
		return target.substr(0, length - ellipsis.length) + ellipsis;
	},
	
	/**
	 * Дополняет строку в начале указанным символом до фиксированной длины.
	 * Если строка длиннее указанной длины, она не меняется.
	 * 
	 *     JW.String.prepend("123", 5, "0")  // "00123"
	 * 
	 * @param {string} str Строка.
	 * @param {number} length Длина искомой строки.
	 * @param {string} ch Символ, которым дополнить строку.
	 * @returns {string} Результат.
	 */
	prepend: function(target, length, ch) {
		target = String(target);
		var buf = [];
		length -= target.length;
		for (var i = 0; i < length; ++i) {
			buf.push(ch);
		}
		buf.push(target);
		return buf.join("");
	},
	
	/**
	 * Переводит первый символ в верхний регистр.
	 * 
	 *     JW.String.capitalize("vasya")  // "Vasya"
	 * 
	 * @param {string} str Строка.
	 * @returns {string} Результат.
	 */
	capitalize: function(target) {
		target = String(target);
		return target.charAt(0).toUpperCase() + target.substr(1);
	},
	
	/**
	 * Преобразует hyphen-style в camelStyle.
	 * 
	 *     JW.String.camel("i-love-js")  // "iLoveJs"
	 *
	 * @param {string} str Строка.
	 * @returns {string} Результат.
	 */
	camel: function(target) {
		return String(target).replace(/-([a-z])/ig, JW.String._fcamel);
	},
	
	/**
	 * Преобразует camelStyle в hyphen-style.
	 * 
	 *     JW.String.hyphen("iLoveJs")  // "i-love-js"
	 *
	 * @param {string} str Строка.
	 * @returns {string} Результат.
	 */
	hyphen: function(target) {
		return String(target).replace(/([A-Z])/g, JW.String._fhyphen);
	},
	
	/**
	 * Удаляет пробельные символы в начале и в конце строки.
	 * 
	 *     JW.String.trim("\t\tI love JS!    ")  // "I love JS!"
	 *
	 * @param {string} str Строка.
	 * @returns {string} Результат.
	 */
	trim: function(target) {
		return String(target).replace(/^\s*/, "").replace(/\s*$/, "");
	},
	
	_fcamel: function(a, b) {
		return b.toUpperCase();
	},
	
	_fhyphen: function(a, b) {
		return "-" + b.toLowerCase();
	}
};
