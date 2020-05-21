import { PaginateModel } from 'mongoose'

import MongoDAO from '../MongoDAO'
import ICourseDTO from './Types'

export default class CourseDAO extends MongoDAO<ICourseDTO> {
	public constructor(model: PaginateModel<ICourseDTO>) {
		super(model)
	}

	public async index(bootcampId: string, page: number, perPage: number) {
		return await this.model.paginate(
			{ bootcamp: bootcampId },
			{
				page,
				perPage,
				sort: { createdAt: -1 },
			}
		)
	}
}
