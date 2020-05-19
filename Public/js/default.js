$(document).ready(function()
{

    $(document).on("click", ".btn-user-toolbar", function()
    {
        $(".popup-user-toolbar").css("visibility", "visible");
        $(".popup-user-toolbar").focus();

    });

    $(document).on("click", ".popup-user-toolbar-menu-item", function()
    {
        $(".popup-user-toolbar").focusout();
    });

    $(".btn-auth").hover(
    function()
    {
        $(this).children("img").attr("src", "/Public/img/themes/" + $("body").attr("data-theme") +  "/user-blue-x32-hovered.png");
    },
    function()
    {
        $(this).children("img").attr("src", "/Public/img/themes/" + $("body").attr("data-theme") +  "/user-white-x32.png");
    });

    $(document).on("focusout", ".popup-user-toolbar", function()
    {
        $(".popup-user-toolbar").css("visibility", "hidden");
    });

    $(document).on("click", "#btn-logout", function()
    {
        $.ajax(
        {
            url: "/logout/",
            success: function(data)
            {
                console.log(data);
                window.location = "/";
            }
        });
    });

    $(document).on("click", ".header-logo", function()
    {
        window.location = "/";
    });

    $(document).on("click", ".btn-user", function()
	{
		window.location.replace("/user/");
	});

});