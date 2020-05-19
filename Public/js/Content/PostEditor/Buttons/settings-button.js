import { IButton } from "../../../Tools/group-drop.js"

export default class SettingsButton extends IButton
{
    constructor()
    {
        super();
    }

    render()
    {
        const theme = $("body").attr("data-theme");

        this.layout.addClass("btn-settings");
        this.layout.append(`<img src="/Public/img/themes/${theme}/settings-x32.png"/>`);
    }
}