module.exports = function(req, resp, config) {
  return {
    headers: [],
    status: 200,
    body: {
      firstName: "Bob",
      surName: "Params",
      type: req.params.id
    }
  };
}
