import { Router } from 'express'

import Controller from '../app/controllers/CourseController'
import asyncHandler from '../app/middlewares/asyncHandler'
import mustBeAuth from '../app/middlewares/mustBeAuth'
import grantByRoles from '../app/middlewares/grantByRoles'

const router = Router()

router.get('/', asyncHandler(Controller.index.bind(Controller)))

router.get('/:courseId', asyncHandler(Controller.show.bind(Controller)))

router.post(
	'/:bootcampId',
	[mustBeAuth, grantByRoles('publisher', 'admin')],
	asyncHandler(Controller.store.bind(Controller))
)

router.put(
	'/:courseId',
	[mustBeAuth, grantByRoles('publisher', 'admin')],
	asyncHandler(Controller.update.bind(Controller))
)

router.delete(
	'/:courseId',
	[mustBeAuth, grantByRoles('publisher', 'admin')],
	asyncHandler(Controller.destroy.bind(Controller))
)

router.get(
	'/bootcamp/:bootcampId',
	asyncHandler(Controller.getCoursesByBootcampId.bind(Controller))
)

export default router
