const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;

    if (req.url == '/img/logo_topbar.png') {
        res.setHeader('Content-Type', 'image/png');

        fs.readFile('img/logo_topbar.png', (err, data) => {
            if (err) {
                res.end(JSON.stringify(err));
                return;
            }
            res.end(data);
        });
    } else {
        res.setHeader('Content-Type', 'text/html');

        fs.readFile('index.html', 'utf8', (err, data) => {
            if (err) {
                res.end(JSON.stringify(err));
                return;
            }
            res.end(data);
        });
    }

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});