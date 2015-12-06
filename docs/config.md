#Config
Config files should be a JS file that returns a JS object via `module.exports`.

##Example Config
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

##Extra options

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
Support for Cross-Origin Resource Sharing. Unless you use a proxy within your main server, you will need this.
```
  ...
  cors: true
  ...
```
