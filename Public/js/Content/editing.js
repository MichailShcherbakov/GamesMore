import { Editor, Text, Title, Media } from "../Content/PostEditor/editor.js"

import { ContentItem, ContentButton, Popup, Menu } from "./selector-content-blocks.js"
import { CommunityButton, CommunityItem } from "./selector-community.js"

function getUrlParam(parameterName) 
{
    let result = null;
    let tmp = [];

    location.search
        .substr(1)
        .split("&")
        .forEach((item) => 
        {
            tmp = item.split("=");
            if (tmp[0] === parameterName) 
                result = decodeURIComponent(tmp[1]);
        });

    return result;
}

$(document).ready(function()
{
    console.log("Editing...");

    const p = new Promise((resolve, reject) =>
    {
        $.ajax(
            {
                url: "download-draft-by-index",
                method: "post", 
                data: { "id" :  Number(getUrlParam("edit")) },
                success: json =>
                {
                    const j = JSON.parse(json);

                    if (j.length == 0)
                    {
                        console.error("404 error!");
                        return;
                    }
        
                    const post = JSON.parse(j.Content);
                    $("#main-block-title").val(post.title);
                    resolve({ editor: Editor.parse(post.content, $(".page-content-layout")), json: j });
                }
            }
        );

    }).then(data => init(data));
});

function init(data)
{
    const editor = data.editor;
    const json = data.json;
    
    const save = () =>
    {
        console.log("Saving...");

        const json = editor.toJson();
    
        if (!communityButton.hash)
        {
            console.error("The community wasn't not chosen!");
            return;
        }

        if (JSON.parse(json).length == 0)
        {
            console.error("The content is empty!");
            return;
        }

        $.ajax(
            {
                url: "/update-post/",
                method: "post",
                data: { 
                    post: JSON.stringify({ title: $("#main-block-title").val(), content: json }, null, 0),
                    community: communityButton.hash,
                    postIndex: Number(getUrlParam("edit")),
                },
                success: data =>
                {
                    if (data != "")
                        console.log(data)
                }
            }
        );

        console.log("Saved.");
    }

    editor.onContentChanged.add(() => save());

    const theme = $("body").attr("data-theme");

    const contentButton = new ContentButton();

    const contentMenu = new Menu();
    contentMenu.onLayoutChanged.add(() => 
    {
        contentMenu.layout.addClass("group-drop-menu-add-content-block");
        contentMenu.direction = "group-drop-menu--top-right";
        contentMenu.marginTop = "0px";
        contentMenu.marginRight = "-" + (parseFloat(contentMenu.layout.css("width")) + 10) + "px";
    });

    const buttons = 
    { 
        "text": 
        {
            description: "Текст", 
            path: `/Public/img/themes/${theme}/text-block-x24.png`,
            func: () => editor.add(new Text()),
        },
        "title":
        {
            description: "Заголовок", 
            path: `/Public/img/themes/${theme}/letter-h-x24.png`,
            func: () => editor.add(new Title()),
        }, 
        "media":
        {
            description: "Фото и видео", 
            path: `/Public/img/themes/${theme}/image-x24.png`,
            func: () => editor.add(new Media()),
        },
    }

    for (let title in buttons)
    {
        let elem = buttons[title];

        const menuItem = new ContentItem();
        menuItem.data = { title: title, description: elem.description, path: elem.path };
        menuItem.onClick.add(elem.func);

        contentMenu.add(menuItem);
    };

    const contentPopup = new Popup($(".page-content-footer"), contentButton, contentMenu); 
    contentPopup.create();

    const communityButton = new CommunityButton();

    const communityMenu = new Menu();
    communityMenu.onLayoutChanged.add(() => 
    {
        communityMenu.layout.addClass("group-drop-menu-selector-community");
        communityMenu.direction = "group-drop-menu--top-left";
        communityMenu.marginTop = "40px";
        communityMenu.marginLeft = "-10px";
    });

    const communityPopup = new Popup($(".page-toolbar-info-writing"), communityButton, communityMenu); 
    communityPopup.create();
    
    const p = new Promise((resolve, reject) =>
    {
        $.ajax(
            {
                url: "/download-communities/",
                method: "post",
                success: data => resolve(JSON.parse(data))
            }
        );
    })
    
    const p2 = new Promise((resolve, reject) =>
    {
        $.ajax(
            {
                url: "/download-info-current-user/",
                method: "post",
                success: data => resolve(JSON.parse(data))
            }
        );
    })

    Promise.all([p, p2]).then(data =>
    {
        let communities = data[0];
        let user = data[1];

        const maker = (hash, name, avatar) =>
        {
            const menuItem = new CommunityItem();
            menuItem.data = { hash: hash, name: name, src: avatar };

            menuItem.onClick.add(() =>
            {
                communityButton.changeView(menuItem.hash, menuItem.title, menuItem.src);

                communityMenu.layout.find(".group-drop-menu-item--active").removeClass("group-drop-menu-item--active");
                menuItem.active = true;
            });

            communityMenu.add(menuItem);
        }

        maker(user["Hash"], user["Username"], user["Avatar"]);

        communities.forEach((item) => 
        {
            maker(item["Hash"], item["Title"], item["Avatar"]);
        });

        for (let i = 0; i < communityMenu.count; ++i)
        {
            if (communityMenu.at(i).data.hash == json.CommunityHash)
            {
                console.log("Detected community...")

                communityMenu.at(i).onClick.emit();
            }
        }
    });

    $("#btn-save").on("click", () => save());
}