import Interface from './Interface';

interface Visitor {

	visitInterface(record: Interface): void;
}

export default Visitor;
