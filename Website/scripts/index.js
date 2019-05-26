import {Prompt} from "./Prompt.js";
import {SettingBar} from "./SettingBar.js";
import {List} from "./List.js";
import {ItemCreatePrompt} from "./ItemCreatePrompt.js"
import {Konto} from "./Classes/Konto.js";

let prompt = new Prompt();
let settingBar = new SettingBar();
let list = new List();
let itemCreatePrompt = new ItemCreatePrompt();
let currentKonto = new Konto("Max", "Mustermann", "m.mustermann@gmail.com");
let currentEnum;

function listMatcher() {
    let enums = currentKonto.enums;

    enums.forEach((enumList) => {
        let children = Array.from(this.parentElement.children);

        children.forEach((item) => {
            if (item !== this) {
                item.style.background = "#007943";
            }
        });

        if (enumList.name == this.textContent) {
            list.refreshItems(enumList);
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

    let addItemButton = document.querySelector('#addItem-button');
    let currentSearchBar = document.querySelector('#search-currrent');
    let recommendedSearchBar = document.querySelector('#search-recommended');

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

    document.addEventListener('keydown', function(event) {prompt.runKeyBoardShortCut(event, currentKonto);});

    let settings = Array.from(document.querySelectorAll(".settings-point"))

    settings.forEach((setting) => {
        setting.addEventListener("mouseover", function() {settingBar.showSetting(setting);});
        setting.addEventListener("mouseout", function() {settingBar.hideSetting(setting)});
    });

    addItemButton.addEventListener("click", () => {
        let name = itemCreatePrompt.openPrompt();
        list.createItem(currentEnum, name, "/img/listIcons/settings.svg", "/img/listIcons/settings.svg")
    });

    list.adjustItemSize();
    window.onresize = () => {
        list.adjustItemSize();
    }

    currentSearchBar.addEventListener('input', function () {
        let currentListBox = Array.from(document.querySelector("#current-content-box").children);
        list.displayItemsBySearch(this.value, currentListBox);
    })

    recommendedSearchBar.addEventListener('input', function () {
        let recomendedListBox = Array.from(document.querySelector("#recomended-content-box").children);
        list.displayItemsBySearch(this.value, recomendedListBox);
    })
});

export {listMatcher};
export {currentEnum}