import $ from "jquery";
import initExample from "../common/initExample";
import Application from "./Application";

$(() => {
	initExample("bindClass2", ["Application.ts", "Application.jw.html", "Application.styl", "index.ts"]);
	new Application().renderTo("body");
});
