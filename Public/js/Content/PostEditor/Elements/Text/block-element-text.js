import Content from "../../content.js";

import TextArea from "./textarea.js"

export default class Text extends Content
{
    #textarea = new TextArea();

    constructor()
    {
        super("text");

        this.onRendered.add(() => 
        {
            const textareaLayout = this.layout.find(".block-content-layout");
            this.renderTemplate(textareaLayout, this.textarea);
        });

        this.textarea.onTextChanged.add(() => this.onChanged.emit());
    }

    get textarea()
    {
        return this.#textarea;
    }

    get value()
    {
        const value = this.textarea.text;

        if (value == "")
            return;

        return {
            text: value,
            render: `<p>${value}</p>`,
        };
    }

    set value(value)
    {
        this.textarea.text = value.text;
    }
}