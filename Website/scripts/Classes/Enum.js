class Enum {
    constructor(name, settings, catigories, sortingOrder, description, owner) {
        this.name = name;
        this.description = description;
        this.settings = settings;
        this.catigories = catigories;
        this.sortingOrder = sortingOrder;
        this.creationDate = date.now();
        this.owner = owner;
    }
}

module.exports = Enum;