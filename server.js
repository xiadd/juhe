const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('xiadd')
})

app.listen(8080)
