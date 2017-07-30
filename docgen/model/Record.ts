import Referable from './Referable';
import Visitor from './Visitor';

interface Record extends Referable {

	readonly parent: Referable;
	readonly isDefault: boolean;

	visit(visitor: Visitor): void;
}

export default Record;
