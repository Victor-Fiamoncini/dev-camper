import { Router } from 'express'

import CourseController from '../app/controllers/CourseController'
import asyncHandler from '../app/middlewares/asyncHandler'

const router = Router()

router.get(
	'/',
	asyncHandler((req, res) => CourseController.index(req, res))
)

router.get(
	'/:courseId',
	asyncHandler((req, res) => CourseController.show(req, res))
)

router.post(
	'/:bootcampId/new',
	asyncHandler((req, res) => CourseController.store(req, res))
)

router.put(
	'/:courseId',
	asyncHandler((req, res) => CourseController.update(req, res))
)

router.delete(
	'/:courseId',
	asyncHandler((req, res) => CourseController.destroy(req, res))
)

router.get(
	'/bootcamp/:bootcampId',
	asyncHandler((req, res) => CourseController.getCoursesByBootcampId(req, res))
)

export default router
