import * as fs from "fs";
import * as path from "path";
import * as DictionaryUtils from "../utils/Dictionary";
import Project from "../Project";
import SourceFile from "../SourceFile";
import {mkdir} from "../utils/File";
import {
	getReferenceUrl,
	getRelativeUrl,
	renderDefinitions,
	renderDictionary,
	renderParams,
	renderText
} from "../utils/Doc";
import SymbolVisitor from "../SymbolVisitor";
import StructSymbol from "../symbols/Struct";
import FunctionSymbol from "../symbols/Function";
import ValueSymbol from "../symbols/Value";
import HeaderSymbol from "../symbols/Header";
import {htmlEncode, repeat} from "../utils/String";
import ISymbol from "../symbols/ISymbol";
import MethodMember from "../members/Method";
import PropertyMember from "../members/Property";
import Constructor from "../Constructor";
import Dictionary from "../Dictionary";
import IMember from "../members/IMember";

export default function bootstrapTemplate(project: Project) {
	for (let fileId in project.files) {
		writeFile(project.files[fileId],
			path.resolve(project.outputAbsolutePath, `${fileId}.html`));
	}
}

function writeFile(file: SourceFile, path: string) {
	console.log(`Writing ${file.id}...`);
	mkdir(path);
	fs.writeFileSync(path, renderFile(file));
}

function renderFile(file: SourceFile) {
	return `<!DOCTYPE html>
<html>
	<head>
		<title>${file.id} - jWidget</title>
		<link rel="stylesheet" type="text/css" href="${getRelativeUrl("bootstrap.min.css", file.id)}">
		<link rel="stylesheet" type="text/css" href="${getRelativeUrl("styles.css", file.id)}">
		<script type="text/javascript" src="${getRelativeUrl("jquery-3.2.1.min.js", file.id)}"></script>
		<script type="text/javascript" src="${getRelativeUrl("bootstrap.bundle.min.js", file.id)}"></script>
	</head>
	<body>
		<nav id="header" class="navbar navbar-expand-lg navbar-dark bg-dark">
			<a class="navbar-brand" href="${getRelativeUrl("", file.id)}">jWidget 2</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<a class="nav-link" href="${getRelativeUrl("", file.id)}">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link disabled" href="${getRelativeUrl("getstarted.html", file.id)}">Get started</a>
					</li>
					<li class="nav-item">
						<a class="nav-link disabled" href="${getRelativeUrl("tutorial.html", file.id)}">Tutorial</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="${getRelativeUrl("doc.html", file.id)}">Documentation <span class="sr-only">(current)</span></a>
					</li>
				</ul>
				<form class="form-inline my-2 my-lg-0">
					<input class="form-control mr-sm-2" disabled type="search" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
		</nav>
		<div id="contents">
			<nav id="sidebar" class="navbar navbar-light bg-light">
				<nav id="index" class="nav nav-pills flex-column">
					<a class="navbar-brand" href="#">${file.id}</a>
					${renderIndex(file)}
					<div class="py-3"></div>
				</nav>
			</nav>
			<div id="main">
				<h1>${file.id}</h1>
				${renderText(file.context, file.description)}
				<h3>Consumption</h3>
				<pre>${renderConsumption(file)}</pre>
				${renderSymbols(file)}
			</div>
		</div>
	</body>
</html>`;
}

function renderIndex(file: SourceFile) {
	return DictionaryUtils.join(DictionaryUtils.map(file.groups, (group, key) => (
		key ? renderIndexGroup(file, group, key) : renderIndexSymbols(file, group)
	)), "\n");
}

function renderIndexGroup(file: SourceFile, group: string[], key: string) {
	return `
<a class="nav-link" href="#${key}">${file.groupTitles[key]}</a>
<nav class="nav nav-pills flex-column">${renderIndexSymbols(file, group)}</nav>`
}

function renderIndexSymbols(file: SourceFile, group: string[]) {
	return group.map((id) => renderIndexSymbol(file, id)).join("\n");
}

