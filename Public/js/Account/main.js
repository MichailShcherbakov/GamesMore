

$(document).ready(function()
{

    
    /*$(document).on("click", ".tab-layout", function() 
    {
        if ($(this).hasClass("tab-is-active"))
            return;

        $(".tab-layout").each(function()
        {
            if ($(this).hasClass("tab-is-active"))
            {
                $(this).removeClass("tab-is-active");
            }
        });

        $(this).addClass("tab-is-active");
    });*/


    $(document).on("click", "#tab-posts", function() 
    {
        window.location = "/user/";
    });

    $(document).on("click", "#tab-drafts", function() 
    {
        window.location = "/user/drafts/";
    });
    
    $(document).on("click", ".btn-settings", function()
    {
        window.location = "/user/settings/"
    });

    $(document).on("click", ".btn-dark-mode", function()
    {
        if ($("body").attr("data-theme") == "dark")
        {
            $("body").attr("data-theme", "white");
            document.cookie = "theme=white; path=/; max-age=" + (60*60*24*365*60);
        }
        else
        {
           $("body").attr("data-theme", "dark");
           document.cookie = "theme=dark; path=/; max-age=" + (60*60*24*365*60);
        }
    });

});

