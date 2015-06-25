'use strict';

var PromiseA = require('bluebird').Promise;
var fs = PromiseA.promisifyAll(require('fs'));
var path = require('path');
var ursa = require('ursa');
var mkdirpAsync = PromiseA.promisify(require('mkdirp'));

function keypair(pathname) {
  var key = ursa.generatePrivateKey(1024, 65537);
  var privpem = key.toPrivatePem();
  var pubpem = key.toPublicPem();
  var privkey = path.join(pathname, 'privkey.pem');
  var pubkey = path.join(pathname, 'pubkey.pem');

  return mkdirpAsync(pathname).then(function () {
    return PromiseA.all([
      fs.writeFileAsync(privkey, privpem, 'ascii')
    , fs.writeFileAsync(pubkey, pubpem, 'ascii')
    ]);
  }).then(function () {
    return key;
  });
}

if (require.main === module) {
  return PromiseA.all([
    keypair('bob')
  , keypair('alice')
  ]).then(function (keys) {
    console.log('generated %d keypairs', keys.length);
  });
}

module.exports.keypair = keypair;
