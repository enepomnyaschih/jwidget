$(function () {
    $(".doc-index-link").click(function (e) {
        e.preventDefault();
    }).popover({
        content: $(".doc-index-popover").html(),
        html: true,
        trigger: "focus",
        placement: "bottom",
        offset: "0, -5px",
        container: "body",
        fallbackPlacement: []
    });

    var hideInherited = !!localStorage["hideInherited"];
    $("body").toggleClass("doc-hide-inherited", hideInherited);
    $("#navbarShowInherited").prop("checked", !hideInherited).change(function (e) {
        var hideInherited = !e.target.checked;
        localStorage["hideInherited"] = hideInherited ? "1" : "";
        $("body").toggleClass("doc-hide-inherited", hideInherited);
    });
})
