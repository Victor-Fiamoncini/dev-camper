import { Request, Response } from 'express'

import BaseController from './BaseController'
import BootcampDAO from '../models/Bootcamp/BootcampDAO'
import Bootcamp from '../models/Bootcamp/Bootcamp'

class BootcampController extends BaseController {
	public constructor(dao: BootcampDAO) {
		super(dao)
	}

	async store(req: Request, res: Response) {
		const bootcampDto = new Bootcamp(req.body)
		const bootcamp = await this.dao.store(bootcampDto)

		return res.status(201).json({ bootcamp })
	}

	public async index(req: Request, res: Response) {
		const bootcamps = await this.dao.index()

		return res.status(201).json({ bootcamps })
	}

	public async show(req: Request, res: Response) {
		const bootcamp = await this.dao.show(req.params.id)

		if (!bootcamp) {
			return res.status(400).json({ error: 'Bootcamp not found' })
		}

		return res.status(201).json({ bootcamp })
	}

	public async update(req: Request, res: Response) {
		const bootcamp = await this.dao.update(req.params.id, req.body)

		return res.status(200).json({ bootcamp })
	}

	public async destroy(req: Request, res: Response) {
		const bootcamp = await this.dao.destroy(req.params.id)

		return res.status(200).json({ bootcamp })
	}
}

export default new BootcampController(new BootcampDAO(Bootcamp))
