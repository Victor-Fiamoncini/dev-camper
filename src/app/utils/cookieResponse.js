export default (user, statusCode, res) => {
	const { COOKIE_EXPIRE_TIME, NODE_ENV } = process.env

	const token = user.getSignedJwtToken()

	const options = {
		expires: new Date(Date.now() + COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
		httpOnly: true,
	}

	if (NODE_ENV === 'production') {
		options.secure = true
	}

	return res
		.status(statusCode)
		.cookie('auth_token', token, options)
		.json({ user, token })
}
