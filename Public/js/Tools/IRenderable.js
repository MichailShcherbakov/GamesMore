import Event from "./event.js"

export default class IRenderable
{
    #layout = null;
    
    #onRendered = new Event();
    #onLayoutChanged = new Event();

    constructor()
    {
        
    }

    get layout()
    {
        return this.#layout;
    }

    set layout(val)
    {
        this.#layout = val;

        this.onLayoutChanged.emit();
    }

    get onRendered()
    {
        return this.#onRendered;
    }

    get onLayoutChanged()
    {
        return this.#onLayoutChanged;
    }

    render()
    {
        console.error("The method render isn't overridden!");
    }

    initEvets()
    {
        console.error("The method initEvets isn't overridden!");
    }

    renderTemplate(layout, template)
    {
        if (!template.template)
        {
            console.error("The template wasn't found!");
            return;
        }

        layout.append(template.template.description);
        template.layout = layout.find(`.${template.template.title}`);
    }

    remove()
    {
        this.layout.remove();
    }
}