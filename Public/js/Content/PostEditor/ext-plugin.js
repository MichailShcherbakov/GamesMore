import IRenderable from "../../Tools/IRenderable.js"

export default class IExtPlugin extends IRenderable
{
    #control = null;

    constructor(control)
    {
        super();
        
        this.control = control;

        this.onLayoutChanged.add(() => 
        {
            this.render();
        });
    }

    get template()
    {
        return { description: `<div class="ext-plugin"></div>`, title: "ext-plugin" }
    }

    remove()
    {
        this.layout.remove();
    }

    get control()
    {
        return this.#control;
    }

    set control(value)
    {
        this.#control = value;
    }
}