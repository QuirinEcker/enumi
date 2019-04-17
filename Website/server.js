const http = module.require('http');
const fs = module.require('fs');
const Config = require('./Config');

const server = http.createServer(function (req, res) {
    if (req.url === '/') {
        respondWithFile(res, req, './index.html', 'text/html');
        console.log('Pulling files from Webserver: ')
    } else {
        respondWithFile(res, req, '.' + req.url, Config.getMimeType(req.url));
    }

    console.log(` => ${req.url}`);
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