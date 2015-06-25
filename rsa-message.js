'use strict';

var fs = require('fs');
var ursa = require('ursa');
var msg;
var sig;
var enc;

var privkeyBob = ursa.createPrivateKey(fs.readFileSync('./bob/privkey.pem'));
var pubkeyBob = ursa.createPublicKey(fs.readFileSync('./bob/pubkey.pem'));
//var signerBob = ursa.createSigner('sha256');

var privkeyAlice = ursa.createPrivateKey(fs.readFileSync('./alice/privkey.pem'));
var pubkeyAlice = ursa.createPublicKey(fs.readFileSync('./alice/pubkey.pem'));
//var verifierAlice = ursa.createVerifier('sha256');

msg = "Everything is going to be 200 OK";

console.log('Encrypt with Alice Public; Sign with Bob Private');
enc = pubkeyAlice.encrypt(msg, 'utf8', 'base64');
sig = privkeyBob.hashAndSign('sha256', msg, 'utf8', 'base64');
console.log('encrypted', msg, '\n');
console.log('signed', sig, '\n');

console.log('Decrypt with ALice Private; Verify with Bob Public');
if (msg !== privkeyAlice.decrypt(enc, 'base64', 'utf8')) {
  throw new Error("invalid decrypt");
}
if (!pubkeyBob.hashAndVerify('sha256', new Buffer(msg).toString('base64'), sig, 'base64')) {
  throw new Error("invalid signature");
}
console.log('decrypted', msg, '\n');
