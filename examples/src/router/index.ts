import $ from "jquery";
import initExample from "../common/initExample";
import Application from "./Application";

$(() => {
	initExample("router", ["index.ts", "data.ts", "Application.ts", "Application.jw.html", "Compose.ts",
		"Email.ts", "EmailList.ts", "EmailListItem.ts", "EmailNotFound.ts", "EmailNotFound.jw.html", "EmailView.ts",
		"EmailView.jw.html", "Inbox.ts", "Inbox.jw.html", "NotFound.ts", "Settings.ts"]);

	new Application().renderTo("body");
});
