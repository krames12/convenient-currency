const request = require('request');
const express = require('express');
const app = express();

const port = process.env.PORT || 8080;
//sets EJS as the templating language
app.set('view-engine', 'ejs');
//allows access to the public folder from the server
app.use('/public', express.static('public'));

//sets default render route
app.get('/', (req, res) => {
  res.render('index');
});