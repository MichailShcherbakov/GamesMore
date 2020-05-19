import SettingsItem from "./settings-item.js"
import Event from "../../../Tools/event.js"

export default class PinItem extends SettingsItem
{
    #locked = false;
    #activated = false;

    #onActivateStateChanged = new Event();
    #onLockStateChanged = new Event();

    constructor()
    {
        super();

        const theme = $("body").attr("data-theme");

        const view = `
            <img src="/Public/img/themes/${theme}/star-2-x16.png">
            <span>Вывести в ленте</span> 
        `;

        this.onClick.add(() => this.activated = !this.activated);

        this.onRendered.add(() =>
        {
            this.layout.append(view);
        })
    }

    get onActivateStateChanged()
    {
        return this.#onActivateStateChanged;
    }

    get onLockStateChanged()
    {
        return this.#onLockStateChanged;
    }

    get activated()
    {
        return this.#activated;
    }

    set activated(value)
    {
        if (this.locked)
            return;

        if (value)
            this.layout.find("span").text("Не выводить в ленте");
        else
            this.layout.find("span").text("Вывесте в ленте");
            
        this.#activated = value; 

        this.onActivateStateChanged.emit();
    }

    set locked(value)
    {
        if (value)
            this.layout.css("display", "none")
        else
            this.layout.css("display", "inherit")

        this.#locked = value;
        this.onLockStateChanged.emit();
    }
    
    get locked()
    {
        return this.#locked;
    }
}