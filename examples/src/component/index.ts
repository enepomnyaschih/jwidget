import "es6-promise/auto";
import "script-loader!jquery";

import initExample from "../common/initExample";
import MyComponent from "./MyComponent";

$(() => {
	initExample("component", ["MyComponent.ts", "MyComponent.jw.html", "index.ts"]);
	new MyComponent("Hello, World!", "javascript:alert('Hello!')").renderTo("body");
});
