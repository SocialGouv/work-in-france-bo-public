const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const Koa = require('koa')
const mount = require('koa-mount')
const path = require('path')
const serve = require('koa-static')

const corsConf = require('./conf/cors')
const apiRoutes = require('./routes/api')

const app = new Koa()
const PORT = process.env.PORT || 1337

app.use(cors(corsConf.config))
app.use(bodyParser())
// Serve static files from a specific URL path.
app.use(mount('/static', serve(path.join(__dirname, '/public'))))
app.use(apiRoutes.routes())

// Server.
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = server
