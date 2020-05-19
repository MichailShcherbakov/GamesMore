import IRenderable from "../../../../Tools/IRenderable.js"
import Event from "../../../../Tools/event.js"

export default class TextArea extends IRenderable
{
    #font = "h2";

    #onFontChanged = new Event();
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

    set font(value)
    {
        this.#font = value;

        this.layout.removeClass();
        this.layout.addClass(`block-element-title block-element-title--${this.#font}`);

        this.layout.css("height", "100%");
        this.layout.css("height", this.layout.prop("scrollHeight"));
        
        this.onFontChanged.emit();
    }

    get font()
    {
        return this.#font;
    }

    get template()
    {
        return { 
            description: `<textarea placeholder="Заголовок" rows=1 class="block-element-title block-element-title--h2"></textarea>`, 
            title: "block-element-title"
        };
    }

    get onFontChanged()
    {
        return this.#onFontChanged;
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

    get onInput()
    {
        return this.#onInput;
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
