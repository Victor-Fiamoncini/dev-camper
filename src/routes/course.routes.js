import { Router } from 'express'

import CourseController from '../app/controllers/CourseController'
import asyncHandler from '../app/middlewares/asyncHandler'

const router = Router()

router.get(
	'/',
	asyncHandler((req, res) => CourseController.index(req, res))
)

router.get('/:courseId', asyncHandler(CourseController.show))

router.post('/:bootcampId', asyncHandler(CourseController.store))

router.put('/:courseId', asyncHandler(CourseController.update))

router.delete('/:courseId', asyncHandler(CourseController.destroy))

router.get(
	'/bootcamp/:bootcampId',
	asyncHandler(CourseController.getCoursesByBootcampId)
)

export default router
