import FunctionSymbol from "./symbols/Function";
import HeaderSymbol from "./symbols/Header";
import ValueSymbol from "./symbols/Value";
import StructSymbol from "./symbols/Struct";

export default interface SymbolVisitor<U> {

	visitHeader(symbol: HeaderSymbol): U;

	visitValue(symbol: ValueSymbol): U;

	visitFunction(symbol: FunctionSymbol): U;

	visitStruct(symbol: StructSymbol): U;
}
