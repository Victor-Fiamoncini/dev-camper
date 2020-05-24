import BaseController from './BaseController'
import CourseDAO from '../models/Course/CourseDAO'
import Course from '../models/Course/Course'
import BootcampDAO from '../models/Bootcamp/BootcampDAO'
import Bootcamp from '../models/Bootcamp/Bootcamp'

class CourseController extends BaseController {
	constructor(dao) {
		super(dao)
	}

	async index(req, res) {
		const courses = await this.dao.index()

		return res.status(200).json(courses)
	}

	async show(req, res) {
		const course = await this.dao.show(req.params.courseId)

		if (!course) {
			return res.status(400).json({ error: 'Course not found' })
		}

		return res.status(200).json(course)
	}

	async store(req, res) {
		const { bootcampId } = req.params

		const bootcamp = await new BootcampDAO(Bootcamp).show(bootcampId)

		if (!bootcamp) {
			return res.status(400).json({ error: 'No bootcamp found' })
		}

		if (bootcamp.user.toString() !== req.userId) {
			return res.status(401).json({ error: 'Unauthorized' })
		}

		req.body.bootcamp = bootcampId
		req.body.user = req.userId

		const courseDto = new Course(req.body)
		const course = await this.dao.store(courseDto)

		return res.status(201).json(course)
	}

	async update(req, res) {
		const { courseId } = req.params

		let course = await this.dao.show(courseId)

		if (!course) {
			return res.status(400).json({ error: 'Course not found' })
		}

		if (course.user.toString() !== req.userId) {
			return res.status(401).json({ error: 'Unauthorized' })
		}

		course = await this.dao.update(courseId, req.body)

		return res.status(200).json(course)
	}

	async destroy(req, res) {
		const { courseId } = req.params

		let course = await this.dao.show(courseId)

		if (!course) {
			return res.status(400).json({ error: 'Course not found' })
		}

		if (course.user.toString() !== req.userId) {
			return res.status(401).json({ error: 'Unauthorized' })
		}

		course = await this.dao.destroy(courseId)

		return res.status(200).json(course)
	}

	async getCoursesByBootcampId(req, res) {
		const courses = await this.dao.getCoursesByBootcampId(req.params.bootcampId)

		if (courses.length === 0) {
			return res.status(400).json({ error: 'No courses found' })
		}

		return res.status(200).json(courses)
	}
}

export default new CourseController(new CourseDAO(Course))
