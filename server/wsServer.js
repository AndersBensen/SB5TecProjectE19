const {Server} = require('ws');
const game = require('./game.js');
var exports = module.exports = {};

exports.servers = servers = [];

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
    for(let i = 0; i < servers.length; i++) {
        servers[i].clients.forEach(c => c.send(JSON.stringify(gameData)));
    }
    //servers[0].clients.forEach(c => c.send(JSON.stringify(gameData)));
    //servers[0].client.send(JSON.stringify(gameData));
}

exports.newServer = function() {
    // let id = 'asdf';
    // let wsServer = new Server({port: 7000, path: '/' + id});
    let port = makeNewPort();
    console.log(port);
    let wsServer = new Server({port: port});
    servers.push(wsServer);
    //wsServer.clients.forEach(c => c.send(JSON.stringify({port: port})));

    wsServer.on('connection', (ws) => {
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

let makeNewPort = () => {
    let port = 7000; 
    let maxPort = 7999;  
    if (servers.length != 0) {
        let newPort = getMaxPort();
        if (newPort == maxPort) {
            console.log("All the ports are taken.");
            return null; 
        } else {
            port = ++newPort; 
        }
    }
    return port; 
}

let getMaxPort = () => {
    let port = 0; 
    for(let i = 0; i < servers.length; i++) {
        let tmpPort = servers[i]["options"]["port"];
        if (tmpPort > port) {
            port = tmpPort; 
        }
    }
    return port; 
}