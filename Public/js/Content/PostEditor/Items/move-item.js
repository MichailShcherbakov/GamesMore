import SettingsItem from "./settings-item.js"
import Event from "../../../Tools/event.js"

export default class MoveItem extends SettingsItem
{
    #lock = false;

    #onLockStateChanged = new Event();

    constructor()
    {
        super();

        this.onRendered.add(() =>
        {
            this.layout.append(`
                <img src="${this.data.src}">
                <span>${this.data.text}</span>
            `)
        })
    }

    get onLockStateChanged()
    {
        return this.#onLockStateChanged;
    }

    get lock()
    {
        return this.#lock;
    }

    set lock(value)
    {
        if (value)
            this.layout.css("display", "none")
        else
            this.layout.css("display", "inherit")

        this.#lock = value;
        this.#onLockStateChanged.emit();
    }
}