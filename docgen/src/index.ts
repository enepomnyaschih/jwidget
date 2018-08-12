import * as fs from "fs";
import * as path from "path";
import * as FileUtils from "./utils/File";
import parseProject from "./parseProject";
import bootstrapTemplate from "./templates/bootstrap";

if (process.argv.length < 3) {
	throw new Error('USAGE: node docgen <path_to_doc.yaml>');
}

const project = parseProject(path.resolve(process.cwd(), process.argv[2]));
FileUtils.unlink(project.outputAbsolutePath);
fs.mkdirSync(project.outputAbsolutePath);
if (project.staticRelativePath) {
	FileUtils.copy(project.staticAbsolutePath, project.outputAbsolutePath);
}
bootstrapTemplate(project);
