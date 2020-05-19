import Event from "../../Tools/event.js"
import IRenderable from "../../Tools/IRenderable.js"

export default class Block extends IRenderable
{
    static DirectionType = { First: "first", Middle: "middle", Last: "last", Alone: "Alone" }

    #content = null;
    #direction = null;

    #onClick = new Event();
    #onDirectionChanged = new Event();
    #onDrop = new Event();
    #onDragStart = new Event();

    #onContentChanged = new Event();
    #onPinStateChanged = new Event();
    #onDragButtonClick = new Event();
    #onMoveUpButtonClick = new Event();
    #onMoveDownButtonClick = new Event();
    #onPinLockStateChanged = new Event();
    #onTrashButtonClick = new Event();

    #listeners = {};

    constructor()
    {
        super();

        this.onLayoutChanged.add(() =>
        {
            this.render();
            this.initEvents();
            this.initContentEvents();
        });
    }
    
    set content(content)
    {
        if (content.layout)
        {
            this.deinitContentEvetns();
            this.layout.append(content.layout);
        }

        this.#content = content;

        if (this.content.layout)
            this.initContentEvents();
    }

    get content()
    {
        return this.#content;
    }

    get onClick()
    {
        return this.#onClick;
    }

    render()
    {
        this.layout.append(this.content.template.description);
        this.content.layout = this.layout.find(`.${this.content.template.title}`);
        this.onRendered.emit();
    }

    initEvents()
    {
        this.layout.on("click", () => this.onClick.emit());

        this.layout.on("dragleave", event =>
        {
            this.layout.removeClass("block--drop");
            event.preventDefault()
        });

        this.layout.on("dragover", event =>
        {
            this.layout.addClass("block--drop");
            event.preventDefault()
        });

        this.layout.on("drop", event => 
        {
            this.layout.removeClass("block--drop");
            this.draggable = false;
            this.onDrop.emit(event);
        });

        this.layout.on("dragstart", event => this.onDragStart.emit(event));
    }

    initContentEvents()
    {
        this.#listeners = 
        [
            { 
                obj: this.content.pinButton.onActivateStateChanged, 
                func: () => this.onPinStateChanged.emit()
            },
            {
                obj: this.content.pinButton.onLockStateChanged,
                func: () => this.onPinLockStateChanged.emit()
            },
            { 
                obj: this.content.dragButton.onMouseDown, 
                func: () => this.onDragButtonClick.emit()
            },
            {
                obj: this.content.moveUpButton.onClick,
                func: () => this.onMoveUpButtonClick.emit(),
            },
            { 
                obj: this.content.moveDownButton.onClick,
                func: () => this.onMoveDownButtonClick.emit(),
            },
            {
                obj: this.content.trashButton.onClick,
                func: () => this.onTrashButtonClick.emit(),
            },
            {
                obj: this.content.onChanged,
                func: () => this.onContentChanged.emit(),
            }
        ];

        this.#listeners.forEach(listener => listener.obj.add(listener.func));
    }

    deinitContentEvetns()
    {
        this.#listeners.forEach(listener => listener.obj.remove(listener.func));
    }

    set focus(value)
    {
        if (value)
            this.layout.addClass("block--focused");
        else
            this.layout.removeClass("block--focused");
    }

    get focus()
    {
        return this.layout.hasClass("block--focused");
    }

    get pinned()
    {
        return this.content.pinButton.activated;
    }

    set pinned(value)
    {
        this.content.pinButton.activated = value;
    }

    get onPinStateChanged()
    {
        return this.#onPinStateChanged;
    }

    get onContentChanged()
    {
        return this.#onContentChanged;
    }

    get pinLocked()
    {
        return this.content.pinButton.locked;
    }

    set pinLocked(value)
    {
        this.content.pinButton.locked = value;
    }

    get onPinLockStateChanged()
    {
        return this.#onPinLockStateChanged;
    }

    get onDragButtonClick()
    {
        return this.#onDragButtonClick;
    }

    get onMoveUpButtonClick()
    {
        return this.#onMoveUpButtonClick;
    }

    get onMoveDownButtonClick()
    {
        return this.#onMoveDownButtonClick;
    }

    get onTrashButtonClick()
    {
        return this.#onTrashButtonClick;
    }

    get onDrop()
    {
        return this.#onDrop;
    }

    get onDragStart()
    {
        return this.#onDragStart;
    }

    get onDirectionChanged()
    {
        return this.#onDirectionChanged;
    }

    set direction(dir)
    {
        switch (dir) 
        {
        case Block.DirectionType.First:
            this.content.moveUpButton.lock = true;
            this.content.moveDownButton.lock = false;
            break;
        case Block.DirectionType.Middle:
            this.content.moveUpButton.lock = false;
            this.content.moveDownButton.lock = false;
            break;
        case Block.DirectionType.Last:
            this.content.moveUpButton.lock = false;
            this.content.moveDownButton.lock = true;
            break;
        case Block.DirectionType.Alone:
            this.content.moveUpButton.lock = true;
            this.content.moveDownButton.lock = true;
            break;
        default:
            console.error("Unknown direction type.");
            break;
        }

        this.#direction = dir;
        this.onDirectionChanged.emit();
    }

    get direction()
    {
        return this.#direction;
    }

    set draggable(value)
    {
        if (value)
            this.layout.attr("draggable", true);
        else
            this.layout.removeAttr("draggable");
    }

    get draggable()
    {
        return this.layout.attr("draggable");
    }
}