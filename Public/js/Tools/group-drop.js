import Event from "./event.js";
import IRenderable from "./IRenderable.js";

export class Popup
{
    #menu = null;
    #button = null;
    #layout = null;

    constructor(layout, button, menu)
    {
        this.#layout = layout;
        this.#menu = menu;
        this.#button = button;
    }

    create()
    {
        this.layout.append(`<div class="group-drop"></div>`);
        
        let group = this.layout.children(".group-drop");

        group.append(this.button.template.description);
        group.append(this.menu.template.description);

        this.menu.layout = group.children(`.${this.menu.template.title}`);
        this.button.layout = group.children(`.${this.button.template.title}`);

        this.initEvents();
    }

    initEvents()
    {
        this.button.onClick.add(() =>
        {
            this.menu.open();
        });
    }

    get menu()
    {
        return this.#menu;
    }

    set menu(value)
    {
        this.#menu = value;
    }

    get button()
    {
        return this.#button;
    }

    set button(value)
    {
        this.#button = value;
    }

    get layout()
    {
        return this.#layout;       
    }

    set layout(value)
    {
        this.#layout = value;       
    }
}

export class IButton extends IRenderable
{
    #template = { description: `<div class="group-drop-button"></div>`, title: `group-drop-button`};
    #onClick = new Event();

    constructor()
    {
        super();

        this.onLayoutChanged.add(() =>
        {
            this.render();
            this.initEvents();
        });
    }

    get onClick()
    {
        return this.#onClick;
    }

    get template()
    {
        return this.#template;
    }
    
    initEvents()
    {
        this.layout.on("click", () => 
        {
            this.onClick.emit(this);
        });
    }
}

export class Menu extends IRenderable
{
    #conteiner = [];

    #onFocusOut = new Event();

    constructor()
    {
        super();

        this.onLayoutChanged.add(() =>
        {
            this.render();
            this.initEvents();
        });
    }

    add(item)
    {
        this.#conteiner.push(item);

        item.onClick.add(() => 
        {
            this.close();
        });

        if (this.layout)
        {
            this.layout.append(item.template.description);
            item.layout = this.layout.find(`.${item.template.title}:last-child`);
            this.onFocusOut.add(() => item.onFocusOut.emit());

            this.onRendered.emit();
        }
    }

    at(index)
    {
        if (index < 0 || index >= this.#conteiner.length)
            return;

        return this.#conteiner[index];
    }

    get count()
    {
        return this.#conteiner.length;
    }

    remove(item)
    {
        this.onFocusOut.remove(() => item.onFocusOut.emit());

        let index = this.#conteiner.indexOf(item);

        if (index == -1)
        {
            console.error("The item was not found!");
            return;
        }

        this.#conteiner.splice(index, 1);
    }

    concat(array) 
    {
        this.#conteiner = array.concat(this.#conteiner);

        this.render();
    }

    open()
    {
        this.layout.addClass("group-drop-menu--active");
        this.layout.focus();
    }

    close()
    {
        this.layout.removeClass("group-drop-menu--active");
    }

    get template()
    {
        return { description: `<div class="group-drop-menu" tabindex="1"></div>`, title: `group-drop-menu`}
    }

    get isOpened()
    {
        return this.layout.hasClass("group-drop-menu--active");
    }

    set direction(value)
    {
        this.layout.addClass(value);
    }

    render()
    {
        this.layout.empty();

        this.#conteiner.forEach(item => 
        {
            this.layout.append(item.template.description);
            item.layout = this.layout.find(`.${item.template.title}:last-child`);
            this.onFocusOut.add(() => item.onFocusOut.emit());
        });
    }

    initEvents()
    {
        this.layout.on("focusout", () =>
        {
            this.close();
            this.onFocusOut.emit();
        });
    }

    set marginBottom(value)
    {
        this.layout.css("marginBottom", value);
    }

    set marginTop(value)
    {
        this.layout.css("marginTop", value);
    }
    set marginLeft(value)
    {
        this.layout.css("marginLeft", value);
    }

    set marginRight(value)
    {
        this.layout.css("marginRight", value);
    }

    get onFocusOut()
    {
        return this.#onFocusOut;
    }
}

export class IItem extends IRenderable
{
    #data = {};
    #template = { description: `<div class="group-drop-menu-item"></div>`, title: "group-drop-menu-item" };

    #onClick = new Event();
    #onFocusOut = new Event();

    constructor()
    {
        super();

        this.onLayoutChanged.add(() =>
        {
            this.render();
            this.initEvents();
        });
    }

    get template()
    {
        return this.#template;
    }

    get onClick()
    {
        return this.#onClick;
    }

    get data()
    {
        return this.#data;
    }

    set data(value)
    {
        this.#data = value;
    }

    get onFocusOut()
    {
        return this.#onFocusOut;
    }

    initEvents()
    {
        this.layout.on("click", event => 
        {
            event.stopPropagation();
            
            this.onClick.emit();
        });
    }
}