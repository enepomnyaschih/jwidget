$(function () {
    // from https://stackoverflow.com/questions/15989591/how-can-i-keep-bootstrap-popover-alive-while-the-popover-is-being-hovered
    var timeout;
    $(".doc-index-link").popover({
        content: $(".doc-index-popover").html(),
        html: true,
        trigger: "manual",
        placement: function () {
            return "bottom";
        },
        offset: "0, -5px",
        animation: false,
        container: "body",
        fallbackPlacement: []
    }).on("mouseenter", function () {
        var _this = this;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            $(_this).popover("show");
        }, 100);
        $(".popover").css("margin-left", "").on("mouseleave", function () {
            $(_this).popover("hide");
        });
    }).on("mouseleave", function () {
        var _this = this;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
    });

    var hideInherited = !!localStorage["hideInherited"];
    $("body").toggleClass("doc-hide-inherited", hideInherited);
    $("#navbarShowInherited").prop("checked", !hideInherited).change(function (e) {
        var hideInherited = !e.target.checked;
        localStorage["hideInherited"] = hideInherited ? "1" : "";
        $("body").toggleClass("doc-hide-inherited", hideInherited);
    });
})
