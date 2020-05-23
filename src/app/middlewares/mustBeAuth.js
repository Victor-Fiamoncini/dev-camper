import { verify } from 'jsonwebtoken'

export default (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(401).json({ error: 'No token provided' })
	}

	const parts = authorization.split(' ')

	if (parts.length !== 2) {
		return res.status(401).json({ error: 'Malformatted token' })
	}

	const [scheme, token] = parts

	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).json({ error: 'Malformatted token' })
	}

	verify(token, process.env.JWT_AUTH_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ error: 'No valid token' })
		}

		req.userId = decoded.id
		return next()
	})
}
