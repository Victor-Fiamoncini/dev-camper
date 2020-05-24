import { Router } from 'express'

import UserController from '../app/controllers/UserController'
import asyncHandler from '../app/middlewares/asyncHandler'
import mustBeAuth from '../app/middlewares/mustBeAuth'
import grantByRoles from '../app/middlewares/grantByRoles'

const router = Router()

router.post('/', asyncHandler(UserController.store.bind(UserController)))

router.put(
	'/:userId',
	mustBeAuth,
	asyncHandler(UserController.update.bind(UserController))
)

router.delete(
	'/:userId',
	[mustBeAuth, grantByRoles('admin')],
	asyncHandler(UserController.destroy.bind(UserController))
)

export default router
