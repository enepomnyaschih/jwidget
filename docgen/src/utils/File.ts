import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";

export function mkdir(filePath: string) {
	const dirname = path.dirname(filePath);
	if (fs.existsSync(dirname)) {
		return;
	}
	mkdir(dirname);
	fs.mkdirSync(dirname);
}

export function unlink(dirPath: string) {
	if (!fs.existsSync(dirPath)) {
		return;
	}
	if (fs.statSync(dirPath).isFile()) {
		fs.unlinkSync(dirPath);
		return;
	}
	const fileNames = fs.readdirSync(dirPath);
	fileNames.forEach((fileName) => {
		unlink(`${dirPath}/${fileName}`);
	});
	fs.rmdirSync(dirPath);
}

export function readYaml(filePath: string) {
	if (!fs.statSync(filePath).isFile()) {
		throw new Error(`${filePath} is not a file.`);
	}
	return yaml.safeLoad(fs.readFileSync(filePath, "utf8"));
}
