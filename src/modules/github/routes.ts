import Router from '@koa/router'
import * as HttpStatus from 'http-status'
import { Context } from 'koa'
import { getPullRequests } from './http'

const router = new Router()

router.get('/', getAll)

async function getAll(ctx: Context) {
  console.log(ctx.request.body)

  const pullRequestResponse = await getPullRequests('stevenmays', 'vacaro')

  const pullRequests = pullRequestResponse.data.map((pullRequest: Record<string, any>) => ({
    id: pullRequest.id,
    number: pullRequest.number,
    title: pullRequest.title,
    author: pullRequest.user.login,
  }))

  ctx.body = { data: pullRequests }
  ctx.status = HttpStatus.OK
}

export default router.routes()
