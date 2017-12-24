import SourceFile from "./SourceFile";
import DocObject from "./objects/DocObject";
import FunctionObject from "./objects/Function";
import Project from "./Project";

const parsers: {[key: string]: (file: SourceFile, key: string, json: any) => DocObject} = {
	"function": (file: SourceFile, key: string, json: any) => {
		return new FunctionObject(file, key, json);
	}
};

export default function parseFile(project: Project, id: string, json: any): SourceFile {
	const file = new SourceFile(project, id);
	for (let key in json) {
		if (json.hasOwnProperty(key)) {
			const objectJson = json[key];
			file.objects[key] = parsers[objectJson.type](file, key, objectJson);
		}
	}
	return file;
}
