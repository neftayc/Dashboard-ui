const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')

const app = express()
// middleWare
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const upload = multer({ dest: 'uploads/' })
console.log('el valor de upload', upload)

app.get('/test', function (req, res) {
  res.send('Test successful')
})

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  console.log('se ejecuta', res)

  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  try {
    console.log('se ejecuta', req, res)
    res.status(201).send('success')
  } catch (err) {
    res.status(500).send({
      error: 'error occured creating user',
    })
  }
})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
}
