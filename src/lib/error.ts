import HttpStatus from 'http-status'

export abstract class CustomError extends Error {
  public abstract statusCode: keyof HttpStatus.HttpStatus

  constructor(message?: string | Record<string, any>) {
    super(typeof message === 'string' ? message : JSON.stringify(message))
  }
}

export class ExternalApiError extends CustomError {
  public readonly statusCode = HttpStatus.BAD_GATEWAY
}

export class BadRequestError extends CustomError {
  public readonly statusCode = HttpStatus.BAD_REQUEST
}
