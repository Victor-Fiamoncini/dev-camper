import MongoDAO from '../MongoDAO'
import IBootcamp from './Types'

export default class BootcampDAO extends MongoDAO<IBootcamp> {
	public async store(dto: IBootcamp): Promise<IBootcamp> {
		return await dto.save()
	}

	public async index(): Promise<IBootcamp[]> {
		throw new Error('Method not implemented.')
	}

	public async show(id: string): Promise<IBootcamp> {
		throw new Error('Method not implemented.')
	}

	public async update(dto: IBootcamp, id: string): Promise<IBootcamp> {
		throw new Error('Method not implemented.')
	}

	public async destroy(id: string): Promise<IBootcamp> {
		throw new Error('Method not implemented.')
	}
}
