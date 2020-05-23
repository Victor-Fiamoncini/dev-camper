import UserDAO from '../models/User/UserDAO'
import User from '../models/User/User'

class SessionController {
	constructor(dao) {
		this.dao = dao
	}

	async store(req, res) {
		const { email, password } = req.body

		const user = await this.dao.findByEmail(email)

		if (!user) {
			return res.status(400).json({ error: 'Invalid credentials' })
		}

		if (!(await user.matchPassword(password))) {
			return res.status(400).json({ error: 'Invalid credentials' })
		}

		user.password = undefined

		return res.status(201).json({
			user,
			token: user.getSignedJwtToken(),
		})
	}
}

export default new SessionController(new UserDAO(User))
