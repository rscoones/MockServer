# MockApiServer
Simple quick mocking server running on node

### Example Start:
```
  require('mockapiserver').start(config);
```
or
```
  var gulp = require('gulp');
  var MockServer = require('mockapiserver');

  gulp.task('mock', function() {
    MockServer.start(config);
  })
```

### Example config:
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

### Mock file
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

# Release Notes

## v1.0 (formally v0.3)
- Mock files now support promise returns (in addition to objects and functions)
- Session support via config.session property. If enabled each user gets a individual instance of mocks.
- Breaking Change: Plugins now have the express 'res' object exposed to them instead of being tied to Mock file type.
- async responding via promises
- Support for user context based queries via cookie/sessions
- npm packaging

## v0.2
- Support for dynamic URLs using express routing via req.params
- Support for multiple HTTP verbs
- Documentation

## v0.1
- First Creation
- Basic verbs POST/GET
- Only support static URLs and query strings


## Planned

#### v1.1
- Add a true URL property.
 - Add a proxy to handle this
 - This will let us switch between MockServer and real servers seamlessly


#### Benched
- Automatic raml parsing (on hold)
- UI extensions => Create new URLs in flight (Too many security risks)
- UI extensions => Save newly created URLs in flight (Far too many security risks)
