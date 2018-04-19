const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const apiRoutes = require('./routes/api')

const app = new Koa()
const PORT = process.env.PORT || 1337

app.use(bodyParser())

// Routes.
app.use(apiRoutes.routes())

// Server.
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = server
