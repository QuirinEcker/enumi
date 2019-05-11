class SettingBar {
    hideSetting(setting) {
        setting.children[0].style.top = "50%";
        setting.children[0].style.transform = "rotate(360deg)";
    }

    showSetting(setting) {
        setting.children[0].style.top = "0%";
        setting.children[0].style.transform = "rotate(-360deg)";
    }
}

export {SettingBar};