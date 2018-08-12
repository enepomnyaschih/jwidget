import Context from "./Context";
import Dictionary from "./Dictionary";
import Reference from "./models/Reference";
import ISymbol from "./symbols/ISymbol";
import Project from "./Project";

export default class Topic {

	readonly header: string;
	readonly text: string;
	readonly context: Context;

	constructor(readonly id: string, readonly symbol: ISymbol, json: TopicJson) {
		this.header = json.header;
		this.text = json.text;
		this.context = new TopicContext(this, json.references);
	}
}

export interface TopicJson {

	readonly header: string;
	readonly text: string;
	readonly references?: Dictionary<Reference>;
}

class TopicContext extends Context {

	constructor(readonly topic: Topic, references: Dictionary<Reference>) {
		super(references);
	}

	get parent(): Context {
		return this.topic.symbol.context;
	}

	get project(): Project {
		return this.topic.symbol.project;
	}

	get fileId(): string {
		return this.topic.symbol.file.id;
	}

	protected get name(): string {
		return this.topic.id;
	}

	protected getDefaultReference(key: string): Reference {
		return (key === this.name) ? {} : null;
	}
}
