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
    var li = $("<li>").html("<a href='#'>" + i + "</a>");
    createPopup(li, obj);
    $("#list").append(li);
  }
}

function createPopup(ele, obj) {
  $(ele).click(function() {
    $("#dialog").dialog({
      modal: true,
      width: "80%",
      height: 400
    });
  })
}

var data = {
  headers: [],
  status: 500,
  body: {success: true}
};

$.ajax({
  url: "api/",
  type: "POST",
  data: {url: "/v1/application/decision", method: "GET", data: data}
}).done(function(data) {
  console.log(data);
});
