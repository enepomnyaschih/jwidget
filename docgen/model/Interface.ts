import Struct from './Struct';
import Visitor from './Visitor';

export default class Interface extends Struct {

	constructor(config: Config) {
		super(config);
	}

	visit(visitor: Visitor): void {
		visitor.visitInterface(this);
	}
}

export interface Config extends Struct.Config {

}
