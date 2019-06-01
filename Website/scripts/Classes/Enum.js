let numberOfEnums = 0;

class Enum {
    constructor(name, catigories, description, icon, banner) {
        this.id = "en" + numberOfEnums;
        this.name = name;
        this.description = description;
        this.catigories = catigories;
        this.creationDate = Date.now();
        this.iconPicture = icon;
        this.banner = banner;
        this.items = new Array();
        this.recommendedItems = new Array();
        numberOfEnums++;
    }

    static getNextID() {
        return numberOfEnums;
    }
}

export {Enum};