import { ensureAuthenticated } from '@/main/middlewares/authMiddleware'
import { Router } from 'express'
import { adaptRoute } from '../adapters/bookExpressRouteAdapter'
import { makeBookController } from '../factories/makeBookController'

const bookRouter = Router()

const bookController = adaptRoute(makeBookController())

bookRouter.use(ensureAuthenticated)
bookRouter.post('/', bookController.create)
bookRouter.get('/', bookController.index)
bookRouter.get('/:id', bookController.show)
bookRouter.put('/:id', bookController.update)
bookRouter.delete('/:id', bookController.delete)

export default bookRouter
