var Bluebird = require('bluebird');
var prompt = Bluebird.promisifyAll(require('prompt'));
var ini = require('ini');
var fs = require('fs');
var path = require('path');
var os = require('os');

module.exports = makeConfig;

function makeConfig(opts) {
  var file = path.resolve(os.homedir(), '.runtastic');
  var fields = {
    properties: {
      login: {required: true},
      password: {required: true, hidden: true}
    }
  };

  return function(files, metalsmith, done) {
    var metadata = metalsmith.metadata();
    var fillMetadata = function(config) {
      metadata.runtastic = config;
      done();
    };

    fs.stat(file, function(err, stat) {
      if(err) {
        console.log('File ' + file + ' not found');
        prompt.start();
        prompt.getAsync(fields).then(fillMetadata);
      }
      else {
        console.log('File ' + file + ' found');
        var config = ini.parse(fs.readFileSync(file, 'utf-8'))
        if(!config.login || !config.password) {
          throw new Error('Missing parameters in ' + file);
        }
        else fillMetadata(config);
      }
    });
  };
}
