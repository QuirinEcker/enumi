const http = module.require('http');
const fs = module.require('fs');

const server = http.createServer(function (req, res) {
    if (req.url === '/')
        respondWithFile(res, req, './index.html', 'text/html');
    else if (req.url === '/style/main.css')
        respondWithFile(res, req, './style/main.css', 'text/css');
    else if (req.url === '/style/listSideBar.css')
        respondWithFile(res, req, './style/listSideBar.css', 'text/css');
    else if (req.url === '/style/listBoxes.css')
        respondWithFile(res, req, './style/listBoxes.css', 'text/css');
    else if (req.url === '/scripts/showSetting.js')
        respondWithFile(res, req, './scripts/showSetting.js', 'text/javascript');
    else if (req.url === '/scripts/add.js')
        respondWithFile(res, req, './scripts/add.js', 'text/javascript');
    else if (req.url === '/img/logo.svg')
        respondWithFile(res, req, './img/logo.svg', 'image/svg');
    else if (req.url === '/img/share.svg')
        respondWithFile(res, req, './img/share.svg', 'image/svg');
    else if (req.url === '/img/templates.svg')
        respondWithFile(res, req, './img/templates.svg', 'image/svg');
    else if (req.url === '/img/settings.svg')
        respondWithFile(res, req, './img/settings.svg', 'image/svg');
});

function respondWithFile(res, req, path, type) {
    res.writeHead(200, {'Content-Type': `${type}`});
    fs.readFile(`${path}`, {encoding: 'utf-8'}, function (err, data) {
        if (err)
            console.error(err.message);
        else
            res.write(data);
        res.end();
    });
}

server.listen(3000);