import Kind from './Kind';
import Record from './Record';
import Referable from './Referable';
import SourceFile from './SourceFile';
import Type from './Type';
import Visitor from './Visitor';

abstract class Struct implements Record {

	readonly parent: Referable;
	readonly sourceFile: SourceFile;
	readonly isDefault: boolean;
	readonly name: string;
	readonly nameInFile: string;
	readonly extendsTypes: Type[];

	constructor(config: Struct.Config) {
		this.parent = config.parent;
		this.sourceFile = config.sourceFile;
		this.isDefault = config.isDefault;
		this.name = config.name;
		this.nameInFile = config.nameInFile;
		this.extendsTypes = config.extendsTypes;
	}

	get id() {
		return this.name + '-struct';
	}

	abstract get kind(): Kind;

	abstract visit(visitor: Visitor): void;
}

export default Struct;

export namespace Struct {
	export interface Config {
		readonly parent: Referable;
		readonly sourceFile: SourceFile;
		readonly isDefault: boolean;
		readonly name: string;
		readonly nameInFile: string;
		readonly extendsTypes: Type[];
	}
}
