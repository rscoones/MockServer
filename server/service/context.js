module.exports = function(req) {
  if (req.session) {
    return req.session.id;
  }
  return null;
}
