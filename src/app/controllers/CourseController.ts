import { Request, Response } from 'express'

import CourseDAO from '../models/Course/CourseDAO'
import Course from '../models/Course/Course'
import BootcampDAO from '../models/Bootcamp/BootcampDAO'
import Bootcamp from '../models/Bootcamp/Bootcamp'

class CourseController {
	private dao: CourseDAO

	public constructor(dao: CourseDAO) {
		this.dao = dao
	}

	public async index(req: Request, res: Response) {
		const courses = await this.dao.index()

		return res.status(200).json(courses)
	}

	public async show(req: Request, res: Response) {
		const course = await this.dao.show(req.params.courseId)

		return res.status(200).json(course)
	}

	public async store(req: Request, res: Response) {
		const bootcamp = new BootcampDAO(Bootcamp).show(req.params.bootcampId)

		if (!bootcamp) {
			return res.status(400).json({ error: 'No bootcamp found' })
		}

		req.body.bootcamp = req.params.bootcampId
		const courseDto = new Course(req.body)

		const course = await this.dao.store(courseDto)

		return res.status(201).json(course)
	}

	public async getCoursesByBootcampId(req: Request, res: Response) {
		const courses = await this.dao.getCoursesByBootcampId(req.params.bootcampId)

		return res.status(200).json(courses)
	}
}

export default new CourseController(new CourseDAO(Course))
