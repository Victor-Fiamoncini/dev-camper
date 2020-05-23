import { Router } from 'express'

import Controller from '../app/controllers/UserController'
import asyncHandler from '../app/middlewares/asyncHandler'
import mustBeAuth from '../app/middlewares/mustBeAuth'
import grantByRoles from '../app/middlewares/grantByRoles'

const router = Router()

router.post('/', asyncHandler(Controller.store.bind(Controller)))

router.put(
	'/:userId',
	mustBeAuth,
	asyncHandler(Controller.update.bind(Controller))
)

router.delete(
	'/:userId',
	[mustBeAuth, grantByRoles('admin')],
	asyncHandler(Controller.destroy.bind(Controller))
)

export default router
