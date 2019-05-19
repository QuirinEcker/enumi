import {Item} from "./Classes/Item.js";

class List {
    refreshItems(enumList) {
        let recoomendedList = document.querySelector("#recommended-list");
        let currentList = document.querySelector("#current-content-box")
        let items = enumList.items;

        items.forEach((item) => {
           let newBox = document.createElement("div")
           newBox.classList.add("item");
           let newTextBox = document.createElement("span");
           newTextBox.textContent = item.name;
           let iconBox = document.createElement("img");
           iconBox.src = item.icon;
           newBox.appendChild(iconBox);
           newBox.appendChild(newTextBox);
           currentList.appendChild(newBox);
        });
    }

    createItem(enumList, name, catigory, icon) {
        let item = new Item(name, catigory, icon);
        enumList.items.push(item);
        this.refreshItems(enumList);
    }

    adjustItemSize() {
        let currentListBox = Array.from(document.querySelector("#current-content-box").children);
        let recomendedListBox = Array.from(document.querySelector("#recomended-content-box").children);
        let allItems = currentListBox.concat(recomendedListBox);

        allItems.forEach((item) => {
           item.style.height = `${item.clientWidth}px`
        });

        allItems.forEach((item) => {
           item.style.height = `${item.clientWidth}px`
        });
    }
}

export {List}
