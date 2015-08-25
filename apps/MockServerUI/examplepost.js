
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
