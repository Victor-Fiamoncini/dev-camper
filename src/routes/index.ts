import { Router } from 'express'
import bootcampRoutes from './bootcamp.routes'
import courseRoutes from './course.routes'

const router = Router()

router.get('/', (req, res) => res.send('Server is running! 🚀'))
router.use('/bootcamps', bootcampRoutes)
router.use('/courses', courseRoutes)

export default router
