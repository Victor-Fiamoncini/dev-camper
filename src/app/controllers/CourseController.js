import CourseDAO from '../models/Course/CourseDAO'
import Course from '../models/Course/Course'
import BootcampDAO from '../models/Bootcamp/BootcampDAO'
import Bootcamp from '../models/Bootcamp/Bootcamp'

class CourseController {
	constructor(dao) {
		this.dao = dao
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
		const bootcamp = await new BootcampDAO(Bootcamp).show(req.params.bootcampId)

		if (!bootcamp) {
			return res.status(400).json({ error: 'No bootcamp found' })
		}

		req.body.bootcamp = req.params.bootcampId

		const courseDto = new Course(req.body)
		const course = await this.dao.store(courseDto)

		return res.status(201).json(course)
	}

	async update(req, res) {
		const course = await this.dao.update(req.params.courseId, req.body)

		if (!course) {
			return res.status(400).json({ error: 'Course not found' })
		}

		return res.status(200).json(course)
	}

	async destroy(req, res) {
		const course = await this.dao.destroy(req.params.courseId)

		if (!course) {
			return res.status(400).json({ error: 'Course not found' })
		}

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
