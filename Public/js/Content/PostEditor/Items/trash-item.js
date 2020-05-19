import SettingsItem from "./settings-item.js"

export default class TrashItem extends SettingsItem
{
    #available = false;

    constructor()
    {
        super();

        this.onClick.suspend = true;

        const theme = $("body").attr("data-theme");

        const viewNormalState = `
            <img src="/Public/img/themes/${theme}/trash-x16.png">
            <span>Удалить блок</span> 
        `;

        const viewActiveState = `
            <img src="/Public/img/themes/${theme}/trash-2-x16.png">
            <span>Точно удалить?</span> 
        `;

        this.onFocusOut.add(() =>
        {
            this.layout.removeClass("repeat-deletion");
            this.layout.empty();
            this.layout.append(viewNormalState);

            this.available = false;
        })

        this.onRendered.add(() =>
        {
            this.layout.append(viewNormalState);
            
            this.layout.on("click", event => 
            {
                event.stopPropagation();

                if (!this.available)
                {
                    this.layout.addClass("repeat-deletion");
                    this.layout.empty();
                    this.layout.append(viewActiveState);

                    this.available = true;
                }
                else
                {
                    this.onClick.suspend = false;
                    this.onClick.emit();
                    this.onClick.suspend = true;
                }
            });
        })
    }

    get available()
    {
        return this.#available;
    }

    set available(value)
    {
        this.#available = value;
    }
} 