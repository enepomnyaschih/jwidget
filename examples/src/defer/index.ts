import "es6-promise/auto";
import "script-loader!jquery";

import initExample from "../common/initExample";
import Application from "./Application";

$(() => {
	initExample("defer", ["DelayedGreeter.ts", "Application.ts", "Application.jw.html", "index.ts"]);
	new Application().renderTo("body");
});
