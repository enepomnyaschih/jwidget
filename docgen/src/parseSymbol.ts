import SourceFile from "./SourceFile";
import ISymbol from "./symbols/ISymbol";
import FunctionSymbol from "./symbols/Function";
import StructSymbol from "./symbols/Struct";

const parsers: {[key: string]: (file: SourceFile, key: string, json: any) => ISymbol} = {
	"function": (file: SourceFile, key: string, json: any) => new FunctionSymbol(file, key, json),
	"struct": (file: SourceFile, key: string, json: any) => new StructSymbol(file, key, json)
};

export default function parseSymbol(file: SourceFile, key: string, json: any): ISymbol {
	return parsers[json.type](file, key, json);
}
