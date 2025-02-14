import { Middleware } from '@/controllers/ports/middleware'
import { HttpRequest, HttpStatusCodes } from '@/controllers/types/http'
import { NextFunction, Request, RequestHandler, Response } from 'express'

export const adaptMiddleware = (middleware: Middleware): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { body, params, query, headers } = req
    try {
      const httpRequest: HttpRequest = {
        params,
        body,
        query,
        headers: {
          authorization: headers.authorization
        }
      }
      const response = await middleware.handle(httpRequest)
      if (response.httpStatusCode !== HttpStatusCodes.ok.code) {
        res.status(response.httpStatusCode).json(response.body)
      } else {
        next()
      }
    } catch (error) {
      res.status(error.httpStatusCode).json(error.body)
    }
  }
}
