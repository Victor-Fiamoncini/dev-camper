import BaseController from './BaseController'
import UserDAO from '../models/User/UserDAO'
import User from '../models/User/User'

class UserController extends BaseController {
	constructor(dao) {
		super(dao)
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
		user.password = undefined

		return res.status(201).json(user)
	}

	async update(req, res) {
		const user = await this.dao.update(req.params.userId, req.body)

		if (!user) {
			return res.status(400).json({ error: 'User not found' })
		}

		return res.status(200).json(user)
	}

	async destroy(req, res) {
		const user = await this.dao.destroy(req.params.userId)

		if (!user) {
			return res.status(400).json({ error: 'User not found' })
		}

		return res.status(200).json(user)
	}
}

export default new UserController(new UserDAO(User))
