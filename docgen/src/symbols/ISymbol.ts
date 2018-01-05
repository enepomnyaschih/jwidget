import Reference from "../models/Reference";

interface ISymbol {

	readonly selfReference: Reference;

	render(): string;
}

export default ISymbol;
