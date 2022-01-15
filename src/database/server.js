const jsonServer = require('json-server');
var http = require('http');
var express = require('express');
var handler = express();
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'mock.json'));
const middlewares = jsonServer.defaults();

// // Set default middlewares (logger, static, cors and no-cache)
// server.use(middlewares);

// // To handle POST, PUT and PATCH you need to use a body-parser
// // You can use the one used by JSON Server
// server.use(jsonServer.bodyParser);

// server.use(router);

// let port = 80;
// server.listen(port, () => {
//     console.log(`JSON Server is running, port(${port})`);
// });

handler.get('/', function (req, res) {
    res.send('test');
});

var server = http.createServer(handler);
server.listen(5000);

//npx json-server mock.json --port 3002
