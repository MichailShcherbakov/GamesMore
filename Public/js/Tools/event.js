export default class Event
{
    #buffer = [];
    #suspend = false;

    emit(...args)
    {
        if (this.suspend)
            return;
            
        this.#buffer.forEach(listener =>
        {
            listener(...args);
        });
    }

    add(listener)
    {
        this.#buffer.push(listener);
    }

    remove(listener)
    {
        let index = this.#buffer.indexOf(listener);

        if (index == -1)
        {
            console.error("The listener was not found!");
            return;
        }

        this.#buffer.splice(index, 1);
    }

    get suspend()
    {
        return this.#suspend;
    }

    set suspend(value)
    {
        this.#suspend = value;
    }
}