function renderIndexSymbol(file: SourceFile, id: string) {
	const symbol = file.symbols[id];
	const url = getReferenceUrl(symbol.selfReference, file.id);
	return `
<a class="nav-link" href="${url}">${renderId(symbol)}</a>
${symbol.visit(symbolIndexRenderVisitor)}`;
}

const symbolIndexRenderVisitor: SymbolVisitor<string> = {

	visitHeader(_symbol: HeaderSymbol): string {
		return "";
	},

	visitValue(_symbol: ValueSymbol): string {
		return "";
	},

	visitFunction(_symbol: FunctionSymbol): string {
		return "";
	},

	visitStruct(symbol: StructSymbol): string {
		return `
<nav class="nav nav-pills flex-column">
<a class="nav-link" href="#${symbol.id}--hierarchy">Hierarchy</a>
<a class="nav-link" href="#${symbol.id}--description">Description</a>
${symbol._constructor ? `<a class="nav-link" href="#${symbol.id}--constructor">Constructor</a>` : ""}
${renderIndexDictionary(symbol, symbol.properties, "properties", "Properties")}
${renderIndexDictionary(symbol, symbol.methods, "methods", "Methods")}
${renderIndexDictionary(symbol, symbol.staticProperties, "static-properties", "Static properties")}
${renderIndexDictionary(symbol, symbol.staticMethods, "static-methods", "Static methods")}
</nav>`
	}
}

function renderIndexDictionary(struct: StructSymbol, dict: Dictionary<IMember>, key: string, title: string): string {
	if (DictionaryUtils.isEmpty(dict)) {
		return "";
	}
	const prefix = struct.id.replace(".", "-");
	return `
<a class="nav-link" href="#${struct.id}---${key}">${title}</a>
<nav class="nav nav-pills flex-column">
${DictionaryUtils.join(DictionaryUtils.map(dict, (member) => (
		`<a class="nav-link" href="#${prefix}--${member.id}${member.isStatic ? "-static" : ""}">${member.id}</a>`
	)), "\n")}
</nav>`;
}

function renderConsumption(file: SourceFile) {
	if (!file.symbols.default) {
		return `import * as ${file.token} from "${file.id}";`;
	}
	const imports = Object.keys(file.symbols).map((key) => key === 'default' ? file.token : `{${key}}`).join(', ');
	return `import ${imports} from "${file.id}";`;
}

function renderSymbols(file: SourceFile) {
	let buffer = "";
	for (let key in file.symbols) {
		if (file.symbols.hasOwnProperty(key)) {
			buffer += file.symbols[key].visit(symbolRenderVisitor);
		}
	}
	return buffer;
}

const symbolRenderVisitor: SymbolVisitor<string> = {

	visitHeader(symbol: HeaderSymbol): string {
		return `<h2>${htmlEncode(symbol.text)}</h2>`;
	},

	visitValue(symbol: ValueSymbol): string {
		return `
<h3>${renderId(symbol)}</h3>
<pre>${symbol.objectName}: ${renderText(symbol.context, symbol.type)}</pre>
${renderText(symbol.context, symbol.description)}`;
	},

	visitFunction(symbol: FunctionSymbol): string {
		return `
<h3>${renderId(symbol)}</h3>
<pre>${renderText(symbol.context, symbol.signature)}</pre>
${renderParams(symbol.context, symbol.params, symbol.returns)}
${renderText(symbol.context, symbol.description)}`;
	},

	visitStruct(symbol: StructSymbol): string {
		const cache: StructSymbol[] = [];
		return `
<h3>${renderId(symbol)}</h3>
<h4>Hierarchy</h4>
<ul class="hierarchy">
${renderHierarchyHead(symbol, symbol.inheritanceLevel - 1, cache)}
<li>${repeat("\t", symbol.inheritanceLevel, "")}${symbol.kind} <b>${symbol.objectName}</b>${renderTypeVars(symbol)}</li>
${renderHierarchyTail(symbol, symbol.inheritanceLevel + 1, cache)}
</ul>
<h4>Description</h4>
${renderDefinitions(symbol.context, symbol.typevars)}
${renderText(symbol.context, symbol.description)}
${renderConstructor(symbol._constructor)}
${renderDictionary(symbol.properties, "<h4>Properties</h4>", (property) => renderProperty(property))}
${renderDictionary(symbol.methods, "<h4>Methods</h4>", (method) => renderMethod(method))}
${renderDictionary(symbol.staticProperties, "<h4>Static properties</h4>", (property) => renderProperty(property))}
${renderDictionary(symbol.staticMethods, "<h4>Static methods</h4>", (method) => renderMethod(method))}`
	}
}

