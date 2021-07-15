const http  = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000

function serveStaticFile(res, path, contentType, responseCode = 200) {
  fs.readFile(__dirname + path, (err, data) => {
    if(err) {
      res.writeHead(500, {'Content-Type': 'text/plain'})
      return res.end('500 - Internal Error')
    }
    res.writeHead(responseCode, {'Content-Type': contentType})
    res.end(data)
  })
}
const server = http.createServer((req, res) => {
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
  //const path = req.url
  switch(path) {
    case '':
      // res.writeHead(200, {'Content-Type': 'text/plain'})
      // res.end('HomePage')
      serveStaticFile(res, '/public/home.html', 'text/html')
      break
    case '/about':
      // res.writeHead(200, {'Content-Type': 'text/plain'})
      // res.end('About')
      serveStaticFile(res, '/public/about.html', 'text/html')
      break
    case '/img/logo.png':
      serveStaticFile(res, '/public/img/logo.png', 'image/png')
    default: 
      // res.writeHead(404, {'Content-Type': 'text/plain'})
      // res.end('Hello World!')
      serveStaticFile(res, '/public/404.html', 'text/html')
      break
  }
})

server.listen(port, () => console.log(`server started on port ${port}; ` + 
  'press Ctrl-C to terminate...'))

