import BaseDAO from '../BaseDAO'

export default class UserDAO extends BaseDAO {
	constructor(model) {
		super(model)
	}

	async show(id) {
		return await this.model.findById(id)
	}

	async store(dto) {
		return await dto.save()
	}

	async findByEmail(email) {
		return await this.model.findOne({ email }).select('+password')
	}
}
