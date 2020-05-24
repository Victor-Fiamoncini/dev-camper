import BaseController from './BaseController'
import UserDAO from '../models/User/UserDAO'
import User from '../models/User/User'

class ForgotPasswordController extends BaseController {
	constructor(dao) {
		super(dao)
	}

	async store(req, res) {
		const user = await this.dao.findByEmail(req.body.email)

		if (!user) {
			return res.status(400).json({ error: 'User not found' })
		}

		const resetToken = user.getResetPasswordToken()

		await this.dao.store(user)

		res.status(201).json({ resetToken, user })
	}
}

export default new ForgotPasswordController(new UserDAO(User))
