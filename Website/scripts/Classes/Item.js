let numberOfItems = 0;

class Item {
    constructor(name, catigory, icon) {
        this.id = numberOfItems;
        this.name = name;
        this.catigory = catigory;
        this.icon = icon;
        numberOfItems++;
    }
}

export {Item};