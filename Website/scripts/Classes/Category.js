class Category {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    compare(o){
        return this.id.compare(o.id)
    }
}

export {Category};