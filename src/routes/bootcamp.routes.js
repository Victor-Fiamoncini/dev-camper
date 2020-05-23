import { Router } from 'express'

import Controller from '../app/controllers/BootcampController'
import asyncHandler from '../app/middlewares/asyncHandler'
import withUpload from '../app/middlewares/withUpload'

const router = Router()

router.get('/', asyncHandler(Controller.index.bind(Controller)))

router.post('/', asyncHandler(Controller.store.bind(Controller)))

router.get('/:bootcampId', asyncHandler(Controller.show.bind(Controller)))

router.put(
	'/:bootcampId',
	withUpload.single('photo'),
	asyncHandler(Controller.update.bind(Controller))
)

router.delete('/:bootcampId', asyncHandler(Controller.destroy.bind(Controller)))

router.get(
	'/radius/:zipcode/:distance',
	asyncHandler(Controller.getBootcampsByRadius.bind(Controller))
)

export default router
