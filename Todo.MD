# To Do for v1.1

#### Targets for this release
- Proxy to allow for seamless transfer to real servers
- General bug fixes
- UI tweaks for usability

## Housekeeping
- [ ] Update react + react-bootstrap (Use ES6 classes)
- [ ] Maybe redux + thunk
- [ ] Update lint rules


## New Functionality - Proxy

### Server
- [ ] Create proxy forwarder
- [ ] Create `proxy` property and save to mock file
- [ ] Create a `availableProxies` string[] property for UI
- [ ] Change `config.ui` to be an object. `pathname` and `grouping` properties (for UI grouping)

### API
- [ ] Add ability to save `proxy` value. (May just work if server work is done well)

### UI
- [ ] Allow setting of `proxy` via input
- [ ] Allow setting of `proxy` via preset proxies (`availableProxies`)
- [ ] Separate Mock UI from proxy UI (tabs on edit page?)
- [ ] Support grouping (accordion) of folders n-deep into the base location path
