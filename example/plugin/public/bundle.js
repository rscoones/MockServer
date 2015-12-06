var showing = false;
setInterval(function() {
  var text = "JavaScript test";
  if (showing) {
    text = "";
  }
  document.getElementById('main').innerHTML = text;
  showing = !showing;
}, 500);
