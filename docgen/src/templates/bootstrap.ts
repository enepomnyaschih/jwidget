import * as fs from "fs";
import * as path from "path";
import Constructor from "../Constructor";
import Dictionary from "../Dictionary";
import IMember from "../members/IMember";
import MethodMember from "../members/Method";
import PropertyMember from "../members/Property";
import Project from "../Project";
import SourceFile from "../SourceFile";
import FunctionSymbol from "../symbols/Function";
import HeaderSymbol from "../symbols/Header";
import ISymbol from "../symbols/ISymbol";
import StructSymbol, {TypeVar} from "../symbols/Struct";
import ValueSymbol from "../symbols/Value";
import SymbolVisitor from "../SymbolVisitor";
import * as DictionaryUtils from "../utils/Dictionary";
import {
	getReferenceUrl,
	getRelativeUrl,
	renderDefinitions,
	renderParams,
	renderReference,
	renderStructReference,
	renderText
} from "../utils/Doc";
import {mkdir} from "../utils/File";
import {htmlEncode} from "../utils/String";
import Topic from "../Topic";

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
		<title>${file.id}${file.project.name ? " - " + file.project.name : ""}</title>
		<link rel="stylesheet" type="text/css" href="${getRelativeUrl("bootstrap.min.css", file.id)}">
		<link rel="stylesheet" type="text/css" href="${getRelativeUrl("styles.css", file.id)}">
	</head>
	<body>
		<nav class="doc-header navbar navbar-expand-lg navbar-dark bg-dark">
			${file.project.name ? `<a class="navbar-brand" href="${getRelativeUrl("", file.id)}">${file.project.name}</a>` : ""}
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
						<a class="doc-index-link nav-link dropdown-toggle" href="${getRelativeUrl("doc.html", file.id)}"
							tabindex="0">Documentation <span class="sr-only">(current)</span></a>
					</li>
				</ul>
				<form class="form-inline my-2 my-lg-0">
					<div class="form-check text-light mr-2">
						<input class="form-check-input" type="checkbox" id="navbarShowInherited">
						<label class="form-check-label" for="navbarShowInherited">Expand inherited members</label>
					</div>
					<input class="form-control mr-sm-2" disabled type="search" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
		</nav>
		<div class="doc-contents">
			<nav class="doc-sidebar navbar navbar-light bg-light">
				<nav class="doc-index nav nav-pills flex-column">
					<a class="navbar-brand" href="#">${file.id}</a>
					${renderIndex(file)}
					<div class="py-3"></div>
				</nav>
			</nav>
			<div class="doc-main">
				<div class="container-fluid">
					<h1>${file.description ? "" : '<span id="default"></span>'}${file.id}</h1>
					${renderText(file.context, file.description)}
					<h3>Consumption</h3>
					<pre>${renderConsumption(file)}</pre>
					${renderSymbols(file)}
				</div>
			</div>
		</div>
		<div class="doc-index-popover">${renderText(file.context, "%%DocumentationIndex")}</div>
		<script type="text/javascript" src="${getRelativeUrl("jquery-3.2.1.min.js", file.id)}"></script>
		<script type="text/javascript" src="${getRelativeUrl("bootstrap.bundle.min.js", file.id)}"></script>
		<script type="text/javascript" src="${getRelativeUrl("scripts.js", file.id)}"></script>
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

	visitFunction(symbol: FunctionSymbol): string {
		return renderTopicIndex(symbol.topics);
	},

	visitStruct(symbol: StructSymbol): string {
		return `
<nav class="nav nav-pills flex-column">
${symbol.simple ? "" : `<a class="nav-link" href="#${symbol.hash}---hierarchy">Hierarchy</a>`}
${symbol.simple ? "" : `<a class="nav-link" href="#${symbol.hash}---description">Description</a>`}
${symbol.simple ? "" : renderTopicIndex(symbol.topics)}
${symbol._constructor ? `<a class="nav-link" href="#${symbol.hash}---constructor">Constructor</a>` : ""}
${renderIndexDictionary(symbol, symbol.properties, "properties", "Properties")}
${renderIndexDictionary(symbol, symbol.methods, "methods", "Methods")}
${renderIndexDictionary(symbol, symbol.staticProperties, "staticProperties", "Static properties")}
${renderIndexDictionary(symbol, symbol.staticMethods, "staticMethods", "Static methods")}
</nav>`
	}
}

