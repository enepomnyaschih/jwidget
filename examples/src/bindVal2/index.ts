import $ from "jquery";
import initExample from "../common/initExample";
import Application from "./Application";

$(() => {
	initExample("bindVal2", ["Application.ts", "Application.jw.html", "index.ts"]);
	new Application().renderTo("body");
});
