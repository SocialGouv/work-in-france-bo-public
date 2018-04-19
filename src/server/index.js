const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const Koa = require('koa')

const apiRoutes = require('./routes/api')

const app = new Koa()
const PORT = process.env.PORT || 1337

// https://github.com/koajs/cors
app.use(cors())
app.use(bodyParser())

// Routes.
app.use(apiRoutes.routes())

// Server.
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = server
