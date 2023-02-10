import { Context, Next } from 'koa'
import { CustomError, ExternalApiError } from '../lib/error'

export async function koaErrorHandler(ctx: Context, next: Next) {
  try {
    await next()
  } catch (err) {
    if (err instanceof CustomError || err.statusCode) {
      ctx.status = err.statusCode as number
      ctx.body = { error: err.message }
    } else if (err instanceof ExternalApiError) {
      ctx.status = 502
      ctx.body = { error: 'External Api error' }
    } else if (err?.isAxiosError) {
      const error =
        typeof err?.response?.data === 'string' && !err?.response?.data?.length
          ? err?.response?.statusText
          : err?.response?.data
      ctx.status = err?.response?.status ?? 500
      ctx.body = { error }
    } else {
      ctx.status = 500
      ctx.body = { error: 'Unknown Error' }
    }

    ctx.app.emit('error', err, ctx)
  }
}
