const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('/*', (req, res) => {
        fs.readdir(__dirname, (err, files) => {
            files.forEach(file => {
                console.log(file);
            });
        });
        console.log(__dirname);
        res.sendFile(__dirname + '/index.html');
    });
}

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
