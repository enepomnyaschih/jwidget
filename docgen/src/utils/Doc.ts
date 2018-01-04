import Context from "../Context";
import Reference from "../models/Reference";

export function renderText(context: Context, text: string) {
	return text.replace(/%(\w+)/g, (_, key) => renderReference(context, key));
}

export function renderReference(context: Context, key: string, relativeToFile?: string): string {
	try {
		const reference = context.resolveReference(key);
		const url = getReferenceUrl(reference, relativeToFile || context.selfReference.file);
		return `<a href="${url}">${reference.label || key}</a>`;
	} catch (error) {
		console.warn(error.message);
		return `<span class="error">Invalid reference: ${key}</span>`;
	}
}

export function getReferenceUrl(reference: Reference, relativeToFile: string): string {
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
