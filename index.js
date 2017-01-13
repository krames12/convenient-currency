const express = require('express');
const app = express();

//Using USD as a base for now. Would like to have the base be dynamic but we'll get there maybe...
const apiUrl = "http://api.fixer.io/latest?base=USD"

const port = process.env.PORT || 8080;


//sets EJS as the templating language
app.set('view engine', 'ejs');
//allows access to the public folder from the server
app.use('/public', express.static('public'));

//sets default render route
app.get('/', (req, res) => {
  res.render('index', {info: currencyTypes});
});

const currencyTypes = [
  "AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD",
  "HRK","HUF","IDR","ILS","INR","JPY","KRW","MXN","MYR","NOK","NZD",
  "PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","USD","ZAR"
]

//necessary for server to actually run
app.listen(port, () => {
  console.log('app is now listening to port', port);
})