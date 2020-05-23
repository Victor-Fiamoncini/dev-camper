import { Router } from 'express'

import Controller from '../app/controllers/BootcampController'
import asyncHandler from '../app/middlewares/asyncHandler'
import withUpload from '../app/middlewares/withUpload'
import mustBeAuth from '../app/middlewares/mustBeAuth'

const router = Router()

router.get('/', asyncHandler(Controller.index.bind(Controller)))

router.post('/', mustBeAuth, asyncHandler(Controller.store.bind(Controller)))

router.get('/:bootcampId', asyncHandler(Controller.show.bind(Controller)))

router.put(
	'/:bootcampId',
	[mustBeAuth, withUpload.single('photo')],
	asyncHandler(Controller.update.bind(Controller))
)

router.delete(
	'/:bootcampId',
	mustBeAuth,
	asyncHandler(Controller.destroy.bind(Controller))
)

router.get(
	'/radius/:zipcode/:distance',
	asyncHandler(Controller.getBootcampsByRadius.bind(Controller))
)

export default router
