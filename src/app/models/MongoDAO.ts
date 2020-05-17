import { Document } from 'mongoose'
import BaseDAO from './BaseDAO'

export default abstract class MongoDAO<T extends Document> extends BaseDAO<T> {}
