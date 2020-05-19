import { IItem } from "../../../Tools/group-drop.js"

export default class SettingsItem extends IItem
{
    constructor()
    {
        super();
    }

    render()
    {
        this.layout.addClass("group-drop-menu-item-settings");
        this.onRendered.emit();
    }
}