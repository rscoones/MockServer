#Mock files
Folder structure and naming of your files is important, it defines how the server will run.

##Folder Structure
The Mock files are included into the server by the folder structure. The filename decides the HTTP method, e.g. GET.js is a GET request.
A routing parameter can be added by naming the folder `_id_`. This will map to the standard `:id` route param in express.

An example folder structure:
```
/api/
    /user/GET.js
    /user/POST.js
    /user/_id_/GET.js
```


##Files
Mock files can be created in one of 2 ways, as a JavaScript object or as a function that returns an object.

###Object approach
Simplest and quickest way to return your mocked API
```
module.exports = {
  headers: {},
  status: 200,
  body: {
    success: true
  }
}
```

Properties can have dynamic values set to them. However with the object approach, they are evaluated once, at boot time.

###Function approach
This approach gives you much more flexibility. Values can be fully dynamic from point of call rather than boot time. The request object from express is also exposed.
```
module.exports = function(req, config) {
  var body = service.get(req.params.id);
  return {
    headers: {},
    status: (body) ? 200 : 500,
    body: body
  }
}
```
The request object can be used to find anything from query strings to cookies to request headers.
