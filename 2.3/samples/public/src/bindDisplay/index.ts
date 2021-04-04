import $ from "jquery";
import initExample from "../common/initExample";
import Application from "./Application";
import "./Application.styl";

$(() => {
	initExample("bindDisplay", ["Application.ts", "Application.jw.html", "Application.styl", "index.ts"]);
	new Application().renderTo("body");
});
