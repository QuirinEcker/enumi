import {Item} from "./Classes/Item.js";

class List {
    refreshItems(enumList) {
        let recoomendedList = document.querySelector("#recommended-list");
        let currentList = document.querySelector("#current-list")
        let items = enumList.items;

        items.forEach((item) => {
           let newBox = document.createElement("div")
           newBox.textContent = item.name;
           currentList.appendChild(newBox);
        });
    }

    createItem(enumList, name, catigory, icon) {
        let item = new Item(name, catigory, icon);
        enumList.items.push(item);
        this.refreshItems(enumList);
    }
}

export {List}