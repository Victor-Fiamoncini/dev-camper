import { Router } from 'express'

import Controller from '../app/controllers/UserController'
import asyncHandler from '../app/middlewares/asyncHandler'

const router = Router()

router.post('/', asyncHandler(Controller.store.bind(Controller)))

export default router
