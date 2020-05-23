import { Router } from 'express'

import bootcampRoutes from './bootcamp.routes'
import courseRoutes from './course.routes'
import sessionRoutes from './session.routes'
import userRoutes from './user.routes'

const router = Router()

router.get('/', (req, res) => res.send('Server is running! 🚀'))
router.use('/bootcamps', bootcampRoutes)
router.use('/courses', courseRoutes)
router.use('/sessions', sessionRoutes)
router.use('/users', userRoutes)

export default router
