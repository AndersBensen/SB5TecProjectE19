const {Server} = require('ws');
var exports = module.exports = {};

let servers = [];


exports.newServer = function() {
    let id = 'asdf';
    let wsServer = new Server({port: 7000, path: '/' + id});
    servers.push(wsServer);
    // console.log(servers[0]["options"]["path"]);

    wsServer.on('connection', ws => {
        console.log(id);
        ws.on('close', () => console.log('Closing connection..'));
    });
    
    console.log('New server socket');
}
