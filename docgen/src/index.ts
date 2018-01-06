import * as path from "path";
import parseProject from "./parseProject";
import defaultTemplate from "./templates/template";

if (process.argv.length < 3) {
	throw new Error('USAGE: node docgen <path_to_doc.yaml>');
}

const project = parseProject(path.resolve(process.cwd(), process.argv[2]));
//unlink(outputDir);
defaultTemplate(project);
