import Kind from './Kind';
import SourceFile from './SourceFile';

interface Referable {

	readonly name: string; // short display name
	readonly nameInFile: string; // unique in SourceFile, blank string for SourceFile instance
	readonly sourceFile: SourceFile;
	readonly kind: Kind; // prefer using Visitor instead of this property if possible
}

export default Referable;

export function referableToString(referable: Referable) {
	return !referable ? 'null' :
		!referable.nameInFile ? referable.sourceFile.name :
		(referable.nameInFile + ' in ' + referable.sourceFile.name);
}
