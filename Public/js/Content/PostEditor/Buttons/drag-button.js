import IRenderable from "../../../Tools/IRenderable.js"
import Event from "../../../Tools/event.js"

export default class DragButton extends IRenderable
{
    #onMouseDown = new Event();

    constructor()
    {
        super();

        this.onLayoutChanged.add(() => 
        {
            this.render();
            this.initEvets();
        });
    }

    get onMouseDown()
    {
        return this.#onMouseDown;
    }

    get template()
    {
        return {
            description: `<div class="btn-drag-ind"></div>`,
            title: "btn-drag-ind"
        };
    }

    render()
    {
        const theme = $("body").attr("data-theme");

        this.layout.append(`
            <img src="/Public/img/themes/${theme}/justify-align-x16.png" draggable="false"/>
        `);

        this.onRendered.emit();
    }

    initEvets()
    {
        this.layout.on("mousedown", () =>
        {
            this.onMouseDown.emit();
        });
    }
}