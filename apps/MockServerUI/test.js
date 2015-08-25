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
    var link = $("<a>").attr('href', "#").html(obj.url);
    var row = $("<tr>");
    var colUrl = $("<td>").html(link).appendTo(row);
    createModal(link, obj);
    $("#list").append(row);
  }
  bindModal();
}

function createModal(ele, obj) {
  $(ele).click(function() {
    setPopupValues(obj);
    getPresets(obj);

    $("#modal").modal({
      modal: true,
      width: 800,
    });
  });
}

function bindModal() {
  $("#modal .btn-primary").click(function() {
    var data = {
      headers: [],
      type: $("#modal #type").val(),
      status: parseInt($("#modal #status").val()),
      body: JSON.parse($("#modal #body").val())
    };
    $.ajax({
      url: "api/",
      method: "POST",
      data: {url: $("#modal .modal-title").html(), method: "GET", data: data},
      dataType: "json"
    }).done(function(response) {
      console.log(response);
    });
  })
}

function getPresets(obj) {
  // $.ajax({
  //   url: "api/",
  //   method: "GET",
  //   data: {url: obj.url},
  //   dataType: "json"
  // }).done(function(data) {
  //   $("#modal #preset").find('option').remove().end();
  //   for (var i in data.files) {
  //     var file = data.files[i];
  //     var option = $("<option>").html(file.filename);
  //     $("#modal #preset").append(option);
  //   }
  // });
}

function setPopupValues(obj) {
  $("#modal .modal-title").html(obj.url);
  $("#modal #headers").val(JSON.stringify(obj.data.headers, null, 2));
  $("#modal #type").val(obj.data.type);
  $("#modal #status").val(obj.data.status);
  $("#modal #body").val(JSON.stringify(obj.data.body, null, 2));
}
