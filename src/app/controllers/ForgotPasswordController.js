import BaseController from './BaseController'
import UserDAO from '../models/User/UserDAO'
import User from '../models/User/User'

import sendMail from '../utils/sendMail'

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

		try {
			await sendMail({
				to: user.email,
				template: 'mail/forgot_password',
				context: { resetToken },
			})

			return res.status(201).json({ success: 'E-mail has been sent' })
		} catch (err) {
			user.resetPasswordToken = undefined
			user.resetPasswordExpire = undefined

			await this.dao.store(user)

			return res.status(500).json({ error: 'User not found' })
		}
	}
}

export default new ForgotPasswordController(new UserDAO(User))
