import * as fs from "fs";
import * as path from "path";
import Constructor from "../Constructor";
import Dictionary from "../Dictionary";
import MethodMember from "../members/Method";
import PropertyMember from "../members/Property";
import Project from "../Project";
import SourceFile from "../SourceFile";
import FunctionSymbol from "../symbols/Function";
import HeaderSymbol from "../symbols/Header";
import ISymbol from "../symbols/ISymbol";
import StructSymbol from "../symbols/Struct";
import ValueSymbol from "../symbols/Value";
import SymbolVisitor from "../SymbolVisitor";
import * as DictionaryUtils from "../utils/Dictionary";
import {getReferenceUrl, getRelativeUrl, renderDefinitions, renderParams, renderText} from "../utils/Doc";
import {mkdir} from "../utils/File";
import {htmlEncode, repeat} from "../utils/String";

export default function defaultTemplate(project: Project) {
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
		<link rel="stylesheet" type="text/css" href="${getRelativeUrl("styles.css", file.id)}">
	</head>
	<body>
		<a href="${file.tokens.map(() => '..').join('/')}">Back to index</a>
		<h1>${file.id}</h1>
		${renderText(file.context, file.description)}
		<h3>Consumption</h3>
		<pre>${renderConsumption(file)}</pre>
		${renderSymbols(file)}
	</body>
</html>`;
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
		return `
<h2>${htmlEncode(symbol.header)}</h2>
${renderText(symbol.context, symbol.description)}`;
	},

	visitValue(symbol: ValueSymbol): string {
		return `
${renderId(symbol)}
<pre>${symbol.objectName}: ${renderText(symbol.context, symbol.type)}</pre>
${renderText(symbol.context, symbol.description)}`;
	},

	visitFunction(symbol: FunctionSymbol): string {
		return `
${renderId(symbol)}
<pre>${renderText(symbol.context, symbol.signature)}</pre>
${renderParams(symbol.context, symbol.params, symbol.returns)}
${renderText(symbol.context, symbol.description)}`;
	},

	visitStruct(symbol: StructSymbol): string {
		const cache: StructSymbol[] = [];
		return `
${renderId(symbol)}
<h4>Hierarchy</h4>
<ul class="hierarchy">
${renderHierarchyHead(symbol, symbol.inheritanceLevel - 1, cache)}
<li>${repeat("\t", symbol.inheritanceLevel, "")}${symbol.kind} <b>${symbol.objectName}</b>${renderTypeVars(symbol)}</li>
${renderHierarchyTail(symbol, symbol.inheritanceLevel + 1, cache)}
</ul>
<h4>Description</h4>` +
			//${renderDefinitions(symbol.context, symbol.typevars)}
			`${renderText(symbol.context, symbol.description)}
${renderConstructor(symbol._constructor)}
${renderDictionary(symbol.properties, "<h4>Properties</h4>", (property) => renderProperty(property))}
${renderDictionary(symbol.methods, "<h4>Methods</h4>", (method) => renderMethod(method))}
${renderDictionary(symbol.staticProperties, "<h4>Static properties</h4>", (property) => renderProperty(property))}
${renderDictionary(symbol.staticMethods, "<h4>Static methods</h4>", (method) => renderMethod(method))}`
	}
}

function renderId(symbol: ISymbol) {
	return `<h3>${symbol.id === "default" ? "Default export" : symbol.id}</h3>`;
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
<pre>${property.modifiers ? property.modifiers + " " : ""}${property.id}${property.optional ? "?" : ""}: ${renderText(property.context, htmlEncode(property.type))}</pre>
${renderText(property.context, property.description)}
</li>`;
}

function renderMethod(method: MethodMember) {
	return `
<li>
<h5>${method.id}</h5>
<pre>${method.modifiers ? method.modifiers + " " : ""}${renderText(method.context, htmlEncode(method.signature))}</pre>
${renderParams(method.context, method.params, method.returns)}
${renderText(method.context, method.description)}
</li>`;
}

export function renderDictionary<T>(dict: Dictionary<T>, title: string,
									renderer: (obj: T, key: string) => string) {
	if (DictionaryUtils.isEmpty(dict)) {
		return "";
	}
	const strDict = DictionaryUtils.map(dict, renderer);
	return `
${title}
<ul>
${DictionaryUtils.join(strDict, "\n")}
</ul>`
}