function renderIndexDictionary(struct: StructSymbol, dict: Dictionary<IMember>, key: string, title: string): string {
	if (DictionaryUtils.isEmpty(dict)) {
		return "";
	}
	const members = DictionaryUtils.join(DictionaryUtils.map(dict, renderIndexMember), "\n");
	return struct.simple ? members : `
<a class="nav-link" href="#${struct.hash}---${key}">${title}</a>
<nav class="nav nav-pills flex-column">${members}</nav>`;
}

function renderIndexMember(member: IMember) {
	return `<a class="nav-link${member.isInherited ? " font-italic" : ""}" href="#${member.hash}">${member.id}</a>`;
}

function renderTopicIndex(topics: Dictionary<Topic>) {
	return DictionaryUtils.isEmpty(topics) ? "" : '<nav class="nav nav-pills flex-column">' +
		DictionaryUtils.join(DictionaryUtils.map(topics, (topic, key) => (
			`<a class="nav-link" href="#${key}">${topic.header}</a>`
		)), "\n") +
		'</nav>';
}

function renderConsumption(file: SourceFile) {
	if (!file.symbols.default) {
		return `import * as ${file.token} from "${file.id}";`;
	}
	const imports = Object.keys(file.symbols).filter(key => key !== 'default' && key.indexOf('.') === -1);
	return `import ${file.symbols.default.objectName}${imports.length ? ', {' + imports.join(', ') + '}' : ''} from "${file.id}";`;
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
${renderHeader("h2", symbol.hash, htmlEncode(symbol.header))}
${renderText(symbol.context, symbol.description)}`;
	},

	visitValue(symbol: ValueSymbol): string {
		return `
${renderHeader("h3", symbol.hash, renderId(symbol))}
<div class="doc-section">
<p><code>${symbol.objectName}: ${renderText(symbol.context, symbol.type)}</code></p>
${renderText(symbol.context, symbol.description)}
</div>`;
	},

	visitFunction(symbol: FunctionSymbol): string {
		return `
${renderHeader("h3", symbol.hash, renderId(symbol))}
<div class="doc-section">
<p><code>${renderText(symbol.context, symbol.signature)}</code></p>
${renderParams(symbol.context, symbol.params, symbol.returns)}
${renderText(symbol.context, symbol.description)}
${renderTopics(symbol.topics)}
</div>`;
	},

	visitStruct(symbol: StructSymbol): string {
		return `
${renderHeader("h3", symbol.hash, renderId(symbol))}
<div class="doc-section">
${symbol.simple ? "" : renderHierarchy(symbol)}
${symbol.simple ? "" : renderHeader("h4", `${symbol.hash}---description`, "Description")}
${renderTypeVarDefinitions(symbol)}
${renderText(symbol.context, symbol.description)}
${renderTopics(symbol.topics)}
${renderConstructor(symbol._constructor)}
${renderMembers(symbol, symbol.properties, "properties", "Fields", renderProperty)}
${renderMembers(symbol, symbol.methods, "methods", "Methods", renderMethod)}
${renderMembers(symbol, symbol.staticProperties, "staticProperties", "Static fields", renderProperty)}
${renderMembers(symbol, symbol.staticMethods, "staticMethods", "Static methods", renderMethod)}
</div>`
	}
};

function renderId(symbol: ISymbol) {
	return (symbol.id === "default") ? "Default export" : symbol.id;
}

function renderHierarchy(struct: StructSymbol) {
	if (struct.simple) {
		return "";
	}
	const cache: StructSymbol[] = [];
	return `
${renderHeader("h4", `${struct.hash}---hierarchy`, "Hierarchy")}
<ul class="doc-hierarchy">
${renderHierarchyHead(struct, struct.inheritanceLevel - 1, cache)}
<li>${renderTab(struct.inheritanceLevel)}${struct.kind} <b>${struct.objectName}</b>${renderTypeVarsWithExtensions(struct)}</li>
${renderHierarchyTail(struct, struct.inheritanceLevel + 1, cache)}
</ul>`
}

function renderHierarchyHead(struct: StructSymbol, level: number, cache: StructSymbol[]): string {
	return struct.extending.map((extension) => {
		const extendedStruct = struct.project.getStructByExtension(extension);
		if (cache.indexOf(extendedStruct) !== -1) {
			return "";
		}
		cache.push(extendedStruct);
		return `
${renderHierarchyHead(extendedStruct, level - 1, cache)}
<li>${renderTab(level)}${extendedStruct.kind} ${renderStructReference(extendedStruct, struct.file.id)}${renderTypeVars(extendedStruct)}</li>`;
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
		return `
<li>${renderTab(level)}${extendingStruct.kind} ${renderStructReference(extendingStruct, struct.file.id)}${renderTypeVars(extendingStruct)}</li>
${renderHierarchyTail(extendingStruct, level + 1, cache, levelsLeft != null ? levelsLeft - 1 : null)}`;
	}).join("");
}

function renderTypeVars(struct: StructSymbol) {
	if (DictionaryUtils.isEmpty(struct.typevars)) {
		return "";
	}
	return `<span class="monospace">&lt;${Object.keys(struct.typevars).join(", ")}&gt;</span>`;
}

function renderTypeVarsWithExtensions(struct: StructSymbol) {
	if (DictionaryUtils.isEmpty(struct.typevars)) {
		return "";
	}
	return `<span class="monospace">&lt;${DictionaryUtils.join(DictionaryUtils.map(struct.typevars, (typevar, key) => (
		key + (typevar.extends.length ? ` ${renderTypeVarExtensions(struct, typevar)}` : "")
	)), ", ")}&gt;</span>`;
}

function renderTypeVarDefinitions(struct: StructSymbol): string {
	return renderDefinitions(struct.context, DictionaryUtils.map(struct.typevars, typevar => (
		(typevar.extends.length ? `(${renderTypeVarExtensions(struct, typevar)}) ` : "") + typevar.description
	)));
}

function renderTypeVarExtensions(struct: StructSymbol, typevar: TypeVar) {
	return `extends ${typevar.extends.map(extension => (
		renderStructReference(struct.project.getStructByExtension({
			file: extension.file,
			symbol: extension.symbol
		}), struct.file.id)
	)).join(" & ")}`;
}

function renderTopics(topics: Dictionary<Topic>): string {
	return DictionaryUtils.join(DictionaryUtils.map(topics, (topic, key) => `
		${renderHeader("h5", key, topic.header)}
		${renderText(topic.context, topic.text)}
	`), "\n");
}

function renderConstructor(constr: Constructor) {
	if (!constr) {
		return "";
	}
	return `
${renderHeader("h4", `${constr.struct.hash}---constructor`, "Constructor")}
<p><code>new ${constr.struct.objectName}${renderTypeVars(constr.struct)}${renderText(constr.context, constr.signature)}</code></p>
${renderDefinitions(constr.context, constr.params)}
${renderText(constr.context, constr.description)}`;
}

function renderMembers<T extends IMember>(struct: StructSymbol, members: Dictionary<T>, key: string, title: string,
                                          renderer: (member: T) => string) {
	if (DictionaryUtils.isEmpty(members)) {
		return "";
	}
	const strDict = DictionaryUtils.map(members, renderer);
	return `
${struct.simple ? "" : `${renderHeader("h4", `${struct.hash}---${key}`, title)}`}
${DictionaryUtils.join(strDict, "\n")}`;
}

function renderProperty(property: PropertyMember) {
	return `
${renderMemberHeader(property)}
<div class="doc-member${property.isInherited ? " doc-inherited" : ""}">
<p><code>${property.modifiers ? property.modifiers + " " : ""}${property.id}${property.optional ? "?" : ""}: ${renderText(property.context, htmlEncode(property.type))}</code></p>
${renderText(property.context, property.description)}
</div>`;
}

function renderMethod(method: MethodMember) {
	return `
${renderMemberHeader(method)}
<div class="doc-member${method.isInherited ? " doc-inherited" : ""}">
<p><code>${method.modifiers ? method.modifiers + " " : ""}${renderText(method.context, htmlEncode(method.signature))}</code></p>
${renderParams(method.context, method.params, method.returns)}
${renderText(method.context, method.description)}
</div>`;
}

function renderMemberHeader(member: IMember) {
	const text = !member.isInherited ? member.id :
		`<i>${member.id}</i> <span class="doc-inherit-mark">(inherited from ${renderReference(member.inheritedFrom.selfReference, member.file.id)})</span>`;
	return renderHeader("h5", member.hash, text);
}

function renderHeader(tag: string, id: string, title: string) {
	return `<${tag}><span id="${id}"></span>${title}<a class="anchorjs-link" href="#${id}" aria-label="Anchor" style="padding-left: 0.375em;">#</a></${tag}>`;
}

function renderTab(level: number) {
	return `<span style="margin-left: ${2 * level}em"></span>`;
}
