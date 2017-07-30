import Struct from './Struct';

export default class Type {

	readonly struct: Struct;
	readonly typeVars: Type[];

	constructor(config: Config) {
		this.struct = config.struct;
		this.typeVars = config.typeVars;
	}
}

export interface Config {
	struct: Struct;
	typeVars: Type[];
}
