module.exports = function(req) {
  return {
    headers: {},
    status: 200,
    body: {
      firstName: "Bob",
      surName: "Params",
      type: req.params.id
    }
  };
}
