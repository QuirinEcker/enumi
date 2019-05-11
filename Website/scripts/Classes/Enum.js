class Enum {
    constructor(name, catigories, description, icon, banner) {
        this.name = name;
        this.description = description;
        this.catigories = catigories;
        this.creationDate = Date.now();
        this.iconPicture = icon;
        this.banner = banner;
        this.items = new Array();
    }
}

export {Enum};