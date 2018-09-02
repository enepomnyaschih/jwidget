import Project from "./Project";
import Context from "./Context";
import Reference from "./models/Reference";
import Dictionary from "./Dictionary";

export default class DocFile {

	readonly description: string;
	readonly context: Context;

	constructor(readonly project: Project, readonly id: string, json: DocFileJson) {
		this.description = json.description;
		this.context = new DocFileContext(this, json.references);
	}

	get url() {
		return `${this.id}.html`;
	}
}

export interface DocFileJson {

	readonly description: string;
	readonly references?: Dictionary<Reference>;
}

class DocFileContext extends Context {

	constructor(readonly docFile: DocFile, references: Dictionary<Reference>) {
		super(references);
	}

	get parent(): Context {
		return this.docFile.project.context;
	}

	get project(): Project {
		return this.docFile.project;
	}

	get fileId(): string {
		return this.docFile.id;
	}

	protected get name(): string {
		return this.docFile.id;
	}

	protected getDefaultReference(_key: string): Reference {
		return null;
	}
}
