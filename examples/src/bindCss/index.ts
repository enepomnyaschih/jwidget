import "es6-promise/auto";
import "script-loader!jquery";

import initExample from "../common/initExample";
import Application from "./Application";
import "./Application.styl";

$(() => {
	initExample("bindCss", ["Application.ts", "Application.jw.html", "Application.styl", "index.ts"]);
	new Application().renderTo("body");
});
