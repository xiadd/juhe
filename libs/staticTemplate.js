const fs = require('fs')
const path = require('path')

function loadCss (filename) {
  const mapFile = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, '../public/bundles/map.json')
  ))
  return `<link href="${mapFile[filename]}" rel="stylesheet">`
}

function loadScript (filename) {
  const mapFile = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, '../public/bundles/map.json')
  ))
  return `<script src="${mapFile[filename]}"></script>`
}

module.exports = {
  loadCss,
  loadScript
}