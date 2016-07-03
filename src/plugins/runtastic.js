var Bluebird = require('bluebird');
var Runtastic = require('runtastic-js');

module.exports = runtasticPlugin;

function runtasticPlugin(opts) {
  return function(files, metalsmith, done) {
    var metadata = metalsmith.metadata();
    var config = metadata.runtastic;
    var client = Bluebird.promisifyAll(new Runtastic(config.login, config.password));
    client.loginAsync().then(function() {
      return client.fetchActivitiesAsync(null, null);
    }).then(function(data) {
        return Bluebird.all(data.map(function(idAndTimestamp) {
          var activityId = idAndTimestamp[0];
          return client.fetchActivityDetailsAsync(activityId, null)
        }));
    }).then(function(activities) {
      files['runtastic-data.json'] = {
        mode: '0644',
        contents: new Buffer(JSON.stringify(activities, null, 2), 'utf-8')
      };
      done();
    });
  }
}
