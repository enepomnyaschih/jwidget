import Context from "../Context";
import Dictionary from "../Dictionary";
import DocError from "../DocError";
import Reference from "../models/Reference";
import Project from "../Project";
import StructSymbol from "../symbols/Struct";
import * as DictionaryUtils from "../utils/Dictionary";
import {htmlEncode} from "./String";

export function renderText(context: Context, text?: string) {
	if (!text) {
		return "";
	}
	return renderIncludes(context.project, text)
		.replace(/\s*?<\/pre>/g, "</pre>")
		.replace(/<pre>([\s\S]*?)<\/pre>/g, (_, code) => `<pre>${htmlEncode(code)}</pre>`)
		.replace(/%example:([\w\-]+)/g, (_, name) => renderExample(name, context.fileId))
		.replace(/%(\w+)/g, (_, key) => renderReferenceByKey(context, key));
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

export function renderExample(name: string, relativeToFile: string): string {
	return '<iframe style="border: 1px solid green; padding: 10px;" width="800" height="300" ' +
		`src="${getRelativeUrl(`samples/public/${name}.html`, relativeToFile)}"></iframe>`;
}

export function renderReference(reference: Reference, relativeToFile: string): string {
	const url = getReferenceUrl(reference, relativeToFile);
	return url ?
		`<a href="${url}" target="${reference.href && reference.href.charAt(0) !== "#" ? "_blank" : "_parent"}">${reference.label}</a>` :
		`<b>${reference.label}</b>`;
}

export function renderReferenceByKey(context: Context, key: string, relativeToFile?: string): string {
	try {
		const reference = context.resolveReference(key);
		return renderReference({
			label: key,
			...reference
		}, relativeToFile || context.fileId);
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
		reference.symbol ? reference.symbol.replace(".", "-") : reference.member ? "default" : null,
		reference.member ? (reference.static ? reference.member + "-static" : reference.member) : null
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
	const to = absoluteUrl.substr(0, toPathnameLength).split("/").filter(Boolean);
	const toHead = to.slice(0, -1);
	let diff = 0;
	while (diff < fromHead.length && diff < toHead.length && fromHead[diff] === toHead[diff]) {
		++diff;
	}
	return ([
		...fromHead.slice(diff).map(() => ".."),
		...to.slice(diff)
	].join("/") + absoluteUrl.substr(toPathnameLength)) || ".";
}

export function renderParams(context: Context, params: Dictionary<string>, returns?: string): string {
	return renderDefinitions(context, {
		...params,
		...(returns ? {'<span class="doc-returns">returns</span>': returns} : null)
	});
}

export function renderDefinitions(context: Context, params: Dictionary<string>): string {
	if (DictionaryUtils.isEmpty(params)) {
		return "";
	}
	const dict = DictionaryUtils.map(params, (param, key) => (
		`<dt class="col-lg-2 col-sm-3">${key}</dt><dd class="col-lg-10 col-sm-9">${renderText(context, param)}</dd>`
	));
	return `<dl class="row">\n${DictionaryUtils.join(dict, "\n")}\n</dl>`;
}

export function renderStructReference(struct: StructSymbol, relativeToFile: string) {
	const url = getReferenceUrl(struct.selfReference, relativeToFile);
	return `<a href="${url}">${struct.objectName}</a>`;
}
