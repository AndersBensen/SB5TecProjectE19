const {Server} = require('ws');
const game = require('./game.js');
var exports = module.exports = {};

let servers = [];



let clientUpdate = (data) => {
    data = JSON.parse(data);
    console.log(data);
    if (data.name !== undefined) {
        if (data.keydown !== undefined) {

        } else {
            game.addPlayer(data.name);
        }
    }
    
}

let sendData = (gameData) => {
    // console.log(servers);
    
    servers[0].clients.forEach(c => c.send(JSON.stringify(gameData)));
    // servers[0].client.send(JSON.stringify(gameData));
}

exports.newServer = function() {
    let id = 'asdf';
    let wsServer = new Server({port: 7000, path: '/' + id});
    servers.push(wsServer);
    // console.log(servers[0]["options"]["path"]);

    wsServer.on('connection', (ws) => {
        console.log(id);
        ws.on('close', () => console.log('Closing connection..'));

        ws.on('message', (data) => {
            clientUpdate(data);
        });
        ws.on('keydown', (data) => {
            console.log(data);
            
        });
    });

    game.start(sendData);

    console.log('New server socket');
}