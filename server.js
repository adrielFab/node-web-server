/**
 * Created by Adriel on 1/2/2017.
 */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const index_data = require('./model/index-model');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server file');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.get('/', (req, res) => {
    res.render('home.hbs', {
        indexData : index_data.intro
    })
});

app.get('/project1', (req, res) => {
    res.render('project1.hbs')
});

app.get('/project2', (req, res) => {
    res.render('project2.hbs')
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
