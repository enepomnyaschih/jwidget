import Dictionary from './Dictionary';
import Referable from './Referable';
import SourceFile from './SourceFile';

export default class Program {

	readonly sourceFiles: Dictionary<SourceFile>;
	readonly referables: Dictionary<Referable>;
}
