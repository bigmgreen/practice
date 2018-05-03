const express = require('express');
const app = express();
const l = console.log;

app.use(express.static('app'));
app.use(express.static('test'));

const server = app.listen(3000, ()=> {
    const host = server.address().address || 'localhost';
    const port = server.address().port;

    l(`http://${host}:${port}`);
});