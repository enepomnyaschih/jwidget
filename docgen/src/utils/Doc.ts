import Context from "../Context";
import Reference from "../models/Reference";
import Dictionary from "../Dictionary";
import * as DictionaryUtils from "../utils/Dictionary";

export function renderText(context: Context, text?: string) {
	if (!text) {
		return "";
	}
	return text.replace(/%(\w+)/g, (_, key) => renderReference(context, key));
}

export function renderReference(context: Context, key: string, relativeToFile?: string): string {
	try {
		const reference = context.resolveReference(key);
		const url = getReferenceUrl(reference, relativeToFile || context.file.id);
		return url ?
			`<a href="${url}" target="${reference.href ? "_blank" : "_parent"}">${reference.label || key}</a>` :
			`<b>${reference.label || key}</b>`;
	} catch (error) {
		console.warn(error.message);
		return `<span class="error">Invalid reference: ${key}</span>`;
	}
}

export function getReferenceUrl(reference: Reference, relativeToFile: string): string {
	if (reference.href) {
		return reference.href;
	}
	if (!reference.file && !reference.symbol) {
		return null;
	}
	const suffix = [
		(reference.symbol ? reference.symbol.replace(".", "-") : null),
		(reference.member ? (reference.static ? reference.member + "-static" : reference.member) : null)
	].filter(Boolean).join("--");
	const hash = suffix ? `#${suffix}` : '';
	if (relativeToFile === reference.file) {
		return hash;
	}

	const from = relativeToFile.split("/").slice(0, -1);
	const to = reference.file.split("/");
	let diff = 0;
	while (diff < from.length && diff < to.length && from[diff] === to[diff]) {
		++diff;
	}
	return [
		...from.slice(diff).map(() => ".."),
		...to.slice(diff)
	].join("/") + ".html" + hash;
}

export function renderParams(context: Context, params: Dictionary<string>, returns?: string): string {
	return renderDefinitions(context, {
		...params,
		...(returns ? {returns} : null)
	});
}

export function renderDefinitions(context: Context, params: Dictionary<string>): string {
	if (DictionaryUtils.isEmpty(params)) {
		return "";
	}
	const dict = DictionaryUtils.map(params, (param, key) => `<dt>${key}</dt><dd>${renderText(context, param)}</dd>`);
	return `<dl>\n${DictionaryUtils.join(dict, "\n")}\n</dl>`;
}
