import Interface from '../../model/Interface';
import MdWriter from './MdWriter';
import writeInterface from './writers/interface';

export default class MdWritingVisitor {

	constructor(private writer: MdWriter) {}

	visitInterface(record: Interface): void {
		writeInterface(record, this.writer);
	}
}
