module.exports = function(req, resp, config) {
  return {
    headers: [],
    status: 200,
    body: {
      firstName: "Bob",
      surName: "Smith",
      type: req.params.id
    }
  };
}
