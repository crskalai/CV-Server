var CryptoJS = require("crypto-js");
const e = require("express");
var data = JSON.stringify({abc: 'kannan raman'});

var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");

console.log(encrypted.salt.toString)
