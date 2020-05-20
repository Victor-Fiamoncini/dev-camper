import { Document, PaginateModel } from 'mongoose'

export default abstract class MongoDAO<T extends Document> {
	protected model: PaginateModel<T>

	protected constructor(model: PaginateModel<T>) {
		this.model = model
	}
}
