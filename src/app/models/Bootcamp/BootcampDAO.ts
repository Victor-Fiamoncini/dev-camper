import MongoDAO from '../MongoDAO'
import IBootcamp from './Types'

export default class BootcampDAO extends MongoDAO<IBootcamp> {
	public async store(dto: IBootcamp) {
		throw new Error('Method not implemented.')
	}

	public async index() {
		throw new Error('Method not implemented.')
	}

	public async show(id: string) {
		throw new Error('Method not implemented.')
	}

	public async update(dto: IBootcamp, id: string) {
		throw new Error('Method not implemented.')
	}

	public async destroy(id: string) {
		throw new Error('Method not implemented.')
	}
}
