// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
	console.error(err)

	res.status(500).json({ error: `${err.name} - ${err.message}` })
}
