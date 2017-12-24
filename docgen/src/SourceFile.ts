import * as fs from "fs";
import DocObject from "./objects/DocObject";
import Project from "./Project";

export default class SourceFile {

	readonly objects: {[key: string]: DocObject} = {};
	readonly tokens: string[];

	constructor(readonly project: Project, readonly id: string) {
		this.tokens = this.id.split('/');
	}

	write(path: string) {
		fs.writeFileSync(path, this.render());
	}

	get url() {
		return `${this.id}.html`;
	}

	private render() {
		return `<!DOCTYPE html>
<html>
	<head>
		<title>${this.id} - jWidget</title>
	</head>
	<body>
		<a href="${this.index}">Back to index</a>
		<h1>${this.id}</h1>
		<h2>Consumption</h2>
		<pre>${this.consumption}</pre>
		${this.renderObjects()}
	</body>
</html>`;
	}

	private get token() {
		return this.tokens[this.tokens.length - 1];
	}

	private get index() {
		return this.tokens.map(() => '..').join('/');
	}

	private get consumption() {
		if (!this.objects.default) {
			return `import * as ${this.token} from "${this.id}";`;
		}
		const imports = Object.keys(this.objects).map((key) => key === 'default' ? this.token : `{${key}}`).join(', ');
		return `import ${imports} from ${this.id};`;
	}

	private renderObjects() {
		let buffer = '';
		for (let key in this.objects) {
			if (this.objects.hasOwnProperty(key)) {
				if (key !== 'default') {
					buffer += `\n<h1>${key}</h1>`;
				}
				buffer += this.objects[key].render();
			}
		}
		return buffer;
	}
}
