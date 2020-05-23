export default class BaseDAO {
	constructor(model) {
		this.model = model
	}

	get _model() {
		return this.model
	}

	set _model(model) {
		this.model = model
	}
}
