var fs = require('fs');

module.exports = walk;

function walk(dir, files_, base) {
  var base = base || dir;
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files){
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()){
      walk(name, files_, base);
    } else {
      files_.push({name: name, base: base});
    }
  }
  return files_;
}
