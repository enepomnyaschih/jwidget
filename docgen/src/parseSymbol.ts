import SourceFile from "./SourceFile";
import ISymbol from "./symbols/ISymbol";
import FunctionSymbol from "./symbols/Function";
import StructSymbol from "./symbols/Struct";
import HeaderSymbol from "./symbols/Header";
import ValueSymbol from "./symbols/Value";

export default function parseSymbol(file: SourceFile, id: string, json: any): ISymbol {
	if (typeof json === "string") {
		return new HeaderSymbol(file, id, json);
	} else if (json.signature) {
		return new FunctionSymbol(file, id, json);
	} else if (json.type) {
		return new ValueSymbol(file, id, json);
	} else {
		return new StructSymbol(file, id, json);
	}
}
