let wsServer = require('./wsServer.js');

const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('client.html');
});

app.get('/new-server', (req, res) => {
    wsServer.newServer();
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});