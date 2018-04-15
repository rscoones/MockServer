module.exports = function(req) {
  return {
    headers: {},
    status: 200,
    body: {
      firstName: "Fred",
      surName: "Smith"
    }
  }
};
