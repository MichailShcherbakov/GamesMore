import Content from "../../content.js";

import FontSizePlugin from "../../Plugins/fontSizeTitle.js";
import FontSizeExtPlugin from "../../Ext-Plugins/fontSizeTitle.js";

import TextArea from "./textarea.js"

export default class Title extends Content
{
    #textarea = new TextArea();

    constructor()
    {
        super("title");

        this.onRendered.add(() => 
        {
            const textareaLayout = this.layout.find(".block-content-layout");
            textareaLayout.append(this.textarea.template.description);
            this.textarea.layout = textareaLayout.find(`.${this.textarea.template.title}`);

            const plugin = new FontSizePlugin(this);
            plugin.layout = this.plugin.layout;
            this.plugin = plugin;

            const externalPlugin = new FontSizeExtPlugin(this);
            externalPlugin.layout = this.externalPlugin.layout;
            this.externalPlugin = externalPlugin;
        });

        this.textarea.onTextChanged.add(() => this.onChanged.emit());
        this.textarea.onFontChanged.add(() => this.onChanged.emit());
    }

    get textarea()
    {
        return this.#textarea;
    }

    get value()
    {
        const value = this.textarea.text;
        const font = this.textarea.font;

        if (value == "")
            return;

        return {
            text: value,
            font: font,
            render: `<${font}>${value}</${font}>`,
        };
    }

    set value(value)
    {
        this.textarea.text = value.text;
        this.textarea.font = value.font;
    }
}