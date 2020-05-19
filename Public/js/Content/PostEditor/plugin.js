import IRenderable from "../../Tools/IRenderable.js"

export default class IPlugin extends IRenderable
{
    #control = null;

    constructor(control)
    {
        super();
        
        this.control = control;

        this.onLayoutChanged.add(() => 
        {
            this.render();
            this.initEvets();
        });
    }

    get template()
    {
        return { description: `<div class="plugin"></div>`, title: "plugin" }
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