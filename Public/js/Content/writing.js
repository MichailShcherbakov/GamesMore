import { Editor, Text, Title, Media } from "../Content/PostEditor/editor.js"

import { ContentItem, ContentButton, Popup, Menu } from "./selector-content-blocks.js"
import { CommunityButton, CommunityItem } from "./selector-community.js"

$(document).ready(function()
{
    console.log("Writing...");

    const editor = new Editor($(".page-content-layout"));

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
                url: "/load-draft/",
                method: "post",
                data: { 
                    post:  json,
                    community: communityButton.hash,
                },
                success: data =>
                {
                    const index = JSON.parse(data).index;

                    window.location = `/writing?edit=${index}`;
                }
            }
        );

        console.log("Saved.");
    }

    editor.onContentChanged.add(() => save());

    /*
    editor.onContentChanged.suspend = true;

    editor.add(new Title());
    editor.blocks[0].content.value = { text: "header1", font: "h4" };

    editor.add(new Text());
    editor.blocks[1].content.value = { text: "paragraph1" };
    editor.blocks[1].pinned = true;

    editor.add(new Text());
    editor.blocks[2].content.value = { text: "paragraph2" };
    
    editor.add(new Media());
    editor.blocks[3].content.value = { files: [ { url: "/Public/img/posts/58bab8207f0d45d70693dc0e", substrate: true } ] }
    editor.blocks[3].pinned = true; 


    editor.onContentChanged.suspend = false;*/

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
    });

    $("#btn-save").on("click", () => save());
});