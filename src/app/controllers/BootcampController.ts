import { Request, Response } from 'express'

import BaseController from './BaseController'
import BootcampDAO from '../models/Bootcamp/BootcampDAO'
import Bootcamp from '../models/Bootcamp/Bootcamp'

class BootcampController extends BaseController {
	protected dao: BootcampDAO

	public constructor(dao: BootcampDAO) {
		super(dao)
		this.dao = dao
	}

	public async store(req: Request, res: Response): Promise<Response> {
		const bootcampDto = new Bootcamp(req.body)
		console.log(this.dao)

		return res.send('this.dao')
	}
}

export default new BootcampController(new BootcampDAO())
