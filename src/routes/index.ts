import { Router } from 'express'
import bootcampRoutes from './bootcamp.routes'

const router = Router()

router.get('/', (req, res) => res.send('Server is running!! 🚀'))
router.use('/bootcamps', bootcampRoutes)

export default router
