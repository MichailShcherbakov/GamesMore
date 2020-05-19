import Content from "../../content.js";

import LoadButton from "./load-button.js"
import InputField from "./load-field.js"
import Image from "./image.js"

import MediaPlugin from "../../Plugins/media.js";
import MediaExtPlugin from "../../Ext-Plugins/media.js";

export default class Media extends Content
{
    #loadButton = new LoadButton();
    #inputField = new InputField();
    #image = new Image();

    constructor()
    {
        super("media");

        this.onRendered.add(() =>
        {
            const layout = this.layout.find(".block-content-layout");

            this.renderTemplate(layout, this.#loadButton);
            this.renderTemplate(layout, this.#inputField);

            this.#loadButton.onLoaded.add(data => this.loaded(data));
            this.#inputField.onLoaded.add(data => this.loaded(data));

            this.image.onSrcChanged.add(() => this.onChanged.emit());
            this.image.onSubstrateChanged.add(() => this.onChanged.emit());
        });

        this.trashButton.onClick.add(() => 
        {
            $.ajax({
                url: "/unload-media-by-url/",
                method: "post",
                data: { url: this.image.src },
            });
        });
    }

    loaded(files)
    {
        this.#loadButton.remove();
        this.#inputField.remove();

        const mediaPlugin = new MediaPlugin(this);
        mediaPlugin.layout = this.plugin.layout;
        this.plugin = mediaPlugin;

        const mediaExtPlugin = new MediaExtPlugin(this);
        mediaExtPlugin.layout = this.externalPlugin.layout;
        this.externalPlugin = mediaExtPlugin;

        const layout = this.layout.find(".block-content-layout");

        this.renderTemplate(layout, this.image);

        this.image.src = files[0].url;
    }

    get image()
    {
        return this.#image;
    }

    get loadButton()
    {
        return this.#loadButton;
    }

    get value()
    {
        const url = this.image.src;
        const substrate = this.image.substrate;

        if (!url)
            return;

        return {
            files: [
                {
                    url: url,
                    substrate: substrate,
                    render: `<div><img src="${url}" draggable="false"/></div>`,
                }
            ]
        };
    }

    set value(value)
    {
        if (this.image.layout)
        {
            this.image.src = value.files[0].url;
            this.image.substrate = value.files[0].substrate;
        }
        else
        {
            this.loaded(value.files);
            this.image.substrate = value.files[0].substrate;
        }
    }
}