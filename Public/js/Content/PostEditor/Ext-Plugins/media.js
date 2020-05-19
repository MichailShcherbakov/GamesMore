import Event from "../../../Tools/event.js"
import IExtPlugin from "../ext-plugin.js"
import IRenderable from "../../../Tools/IRenderable.js"

class Button extends IRenderable
{
    #data = {};
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
    
    get data()
    {
        return this.#data;
    }

    set data(value)
    {
        this.#data = value;
    }
    
    get onClick()
    {
        return this.#onClick;
    }

    get template()
    {
        return { 
            description: `<div class="btn-ext-plugin  btn-ext-plugin--media"></div>`, 
            title: `btn-ext-plugin`
        };
    }

    set activated(value)
    {
        const theme = $("body").attr("data-theme");

        if (value)
        {
            this.layout.addClass("btn-ext-plugin--media--active");
            this.layout.find("img").attr("src", `/Public/img/themes/${theme}/paint-bucket-2-x16.png`);
        }
        else
        {
            this.layout.removeClass("btn-ext-plugin--media--active");
            this.layout.find("img").attr("src", `/Public/img/themes/${theme}/paint-bucket-x16.png`);
        }
    }

    get activated()
    {
        return this.layout.hasClass("btn-ext-plugin--media--active");
    }

    render()
    {
        const theme = $("body").attr("data-theme");

        this.layout.append(`<img src="/Public/img/themes/${theme}/paint-bucket-x16.png"/>`);

        this.onRendered.emit();
    }

    initEvets()
    {
        this.layout.on("click", () => this.onClick.emit() );
    }
}

export default class MediaExtPlugin extends IExtPlugin
{
    #button = new Button();
    
    constructor(control)
    {
        super(control);

        this.control.image.onSubstrateChanged.add(() => this.#button.activated = !this.#button.activated );
        this.#button.onClick.add(() => this.control.image.substrate = !this.control.image.substrate );
    }

    render()
    {
        this.renderTemplate(this.layout, this.#button);
        this.onRendered.emit();
    }
}