const express = require('express');
const app = express();

app.get('/name', (req, res) => {
    res.send(
        `<!DOCTYPE html>
        <html><head><title>Name</title></head>
        <body><p>Saim</p></body
        </html>
    `);
});

module.exports = app;
