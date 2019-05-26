const mime_types = {
    '.svg': 'image/svg+xml',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': "application/javascript"
};

class Config {
    static getMimeType(filename) {
        let extention = filename.split('.')[1];
        return mime_types['.' + extention];
    }
}

module.exports = Config;

