import { IItem } from "../../../Tools/group-drop.js"

export default class SeparatorItem extends IItem
{
    constructor()
    {
        super();
    }

    render()
    {
        this.layout.addClass("separator");
        this.onRendered.emit();
    }
}