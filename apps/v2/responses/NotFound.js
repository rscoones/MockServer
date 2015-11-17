module.exports = function(req) {
  return {
    headers: [],
    status: 404,
    type: "json",
    body: {
      url: req.originalUrl,
      method: req.method,
      status: 404,
      error: "Not found"
    }
  };
};
