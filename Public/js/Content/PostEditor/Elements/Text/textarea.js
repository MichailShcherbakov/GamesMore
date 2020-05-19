import IRenderable from "../../../../Tools/IRenderable.js"
import Event from "../../../../Tools/event.js"

export default class TextArea extends IRenderable
{
    #onInput = new Event();
    #onTextChanged = new Event();

    constructor()
    {
        super();

        this.onLayoutChanged.add(() =>
        {
           this.render();
           this.initEvets();
        });
    }

    get template()
    {
        return { 
            description: `<textarea placeholder="Текст" rows=1 class="block-element-text"></textarea>`, 
            title: "block-element-text"
        };
    }

    get onInput()
    {
        return this.#onInput;
    }

    get onTextChanged()
    {
        return this.#onTextChanged;
    }

    get text()
    {
        return this.layout.val();
    }

    set text(value)
    {
        this.layout.val(value);
        this.onTextChanged.emit();
    }

    render()
    {
        this.onRendered.emit()
    }

    initEvets()
    {
        this.layout.on("change input keyup", () =>
        {
            this.layout.css("height", "100%");
            this.layout.css("height", this.layout.prop("scrollHeight"));
            
            this.onInput.emit();
        });

        let buffer = null;

        this.layout.on("focusin", () =>
        {
            buffer = this.text;
        });

        this.layout.on("focusout", () =>
        {
            if (buffer != this.text)
                this.onTextChanged.emit();
            
            buffer = null;
        });
    }
}
