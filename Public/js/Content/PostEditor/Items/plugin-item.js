import { IItem } from "../../../Tools/group-drop.js"

export default class PluginItem extends IItem
{
    constructor()
    {
        super();
    }

    render()
    {
        this.onRendered.emit();
    }
}