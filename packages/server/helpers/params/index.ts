class Params {
  toURL(str) {
    return str.replace(/_([a-zA-Z]*)_/g, ":$1")
  }
  toFolder(str) {
    return str.replace(/:([a-zA-Z]*)/g, "_$1_")
  }
}

const params = new Params()

export default params
