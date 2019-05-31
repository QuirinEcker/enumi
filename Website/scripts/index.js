import {Prompt} from "./Prompt.js";
import {SettingBar} from "./SettingBar.js";
import {List} from "./List.js";
import {ItemCreatePrompt} from "./ItemCreatePrompt.js"
import {Konto} from "./Classes/Konto.js";
import {AddItemPrompt} from "./AddItemPrompt.js";
import {Enum} from "./Classes/Enum.js";

let prompt = new Prompt();
let settingBar = new SettingBar();
let list = new List();
let itemCreatePrompt = new ItemCreatePrompt();
let addItemPrompt = new AddItemPrompt();

let name = localStorage.getItem("username");
let password = localStorage.getItem("password");
let email = localStorage.getItem("email");
let currentKonto = new Konto(name, password, email);

let itemList = document.querySelector("#current-list");
let recomendedList = document.querySelector("#recommended-list");
itemList.style.display = "none";
recomendedList.style.display = "none";

let currentEnum;

console.log("Welcome " + currentKonto.username);

function listMatcher() {
    let enums = currentKonto.enums;
    let itemList = document.querySelector("#current-list");
    let recomendedList = document.querySelector("#recommended-list");

    itemList.style.display = "flex";
    recomendedList.style.display = "flex";

    enums.forEach((enumList) => {
        let children = Array.from(this.parentElement.children);

        children.forEach((item) => {
            if (item !== this) {
                item.style.background = "#007943";
            }
        });

        if (enumList.id == this.id) {
            list.refreshItems(enumList);
            list.clearSearchBars();
            currentEnum = enumList;
            this.style.background = "#004E27";
        }
    });
}

window.addEventListener("load", () => {
    let addButton = document.querySelector("#enum-add");
    let promptBackground = document.querySelector("#prompt-background");
    let promptCancel = document.querySelector('#cancel-button');
    let promptSubmit = document.querySelector('#submit-button');
    let nameInput = document.querySelector('#input-list-name');
    let iconTitle = document.querySelector("#input-icon-title");
    let iconContainer = document.querySelector("#input-list-icon");
    let iconContainerChildren = Array.from(iconContainer.children);
    let iconTitlePreview = document.querySelector("#title-bar-current-icon");
    let iconSelectPreview = document.querySelector("#current-icon");

    let currentSearchBar = document.querySelector('#search-currrent');
    let recommendedSearchBar = document.querySelector('#search-recommended');

    let addItemButton = document.querySelector('#addItem-button');
    let addItemPromptCancel = document.querySelector("#addItem-prompt-cancel-button");
    let addItemPromptSubmit = document.querySelector("#addItem-prompt-submit-button");
    let addItemPromptBackground = document.querySelector("#addItem-prompt-background");
    let addItemPromptInputName = document.querySelector("#addItem-prompt-input-name");

    iconTitlePreview.src = prompt.icon;
    iconSelectPreview.src = prompt.icon;

    iconContainerChildren.forEach((item) => {
        item.addEventListener("click", function() {prompt.selectIcon(this);});
    });

    iconTitle.addEventListener("click", function() {prompt.enrollIconSelect(this, iconContainer);});
    nameInput.addEventListener("input", function() {prompt.displayTextToPreview(this)});

    addButton.addEventListener("click", () => {prompt.openPrompt();});
    promptBackground.addEventListener("click", () => {prompt.closePrompt()});
    promptCancel.addEventListener("click", () => {prompt.closePrompt();});
    promptSubmit.addEventListener("click", () => {prompt.createNewEnum(currentKonto);});

    document.addEventListener('keydown', function(event) {
        if (event.keyCode == 27) {
            prompt.closePrompt();
            addItemPrompt.closePrompt()
        } else if (event.keyCode == 13) {
            if (prompt.isOpened())
                prompt.createNewEnum(currentKonto);
            if (addItemPrompt.isOpened()) {
                list.createItem(currentEnum, addItemPrompt.getData().name, addItemPrompt.getData().catigory, addItemPrompt.getData().icon);
                addItemPrompt.closePrompt()
            }
        }
    });

    let settings = Array.from(document.querySelectorAll(".settings-point"))

    settings.forEach((setting) => {
        setting.addEventListener("mouseover", function() {settingBar.showSetting(setting);});
        setting.addEventListener("mouseout", function() {settingBar.hideSetting(setting)});
    });

    list.adjustItemSize();
    prompt.adjustListIconSize();
    window.onresize = () => {
        list.adjustItemSize();
        prompt.adjustListIconSize()
    };

    currentSearchBar.addEventListener('input', function () {
        let currentListBox = Array.from(document.querySelector("#current-content-box").children);
        list.displayItemsBySearch(this.value, currentListBox);
    })

    recommendedSearchBar.addEventListener('input', function () {
        let recomendedListBox = Array.from(document.querySelector("#recomended-content-box").children);
        list.displayItemsBySearch(this.value, recomendedListBox);
    })

    addItemButton.addEventListener("click", () => {
        addItemPrompt.openPrompt()
    });
    addItemPromptBackground.addEventListener("click", () => {
       addItemPrompt.closePrompt()
    });

    addItemPromptCancel.addEventListener("click", () => {
       addItemPrompt.closePrompt()
    });

    addItemPromptSubmit.addEventListener("click", () => {
       list.createItem(currentEnum, addItemPrompt.getData().name, addItemPrompt.getData().catigory, addItemPrompt.getData().icon);
       addItemPrompt.closePrompt();
    });

    addItemPromptInputName.addEventListener("input", () => {
       addItemPrompt.refreshMenuBarTitle();
    });

});

export {listMatcher};
export {currentEnum};