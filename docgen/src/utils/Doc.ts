import Context from "../Context";
import Reference from "../models/Reference";
import Dictionary from "../Dictionary";
import * as DictionaryUtils from "../utils/Dictionary";
import DocError from "../DocError";
import Project from "../Project";

export function renderText(context: Context, text?: string) {
	if (!text) {
		return "";
	}
	return renderIncludes(context.file.project, text)
		.replace(/%(\w+)/g, (_, key) => renderReference(context, key));
}

export function renderIncludes(project: Project, text?: string) {
	if (!text) {
		return "";
	}
	return text.replace(/%%(\w+)/g, (_, key) => renderInclude(project, key))
}

export function renderInclude(project: Project, key: string): string {
	const include = project.includes[key];
	if (!include) {
		console.warn(`Invalid inclusion: ${key} is not defined.`);
		return `<span class="doc-error">Invalid inclusion: ${key}</span>`;
	}
	return renderIncludes(project, include);
}

export function renderReference(context: Context, key: string, relativeToFile?: string): string {
	try {
		const reference = context.resolveReference(key);
		const url = getReferenceUrl(reference, relativeToFile || context.file.id);
		return url ?
			`<a href="${url}" target="${reference.href ? "_blank" : "_parent"}">${reference.label || key}</a>` :
			`<b>${reference.label || key}</b>`;
	} catch (error) {
		if (error instanceof DocError) {
			console.warn(error.message);
			return `<span class="doc-error">Invalid reference: ${key}</span>`;
		} else {
			throw error;
		}
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
	if (!reference.file || relativeToFile === reference.file) {
		return hash;
	}
	return getRelativeUrl(reference.file + ".html" + hash, relativeToFile);
}

export function getRelativeUrl(absoluteUrl: string, relativeToFile: string): string {
	const fromHead = relativeToFile.split("/").slice(0, -1);
	const toSearchIndex = absoluteUrl.indexOf("?");
	const toHashIndex = absoluteUrl.indexOf("#");
	const toPathnameLength = Math.min(
		(toSearchIndex === -1) ? absoluteUrl.length : toSearchIndex,
		(toHashIndex === -1) ? absoluteUrl.length : toHashIndex);
	const to = absoluteUrl.substr(0, toPathnameLength).split("/");
	const toHead = to.slice(0, -1);
	let diff = 0;
	while (diff < fromHead.length && diff < toHead.length && fromHead[diff] === toHead[diff]) {
		++diff;
	}
	return [
		...fromHead.slice(diff).map(() => ".."),
		...to.slice(diff)
	].join("/") + absoluteUrl.substr(toPathnameLength);
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

export function renderDictionary<T>(dict: Dictionary<T>, title: string,
									renderer: (obj: T, key: string) => string, scope?: any) {
	if (DictionaryUtils.isEmpty(dict)) {
		return "";
	}
	const strDict = DictionaryUtils.map(dict, renderer, scope);
	return `
${title}
<ul>
${DictionaryUtils.join(strDict, "\n")}
</ul>`
}
