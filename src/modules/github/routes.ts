import Router from '@koa/router'
import * as HttpStatus from 'http-status'
import { Context } from 'koa'
import { getPullRequests } from './http'

const router = new Router()

router.get('/', getAll)

async function getAll(ctx: Context) {
  console.log(ctx.request.body)

  const pullRequests = await getPullRequests('stevenmays', 'vacaro')

  ctx.body = { data: pullRequests.data }
  ctx.status = HttpStatus.OK
}

export default router.routes()
