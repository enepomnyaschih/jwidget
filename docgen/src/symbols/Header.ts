import AbstractSymbol from "./AbstractSymbol";
import SourceFile from "../SourceFile";
import {htmlEncode} from "../utils/String";

export default class HeaderSymbol extends AbstractSymbol {

	constructor(file: SourceFile, id: string, readonly text: string) {
		super(file, id);
		file.currentGroupId = id;
		file.groups[id] = [];
	}

	render(): string {
		return `<h2>${htmlEncode(this.text)}</h2>`;
	}
}
