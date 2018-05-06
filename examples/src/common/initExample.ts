export default function initExample(name: string, links: string[]) {
	const el = $('<div style="float: right; width: 600px"><b>Source:</b> </div>');
	let first = true;
	links.forEach((link) => {
		if (first) {
			first = false;
		} else {
			el.append(', ');
		}
		el.append($('<a target="_blank"></a>').text(link).attr("href", `../src/${name}/${link}`));
	});
	$("body").prepend('<hr>').prepend('<div style="clear: both"></div>').prepend('<div><b>Example</b></div>').prepend(el);
}
