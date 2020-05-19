import Block from "./block.js"

import Event from "../../Tools/event.js"

import Text from "./Elements/Text/block-element-text.js"
import Title from "./Elements/Title/block-element-title.js"
import Media from "./Elements/Media/block-element-media.js"

export { Editor, Text, Title, Media };

export default class Editor
{
    #layout = null;
    #blocks = [];
    #numberPinnedBlocks = 0;

    #onContentChanged = new Event();

    constructor(layout)
    {
        this.layout = layout;
    }

    get onContentChanged()
    {
        return this.#onContentChanged;
    }

    get blocks()
    {
        return this.#blocks;
    }

    get layout()
    {
        return this.#layout;
    }

    set layout(value)
    {
        return this.#layout = value;
    }

    add(content)
    {
        const block = new Block();
        block.content = content;

        this.blocks.push(block);

        this.layout.append(`<div class="block"></div>`);

        block.layout = this.layout.find(".block:last-child");

        block.onClick.add(() =>
        {
            if (this.focusedBlock)
                this.focusedBlock.focus = false;
                
            block.focus = true;
        });

        if (this.#numberPinnedBlocks >= 2)
            block.pinLocked = true;

        block.onDragButtonClick.add(() => block.draggable = true );

        block.onContentChanged.add(() => this.onContentChanged.emit());

        block.onPinStateChanged.add(() => 
        {
            if (!block.pinned)
            {
                if (this.#numberPinnedBlocks >= 2)
                {
                    this.blocks.forEach(block =>
                    {
                        if (block.pinLocked)
                            block.pinLocked = false;
                    });
                }

                this.#numberPinnedBlocks--;

                return;
            }
    
            this.#numberPinnedBlocks++;
    
            if (this.#numberPinnedBlocks < 2)
                return;
    
            this.blocks.forEach(block =>
            {
                if (!block.pinned)
                    block.pinLocked = true;
            });
        });

        block.onDrop.add(event => 
        {
            const movableBlockIndex = event.originalEvent.dataTransfer.getData("movableBlockIndex");
            const movableBlock = this.blocks[movableBlockIndex];

            movableBlock.draggable = false;

            this.move(movableBlock, block);
        });

        block.onDragStart.add(event => 
        {
            event.originalEvent.dataTransfer.setData("movableBlockIndex", this.find(block));
        })

        block.onMoveUpButtonClick.add(() => 
        {
            const replacementBlock = this.blocks[this.find(block) - 1];
            this.move(block, replacementBlock);
        });

        block.onMoveDownButtonClick.add(() => 
        {
            const replacementBlock = this.blocks[this.find(block) + 1];
            this.move(block, replacementBlock);
        });

        block.onTrashButtonClick.add(() =>
        {
            if (block.pinned)
            {
                if (this.#numberPinnedBlocks >= 2)
                {
                    this.blocks.forEach(block =>
                    {
                        if (block.pinLocked)
                            block.pinLocked = false;
                    });
                }

                this.#numberPinnedBlocks--;
            }

            block.remove();

            this.delete(block);
        });

        this.validate();
    }

    get focusedBlock()
    {
        let result = null;

        this.blocks.forEach(block =>
        {
            if (block.focus)
            {
                result = block;
                return;
            }
        });

        return result;
    }

    delete(block)
    {
        const index = this.blocks.indexOf(block);

        if (index == -1)
        {
            console.error("The block wasn't found!");
            return;
        }

        this.blocks.splice(index, 1);

        this.validate();
    }

    find(block)
    {
        for (let i = 0; i < this.blocks.length; ++i)
            if (this.blocks[i] == block)
                return i;
        
        return -1;
    }

    move(movableBlock, replacementBlock)
    {
        movableBlock.focus = false;
        replacementBlock.focus = false;

        const temp = movableBlock.content;
        movableBlock.content = replacementBlock.content;
        replacementBlock.content = temp;

        this.validate();
    }


    validate()
    {
        if (this.blocks.length == 0)
            return;

        this.blocks[0].direction = Block.DirectionType.Alone;

        if (this.blocks.length == 1)
            return;

        this.blocks[0].direction = Block.DirectionType.First;

        if (this.blocks.length >= 2)
            this.blocks[1].direction = Block.DirectionType.Middle;

        if (this.blocks.length - 2 > 0)
            this.blocks[this.blocks.length - 2].direction = Block.DirectionType.Middle;

        this.blocks[this.blocks.length - 1].direction = Block.DirectionType.Last;
    }

    toJson()
    {
        const result = [];

        this.blocks.forEach(block =>
        {
            const val = block.content.value;

            if (!val)
                return;

            result.push({ name: block.content.name, value: val, pinned: block.pinned } );
        });

        return JSON.stringify(result, null, 0);
    }

    static parse(json, layout)
    {
        const editor = new Editor(layout);
        const blocks = JSON.parse(json);

        if (blocks.length == 0)
            return editor;

        blocks.forEach(block =>
        {
            let content = null;

            switch(block.name)
            {
            case "text":
                {
                    console.log("Detected block: text...");
                    content = new Text();
                    break;
                }
            case "title":
                {
                    console.log("Detected block: title...");
                    content = new Title();
                    break;
                }
            case "media":
                {
                    console.log("Detected block: media...");
                    content = new Media();
                    break;
                }
            }

            if (!content)
            {
                console.error("The block type could not be determined!")
                return;
            }

            editor.add(content);

            const lastBlock = editor.blocks[editor.blocks.length - 1];
            lastBlock.pinned = block.pinned;
            lastBlock.content.value = block.value;
        });

        return editor;
    }
}