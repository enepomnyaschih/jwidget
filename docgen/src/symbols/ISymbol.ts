import Reference from "../models/Reference";
import Renderable from "../Renderable";

interface ISymbol extends Renderable {

	readonly selfReference: Reference;
}

export default ISymbol;
