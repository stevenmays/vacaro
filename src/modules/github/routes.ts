import Router from '@koa/router'
import * as HttpStatus from 'http-status'
import { Context } from 'koa'

const router = new Router()

router.get('/', getAll)

async function getAll(ctx: Context) {
  console.log(ctx.request.body)

  ctx.body = { data: [{}] }
  ctx.status = HttpStatus.OK
}

export default router.routes()
