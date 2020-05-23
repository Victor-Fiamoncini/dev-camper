import BaseDAO from '../BaseDAO'

export default class BootcampDAO extends BaseDAO {
	constructor(model) {
		super(model)
	}

	async index(page, perPage) {
		return await this.model.paginate(
			{},
			{
				page,
				perPage,
				sort: { createdAt: -1 },
			}
		)
	}

	async show(id) {
		return await this.model.findById(id).populate('courses')
	}

	async store(dto) {
		return await dto.save()
	}

	async update(id, dto) {
		return await this.model.findOneAndUpdate({ _id: id }, dto, {
			new: true,
		})
	}

	async destroy(id) {
		const bootcamp = await this.model.findById(id)

		return await bootcamp.remove()
	}

	async getBootcampsByRadius(lat, lng, radius) {
		return await this.model.find({
			location: {
				$geoWithin: {
					$centerSphere: [[lng, lat], radius],
				},
			},
		})
	}
}
