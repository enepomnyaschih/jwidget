import * as fs from 'fs';
import * as path from 'path';
import Program from '../../model/Program';
import Referable from '../../model/Referable';
import SourceFile from '../../model/SourceFile';
import Visitor from '../../model/Visitor';
import MdParams from './MdParams';
import MdReferenceResolver from './MdReferenceResolver';
import MdWritingVisitor from './MdWritingVisitor';

export default class MdWriter {
	readonly program: Program;
	readonly params: MdParams;
	readonly locale: any;
	readonly referenceResolver: MdReferenceResolver;
	readonly sourceFile: SourceFile;
	readonly stream: fs.WriteStream;
	readonly visitor: Visitor;

	private indentation = '';

	constructor(config: MdWriter.Config) {
		this.program = config.program;
		this.params = config.params;
		this.locale = config.locale;
		this.referenceResolver = config.referenceResolver;
		this.sourceFile = config.sourceFile;
		this.stream = fs.createWriteStream(path.resolve(this.params.outputDir, name + '.md'));
		this.visitor = new MdWritingVisitor(this);
	}

	write(...text: string[]): this {
		text.forEach((token) => this.stream.write(token));
		return this;
	}

	h1(name: string): this {
		return this.write('# ', name, '\n\n');
	}

	h2(name: string): this {
		return this.write('## ', name, '\n\n');
	}

	h3(name: string): this {
		return this.write('### ', name, '\n\n');
	}

	pre(name: string): this {
		return this.write('\t', name.replace(/\n(.)/g, '\n\t$1'), '\n\n');
	}

	link(name: string, url: string): this {
		return this.write('[', name, '](', url, ')');
	}

	reference(referable: Referable, relativeTo: SourceFile): this {
		return this.link(referable.name, this.referenceResolver.getUrl(referable, relativeTo));
	}

	ul(): this {
		this.indentation = this.indentation ? ('\t' + this.indentation) : '* ';
		return this;
	}

	ulEnd(): this {
		this.indentation = (this.indentation.charAt(0) === '\t') ? this.indentation.substr(1) : '';
		return this;
	}

	li(): this {
		return this.write(this.indentation);
	}
}

export namespace MdWriter {
	export interface Config {
		readonly program: Program;
		readonly params: MdParams;
		readonly locale: any;
		readonly referenceResolver: MdReferenceResolver;
		readonly sourceFile: SourceFile;
	}
}
