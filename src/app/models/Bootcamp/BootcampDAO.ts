import { PaginateModel } from 'mongoose'

import MongoDAO from '../MongoDAO'
import IBootcamp from './Types'

export default class BootcampDAO extends MongoDAO<IBootcamp> {
	public constructor(model: PaginateModel<IBootcamp>) {
		super(model)
	}

	public async store(dto: IBootcamp): Promise<IBootcamp> {
		return await dto.save()
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
		return await this.model.findById(id)
	}

	public async update(id: string, dto: IBootcamp) {
		return await this.model.findByIdAndUpdate(id, dto, {
			new: true,
			runValidators: true,
		})
	}

	public async destroy(id: string) {
		return await this.model.findByIdAndDelete(id)
	}

	public async getBootcampsInRadius(lat: number, lng: number, radius: number) {
		return await this.model.find({
			location: {
				$geoWithin: {
					$centerSphere: [[lng, lat], radius],
				},
			},
		})
	}
}
