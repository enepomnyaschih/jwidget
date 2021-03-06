import $ from "jquery";
import initExample from "../common/initExample";
import Application from "./Application";
import "./Application.styl";

$(() => {
	initExample("listen", ["Application.ts", "Application.jw.html", "Application.styl", "index.ts"]);

	// Keep output outside of application, to demonstate that
	// event handler is unbound on application destruction.
	$("body").append(
		'<div class="output-box">' +
		'Mouse coordinates: <span class="output"></span>' +
		'<div>'
	);

	new Application().renderTo("body");
});
