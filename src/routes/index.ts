import Router from '@koa/router'
import { Context } from 'koa'
import githubRoute from '../modules/github/routes'

const router = new Router()

router.use('/github', githubRoute)

router.get('/', (ctx: Context) => {
  ctx.body = 'OK'
})

export default router.routes()
