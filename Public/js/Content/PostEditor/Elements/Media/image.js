import IRenderable from "../../../../Tools/IRenderable.js"
import Event from "../../../../Tools/event.js"

export default class Image extends IRenderable
{
    #onSrcChanged = new Event();
    #onSubstrateChanged = new Event();

    constructor()
    {
        super();   

        this.onLayoutChanged.add(() =>
        {
            this.render();
            this.initEvets();
        })
    }

    get template()
    {
        return {
            description: `
                <div class="img-layout">
                    <img class="img-fluid" src="" draggable="false">
                </div>
            `,
            title: "img-layout"
        };
    }

    render()
    {
        this.onRendered.emit();
    }

    initEvets()
    {

    }

    set src(value)
    {
        this.layout.find("img").attr("src", value);
        this.onSrcChanged.emit();
    }

    get src()
    {
        if (!this.layout)
            return;
            
        return this.layout.find("img").attr("src");
    }

    set substrate(value)
    {
        if (value)
            this.layout.addClass("img-substrate");
        else
            this.layout.removeClass("img-substrate");

        this.onSubstrateChanged.emit();
    }

    get substrate()
    {
        if (!this.layout)
            return;
            
        return this.layout.hasClass("img-substrate");
    }

    get onSrcChanged()
    {
        return this.#onSrcChanged;
    }

    get onSubstrateChanged()
    {
        return this.#onSubstrateChanged;
    }
}