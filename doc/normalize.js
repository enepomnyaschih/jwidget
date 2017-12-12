/*
interface File {
	type: string;
	name: string;
	fullName: string;
}

interface Utils {
	type: 'utils';
	title: string;
}

interface Class extends File {
	typevars?: string[]; // then converted to string
	super?: string[];

	// computed
	children: string[];
	depth: number;
}
*/

const files = {
	'': {
		type: 'utils',
		title: 'Core utilities'
	},
	ArrayUtils: {
		type: 'utils',
		title: 'Array utilities'
	},
	DictionaryUtils: {
		type: 'utils',
		title: 'Dictionary utilities'
	},
	DomUtils: {
		type: 'utils',
		title: 'DOM utilities'
	},
	StringUtils: {
		type: 'utils',
		title: 'String utilities'
	},
	Destroyable: {
		type: 'interface',
		tail: 0
	},
	Identifiable: {
		type: 'interface'
	},
	Listenable: {
		type: 'interface',
		typevars: ['P']
	},
	Bindable: {
		type: 'interface',
		typevars: ['V']
	},
	DestroyableBindable: {
		type: 'interface',
		typevars: ['V'],
		super: ['Destroyable', 'Bindable']
	},
	DestroyablePromise: {
		type: 'interface',
		typevars: ['T'],
		super: ['Destroyable']
	},
	Dictionary: {
		type: 'interface',
		typevars: ['T']
	},
	Some: {
		type: 'interface',
		typevars: ['T']
	},
	Class: {
		type: 'class',
		super: ['IClass'],
		tail: 0
	},
	Event: {
		type: 'class',
		typevars: ['P'],
		super: ['IEvent']
	},
	Property: {
		type: 'class',
		typevars: ['V'],
		super: ['Class', 'IProperty']
	},
	IClass: {
		type: 'interface',
		super: ['Destroyable', 'Identifiable'],
		tail: 1
	},
	IEvent: {
		type: 'interface',
		typevars: ['P'],
		super: ['Listenable', 'Destroyable']
	},
	IProperty: {
		type: 'interface',
		typevars: ['V'],
		super: ['DestroyableBindable']
	},
	Component: {
		type: 'class',
		super: ['Class']
	},
	template: {
		type: 'function'
	},
	Copier: {
		type: 'class',
		typevars: ['T'],
		super: ['Class']
	},
	Mapper: {
		type: 'class',
		typevars: ['T'],
		super: ['Class']
	},
	Switcher: {
		type: 'class',
		super: ['Class']
	},
	ReadOnlyCollection: {
		type: 'interface',
		typevars: ['T']
	},
	ReadOnlyList: {
		type: 'interface',
		typevars: ['T'],
		super: ['ReadOnlyCollection']
	},
	ReadOnlyMap: {
		type: 'interface',
		typevars: ['T'],
		super: ['ReadOnlyCollection']
	},
	ReadOnlySet: {
		type: 'interface',
		typevars: ['T'],
		super: ['ReadOnlyCollection']
	},
	DestroyableReadOnlyCollection: {
		type: 'interface',
		typevars: ['T'],
		super: ['Destroyable', 'ReadOnlyCollection']
	},
	DestroyableReadOnlyList: {
		type: 'interface',
		typevars: ['T'],
		super: ['Destroyable', 'ReadOnlyList']
	},
	DestroyableReadOnlyMap: {
		type: 'interface',
		typevars: ['T'],
		super: ['Destroyable', 'ReadOnlyMap']
	},
	DestroyableReadOnlySet: {
		type: 'interface',
		typevars: ['T'],
		super: ['Destroyable', 'ReadOnlySet']
	},
	ICollection: {
		type: 'interface',
		typevars: ['T'],
		super: ['IClass', 'DestroyableReadOnlyCollection']
	},
	IList: {
		type: 'interface',
		typevars: ['T'],
		super: ['ICollection', 'DestroyableReadOnlySet']
	},
	IMap: {
		type: 'interface',
		typevars: ['T'],
		super: ['ICollection', 'DestroyableReadOnlySet']
	},
	ISet: {
		type: 'interface',
		typevars: ['T'],
		super: ['ICollection', 'DestroyableReadOnlySet']
	},
	List: {
		type: 'class',
		typevars: ['T'],
		super: ['Class', 'IList']
	},
	Map: {
		type: 'class',
		typevars: ['T'],
		super: ['Class', 'IMap']
	},
	Set: {
		type: 'class',
		typevars: ['T'],
		super: ['Class', 'ISet']
	},
	Router: {
		type: 'class',
		typevars: ['T'],
		super: ['Class']
	},
	AbstractRestProvider: {
		type: 'abstract class',
		typevars: ['C']
	},
	HttpRequest: {
		type: 'class',
		typevars: ['T'],
		super: ['AbstractDestroyablePromise']
	},
	AllPromise: {
		type: 'class'
	},
	RacePromise: {
		type: 'class'
	},
	Timeout: {
		type: 'class',
		super: ['AbstractDestroyablePromise']
	},
	Destructor: {
		type: 'class',
		super: ['Destroyable']
	},
	Interval: {
		type: 'class',
		super: ['Destroyable']
	},
	DomInserter: {
		type: 'class',
		super: ['Class']
	},
	DomTemplate: {
		type: 'class',
		super: ['AbstractTemplate']
	},
	HtmlTemplate: {
		type: 'class',
		super: ['AbstractTemplate']
	},
	Reducer: {
		type: 'interface',
		typevars: ['T', 'U']
	},
	AbstractDestroyablePromise: {
		type: 'abstract class',
		typevars: ['T'],
		super: ['Class', 'DestroyablePromise']
	},
	AbstractTemplate: {
		type: 'abstract class'
	},
	IndexCount: {
		type: 'class'
	},
	IndexItems: {
		type: 'class',
		typevars: ['T']
	},
	ListSpliceResult: {
		type: 'class',
		typevars: ['T']
	},
	TemplateOutput: {
		type: 'interface'
	}
};

