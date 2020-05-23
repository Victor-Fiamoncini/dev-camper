import { Router } from 'express'

import BootcampController from '../app/controllers/BootcampController'
import asyncHandler from '../app/middlewares/asyncHandler'

const router = Router()

router.get('/', asyncHandler(BootcampController.index))

router.post('/', asyncHandler(BootcampController.store))

router.get('/:bootcampId', asyncHandler(BootcampController.show))

router.put('/:bootcampId', asyncHandler(BootcampController.update))

router.delete('/:bootcampId', asyncHandler(BootcampController.destroy))

router.get(
	'/radius/:zipcode/:distance',
	asyncHandler(BootcampController.getBootcampsByRadius)
)

export default router
