import * as fs from "fs";
import * as yaml from "js-yaml";
import parseFile from "./parseFile";
import Project from "./Project";

const inputDir = __dirname + "/../../doc";
const outputDir = __dirname + "/../../docoutput";
const project = new Project();

function parse(relativePath: string) {
	const tokens = relativePath.split("/");
	const fileId = relativePath.substr(0, tokens[tokens.length - 1] === "index.yaml" ?
		relativePath.lastIndexOf("/") : relativePath.indexOf("."));
	console.log(`Building ${fileId}...`);
	const input = yaml.safeLoad(fs.readFileSync(`${inputDir}/${relativePath}`, "utf8"));
	project.files[fileId] = parseFile(project, fileId, input);
}

function parseDir(relativePath: string) {
	const fileNames = fs.readdirSync(`${inputDir}/${relativePath}`);
	fileNames.forEach((fileName) => {
		const subRelativePath = `${relativePath}/${fileName}`;
		if (fs.statSync(`${inputDir}/${subRelativePath}`).isDirectory()) {
			parseDir(subRelativePath);
		} else if (/\.yaml$/.test(fileName)) {
			parse(subRelativePath);
		}
	});
}

parseDir("jwidget");
//unlink(outputDir);
for (let fileId in project.files) {
	const file = project.files[fileId];
	file.write(`${outputDir}/${fileId}.html`);
}
