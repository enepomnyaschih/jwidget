$(".dropdown-toggle").click(function (e) {
	var target = $(e.target),
		dropdown = $(target.attr("data-dropdown")),
		visible = dropdown[0].style.display !== "none";
	target.toggleClass("active", !visible);
	dropdown.css("display", visible ? "none" : "");
	if (visible !== dropdown.is(":visible")) {
		e.preventDefault();
	}
});

$(window).mousedown(function (e) {
	if (!$(e.target).closest(".doc-dropdown, .dropdown-toggle.active").length) {
		$(".doc-dropdown").css("display", "none");
		$(".dropdown-toggle").removeClass("active");
	}
});

var hideInherited = !!localStorage["hideInherited"];
$("body").toggleClass("doc-hide-inherited", hideInherited);
$("#navbarShowInherited").prop("checked", !hideInherited).change(function (e) {
	var hideInherited = !e.target.checked;
	localStorage["hideInherited"] = hideInherited ? "1" : "";
	$("body").toggleClass("doc-hide-inherited", hideInherited);
});
