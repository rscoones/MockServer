#MockServer
Simple quick mocking server running on node

###Example Start:
```
  require('./apps/MockServer/server.js').start(config);
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

####port
```
  ...
  port: 8080
  ...
```

####plugins
Creates an entry point for the MockServerUI plugin at http://localhost:8080/portal/
```
  ...
  plugins: [
    {
      url: "/portal/",
      location: path.join(__dirname, "../apps/MockServerUI/GET")
    }
  ]
  ...
```

####cors
Support for Cross-Origin Resource Sharing. Unless you use a proxy within our main server, you will need this.
```
  ...
  cors: true
  ...
```

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

#### v0.4
- UI extensions => Create new URLs in flight
- UI extensions => Save newly created URLs in flight
