import { PaginateModel } from 'mongoose'

import MongoDAO from '../MongoDAO'
import IBootcampDTO from './Types'

export default class BootcampDAO extends MongoDAO<IBootcampDTO> {
	public constructor(model: PaginateModel<IBootcampDTO>) {
		super(model)
	}

	public async index(page: number, perPage: number) {
		return await this.model.paginate(
			{},
			{
				page,
				perPage,
				sort: { createdAt: -1 },
			}
		)
	}

	public async show(id: string) {
		return await this.model.findById(id).populate('courses')
	}

	public async store(dto: IBootcampDTO) {
		return await dto.save()
	}

	public async update(id: string, dto: IBootcampDTO) {
		return await this.model.findByIdAndUpdate(id, dto, {
			new: true,
			runValidators: true,
		})
	}

	public async destroy(id: string) {
		const bootcamp = await this.model.findById(id)

		return await bootcamp?.remove()
	}

	public async getBootcampsByRadius(lat: number, lng: number, radius: number) {
		return await this.model.find({
			location: {
				$geoWithin: {
					$centerSphere: [[lng, lat], radius],
				},
			},
		})
	}
}
