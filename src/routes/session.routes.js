import { Router } from 'express'

import SessionController from '../app/controllers/SessionController'
import ForgotPasswordController from '../app/controllers/ForgotPasswordController'
import asyncHandler from '../app/middlewares/asyncHandler'
import mustBeAuth from '../app/middlewares/mustBeAuth'

const router = Router()

router.post('/', asyncHandler(SessionController.store.bind(SessionController)))

router.get(
	'/',
	mustBeAuth,
	asyncHandler(SessionController.refresh.bind(SessionController))
)

router.post(
	'/forgot',
	asyncHandler(ForgotPasswordController.store.bind(ForgotPasswordController))
)

export default router
