var Q = require('q');

module.exports = function(req, config) {
  var obj = {
    headers: {},
    status: 200,
    body: {
      test: "deferred"
    }
  };

  var deferred = Q.defer();

  setTimeout(function() {
    deferred.resolve(obj);
  }, 2000)

  return deferred.promise;
};
