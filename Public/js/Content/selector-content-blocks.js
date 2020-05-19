import { Popup, IButton, Menu, IItem }  from "../Tools/group-drop.js"

export { Popup, Menu }

export class ContentButton extends IButton
{
    constructor()
    {
        super();
    }

    render()
    {
        this.layout.addClass("btn-control btn-add-content-block");
        this.layout.append(`<span>Добавить Элемент</span>`);
    }
}

export class ContentItem extends IItem
{
    constructor()
    {
        super();
    }

    render()
    {
        this.layout.attr("id", `btn-add-block-${this.data.title}`);
        this.layout.addClass("group-drop-menu-item-add-content-block");

        this.layout.append(`
            <img src="${this.data.path}">
            <span>${this.data.description}</span>
        `);
    }
}