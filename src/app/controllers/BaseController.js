export default class BaseController {
	constructor(dao) {
		this.dao = dao
	}

	get _dao() {
		return this.dao
	}

	set _dao(dao) {
		this.dao = dao
	}
}
