import * as path from 'path';
import Dictionary from '../../model/Dictionary';
import Interface from '../../model/Interface';
import Referable from '../../model/Referable';
import {referableToString} from '../../model/Referable';
import SourceFile from '../../model/SourceFile';
import Visitor from '../../model/Visitor';

// TODO: Create one visitor per source file, for consistency with MdWritingVisitor
export default class MdReferenceResolver implements Visitor {

	private references: Dictionary<SourceFileReferences>;

	addFile(sourceFile: SourceFile) {
		this.references[sourceFile.name] = new SourceFileReferences(sourceFile);
		sourceFile.defaultRecord.visit(this);
		sourceFile.otherRecords.forEach((record) => record.visit(this));
	}

	getUrl(referable: Referable, relativeTo: SourceFile) {
		const sourceFile = referable.sourceFile;
		const references = this.references[sourceFile.name];
		if (!references) {
			console.warn('Unable to resolve reference for ' + referableToString(referable) + '. Source file is not registered.');
			return '?';
		}
		const file = (sourceFile !== relativeTo) ?
			(path.resolve(relativeTo.backPath, sourceFile.name) + '.md') : '';
		if (!referable.nameInFile) {
			return file;
		}
		const hash = references.hashes[referable.nameInFile];
		if (!hash) {
			console.warn('Unable to resolve reference for ' + referableToString(referable) + '. Object is not registered.');
			return '?';
		}
		return file + '#' + hash;
	}

	visitInterface(record: Interface): void {
		this.addReference(record.sourceFile, record);
	}

	private addReference(sourceFile: SourceFile, referable: Referable) {
		this.references[sourceFile.name].addReference(referable);
	}
}

class SourceFileReferences {

	readonly counts: Dictionary<number> = {}; // [name in lower case] => count used
	readonly hashes: Dictionary<string> = {}; // [nameInFile] => URL hash

	constructor(readonly sourceFile: SourceFile) {}

	addReference(referable: Referable) {
		const name = referable.name.toLowerCase();
		const count = this.counts[name] || 0;
		this.counts[name] = count + 1;
		this.hashes[referable.nameInFile] = name + (count ? '-' + (count + 1) : '');
	}
}
