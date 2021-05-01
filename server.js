const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))
app.get('*', (req, res) => {
    res.sendFile(__dirname, '/dist/index.html');
  });

const port = process.env.PORT || 8080
const hostname = process.env.VUE_APP_BASEURL

app.listen(port, hostname, () => {
    console.log("Listening at http://%s:%s/", hostname, port);
  });

app.listen(port)

console.log('Escutando na porta: ' + port)