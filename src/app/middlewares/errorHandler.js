export default (err, req, res) => {
	console.error(err)

	res.status(500).json({ error: `${err.name} - ${err.message}` })
}
