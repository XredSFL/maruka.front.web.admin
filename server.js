const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if (pathname.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, 'public', pathname)
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 404
          res.end('File not found')
        } else {
          res.setHeader('Content-Type', 'application/pdf')
          res.end(data)
        }
      })
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, (err) => {
    if (err) throw err
  })
})