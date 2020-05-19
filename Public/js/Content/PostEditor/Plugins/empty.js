import IPlugin from "../plugin.js"

export default class EmptyPlugin extends IPlugin
{
    constructor() 
    { 
        super(); 
    }

    render()
    {
        this.onRendered.emit();
    }

    initEvets()
    {
        
    }
}
