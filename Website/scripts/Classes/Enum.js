import {writeIntoEnumList} from "/scripts/Prompt.js";

class Enum {
    constructor(name, catigories, description, icon, banner) {
        this.name = name;
        this.description = description;
        this.catigories = catigories;
        this.creationDate = Date.now();
        this.icon = icon;
        this.banner = banner;
    }

    loadListIntoUI() {
        writeIntoEnumList(this)
    }
}

export {Enum};