const {Server} = require('ws');
var exports = module.exports = {};

let servers = [];


exports.newServer = function() {
    let id = 'asdf';
    let wsServer = new Server({port: 7000, path: '/' + id});
    servers.push(wsServer);
    // console.log(servers[0]["options"]["path"]);

    wsServer.on('connection', (ws) => {
        console.log(id);
        ws.on('close', () => console.log('Closing connection..'));

        wsServer.on('message', (data) => {
            console.log(data);
            console.log("anything");
            
            
        });
        wsServer.on('keydown', (data) => {
            console.log(data);
            
        });
    });

    

    console.log('New server socket');
}
