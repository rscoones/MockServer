#MockServer
Simple quick mocking server running on node

###Example Start:
```
  require('./apps/MockServer/server.js').start(config);
```
or
```
  var gulp = require('gulp');
  var MockServer = require('./apps/MockServer/server.js');
  var config = require('./config.js');

  gulp.task('mock', function() {
    MockServer.start(config);
  })
```

###Example config:
Create a server serving a folder 'api' at http://localhost:8080/api/...
```
var path = require('path');

module.exports = {
  base: {
    url: "/api",
    location: path.join(__dirname, "api")
  }
}
```
[Extra config settings](docs/config.md)

###Mock file
A mock file is a simple JS object with 4 properties, all optional!
```
module.exports = {
  headers: {},
  status: 200,
  body: {
    success: true
  }
}
```
[Creating mock files](docs/mockfiles.md)

#Release Notes

##v1.0 (formally v0.3)
- Mock files now support promise returns (in addition to objects and functions)
- Session support via config.session property. If enabled each user gets a individual instance of mocks.
- Breaking Change: Plugins now have the express 'res' object exposed to them instead of being tied to Mock file type.
- async responding via promises
- Support for user context based queries via cookie/sessions
- npm packaging

##v0.2
- Support for dynamic URLs using express routing via req.params
- Support for multiple HTTP verbs
- Documentation

##v0.1
- First Creation
- Basic verbs POST/GET
- Only support static URLs and query strings


##Planned

#### v0.3 / v1.0
- Automatic raml parsing (pushed to v1.1)

#### v1.1
- Automatic raml parsing (on hold)
- UI extensions => Create new URLs in flight
- UI extensions => Save newly created URLs in flight
