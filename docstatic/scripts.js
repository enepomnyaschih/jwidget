$(function () {
    // from https://stackoverflow.com/questions/15989591/how-can-i-keep-bootstrap-popover-alive-while-the-popover-is-being-hovered
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
        $(this).popover("show");
        $(".popover").css("margin-left", "").on("mouseleave", function () {
            $(_this).popover("hide");
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
    });
})
