import { Router } from 'express'
import BootcampController from './app/controllers/BootcampController'
import BootcampDAO from './app/models/Bootcamp/BootcampDAO'

const router = Router()

const bootcampController = new BootcampController(new BootcampDAO())

router.post('/bootcamps', (req, res) => bootcampController.store(req, res))

export default router
