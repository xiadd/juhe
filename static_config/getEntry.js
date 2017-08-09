const glob = require('glob')

function getEntry (entryDir, cb) {
  const entry = {}
  const pattern = entryDir + '/**/*.js'
  glob.sync(pattern).forEach(filepath => {
    const name = filepath.split('/')[filepath.split('/').length - 1].split('.')[0]
    entry[name] = filepath
  })
  return entry
}

module.exports = getEntry