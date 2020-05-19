import IRenderable from "../../Tools/IRenderable.js"

import { Popup, Menu } from "../../Tools/group-drop.js";
import Event from "../../Tools/event.js"

import EmptyPlugin from "./Plugins/empty.js"
import EmptyExtPlugin from "./Ext-Plugins/empty.js"

import PinButton from "./Buttons/pin-button.js"
import DragButton from "./Buttons/drag-button.js"
import SettingsButton from "./Buttons/settings-button.js"

import PluginItem from "./Items/plugin-item.js"
import SeparatorItem from "./Items/separator-item.js"
import PinItem from "./Items/pin-item.js"
import MoveItem from "./Items/move-item.js"
import TrashItem from "./Items/trash-item.js"


export default class Content extends IRenderable
{
    #name = "";
    #popup = new Popup();
    #pinButton = new PinButton();
    #dragButton = new DragButton();
    #plugin = null;
    #externalPlugin = null;

    #moveUpItem = null;
    #moveDownItem = null;
    #trashItem = null;

    #onChanged = new Event();
    
    constructor(name)
    {
        super();

        this.#name = name;

        this.plugin = new EmptyPlugin(this);
        this.externalPlugin = new EmptyExtPlugin(this);

        const theme = $("body").attr("data-theme");

        const popupButton = new SettingsButton();
        const menu = new Menu();

        const pluginItem = new PluginItem();
        menu.add(pluginItem);

        const separatorItem = new SeparatorItem();
        menu.add(separatorItem);

        const pinItem = new PinItem();
        menu.add(pinItem);

        const moveUpItem = new MoveItem();
        moveUpItem.data = { text: "Переместить наверх", src: `/Public/img/themes/${theme}/up-arrow-x16.png` }
        menu.add(moveUpItem);

        const moveDownItem = new MoveItem();
        moveDownItem.data = { text: "Переместить вниз", src: `/Public/img/themes/${theme}/down-arrow-x16.png` }
        menu.add(moveDownItem);

        const trashItem = new TrashItem();
        menu.add(trashItem);

        pluginItem.onLayoutChanged.add(() => 
        {
            pluginItem.layout.append(this.plugin.template.description);
            this.plugin.layout = pluginItem.layout.find(`.${this.plugin.template.title}`);
        });

        pinItem.onClick.add(() => this.pinButton.activated = pinItem.activated);

        this.pinButton.onActivateStateChanged.add(() => 
        {
            pinItem.activated = this.pinButton.activated;
            this.onChanged.emit();
        });
        
        this.pinButton.onLockStateChanged.add(() => pinItem.locked = this.pinButton.locked);

        menu.onLayoutChanged.add(() => 
        {
            menu.layout.addClass("group-drop-menu-settings");
            menu.direction = "group-drop-menu--top-right";
            menu.marginRight = `-30px`;
        });

        popupButton.onLayoutChanged.add(() => 
        {
            menu.marginTop = `${(parseFloat(popupButton.layout.css("height")) + 10)}px`;
        });

        this.popup.menu = menu;
        this.popup.button = popupButton;

        this.onLayoutChanged.add(() => this.render() );

        this.#moveUpItem = moveUpItem;
        this.#moveDownItem = moveDownItem;
        this.#trashItem = trashItem;
    }

    render()
    {
        const inds = this.layout.find(".block-content-inds");
        inds.append(this.pinButton.template.description);
        inds.append(this.dragButton.template.description)

        this.pinButton.layout = inds.find(`.${this.pinButton.template.title}`);
        this.dragButton.layout = inds.find(`.${this.dragButton.template.title}`);

        const toolbarLayout = this.layout.find(".block-content-toolbar");

        toolbarLayout.append(this.externalPlugin.template.description);
        this.externalPlugin.layout = toolbarLayout.find(`.${this.externalPlugin.template.title}`);

        this.popup.layout = toolbarLayout;
        this.popup.create();

        this.onRendered.emit();
    }

    get template()
    {
        return { 
            description: `
                <div class="block-content">
                    <div class="block-content-inds"></div>
                    <div class="block-content-layout"></div>
                    <div class="block-content-toolbar"></div>
                </div>
            `,
            
            title: "block-content"
        };
    }

    get name()
    {
        return this.#name;
    }
    
    get onChanged()
    {
        return this.#onChanged;
    }

    get pinButton()
    {
        return this.#pinButton;
    }

    get dragButton()
    {
        return this.#dragButton;
    }

    get popup()
    {
        return this.#popup;
    }

    get plugin()
    {
        return this.#plugin;
    }

    set plugin(value)
    {
        this.#plugin = value;
    }

    get externalPlugin()
    {
        return this.#externalPlugin;
    }

    set externalPlugin(value)
    {
        this.#externalPlugin = value;
    }

    get moveUpButton()
    {
        return this.#moveUpItem;
    }

    get moveDownButton()
    {
        return this.#moveDownItem;
    }

    get trashButton()
    {
        return this.#trashItem;
    }

    get value()
    {
        console.error("The getter `value` isn't overridden!");
    }

    set value(value)
    {
        console.error("The setter `value` isn't overridden!");
    }
}