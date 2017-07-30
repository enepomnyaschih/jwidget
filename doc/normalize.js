/*
interface Class {
	typevars: string[];
	super?: string[];
}
*/

const classes = {
	Destroyable: {},
	Identifiable: {},
	Listenable: {
		typevars: ['P']
	},
	Bindable: {
		typevars: ['V']
	},
	DestroyableBindable: {},
	DestroyablePromise: {},
	Class: {},
	Event: {},
	Property: {},
	IClass: {},
	IEvent: {},
	IProperty: {},
	Component: {},
	Copier: {},
	Mapper: {},
	Switcher: {},
	ReadOnlyCollection: {},
	ReadOnlyList: {},
	ReadOnlyMap: {},
	ReadOnlySet: {},
	DestroyableReadOnlyCollection: {},
	DestroyableReadOnlyList: {},
	DestroyableReadOnlyMap: {},
	DestroyableReadOnlySet: {},
	ICollection: {},
	IList: {},
	IMap: {},
	ISet: {},
	List: {},
	Map: {},
	Set: {},
	Router: {},
	AbstractRestProvider: {},
	HttpRequest: {},
	AllPromise: {},
	RacePromise: {},
	Timeout: {},
	Destructor: {},
	Interval: {},
	DomInserter: {},
	DomTemplate: {},
	HtmlTemplate: {},
	Reducer: {},
	AbstractDestroyablePromise: {},
	AbstractTemplate: {},
	dummyDestroyable: {},
	dummyEvent: {},
	IndexCount: {},
	IndexItems: {},
	ListSpliceResult: {},
	TemplateOutput: {}
};

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
	const tokens = name.split("/").slice(0, -1);
	let contents = fs.readFileSync(__dirname + "/" + name + ".md", {encoding: "utf8"});
	const lf = (contents.split("\r\n").length * 2 > contents.split("\n").length) ? "\r\n" : "\n";
	contents = contents.replace(/\[(jwidget\/[^\]]+)\](?:\([^\)]+\))?/g, (a, match) => {
		const notation = match.split(".");
		const cls = notation[0];
		const member = notation[1];
		const subtokens = (mapping[cls] || cls).split("/");
		const index = diff(tokens, subtokens);
		return "[" + match + "](" + repeat("..", tokens.length - index).concat(subtokens.slice(index)).join("/") +
			".md" + (member ? ("#" + member.toLowerCase()) : "") + ")";
	});
	const indexBegin = contents.indexOf("[](BEGIN_INDEX)");
	const indexEnd   = contents.indexOf("[](END_INDEX)");
	if (indexBegin !== -1 && indexEnd !== -1 && indexBegin + 15 <= indexEnd) {
		contents =
			contents.substr(0, indexBegin + 15) +
			buildIndex(contents, lf) +
			contents.substr(indexEnd);
	}
	fs.writeFileSync(__dirname + "/" + name + ".md", contents);
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

function buildIndex(contents, lf) {
	const groups = [];
	const regexp = new RegExp(lf + "##(#?) ([^\\r\\n]+)" + lf, "g");
	let match;
	let title = "", subtitles;
	while (match = regexp.exec(contents)) {
		if (!match[1]) {
			title = match[2];
			subtitles = null;
		} else {
			if (!subtitles) {
				subtitles = [];
				groups.push({
					title: title,
					subtitles: subtitles
				});
			}
			subtitles.push(match[2]);
		}
	}
	return lf + groups.map((group) => {
		return "* **" + group.title + "**" + lf +
			group.subtitles.map((subtitle) => "    * [" + subtitle + "](#" + subtitle.toLowerCase() + ")").join(lf);
	}).join(lf) + lf;
}

walk();
