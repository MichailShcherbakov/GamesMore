import IRenderable from "../../../../Tools/IRenderable.js"
import Event from "../../../../Tools/event.js"

export default class InputField extends IRenderable
{
    #onLoaded = new Event();

    constructor()
    {
        super();

        this.onLayoutChanged.add(() =>
        {
            this.render();
            this.initEvets();
        })
    }

    get onLoaded()
    {
        return this.#onLoaded;
    }

    get template()
    {
        return {
            description: `<input class="input-url-media" type="text" placeholder="Или введите ссылку" >`,
            title: "input-url-media"
        }
    }

    render()
    {
        this.onRendered.emit();
    }

    initEvets()
    {
        this.layout.on("input", () =>
        {
            const url = this.layout.val();
            const img = new Image();

            img.onload = () =>
            {  
                $.ajax({
                    url: "/load-media-by-url/",
                    method: "post",
                    data: { "url": url },
                    success: data => this.onLoaded.emit(JSON.parse(data)),
                });
            };

            img.src = url;
        });
    }
}