export default function initExample(name: string, links: string[]) {
	const header = $('<div><b>Example</b></div>');
	const el = $('<div style="float: right"><b>Source:</b> </div>');
	let first = true;
	links.forEach((link) => {
		if (first) {
			first = false;
		} else {
			el.append(', ');
		}
		el.append($('<a target="_blank"></a>').text(name).attr("href", `../src/${name}/${link}`));
	});
	$("body").prepend('<hr>').prepend(header).prepend(el);
}
