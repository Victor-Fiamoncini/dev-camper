import BaseDAO from '../BaseDAO'

export default class UserDAO extends BaseDAO {
	constructor(model) {
		super(model)
	}

	async store(dto) {
		return await dto.save()
	}
}
