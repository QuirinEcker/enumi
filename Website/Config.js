const mime_types = {
    '.svg': 'image/svg+xml',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
};

class Config {
    static getMimeType(filename) {
        console.log(filename)
        let extention = filename.split('.')[1];

        return mime_types['.' + extention];
    }
}

module.exports = Config;

