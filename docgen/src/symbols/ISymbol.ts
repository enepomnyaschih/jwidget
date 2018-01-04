import Context from "../Context";

interface ISymbol {

	readonly context: Context;

	render(): string;
}

export default ISymbol;
