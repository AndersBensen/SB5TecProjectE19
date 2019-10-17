/* const connect = require('connect');

let serverStatic = require('serve-static');

connect().use(serverStatic(__dirname)).listen(8000, () => {
    console.log('Server running on 8000...');
});

console.log('loaded');


 */

const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../server.html'));
});



app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});