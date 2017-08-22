const glob = require('glob')

/**
 * 获取webpack入口文件
 * @param {string} entryDir 
 * @param {function} cb 
 */
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