import { Document, Model } from 'mongoose'

import BaseDAO from './BaseDAO'

export default abstract class MongoDAO<T extends Document> extends BaseDAO<T> {
	protected model: Model<T>

	public constructor(model: Model<T>) {
		super()
		this.model = model
	}
}
