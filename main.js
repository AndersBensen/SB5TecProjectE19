let wsServer = require('./wsServer.js');

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 8000;

/* app.use(cors({
    origin: '*'
})); */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/server.html'));

});

app.get('/new-server', (req, res) => {
    /* res.writeHead(200, {'Access-Control-Allow-Origin': '*'}); */
    wsServer.newServer();
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});