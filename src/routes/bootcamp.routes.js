import { Router } from 'express'

import BootcampController from '../app/controllers/BootcampController'
import asyncHandler from '../app/middlewares/asyncHandler'
import withUpload from '../app/middlewares/withUpload'
import mustBeAuth from '../app/middlewares/mustBeAuth'
import grantByRoles from '../app/middlewares/grantByRoles'

const router = Router()

router.get('/', asyncHandler(BootcampController.index.bind(BootcampController)))

router.post(
	'/',
	[mustBeAuth, grantByRoles('publisher', 'admin')],
	asyncHandler(BootcampController.store.bind(BootcampController))
)

router.get(
	'/:bootcampId',
	asyncHandler(BootcampController.show.bind(BootcampController))
)

router.put(
	'/:bootcampId',
	[mustBeAuth, grantByRoles('publisher', 'admin'), withUpload.single('photo')],
	asyncHandler(BootcampController.update.bind(BootcampController))
)

router.delete(
	'/:bootcampId',
	[mustBeAuth, grantByRoles('publisher', 'admin')],
	asyncHandler(BootcampController.destroy.bind(BootcampController))
)

router.get(
	'/radius/:zipcode/:distance',
	asyncHandler(BootcampController.getBootcampsByRadius.bind(BootcampController))
)

export default router
