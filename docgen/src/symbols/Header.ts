import AbstractSymbol from "./AbstractSymbol";
import SourceFile from "../SourceFile";

export default class HeaderSymbol extends AbstractSymbol {

	constructor(file: SourceFile, id: string, readonly text: string) {
		super(file, id);
		file.currentGroupId = id;
		file.groups[id] = [];
	}

	render(): string {
		return `<h2>${this.text}</h2>`;
	}
}
