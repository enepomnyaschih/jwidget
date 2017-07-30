import Interface from '../../../model/Interface';
import Kind from '../../../model/Kind';
import Type from '../../../model/Type';
import MdWriter from '../MdWriter';

export default function(record: Interface, writer: MdWriter) {
	const locale = writer.locale;

	writer.
		h1(record.name).
		h2(locale['consumption']).
		pre('import ' + record.name + " from '" + writer.sourceFile.name + "';").
		h2(locale['hierarchy']);

	if (record.extendsTypes.length) {
		writer.ul();
		record.extendsTypes.forEach((type) => {
			writer.
				li().
				write(Kind[type.struct.kind].toLowerCase()).
				write(' ');

			writeType(type, writer);
		});
	}

	writer.
		ul().
		li().
		write(Kind[record.kind].toLowerCase()).
		write(' **').
		write(record.name).
		write('**');

	// TODO: Type vars
}

function writeType(type: Type, writer: MdWriter) {
	writer.reference(type.struct, writer.sourceFile);
	if (!type.typeVars.length) {
		return;
	}
	writer.write('`<');
	type.typeVars.forEach((type, index) => {
		if (index) {
			writer.write(', ');
		}
		writeType(type, writer);
	});
	writer.write('>`');
}
