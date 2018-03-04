import initExample from "../common/initExample";
import MyComponent from "./MyComponent";

$(() => {
	initExample("component", ["index.ts", "MyComponent.ts"]);
	new MyComponent("Hello, World!", "javascript:alert('Hello!')").renderTo("body");
});
