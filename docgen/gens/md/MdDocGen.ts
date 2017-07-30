import * as fs from 'fs';
import Program from '../../model/Program';
import AbstractDocGen from '../AbstractDocGen';
import MdParams from './MdParams';
import MdReferenceResolver from './MdReferenceResolver';
import MdWriter from './MdWriter';
import writeSourceFile from './writers/sourceFile';

export default class MdDocGen implements AbstractDocGen<MdParams> {
	parseParams(): MdParams {
		return {
			outputDir: './doc-output',
			indexFile: 'README.md',
			locale: 'en'
		};
	}

	generateDocs(program: Program, params: MdParams): void {
		const locale = JSON.parse(fs.readFileSync(params.locale + '.json', 'utf8'));
		const referenceResolver = new MdReferenceResolver();
		for (let name in program.sourceFiles) {
			referenceResolver.addFile(program.sourceFiles[name]);
		}
		for (let name in program.sourceFiles) {
			const writer = new MdWriter({
				program,
				params,
				locale,
				referenceResolver,
				sourceFile: program.sourceFiles[name]
			});
			writeSourceFile(writer);
		}
	}
}
