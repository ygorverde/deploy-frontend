const express = require('express')
const router = require('express').Router()
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))
app.use('/auth', router)

const port = process.env.PORT || 8080
app.listen(port)

console.log('Escutando na porta: ' + port)