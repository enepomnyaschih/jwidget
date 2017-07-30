import MdWriter from '../MdWriter';

export default function(writer: MdWriter) {
	const sourceFile = writer.sourceFile;

	writer.link(writer.locale['backToIndex'], sourceFile.backPath + '/' + writer.params.indexFile);
	sourceFile.defaultRecord && sourceFile.defaultRecord.visit(writer.visitor);
	sourceFile.otherRecords.forEach((record) => record.visit(writer.visitor));
}
