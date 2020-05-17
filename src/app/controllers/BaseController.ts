import BaseDAO from '../models/BaseDAO'

export default abstract class BaseController {
	protected dao: BaseDAO<any>

	public constructor(dao: BaseDAO<any>) {
		this.dao = dao
	}
}
