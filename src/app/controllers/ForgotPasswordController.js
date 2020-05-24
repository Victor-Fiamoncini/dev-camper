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

		const resetUrl = `${req.protocol}://${req.get(
			'host'
		)}/sessions/reset/${resetToken}`

		const message = `Hello -> Reset password link: \n\n ${resetUrl}`

		try {
			await sendMail({
				to: user.email,
				subject: 'Password Reset Link',
				text: message,
			})

			console.log('AQUII')

			return res.status(201)
		} catch (err) {
			user.resetPasswordToken = undefined
			user.resetPasswordExpire = undefined

			await this.dao.store(user)

			return res.status(500).json({ error: 'User not found' })
		}
	}
}

export default new ForgotPasswordController(new UserDAO(User))
