import { Router } from 'express'

import CourseController from '../app/controllers/CourseController'
import asyncHandler from '../app/middlewares/asyncHandler'

const router = Router()

router.get(
	'/:bootcampId',
	asyncHandler((req, res) => CourseController.index(req, res))
)

export default router
