import IRenderable from "../../../Tools/IRenderable.js"
import Event from "../../../Tools/event.js"
import IPlugin from "../plugin.js"

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
            description: `<div id="btn-${this.data.type}-font-size" class="btn-change-font-size"></div>`, 
            title: `btn-${this.data.type}-font-size`
        };
    }

    set activated(value)
    {
        if (value)
            this.layout.addClass("btn-change-font-size--active");
        else
            this.layout.removeClass("btn-change-font-size--active");
    }

    get activated()
    {
        return this.layout.hasClass("btn-change-font-size--active");
    }

    render()
    {
        this.layout.append(`<span>${this.data.title}</span>`);

        this.onRendered.emit();
    }

    initEvets()
    {
        this.layout.on("click", () =>
        {
            this.onClick.emit();
        });
    }
}

export default class FontSizePlugin extends IPlugin
{
    #buttons = [];

    constructor(control)
    {
        super(control);
    }

    render()
    {
        this.layout.addClass("plugin--title");

        const buttons = [ 
            { title: "H2", type: "h2" }, 
            { title: "H3", type: "h3" }, 
            { title: "H4", type: "h4" }, 
        ];

        this.control.textarea.onFontChanged.add(() => 
        {
            this.buttons.forEach(button =>
            {
                if (button.activated)
                    button.activated = false;

                if (button.data.type == this.control.textarea.font)
                    button.activated = true;
            });
        });

        buttons.forEach(data =>
        {
            const b = new Button();
            b.data = data;

            b.onClick.add(() =>
            {
                this.control.textarea.font = b.data.type;
            });

            this.layout.append(b.template.description);
            b.layout = this.layout.find(`#${b.template.title}`);

            this.#buttons.push(b);
        });

        this.#buttons[0].activated = true;

        this.onRendered.emit();
    }

    initEvets()
    {
        
    }

    get buttons()
    {
        return this.#buttons;
    }
}