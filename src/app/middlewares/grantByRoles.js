import UserDAO from '../models/User/UserDAO'
import User from '../models/User/User'

export default (...roles) => async (req, res, next) => {
	const user = await new UserDAO(User).show(req.userId)

	if (!user) {
		return res.status(401).json({ error: 'Unauthorized' })
	}

	if (!roles.includes(user.role)) {
		return res.status(400).json({ error: `Not granted role ${user.role}` })
	}

	return next()
}
