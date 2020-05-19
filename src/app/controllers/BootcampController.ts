import { Request, Response } from 'express'

import BootcampDAO from '../models/Bootcamp/BootcampDAO'
import Bootcamp from '../models/Bootcamp/Bootcamp'

import geocoder from '../utils/geocoder'

class BootcampController {
	private dao: BootcampDAO

	public constructor(dao: BootcampDAO) {
		this.dao = dao
	}

	public async store(req: Request, res: Response) {
		const bootcampDto = new Bootcamp(req.body)
		const bootcamp = await this.dao.store(bootcampDto)

		return res.status(201).json({ bootcamp })
	}

	public async index(req: Request, res: Response) {
		let query = JSON.stringify(req.query).replace(
			/\b(gt|gte|lt|lte|in)\b/g,
			(match) => `$${match}`
		)

		const bootcamps = await this.dao.index(JSON.parse(query))

		return res.status(201).json({ count: bootcamps?.length, bootcamps })
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

	public async getBootcampsInRadius(req: Request, res: Response) {
		const { zipcode, distance } = req.params

		const [location] = await geocoder.geocode(zipcode)
		const lat = location.latitude
		const lng = location.longitude

		const radius = Number(distance) / 3963

		const bootcamps = await this.dao.getBootcampsInRadius(lat, lng, radius)

		return res.status(201).json({ count: bootcamps?.length, bootcamps })
	}
}

export default new BootcampController(new BootcampDAO(Bootcamp))
