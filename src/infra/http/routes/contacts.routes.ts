import express from 'express'

import { adaptMiddleware } from '../adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { makeSearchContactsController } from '../factories/controllers/SearchContactsControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'

const contactsRouter = express.Router()

contactsRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

contactsRouter.get('/search', adaptRoute(makeSearchContactsController()))

export { contactsRouter }
