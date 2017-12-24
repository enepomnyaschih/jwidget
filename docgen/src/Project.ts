import SourceFile from "./SourceFile";
import {urlRoot} from "./Constants";

export default class Project {
	readonly files: {[key: string]: SourceFile} = {};

	renderText(text: string, references: {[key: string]: Reference}) {
		return text.replace(/%(\w+)/g, (match, name) => {
			match = match;
			const reference = references[name];
			const file = this.files[reference.file];
			const hash = reference.symbol ? `#${reference.symbol}` : '';
			return `<a href="${urlRoot}/${file.url}${hash}">${name}</a>`;
		});
	}
}
