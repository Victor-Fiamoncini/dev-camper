import UserDAO from '../models/User/UserDAO'
import User from '../models/User/User'

class SessionController {
	constructor(dao) {
		this.dao = dao
	}

	async store(req, res) {
		return res.status(201).json('')
	}
}

export default new SessionController(new UserDAO(User))
