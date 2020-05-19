import IRenderable from "../../../Tools/IRenderable.js"
import Event from "../../../Tools/event.js"

export default class PinButton extends IRenderable
{
    #locked = false;

    #onActivateStateChanged = new Event();
    #onLockStateChanged = new Event();
    #onClick = new Event();

    constructor()
    {
        super();

        this.onLayoutChanged.add(() => 
        {
            this.render();
            this.initEvets();
        });
    }

    get template()
    {
        return {
            description: `<div class="btn-pin-to-tape-ind"></div>`,
            title: "btn-pin-to-tape-ind"
        };
    }

    get onActivateStateChanged()
    {
        return this.#onActivateStateChanged;
    }

    get onLockStateChanged()
    {
        return this.#onLockStateChanged;
    }

    get onClick()
    {
        return this.#onClick;
    }

    render()
    {
        const theme = $("body").attr("data-theme");

        this.layout.append(`
            <span>Вывести в ленте</span>
            <img class="icon-btn-pin-to-tape-ind" src="/Public/img/themes/${theme}/star-x16.png" draggable="false"/>
        `);

        this.onRendered.emit();
    }
    
    initEvets()
    {
        const theme = $("body").attr("data-theme");
        const button = this.layout.find(".icon-btn-pin-to-tape-ind");
        const title = this.layout.find("span");

        button.on("mouseover", () =>
        {
            if (this.locked)
                return;

            title.css("visibility", "visible");

            if (this.activated)
                return;

            button.attr("src", `/Public/img/themes/${theme}/star-2-x16.png`);
        })

        button.on("mouseleave", () =>
        {
            if (this.locked)
                return;

            title.css("visibility", "hidden");

            if (this.activated)
                return;

            button.attr("src", `/Public/img/themes/${theme}/star-x16.png`);
        })

        button.on("click", () =>
        {
            if (this.locked)
                return;

            this.activated = !this.activated;
            
            if (!this.activated)
                button.attr("src", `/Public/img/themes/${theme}/star-2-x16.png`);
                
            this.onClick.emit();
        })
    }

    set activated(value)
    {
        if (this.locked)
            return;

        const theme = $("body").attr("data-theme");
        const button = this.layout.find(".icon-btn-pin-to-tape-ind");
        const title = this.layout.find("span");

        if (value)
        {
            this.layout.addClass("btn-pin-to-tape-ind--active");

            button.attr("src", `/Public/img/themes/${theme}/star-x16-hovered.png`);
            button.css("visibility", "visible")
            title.text("Не выводить");
        } 
        else
        {
            this.layout.removeClass("btn-pin-to-tape-ind--active");

            button.attr("src", `/Public/img/themes/${theme}/star-x16.png`);
            button.css("visibility", "inherit")
            title.text("Вывести в ленте");
        }

        this.onActivateStateChanged.emit();
    }

    get activated()
    {
        return this.layout.hasClass("btn-pin-to-tape-ind--active");
    }

    set locked(value)
    {
        this.#locked = value;
        this.onLockStateChanged.emit();
    }
    
    get locked()
    {
        return this.#locked;
    }
}