'use strict';

var fs = require('fs');
var ursa = require('ursa');
var pubkey;
var privkey;
var msg;

console.log('#######################################################');
console.log('Nonesense: Reverse Public -> Private, Private -> Public');
console.log('#######################################################\n');

pubkey = ursa.createPrivateKey(fs.readFileSync('./bob/privkey.pem'));
privkey = ursa.createPublicKey(fs.readFileSync('./bob/pubkey.pem'));

console.log('Encrypt with Private (called public)');
msg = privkey.encrypt("Everything is going to be 200 OK", 'utf8', 'base64');
console.log('encrypted', msg, '\n');

console.log('Decrypt with Public (called private)');
msg = pubkey.decrypt(msg, 'base64', 'utf8');
console.log('decrypted', msg, '\n');
