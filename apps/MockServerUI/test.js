$.ajax({
  url: "api/",
  dataType: "json"
}).done(function(data) {
  var urls = data.urls;
  createList(urls);
});

function createList(urls) {
  for (var i in urls) {
    var obj = urls[i];
    var li = $("<li>").html("<a href='#'>" + obj.url + "</a>");
    createPopup(li, obj);
    $("#list").append(li);
  }
}

function createPopup(ele, obj) {

}
