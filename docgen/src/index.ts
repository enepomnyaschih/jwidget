import * as path from "path";
import parseProject from "./parseProject";

if (process.argv.length < 3) {
	throw new Error('USAGE: node docgen [path_to_doc.yaml]');
}

const project = parseProject(path.resolve(process.cwd(), process.argv[2]));
//unlink(outputDir);
for (let fileId in project.files) {
	const file = project.files[fileId];
	file.write(path.resolve(path.dirname(project.fileAbsolutePath), project.outputRelativePath, `${fileId}.html`));
}
