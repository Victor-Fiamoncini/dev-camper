import { PaginateModel } from 'mongoose'

import MongoDAO from '../MongoDAO'
import ICourseDTO from './Types'

export default class CourseDAO extends MongoDAO<ICourseDTO> {
	public constructor(model: PaginateModel<ICourseDTO>) {
		super(model)
	}

	public async index() {
		return await this.model.find().populate({
			path: 'bootcamp',
			select: 'name description',
		})
	}

	public async show(id: string) {
		return await this.model.findById(id).populate({
			path: 'bootcamp',
			select: 'name description',
		})
	}

	public async store(dto: ICourseDTO) {
		return await this.model.create(dto)
	}

	public async update(id: string, dto: ICourseDTO) {
		return await this.model.findByIdAndUpdate(id, dto, {
			new: true,
			runValidators: true,
		})
	}

	public async destroy(id: string) {
		return await this.model.findByIdAndDelete(id)
	}

	public async getCoursesByBootcampId(bootcampId: string) {
		return await this.model.find({ bootcamp: bootcampId })
	}
}
