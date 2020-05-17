import { NextFunction, Request, Response } from 'express'

import BaseController from './BaseController'
import BootcampDAO from '../models/Bootcamp/BootcampDAO'
import Bootcamp from '../models/Bootcamp/Bootcamp'
import ErrorResponse from '../utils/ErrorResponse'

export default class BootcampController extends BaseController {
	public constructor(dao: BootcampDAO) {
		super(dao)
	}

	public async store(req: Request, res: Response): Promise<Response> {
		const bootcampDto = new Bootcamp(req.body)
		const bootcamp = await this.dao.store(bootcampDto)

		return res.status(201).json({ bootcamp })
	}

	public async index(req: Request, res: Response): Promise<Response> {
		const bootcamps = await this.dao.index()

		return res.status(201).json({ bootcamps })
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const bootcamp = await this.dao.show(req.params.id)

		if (!bootcamp) {
			return res.status(400)
		}

		return res.status(201).json({ bootcamp })
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const bootcamp = await this.dao.update(req.params.id, req.body)

		return res.status(200).json({ bootcamp })
	}

	public async destroy(req: Request, res: Response, next: NextFunction) {
		try {
			const bootcamp = await this.dao.destroy(req.params.id)

			return res.status(200).json({ bootcamp })
		} catch (err) {
			next(new ErrorResponse('Bootcamp not found', 400))
		}
	}
}
