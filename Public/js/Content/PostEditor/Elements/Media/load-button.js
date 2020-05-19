import IRenderable from "../../../../Tools/IRenderable.js"
import Event from "../../../../Tools/event.js"

export default class LoadButton extends IRenderable
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
        const theme = $("body").attr("data-theme");

        /*<input id="input-media-files" type="file" accept="image/png, image/jpeg, image/gif, video/mp4, .webp" multiple="multiple">*/ 

        return {
            description: `
                <div class="btn-load-media">

                    <label for="input-load-media"></label>

                    <div class="btn-load-media--title-layout">

                        <div class="btn-load-media--title">
                            <img src="/Public/img/themes/${theme}/upload-x16.png" draggable="false">
                            <span>Загрузите изображение</span>
                        </div>

                    </div>
                    
                    <input id="input-load-media" type="file" accept="image/png, image/jpeg, image/gif">

                </div>
            `,
            title: "btn-load-media"
        }
    }

    render()
    {
        this.onRendered.emit();
    }

    initEvets()
    {
        this.layout.find("#input-load-media").on("change", event =>
        {
            const form = new FormData();
    
            for (let i = 0; i < event.target.files.length; i++) 
            {
                form.append("file-" + i, event.target.files[i]);
            }
    
            $.ajax({
                url: "/load-media/",
                method: "post",
                data: form,
                processData: false,
                contentType: false,
                success: data => this.onLoaded.emit(JSON.parse(data)),
            });
        });
    }
}