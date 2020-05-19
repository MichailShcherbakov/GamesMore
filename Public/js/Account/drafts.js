import { loader } from "../Content/Loader/Loader.js";

$(document).ready(function()
{
    loader.params.layout = ".page-content-layout";
    loader.params.url = "/download-drafts-by-range/";
    loader.run();

    $(document).on("click", ".post-wrapper", function()
    {
        window.location = "/user/draft?id=" + $(this).data("index");
    });
});