var express = require('express')
var miootrouters = express.Router()

// middleware that is specific to this router
miootrouters.use(function timeLog (req, res, next) {
    console.log('Requested URI Path : ', req.url,req.params)
    next()
  })
// define the home page route
miootrouters.get('/', function (req, res) {
    // json data
var jsonData = req.query.operator;
 
// parse json
var jsonParsed = JSON.parse(jsonData);
 
// access elements
console.log(jsonParsed.name);
    res.send('Birds home page');
})
 
// define the about route
miootrouters.get('/about', function (req, res) {
  res.send('About birdswewe')
})
 
miootrouters.get('/logout', function (req, res) {
  res.send('Logout')
})
module.exports = miootrouters