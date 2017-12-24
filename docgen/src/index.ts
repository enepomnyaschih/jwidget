import * as fs from "fs";
import * as yaml from "js-yaml";
import parseFile from "./parseFile";
import Project from "./Project";

const inputDir = __dirname + "/../../doc";
const outputDir = __dirname + "/../../doc-output";
const project = new Project();

function parse(relativePath: string) {
	const tokens = relativePath.split("/"),
		preId = tokens.slice(0, tokens.length - 1).join("/");
	const fileId = tokens[tokens.length - 1] === "index.yaml" ? preId :
		`${preId}/${relativePath.substr(0, relativePath.indexOf("."))}`;
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

function unlinkDir(path: string) {
	const fileNames = fs.readdirSync(path);
	fileNames.forEach((fileName) => {
		const subPath = `${path}/${fileName}`;
		if (fs.statSync(`${inputDir}/${subPath}`).isDirectory()) {
			unlinkDir(subPath);
		} else {
			console.log('deleting file ' + subPath);
			//fs.unlinkSync(subPath);
		}
	});
	console.log('deleting dir ' + path);
	//fs.rmdirSync(path);
}

parseDir("jwidget");
unlinkDir(outputDir);
for (let fileId in project.files) {
	const file = project.files[fileId];
	file.write(`${outputDir}/${fileId}.html`);
}
