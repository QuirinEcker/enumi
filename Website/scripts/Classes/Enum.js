import {writeIntoEnumList} from "/scripts/Prompt.js";

class Enum {
    constructor(name, catigories, description, owner) {
        this.name = name;
        this.description = description;
        this.catigories = catigories;
        this.creationDate = Date.now();
        this.owner = owner;
    }

    loadListIntoUI() {
        writeIntoEnumList(this)
    }
}

export {Enum};