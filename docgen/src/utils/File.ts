import * as fs from "fs";
import * as path from "path";

export function mkdir(filePath: string) {
	const dirname = path.dirname(filePath);
	if (fs.existsSync(dirname)) {
		return;
	}
	mkdir(dirname);
	fs.mkdirSync(dirname);
}

export function unlink(path: string) {
	if (!fs.existsSync(path)) {
		return;
	}
	if (fs.statSync(path).isFile()) {
		fs.unlinkSync(path);
		return;
	}
	const fileNames = fs.readdirSync(path);
	fileNames.forEach((fileName) => {
		unlink(`${path}/${fileName}`);
	});
	fs.rmdirSync(path);
}
