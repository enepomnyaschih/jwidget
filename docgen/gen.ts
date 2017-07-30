import * as ts from "typescript";
import * as fs from "fs";
import * as _ from "lodash";

interface Dictionary<T> {
	[key: string]: T;
}

/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(fileNames: string[], options: ts.CompilerOptions): void {
	// Build a program using the set of root file names in fileNames
	let program = ts.createProgram(fileNames, options);

	// Get the checker, we will use it to find more about classes
	let checker = program.getTypeChecker();

	// print out the doc
	fs.writeFileSync("classes.json", JSON.stringify(formatNodes(program.getSourceFiles()), undefined, 4));

	return;

	function mapMap<T, U>(table: ts.Map<T>, callback: (value: T) => U): Dictionary<U> {
		if (!table) {
			return null;
		}
		const result: Dictionary<U> = {};
		table.forEach((value, key) => {
			result[key] = callback(value);
		});
		return result;
	}

	/** visit nodes finding exported classes */
	function formatNodes(nodes: ts.Node[]) {
		return (nodes || []).map(formatAnyNode).filter((node) => node != null);
	}

	function formatAnyNode(node: ts.Node) {
		if (!node) {
			return null;
		}
		switch (node.kind) {
			case ts.SyntaxKind.AbstractKeyword:
			case ts.SyntaxKind.AsyncKeyword:
			case ts.SyntaxKind.ConstKeyword:
			case ts.SyntaxKind.DeclareKeyword:
			case ts.SyntaxKind.DefaultKeyword:
			case ts.SyntaxKind.ExportKeyword:
			case ts.SyntaxKind.PublicKeyword:
			case ts.SyntaxKind.PrivateKeyword:
			case ts.SyntaxKind.ProtectedKeyword:
			case ts.SyntaxKind.ReadonlyKeyword:
			case ts.SyntaxKind.StaticKeyword:
				return formatKeyword(node);
			case ts.SyntaxKind.SourceFile:
				return formatSourceFile(<any>node);
			case ts.SyntaxKind.Decorator:
				return formatDecorator(<any>node);
			case ts.SyntaxKind.InterfaceDeclaration:
				return formatInterfaceDeclaration(<any>node);
			case ts.SyntaxKind.TypeParameter:
				return formatTypeParameter(<any>node);
			case ts.SyntaxKind.HeritageClause:
				return formatHeritageClause(<any>node);
			case ts.SyntaxKind.ExpressionWithTypeArguments:
				return formatExpressionWithTypeArguments(<any>node);
			case ts.SyntaxKind.Identifier:
				return formatIdentifier(<any>node);
			case ts.SyntaxKind.TypeReference:
				return formatTypeReferenceNode(<any>node);
			default:
				return _.extend(formatNode(node), {"...probably": "more"});
		}
	}

	function formatNode(node: ts.Node) {
		if (!node) {
			return null;
		}
		return {
			kind: formatKind(node.kind),
			flags: formatFlags(node.flags, ts.NodeFlags),
			decorators: formatNodes(node.decorators),
			modifiers: formatNodes(node.modifiers)
		};
	}

	function formatKind(kind: ts.SyntaxKind) {
		return ts.SyntaxKind[kind];
	}

	function formatFlags(flags: number, enumm: any) {
		const result = [];
		for (let shift = 1; shift < 31; ++shift) {
			const key = 1 >>> shift;
			if (flags & key) {
				result.push(enumm[key]);
				flags &= ~key;
			}
		}
		return result;
	}

	function formatKeyword(node: ts.Node) {
		return node ? formatKind(node.kind) : null;
	}

	function formatDeclaration(node: ts.Declaration) {
		return formatNode(node);
	}

	function formatSourceFile(node: ts.SourceFile) {
		if (!node || /\.d\.ts$/.test(node.fileName)) {
			return null;
		}
		return _.extend(formatDeclaration(node), {
			fileName: node.fileName,
			statements: formatNodes(node.statements)
		});
	}

	function formatDecorator(node: ts.Decorator) {
		return formatNode(node);
	}

	function formatInterfaceDeclaration(node: ts.InterfaceDeclaration) {
		if (!node) {
			return null;
		}
		const symbol = checker.getSymbolAtLocation(node.name);
		return _.extend(formatNode(node), {
			name: formatIdentifier(node.name),
			doc: ts.displayPartsToString(symbol.getDocumentationComment()),
			typeParameters: formatNodes(node.typeParameters),
			heritageClauses: formatNodes(node.heritageClauses),
			members: formatNodes(node.members)
		});
	}

	function formatIdentifier(identifier: ts.Identifier) {
		if (!identifier) {
			return null;
		}
		return _.extend(formatNode(identifier), {
			text: identifier.text,
			originalKeywordKind: formatKind(identifier.originalKeywordKind),
			isInJSDocNamespace: identifier.isInJSDocNamespace
		});
	}

	function formatTypeParameter(typeParameter: ts.TypeParameter) {
		if (!typeParameter) {
			return null;
		}
		return _.extend(formatType(typeParameter), {
			constraint: formatType(typeParameter.constraint),
			default: formatType(typeParameter.default)
		});
	}

	function formatType(type: ts.Type) {
		if (!type) {
			return null;
		}
		return {
			flags: formatFlags(type.flags, ts.TypeFlags),
			symbol: formatSymbol(type.symbol)
			// more
		};
	}

	function formatSymbol(symbol: ts.Symbol) {
		if (!symbol) {
			return null;
		}
		return {
			flags: formatFlags(symbol.flags, ts.SymbolFlags),
			name: symbol.name,
			//declarations: formatNodes(symbol.declarations),
			valueDeclaration: formatDeclaration(symbol.valueDeclaration),
			members: formatSymbolTable(symbol.members),
			exports: formatSymbolTable(symbol.exports),
			globalExports: formatSymbolTable(symbol.globalExports)
		};
	}

	function formatSymbolTable(symbolTable: ts.SymbolTable) {
		return mapMap(symbolTable, formatSymbol);
	}

	function formatHeritageClause(node: ts.HeritageClause) {
		if (!node) {
			return null;
		}
		return _.extend(formatNode(node), {
			types: formatNodes(node.types)
		});
	}

	function formatExpressionWithTypeArguments(node: ts.ExpressionWithTypeArguments) {
		if (!node) {
			return null;
		}
		return _.extend(formatNode(node), {
			expression: formatAnyNode(node.expression),
			typeArguments: formatNodes(node.typeArguments)
		});
	}

	function formatTypeReference(node: ts.TypeReference) {
		if (!node) {
			return null;
		}
		return _.extend(formatObjectType(node), {
			target: formatGenericType(node.target),
			typeArguments: (node.typeArguments || new Array<ts.Type>()).map(formatType)
		});
	}

	function formatObjectType(node: ts.ObjectType) {
		if (!node) {
			return null;
		}
		return _.extend(formatType(node), {
			objectFlags: formatFlags(node.objectFlags, ts.ObjectFlags)
		});
	}

	function formatGenericType(node: ts.GenericType) {
		if (!node) {
			return null;
		}
		return _.extend(formatInterfaceType(node), formatTypeReference(node));
	}

	function formatInterfaceType(node: ts.InterfaceType) {
		if (!node) {
			return null;
		}
		return _.extend(formatObjectType(node), {
			typeParameters: (node.typeParameters || new Array<ts.TypeParameter>()).map(formatTypeParameter),
			outerTypeParameters: (node.outerTypeParameters || new Array<ts.TypeParameter>()).map(formatTypeParameter),
			localTypeParameters: (node.localTypeParameters || new Array<ts.TypeParameter>()).map(formatTypeParameter),
			thisType: formatTypeParameter(node.thisType)
		});
	}

	function formatTypeReferenceNode(node: ts.TypeReferenceNode) {
		if (!node) {
			return null;
		}
		return _.extend(formatTypeNode(node), {
			typeName: formatAnyNode(node.typeName),
			typeArguments: formatNodes(node.typeArguments)
		});
	}

	function formatTypeNode(node: ts.TypeNode) {
		return formatNode(node);
	}
}

generateDocumentation(process.argv.slice(2), {
	target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
});
