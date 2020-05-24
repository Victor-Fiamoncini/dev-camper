import { Router } from 'express'

import CourseController from '../app/controllers/CourseController'
import asyncHandler from '../app/middlewares/asyncHandler'
import mustBeAuth from '../app/middlewares/mustBeAuth'
import grantByRoles from '../app/middlewares/grantByRoles'

const router = Router()

router.get('/', asyncHandler(CourseController.index.bind(CourseController)))

router.get(
	'/:courseId',
	asyncHandler(CourseController.show.bind(CourseController))
)

router.post(
	'/:bootcampId',
	[mustBeAuth, grantByRoles('publisher', 'admin')],
	asyncHandler(CourseController.store.bind(CourseController))
)

router.put(
	'/:courseId',
	[mustBeAuth, grantByRoles('publisher', 'admin')],
	asyncHandler(CourseController.update.bind(CourseController))
)

router.delete(
	'/:courseId',
	[mustBeAuth, grantByRoles('publisher', 'admin')],
	asyncHandler(CourseController.destroy.bind(CourseController))
)

router.get(
	'/bootcamp/:bootcampId',
	asyncHandler(CourseController.getCoursesByBootcampId.bind(CourseController))
)

export default router
