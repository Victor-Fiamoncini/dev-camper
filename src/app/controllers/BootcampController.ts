import { Request, Response } from 'express'

import BaseController from './BaseController'
import BootcampDAO from '../models/Bootcamp/BootcampDAO'
import Bootcamp from '../models/Bootcamp/Bootcamp'

export default class BootcampController extends BaseController {
	public constructor(dao: BootcampDAO) {
		super(dao)
	}

	public async store(req: Request, res: Response): Promise<Response> {
		try {
			const bootcampDto = new Bootcamp(req.body)
			const bootcamp = await this.dao.store(bootcampDto)

			return res.status(201).json({ bootcamp })
		} catch (err) {
			return res.status(500).json(err)
		}
	}
}
