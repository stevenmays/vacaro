import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import logger from 'koa-logger'
import { koaErrorHandler } from './middleware/koa-error'
import routes from './routes'

const app = new Koa()
const port = process.env.PORT || 3000

app.use(koaErrorHandler)
app.use(helmet())
app.use(logger())
app.use(bodyParser())
app.use(routes)

app.listen(port, () => {
  console.log(`🚀 App is listening on the port ${port}`)
})
