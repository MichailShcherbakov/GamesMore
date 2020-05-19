import IExtPlugin from "../ext-plugin.js"

export default class EmptyExtPlugin extends IExtPlugin
{
    constructor() 
    { 
        super(); 
    }

    render()
    {
        this.onRendered.emit();
    }
}