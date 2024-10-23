const http = require('http');
const fs=require("fs");
// builtin for creating http server
// express --> external modules to create http server 

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // res.writeHead(200, { 'Content-Type': 'text/plain' });
        // res.end('Hello, World!');
        const data = fs.createReadStream('./data.txt',"utf-8");
        data.pipe(res);

    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About Page');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});