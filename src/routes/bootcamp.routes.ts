import { Router } from 'express'

import BootcampController from '../app/controllers/BootcampController'
import BootcampDAO from '../app/models/Bootcamp/BootcampDAO'
import Bootcamp from '../app/models/Bootcamp/Bootcamp'

const router = Router()

const bootcampController = new BootcampController(new BootcampDAO(Bootcamp))

router.post('/', (req, res) => bootcampController.store(req, res))
router.get('/', (req, res) => bootcampController.index(req, res))
router.get('/:id', (req, res) => bootcampController.show(req, res))
router.put('/:id', (req, res) => bootcampController.update(req, res))
router.delete('/:id', (req, res) => bootcampController.destroy(req, res))

export default router
