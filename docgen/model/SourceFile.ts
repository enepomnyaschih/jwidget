import Record from './Record';
import Referable from './Referable';

export default class SourceFile implements Referable {

	readonly depth: number;
	readonly backPath: string;
	readonly defaultRecord: Record;
	readonly otherRecords: Record[];

	constructor(readonly name: string) {
		const dirNames = name.split('/').slice(0, -1);

		this.backPath = dirNames.map(() => '..').join('/');
		this.depth = dirNames.length;
	}

	get url() {
		return this.name;
	}
}
