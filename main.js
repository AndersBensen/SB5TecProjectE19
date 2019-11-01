let wsServer = require('./server/wsServer.js');

const express = require('express');
const path = require('path');
const app = express();
const port = 8000; 

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {git 
    res.redirect('client.html');
});

app.get('/new-server', (req, res) => {
    let serverPort = wsServer.newServer();
    res.json({port: serverPort});
    // res.redirect("/");
});

app.get('/get-amount-of-players', (req, res) => {
    let amountOfPlayers = wsServer.getAmountOfPlayers(req);
    res.json({amount: amountOfPlayers});
});

app.get('/get-servers', (req, res) => {
    res.redirect("/");
    console.log(wsServer.servers);
    return JSON.stringify(wsServer.servers);
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});