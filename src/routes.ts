import { Router } from 'express'
import BootcampController from './app/controllers/BootcampController'

const router = Router()

router.post('/bootcamps', BootcampController.store)

export default router
