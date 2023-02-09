import Router from '@koa/router'
import * as GithubController from './controller'

const router = new Router()

router.get('/', GithubController.getAll)

export default router.routes()
