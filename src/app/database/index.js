import { connect } from 'mongoose'

export default async () => {
	const { DB_NAME, DB_PORT, DB_HOST } = process.env

	try {
		await connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})

		console.log('Connected to MongoDB')
	} catch (err) {
		console.error(err)
	}
}
