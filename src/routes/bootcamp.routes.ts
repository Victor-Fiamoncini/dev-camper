import { Router } from 'express'
import BootcampController from '../app/controllers/BootcampController'
import asyncHandler from '../app/middlewares/asyncHandler'

const router = Router()

router.get(
	'/',
	asyncHandler((req, res) => BootcampController.index(req, res))
)

router.post(
	'/',
	asyncHandler((req, res) => BootcampController.store(req, res))
)

router.get(
	'/:bootcampId',
	asyncHandler((req, res) => BootcampController.show(req, res))
)

router.put(
	'/:bootcampId',
	asyncHandler((req, res) => BootcampController.update(req, res))
)

router.delete(
	'/:bootcampId',
	asyncHandler((req, res) => BootcampController.destroy(req, res))
)

router.get(
	'/radius/:zipcode/:distance',
	asyncHandler((req, res) => BootcampController.getBootcampsByRadius(req, res))
)

export default router
