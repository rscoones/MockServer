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
[Further details here](docs/config.md)


#Release Notes

##v0.2
- Support for dynamic URLs using express routing via req.params
- Support for multiple HTTP verbs

##v0.1
- First Creation
- Basic verbs POST/GET
- Only support static URLs and query strings


##Planned

#### v0.3
- Support for user context based queries via cookie/sessions
- Automatic raml parsing
- npm packaging

#### v0.4
- UI extensions => Create new URLs in flight
- UI extensions => Save newly created URLs in flight
