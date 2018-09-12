import * as fs from "fs";
import * as yaml from "js-yaml";
import * as path from "path";

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
		unlink(path.resolve(dirPath, fileName));
	});
	fs.rmdirSync(dirPath);
}

export function readYaml(filePath: string) {
	if (!fs.statSync(filePath).isFile()) {
		throw new Error(`${filePath} is not a file.`);
	}
	return yaml.safeLoad(fs.readFileSync(filePath, "utf8"));
}

export function copy(src: string, dest: string, rename?: (dest: string) => string) {
	if (!fs.existsSync(src)) {
		return;
	}
	if (fs.statSync(src).isFile()) {
		fs.copyFileSync(src, rename ? rename(dest) : dest);
		return;
	}
	const fileNames = fs.readdirSync(src);
	mkdir(path.resolve(dest, "dummy"));
	fileNames.forEach((fileName) => {
		copy(path.resolve(src, fileName), path.resolve(dest, fileName), rename);
	});
}
