import SourceFile from "./SourceFile";
import {urlRoot} from "./Constants";

export default class Project {
	readonly files: {[key: string]: SourceFile} = {};

	renderText(text: string, references: {[key: string]: Reference}) {
		return text.replace(/%(\w+)/g, (match, name) => {
			const reference = references[name];
			if (!reference) {
				console.warn(`Unable to render reference: ${name}`);
				return match;
			}
			const file = this.files[reference.file];
			if (!file) {
				console.warn(`Invalid reference: file ${reference.file} does not exist`);
				return match;
			}
			const hash = reference.symbol ? `#${reference.symbol}` : '';
			return `<a href="${urlRoot}/${file.url}${hash}">${name}</a>`;
		});
	}
}
