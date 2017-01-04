const request = require('request');
const express = require('express');
const app = express();

//Using USD as a base for now. Would like to have the base be dynamic but we'll get there maybe...
const apiUrl = "https://api.fixer.io/latest?base=USD"

const port = process.env.PORT || 8080;
//sets EJS as the templating language
app.set('view engine', 'ejs');
//allows access to the public folder from the server
app.use('/public', express.static('public'));

//sets default render route
app.get('/', (req, res) => {
  let currencyData = getConversionData();
  res.render('index', {data: currencyData});
});

//request for currency data
function getConversionData() {
  request(apiUrl, (err, res, body) => {
    if(!err && res.statusCode == 200) {
      console.log('fixer status', res.statusCode);
      var parsedBody = JSON.parse(body);
      return {
        "status": true,
        "date": parsedBody.date,
        "rates": parsedBody.rates
      };
    }
    else if(err || res.statusCode !== 200) {
      return {
        "status": false
      }
    }
  });
}

//necessary for server to actually run
app.listen(port, () => {
  console.log('app is now listening to port', port);
})