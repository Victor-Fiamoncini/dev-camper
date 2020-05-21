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
	'/:id',
	asyncHandler((req, res) => BootcampController.show(req, res))
)

router.put(
	'/:id',
	asyncHandler((req, res) => BootcampController.update(req, res))
)

router.delete(
	'/:id',
	asyncHandler((req, res) => BootcampController.destroy(req, res))
)

router.get(
	'/radius/:zipcode/:distance',
	asyncHandler((req, res) => BootcampController.getBootcampsInRadius(req, res))
)

export default router
