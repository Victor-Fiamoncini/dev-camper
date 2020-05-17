import { Request, Response } from 'express'

import BaseController from './BaseController'
import BootcampDAO from '../models/Bootcamp/BootcampDAO'
import Bootcamp from '../models/Bootcamp/Bootcamp'
import { Document } from 'mongoose'

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

	public async index(req: Request, res: Response): Promise<Response> {
		try {
			const bootcamps = await this.dao.index()

			return res.status(201).json({ bootcamps })
		} catch (err) {
			return res.status(500).json(err)
		}
	}

	public async show(req: Request, res: Response): Promise<Response> {
		try {
			const bootcamp = await this.dao.show(req.params.id)

			if (!bootcamp) {
				return res.status(400)
			}

			return res.status(201).json({ bootcamp })
		} catch (err) {
			return res.status(500).json(err)
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		try {
			const bootcamp = await this.dao.update(req.params.id, req.body)

			return res.status(200).json({ bootcamp })
		} catch (err) {
			return res.status(500).json(err)
		}
	}

	public async destroy(req: Request, res: Response): Promise<Response> {
		try {
			const bootcamp = await this.dao.destroy(req.params.id)

			return res.status(200).json({ bootcamp })
		} catch (err) {
			return res.status(500).json(err)
		}
	}
}
