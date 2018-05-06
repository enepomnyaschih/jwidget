import initExample from "../common/initExample";
import Application from "./Application";

$(() => {
	initExample("router", ["index.ts", "data.ts", "Application.ts", "Compose.ts", "Email.ts", "EmailList.ts", "EmailListItem.ts",
		"EmailNotFound.ts", "EmailView.ts", "Inbox.ts", "NotFound.ts", "Settings.ts"]);

	new Application().renderTo("body");
});
