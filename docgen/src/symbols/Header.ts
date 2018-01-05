import AbstractSymbol from "./AbstractSymbol";
import SourceFile from "../SourceFile";

export default class HeaderSymbol extends AbstractSymbol {

	constructor(file: SourceFile, id: string, readonly text: string) {
		super(file, id);
		file.currentGroupId = id;
	}

	render(): string {
		return `<h1>${this.text}</h1>`;
	}
}
