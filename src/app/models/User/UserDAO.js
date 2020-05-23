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

	async update(id, dto) {
		return await this.model.findOneAndUpdate({ _id: id }, dto, {
			new: true,
			runValidators: true,
		})
	}

	async destroy(id) {
		return await this.model.findByIdAndDelete(id)
	}

	async findByEmail(email) {
		return await this.model.findOne({ email }).select('+password')
	}
}
