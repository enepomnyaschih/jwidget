import * as fs from "fs";
import * as path from "path";
import SourceFile, {SourceFileJson} from "./SourceFile";
import Project, {ProjectJson} from "./Project";
import {readYaml} from "./utils/File";

function parseProjectFile(project: Project, relativePath: string) {
	const fileId = relativePath.substr(0, relativePath.indexOf("."));
	console.log(`Parsing ${fileId}...`);
	const json: SourceFileJson = readYaml(path.resolve(project.inputAbsolutePath, relativePath));
	const file = new SourceFile(project, fileId, json);
	project.files[fileId] = file;
	project.filesByToken[file.token] = project.filesByToken.hasOwnProperty(file.token) ? null : file;
}

function parseProjectDir(project: Project, relativePath?: string) {
	const absolutePath = relativePath ? path.resolve(project.inputAbsolutePath, relativePath) : project.inputAbsolutePath;
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
	const project = new Project(projectFileAbsolutePath, json);
	parseProjectDir(project);
	project.link();
	project.inheritMembers();
	return project;
}