function renderId(symbol: ISymbol) {
	return (symbol.id === "default") ? "Default export" : symbol.id;
}

function renderHierarchyHead(struct: StructSymbol, level: number, cache: StructSymbol[]): string {
	return struct.extending.map((extension) => {
		const extendedStruct = struct.project.getStructByExtension(extension);
		if (cache.indexOf(extendedStruct) !== -1) {
			return "";
		}
		cache.push(extendedStruct);
		const url = getReferenceUrl(extendedStruct.selfReference, struct.file.id);
		return `
${renderHierarchyHead(extendedStruct, level - 1, cache)}
<li>${repeat("\t", level, "")}${extendedStruct.kind} <a href="${url}">${extendedStruct.objectName}</a>${renderTypeVars(extendedStruct)}</li>`;
	}).join("");
}

function renderHierarchyTail(struct: StructSymbol, level: number, cache: StructSymbol[], levelsLeft?: number): string {
	if (levelsLeft == null) {
		levelsLeft = struct.showInheritanceLevels;
	} else if (struct.showInheritanceLevels != null) {
		levelsLeft = Math.min(levelsLeft, struct.showInheritanceLevels);
	}
	if (levelsLeft != null && levelsLeft <= 0) {
		return "";
	}
	return struct.extendedBy.map((extendingStruct) => {
		if (cache.indexOf(extendingStruct) !== -1) {
			return "";
		}
		cache.push(extendingStruct);
		const url = getReferenceUrl(extendingStruct.selfReference, struct.file.id);
		return `
<li>${repeat("\t", level, "")}${extendingStruct.kind} <a href="${url}">${extendingStruct.objectName}</a>${renderTypeVars(extendingStruct)}</li>
${renderHierarchyTail(extendingStruct, level + 1, cache, levelsLeft != null ? levelsLeft - 1 : null)}`;
	}).join("");
}

function renderTypeVars(struct: StructSymbol) {
	if (DictionaryUtils.isEmpty(struct.typevars)) {
		return "";
	}
	return `<span class="monospace">&lt;${Object.keys(struct.typevars).join(", ")}&gt;</span>`;
}

function renderConstructor(constr: Constructor) {
	if (!constr) {
		return "";
	}
	return `
<h4>Constructor</h4>
<pre>new ${constr.struct.objectName}${renderTypeVars(constr.struct)}${renderText(constr.context, constr.signature)}</pre>
${renderDefinitions(constr.context, constr.params)}
${renderText(constr.context, constr.description)}`;
}

function renderProperty(property: PropertyMember) {
	return `
<li>
<h5>${property.id}</h5>
<pre>${property.modifiers ? property.modifiers + " " : ""}${property.id}: ${renderText(property.context, property.type)}</pre>
${renderText(property.context, property.description)}
</li>`;
}

function renderMethod(method: MethodMember) {
	return `
<li>
<h5>${method.id}</h5>
<pre>${method.modifiers ? method.modifiers + " " : ""}${renderText(method.context, method.signature)}</pre>
${renderParams(method.context, method.params, method.returns)}
${renderText(method.context, method.description)}
</li>`;
}
