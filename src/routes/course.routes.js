import { Router } from 'express'

import Controller from '../app/controllers/CourseController'
import asyncHandler from '../app/middlewares/asyncHandler'

const router = Router()

router.get('/', asyncHandler(Controller.index.bind(Controller)))

router.get('/:courseId', asyncHandler(Controller.show.bind(Controller)))

router.post('/:bootcampId', asyncHandler(Controller.store.bind(Controller)))

router.put('/:courseId', asyncHandler(Controller.update.bind(Controller)))

router.delete('/:courseId', asyncHandler(Controller.destroy.bind(Controller)))

router.get(
	'/bootcamp/:bootcampId',
	asyncHandler(Controller.getCoursesByBootcampId.bind(Controller))
)

export default router
