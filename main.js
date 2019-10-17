let wsServer = require('./wsServer.js');

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 8000;

app.use(cors({
    origin: '127.0.0.1'
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/server.html'));

});

app.get('/new-server', (req, res) => {
    wsServer.newServer();
    res.header('Access-Control-Allow-Origin', '*');

});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});