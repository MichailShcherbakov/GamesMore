import { Popup, IButton, Menu, IItem } from "../Tools/group-drop.js"

export { Popup, Menu }

export class CommunityButton extends IButton
{
    constructor()
    {
        super();
    }

    render()
    {
        const theme = $("body").attr("data-theme");

        this.layout.addClass("group-drop-button-selector-community");

        this.layout.append(`
            <div class="icon-selector-item icon-selector-item--empty"><img src=""/></div>
            <span class="title-selector-item">Выберете</span>
            <img class="ind-selector-item" src="/Public/img/themes/${theme}/down-arrow-x32.png"/>
        `);
    }

    changeView(hash, title, src)
    {
        const theme = $("body").attr("data-theme");

        this.layout.empty();
        this.layout.attr("data-hash", hash);
        this.layout.append(`

                <img class="icon-selector-item" src="${src}"/>
                <span class="title-selector-item">${title}</span>
                <img class="ind-selector-item" src="/Public/img/themes/${theme}/down-arrow-x32.png"/>
        `);
    }

    get hash()
    {
        if (!this.layout)
            return;

        return this.layout.attr("data-hash");
    }
}

export class CommunityItem extends IItem
{
    constructor()
    {
        super();
    }

    render()
    {
        this.layout.attr("data-hash", this.data.hash);
        this.layout.addClass("group-drop-menu-item-selector-community");

        this.layout.append(`
            <img class="icon-selector-item" src="/Public/img/avatars/${this.data.src}"/>
            <span class="title-selector-item">${this.data.name}</span>
        `)
    }

    get hash()
    {
        return this.layout.attr("data-hash");
    }

    get src()
    {
        return this.layout.find(".icon-selector-item").attr("src");
    }

    get title()
    {
        return this.layout.find(".title-selector-item").text();
    }

    set active(value)
    {
        if (value)
            this.layout.addClass("group-drop-menu-item--active");
        else
            this.layout.removeClass("group-drop-menu-item--active");
    }

    get active()
    {
        return this.layout.hasClass("group-drop-menu-item--active");
    }
}