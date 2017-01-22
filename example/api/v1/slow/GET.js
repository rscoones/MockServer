module.exports = function(req, config) {
  var obj = {
    headers: {},
    status: 200,
    body: {
      test: "deferred"
    }
  };

  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(obj);
    }, 2000)
  });
};
