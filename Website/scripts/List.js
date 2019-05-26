import {Item} from "./Classes/Item.js";
import {currentEnum} from "./index.js";

class List {
    refreshItems(enumList) {
        let recoomendedList = document.querySelector("#recomended-content-box");
        let currentList = document.querySelector("#current-content-box")
        let items = enumList.items;
        let recommendedItems = enumList.recommendedItems;

        while (currentList.children.length > 0) {
            currentList.removeChild(currentList.lastChild);
        }

        while (recoomendedList.children.length > 1) {
            if (!recoomendedList.lastElementChild.classList.contains("plus-item"))
                recoomendedList.removeChild(recoomendedList.lastChild);
        }

        items.forEach((item) => {
            let newBox = document.createElement("div")
            newBox.classList.add("item");
            newBox.addEventListener("click", () => {
                this.moveRecommended(item, enumList)
            });

            let newTextBox = document.createElement("span");
            newTextBox.textContent = item.name;
            let iconBox = document.createElement("img");
            iconBox.src = item.icon;
            newBox.appendChild(iconBox);
            newBox.appendChild(newTextBox);
            currentList.appendChild(newBox);
        });

        recommendedItems.forEach((item) => {
            let newBox = document.createElement("div");
            newBox.classList.add("item");
            newBox.addEventListener("click", () => {
                this.moveCurrent(item, enumList)
            });

            let newTextBox = document.createElement("span");
            newTextBox.textContent = item.name;
            let iconBox = document.createElement("img")
            iconBox.src = item.icon;
            newBox.appendChild(iconBox);
            newBox.appendChild(newTextBox);
            recoomendedList.appendChild(newBox);
        })

        this.adjustItemSize();
    }

    createItem(enumList, name, catigory, icon) {
        let item = new Item(name, catigory, icon);
        enumList.items.push(item);
        this.refreshItems(enumList);
    }

    displayItemsBySearch(search, list) {
        list.forEach((item) => {
            let itemName = item.children[1].textContent;
            if (itemName.includes(search)) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
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

    moveCurrent(item, enumList) {
        let current = enumList.recommendedItems;
        let focus = enumList.items;
        let itemIndex = current.indexOf(item);
        current.splice(itemIndex, 1)

        focus.push(item);
        enumList.recommendedItems = current;
        enumList.items = focus;
        this.refreshItems(currentEnum);
    }

    moveRecommended(item, enumList) {
        let current = enumList.items;
        let focus = enumList.recommendedItems;
        let itemIndex = current.indexOf(item);
        current.splice(itemIndex, 1)

        focus.push(item);
        enumList.items = current;
        enumList.recommendedItems = focus
        this.refreshItems(currentEnum);
    }

    clearSearchBars() {
        let searchbars = Array.from(document.querySelectorAll(".search-box"));

        searchbars.forEach((item) => {
            item.lastElementChild.value = "";
        })
    }
}

export {List}