const fs = require("fs");

const mapping = {};

function linkFile(name) {
	const file = files[name];
	if (!file) {
		throw new Error(`File '${name}' is not defined.`);
	}
	file.name = name;
	file.fullName = name ? ('jwidget/' + name) : 'jwidget';
	if (file.type === 'utils') {
		return;
	}
	if (file.linking) {
		throw new Error('Cyclic dependency is found.');
	}
	if (file.children) {
		return; // already processed
	}
	file.super = file.super || [];
	file.children = [];
	file.depth = 0;
	file.typevars = file.typevars ? '<' + file.typevars.join(', ') + '>' : '';
	if (!file.super) {
		return;
	}
	file.linking = true;
	// file.super = file.super.map((definition) => {
	// 	const matches = /^(\w+)(<[^>]+>)?$/.exec(superDefinition);
	// 	if (!matches) {
	// 		throw new Error(`Superclass definition '${superDefinition}' is invalid`);
	// 	}
	// 	return {
	// 		name: matches[1],
	// 		typevars: matches[2] || ''
	// 	};
	// });
	file.super.forEach((supName) => {
		try {
			linkFile(supName);
		} catch(e) {
			throw new Error(`${name}: ${e.message}`);
		}
		const sup = files[supName];
		sup.children.push(name);
		file.depth = Math.max(file.depth, sup.depth + 1);
	});
	file.super.sort((xdef, ydef) => {
		const
			x = files[xdef],
			y = files[ydef];
		return -cmp(x.depth, y.depth)
	});
	file.linking = false;
}

function linkFiles() {
	for (let name in files) {
		linkFile(name);
	}
}

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
	const descBegin = contents.indexOf("## Description" + lf);
	if (descBegin === -1) {
		console.warn(`Unable to find description in ${name} document`);
		return;
	}
	contents = contents.substr(descBegin);
	contents =
		buildHeader(name, lf) +
		buildIndex(contents, lf) +
		buildConsumption(name, lf) +
		buildHierarchy(name, lf) +
		contents;
	contents = contents.replace(/\[(jwidget\/[^\]]+)\](?:\([^\)]+\))?/g, (a, match) => {
		const notation = match.split(".");
		const file = notation[0];
		const member = notation[1];
		const subtokens = (mapping[file] || file).split("/");
		const index = diff(tokens, subtokens);
		return "[" + match + "](" + repeat("..", tokens.length - index).concat(subtokens.slice(index)).join("/") +
			".md" + (member ? ("#" + member.toLowerCase()) : "") + ")";
	});
	fs.writeFileSync(__dirname + "/" + name + ".md", contents);
}

