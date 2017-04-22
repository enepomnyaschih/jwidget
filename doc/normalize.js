const fs = require("fs");

const mapping = {};

function walk(name) {
	const path = name ? (__dirname + "/" + name) : __dirname;
	const files = fs.readdirSync(path);
	files.forEach(function(file) {
		const subname = name ? (name + "/" + file) : file;
		if (fs.statSync(path + "/" + file).isDirectory()) {
			walk(subname);
		} else if (/\.md$/.test(file)) {
			process(subname.substr(0, subname.length - 3));
		}
	});
}

function process(name) {
	console.log("Processing " + name);
	const contents = fs.readFileSync(__dirname + "/" + name + ".md", {encoding: "utf8"});
	const tokens = name.split("/").slice(0, -1);
	fs.writeFileSync(__dirname + "/" + name + ".md", contents.replace(/\[(jwidget\/[^\]]+)\](?:\([^\)]+\))?/g, (a, match) => {
		const notation = match.split(".");
		const cls = notation[0];
		const member = notation[1];
		const subtokens = (mapping[cls] || cls).split("/");
		const index = diff(tokens, subtokens);
		return "[" + match + "](" + repeat("..", tokens.length - index).concat(subtokens.slice(index)).join("/") +
			".md" + (member ? ("#" + member.toLowerCase()) : "") + ")";
	}));
}

function diff(x, y) {
	const l = Math.min(x.length, y.length);
	for (var i = 0; i < l; ++i) {
		if (x[i] !== y[i]) {
			return i;
		}
	}
	return l;
}

function repeat(value, count) {
	const arr = new Array(count);
	while (count > 0) {
		arr[--count] = value;
	}
	return arr;
}

walk();
