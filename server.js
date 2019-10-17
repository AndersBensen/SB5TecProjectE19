const {Server} = require('ws');
/* var exports = module.exports = {}; */

let servers = [];


module.exports.newServer = function() {
    let id = 'asdf';
    let wsServer = new Server({port: 7000, path: '/' + id});
    servers.push(wsServer);
    console.log('new server called');
}
/* 
wsServer.on('connection', ws => {
    console.log(ws);
    ws.on('close', () => console.log('Closing connection..'));
});
 */