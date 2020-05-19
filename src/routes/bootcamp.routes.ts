import { Request, Response, Router } from 'express'

import BootcampController from '../app/controllers/BootcampController'
import asyncHandler from '../app/middlewares/asyncHandler'

const router = Router()

router.post(
	'/',
	asyncHandler((req: Request, res: Response) =>
		BootcampController.store(req, res)
	)
)
router.get(
	'/',
	asyncHandler((req: Request, res: Response) =>
		BootcampController.index(req, res)
	)
)

router.get(
	'/:id',
	asyncHandler((req: Request, res: Response) =>
		BootcampController.show(req, res)
	)
)

router.put(
	'/:id',
	asyncHandler((req: Request, res: Response) =>
		BootcampController.update(req, res)
	)
)

router.delete(
	'/:id',
	asyncHandler((req: Request, res: Response) =>
		BootcampController.destroy(req, res)
	)
)

export default router
