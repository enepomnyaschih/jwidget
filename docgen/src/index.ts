import * as fs from "fs";
import * as path from "path";
import parseProject from "./parseProject";
import bootstrapTemplate from "./templates/bootstrap";
import * as FileUtils from "./utils/File";

if (process.argv.length < 3) {
	throw new Error('USAGE: node docgen <path_to_doc.yaml>');
}

const project = parseProject(path.resolve(process.cwd(), process.argv[2]));
FileUtils.unlink(project.outputAbsolutePath);
fs.mkdirSync(project.outputAbsolutePath);
project.statics.forEach(definition => {
	FileUtils.copy(
		project.getAbsolutePath(definition.src),
		path.resolve(project.outputAbsolutePath, definition.dest),
		definition.rename ? dest => dest + ".txt" : undefined);
});
bootstrapTemplate(project);
