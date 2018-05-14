const express    = require('express');
const app        = express();
const fs         = require('fs');
const bodyParser = require('body-parser');
const PORT       = process.env.PORT || 3000;
const request    = require('request');
const path       = require('path');

//Parse some bodies:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require('./routes/questionRoutes')(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/wikiAPI', (req, res) => {
    request('https://en.wikipedia.org/w/api.php?action=parse&page=List_of_highest-grossing_films&prop=text&format=json', (err, body, html) => {
        res.send(body.body);
    })
});

app.listen(PORT, () => {
    console.log('up and running on ' + PORT);
})