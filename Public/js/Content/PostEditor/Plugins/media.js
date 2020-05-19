import Event from "../../../Tools/event.js"
import IPlugin from "../plugin.js"

export default class MediaPlugin extends IPlugin
{
    #onClick = new Event();

    constructor(control)
    {
        super(control);

        this.control.image.onSubstrateChanged.add(() => this.activated = !this.activated);
    }
    
    get onClick()
    {
        return this.#onClick;
    }

    render()
    {
        this.layout.addClass("plugin--media");

        const theme = $("body").attr("data-theme");

        this.layout.append(`
            <img src="/Public/img/themes/${theme}/paint-bucket-x16.png"/>
            <span>Подложка</span>
        `);
    }

    initEvets()
    {
        this.layout.on("click", () =>
        {
            this.control.image.substrate = !this.control.image.substrate;
            this.onClick.emit();
        });
    }

    set activated(value)
    {
        if (value)
            this.layout.addClass("plugin--media--active");
        else
            this.layout.removeClass("plugin--media--active");
    }

    get activated()
    {
        return this.layout.hasClass("plugin--media--active");
    }
}

/*

constructor(control)
    {
        super(control);

        super.element = `
                <div id="btn-plugin-substrate" class="drop-menu-item drop-menu-item-plugin--media">
                    <img src="/Public/img/paint-bucket.png"/>
                    <p>Подложка</p>
                </div>
        `;

        super.control.onRendered.add((sender) => this.init(sender));

        if (control.isRendered)
        {
            super.control.frame.find(".plugin-layout").append(super.element);
            this.init();
        }
    }

    init(sender)
    {
        this.frame.on("click", "#btn-plugin-substrate", () =>
        {
            let image = this.control.frame.find(".img-layout").children("img");

            if (image.hasClass("img-substrate"))
            {
                image.removeClass("img-substrate");
            }
            else
            {
                image.addClass("img-substrate");
            }

            image.trigger("imgsubstratechange");

            this.control.onChanged.emit();
        });

        this.control.frame.on("imgsubstratechange", ".img-layout img", () =>
        {
            let button = this.control.frame.find("#btn-plugin-substrate");
            let image = this.control.frame.find(".img-layout").children("img");

            if (image.hasClass("img-substrate"))
            {
                button.addClass("drop-menu-item-plugin--media--active");
            }
            else
            {
                button.removeClass("drop-menu-item-plugin--media--active");  
            }
        });
    }
*/