function getFile(name) {
	if (name === 'index') {
		name = '';
	}
	return files[name] || {type: 'utils'};
}

function getFileInfo(fullName) {
	const subtokens = fullName.split("/")
		name = subtokens.slice(1).join("/"),
		file = getFile(name);
	file.processed = true;
	return {fullName, subtokens, file, name};
}

function buildHeader(fullName, lf) {
	const {subtokens, name, file} = getFileInfo(fullName);
	return "[Back to index](" + repeat("..", subtokens.length - 1, "/") + "/README.md)" + lf + lf +
		'# ' + (file.title || name) + lf + lf;
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
	return groups.map((group) => {
		return "* **" + group.title + "**" + lf +
			group.subtitles.map((subtitle) => "\t* [" + subtitle + "](#" + subtitle.toLowerCase() + ")").join(lf);
	}).join(lf) + lf + lf;
}

function buildConsumption(fullName, lf) {
	let {name, file} = getFileInfo(fullName);
	if (name === 'index') {
		name = 'CoreUtils';
		fullName = 'jwidget';
	}
	return "## Consumption" + lf + lf +
		'\timport ' + (file.type === 'utils' ? `* as ${name}` : name) + ' from "' + fullName + '";' + lf + lf;
}

function buildHierarchy(fullName, lf) {
	const {file} = getFileInfo(fullName);
	if (file.type === 'utils' || file.type === 'function') {
		return '';
	}
	const store = [];
	return '## Hierarchy' + lf + lf +
		buildHierarchyHead(file, file.depth - 1, store, lf) +
		repeat('\t', file.depth, '') + '* ' + file.type + ' **' + fullName + '**' + formatTypeVars(file.typevars) + lf +
		buildHierarchyTail(file, file.depth + 1, store, lf) + lf;
}

function buildHierarchyHead(file, depth, store, lf) {
	return file.super.map((name) => {
		if (store.indexOf(name) !== -1) {
			return '';
		}
		store.push(name);
		const fullName = 'jwidget/' + name,
			supfile = getFile(name);
		return buildHierarchyHead(supfile, depth - 1, store, lf) +
			repeat('\t', depth, '') + '* ' + supfile.type + ' [jwidget/' + name + ']' + formatTypeVars(supfile.typevars) + lf;
	}).join('');
}

function buildHierarchyTail(file, depth, store, lf, roundsLeft) {
	if (roundsLeft == null) {
		roundsLeft = file.tail;
	} else if (file.tail != null) {
		roundsLeft = Math.min(roundsLeft, file.tail);
	}
	if (roundsLeft != null && roundsLeft <= 0) {
		return '';
	}
	return file.children.map((name) => {
		if (store.indexOf(name) !== -1) {
			return '';
		}
		store.push(name);
		const fullName = 'jwidget/' + name,
			subfile = getFile(name);
		return repeat('\t', depth, '') + '* ' + subfile.type + ' [jwidget/' + name + ']' + formatTypeVars(subfile.typevars) + lf +
			buildHierarchyTail(subfile, depth + 1, store, lf, roundsLeft != null ? roundsLeft - 1 : null);
	}).join('');
}

function formatTypeVars(typevars) {
	return typevars ? '`' + typevars + '`' : '';
}

function cmp(x, y) {
	return (x < y) ? -1 : (x > y) ? 1 : 0;
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

function repeat(value, count, separator) {
	const arr = new Array(count);
	while (count > 0) {
		arr[--count] = value;
	}
	return (separator == null) ? arr : arr.join(separator);
}

linkFiles();
walk();

const unprocessed = Object.keys(files).filter((name) => !files[name].processed);
if (unprocessed.length) {
	console.warn('Unprocessed files: ' + unprocessed.join(', '));
}
