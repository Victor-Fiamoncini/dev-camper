import BaseDAO from '../BaseDAO'

export default class CourseDAO extends BaseDAO {
	constructor(model) {
		super(model)
	}

	async index() {
		return await this.model.find().populate({
			path: 'bootcamp',
			select: 'name description',
		})
	}

	async show(id) {
		return await this.model.findById(id).populate({
			path: 'bootcamp',
			select: 'name description',
		})
	}

	async store(dto) {
		return await this.model.create(dto)
	}

	async update(id, dto) {
		return await this.model.findByIdAndUpdate(id, dto, {
			new: true,
			runValidators: true,
		})
	}

	async destroy(id) {
		const course = await this.model.findById(id)

		return await course.remove()
	}

	async getCoursesByBootcampId(bootcampId) {
		return await this.model.find({ bootcamp: bootcampId })
	}
}
