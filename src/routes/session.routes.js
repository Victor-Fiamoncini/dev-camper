import { Router } from 'express'

import Controller from '../app/controllers/SessionController'
import asyncHandler from '../app/middlewares/asyncHandler'
import mustBeAuth from '../app/middlewares/mustBeAuth'

const router = Router()

router.post('/', asyncHandler(Controller.store.bind(Controller)))

router.get('/', mustBeAuth, asyncHandler(Controller.refresh.bind(Controller)))

export default router
