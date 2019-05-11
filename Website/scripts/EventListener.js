import {prompt} from "./Prompt.js";
import {settingBar} from "./SettingBar.js"

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
    promptSubmit.addEventListener("click", () => {prompt.createNewEnum();});

    document.addEventListener('keydown', function(event) {prompt.runKeyBoardShortCut(event);});

    let settings = Array.from(document.querySelectorAll(".settings-point"))

    settings.forEach((setting) => {
        setting.addEventListener("mouseover", function() {settingBar.showSetting(setting);});
        setting.addEventListener("mouseout", function() {settingBar.hideSetting(setting)});
    });
});