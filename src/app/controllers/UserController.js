import UserDAO from '../models/User/UserDAO'
import User from '../models/User/User'

class UserController {
	constructor(dao) {
		this.dao = dao
	}

	async store(req, res) {
		const { name, email, password, role } = req.body

		const userDto = new User({
			name,
			email,
			password,
			role,
		})

		const user = await this.dao.store(userDto)

		return res.status(201).json(user)
	}
}

export default new UserController(new UserDAO(User))
