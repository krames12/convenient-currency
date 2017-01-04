const http = require('http');
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
  getConversionData().then((data) => { res.render('index', {info: data}); }).catch((err) => { console.log(err); });
});

//request for currency data
function getConversionData() {
  return new Promise((resolve, reject) => {
    http.get(apiUrl, (res) => {
      res.setEncoding('utf8');
      
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);
      
      //variable for the body of the response to reside in.
      var body = '';
      
      //upon recieving of data, add it to the body variable
      res.on('data', (data) => {
        body += data;
      });
      
      //once completed, resolve or reject the promise based on status code
      res.on('end', () => {
        try {
          var parsed = JSON.parse(body);
        } catch (err) {
          return reject(err);
        }
        if(res.statusCode !== 404 || 504) {
          resolve(parsed);
        } else {
          reject();
        }
      //handeling any error in the process
      }).on('error', (err) => {
        reject(err);
      })
    });
  });
}
//necessary for server to actually run
app.listen(port, () => {
  console.log('app is now listening to port', port);
})