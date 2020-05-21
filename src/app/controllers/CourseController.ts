import { Request, Response } from 'express'

import CourseDAO from '../models/Course/CourseDAO'
import Course from '../models/Course/Course'

class CourseController {
	private dao: CourseDAO

	public constructor(dao: CourseDAO) {
		this.dao = dao
	}

	public async index(req: Request, res: Response) {
		const { page = 1, perPage = 5 } = req.query
		const { bootcampId } = req.params

		const courses = await this.dao.index(
			bootcampId,
			Number(page),
			Number(perPage)
		)

		return res.status(200).json(courses)
	}
}

export default new CourseController(new CourseDAO(Course))
