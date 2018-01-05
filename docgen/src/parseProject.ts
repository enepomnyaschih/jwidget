import * as fs from "fs";
import * as path from "path";
import SourceFile from "./SourceFile";
import Project from "./Project";
import {readYaml} from "./utils/File";
import Reference from "./models/Reference";
import Dictionary from "./Dictionary";
import parseSymbol from "./parseSymbol";

function parseProjectFile(project: Project, relativePath: string) {
	const fileId = relativePath.substr(0, relativePath.indexOf("."));
	console.log(`Parsing ${fileId}...`);
	const json: FileJson = readYaml(path.resolve(project.dirAbsolutePath, relativePath));
	const file = new SourceFile(project, fileId, json.references);
	if (json.symbols) {
		for (let key in json.symbols) {
			if (json.symbols.hasOwnProperty(key)) {
				file.symbols[key] = parseSymbol(file, key, json.symbols[key]);
			}
		}
	}
	project.files[fileId] = file;
	project.filesByToken[file.token] = project.filesByToken.hasOwnProperty(file.token) ? null : file;
}

function parseProjectDir(project: Project, relativePath?: string) {
	const absolutePath = relativePath ? path.resolve(project.dirAbsolutePath, relativePath) : project.dirAbsolutePath;
	if (fs.statSync(absolutePath).isFile()) {
		if (/\.yaml$/.test(relativePath)) {
			parseProjectFile(project, relativePath);
		} else {
			console.log(`Ignored ${relativePath} because this is not an yaml file.`);
		}
		return;
	}
	const fileNames = fs.readdirSync(absolutePath);
	fileNames.forEach((fileName) => {
		parseProjectDir(project, relativePath ? `${relativePath}/${fileName}` : fileName);
	});
}

export default function parseProject(projectFileAbsolutePath: string): Project {
	if (!/\.yaml$/.test(projectFileAbsolutePath)) {
		projectFileAbsolutePath = path.resolve(projectFileAbsolutePath, "doc.yaml");
	}
	const json: ProjectJson = readYaml(projectFileAbsolutePath);
	const project = new Project(projectFileAbsolutePath, json.output || "docoutput", json.references);
	parseProjectDir(project);
	project.link();
	return project;
}

interface ProjectJson {

	readonly output?: string;
	readonly references?: Dictionary<Reference>;
}

interface FileJson {

	readonly symbols: any;
	readonly references?: Dictionary<Reference>;
}
