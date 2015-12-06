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

These files will create 3 entry points:
- GET:  `/api/user`
- POST: `/api/user`
- GET:  `/api/user/:id`  (e.g. `/api/user/123`)


##Files
Mock files can be created in one of a few ways.

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

###Using promises
Sometimes you might want to hold the server response until you have completed an async task. If your file returns a promise, this can be achieved.
Q is used internally but any promise/A+ will resolve fine.
```
var Q = require('q');
module.exports = function(req, config) {
  var obj = {
    headers: [],
    status: 200,
    body: {test: "deferred"}
  };

  var deferred = Q.defer();

  setTimeout(function() {
    deferred.resolve(obj);
  }, 2000)

  return deferred.promise;
};
```
