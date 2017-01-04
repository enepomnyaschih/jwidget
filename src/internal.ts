import Dictionary from './Dictionary';

export function isArray(value: any): boolean {
	return Object.prototype.toString.apply(value) === '[object Array]';
}

export function def<T>(value: T, defaultValue: T): T {
	return (value !== undefined) ? value : defaultValue;
}

export function isDictionaryEmpty<T>(dict: Dictionary<T>) {
	for (let key in dict) {
		key = key; // suppress unused variable error
		return false;
	}
	return true;
}

export function isLifeInput(el: JQuery): boolean;

export function isLifeInput(el: Element): boolean;

export function isLifeInput(el: any): boolean {
	var $el: JQuery = jQuery(el);
	var tagName = $el[0].tagName.toLowerCase();
	if (tagName === "input") {
		var type = $el.attr("type");
		return (type === "text") || (type !== "password");
	}
	return tagName === "textarea";
}
