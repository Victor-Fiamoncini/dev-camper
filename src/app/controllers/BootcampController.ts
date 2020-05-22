import { Request, Response } from 'express'

import BootcampDAO from '../models/Bootcamp/BootcampDAO'
import Bootcamp from '../models/Bootcamp/Bootcamp'

import geocoder from '../utils/geocoder'

class BootcampController {
	private dao: BootcampDAO

	public constructor(dao: BootcampDAO) {
		this.dao = dao
	}

	public async index(req: Request, res: Response) {
		const { page = 1, perPage = 5 } = req.query

		const bootcamps = await this.dao.index(Number(page), Number(perPage))

		return res.status(200).json(bootcamps)
	}

	public async show(req: Request, res: Response) {
		const bootcamp = await this.dao.show(req.params.bootcampId)

		if (!bootcamp) {
			return res.status(400).json({ error: 'Bootcamp not found' })
		}

		return res.status(200).json(bootcamp)
	}

	public async store(req: Request, res: Response) {
		const bootcampDto = new Bootcamp(req.body)
		const bootcamp = await this.dao.store(bootcampDto)

		return res.status(201).json(bootcamp)
	}

	public async update(req: Request, res: Response) {
		const bootcamp = await this.dao.update(req.params.bootcampId, req.body)

		if (!bootcamp) {
			return res.status(400).json({ error: 'Bootcamp not found' })
		}

		return res.status(200).json(bootcamp)
	}

	public async destroy(req: Request, res: Response) {
		const bootcamp = await this.dao.destroy(req.params.bootcampId)

		if (!bootcamp) {
			return res.status(400).json({ error: 'Bootcamp not found' })
		}

		return res.status(200).json(bootcamp)
	}

	public async getBootcampsByRadius(req: Request, res: Response) {
		const { zipcode, distance } = req.params

		const [location] = await geocoder.geocode(zipcode)
		const lat = location.latitude
		const lng = location.longitude

		const radius = Number(distance) / 3963

		const bootcamps = await this.dao.getBootcampsByRadius(lat, lng, radius)

		if (bootcamps.length === 0) {
			return res.status(400).json({ error: 'No bootcamps found' })
		}

		return res.status(200).json(bootcamps)
	}
}

export default new BootcampController(new BootcampDAO(Bootcamp))
