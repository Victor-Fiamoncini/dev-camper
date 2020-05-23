import UserDAO from '../models/User/UserDAO'
import User from '../models/User/User'

export default (...roles) => (req, res, next) => {
	const user = new UserDAO(User).show(req.userId)

	console.log(user)

	if (!roles.includes(user.role)) {
		return res.status(400).json({ error: 'Invalid role' })
	}

	return next()
}
