import fs from "fs";

const fileSystem = {
    getAllFilesOfDir: function (path) {
        fs.readdir("/img/listIcons")
    }
};

export {fileSystem}