import { Model } from 'mongoose'

import MongoDAO from '../MongoDAO'
import IBootcamp from './Types'

export default class BootcampDAO extends MongoDAO<IBootcamp> {
	public constructor(model: Model<IBootcamp>) {
		super(model)
	}

	public async store(dto: IBootcamp): Promise<IBootcamp | null> {
		return await dto.save()
	}

	public async index(): Promise<IBootcamp[] | null> {
		return await this.model.find()
	}

	public async show(id: string): Promise<IBootcamp | null> {
		return await this.model.findById(id)
	}

	public async update(id: string, dto: IBootcamp): Promise<IBootcamp | null> {
		return await this.model.findByIdAndUpdate(id, dto, {
			new: true,
			runValidators: true,
		})
	}

	public async destroy(id: string): Promise<IBootcamp | null> {
		return await this.model.findByIdAndDelete(id)
	}
}
